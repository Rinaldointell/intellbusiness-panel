# Task: Validar Entregável Visual

**Task ID:** validar-workflow
**Version:** 1.0
**Purpose:** Validar entregável do visual-designer contra critérios funcionais de conversão e comportamento
**Orchestrator:** @ux-architect
**Mode:** Autonomous (análise sistemática — sem improvisação)
**elicit:** false

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `entregavel` | document | Sim | Entregável do visual-designer com declaração de intenção |
| `briefing` | document | Sim | Briefing aprovado pelo brand-strategist |
| `active_mode` | string | Sim | Lean ou Estendido |
| `touchpoints_anteriores` | list | Não | Materiais anteriores aprovados para verificação de consistência |

---

## Precondições

- [ ] Entregável recebido do visual-designer COM declaração de intenção
- [ ] Briefing original disponível (comportamento-alvo, medo, persona, modo)
- [ ] Checklist `ux-architect-quality-gate.md` carregado

---

## STEP 1: Aplicar Protocolo de Conversão

**OBRIGATÓRIO antes de qualquer outra análise.**

```yaml
conversion_protocol:
  question_1: 'Qual ação específica este material deve provocar no cliente?'
  source: 'briefing.comportamento_alvo'

  question_2: 'Esse design cria ou remove atrito para essa ação?'
  evaluation:
    creates_friction: 'Identifica onde e para qual persona'
    removes_friction: 'Confirma que o caminho para a ação está desobstruído'

  output:
    acao_esperada: '{comportamento-alvo extraído do briefing}'
    avaliacao_inicial: 'O design {cria|remove} atrito para {ação} porque {razão}'
```

---

## STEP 2: Teste dos 3 Segundos

**OBRIGATÓRIO em todo entregável, sem exceção.**

```yaml
three_second_test:
  question: '"Se o cliente tiver 3 segundos de atenção, o que ele leva?"'

  evaluation:
    pass: 'Resposta = comportamento-alvo do briefing'
    fail: 'Resposta ≠ comportamento-alvo → motivo de VETA'

  for_extended_mode:
    apply_per_section: true
    question_per_section: '"Nesta seção, 3 segundos → o cliente leva o quê?"'
    pass_rate_required: '> 80% das seções passam'

  veto_trigger:
    - 'Teste falha no nível da peça inteira (modo Lean)'
    - 'Mais de 20% das seções falham (modo Estendido)'
```

---

## STEP 3: Verificar Personas Constitucionais

```yaml
personas_check:
  personas:
    ceo:
      profile: 'Desconfiante de tecnologia — quer controle, teme perder autonomia'
      lens: 'O material comunica que ele tem mais poder, não menos?'
    manager:
      profile: 'Gestor sobrecarregado — quer resultado imediato, sem curva de aprendizado'
      lens: 'A mensagem é imediata? Remove atrito cognitivo?'
    founder:
      profile: 'Founder que quer crescer sem perder a alma'
      lens: 'Comunica escala sem perda de identidade?'

  rule: 'Mínimo 2 das 3 personas devem ser atendidas'
  veto_if: 'Menos de 2 personas atendidas'

  output_format:
    '[X] CEO: {como o material fala com ele}'
    '[X/] Gestor: {como o material fala com ele ou por que não é foco}'
    '[X/] Founder: {como o material fala com ele ou por que não é foco}'
```

---

## STEP 4: Verificar Consistência com Touchpoints Anteriores

**Princípio Landor — Consistência como Confiança.**

```yaml
consistency_check:
  if_touchpoints_available:
    check:
      - 'Tom e vocabulário: consistente com materiais anteriores?'
      - 'Hierarquia visual: o cliente reconhece o padrão?'
      - 'Comportamento esperado: o mesmo gatilho funciona aqui?'
      - 'Uso do #F5A800: acento no mesmo tipo de elemento?'
    veto_if: 'Inconsistência detectada em qualquer dimensão'
    format: 'Inconsistência: {touchpoint anterior} vs {entregável atual} — {dimensão} diverge em {X}'

  if_no_touchpoints:
    note: 'Primeiro entregável — nenhuma consistência a verificar. Registrar como touchpoint base.'
```

---

## STEP 5: Emitir Veredicto

### Modo LEAN — 1 frase por veredicto

**APROVA:**
```
APROVA — {razão comportamental em 1 linha}.
Teste dos 3 segundos: o cliente leva "{X}" — comportamento-alvo confirmado.
```

**VETA:**
```
VETA — {elemento} cria {atrito} para {persona}.
Teste dos 3 segundos: o cliente leva "{X}" — falha no comportamento-alvo.
Alternativa: {ação específica e acionável}.
```

### Modo ESTENDIDO — Relatório completo

**Template:** `squads/branding-design/templates/relatorio-validacao-estendido-tmpl.md`

```
**RELATÓRIO DE VALIDAÇÃO — {entregável} INTELLBUSINESS**
Veredicto: APROVA | APROVA COM CONDIÇÕES | VETA

Protocolo de conversão:
Ação esperada: {comportamento-alvo}
Avaliação: {o design cria ou remove atrito}

Teste dos 3 segundos:
{Por seção ou geral, com PASSA/FALHA}

Feedback por elemento (quando VETA):
{[Elemento] cria [atrito] porque [razão]. Alternativa: [ação].}

Personas atendidas:
{[X] ou [ ] com detalhe}

Consistência: {CONSISTENTE | INCONSISTÊNCIA DETECTADA — detalhes}

→ {próxima ação recomendada}
```

---

## STEP 6: Propor Alternativa (obrigatório em VETA)

```yaml
alternative_criteria:
  must_remove: 'Atrito funcional identificado'
  must_preserve: 'Intenção de marca da declaração de intenção do visual-designer'
  must_respect: 'Gramática visual inviolável INTELLBUSINESS'
  must_be: 'Específica e acionável — não "algo mais simples", mas "Anton em 1 linha com tracking +50"'

  veto_if_alternative_impossible:
    action: 'Escalar para @brand-strategist com briefing + veto + impossibilidade documentada'
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Entregável sem declaração de intenção | Solicitar ao visual-designer antes de validar | Sem declaração, validação é incompleta |
| Teste dos 3 segundos falha | VETA com alternativa | Entregável não serve ao comportamento-alvo |
| Menos de 2 personas atendidas | VETA | Violação do protocolo INTELLBUSINESS |
| Inconsistência com touchpoints detectada | VETA com documentação da inconsistência | Inconsistência = perda de confiança |
| Veredicto sem razão comportamental | REFORMULAR | Veto sem razão é preferência, não função |
| Alternativa viola gramática INTELLBUSINESS | ESCALAR ao brand-strategist | Solução fora do DNA não resolve |

---

## Completion Criteria

- [ ] Protocolo de conversão aplicado (2 perguntas obrigatórias)
- [ ] Teste dos 3 segundos aplicado a todo o entregável
- [ ] Personas constitucionais verificadas (mínimo 2 de 3)
- [ ] Consistência com touchpoints anteriores verificada
- [ ] Veredicto binário emitido: APROVA, APROVA COM CONDIÇÕES ou VETA
- [ ] Razão comportamental articulada — sem vocabulário estético
- [ ] Alternativa proposta em caso de VETA
- [ ] Formato correto para o modo (1 frase Lean / relatório Estendido)

---

*Task Version: 1.0 | Agent: ux-architect | Squad: branding-design*
