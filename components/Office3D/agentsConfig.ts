export interface AgentConfig {
  id: string
  name: string
  squad: string
  role: string
  emoji: string
  position: [number, number, number]
  color: string
}

export const SQUAD_ZONES: { id: string; label: string; color: string; position: [number, number, number] }[] = [
  { id: 'whatsapp-agents', label: 'WHATSAPP', color: '#EC4899', position: [-4, 0.01, -5.5] },
  { id: 'branding-design', label: 'BRANDING',  color: '#F5A800', position: [ 4, 0.01, -5.5] },
]

export const AGENTS: AgentConfig[] = [
  // ── WhatsApp Squad ──────────────────────────────────────────────────────────
  {
    id: 'isabella',
    name: 'Isabella',
    squad: 'whatsapp-agents',
    role: 'Atendimento WhatsApp',
    emoji: '💬',
    position: [-5, 0, -3],
    color: '#EC4899',
  },
  {
    id: 'sarah-lynn',
    name: 'Sarah Lynn',
    squad: 'whatsapp-agents',
    role: 'Qualificação de Leads',
    emoji: '💬',
    position: [-5, 0, 0],
    color: '#EC4899',
  },
  {
    id: 'samantha',
    name: 'Samantha',
    squad: 'whatsapp-agents',
    role: 'Agendamento',
    emoji: '💬',
    position: [-5, 0, 3],
    color: '#EC4899',
  },
  // ── Branding Squad ──────────────────────────────────────────────────────────
  {
    id: 'brand-strategist',
    name: 'Brand Strategist',
    squad: 'branding-design',
    role: 'Guardião do Manifesto',
    emoji: '🎯',
    position: [5, 0, -3],
    color: '#F5A800',
  },
  {
    id: 'visual-designer',
    name: 'Visual Designer',
    squad: 'branding-design',
    role: 'Criador',
    emoji: '🎨',
    position: [5, 0, 0],
    color: '#F5A800',
  },
  {
    id: 'ux-architect',
    name: 'UX Architect',
    squad: 'branding-design',
    role: 'Validador',
    emoji: '🔍',
    position: [5, 0, 3],
    color: '#F5A800',
  },
]
