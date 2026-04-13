# App Agenda Regulatória ANTAQ

Aplicação web instalável (PWA) para acompanhamento da Agenda Regulatória da ANTAQ, com atualização dinâmica de dados via Google Sheets.

## Funcionalidades

- Visualização dos temas por eixo regulatório
- Consulta de temas e macroetapas
- Busca por tema, número do processo, relatoria e área técnica
- Tela de detalhe com informações completas do tema
- Link direto para a página oficial da Agenda Regulatória
- Atualização automática dos dados a partir da planilha
- Funcionamento offline com cache local
- Instalável como app em dispositivos móveis (PWA)

## Tecnologias Utilizadas

- React
- Vite
- React Router
- JavaScript
- CSS
- PWA (via vite-plugin-pwa)
- Google Sheets (como fonte de dados)
- Papa Parse (para leitura e parsing do CSV)
- GitHub Pages (para publicação)

## Fonte de Dados

Os dados são consumidos dinamicamente a partir de uma planilha publicada em CSV no Google Sheets.  
A atualização é automática: quando a planilha é atualizada, o aplicativo reflete as alterações sem necessidade de modificar o código ou fazer novo deploy.

## Como Executar Localmente

Clone o repositório e instale as dependências:

```bash
npm install
npm run dev
```

O app ficará disponível em ambiente local.

## Build de Produção

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Publicação

Este projeto pode ser publicado no GitHub Pages (ou outra hospedagem estática).  
Após o build, o conteúdo gerado em `dist/` pode ser servido como site estático.

## Funcionamento Offline

Após o primeiro acesso com conexão à internet, os dados são armazenados localmente no navegador.  
Em acessos subsequentes sem conexão, o app continua funcional utilizando o último estado armazenado.

## Observações

- A aplicação consome dados de uma planilha publicada como CSV, em modo somente leitura.
- A manutenção do conteúdo é feita diretamente na planilha, sem necessidade de alterações no código.
- O projeto foi desenvolvido para ser leve, responsivo e de fácil manutenção.
