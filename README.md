Arc [![Build Status][travis-image]][travis-url]
===========

Parser de Markdown para AFC escrito em Node.js

### Instalação
  
  1. Substitua o valor de **ALURA_HASH**, em *setup-ws.sh*, pelo seu valor real;
  2. *source setup-ws.sh*;
  3. *make build*;
  4. Em *ws/ws-options.js*, substitua o valor da variável **curso** pelo nome do curso (exatamente igual à da URL do Alura) desejado. Exemplo: O curso **JavaScript avançado I: ES6, orientação a objetos e padrões de projetos** tem como URL: **https://cursos.alura.com.br/course/javascript-es6-orientacao-a-objetos-parte-1**, então o valor da variável **curso** será **javascript-es6-orientacao-a-objetos-parte-1**;
  5. *node index.js*;
  6. O curso ficará dentro da pasta **Markdown**, no diretório do projeto.


[travis-image]: https://travis-ci.org/vmattos/arc.svg?branch=master
[travis-url]: https://travis-ci.org/vmattos/arc
