# Squad: branding-design

Estratégia de marca, identidade visual e comportamento de conversão para a INTELLBUSINESS.

## Missão do Squad

Garantir que cada entregável de branding da INTELLBUSINESS comunica intencionalmente o que precisa comunicar — com coerência de DNA, escala e referência ao manifesto.

## Hierarquia Operacional

```
ESTRATÉGIA → CRIAÇÃO → COMPORTAMENTO
```

| Agente | Tier | Papel | Veto |
|--------|------|-------|------|
| `@brand-strategist` | 0 | Guardião do manifesto — fala primeiro | DNA absoluto |
| `@visual-designer` | 1 | Criador — executa dentro do briefing | Sem veto próprio |
| `@ux-architect` | 1 | Validador — intervém por último | Veto funcional |

Nenhum agente opera fora desta sequência. Conflitos entre `@visual-designer` e `@ux-architect` são arbitrados pelo `@brand-strategist` com referência obrigatória ao manifesto.

## Agentes

| ID | DNA | Status | Arquivo |
|----|-----|--------|---------|
| `brand-strategist` | Paul Rand + Wolff Olins | Active | `agents/brand-strategist.md` |
| `visual-designer` | Peter Saville + Noma Bar | Planned | — |
| `ux-architect` | Landor & Fitch + Pentagram | Planned | — |

## Modos de Operação

| Modo | Trigger | Perguntas | Rounds | Runtime |
|------|---------|-----------|--------|---------|
| **Lean** | Posts, peças únicas | 3 | 1 | Minutos |
| **Estendido** | Brandbook, campanhas, apresentações | 5 | Até 3 | Horas |

O `@brand-strategist` declara o modo no início de cada projeto.

## Ativação

```
@branding-design:brand-strategist
```

## Manifesto INTELLBUSINESS (referência do squad)

| Elemento | Regra |
|---------|-------|
| Preto `#000000` | Cor primária — autoridade |
| Amarelo `#F5A800` | Acento de intenção — NUNCA fundo |
| Cinza `#2b2a2f` | Cor secundária |
| Blinker | Logo — intocável |
| Anton | Títulos — load-bearing |
| Aileron | Subtítulos — ritmo |
| Estilo | Minimalista tech corporativo, luxo discreto |

## Entregáveis Suportados

| Entregável | Modo | Agente Líder |
|-----------|------|-------------|
| Post Instagram / Story | Lean | `@visual-designer` |
| Landing page | Lean/Estendido | `@visual-designer` |
| Apresentação de cliente | Estendido | `@visual-designer` |
| Brandbook | Estendido | Todos |
| Proposta comercial | Estendido | `@brand-strategist` |
| Identidade visual (novo elemento) | Estendido | `@brand-strategist` |

## Infraestrutura

```
squads/branding-design/
├── agents/
│   └── brand-strategist.md
├── tasks/
│   ├── briefing-workflow.md
│   ├── arbitrar-workflow.md
│   └── validar-dna-workflow.md
├── templates/
│   ├── briefing-lean-tmpl.md
│   └── briefing-estendido-tmpl.md
├── checklists/
│   └── brand-strategist-quality-gate.md
├── config.yaml
└── README.md
```
