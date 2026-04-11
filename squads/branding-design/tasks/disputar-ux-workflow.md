# Task: Apresentar Posição em Disputa (UX Architect)

**Task ID:** disputar-ux-workflow
**Version:** 1.0
**Purpose:** Apresentar posição do ux-architect em formato fixo para arbitragem do brand-strategist
**Orchestrator:** @ux-architect
**Mode:** Interactive (elicit=true — recebe posição do visual-designer antes de formular resposta)
**elicit:** true

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `visual_position` | string | Sim | Posição do visual-designer em formato fixo |
| `element_in_dispute` | string | Sim | Elemento vetado em disputa |
| `active_mode` | string | Sim | Lean (1 round) ou Estendido (até 3 rounds) |
| `round_number` | int | Não | Round atual (default: 1) |

---

## Precondições

- [ ] Posição do visual-designer recebida em formato fixo
- [ ] Veto original documentado com razão comportamental
- [ ] Briefing original disponível

---

## STEP 1: Ler Posição do Visual-Designer

```yaml
read_visual_position:
  extract:
    - 'Qual elemento o visual-designer manteve?'
    - 'Qual é a intenção de marca declarada?'
    - 'Qual alternativa o visual-designer propôs?'

  evaluate:
    - 'A alternativa proposta remove o atrito original?'
    - 'A alternativa preserva a intenção de marca?'
    - 'A alternativa está dentro da gramática INTELLBUSINESS?'

  if_alternative_resolves_atrito:
    action: 'ACEITAR alternativa — não é necessário disputar'
    output: 'Aceito a alternativa do visual-designer. Atrito original resolvido.'
```

---

## STEP 2: Confirmar Sustentabilidade do Veto

```yaml
veto_sustainability:
  sustain_if:
    - 'O atrito funcional ainda existe na alternativa proposta'
    - 'O teste dos 3 segundos ainda falha com a alternativa'
    - 'A persona ainda não é atendida com a alternativa'

  withdraw_if:
    - 'A alternativa do visual-designer remove o atrito identificado'
    - 'O teste dos 3 segundos passa com a alternativa'
    - 'A intenção de marca é preservada'

  note: 'Veto sem atrito real é preferência — deve ser retirado'
```

---

## STEP 3: Formular Posição no Formato Fixo

```yaml
position_format:
  mandatory:
    line_1: '"Vetei porque {elemento} cria {atrito} para {persona}."'
    line_2: '"O teste dos 3 segundos falhou em: {ponto específico}."'
    line_3: 'Proponho alternativa que mantém {intenção visual} e remove {atrito}: {descrição específica}.'

  forbidden:
    - 'Vocabulário estético (bonito, clean, parece bom)'
    - 'Feedback vago sem ação específica'
    - '"Melhorar" sem especificação'
    - 'Opinião sem razão comportamental'
```

**Formato completo:**

```
**POSIÇÃO UX-ARCHITECT — {elemento em disputa}**
Round: {N}/{max_rounds} | Modo: {LEAN|ESTENDIDO}

Vetei porque {elemento} cria {atrito específico} para {persona específica}.
O teste dos 3 segundos falhou em: {o que o cliente leva em vez do comportamento-alvo}.

[Sobre a alternativa do visual-designer, se insuficiente:]
A alternativa proposta mantém {X} mas ainda cria {Y} porque {razão comportamental}.

Proponho alternativa que mantém {intenção visual declarada} e remove {atrito}:
{Alternativa específica e acionável dentro da gramática INTELLBUSINESS}.
```

---

## STEP 4: Verificar Alternativa Própria

```yaml
own_alternative_check:
  criteria:
    - 'Preserva a intenção de marca declarada pelo visual-designer'
    - 'Remove o atrito comportamental identificado'
    - 'Não contradiz a gramática visual INTELLBUSINESS'
    - 'É específica — não "algo mais simples", mas "Anton sentence case tracking +80"'

  veto_if_impossible:
    action: 'Documentar impossibilidade e escalar ao brand-strategist'
    output: 'Nenhuma alternativa dentro da gramática INTELLBUSINESS remove o atrito identificado. Escalo para arbitragem.'
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Alternativa do visual-designer resolve o atrito | ACEITAR — não disputar | Conflito resolvido |
| Posição sem razão comportamental | REFORMULAR | Veto sem razão é preferência, não função |
| Alternativa própria viola gramática | ESCALAR ao brand-strategist | Conflito irresolvível no nível dos agentes |
| Round 3 sem consenso | ESCALAR obrigatoriamente | Protocolo tem limite máximo |

---

## Completion Criteria

- [ ] Posição do visual-designer lida e entendida completamente
- [ ] Avaliação se alternativa do visual-designer resolve o atrito
- [ ] Decisão: aceitar alternativa OU manter veto com nova posição
- [ ] Posição formulada no formato fixo com razão comportamental
- [ ] Teste dos 3 segundos citado com ponto específico de falha
- [ ] Alternativa própria proposta: preserva intenção + remove atrito + dentro da gramática
- [ ] Posição pronta para entrega ao brand-strategist

---

*Task Version: 1.0 | Agent: ux-architect | Squad: branding-design*
