import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

// Defina N8N_WEBHOOK_SECRET no .env.local para proteger o endpoint
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET

/**
 * Eventos esperados do n8n:
 * POST /api/webhooks/n8n
 * Headers: Authorization: Bearer <N8N_WEBHOOK_SECRET>
 * Body:
 * {
 *   event:    'agent_started' | 'agent_completed' | 'agent_error',
 *   agent_id: string,         // ex: "brand-strategist"
 *   squad:    string,         // ex: "branding-design"
 *   task:     string,         // descrição da task em execução (opcional)
 *   message:  string,         // mensagem de atividade a exibir no feed
 *   type:     string,         // tipo de atividade (task_completed, deploy, etc.)
 *   icon:     string,         // emoji do ícone (opcional)
 *   status:   'busy' | 'idle' | 'offline'  // estado resultante do agente
 * }
 */
export async function POST(req: Request) {
  // ── Autenticação ──────────────────────────────────────────────────────────
  if (WEBHOOK_SECRET) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    event,
    agent_id,
    squad,
    task,
    message,
    type = 'task_completed',
    icon = '⚙️',
    status,
  } = body

  if (!agent_id) {
    return NextResponse.json({ error: 'agent_id é obrigatório' }, { status: 400 })
  }

  const ops: PromiseLike<any>[] = []

  // ── Atualizar status do agente no Supabase ────────────────────────────────
  const agentUpdate: Record<string, any> = {
    id: agent_id,
    updated_at: new Date().toISOString(),
  }

  if (squad) agentUpdate.squad = squad

  if (event === 'agent_started') {
    agentUpdate.status = 'busy'
    agentUpdate.current_task = task ?? null
  } else if (event === 'agent_completed') {
    agentUpdate.status = 'idle'
    agentUpdate.current_task = null
  } else if (event === 'agent_error') {
    agentUpdate.status = 'idle'
    agentUpdate.current_task = null
  } else if (status) {
    agentUpdate.status = status
    if (task !== undefined) agentUpdate.current_task = task
  }

  ops.push(
    supabaseServer
      .from('agents')
      .upsert(agentUpdate, { onConflict: 'id' })
      .then(({ error }) => {
        if (error) console.error('[n8n webhook] agents upsert error:', error)
      })
  )

  // Incrementar executions_today quando task completa
  if (event === 'agent_completed') {
    ops.push(
      supabaseServer
        .rpc('increment_executions_today', { agent_id_param: agent_id })
        .then(({ error }) => {
          // RPC é opcional — ignora silenciosamente se não existir
          if (error && !error.message.includes('does not exist')) {
            console.error('[n8n webhook] increment_executions_today error:', error)
          }
        })
    )
  }

  // ── Inserir atividade no Supabase ─────────────────────────────────────────
  if (message) {
    ops.push(
      supabaseServer
        .from('activities')
        .insert({
          agent: agent_id,
          squad: squad ?? null,
          type,
          message,
          icon,
          timestamp: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.error('[n8n webhook] activities insert error:', error)
        })
    )
  }

  await Promise.all(ops.map((op) => Promise.resolve(op)))

  return NextResponse.json({ ok: true, event, agent_id })
}
