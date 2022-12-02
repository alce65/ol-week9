## OOP

class Foo extends Bar
(Bar padre de Foo)

## HTML

Header
|\_div
|\_h1 -> texto

## COMPONENTS

renderizo: LISTA
|\_ renderizo: ITEMS
(LISTA padre de ITEMS)

CARD

-   Mostrar la información de UNA serie, que recibe de su componente contenedor (padre) -> LISTA
-   Mostrar el componente SCORE

SCORE

-   Muestra la puntuación, que recibe de su padre
-   Responder al click, cambiando la puntuación en su padre (en el scope del componente que lo ha renderiza)
