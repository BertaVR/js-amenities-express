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
**1. Ver todos los packs:**
- Curl: 
```
curl --location --request GET 'http://localhost:3000/packs/' 

```
- Requisitos: la base de datos tiene que estar poblada.
**2. Buscar un pack por nombre:**
- Curl: 
```
curl --location --request GET 'http://localhost:3000/packs/<nombre>'
```
- Requisitos: tiene que ser un nombre de un pack que exista en la BD, es case-sensitive.
- Ejemplo de respuesta: 
 ```
{
    "_id": "61afc35457387547a0c0f6d1",
    "nombre": "pack animalitous",
    "stock": 800,
    "items": [
        {
            "_id": "61d58b6fd75d3770be591ce0",
            "nombre": "cosa1",
            "precio": 170,
            "calidad": 40,
            "material": "normal",
            "stock": 40,
            "demanda": 70
        },
        {
            "_id": "61d58aecd75d3770be584aed",
            "nombre": "camello",
            "precio": 40,
            "calidad": 44,
            "material": "normal",
            "stock": 800,
            "demanda": 70
        },
        {
            "_id": "61d58b6fd75d3770be591ce0",
            "nombre": "cosa1",
            "precio": 170,
            "calidad": 40,
            "material": "normal",
            "stock": 40,
            "demanda": 70
        },
        {
            "_id": "61d58b14d75d3770be588aba",
            "nombre": "obeja",
            "precio": 50,
            "calidad": 50,
            "material": "normal",
            "stock": 10000,
            "demanda": 70
        }
    ],
    "precio": 50,
    "calidad": "premium"
}
```


**3. Cambiar nombre de un pack:**
- Curl: 

```
curl --location --request PUT 'http://localhost:3000/packs/<nombre>/cambiarNombre/<nombre nuevo>'
```
- Requisitos: El primer parámetro de nombre tiene que ser un nombre de un pack que exista en la BD, es case-sensitive. El nombre que se le añada también se añadirá respetando las mayúsculas y minúsculas

**4.  Borrar un pack:**
- Curl: 

```
curl --location --request DELETE 'http://localhost:3000/packs/<nombre>/delete'
```

- Requisitos: El pack tiene que existir
**5. Añadir un pack:**
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

