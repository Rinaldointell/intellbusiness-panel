# Task: Protocolo de Ignição e Geração de Briefing

**Task ID:** briefing-workflow
**Version:** 1.0
**Purpose:** Executar protocolo de ignição estratégica e gerar briefing para handoff ao visual-designer
**Orchestrator:** @brand-strategist
**Mode:** Interactive (elicit=true — as perguntas de ignição NUNCA são puladas)
**elicit:** true

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `project_description` | string | Sim | O que precisa ser criado |
| `deliverable_type` | string | Sim | Post, apresentação, brandbook, landing page... |
| `mode_hint` | string | Não | Lean ou Estendido — se não fornecido, brand-strategist decide |

---

## Precondições

- [ ] Nenhum briefing anterior ativo para o mesmo entregável
- [ ] Usuário disponível para responder as perguntas de ignição
- [ ] Tipo de entregável identificado

---

## STEP 1: Declarar Modo de Operação

**Ação:** Avaliar o tipo de entregável e declarar o modo.

```yaml
mode_decision:
  lean:
    triggers:
      - Post Instagram / Story / Reels cover
      - Peça única ou pontual
      - Material simples sem sistema complexo
    protocol:
      questions: 3
      rounds: 1
      output: briefing em 1 parágrafo

  extended:
    triggers:
      - Brandbook ou guia de identidade
      - Campanha completa
      - Apresentação para cliente
      - Novo elemento de identidade visual
      - Material de proposta comercial
    protocol:
      questions: 5
      rounds: 3
      output: briefing completo com diretivas por elemento
```

**Output do Step 1:**
```
🎯 Modo [LEAN|ESTENDIDO] declarado para: {deliverable_type}
```

**Veto:**
- Se o tipo de entregável não for identificável → perguntar antes de declarar modo

---

## STEP 2: Execução do Protocolo de Ignição

**CRÍTICO:** Este step é INTERATIVO. Nunca pular. Nunca assumir respostas.

### Modo LEAN — 3 Perguntas Obrigatórias

Apresentar SEQUENCIALMENTE. Aguardar cada resposta antes da próxima:

**Pergunta 1:**
> "Qual é o ÚNICO comportamento que você quer provocar no cliente depois de ver esse material?"

*Critério de aceitação:* Resposta específica e única (ex: "assinar a proposta", "agendar uma demo"). Recusar respostas genéricas ("despertar interesse", "engajar"). Se genérica: "Preciso de mais especificidade — qual ação física ou decisão você quer que o cliente tome?"

**Pergunta 2:**
> "Qual é o medo que esse material precisa dissolver?"

*Critério de aceitação:* Medo específico e nomeado (ex: "perder controle ao automatizar", "depender de tecnologia que não entende"). Recusar medos vagos ("resistência à mudança"). Se vago: "Qual medo específico esse cliente carrega? O que ele pensa de manhã antes de dormir sobre esse assunto?"

**Pergunta 3:**
> "Isso é para conquistar ou para reter cliente?"

*Decisão que gera diretiva:*
- Conquistar → mostrar poder, capacidade, autoridade técnica
- Reter → mostrar resultado, evolução, parceria

### Modo ESTENDIDO — adiciona:

**Pergunta 4:**
> "Esse material fala com CEO, gestor ou founder?"

*Decisão que gera hierarquia de comunicação:*
- CEO → poder e controle no headline
- Gestor → processo e eficiência no detalhe
- Founder → visão e escala na narrativa
- Múltiplos → definir hierarquia (quem lê primeiro, quem lê depois)

**Pergunta 5:**
> "Em 10 anos, esse material vai envergonhar ou orgulhar a INTELLBUSINESS?"

*Filtro anti-tendência:* Se a resposta indica envergonhar (ou hesitação) → revisão necessária antes do briefing.

---

## STEP 3: Identificar Discurso Involuntário

**Ação:** Com base nas respostas, identificar o que o material PODE comunicar sem intenção.

```yaml
involuntary_discourse_check:
  questions:
    - 'Dado o medo identificado, qual mensagem poderia REFORÇAR esse medo involuntariamente?'
    - 'Qual estilo visual poderia comunicar o oposto do que queremos?'
    - 'O que o cliente poderia interpretar ALÉM da intenção declarada?'

  output:
    - discurso_a_evitar: '{o que não pode ser comunicado}'
    - discurso_a_construir: '{o que precisa ser comunicado}'
```

