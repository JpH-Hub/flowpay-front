# FlowPay Frontend

Frontend da plataforma FlowPay para acompanhamento e gerenciamento de chamados de atendimento. A aplicação foi construída com React, Vite e Tailwind CSS.

## Acesso em produção

A versão publicada do frontend está disponível em:

https://flowpay-front.vercel.app/

## Acesso local

Depois de iniciar o servidor de desenvolvimento, acesse:

```text
http://localhost:5173
```

O endereço pode mudar caso a porta `5173` esteja ocupada. Nesse caso, o Vite informa a URL alternativa no terminal.

## Requisitos

- Node.js 18 ou superior
- npm
- API/backend do FlowPay em execução

## Instalação e execução

Na raiz do projeto:

```bash
npm install
```

Crie um arquivo `.env` com a URL da API:

```env
VITE_API_URL=http://localhost:8080/api
```

O valor acima é um exemplo. Use a URL e a porta configuradas no backend. A variável precisa começar com `VITE_` para ser disponibilizada ao frontend pelo Vite.

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Para gerar e testar o bundle de produção localmente:

```bash
npm run build
npm run preview
```

## Como a aplicação funciona

O ponto de entrada é `src/App.jsx`. Ele controla a aba ativa e renderiza uma das três views disponíveis.

### Visão Geral e Monitoramento

É a tela principal da aplicação. Ela:

- busca o estado atual do dashboard pela API;
- organiza as equipes em colunas responsivas;
- exibe atendentes, capacidade, tickets ativos e fila de espera;
- mostra a atividade recente retornada pelo endpoint de monitoring;
- permite clicar em qualquer ticket para abrir seus detalhes em um drawer fixo;
- informa estados de carregamento, erro de conexão e dashboard vazio.

Em telas pequenas, as equipes são empilhadas. Em telas médias e grandes, elas são organizadas em duas ou três colunas conforme a largura disponível.

### Abrir Chamado

Exibe o formulário para criar um novo ticket. O formulário envia a referência da conversa (`conversationRef`) e o assunto ou mensagem do cliente (`subject`). Após a criação, o formulário é limpo e o dashboard é atualizado.

### Fechar Chamado

Busca os tickets ativos e permite encerrá-los individualmente. Depois do encerramento, o dashboard é atualizado para refletir a nova situação.

## Integração com a API

A comunicação está centralizada em `src/services/apiService.js` e usa `VITE_API_URL` como base:

| Método | Endpoint | Uso |
| --- | --- | --- |
| `GET` | `/dashboard` | Carrega equipes, atendentes, tickets e filas |
| `GET` | `/monitoring` | Carrega atividades recentes |
| `POST` | `/tickets` | Cria um ticket |
| `PATCH` | `/tickets/:id/close` | Encerra um ticket |

O frontend espera respostas JSON. Erros HTTP são convertidos em exceções e tratados nos fluxos correspondentes.

## Estrutura principal

```text
src/
├── App.jsx                 # Navegação entre as views
├── components/
│   ├── dashboard/          # Colunas, agentes, filas e atividade recente
│   ├── layout/             # Sidebar, cabeçalho e detalhes do ticket
│   └── ui/                 # Componentes visuais reutilizáveis
├── constants/              # Status e constantes do domínio
├── hooks/                  # Estado e chamadas assíncronas das views
├── services/               # Integração com a API
├── utils/                  # Funções auxiliares
└── views/                  # Dashboard, criação e encerramento
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor Vite com hot reload |
| `npm run build` | Gera o bundle de produção em `dist/` |
| `npm run preview` | Serve o bundle de produção localmente |
| `npm run lint` | Executa o Oxlint |
| `npm test` | Executa os testes com Vitest |

Para executar os testes uma única vez:

```bash
npm test -- --run
```

## Tecnologias

- React 19
- Vite
- Tailwind CSS 4
- Lucide React
- Sonner
- Vitest e Testing Library
