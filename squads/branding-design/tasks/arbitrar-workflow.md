# Task: Arbitragem de Conflito entre Agentes

**Task ID:** arbitrar-workflow
**Version:** 1.0
**Purpose:** Arbitrar conflitos entre visual-designer e ux-architect com referência obrigatória ao manifesto INTELLBUSINESS
**Orchestrator:** @brand-strategist
**Mode:** Interactive (elicit=true — recebe posições dos agentes antes de decidir)
**elicit:** true

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `visual_position` | string | Sim | Posição do visual-designer em formato fixo |
| `ux_position` | string | Sim | Posição do ux-architect em formato fixo |
| `element_in_dispute` | string | Sim | Elemento visual em disputa |
| `active_mode` | string | Sim | Lean (1 round) ou Estendido (até 3 rounds) |
| `round_number` | int | Não | Número do round atual (default: 1) |

---

## Precondições

- [ ] Briefing ativo e aprovado pelo brand-strategist
- [ ] Posição do visual-designer recebida em formato fixo
- [ ] Posição do ux-architect recebida em formato fixo

---

## STEP 1: Receber Posições em Formato Fixo

**CRÍTICO:** Não aceitar posições fora do formato fixo. Solicitar reformulação.

### Formato do visual-designer:
```
"Mantive [elemento] porque [intenção de marca].
A declaração de intenção é: [X]."
```

### Formato do ux-architect:
```
"[Elemento] cria [atrito/fluxo] porque [razão comportamental].
Alternativa: [ação específica].
O teste dos 3 segundos falhou em: [Y]."
```

**Veto:** Se posição não estiver no formato fixo → solicitar reformulação antes de continuar.

---

## STEP 2: Identificar Natureza do Conflito

**Ação:** Classificar o conflito para determinar o critério de decisão primário.

```yaml
conflict_classification:
  dna_violation:
    description: 'Um dos lados contradiz o manifesto INTELLBUSINESS'
    criteria: 'Cores, tipografia, estilo — regras do manifesto'
    decision_path: 'Veto imediato — manifesto é lei'

  functional_vs_aesthetic:
    description: 'Visualmente forte mas cria atrito funcional'
    criteria: 'Teste dos 3 segundos vs intenção de marca'
    decision_path: 'Avaliar se atrito é real ou percebido'

  scale_conflict:
    description: 'Funciona na peça mas não escala no sistema'
    criteria: 'Cartão → outdoor, pt → en, colorido → P&B'
    decision_path: 'Sistema vence — peça individual é irrelevante'

  persona_conflict:
    description: 'Fala com uma persona mas prejudica outra'
    criteria: 'Hierarquia de personas para este entregável'
    decision_path: 'Persona primária declarada no briefing vence'
```

---

## STEP 3: Aplicar Protocolo por Modo

### Modo LEAN — 1 Round

**Critério único:** Manifesto INTELLBUSINESS.

1. Verificar se alguma posição contradiz o manifesto explicitamente
2. Aplicar pergunta de arbitragem: *"Qual versão em 10 anos vai orgulhar a INTELLBUSINESS?"*
3. Decidir imediatamente com razão citável

**Output:**
```
**ARBITRAGEM — {elemento_em_disputa}**
Modo: LEAN | Round: 1/1

Decisão: [APROVADO|VETADO] {elemento ou versão}

Razão estratégica — referência ao Manifesto INTELLBUSINESS:
"{citação específica do manifesto ou princípio}"
{elemento} {contradiz|confirma} o DNA porque {razão sistêmica}.
O discurso involuntário de {versão rejeitada} seria: "{X}."
A INTELLBUSINESS comunica: "{Y}."

Alternativa: {quando aplicável — solução que preserva ambas as intenções}

Qual versão em 10 anos vai orgulhar a INTELLBUSINESS? {versão aprovada}.
```

### Modo ESTENDIDO — Até 3 Rounds

**Round 1:** Receber caso em formato fixo (já feito no Step 1).

**Round 2 (se Round 1 sem consenso):**
- Cada agente propõe **uma alternativa** que preserva o ponto do outro
- visual-designer: "Alternativa que mantém [intenção visual] E reduz [atrito ux]"
- ux-architect: "Alternativa que mantém [conversão] E preserva [força visual]"

**Round 3 (se Round 2 sem consenso):**
- brand-strategist recebe 3 versões: A (original visual), B (alternativa visual), C (alternativa ux)
- Decide com referência ao manifesto
- Não existe Round 4

---

## STEP 4: Decidir com Referência ao Manifesto

**OBRIGATÓRIO:** Toda decisão cita um valor específico do manifesto.

```yaml
manifesto_reference_check:
  required_elements:
    - 'Citação específica — qual regra do manifesto se aplica'
    - 'Razão sistêmica — por que contradiz ou confirma o DNA'
    - 'Discurso involuntário — o que a versão rejeitada comunicaria'
    - 'Discurso intencional — o que a versão aprovada comunica'

  veto_if:
    - 'Decisão sem citação do manifesto → não publicar'
    - 'Decisão baseada em preferência ("gosto mais de X") → reformular'
    - 'Decisão sem razão articulável → reformular'
```

**Pergunta de arbitragem obrigatória:**
> *"Qual versão em 10 anos vai orgulhar a INTELLBUSINESS?"*

---

## STEP 5: Propor Alternativa (quando aplicável)

**Ação:** Quando uma versão é vetada, propor alternativa que preserve ambas as intenções.

```yaml
alternative_proposal:
  criteria:
    - 'Preserva a força visual da intenção do visual-designer'
    - 'Remove ou reduz o atrito identificado pelo ux-architect'
    - 'Não contradiz o manifesto INTELLBUSINESS'

  format:
    'Alternativa: {descrição específica} — preserva {intenção visual} E {objetivo funcional}.'

  veto_if: 'Alternativa impossível dentro do manifesto → escalate para @aiox-master'
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Posição fora do formato fixo | SOLICITAR reformulação | Formato garante comparabilidade objetiva |
| Decisão sem referência ao manifesto | REFORMULAR decisão | Sem referência, decisão é preferência, não estratégia |
| Conflito excede Round 3 | ESCALATE para @aiox-master | Protocolo de arbitragem tem limite máximo |
| Ambas as versões contradizem o manifesto | VETAR ambas + proposta | DNA não pode ser comprometido por nenhuma versão |
| Decisão baseda em preferência pessoal | REFORMULAR | "Prefiro" não é critério no sistema INTELLBUSINESS |

---

## Completion Criteria

- [ ] Posições de ambos os agentes recebidas em formato fixo
- [ ] Natureza do conflito classificada
- [ ] Protocolo de round correto aplicado (Lean = 1 round, Estendido = até 3)
- [ ] Decisão com citação específica do manifesto
- [ ] Pergunta de arbitragem aplicada
- [ ] Discurso involuntário da versão rejeitada identificado
- [ ] Alternativa proposta quando aplicável
- [ ] Decisão documentada e auditável

---

*Task Version: 1.0 | Agent: brand-strategist | Squad: branding-design*
