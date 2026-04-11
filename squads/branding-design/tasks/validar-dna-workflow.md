# Task: Validação de DNA e Manifesto

**Task ID:** validar-dna-workflow
**Version:** 1.0
**Purpose:** Validar se elemento criativo está alinhado ao DNA e manifesto INTELLBUSINESS
**Orchestrator:** @brand-strategist
**Mode:** Autonomous (analisa o elemento e emite veredicto)
**elicit:** false

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `element` | string | Sim | Elemento a ser validado (ex: "fundo amarelo", "fonte cursiva em título") |
| `context` | string | Não | Contexto do entregável onde o elemento aparece |
| `declared_intention` | string | Não | Intenção declarada do visual-designer para o elemento |

---

## Precondições

- [ ] Elemento identificado especificamente
- [ ] Checklist `brand-strategist-quality-gate.md` carregado

---

## STEP 1: Identificar Categoria do Elemento

**Ação:** Classificar o elemento para aplicar o critério correto.

```yaml
element_categories:
  typography:
    elements: 'Escolha de fonte, tamanho, peso, tracking, cor do texto'
    rules_to_apply: 'Sistema tipográfico do manifesto'
    manifesto_ref: 'Blinker (logo intocável), Anton (títulos load-bearing), Aileron (subtítulos de ritmo)'

  color:
    elements: 'Cores usadas, proporção, uso como fundo ou acento'
    rules_to_apply: 'Paleta e regras de uso do manifesto'
    manifesto_ref: '#000000 primária, #F5A800 acento (nunca fundo), #2b2a2f secundária'

  composition:
    elements: 'Número de elementos, hierarquia visual, espaço negativo'
    rules_to_apply: 'Gramática visual do sistema'
    manifesto_ref: 'Máximo 3 elementos, hierarquia tipográfica presente, espaço negativo ativo'

  style:
    elements: 'Estilo geral, textura, gradiente, ilustração, fotografia'
    rules_to_apply: 'Posicionamento e anti-padrão do manifesto'
    manifesto_ref: 'Minimalista tech corporativo, luxo discreto. Anti-padrão: poluído, genérico'

  external_reference:
    elements: 'Uso de estilo concorrente, tendência de mercado'
    rules_to_apply: 'Princípio anti-reativo'
    manifesto_ref: 'Branding reativo é proibido — sistema antes de tendência'
```

---

## STEP 2: Verificar contra Manifesto INTELLBUSINESS

**Ação:** Aplicar checklist de validação do manifesto.

### Checklist Tipográfico
- [ ] Fonte do logo é Blinker? (se aplicável) → Se não: VETO imediato
- [ ] Títulos usam Anton? → Se não: verificar justificativa estratégica
- [ ] Subtítulos usam Aileron? → Se não: verificar justificativa estratégica
- [ ] Hierarquia tipográfica está clara? → Existe elemento dominante definido?
- [ ] Nenhuma fonte decorativa em posição estrutural? → Se sim: VETO

### Checklist de Cores
- [ ] #F5A800 usado como acento, não como fundo ou cor dominante? → Se como fundo: VETO
- [ ] Paleta dentro de #000000, #F5A800, #2b2a2f? → Cores fora da paleta exigem justificativa
- [ ] Existe hierarquia clara de leitura? → Se não há hierarquia, amarelo não deve ser usado

### Checklist Composicional
- [ ] Máximo 3 elementos na composição? → Se mais: justificativa estratégica obrigatória
- [ ] Existe elemento dominante declarado? → Se dois elementos competem: VETO
- [ ] Espaço negativo tem intenção? → Não pode ser simplesmente "vazio"

### Checklist de Posicionamento
- [ ] Elemento comunica luxo discreto ou minimalismo tech? → Se comunica o oposto: VETO
- [ ] Elemento é reativo a tendência? → Se sim: VETO
- [ ] Elemento escala? (cartão → outdoor, pt → en, colorido → P&B) → Se não escala: VETO

---

## STEP 3: Identificar Discurso Involuntário

**Ação:** Nomear o que o elemento comunica além da intenção declarada.

```yaml
involuntary_discourse_analysis:
  questions:
    - 'O que um CEO desconfiante vai interpretar ao ver esse elemento?'
    - 'O que esse elemento comunica sobre a INTELLBUSINESS sem que ninguém diga?'
    - 'Qual empresa esse elemento faz a INTELLBUSINESS parecer ser?'
    - 'O discurso involuntário contradiz a missão "devolver poder de criação"?'

  output:
    discurso_involuntario: '{o que o elemento comunica sem intenção}'
    discurso_intencional: '{o que o elemento deveria comunicar}'
    gap: '{a distância entre os dois}'
```

---

## STEP 4: Emitir Veredicto

**Formato obrigatório:**

### APROVADO:
```
**VALIDAÇÃO DNA — {elemento}**
APROVADO.

{Razão estratégica em 1-2 linhas citando o manifesto.}
O discurso involuntário está alinhado: "{discurso involuntário}" confirma "{discurso intencional}".
{Observação sobre escala, se aplicável.}
```

### VETADO:
```
**VALIDAÇÃO DNA — {elemento}**
VETADO.

{Contradiz o manifesto em [N] ponto(s):}
1. {regra violada 1}
2. {regra violada 2 — se houver}

Discurso involuntário: "{o que o elemento comunica sem intenção}."
INTELLBUSINESS comunica: "{o que deveria comunicar}."
{Isso não escala porque X / Isso contradiz o manifesto em X.}

Alternativa: {solução dentro do DNA que preserva a intenção original}.
```

---

## STEP 5: Propor Alternativa (obrigatório em caso de VETO)

**Ação:** Sempre propor alternativa que preserva a intenção mas dentro do DNA.

```yaml
alternative_criteria:
  - 'Preserva a intenção criativa original do visual-designer'
  - 'Não contradiz nenhuma regra do manifesto'
  - 'Escala no sistema completo'
  - 'Alternativa deve ser específica — não "algo mais sóbrio", mas "Anton em caixa alta com tracking +50"'
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Blinker modificado ou substituído | VETO imediato | Logo é identidade primária — intocável |
| #F5A800 usado como fundo | VETO imediato | Viola regra explícita do manifesto |
| Dois elementos competindo pelo domínio | VETO | Elimina hierarquia — design democrático é anti-padrão |
| Fonte fora do sistema tipográfico em posição estrutural | VETO | Sistema tipográfico é inviolável |
| Elemento reativo a tendência sem DNA próprio | VETO | Branding reativo dilui posicionamento |
| Veredicto sem razão articulável | REFORMULAR | Todo veredicto tem citação do manifesto |

---

## Completion Criteria

- [ ] Elemento categorizado corretamente
- [ ] Checklist do manifesto aplicado (tipografia + cores + composição + posicionamento)
- [ ] Discurso involuntário identificado e nomeado
- [ ] Veredicto APROVADO ou VETADO emitido
- [ ] Razão estratégica com citação do manifesto incluída
- [ ] Alternativa proposta em caso de VETO
- [ ] Teste de escala aplicado

---

*Task Version: 1.0 | Agent: brand-strategist | Squad: branding-design*
