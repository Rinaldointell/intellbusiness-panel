# Task: Declarar Intenção de Entregável

**Task ID:** declarar-intencao-workflow
**Version:** 1.0
**Purpose:** Documentar a declaração de intenção de um entregável já criado, por elemento relevante
**Orchestrator:** @visual-designer
**Mode:** Autonomous
**elicit:** false

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `entregavel` | document | Sim | Descrição ou referência do entregável criado |
| `modo` | string | Sim | Lean ou Estendido |
| `briefing_ref` | string | Não | Referência ao briefing original |

---

## Precondições

- [ ] Entregável já criado
- [ ] Modo conhecido (Lean ou Estendido)

---

## STEP 1: Identificar Decisões Criativas Relevantes

**Ação:** Mapear os elementos que exigem declaração de intenção.

```yaml
relevance_criteria:
  always_declare:
    - 'Elemento dominante — tipografia, forma, espaço ou cor'
    - 'Uso do #F5A800 — onde aparece e por quê'
    - 'Espaço negativo — intenção compositiva'
    - 'Escolha tipográfica — por que Anton nesta posição'

  declare_if_present:
    - 'Segundo significado encontrado'
    - 'Desvio do sistema tipográfico padrão (ex: Aileron em posição não usual)'
    - 'Elemento próximo do limite (3 elementos, proporção de cor)'
    - 'Composição com hierarquia não óbvia'

  skip:
    - 'Uso padrão e direto de elementos sem decisão relevante'
    - 'Elementos puramente utilitários sem carga comunicativa'
```

---

## STEP 2: Documentar por Elemento

**Ação:** Para cada elemento relevante, documentar usando o formato:

```
[Elemento]: {descrição do elemento}
Intenção: {o que este elemento comunica em termos de marca}
Razão compositiva: {por que está nesta posição/tamanho/cor}
```

---

## STEP 3: Verificar Alinhamento com Briefing

**Ação:** Confirmar que a declaração de intenção bate com o briefing.

```yaml
alignment_check:
  question_1: 'Cada elemento declarado serve ao comportamento-alvo do briefing?'
  question_2: 'Algum elemento contradiz o discurso a construir?'
  question_3: 'Algum elemento reforça involuntariamente o discurso a evitar?'

  veto_if: 'Elemento contradiz o briefing — sinalizar ao brand-strategist'
```

---

## STEP 4: Formatar Declaração por Modo

### Modo Lean — 2 linhas

```
Elemento dominante — {elemento}: {o que comunica}.
{Segundo elemento mais relevante}: {intenção}.
```

### Modo Estendido — Completa

```
**Declaração de Intenção — {entregável}**

Elemento dominante: {tipo} — {razão e intenção}
Tipografia: {decisão tipográfica e por quê}
Cor: {uso de #F5A800 ou ausência, e por quê}
Espaço negativo: {intenção compositiva}
[Segundo significado: {descrição} — se encontrado]

Alinhamento com briefing: {como a composição serve ao comportamento-alvo}
Discurso involuntário verificado: {confirmação ou sinalização}
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Declaração com julgamento estético ("ficou bom") | REFORMULAR | Declaração é intenção, não avaliação |
| Elemento sem razão compositiva articulável | REVISAR composição | Elemento sem razão é decoração |
| Declaração contradiz briefing | SINALIZAR ao brand-strategist | Composição pode estar fora do DNA |

---

## Completion Criteria

- [ ] Elementos relevantes identificados
- [ ] Cada elemento tem razão compositiva articulável
- [ ] Alinhamento com briefing verificado
- [ ] Declaração formatada no modo correto (2 linhas Lean / completa Estendida)
- [ ] Zero julgamento estético no documento

---

*Task Version: 1.0 | Agent: visual-designer | Squad: branding-design*
