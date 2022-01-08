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
- Requisitos: ninguno, si la base de datos está poblada aparecerán los packs


**2. Buscar un pack por nombre:**
- Curl: 
```
curl --location --request GET 'http://localhost:3000/packs/<nombre>'
```
- Requisitos: tiene que ser un nombre de un pack que exista en la BD, es case-sensitive.

- Ejemplo de respuesta exitosa: 
 <details open>
 <summary>Ver respuesta</summary>

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
</details>


**3. Cambiar nombre de un pack:**
- Curl: 

```
curl --location --request PUT 'http://localhost:3000/packs/<nombre>/cambiarNombre/<nombre nuevo>'
```
- Requisitos: El primer parámetro de nombre tiene que ser un nombre de un pack que exista en la BD, es case-sensitive. El nombre que se le añada también se añadirá respetando las mayúsculas y minúsculas
- Ejemplo de respuesta exitosa:
```
{
    "_id": "61d2dd8ad75d3770be652e7d",
    "nombre": "Nuevo nombre",
    "stock": 5,
    "items": [
        "61d58aa1d75d3770be579cb8",
        "61d58b99d75d3770be596747"
    ],
    "precio": 5.95,
    "calidad": "Basic"
}
```


**4.  Borrar un pack:**
- Curl: 

```
curl --location --request DELETE 'http://localhost:3000/packs/<nombre>/'
```

- Requisitos: El pack tiene que existir
- Ejemplo de respuesta exitosa:
```
{
    "_id": "61d31175d75d3770bebe1eea",
    "nombre": "Pack para animalistas"
}
```


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
- Requisitos: Tiene que tener nombre, tiene que tener items, los items tienen que ser ids que existan en la colección de items. No hace falta poner precio, stock ni calidad ya que de eso se encargará la lógica del dominio.

- Ejemplo de respuesta exitosa:
 <details open>
 <summary>Ver respuesta</summary>
 
```
{
    "nombre": "Pack para animalistas",
    "stock": 34,
    "items": [
        {
            "_id": "61d594e784f9c213962d3147",
            "nombre": "Diccionario perro-humano",
            "precio": 5,
            "calidad": 4,
            "material": "normal",
            "stock": 51,
            "demanda": 89
        },
        {
            "_id": "61d594e784f9c213962d3148",
            "nombre": "Peluche de Capybara",
            "precio": 15,
            "calidad": 13,
            "material": "indestructible",
            "stock": 101,
            "demanda": 34
        },
        {
            "_id": "61d594e784f9c213962d3149",
            "nombre": "Ballena",
            "precio": 20,
            "calidad": 3,
            "material": "normal",
            "stock": 341,
            "demanda": 1
        },
        {
            "_id": "61d594e784f9c213962d314a",
            "nombre": "Pancarta Salvar a las Ballenas",
            "precio": 11,
            "calidad": 2,
            "material": "normal",
            "stock": 34,
            "demanda": 21
        }
    ],
    "precio": 43.35,
    "calidad": "premium"
}
```
</details>
