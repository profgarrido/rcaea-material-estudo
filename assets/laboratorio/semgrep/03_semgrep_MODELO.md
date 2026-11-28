# Relatório de Análise Estática com Semgrep
## Etapa 3 - [Nome da equipe]

---

### 1. Identificação da análise

| Campo | Valor |
|---|---|
| Equipe | |
| Data da execução | |
| Versão do Semgrep | (resultado de `semgrep --version`) |
| Imagem Docker | `semgrep/semgrep` |
| Commit analisado | (resultado de `git rev-parse HEAD`) |
| Configurações utilizadas | `rules/classroom.yml`, `rules/minha-regra.yml` |
| Diretório analisado | `src/` |
| Comando executado | (cole o comando Docker completo) |
| Quantidade de alertas | (número total produzido pela análise) |
| Regras com correspondência | (ids das regras que produziram alertas) |

### Relatórios gerados

| Análise | Arquivo |
|---|---|
| Primeira busca didática | `reports/primeira-busca.sarif` |
| Análise da API | `reports/semgrep.sarif` |
| Regra personalizada | `reports/minha-regra.sarif` |

> O arquivo SARIF contém o resultado gerado pela ferramenta. Este relatório Markdown contém a interpretação e as conclusões produzidas pela equipe. Uma captura de tela do SARIF Viewer não substitui a análise escrita.

---

### 2. Resultados da análise com classroom.yml

> Documente os alertas investigados. Nao precisa registrar todos: selecione os mais relevantes.

#### Alerta 1

- **Regra:** (id da regra)
- **Arquivo:** `src/...`
- **Linha:**
- **Trecho de código:**
  ```
  (cole o trecho aqui)
  ```
- **Contexto:** (de onde vem o dado, qual operação é afetada)
- **Classificação:** [ ] Confirmado  [ ] Falso positivo  [ ] Pendente
- **Justificativa:** (explique tecnicamente a decisão)
- **Recomendação:** (o que corrigir ou investigar)

#### Alerta 2

(repita a estrutura acima para cada alerta investigado)

---

### 3. Regra personalizada

**Arquivo:** `rules/minha-regra.yml`

**Padrão escolhido e motivação:**
(descreva brevemente qual padrão a regra detecta e por que foi escolhido)

**Conteúdo da regra:**
```yaml
(cole o YAML aqui)
```

#### Caso positivo (deve ser sinalizado)

- **Arquivo de teste:** `src/teste-positivo.ts`
- **Trecho:**
  ```typescript
  (cole o trecho que deve acionar a regra)
  ```
- **Resultado:** alerta produzido / alerta nao produzido (inesperado)

#### Caso negativo (nao deve ser sinalizado)

- **Arquivo de teste:** `src/teste-negativo.ts`
- **Trecho:**
  ```typescript
  (cole o trecho que nao deve acionar a regra)
  ```
- **Resultado:** nenhum alerta / alerta produzido (inesperado)

**Limitações identificadas na regra:**
(o que a regra nao consegue detectar; quando pode produzir falsos positivos)

---

### 4. Comparação com a revisão manual

| Achado | Revisão manual | Semgrep | Observação |
|--------|---------------|---------|------------|
| (preencher) | Sim / Nao | Sim / Nao | |

**Achados identificados pela revisão manual e confirmados pelo Semgrep:**

**Achados identificados pelo Semgrep e nao mapeados na revisão manual:**

**Achados da revisão manual nao sinalizados pelo Semgrep:**
(explique o motivo)

**Limitações da análise estática neste projeto:**

---

### 5. Conclusão

(síntese do que foi realizado, principais achados e próximos passos)
