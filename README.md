# API búsqueda de libros

### Dataset tomado de Kaggle [aqui](https://www.kaggle.com/datasets/saurabhbagchi/books-dataset?resource=download)

## Instalacion:
Requisitos:
- NodeJs
- MongoBd
- Postman u otro cliente para peticiones HTTP

Para instalar el proyecto debe asegurarse de tener NodeJs en el equipo y ejecutar el comando dentro de la ruta de trabajo

```
yarn install 
```

Dependencias de desarrollo necesarias:

```
yarn add -D @types/cors @types/express @types/morgan concurrently nodemon
```

## Instalación de la semilla

Deberá acceder al endpoint por el verbo GET para cargar la información dentro de la base de datos:
```
api/seed
```

