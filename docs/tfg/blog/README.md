# Blog (Medium, EN)

Borradores de los posts del TFG. Uno por avance/release; el índice de publicados vive en
[`../seguimiento.md`](../seguimiento.md).

Cada post tiene dos ficheros con el mismo nombre:

- `*.md` — la fuente que se versiona y se revisa (puede llevar comentarios de edición en bloques `<!-- -->`).
- `*.html` — **la copia que se pega en Medium**. Es el mismo texto sin las notas internas.

## Cómo pasar un post a Medium sin pelearse con el formato

Medium **no entiende Markdown al pegar**: si copias el `.md`, llegan los `#`, los `**` y los guiones como texto plano.
Lo que sí conserva es el **HTML del portapapeles**, así que el camino corto es pegar desde el navegador.

1. Abre el `.html` del post en el navegador: `firefox docs/tfg/blog/<post>.html` (o doble clic en el fichero).
2. Dentro de la página, `Ctrl+A` y `Ctrl+C`. Copia desde la **página renderizada**, nunca desde el código fuente.
3. En Medium, crea un borrador nuevo y pega con **`Ctrl+V`** (nunca `Ctrl+Shift+V`: ese pega sin formato, que es
   exactamente lo que rompe los encabezados).
4. Medium convierte solo: `<h1>` → título grande, `<h2>` → subtítulo, listas, negritas, cursivas, enlaces y `<code>`.

### Lo que Medium no va a respetar (y hay que decidir antes de escribir)

- **Solo hay dos niveles de encabezado** en el editor (grande y pequeño). Un `<h3>` o más profundo se aplasta contra el
  pequeño. Por eso los posts se escriben con **título + un único nivel de sección**.
- **No hay tablas.** Cualquier comparativa va como **imagen** (captura de la tabla del README) o se reescribe como
  lista. La comparativa de los nueve productos del estado del arte entra en esta regla.
- **Las imágenes no viajan en el pegado.** Se suben **arrastrándolas** al editor, una a una, en su sitio. Las notas de
  qué figura va dónde están al final del `.md`, en el bloque `NO PUBLICAR`.
- **Los bloques de código** llegan como bloque, pero sin coloreado por lenguaje. Si algún día hace falta resaltado,
  se incrusta un *gist* de GitHub pegando su URL en una línea vacía.

### Alternativa: la herramienta de importación

Medium tiene un importador (`medium.com/p/import`) que traga una **URL pública** y conserva mejor la estructura,
incluidas las imágenes remotas. Sirve si el post está publicado en una página accesible (GitHub Pages, por ejemplo).
Mientras los borradores vivan solo en el repositorio, el pegado desde el navegador es más rápido.
