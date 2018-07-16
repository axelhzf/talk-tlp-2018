https://medium.com/sainsburys-engineering/graphql-europe-2018-a-summary-f9c602b62ce1

* GraphQL is a relatively new technology, and lots of the time we spent with it was trying to get into the right mindset
* shopify tutorial: designing a graphql api
https://gist.github.com/swalkinshaw/3a33e2d292b60e68fcebe12b62bbb3e2
* Type safety is pretty cool

https://www.graphql.com/guides/  
  
https://blog.apollographql.com/graphql-explained-5844742f195e
https://blog.apollographql.com/the-anatomy-of-a-graphql-query-6dffa9e9e747  
  
https://medium.com/graphql-europe/watch-all-talks-from-graphql-europe-2018-4a47ee28570a

How graphql works
https://medium.com/graphql-europe/watch-all-talks-from-graphql-europe-2018-4a47ee28570a
https://blog.apollographql.com/graphql-explained-5844742f195e


Agenda?
* 

  
Investing in our tools
  
  
Pequeña introducción explicando qué es graphql.
  
Ejemplo de hilo conductor durante la charla. Un sistema de blogs con posts, autor, comentarios y autor de comentarios.   


First reaction

Frontend developers: ❤️
Backend developers: 🙀


Building a cache system on top of redux
Problemas relacionados con no tener la api tipada
Hablar de normalizr

Es delicado probar nuevas tecnologías en un punto de la aplicación tan importante como la api.
No es como probar una nueva librería javascript que ha salido, si no ufnciona como espera la puedes cambiar y ya esta.
Cambiar una api es un refactor bastante importante

Graphql es una especificación y la gente de facebook tiene una implementación de referencia para node. graphql-express
es lo único que hace falta para empezar a trabajar.
Cuando estoy descubriendo una tecnología me gusta trabajar con los recursos más básicos. Para encontrarme con los problemas
que soluciones de más alto nivel solución. Sino estoy puede darse el caso de estar utilizando herramientas que solucionan
problemas que en realidad no tengo.

* GraphQL architectures are varied:
  * Monoliths
  * Microservices
  * serverless
  
En nuestro caso teníamos claro que la aplicación era suficientemente simple, una aplicación tradicional de base de datos.
O como lo llame dhh, a majestic monolith.

  
Frontend  <--gql-> Backend - Database

  
Benefits on a Monolith

* easy to get started, develop & debug
* no problems of distributed computing
* simple infrastructure setup & easy deployment
* global type-safety (when using typed language)  
  
  
Problems of a monolith
  
    
Explicación de las tres partes de una query en graphql: Queries, mutaciones y subscripciones.
Cómo se trabaja con los resolvers
Resolución de queries en paralelos y de mutaciones en serie.

Problema de la N+1 queries

Ejemplo de api rests

/projects/
/projects/:id/comments

Nos piden que mostremos en la página principal el número de comentarios que tiene cada post.

Con rest tenemos un problema. Tenemos que hacer n+1 consultas para obtener toda esa información. O podemos modificar
el listado de los posts, para devolver el número de comentarios ahi. El problema en este caso es que estamos
acoplando el diseño de nuestra api, por un requisito de un cliente.

Con graphql evitamos este problema, porque podemos pedir únicamente los que nos hace falta

{
  posts {
     id
     title
     comments {
        count        
     }
  }
}

Código utilizando un resolver.

Hemos transladado el problema de N+1 request a nuestra api a un problema de n+1 peticiones a la api.

Para resolver este problema tenemos varias opciones.

Existen herramientas que te permiten construir una consulta más optima en la base de datos como:

* https://github.com/acarl005/join-monster

En mi opinión el problema que tenemos aquí es que estamos acoplando la api con la base de datos, cosa que nos puede
traer problemas en el futuro.

Existe otra solución y es la denominada dataloaders.

Definición de dataloader y cómo resuelve problema.

* Type safety is pretty cool

Herramientas para generación de tipos. Tipando los resolvers para tener tipados los resolvers

* Code generation?

Tenemos alguna entidades muy simples, que únicamente necesitan un crud básico. En lugar de estar mantiendo ese código
a mano. Podemos crear esa parte dinámicamente.

Tenemos dos opciones:
* ORM -> Schema
* Schema -> Orm

ORM -> Schema

En nuestro caso utilizamos typeorm. Que nos permite instronspección de los campos. Y podemos definir un código similar a

Schema -> ORM

graphql-code-generator

ejemplo de la generación del schema para mongo


Apollo engine

# Frontend
* Dos opciones, utilizar Relay
* Utilizar Apollo

End-to-end type-safety

Relay nos obligaba a que nuestra api tuviera una cierta forma
https://facebook.github.io/relay/docs/en/graphql-server-specification.html
* paginaciones utilizando connections
* mutaciones con un input

Cosas que aprendimos

Generación de código. Analiza todas tus queries para que puedas tener 
autocompletado.

Crear tus propios componentes que envuelven los components de las librerias.
Ejemplo de ManagedQuery que muestra mensajes de error, spinner.
Y si hay cosas rotas, con el fetch-policy, puedes siempre puedes hacerle un fix tocando en una única parte
de tu aplicación.

Cache invalidation es un problema complicado.

Testing, generación automática de mocks