---

## STEP 4: Verificar Personas Constitucionais

**Ação:** Verificar se o entregável fala com pelo menos 2 das 3 personas.

```yaml
personas_check:
  ceo: 'CEO desconfiante de tecnologia — quer controle, teme perder autonomia'
  manager: 'Gestor operacional sobrecarregado — quer eficiência imediata'
  founder: 'Founder que quer crescer sem perder a alma'

  rule: 'Pelo menos 2 das 3 devem ser atendidas'
  veto_if: 'Material fala com menos de 2 personas'
```

---

## STEP 5: Gerar Briefing

**Template:** Usar conforme o modo.
- Lean → `squads/branding-design/templates/briefing-lean-tmpl.md`
- Estendido → `squads/branding-design/templates/briefing-estendido-tmpl.md`

### Briefing Lean — formato:

```
**BRIEFING LEAN — {deliverable_type} INTELLBUSINESS**
Modo: LEAN | Entregável: {deliverable_type} (Modo {visual_mode})

{Parágrafo único contendo:}
- Comportamento-alvo único que o material deve provocar
- Medo específico a dissolver
- Contexto da persona (quem lê)
- Conquistar ou reter (e o que isso significa para o visual)
- Discurso involuntário a EVITAR
- Discurso a CONSTRUIR

→ Modo LEAN confirmado. Handoff ao visual-designer autorizado.
```

### Briefing Estendido — formato:

```
**BRIEFING ESTENDIDO — {deliverable_type} INTELLBUSINESS**
Modo: ESTENDIDO | Entregável: {deliverable_type} (Modo {visual_mode})

1. Comportamento-alvo: {resposta específica da pergunta 1}
2. Medo a dissolver: {resposta específica da pergunta 2}
3. {Conquistar|Reter}: {implicação criativa}
4. Persona(s): {resposta pergunta 4 + hierarquia de comunicação}
5. Legado: {resposta pergunta 5}

Diretivas criativas:
- {diretiva 1 — tipografia}
- {diretiva 2 — cor}
- {diretiva 3 — elementos}
- {diretivas adicionais baseadas no entregável}

Discurso a EVITAR: {discurso involuntário identificado}
Discurso a CONSTRUIR: {discurso intencional}

→ Modo ESTENDIDO confirmado. Handoff ao visual-designer autorizado.
```

---

## STEP 6: Teste de Escala (obrigatório antes de liberar)

**Ação:** Verificar se o briefing suporta as variações de escala.

```yaml
scale_test:
  checks:
    - 'Cartão de visita → outdoor: as diretivas funcionam nos dois?'
    - 'Português → inglês: a mensagem sobrevive à tradução?'
    - 'Colorido → preto e branco: a hierarquia se mantém sem cor?'

  veto_if: 'Qualquer check falhar — revisar diretivas antes de liberar'
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Perguntas de ignição não respondidas | VETO — não gerar briefing | Sem briefing, visual-designer cria no escuro |
| Resposta genérica na pergunta 1 | SOLICITAR especificidade | "Despertar interesse" não é comportamento acionável |
| Medo vago na pergunta 2 | SOLICITAR especificidade | Medo sem nome não gera diretiva criativa |
| Material fala com menos de 2 personas | REVISAR escopo | Viola protocolo INTELLBUSINESS |
| Briefing contradiz o DNA visual (cores, tipografia) | REVISAR diretivas | Todo briefing deve ser executável dentro do manifesto |

---

## Completion Criteria

- [ ] Modo declarado explicitamente (Lean ou Estendido)
- [ ] Todas as perguntas do protocolo respondidas especificamente
- [ ] Discurso involuntário identificado e documentado
- [ ] Personas constitucionais verificadas (mínimo 2 de 3)
- [ ] Teste de escala aplicado e aprovado
- [ ] Briefing gerado no formato correto para o modo
- [ ] Handoff ao visual-designer autorizado

---

*Task Version: 1.0 | Agent: brand-strategist | Squad: branding-design*
