# Task: Audit de Consistência de Touchpoints

**Task ID:** audit-consistencia-workflow
**Version:** 1.0
**Purpose:** Verificar consistência do novo entregável com todos os materiais anteriores aprovados
**Orchestrator:** @ux-architect
**Mode:** Autonomous
**elicit:** false

---

## Inputs

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `novo_entregavel` | document | Sim | Entregável a ser verificado |
| `touchpoints_anteriores` | list | Não | Lista de materiais aprovados anteriores |

---

## Precondições

- [ ] Novo entregável disponível

---

## STEP 1: Mapear Touchpoints Existentes

```yaml
touchpoint_mapping:
  if_touchpoints_provided:
    action: 'Usar lista fornecida'

  if_no_touchpoints:
    action: 'Registrar entregável como primeiro touchpoint base'
    output: 'Primeiro entregável do sistema. Nenhuma consistência a verificar. Registrado como base.'
    complete: true

  dimensions_to_map:
    - 'Tom e vocabulário — como a INTELLBUSINESS fala'
    - 'Hierarquia visual — padrão tipográfico estabelecido'
    - 'Uso de cor — como #F5A800 foi usado anteriormente'
    - 'Comportamento esperado — qual gatilho o cliente já associa à marca'
    - 'Densidade de informação — nível de complexidade visual estabelecido'
```

---

## STEP 2: Verificar 5 Dimensões de Consistência

### Dimensão 1: Tom e Vocabulário

```yaml
tone_check:
  question: 'A INTELLBUSINESS fala da mesma forma neste entregável?'
  pass: 'Tom e vocabulário reconhecíveis como a mesma marca'
  fail: 'Tom diferente — pode ser confundido com outra marca'
  format: 'Tom: {CONSISTENTE|INCONSISTENTE} — {detalhe}'
```

### Dimensão 2: Hierarquia Visual

```yaml
hierarchy_check:
  question: 'O cliente reconhece o padrão tipográfico desta marca?'
  elements: ['Uso de Anton', 'Uso de Aileron', 'Posição do logo Blinker', 'Peso visual']
  pass: 'Hierarquia reconhecível como INTELLBUSINESS'
  fail: 'Hierarquia diferente — ruptura de memória visual'
  format: 'Hierarquia: {CONSISTENTE|INCONSISTENTE} — {elemento divergente}'
```

### Dimensão 3: Uso de Cor

```yaml
color_consistency:
  question: '#F5A800 está sendo usado no mesmo tipo de elemento que nos materiais anteriores?'
  pass: 'Acento no mesmo tipo de elemento — mesma promessa visual'
  fail: '#F5A800 em posição diferente — dilui o significado do acento'
  format: 'Cor: {CONSISTENTE|INCONSISTENTE} — {detalhe}'
```

### Dimensão 4: Comportamento Esperado

```yaml
behavior_check:
  question: 'O gatilho de conversão é reconhecível para quem já viu materiais anteriores?'
  pass: 'Mesmo padrão de CTA e gatilho — memória muscular preservada'
  fail: 'Gatilho diferente — cliente precisa reaprender onde clicar/decidir'
  format: 'Comportamento: {CONSISTENTE|INCONSISTENTE} — {detalhe}'
```

### Dimensão 5: Densidade de Informação

```yaml
density_check:
  question: 'O nível de complexidade visual é compatível com os materiais anteriores?'
  pass: 'Densidade visual consistente — cliente não se surpreende'
  fail: 'Densidade muito diferente — ruptura de expectativa'
  format: 'Densidade: {CONSISTENTE|INCONSISTENTE} — {detalhe}'
```

---

## STEP 3: Emitir Relatório de Consistência

```
**AUDIT DE CONSISTÊNCIA — {novo_entregavel}**

Touchpoints verificados: {lista}

Tom:          {CONSISTENTE|INCONSISTENTE} — {detalhe}
Hierarquia:   {CONSISTENTE|INCONSISTENTE} — {detalhe}
Cor:          {CONSISTENTE|INCONSISTENTE} — {detalhe}
Comportamento:{CONSISTENTE|INCONSISTENTE} — {detalhe}
Densidade:    {CONSISTENTE|INCONSISTENTE} — {detalhe}

Resultado: {CONSISTENTE | INCONSISTÊNCIA DETECTADA}

Inconsistências:
- {dimensão}: {touchpoint anterior} vs {novo entregável} — {impacto na confiança}
  Recomendação: {ação específica para resolver}

→ {PROSSEGUIR COM VALIDAÇÃO | CORRIGIR INCONSISTÊNCIAS ANTES DE VALIDAR}
```

---

## Veto Conditions

| Condição | Ação | Razão |
|---------|------|-------|
| Inconsistência detectada em qualquer dimensão | DOCUMENTAR e VETA na validação | Inconsistência = perda de confiança |
| Sem touchpoints anteriores | Registrar como base, prosseguir | Primeiro entregável não tem inconsistência |

---

## Completion Criteria

- [ ] Touchpoints anteriores mapeados (ou ausência registrada)
- [ ] 5 dimensões verificadas
- [ ] Resultado CONSISTENTE ou INCONSISTENTE por dimensão
- [ ] Relatório de consistência completo
- [ ] Recomendações documentadas para cada inconsistência
- [ ] Decisão: prosseguir ou corrigir antes de validar

---

*Task Version: 1.0 | Agent: ux-architect | Squad: branding-design*
