# Task: Criar Entregável Visual

**Task ID:** criar-workflow
**Version:** 1.0
**Purpose:** Criar entregável visual baseado no briefing aprovado pelo brand-strategist
**Orchestrator:** @visual-designer
**Mode:** Autonomous (executa dentro do briefing — sem julgamento próprio)
**elicit:** false

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `briefing` | document | Sim | Briefing aprovado pelo brand-strategist |
| `deliverable_type` | string | Sim | Tipo exato: Post Instagram, Slide, Landing page... |
| `active_mode` | string | Sim | Lean ou Estendido (declarado no briefing) |

---

## Precondições

- [ ] Briefing aprovado pelo brand-strategist está disponível
- [ ] Modo declarado (Lean ou Estendido)
- [ ] Tipo de entregável identificado

---

## STEP 1: Ler Briefing Completamente

**Ação:** Ler todo o briefing antes de iniciar qualquer criação.

```yaml
briefing_extraction:
  required_fields:
    - comportamento_alvo: 'O único comportamento que o material deve provocar'
    - medo_a_dissolver: 'O medo específico identificado na ignição'
    - conquistar_ou_reter: 'E sua implicação criativa'
    - persona_primaria: 'Quem lê e em que hierarquia'
    - discurso_a_evitar: 'O discurso involuntário identificado'
    - discurso_a_construir: 'O discurso intencional'
    - diretivas_criativas: 'Diretivas específicas por elemento (modo Estendido)'

  veto_if: 'Briefing ausente ou incompleto — sinalizar ao brand-strategist, não improvisar'
```

---

## STEP 2: Selecionar Modo de Criação

**Ação:** Identificar o modo correto com base no entregável.

```yaml
mode_selection:
  monumental:
    applies_to: [Brandbook, Apresentação, Proposta comercial]
    principle: 'Cada elemento justificado, nada decorativo, ritmo deliberado'
    second_meaning: 'Buscar obrigatoriamente (padrão de excelência)'

  impact:
    applies_to: [Landing page, Hero section]
    principle: 'Hierarquia radical — uma mensagem por seção, conversão acima de expressão'
    second_meaning: 'Opcional'

  pulse:
    applies_to: [Post Instagram, Story, Reels cover]
    principle: 'Síntese extrema — se não funciona em 1,5 segundos, não existe'
    second_meaning: 'Não aplicável'
    test_required: 'teste_1.5s obrigatório antes de entregar'
```

---

## STEP 3: Verificar Gramática Visual Inviolável

**Ação:** Confirmar que a composição respeita as 3 regras absolutas.

```yaml
grammar_check_pre_creation:
  rule_1_hierarchy:
    check: 'Existe um elemento tipográfico dominante claro definido?'
    if_unclear: 'SINALIZAR ao brand-strategist — não criar sem dominância definida'

  rule_2_negative_space:
    check: 'O espaço negativo tem intenção compositiva definida?'
    note: 'Não é vazio — é onde a composição respira com intenção'

  rule_3_max_elements:
    check: 'Número de elementos ≤ 3?'
    if_more: 'SINALIZAR ao brand-strategist — justificativa estratégica obrigatória'
```

---

## STEP 4: Aplicar Sistema Tipográfico

**Ação:** Começar pela tipografia. Organizar elementos ao redor.

```yaml
typography_application:
  blinker:
    use: 'Apenas no logo'
    rule: 'INTOCÁVEL — nunca modificar peso, tracking, cor ou tamanho'

  anton:
    use: 'Todos os títulos e headlines'
    rule: 'Load-bearing — estrutural, nunca decorativo'
    position: 'Elemento dominante na maioria das composições'
    variations_allowed: ['caixa alta', 'sentence case', 'tracking ajustado']
    variations_forbidden: ['italic', 'condensed artificial', 'outline']

  aileron:
    use: 'Subtítulos, corpo de apoio'
    rule: 'Define ritmo — nunca compete com Anton em tamanho ou peso'
    never: 'Tamanho igual ou maior que Anton no mesmo plano visual'
```

---

## STEP 5: Aplicar Sistema de Cores

**Ação:** Usar paleta dentro das regras do manifesto.

```yaml
color_application:
  black_000000:
    primary_use: 'Fundo dominante, texto principal'
    communicates: 'Autoridade, precisão, ausência de ruído'

  yellow_F5A800:
    rule: 'NUNCA fundo ou cor dominante'
    use: 'Acento de intenção — onde o olho deve ir primeiro'
    test: 'Se não há hierarquia clara de leitura, o amarelo NÃO é usado'
    communicates: 'Promessa visual, intenção, chamada de ação'

  gray_2b2a2f:
    use: 'Suporte, separadores, texto secundário'
    communicates: 'Profundidade, sofisticação'

  outside_palette:
    rule: 'Cores fora da paleta exigem justificativa estratégica documentada'
    veto_if: 'Sem justificativa do brand-strategist'
```

