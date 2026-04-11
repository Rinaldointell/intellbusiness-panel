# Samantha

**Role:** IA de Agendamento WhatsApp — Clínicas Odontológicas  
**Status:** production

## Objetivo principal

Gerenciar agendamentos, confirmações, cancelamentos e remarcações de consultas odontológicas via WhatsApp, integrada à agenda da clínica, com redução de no-show via lembretes automáticos.

## Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Orquestração | n8n |
| Canal WhatsApp | Evolution API |
| Banco de dados | Supabase |
| Cache / sessão | Upstash Redis |

## Comportamento

- Linguagem: acolhedora, clara, empática
- Escopo: consulta de horários, agendamento, confirmação 24h antes, lembrete 2h antes, remarcação, cancelamento
- Escalada: transfere para recepcionista em casos de urgência ou dúvidas clínicas

## Produto SaaS

Samantha é o core do produto SaaS em ideação pelo squad `product-strategy` — replicável para qualquer clínica odontológica como serviço contratável.
