# Checklist: Visual Designer Quality Gate

**Checklist ID:** visual-designer-quality-gate
**Versão:** 1.0
**Uso:** Validação interna antes de entregar ao ux-architect
**Aplicado por:** @visual-designer
**Regra de aprovação:** 100% blocking + 80% recommended = PASS

---

## SEÇÃO 1 — BLOCKING (VETO interno se qualquer item falhar)

### 1.1 Pré-requisito

| # | Check | Veto se falhar | Ação |
|---|-------|----------------|------|
| B01 | Briefing aprovado pelo brand-strategist estava disponível antes de criar? | VETO — não entregar | Sinalizar ao brand-strategist |

### 1.2 Gramática Visual

| # | Check | Veto se falhar | Ação |
|---|-------|----------------|------|
| B02 | Existe elemento dominante único e declarado? | VETO | Definir dominância antes de entregar |
| B03 | Nenhum segundo elemento compete pelo domínio visual? | VETO | Remover ou hierarquizar |
| B04 | Máximo 3 elementos na composição (ou justificativa estratégica do brand-strategist)? | VETO | Simplificar |
| B05 | Espaço negativo tem intenção compositiva articulável? | VETO | Definir intenção ou remover |

### 1.3 Sistema Tipográfico

| # | Check | Veto se falhar | Ação |
|---|-------|----------------|------|
| B06 | Blinker presente no logo sem nenhuma modificação? | VETO imediato | Restaurar Blinker original |
| B07 | Anton usado em posição load-bearing (nunca decorativa)? | VETO | Reposicionar ou substituir |
| B08 | Aileron não compete com Anton em tamanho ou peso? | VETO | Ajustar hierarquia |
| B09 | Nenhuma fonte fora do sistema (Blinker/Anton/Aileron) em posição estrutural? | VETO | Remover fonte externa |

### 1.4 Sistema de Cores

| # | Check | Veto se falhar | Ação |
|---|-------|----------------|------|
| B10 | #F5A800 não está sendo usado como fundo ou cor dominante? | VETO imediato | Mover para posição de acento |
| B11 | Se #F5A800 presente, existe hierarquia clara de leitura? | VETO | Definir hierarquia ou remover amarelo |

### 1.5 Declaração de Intenção

| # | Check | Veto se falhar | Ação |
|---|-------|----------------|------|
| B12 | Declaração de intenção documentada no formato correto? | VETO — não entregar sem | Executar *declarar-intencao |
| B13 | Declaração sem julgamento estético ("ficou bonito", "prefiro")? | REFORMULAR | Substituir por razão compositiva |

---

## SEÇÃO 2 — RECOMMENDED (WARNING se falhar)

| # | Check | Impacto se falhar |
|---|-------|------------------|
| R01 | Modo de criação correto aplicado (Pulso/Impacto/Monumental)? | Física de atenção errada para o canal |
| R02 | Modo Pulso: teste de 1,5 segundos aplicado e aprovado? | Entregável ineficaz no Instagram |
| R03 | Modo Monumental: segundo significado buscado? | Perde oportunidade de profundidade |
| R04 | Composição testada em escala (cartão → outdoor, colorido → P&B)? | Risco de fragilidade sistêmica |
| R05 | Discurso involuntário verificado contra o briefing? | Pode reforçar o medo a evitar |

---

## SEÇÃO 3 — GRAMÁTICA VISUAL (referência rápida)

```
REGRAS ABSOLUTAS:
  1. Hierarquia tipográfica sempre presente — existe sempre fonte dominante clara
  2. Espaço negativo como elemento ativo — nunca vazio sem intenção
  3. Máximo 3 elementos — complexidade adicional exige justificativa estratégica

TIPOGRAFIA:
  Blinker  → logo — INTOCÁVEL
  Anton    → títulos — load-bearing, nunca decorativa
  Aileron  → subtítulos — define ritmo, nunca compete com Anton

CORES:
  #000000  → primária, fundo de autoridade
  #F5A800  → acento de intenção APENAS — nunca fundo
  #2b2a2f  → secundária, suporte

MODOS:
  Monumental → cada elemento justificado, buscar 2º significado
  Impacto    → uma mensagem por seção
  Pulso      → funciona em 1,5s ou não existe
```

---

## RESULTADO

```
BLOCKING:    ___/13 itens passaram
RECOMMENDED: ___/5 itens passaram

Resultado:
[ ] PASS        — 13/13 blocking + ≥4/5 recommended
[ ] CONDITIONAL — 13/13 blocking + <4/5 recommended
[ ] VETO        — qualquer blocking falhou

Itens em VETO:
- B___ : {problema}

Observações:
- R___ : {observação}
```

---

*Checklist Version: 1.0 | Agent: visual-designer | Squad: branding-design*
