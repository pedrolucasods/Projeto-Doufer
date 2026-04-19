# Doufer - Sistema de Gerenciamento

🚧 **Projeto em desenvolvimento**

Sistema de gerenciamento desenvolvido para a loja **Doufer**, focado no controle de **clientes e pedidos**, permitindo cadastro, edição, consulta e exclusão de registros, além do gerenciamento de **imagens associadas aos pedidos**.

O sistema pode ser executado como **aplicação desktop utilizando Electron** ou diretamente no **navegador durante o desenvolvimento**.

---

# 📌 Status do projeto

Este projeto ainda está em **desenvolvimento ativo**.
Novas funcionalidades, melhorias na arquitetura e ajustes na estrutura do banco de dados podem ser adicionados ao longo do tempo.

---

# ⚙️ Funcionalidades atuais

* Cadastro de clientes
* Edição de clientes
* Exclusão de clientes
* Cadastro de pedidos
* Consulta de registros cadastrados
* Versionamento da estrutura do banco utilizando **Sequelize Migrations**

---

# 🛠️ Tecnologias utilizadas

* Node.js
* Express.js
* Electron
* Sequelize ORM
* SQLite
* Handlebars
* JavaScript

---

# 📁 Estrutura do projeto
```
Projeto-Doufer
│
├─ src
│  ├─ backend
|  |  ├─ associations
│  │  ├─ config
│  │  ├─ controllers
│  │  ├─ middlewares
│  │  ├─ migrations
│  │  ├─ models
│  │  ├─ routes
│  │  ├─ services
│  │  ├─ database.js
│  │  └─ server.js
│  │
│  ├─ frontend
│  │  ├─ public
│  │  │  ├─ css
│  │  │  └─  javascript
│  │  ├─ views
│  │  │  └─  layouts
│  │
├─ .env
├─ main.js
└─ package.json
```
---

# 🗄️ Banco de dados

O sistema utiliza **SQLite** como banco de dados local.

A estrutura do banco é gerenciada utilizando **Sequelize Migrations**, permitindo versionamento e alterações seguras na estrutura das tabelas ao longo do desenvolvimento.

---

# 🔧 Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

PORT=3000

DB_DIALECT=sqlite

DB_STORAGE=loja.sqlite

---

# ▶️ Como executar (Modo Desktop)

Certifique-se de ter o **Node.js instalado**.

Clone o repositório:

git clone https://github.com/pedrolucasods/Projeto-Doufer.git
cd Projeto-Doufer

Instale as dependências:

npm install

Execute o sistema:

npx electron main.js

---

# ▶️ Como executar (Modo Navegador)

Entre na pasta do backend:

cd src/backend

Inicie o servidor:

node server.js

Abra o navegador no endereço:

http://localhost:3000

---

# 🗃️ Migrations

Executar migrations:

npx sequelize-cli db:migrate

Verificar status das migrations:

npx sequelize-cli db:migrate:status

Desfazer a última migration:

npx sequelize-cli db:migrate:undo

---

# 👨‍💻 Autor

Pedro Lucas

GitHub:
https://github.com/pedrolucasods
