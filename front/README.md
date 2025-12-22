## Documentação da FrontEnd – Controle de Gastos

## 1- Instalar o React e TypeScript 
npx create-react-app front --template typescript
cd front
npm install

## 2- Instalar o router
npm install react-router-dom@latest

## 3- Instalar tipagens
npm install -D @types/react-router-dom@latest

Escolhi o metodo de views, types, services, hooks e components pois a estrutura do codigo fica melhor. 
De um arquivo de 2000+ linhas reduzida em 300/400 linhas.

Estou usando a pasta views para importar o meu componente principal, types para guardar as interfaces, services para montar a consulta na api https://localhost:7092/api/, hooks para montar a logica chamando a service, components para poder exibir o codigo front end e tbm expor as consultas e enviar formularios de cadastros.
