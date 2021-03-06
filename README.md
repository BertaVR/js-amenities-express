# Proyecto API REST con node y express
## Tabla de contenidos
1. [Utilización](#utilización)
2. [Rutas](#rutas)
   * [Packs](#packs)
   * [Items](#items)
3. [Ejemplos casos para correción](#ejemplos)


## Utilización
- El proyecto está en el directorio /amenities, para acceder al paquete del proyecto escriba en su terminal:
```shell script
 cd amenities
```
A partir de ese directorio: 
- Para instalar el proyecto:
```shell script
 npm i
```
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
- Para iniciar la API del proyecto:
```shell script
npm run serverstart
``````
- Para ejecutar el main del dominio (desde el directorio /amenities):
```shell script
cd domain
``````
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
 <details>
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

- Requisitos: El pack tiene que existir. Es case sensitive
- Ejemplo de respuesta exitosa:
```
{
    "_id": "61d31175d75d3770bebe1eea",
    "nombre": "Pack para animalistas"
}
```

**5. Actualizar los items de un pack:**
```
curl --location --request PUT 'http://localhost:3000/packs/<nombre del pack>/updateItems' \
--header 'Content-Type: application/json' \
--data-raw '{"items":[<nombres de los items>]}'
```
- Requisitos: El nombre tiene que ser de un pack que exista, los nombres de items tienen que ser de items que existan.
- Ejemplo de respuesta exitosa:
 <details>
 <summary>Ver respuesta</summary>
 
 ```
 {
    "_id": "61d2df33d75d3770be68029c",
    "nombre": "Pack Donald Trump",
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
 
**6. Añadir un pack:**
```
curl --location --request POST 'http://localhost:3000/packs/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": <nombre>,
    "items": [
        <nombres de los items>
    ]
}'
```
- Requisitos: Tiene que tener nombre, tiene que tener items, los items tienen que ser nombres que existan en la colección de items. No hace falta poner precio, stock ni calidad ya que de eso se encargará la lógica del dominio. No puedes añadir un pack con un nombre ya existente.



- Ejemplo de respuesta exitosa:
 <details>
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

### ITEMS
**1. Ver todos los items:**
- Curl: 
```
curl --location --request GET 'http://localhost:3000/items/' 

```
- Requisitos: ninguno, si la base de datos está poblada aparecerán los items

**2. Buscar un item por nombre:**
- Curl: 
```
curl --location --request GET 'http://localhost:3000/items/<nombre>'
```
- Requisitos: tiene que ser un nombre de un item que exista en la BD, es case-sensitive.

- Ejemplo de respuesta exitosa: 

```
{
    "_id": "61d58aa1d75d3770be579cb8",
    "nombre": "Rifle de pulso",
    "precio": 5,
    "calidad": 30,
    "material": "normal",
    "demanda": 10,
    "stock": 5
}
```


**2. Crear un item :**

- Curl:

```
curl --location --request POST 'http://localhost:3000/items/add' \
--header 'Content-Type: application/json' \
--data-raw '   { "_id": <ObjectId>,
    "nombre": <nombre>,
    "precio": <precio>,
    "calidad": <calidad>,
    "material": <material>,
    "demanda": <demanda>,
    "stock"
    : <stock>
    }'
  ```
 
 - Requisitos: Es posible especificar un id, si no se especifica se autogenerará. En el caso de poner un id tiene que cumplir el formato ObjectId de mongo (alfanumérico hexadecimal). Todos los otros campos son obligatorios. El precio es un número positivo. La demanda es un número entero del 0 al 100. La calidad es un entero de 0 a 50. El stock es un entero postivo. El material es  uno de estos tres valores:  "consumible","indestructible","normal" (se admite primera letra mayúscula). No puedes añadir un item con un nombre o id ya existente
 
 - Ejemplo de respuesta exitosa: 

 ```
 {
    "_id": "507f1f78fcf86cd799456013",
    "nombre": "Cosita",
    "stock": 5,
    "precio": 10,
    "material": "consumible",
    "demanda": 30,
    "calidad": 50
}
 ```
 ## Ejemplos
 
 - Test positivo get Packs:
 ```
curl --location --request GET 'http://localhost:3000/packs/' 

```
- Test positivo get Pack:
```
 curl --location --request GET 'http://localhost:3000/packs/Pack piscina'
 ```
 
 - Test negativo get Pack (status 404):
```
 curl --location --request GET 'http://localhost:3000/packs/Pack delincuente'
 ```
 
  - Test negativo update Nombre - nuevo nombre es nombre de un pack que ya existe en BD (statusCode 409):
```
http://localhost:3000/packs/pack brujas/cambiarNombre/Nuevo Nombre
```
  - Test negativo update Nombre - nombre no existe del pack(statusCode 404:
```
http://localhost:3000/packs/pack que no existe/cambiarNombre/Nombre bonito

```

  - Test negativo delete pack(statusCode 404):

```
curl --location --request DELETE 'http://localhost:3000/packs/pack que no existe'
```

- Test negativo actualizar los items de un pack: itmes que no existen (400)
```
curl --location --request PUT 'http://localhost:3000/packs/Nuevo nombre/updateItems' \
--header 'Content-Type: application/json' \
--data-raw '{
"items": ["61afc35457387547a0c0f6d9"]}'
```
- Test negativo actualizar los items de un pack: no hay items en el body (400)
```
curl --location --request PUT 'http://localhost:3000/packs/Nuevo nombre/updateItems' \
--header 'Content-Type: application/json' \
--data-raw '{}'
```

- Test positivo actualizar items de un pack.
```
curl --location --request PUT 'http://localhost:3000/packs/Nuevo nombre/updateItems' \
--header 'Content-Type: application/json' \
--data-raw '{
"items": ["61d58b6fd75d3770be591ce0"]}'
```
- Test negativo crear packs -item que no existe (400).
```
curl --location --request POST 'http://localhost:3000/packs/add' \
--header 'Content-Type: application/json' \
--data-raw '{"nombre": "Nuevo pack para crear",
"items": ["61d58b6fd75d3770be581ce0"]}'
```
- Test negativo crear packs -nombre que ya existe (409).
```
curl --location --request POST 'http://localhost:3000/packs/add' \
--header 'Content-Type: application/json' \
--data-raw '{"nombre": "Nuevo nombre",
"items": ["61d58b6fd75d3770be591ce0"]}'
```
- Test negativo crear packs -sin items (400).
```
curl --location --request POST 'http://localhost:3000/packs/add' \
--header 'Content-Type: application/json' \
--data-raw '{    "nombre": "Nuevo nombre"   }'
```

- Test negativo crear packs -sin nombre (400).
```
curl --location --request POST 'http://localhost:3000/packs/add' \
--header 'Content-Type: application/json' \
--data-raw '{    "items": ["61d58b6fd75d3770be591ce0"]   }'
```

- Test get Items.
```
curl --location --request GET 'http://localhost:3000/items/' 

