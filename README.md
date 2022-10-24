# API búsqueda de libros

#### Dataset tomado de Kaggle [ver acá](https://www.kaggle.com/datasets/saurabhbagchi/books-dataset?resource=download)

## Instalacion:
Requisitos:
- NodeJs
- MongoBd
- Postman u otro cliente para peticiones HTTP

Para instalar el proyecto debe asegurarse de tener NodeJs en el equipo y ejecutar el comando dentro de la ruta de trabajo

```
yarn install 
```

Para iniciar el servidor deberá proporcionar las variables de entorno con la configuración correspondiente o colocar un archivo `.env` en la raíz del proyecto.

Ejemplo de `.env`

```bash
BOOK_URL=https://raw.githubusercontent.com/omarchalito/api-nodejs-libros/master/src/seed/services/books.csv
DB_HOST=mongodb://user:password@localhost:27017/books_bd
ENV=develop
PORT=3000
```
_Tenga presente que:_

* La variable `BOOK_URL` solo es necesaria para cargar los datos semilla y no es requerida para prodcucción. Sin embargo, si no se proporciona no podrá cargar los datos semilla.
* `DB_HOST` La URL donde se encuentra la base de datos de MongoDB, es común que en el ambiente de desarrollo el `user` y el `password` se encuentren vacíos. 
* `ENV` Muestra el entorno de ejcución.
* `PORT` Puerto de escucha del servidor.

Iniciar el servidor (modo desarrollo):
```bash
npm run start:dev
```

Iniciar el servidor (modo producción):
```bash
npm run start
```

## Docker Compose

Puede levantar el servicio usando docker con el comando, debe asegurarse que tiene `docker` y `docker compose` instalado en el server
```bash
docker-compose up
```

### Cargue de los datos semilla

Deberá acceder al endpoint por el verbo GET para cargar la información dentro de la base de datos:
```
api/seed
```
_Debido a la cantidad de registros a insertar es posible que tome algo de tiempo en la inserción._

## Peticiones

Si desea usar la colección de _Postman_ puede hacerlo con el archivo JSON `API-Books.postman_collection.json` que se encuentra en la raíz de este proyecto. 

Para realizar búsquedas se deben hacer peticiones a los enpoints:

GET _api/book_
```bash
curl --location --request GET 'http://localhost:3000/api/book?limit=20&page=1'
```
Donde deberá especificarse los parámetros de cantidad de registros `limit` (un valor entre 1 y 50) y la página `page` (un valor mayor a cero)

GET _api/book/:id_
```bash
curl --location --request GET 'http://localhost:3000/api/book/:id'
```
Donde deberá especificarse el ID del libro que quiere consultar

GET _api/book?{{parámetros}}_
```bash
curl --location --request GET 'http://localhost:3000/api/book/search?limit=20&page=1&author=<any_author>&year=<any_year>&isbn=<any_isbn>&publisher=<any_publisher>'
```

Donde deberá especificarse los parámetros de cantidad de registros `limit` (un valor entre 1 y 50) y la página `page` (un valor mayor a cero) y varios parámetros de consulta (opcionales):

* author
* isbn
* publisher
* title
* year

POST _api/book_
```bash
curl --location --request POST 'http://localhost:3000/api/book' \
--header 'Content-Type: application/json' \
--data-raw '{
  "ISBN": "<any_isbn>",
  "Book-Title": "<any_title>",
  "Book-Author": "<any_author>",
  "Year-Of-Publication": "<any_year>",
  "Publisher": "<any_publisher>",
  "Image-URL-S": "<any_url>",
  "Image-URL-M": "<any_url>",
  "Image-URL-L": "<any_url>",
}'
```
Donde deberá especificarse dentro del `body` los campos para diligenciar 

PUT _api/book_
```bash
curl --location --request PUT 'http://localhost:3000/api/book/6355f11aa55b51f90e6449a7' \
--header 'Content-Type: application/json' \
--data-raw '{
  "ISBN": "<any_isbn>",
  "Book-Title": "<any_title>",
  "Book-Author": "<any_author>",
  "Year-Of-Publication": "<any_year>",
  "Publisher": "<any_publisher>",
  "Image-URL-S": "<any_url>",
  "Image-URL-M": "<any_url>",
  "Image-URL-L": "<any_url>",
}'
```
Donde deberá especificarse dentro del `body` los campos y el `id` del libro para modificar


DELETE _api/book/:id_
```bash
curl --location --request DELETE 'http://localhost:3000/api/book/:id'
```
Donde deberá especificarse el `id` del libro que va a eliminar
