# Proyecto API REST con node y express
## Utilización
- El proyecto está en el directorio /amenities, para acceder al paquete del proyecto escriba en su terminal:
```shell script
cd amenities
```
A partir de ese directorio: 
- Para pasar TODOS los casos test:
```shell script
npm run test
```
- Para pasar los casos test de integración:
```shell script
npm run test __test__/*
```

- Para pasar los casos test de unitarios:
```shell script
npm run test domain/*/test
``````
- Para iniciar el proyecto:
```shell script
npm run start
``````

## Rutas
### PACKS
- Ver todos los packs:
```
curl --location --request GET 'http://localhost:3000/packs/' 
```
- Buscar un pack por nombre:
```
curl --location --request GET 'http://localhost:3000/packs/<nombre>'
```

- Cambiar nombre de un pack:
```
curl --location --request GET 'http://localhost:3000/packs/<nombre>/cambiarNombre/<nombre nuevo>'
```

- Borrar un pack:
```
curl --location --request GET 'http://localhost:3000/packs/<nombre>/delete'
```
- Añadir un pack:
```
curl --location --request POST 'http://localhost:3000/packs/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": <nombre>,
    "items": [
        <ids de los items>
    ]
}'
```