```
- Test positivo get item:
```
curl --location --request GET 'http://localhost:3000/items/' 

```
- Test negativo get item - item que no existe (404);
```
curl --location --request GET 'http://localhost:3000/items/AK-48'
```
- Test negativo create item -  id repetido (409);
```
curl --location --request POST 'http://localhost:3000/items/add' \
--header 'Content-Type: application/json' \
--data-raw '{ "_id":"61d58b6fd75d3770be591ce0",
    "nombre": "Item super mega nuevísimo",
    "precio": 20,
    "calidad": 29,
    "material": "indestructible",
    "demanda": 8,
    "stock" : 20
    }'
```

- Test negativo create item -  nombre repetido (409);
```
curl --location --request POST 'http://localhost:3000/items/add' \
--header 'Content-Type: application/json' \
--data-raw '{ 
    "nombre": "Item super mega nuevo",
    "precio": 20,
    "calidad": 29,
    "material": "indestructible",
    "demanda": 8,
    "stock" : 20
    }'

```

- Test negativo create item - falta un campo obligatorio (400)
```
curl --location --request POST 'http://localhost:3000/items/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "precio": 20,
    "calidad": 29,
    "material": "indestructible",
    "demanda": 8,
    "stock" : 20
    }'

```

- Nota: No he incluído tests positivos de endpoints que modifican el estado de la BD ya que solo funcionarían una vez
