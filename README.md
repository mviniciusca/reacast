# 🚀 Reacast
<p align="center">
    <img src="https://i.imgur.com/w5DeSRQ.gif">
</p>

## ⚔️ Sobre 
Aplicativo baseado em React que traz a previsão do tempo das cidades, utilizando uma API. Também irá trazer a lista de aeroportos próximos* baseado na localizaçao obtida pelo próprio app ao receber a cidade digitada. Agora, também é possível pesquisar a previsão do tempo na sua cidade utilizando a sua localização atual.

Baseado no Workshop fornecido pela Escola Britânica de Artes Criativas e Tecnologia e guiado pelo professor de React, Miguel.

## 🔭 Acesse o App 

Você pode acessar o app rodando através do deploy feito no <a href="https://reacast.vercel.app/">Vercel</a> 💜
## 🧪 Features

- [x] Busca com todas as cidades do Mundo; 
- [x] Resultado na mesma tela; 
- [x] Loading de Busca; 
- [x] Retornar erros da API;
- [x] Trazer o clima;
- [x] Apagar o formulário depois da busca;
- [x] Resetar o app ao estado inicial após uma busca;
- [x] Sistema de Feedback;
- [x] Obter Localização no Navegador;
- [ ] <s>Trazer aeroportos por perto usando a localização obtida pela resposta da API do tempo e com a API AeroDataBox; *</s>
- [ ] Split o app em componentes independentes (v2);

## 🔨 Tecnologias

- React / Javascript
- HTML / CSS

## ✏️ Bibliotecas de Terceiros

Bibliotecas que me ajudam a montar e dar vida à este projeto

- <a href="https://github.com/animate-css/animate.css">AnimateCSS</a>
- <a href="https://github.com/ionic-team/ionicons">Ionicons</a>


## 📌 Status do Projeto

v1 - do app está concluída. Finalizado em 29.out.2021

## ⚡️ Autor 

<a href="https://twitter.com/marcosvca_">Marcos Coelho</a>

## 🎖 Conclusão

Meu primeiro contato com o React, foi bem mais tranquilo que eu poderia imaginar.

Apesar da API da AeroDataBox fornecer o acesso gratuito, eram apenas 15 requisições de forma gratuita e com isso não foi possível manter o app exibindo a lista de 
aeroportos. Felizmente, o objetivo maior, que é o de <b>aprendizado</b> foi concluido! Ao desenvolver este app, eu aprendi algumas coisas que ainda não dominava em Javascript / React. 

Ao criar o Reacast, eu aprendi a utilizar as funções de estado <b>(UseState)</b>, <b>Componentes</b> para fazer o rodapé e aprendi a obter resultados da API.

<p align="center">
    <img src="https://i.imgur.com/HQk8rLp.png">
    <i>app exibindo a lista de aeroportos</i>
</p>

O mais <b>difícil</b>, foi utilizar a API da AeroDataBox, pois a forma que ela retorna os dados era diferente do que foi apresentado no workshop, entretanto, fui aprender mais sobre Mapeamento de Dados e como utiliza-lá para obter os dados da API de forma correta. 

O uso do <b>fetch</b> para obter os dados foi muito tranquilo, porém precisei aprender como esperar a API retornar o resultado pra continuar com a próxima requisição, uma vez que eu precisava da latitde e da longitde para obter os aeroportos próximos. Consegui estudando o método <b>async</b> do Javascript. Função esta que irei aplicar no meu outro projeto que tenho em mente.

Fico feliz de ter conseguido ir além do que eu pensava, quero agradecer à EBAC pelo Workshop e ao instrutor <b>Migel Maia</b> pela introdução ao React! Ao futuro, preciso estudar ainda mais o React e toda a sua estruturação e também o Javascript!

Ah, e depois de aprendido, refatorar este primeiro projeto 🤗! 



