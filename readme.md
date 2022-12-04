# Componentes en TS / Asincronía: week 89

## Día 1

### Daily. Code Review.

Revisión del challenge: CRUD de Series con Componentes basados en clases de TS
Revisión de conceptos.

    -   Componentes (Vistas). Datos (Modelo). Estado
    -   Diseño: gestión del estado.
    -   Responsabilidades de los componentes.
    -   Dudas TS

## Día 2

Nuevo proyecto week9. Persistencia. localStorage / sessionStorage (Web APIs)
Servicios. Encapsulation y Single Responsibility. Servicio storage
Testing: Mock de localStorage (se incluye pero no se explica)

Repositorio. Aislamiento de la capa de datos.
Interface para todos los repos: Liskov Substitution
(quizás excesivamente complejo en este punto)

Se completa el ToDo List utilizando el servicio storage para darle persistencia basada en localStorage

Se copia a una segunda página (Notas) para más adelante darle persistencia en Backend

**Programación funcional**
Conceptos no revisados tan explícitamente (como en otras ediciones)

Paradigmas. P Funcional. Funciones puras. Funciones como objetos. High Order Functions
Patrones de ejecución. This. Arrow functions… Closures

**Asincronía**
Asincronía. Entorno de ejecución y bucles asíncronos

-   mono-hilo (One Thread)
-   paralelismo v. concurrencia (JS)
-   Ejemplo: camareros

Node: asincronía y concurrencia

Callbacks.

## Día 3

Promesas. Async. Async/await… Await top level.
No revisados tan explícitamente (como en otras ediciones) Observables en RxJS.

**APIs**

APIS RESTful. REST: transferencia de estado representacional

Browsers - Web APIs

    -   localStorage
    -   location

API SOAP -> servidor HTTP -> datos XML
API **Rest** -> servidor HTTP -> datos JSON

Operamos con recursos - Recurso (nombre) - Operación (verbo) -> HTTP Methods: GET, POST, PATCH (PUT), DELETE

Conseguimos CRUD
C -> POST
R -> GET
U -> PATCH
D -> DELETE

**Conexiones al backend. AJAX…**

-   Http: request / response. Códigos de status

-   Proyecto NotesList.

        -   Backend Fake. JSON Server.
            Pruebas del server con Postman

        -   Front. Fetch. Repository encapsulando fetch como clase.
            Métodos que usan de fetch. Tipado.
            Consumo del servicio

-   Presentación del challenge. PromiseAll

-   @TODO. Despliegue de Backend Fake. JSON Server.
-   @TODO. Documentación detallada del desarrollo del proyecto
