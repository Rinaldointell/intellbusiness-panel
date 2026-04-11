# intellbusiness-hub

Painel de controle central da INTELLBUSINESS.

## Hierarquia

```
product-strategy (coordenador)
├── branding-design        → ativo
│       └── sales-content  → pendente
│               └── whatsapp-agents  → pendente
└── (coordena todos)
```

## Squads filhos

| Squad | Status | Função |
|-------|--------|--------|
| branding-design | ativo | Marca e identidade visual |
| sales-content | pendente | Propostas, scripts, landing pages |
| whatsapp-agents | pendente | IAs Isabella, Sarah Lynn, Samantha |
| product-strategy | pendente | Roadmap, Samantha SaaS |

## Comandos rápidos

- `*status` — Ver todos os squads
- `*activate {id}` — Ativar squad filho
- `*brief {id} {mensagem}` — Enviar comando para squad filho
- `*chain {objetivo}` — Fluxo hierárquico completo
- `*coordinate {tópico}` — Acionar product-strategy