---

## STEP 6: Identificar e Declarar Elemento Dominante

**Ação:** Nomear explicitamente o elemento dominante antes de entregar.

```yaml
dominant_element_declaration:
  options: [tipografia, forma, espaço, cor]
  rule: 'Apenas um elemento domina. Outros se organizam ao redor.'
  veto_if: 'Dois elementos competem pelo mesmo espaço sem hierarquia'

  format:
    'Elemento dominante: {tipo} — {o que comunica em termos de marca}'
```

---

## STEP 7: Buscar Segundo Significado (Modo Monumental)

**Ação:** Em entregáveis de alto impacto, buscar dupla leitura.

```yaml
second_meaning_search:
  applies_to: [Monumental]
  type: 'padrão de excelência — não obrigatório mas sempre buscado'

  approach:
    - 'Existe forma que pode ser lida de duas maneiras?'
    - 'O espaço negativo cria uma segunda figura?'
    - 'A tipografia forma uma silhueta reconhecível?'
    - 'Existe elemento que revela mais ao segundo olhar?'

  if_found:
    document: 'Incluir na declaração de intenção estendida'
    note: 'Segundo significado encontrado: {descrição}'

  if_not_found:
    note: 'Segundo significado não aplicável nesta composição'
    action: 'Continuar — não forçar se não emerge naturalmente'
```

---

## STEP 8: Teste por Modo

### Modo Pulso — Teste dos 1,5 Segundos

```yaml
pulse_test:
  question: 'Se o cliente tiver 1,5 segundos de scroll, o que ele leva?'
  criteria: 'A resposta deve ser exatamente o comportamento-alvo do briefing'
  veto_if: 'Resposta é diferente do comportamento-alvo'
  action_if_veto: 'Simplificar composição — reduzir elementos, aumentar Anton'
```

### Modo Impacto — Teste de Hierarquia

```yaml
impact_test:
  question: 'Cada seção tem exatamente uma mensagem?'
  criteria: 'Uma mensagem por seção — conversão acima de expressão'
  veto_if: 'Seção comunica mais de uma coisa'
```

### Modo Monumental — Teste de Justificativa

```yaml
monumental_test:
  question: 'Cada elemento tem justificativa estratégica articulável?'
  criteria: 'Nada decorativo — cada elemento tem razão de existir'
  veto_if: 'Elemento presente sem declaração de intenção'
```

---

## STEP 9: Gerar Declaração de Intenção

**Template:**
- Lean → `squads/branding-design/templates/declaracao-intencao-lean-tmpl.md`
- Estendido → `squads/branding-design/templates/declaracao-intencao-estendido-tmpl.md`

---

## STEP 10: Handoff ao ux-architect

**Formato de entrega:**

```
**ENTREGÁVEL: {deliverable_type} INTELLBUSINESS**
Modo: {PULSO|IMPACTO|MONUMENTAL} | Elemento dominante: {tipo} ({fonte/elemento})

[Descrição estruturada da composição]

**Declaração de intenção:**
{Declaração Lean: 2 linhas | Declaração Estendida: completa}

→ Pronto para validação pelo @ux-architect.
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Briefing ausente | VETO — sinalizar ao brand-strategist | Criação sem briefing é criação no escuro |
| Dois elementos dominantes | VETO — sinalizar ao brand-strategist | Design democrático é anti-padrão |
| #F5A800 como fundo | VETO interno — mover para acento | Viola manifesto explicitamente |
| Blinker modificado | VETO imediato | Logo é identidade primária — intocável |
| Mais de 3 elementos sem justificativa | VETO — sinalizar ao brand-strategist | Complexidade sem estratégia é poluição |
| Modo Pulso: falha no teste 1,5s | SIMPLIFICAR antes de entregar | Entregável ineficaz no canal |

---

## Completion Criteria

- [ ] Briefing lido completamente
- [ ] Modo de criação correto aplicado
- [ ] Gramática visual respeitada (hierarquia, espaço negativo, máximo 3 elementos)
- [ ] Sistema tipográfico aplicado corretamente (Anton > Aileron, Blinker intocável)
- [ ] #F5A800 usado apenas como acento de intenção
- [ ] Elemento dominante identificado e declarado
- [ ] Teste por modo aplicado e aprovado
- [ ] Declaração de intenção documentada
- [ ] Entregável pronto para handoff ao ux-architect

---

*Task Version: 1.0 | Agent: visual-designer | Squad: branding-design*
