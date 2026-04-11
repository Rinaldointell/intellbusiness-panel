# Template: Relatório de Validação Estendido

**Template ID:** relatorio-validacao-estendido-tmpl
**Versão:** 1.0
**Uso:** Entregáveis em Modo ESTENDIDO — relatório completo
**Gerado por:** @ux-architect via *validar

---

```
**RELATÓRIO DE VALIDAÇÃO — {entregavel} INTELLBUSINESS**
Veredicto: APROVA | APROVA COM CONDIÇÕES | VETA

──────────────────────────────────────────────────
PROTOCOLO DE CONVERSÃO
──────────────────────────────────────────────────

Ação esperada: {comportamento-alvo do briefing}
Avaliação: o design {cria|remove} atrito para {ação} porque {razão comportamental}.

──────────────────────────────────────────────────
TESTE DOS 3 SEGUNDOS
──────────────────────────────────────────────────

[Peça inteira / Seção por seção:]
{Seção/Slide N}: PASSA — o cliente leva "{X}" / FALHA — leva "{Y}" em vez de "{Z}"
{Seção/Slide N}: ...

Taxa de aprovação: {N}/{total} seções PASSAM

──────────────────────────────────────────────────
FEEDBACK POR ELEMENTO (apenas itens com VETA)
──────────────────────────────────────────────────

[Elemento A] cria [atrito específico] para [persona] porque [razão comportamental].
Alternativa: [ação específica e acionável].

[Elemento B] cria [atrito] porque [razão].
Alternativa: [ação].

──────────────────────────────────────────────────
PERSONAS ATENDIDAS
──────────────────────────────────────────────────

[X] CEO desconfiante de tecnologia — {como o material fala com ele}
[X/ ] Gestor operacional sobrecarregado — {como ou por que não é foco}
[X/ ] Founder que quer crescer — {como ou por que não é foco}

Resultado: {N}/3 personas atendidas — {PASSA (≥2) | VETA (<2)}

──────────────────────────────────────────────────
CONSISTÊNCIA COM TOUCHPOINTS
──────────────────────────────────────────────────

Resultado: CONSISTENTE | INCONSISTÊNCIA DETECTADA
{Detalhe de inconsistências, se houver}

──────────────────────────────────────────────────
PRÓXIMA AÇÃO
──────────────────────────────────────────────────

→ {APROVADO — entregar ao cliente |
   APROVADO COM CONDIÇÕES — corrigir {X} e {Y} antes de usar |
   VETADO — retornar ao visual-designer com feedback acima}
```

---

## Exemplo Preenchido (parcial)

```
**RELATÓRIO DE VALIDAÇÃO — Apresentação Enterprise INTELLBUSINESS**
Veredicto: APROVA COM CONDIÇÕES

──────────────────────────────────────────────────
PROTOCOLO DE CONVERSÃO
──────────────────────────────────────────────────

Ação esperada: CEO assina proposta nesta reunião.
Avaliação: o design remove atrito para a decisão nos slides 1-3 e 5-10,
mas cria atrito de processamento nos slides 4 e 7.

──────────────────────────────────────────────────
TESTE DOS 3 SEGUNDOS
──────────────────────────────────────────────────

Slides 1-3: PASSA — o cliente leva "empresa de autoridade técnica"
Slide 4: FALHA — o cliente leva "lista de features" em vez de "poder"
Slides 5-6: PASSA — o cliente leva "processo controlado"
Slide 7: FALHA — o cliente leva "três coisas" sem hierarquia
Slides 8-10: PASSA — o cliente leva "próximo passo claro"

Taxa de aprovação: 8/10 slides PASSAM

──────────────────────────────────────────────────
FEEDBACK POR ELEMENTO
──────────────────────────────────────────────────

[Slide 4 — bullet points] cria atrito de processamento para CEO ocupado porque
lista força leitura sequencial — CEO precisa decidir, não ler.
Alternativa: 1 afirmação por slide em Anton — hierarquia elimina o atrito.

[Slide 7 — três pontos iguais] cria barreira de sequência para CEO porque
sem hierarquia o cliente não sabe qual ponto é mais importante.
Alternativa: ponto principal em Anton dominante, demais em Aileron menor.

──────────────────────────────────────────────────
PERSONAS ATENDIDAS
──────────────────────────────────────────────────

[X] CEO desconfiante — headlines de poder em 8/10 slides confirmam controle
[X] Gestor sobrecarregado — slides 5-6 têm processo e resultado mensuráveis
[ ] Founder — não é foco desta apresentação enterprise (OK — 2/3 atendidas)

Resultado: 2/3 personas atendidas — PASSA

──────────────────────────────────────────────────
CONSISTÊNCIA COM TOUCHPOINTS
──────────────────────────────────────────────────

Resultado: CONSISTENTE — Anton e paleta usados como nos materiais anteriores

──────────────────────────────────────────────────
PRÓXIMA AÇÃO
──────────────────────────────────────────────────

→ APROVADO COM CONDIÇÕES — corrigir slides 4 e 7 antes de usar com cliente.
```

---

*Template Version: 1.0 | branding-design squad*
