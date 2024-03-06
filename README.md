# Eleições Portugal App

Este é um aplicativo web desenvolvido em React com Vite e TypeScript, projetado para facilitar o processo de votação e fornecer resultados imediatos para as eleições em Portugal. Ele utiliza tecnologias modernas, como o MUI (Material-UI) para a interface do usuário e o Axios para comunicação com um servidor simulado usando JSON Server.

## Tecnologias Utilizadas

React
Vite
TypeScript
Axios
MUI (Material-UI)
JSON Server
Funcionalidades
Votação Simples: O aplicativo permite que os eleitores votem facilmente, inserindo o número de identificação fiscal (NIF) e selecionando o partido desejado.

Validação de Idade: A aplicação valida se o eleitor tem mais de 18 anos antes de permitir que ele vote.

Acesso ao Banco de Dados: Utiliza o JSON Server para simular um banco de dados de eleitores, onde o NIF é verificado para determinar se o eleitor está autorizado a votar.

Resultados Imediatos: Após o voto, os resultados são imediatamente disponibilizados através de um modal elegante, fornecendo estatísticas sobre os votos para cada partido.

### Como Executar o Projeto

Instalação de Dependências:

Certifique-se de ter o Node.js e o npm instalados. Em seguida, execute o seguinte comando para instalar as 
dependências do projeto:
npm install

Executar o JSON Server:
Execute o servidor JSON simulado para fornecer dados de eleitores. Certifique-se de ter o JSON Server instalado globalmente ou localmente:
npm install -g json-server

Em seguida, inicie o servidor JSON com o seguinte comando:

json-server --watch db.json --port 3001

Executar o Aplicativo:
Com o JSON Server em execução, você pode iniciar o aplicativo com o seguinte comando:

npm start
Isso iniciará o aplicativo em modo de desenvolvimento. 
Abra seu navegador e acesse http://localhost:3000 para visualizar o aplicativo.

### Contribuindo:
Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou relatar problemas para ajudar a melhorar este aplicativo. Juntos, podemos tornar o processo eleitoral mais acessível e eficiente para todos em Portugal.




