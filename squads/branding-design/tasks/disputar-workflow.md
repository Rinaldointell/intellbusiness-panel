# Task: Apresentar Posição em Disputa

**Task ID:** disputar-workflow
**Version:** 1.0
**Purpose:** Apresentar posição em formato fixo para arbitragem do brand-strategist após veto do ux-architect
**Orchestrator:** @visual-designer
**Mode:** Interactive (elicit=true — recebe o veto do ux-architect antes de formular posição)
**elicit:** true

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `ux_veto` | string | Sim | Posição do ux-architect no formato fixo |
| `element_in_dispute` | string | Sim | Elemento vetado |
| `active_mode` | string | Sim | Lean (1 round) ou Estendido (até 3 rounds) |
| `round_number` | int | Não | Round atual (default: 1) |

---

## Precondições

- [ ] Veto do ux-architect recebido em formato fixo
- [ ] Elemento em disputa identificado
- [ ] Declaração de intenção original disponível

---

## STEP 1: Ler e Entender o Veto

**Ação:** Ler completamente o veto do ux-architect antes de formular posição.

```yaml
veto_analysis:
  extract:
    - 'Qual elemento específico foi vetado?'
    - 'Qual atrito específico foi identificado?'
    - 'Qual persona o atrito prejudica?'
    - 'O teste dos 3 segundos falhou em quê?'
    - 'Qual alternativa o ux-architect propôs?'

  important:
    - 'Não reagir com preferência — analisar se o atrito é válido'
    - 'Verificar se o atrito contradiz a intenção de marca'
    - 'Verificar se a alternativa proposta preserva o DNA'
```

---

## STEP 2: Avaliar se a Posição é Sustentável

**Ação:** Verificar se a intenção de marca justifica manter o elemento.

```yaml
sustainability_check:
  sustain_if:
    - 'O elemento tem intenção de marca documentada e articulável'
    - 'A intenção de marca supera o atrito funcional identificado'
    - 'Remover o elemento fragmenta a identidade ou o DNA'

  reconsider_if:
    - 'O atrito identificado é real e vai impedir o comportamento-alvo'
    - 'A alternativa do ux-architect preserva a intenção de marca sem o atrito'
    - 'Manter o elemento contradiz o briefing'

  veto_if:
    - 'Posição baseada em "prefiro manter assim" sem razão de marca → não disputar'
    - 'Ir direto para alternativa'
```

---

## STEP 3: Formular Posição no Formato Fixo

**Ação:** Apresentar posição em formato obrigatório.

```yaml
position_format:
  mandatory:
    line_1: '"Mantive {elemento} porque {intenção de marca específica}."'
    line_2: '"A declaração de intenção é: {declaração articulável}."'

  forbidden:
    - '"Prefiro essa versão porque..."'
    - '"Achei que ficaria melhor..."'
    - '"Gosto mais de..."'
    - 'Qualquer vocabulário da lista negra'
```

**Formato completo da posição:**

```
**POSIÇÃO — {elemento em disputa}**
Round: {N}/{max_rounds}

Mantive {elemento} porque {intenção de marca específica}.
A declaração de intenção é: {declaração articulável que justifica a existência do elemento}.

{Reconhecimento do atrito identificado pelo ux-architect, se válido:}
"Entendo que {atrito} pode {impacto na persona}. A intenção de marca supera esse atrito porque {razão}."
```

---

## STEP 4: Propor Alternativa

**Ação:** Sempre propor alternativa que preserva força visual E reduz atrito funcional.

```yaml
alternative_criteria:
  must_preserve: 'Intenção de marca do elemento original'
  must_reduce: 'Atrito específico identificado pelo ux-architect'
  must_respect: 'Gramática visual inviolável INTELLBUSINESS'

  format:
    'Proponho alternativa que mantém {força visual} e reduz {atrito ux}:
    {descrição específica da alternativa — não vaga, acionável}'

  veto_if:
    - 'Alternativa impossível dentro da gramática INTELLBUSINESS → sinalizar ao brand-strategist'
```

---

## STEP 5: Posição Completa para Arbitragem

**Formato final entregue ao brand-strategist:**

```
**POSIÇÃO VISUAL-DESIGNER — {elemento em disputa}**
Round: {N}/{max_rounds} | Modo: {LEAN|ESTENDIDO}

Mantive {elemento} porque {intenção de marca}.
A declaração de intenção é: {declaração completa}.

[Reconhecimento do atrito, se aplicável]

Proponho alternativa que mantém {força visual} e reduz {atrito ux}:
{Alternativa específica e acionável}.
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Posição sem intenção de marca articulável | NÃO disputar — ir para alternativa | Sem razão de marca, posição é preferência |
| Alternativa viola gramática INTELLBUSINESS | Sinalizar ao brand-strategist | Alternativa fora do DNA não resolve o conflito |
| Round 3 encerrado sem consenso | ESCALAR ao brand-strategist | Protocolo tem limite máximo de 3 rounds |
| Posição com vocabulário da lista negra | REFORMULAR | "Prefiro" não é argumento de marca |

---

## Completion Criteria

- [ ] Veto do ux-architect lido e entendido completamente
- [ ] Sustentabilidade da posição avaliada (intenção de marca vs atrito funcional)
- [ ] Posição formulada no formato fixo obrigatório
- [ ] Razão baseada em intenção de marca, nunca em preferência
- [ ] Alternativa proposta: preserva força visual + reduz atrito + dentro da gramática
- [ ] Posição completa entregue ao brand-strategist para arbitragem

---

*Task Version: 1.0 | Agent: visual-designer | Squad: branding-design*
