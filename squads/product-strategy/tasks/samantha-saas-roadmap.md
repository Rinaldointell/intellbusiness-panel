# Samantha SaaS — Roadmap

## Status atual

- Agente funcional em produção (clínicas odontológicas)
- Stack validada: n8n + Evolution API + Supabase + Upstash Redis
- Sem cliente fixo / contrato recorrente ainda
- Produto não empacotado, operado caso a caso

---

## Marcos

### M1 — Validação piloto
- [ ] Identificar 1 clínica odontológica parceira
- [ ] Implantar Samantha com acompanhamento próximo
- [ ] Coletar métricas: agendamentos, no-show, satisfação
- [ ] Documentar fricções e ajustes necessários

### M2 — Precificação
- [ ] Definir modelo: mensalidade fixa ou por volume de atendimentos
- [ ] Calcular custo de infraestrutura por cliente
- [ ] Estabelecer tier de entrada (clínica solo) e tier escala (rede)
- [ ] Validar pricing com piloto

### M3 — Onboarding
- [ ] Criar checklist de implantação (integração agenda, número WhatsApp, personalização)
- [ ] Documentar playbook de setup para novos clientes
- [ ] Definir SLA de ativação (meta: < 5 dias úteis)

### M4 — Escala
- [ ] Automatizar provisionamento de nova instância por cliente
- [ ] Criar painel de gestão multi-cliente
- [ ] Definir canal de aquisição (inbound via sales-content)
- [ ] Meta: 5 clínicas ativas até fim do ciclo

---

## Dependências

| Squad | Entrega necessária |
|-------|--------------------|
| `branding-design` | Identidade visual do produto Samantha (nome, paleta, tom) |
| `sales-content` | Proposta comercial e landing page do produto |
