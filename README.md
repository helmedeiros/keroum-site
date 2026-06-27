# KeroUm

> &ldquo;O local&rdquo; para compra de suas refeições — pelo celular, pelo iPad, ou direto das suas redes sociais.

KeroUm é uma plataforma de pedidos de refeição com cardápio rico, geolocalização, múltiplas formas de pagamento e acompanhamento em tempo real do clique à entrega. Este repositório hospeda o site de pitch (`index.html`) e uma demonstração interativa do fluxo de pedido (`demo.html`).

A versão publicada do site está em **[helmedeiros.github.io/keroum-site](https://helmedeiros.github.io/keroum-site/)**.

## Estrutura do site

A página principal narra o produto em sequência:

1. **Hero** com vídeo de apresentação e tagline.
2. **Problema** — três pontos de fricção do mercado atual.
3. **Solução** — o que o KeroUm resolve e como.
4. **Como funciona** — três passos do clique à mesa.
5. **Funcionalidades** — grade com seis recursos-chave.
6. **Equipe** — perfis dos fundadores.
7. **FAQ** — dúvidas frequentes.
8. **Contato** — formulário que dispara um e-mail para `kerohum@gmail.com`.

O cabeçalho traz um seletor de idioma (Português / English) com persistência via `localStorage`. Todo o conteúdo textual está disponível nos dois idiomas em `locales/`.

## Demo interativo

Em `/demo.html` há uma SPA AngularJS que simula o fluxo completo de um pedido sem qualquer backend:

- Catálogo com quatro restaurantes fictícios e cardápios completos.
- Carrinho com adição/remoção e cálculo de subtotal.
- Checkout (nome, endereço, forma de pagamento).
- Linha do tempo do pedido: recebido → em preparo → saiu para entrega → entregue.
- Chat com o restaurante e o entregador, com mensagens roteirizadas que aparecem em cada transição de status, mais respostas templated para o que você digitar.

## Stack

- HTML5 + Bootstrap 3.3
- Sass (`scss/` → `principal.css`)
- jQuery 1.11
- AngularJS 1.3 (somente na página de demo)
- jasmine para testes
- jshint, csslint, htmlhint para lint
- Travis CI para integração contínua (configuração em `.travis.yml`)
- GitHub Pages para hospedagem

## Desenvolvimento local

Requisitos: Node.js + npm.

```sh
make install        # npm install
make build          # compila o sass e monta dist/
make verify         # build + lint + test
make deploy         # verify + publica dist/ na branch gh-pages
```

Os equivalentes via npm são `npm run build`, `npm run lint`, `npm test`, `npm run verify` e `npm run deploy`.

Para servir o site localmente após o build:

```sh
cd dist && python3 -m http.server 8000
```

E acesse [http://localhost:8000](http://localhost:8000).

## Testes

`npm test` roda a suíte jasmine em `tests/`. Os módulos que tocam o DOM ou Angular são separados de uma camada de dados/regras puras (em `js/app/demo/*-script.js` e similares), de modo que a maior parte da lógica seja testável sem navegador.

## Deploy

`bin/publish.sh` empacota `dist/` e publica na branch `gh-pages`, que é servida pelo GitHub Pages. O script usa um worktree temporário para não mexer no working tree atual.

## Equipe

- **Deco Oliveira** — administrador e desenvolvedor de sistemas de alta disponibilidade.
- **Hana Medeiros** — administradora especialista em finanças e gerência administrativa.
- **Hélio Medeiros** — analista de sistemas, projeto, liderança e soluções escalonáveis.
- **Philipe Coutinho** — diretor de arte e webdesigner, especialista em UX.

## Contato

Para receber o plano de negócio ou propor uma parceria, escreva para `kerohum@gmail.com` ou use o formulário no rodapé do site.

## License

[MIT](LICENSE)
