
# Repositório de Headers

Este repositório contém os códigos dos headers utilizados nos portais:

- [`home.carioca.rio`](https://home.carioca.rio/)
- [`prefeitura.rio`](https://prefeitura.rio/)

## Estrutura do Repositório

O repositório está dividido em duas pastas principais:

### `1-banner carioca`

Contém os arquivos responsáveis pelo header do site [home.carioca.rio](https://home.carioca.rio/).

⚠️ **Atenção**: Por questões relacionadas à configuração do servidor do Carioca, não foi possível passar o token de autenticação no header diretamente para o proxy do Carioca.

**Solução adotada**: As requisições são redirecionadas para o proxy presente no header do Prefeitura (veja abaixo).

### `2-banner prefeitura`

Contém os arquivos responsáveis pelo header do site [prefeitura.rio](https://prefeitura.rio/).

#### Pasta `proxy`

Esta pasta contém arquivos de configuração de um **proxy** utilizado para contornar problemas de **CORS**.

- O proxy é configurado para que as requisições sejam feitas do lado do servidor, evitando que o navegador identifique e bloqueie as chamadas externas.
- Essa solução garante maior segurança e compatibilidade nas requisições feitas a APIs externas que exigem autenticação ou têm regras rígidas de CORS.

## Branches

- `homologacao`: usada para testes e desenvolvimento.
- `producao`: **sempre usar essa branch para deploys em produção**.
