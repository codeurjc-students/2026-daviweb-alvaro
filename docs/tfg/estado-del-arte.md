# Estado del arte

> **Fase 1 · Definición de funcionalidades y pantallas.** El enunciado del TFG exige estudiar aplicaciones que ofrezcan
> una funcionalidad similar «para obtener ideas y posibles mejoras», y recoger ese estudio en la sección *Estado del
> arte* de la memoria (§3 del enunciado). Este documento es la versión extensa y con fuentes; el README contiene un
> resumen enlazado a él.
>
> **Fecha de consulta de todas las fuentes: 14 de agosto de 2026.** Los precios y comisiones del mercado cambian con
> frecuencia; las cifras se acompañan de su origen y deben reverificarse antes de la entrega de la memoria.

## 1. Objetivo y método

El objetivo de este estudio es doble:

1. **Situar el proyecto** en el mercado real de la reserva de citas para peluquerías y barberías, identificando los
   modelos de producto existentes y sus diferencias estructurales.
2. **Extraer decisiones de diseño**: qué funcionalidades del proyecto quedan justificadas por lo que hace la
   competencia, qué carencias comunes representan una oportunidad y qué ideas se descartan explícitamente por alcance.

**Selección de la muestra.** Se han analizado nueve productos elegidos por cubrir las cinco familias de solución que
existen hoy, no por popularidad absoluta: dos marketplaces internacionales con software integrado, uno de ámbito
europeo, un software vertical español, un software vertical de barbería, una plataforma horizontal de reservas, una
herramienta genérica de *scheduling* y dos alternativas autoalojadas de código abierto.

**Criterios de comparación.** Se han fijado a partir de los objetivos funcionales y técnicos del proyecto, de modo que
la comparación sea instrumental y no un catálogo de características:

| Criterio | Pregunta que responde |
|---|---|
| Modelo de negocio | ¿Cuota, comisión o ambas? ¿Sobre qué se cobra? |
| Propiedad del canal y del cliente | ¿El cliente final es del negocio o de la plataforma? |
| Marca | ¿La reserva ocurre bajo la marca del negocio o la del intermediario? |
| Presencia web | ¿Ofrece web pública propia del negocio, sólo un widget embebible, o sólo ficha en un portal? |
| Reserva sin registro | ¿Puede el cliente final reservar sin crear una cuenta? |
| Multi-tenant / white-label | ¿Cada negocio obtiene una instancia aislada y personalizada? |
| Motor de disponibilidad | ¿Qué políticas de asignación de profesional soporta? |
| Notificaciones | ¿Qué canal y qué eventos? |
| Analítica | ¿Hay cuadro de mando y en qué plan? |
| Apertura técnica | ¿API pública, autoalojamiento, código abierto? |

**Limitaciones del estudio.** El análisis se ha hecho desde fuentes públicas: páginas de producto y precios, changelogs,
repositorios y prensa especializada, complementadas con comparativas de terceros cuando el fabricante no publica la
cifra. La arquitectura interna de los productos comerciales no es observable, de modo que las afirmaciones técnicas se
limitan a lo que el producto expone (API pública, licencia, documentación). Las comparativas de terceros del sector
suelen estar patrocinadas por un competidor: se han usado sólo para cifras corroboradas por dos fuentes independientes,
y se señala cuando una cifra procede únicamente de fuente secundaria.

## 2. Taxonomía del mercado

El sector no es un continuo de productos equivalentes con más o menos funciones. Se organiza en **cinco familias** que
responden a modelos de negocio distintos, y esa distinción explica casi todas las diferencias funcionales observadas:

| Familia | Qué vende | Ejemplos analizados |
|---|---|---|
| **A. Marketplace + software** | Clientes nuevos. El software es el gancho para poblar el portal | Booksy, Fresha, Treatwell/Uala |
| **B. Software vertical de gestión** | Gestión integral del salón (agenda, caja, inventario, fidelización) | Koibox (ES), Squire (barbería) |
| **C. Plataforma horizontal de reservas** | Un motor de citas configurable para decenas de sectores | SimplyBook.me |
| **D. *Scheduling* genérico** | Coordinación de reuniones 1:1, no negocio de servicios presencial | Cal.com / Cal.diy |
| **E. Autoalojado / código abierto** | Nada: se instala y se mantiene | Easy!Appointments |

La familia A domina la captación y es la referencia del sector; la B domina la operativa del salón consolidado; la C
es la que más se acerca funcionalmente a este proyecto; la D y la E marcan el suelo técnico y el listón de lo que se
puede obtener sin pagar.

## 3. Análisis por producto

### 3.1 Booksy — marketplace con cuota plana (familia A)

Modelo de suscripción única con todas las funciones incluidas: en España **34,99 €/mes + IVA** (42,34 € con IVA), más
**8 €/mes + IVA por cada empleado adicional** con agenda propia. La ficha en el marketplace va incluida y **no cobra
comisión por reserva**; la comisión aparece sólo si el negocio activa voluntariamente **Booksy Boost**, que cobra el
**30 % de la primera visita** de cada cliente nuevo captado mientras la promoción está activa. Los pagos procesados por
la plataforma tienen sus propias tarifas (2 % + 0,15 € en pagos móviles).

**Lectura para el proyecto.** Booksy es el modelo más honesto de la familia A —la comisión es *opt-in*— pero el punto de
partida sigue siendo una **ficha dentro de booksy.com**: el cliente reserva en la app de Booksy, con la marca de
Booksy, y el negocio no tiene web propia. Su fortaleza es la captación; su coste, la desintermediación de la relación
con el cliente.

### 3.2 Fresha — el giro de gratis a suscripción (familia A)

Fresha fue durante años el argumento «software gratis, se paga sólo la captación». En 2025 introdujo suscripción: en
2026 son **14,95 $/mes por miembro con agenda** en el plan de equipo y **19,95 $/mes** el plan individual (en Reino
Unido, 14,95 £ el solo y 9,95 £ por miembro), a lo que se suma una **comisión del 20 % (mínimo 6 $) sobre la primera
visita de cada cliente nuevo captado a través de su marketplace**. Los clientes recurrentes, y los que llegan por la web
propia del negocio, Google o redes sociales, no generan comisión. Integra **Reserve with Google** y botones de reserva
en Instagram y Facebook.

**Lectura para el proyecto.** Dos conclusiones. La primera, que el «gratis» del sector es un coste diferido: el
propietario que eligió Fresha por precio se encontró con una migración forzosa o una factura nueva. La segunda, más
útil: **Fresha distingue explícitamente el origen del cliente** y no cobra por el que llega por el canal propio del
negocio. La plataforma reconoce así el valor de tener web propia — que es exactamente lo que este proyecto entrega por
defecto.

### 3.3 Treatwell / Uala — la comisión como modelo central (familia A)

Treatwell aplica una **comisión en torno al 25 % + IVA por cada cliente nuevo** captado en su portal (las fuentes
secundarias sitúan la horquilla entre el 20 % y el 35 % según el plan negociado), más un **2 % + IVA** por el
procesamiento del pago online; algunos planes añaden cuota mensual de software. Treatwell y **Uala** —plataforma con
sede en Milán y presencia en cinco países europeos, antes Bucmi— se han integrado en un mismo grupo, lo que concentra
todavía más la captación europea.

**Lectura para el proyecto.** Es el extremo del modelo: la plataforma se comporta como un canal de adquisición de pago
y el negocio alquila su propia demanda. Refuerza la tesis del proyecto —el canal propio como activo— pero también
obliga a ser honesto en la memoria: **este proyecto no compite en captación**, y por tanto no es un sustituto de
Treatwell para un salón que dependa del tráfico del portal.

### 3.4 Koibox — el vertical español (familia B)

Software de origen español con soporte y adaptación local. Plan gratuito muy limitado para un usuario, **Lite 15 €/mes**
(1 usuario) y **Basic 30 €/mes** (hasta 3 usuarios / 5 cabinas). Cubre agenda multi-empleado, reservas 24/7,
recordatorios automáticos, inventario, marketing y, señaladamente, **integraciones fiscales nativas del mercado
español**, su ventaja frente a los internacionales.

**Lectura para el proyecto.** Marca el precio de referencia real en España para un salón pequeño (15–30 €/mes) y
recuerda una dimensión ausente en este proyecto: la **facturación y el cumplimiento normativo local**. Es una carencia
consciente, no un olvido (§5.2).

### 3.5 Squire — verticalización extrema en barbería (familia B)

Producto construido específicamente para barberías, con realimentación declarada de más de 2.000 barberos. Además de la
reserva incorpora **TPV, nóminas, inventario, fidelización, tarjetas regalo, citas recurrentes**, perfil individual por
barbero con foto y datos, y gestión multi-local con informes descargables.

**Lectura para el proyecto.** Dos ideas directamente aplicables y baratas: la **selección explícita de profesional como
elemento central del flujo** (con su ficha y su foto, no un desplegable) y la **repetición de la cita anterior** —el
cliente de barbería es de altísima recurrencia y repite servicio y profesional—. Ambas ya figuran en el alcance
(pantalla de reserva y funcionalidad `I1`), y este análisis las confirma como acertadas. Lo demás —TPV, nóminas— es
gestión de negocio, fuera del alcance de un TFG.

### 3.6 SimplyBook.me — la referencia funcional más próxima (familia C)

Plataforma horizontal para más de 40 sectores. Cada empresa obtiene **un sitio de reservas con su marca o un widget
embebible** en su web, con soporte multi-sede, recordatorios automáticos y app de cliente; acepta reservas también desde
Facebook, Instagram y Google, y ofrece su propio marketplace (`Booking.page`). El **white-label real —eliminar toda
marca del proveedor— está reservado a los planes Standard y Premium**, y existe un programa específico de partners
white-label orientado a revendedores que operan la plataforma bajo su propia marca.

**Lectura para el proyecto.** Es el competidor conceptualmente más cercano: multi-tenant, con marca del negocio y sin
comisión sobre el cliente. Sus dos límites son reveladores. Primero, **el white-label es un upgrade de pago**: la
personalización profunda se monetiza porque es cara de construir, lo que valida técnicamente el interés del enfoque.
Segundo, al servir a 40 sectores el flujo de reserva es **genérico**: no conoce el encadenado de servicios de una
sesión de peluquería, ni la doble política de asignación de profesional, ni el bloqueo de agenda por profesional
individual. La verticalización es la vía de diferenciación disponible.

### 3.7 Cal.com / Cal.diy — el listón técnico (familia D)

Infraestructura de *scheduling* de referencia en el mundo del código abierto. En **abril de 2026 el producto comercial
pasó a código cerrado**, justificándolo por el riesgo de que las herramientas de IA faciliten el descubrimiento de
vulnerabilidades en código público, y el código libre se relanzó como **`calcom/cal.diy` bajo licencia MIT** (antes
AGPL-3.0), sin los módulos empresariales y sólo para autoalojamiento. El repositorio sigue activo y público (≈47,5 k
estrellas, último *push* el 8 de agosto de 2026, verificado vía API de GitHub).

**Lectura para el proyecto.** No es competencia —resuelve reuniones 1:1, no una agenda de local con varios
profesionales y servicios de duración variable—, pero fija el listón de lo que se espera hoy de un sistema de citas
serio: **API completa que permita construir interfaces propias sobre el motor de reservas**, tipos de evento con
políticas de asignación (incluido *round-robin*, análogo a la «agenda global» de este proyecto) y prevención de doble
reserva como requisito de primer orden. Es además un aviso sobre la sostenibilidad de las dependencias externas: una
herramienta puede cambiar de licencia y de modelo de un día para otro, argumento a favor de controlar el backend
propio.

### 3.8 Easy!Appointments — el suelo autoalojado (familia E)

Aplicación PHP/MySQL con licencia GPL, instalable en hosting compartido. Ofrece plan de trabajo, reglas de reserva,
sincronización con Google Calendar, notificaciones por correo, multi-servicio, multi-empleado y multi-sede, e interfaz
traducida. Su modelo de usuarios es multi-usuario, **no multi-tenant**: una instalación sirve a un negocio.

**Lectura para el proyecto.** Establece el mínimo gratuito: agenda funcional, sin coste y sin comisión, a cambio de
administrar el servidor. Confirma que **el valor no está en «tener un calendario»** —eso es *commodity*— sino en la
multi-tenencia, la personalización por negocio, la calidad del cálculo de disponibilidad y la ausencia de trabajo de
administración para el propietario del salón.

## 4. Comparativa

| Criterio | Booksy | Fresha | Treatwell | Koibox | Squire | SimplyBook.me | Cal.diy | Easy!Appointments | **Este proyecto** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Familia | A | A | A | B | B | C | D | E | **C vertical** |
| Cuota mensual | 34,99 € + 8 €/empl. | 14,95 $/miembro | Variable | 15–30 € | Por presupuesto | Por plan | — | — | **n/a (TFG)** |
| Comisión por cliente nuevo | 30 % (opcional) | 20 % (mín. 6 $) | ~25 % + IVA | No | No | No | — | — | **No** |
| Marketplace propio | Sí | Sí | Sí | No | No | Sí (`Booking.page`) | No | No | **No** |
| Web pública del negocio | Ficha | Ficha + widget | Ficha | Widget | Ficha/widget | Sitio o widget | Página de reserva | Página de reserva | **Web completa propia** |
| Marca en la reserva | Plataforma | Plataforma | Plataforma | Negocio | Negocio | Negocio (planes altos) | Configurable | Negocio | **Negocio (siempre)** |
| Reserva sin registro del cliente | No (cuenta Booksy) | No (cuenta Fresha) | No | Según config. | Sí | Sí | Sí | Sí | **Sí (nombre + teléfono)** |
| Multi-tenant / white-label | n/a | n/a | n/a | No | Multi-local | Sí (de pago) | No | No | **Sí (núcleo)** |
| Política de asignación configurable | No documentada | No documentada | No documentada | No documentada | Por profesional | Genérica | *Round-robin* | Por empleado | **Sí (Strategy: global / por profesional)** |
| Notificaciones SMS | Sí | Sí | Sí | Sí | Sí | Sí | Correo | Correo | **Sí (con token de cancelación)** |
| Analítica / cuadro de mando | Sí | Sí | Sí | Sí | Sí | Según plan | Básica | No | **Sí (fase 4)** |
| API pública / autoalojable | No / No | No / No | No / No | No / No | No / No | API / No | API / Sí | Sí / Sí | **API REST documentada / Sí** |
| Código abierto | No | No | No | No | No | No | MIT | GPL | **Apache 2.0** |

> Las cifras económicas proceden de las fuentes de §7 y corresponden a agosto de 2026. Las celdas «no documentada»
> indican que el fabricante no publica esa información: no debe leerse como que el producto carezca de la función.

## 5. Conclusiones del análisis

### 5.1 Carencias detectadas y cómo las aborda el proyecto

El estudio arroja seis carencias transversales. Cada una se traduce en una decisión de diseño ya recogida en el alcance
del proyecto, con su referencia a las funcionalidades numeradas del README:

| # | Carencia observada | Dónde se observa | Decisión de diseño | Funcionalidad |
|---|---|---|---|---|
| **C1** | **El cliente final debe crear cuenta** en la plataforma para reservar, lo que introduce fricción en una compra de 25 € y traslada la relación al intermediario | Booksy, Fresha, Treatwell | Reserva anónima con **nombre y teléfono**; la cuenta es opcional y aporta valor añadido (historial, repetición), no es un peaje. Al registrarse, el teléfono vincula las citas anónimas previas | `B3`, `B5`, `B6` |
| **C2** | **Comisión sobre el cliente nuevo**: la plataforma cobra por presentar un cliente que puede acabar siendo recurrente del negocio | Booksy Boost 30 %, Fresha 20 %, Treatwell ~25 % | El negocio opera **su propio canal**; no hay intermediación ni comisión posible por diseño. El propio Fresha valida el criterio al no cobrar por el cliente que llega de la web del negocio | Modelo de producto |
| **C3** | **La marca de la reserva es la del intermediario**, no la del salón | Familia A completa | **Multi-tenancy white-label**: colores, tipografías, logotipo, contenidos y dominio propios de cada negocio, con aislamiento estricto de datos | `A3`, `A4` |
| **C4** | Lo que se ofrece es un **widget de reservas**, no presencia web: el salón sigue necesitando (y pagando) una web aparte | Fresha, Koibox, SimplyBook.me plan bajo | La **web pública completa forma parte del producto**: portada, servicios, equipo, galería, reseñas, FAQ, ubicación y páginas legales | `B1`, `I4`, `I5` |
| **C5** | **Los datos del negocio viven en la plataforma** y salir de ella es costoso; en el mercado español, además, el responsable del tratamiento de los datos de los clientes acaba siendo un tercero | Familias A y B | **Exportación de citas y clientes** como funcionalidad de primera clase, y backend propio con la base de datos bajo control del operador | `A7` |
| **C6** | **Motor de reserva genérico**: las plataformas horizontales no modelan la doble política de asignación de profesional ni el encadenado de servicios de una sesión | SimplyBook.me, Easy!Appointments, Cal.diy | Motor de disponibilidad **vertical y configurable** mediante el patrón *Strategy*: agenda global o disponibilidad por profesional, elegible por el negocio; y reserva multi-servicio con encadenado de duraciones | `A5`, `A2` |

### 5.2 Ideas incorporadas al alcance

Además de las anteriores, el estudio ha aportado mejoras concretas que **no estaban en el alcance inicial** o que estaban
sin justificar y ahora lo están:

| Idea | Origen | Concreción |
|---|---|---|
| **Repetición de la cita anterior en un paso** | Squire (recurrencia altísima en barbería) | Ya prevista como `I1`; el estudio la eleva de «conveniencia» a funcionalidad diferencial del área de cliente |
| **Ficha del profesional con foto en el flujo de reserva**, frente a un desplegable | Squire | Confirmado en el diseño actual de la pantalla de reserva |
| **Distinguir el origen de la reserva** (canal propio, enlace compartido, redes) | Fresha, que factura según ese dato | Candidato a métrica del cuadro de mando `I6`: permite al propietario ver qué canal le trae clientes sin depender de un marketplace |
| **Secuencia de recordatorios, no un único aviso** | Evidencia del sector: la combinación confirmación + recordatorio 24 h + confirmación 2 h antes se asocia a reducciones del 25–40 % en ausencias, frente a tasas del 15–30 % sin recordatorios automáticos (fuentes secundarias, §7) | La aplicación actual sólo notifica confirmación y cancelación. Se incorpora el **recordatorio previo a la cita** como mejora candidata de la Fase 5, sujeta al coste por SMS |
| **Tasa de ausencias como indicador de cabecera** | Referencias de *benchmark* del sector (≈3 % de ausencias y 8 % de cancelaciones en salones con recordatorios) | Ya presente en el wireframe del cuadro de mando; el estudio aporta el valor de referencia con el que el propietario podrá comparar su salón |
| **API REST completa como producto, no como detalle** | Cal.com/Cal.diy | Refuerza el enfoque *contract-first* con OpenAPI ya adoptado |

### 5.3 Ideas descartadas y por qué

Declararlas es parte del análisis: el riesgo de un estado del arte es convertirse en una lista de deseos que el
calendario no soporta.

| Descartado | Presente en | Motivo |
|---|---|---|
| Pagos online, depósitos y TPV | Todos los comerciales | Añade pasarela de pago, conciliación y responsabilidad económica real; desproporcionado para el calendario de desarrollo (cierre en diciembre de 2026) y no aporta a la rúbrica |
| Facturación y cumplimiento fiscal español | Koibox | Es la ventaja competitiva del vertical local, pero es normativa, no ingeniería: mucho esfuerzo, poco valor evaluable |
| Inventario, nóminas y fidelización | Squire, Koibox | Gestión de negocio, ajena al núcleo de reservas |
| Marketplace propio | Booksy, Fresha, Treatwell, SimplyBook.me | Contradice la tesis del producto: el proyecto defiende el canal propio del negocio |
| *Reserve with Google* y reserva desde Instagram | Fresha, Treatwell | Interesante y coherente con el canal propio, pero depende de procesos de alta como socio con terceros, fuera del control del proyecto |
| Sincronización con Google Calendar | Easy!Appointments, Cal.diy | Candidato razonable a trabajo futuro; no compite en prioridad con la migración del backend |
| Aplicación móvil nativa | Booksy, Squire | La web *mobile-first* cubre el caso de uso; una app nativa duplicaría el esfuerzo de frontend |

### 5.4 Posicionamiento

Ninguno de los productos analizados combina simultáneamente los cuatro rasgos que definen este proyecto: **web pública
completa y personalizada por negocio** (no un widget ni una ficha), **reserva sin registro previo del cliente**,
**multi-tenancy white-label sin comisión sobre el cliente captado** y **motor de disponibilidad vertical con política de
asignación configurable**. SimplyBook.me es quien más se aproxima, y lo hace desde la horizontalidad y con el
white-label como opción de pago.

El posicionamiento honesto —el que debe defenderse ante el tribunal— es este: el proyecto **no compite en captación de
clientes ni en gestión integral del salón**. Se dirige al negocio que ya tiene su clientela y quiere una presencia web
propia con reserva online, sin pagar comisión por sus propios clientes ni diluir su marca en la de un portal. Es un
nicho estrecho y deliberado, y esa estrechez es lo que hace realista construirlo en el tiempo disponible.

## 6. Lectura técnica

El estado del arte funcional no agota el análisis: de él se derivan tres conclusiones técnicas que condicionan la
arquitectura objetivo del TFG.

1. **La multi-tenencia es la decisión estructural, no una funcionalidad.** Que SimplyBook.me reserve el white-label a
   sus planes superiores indica que el aislamiento y la personalización por tenant son caros de hacer bien. En el
   proyecto esto se traduce en un requisito no funcional que atraviesa todo el backend: **toda consulta lleva
   `tenantId`**, con índices compuestos y un *guard* de tenant además del de rol. Un fallo de aislamiento no es un
   error de una pantalla, es una fuga de datos entre negocios.
2. **El cálculo de disponibilidad es el núcleo defendible.** Es el único punto en que un producto vertical puede
   superar claramente a uno horizontal, y es donde se concentran los casos difíciles: horarios por profesional,
   excepciones de calendario, bloqueos, duración variable del servicio, encadenado multi-servicio y dos políticas de
   asignación. Justifica el patrón *Strategy* y una batería de pruebas unitarias exhaustiva sobre casos límite.
3. **La concurrencia no es opcional.** Que Cal.diy trate la prevención de doble reserva como requisito de primer orden
   confirma el análisis de riesgos del proyecto: dos clientes reservando el mismo hueco es el fallo más visible y
   embarazoso de un sistema de citas. Se aborda con **índice único sobre `{tenantId, barberId, startAt}`** y, si
   procede, transacciones, con una prueba de integración específica que lo verifique.

Añadido a lo anterior, el giro de Cal.com a código cerrado en abril de 2026 —y con él el cambio de licencia de AGPL-3.0
a MIT del código libre superviviente— es un ejemplo real y reciente del riesgo de construir sobre una plataforma de
terceros. Es, en pequeño, el mismo argumento que sostiene el objetivo central de este TFG: **sustituir un *Backend as a
Service* propietario por un backend propio**, con la Clean Architecture existente acotando la migración a la capa de
infraestructura.

## 7. Fuentes

Todas consultadas el **14 de agosto de 2026**.

| # | Fuente | Uso |
|---|---|---|
| 1 | [Precios de Booksy (biz.booksy.com/pricing)](https://biz.booksy.com/pricing) | Cuota y modelo de Booksy |
| 2 | [Cuánto cuesta Booksy en 2026 — Agentizalo](https://agentizalo.com/blog/cuanto-cuesta-booksy) | Cifras de España: 34,99 €, empleado adicional, Boost 30 % *(secundaria)* |
| 3 | [Fresha Pricing 2026 — Pabau](https://pabau.com/blog/fresha-pricing/) · [SchedulingKit](https://schedulingkit.com/pricing-guides/fresha-pricing) | Suscripción por miembro y comisión del 20 % *(secundarias, corroboradas entre sí)* |
| 4 | [Fresha vs Booksy (2026) — Twizzlo](https://twizzlo.com/articles/fresha-vs-booksy/) | Contraste de modelos de comisión *(secundaria)* |
| 5 | [Treatwell España](https://www.treatwell.es/) · [Calculadora de comisiones — PeluGest](https://pelugest.es/calculadora-comisiones-peluqueria) | Comisión ~25 % + IVA y pasarela 2 % *(secundaria)* |
| 6 | [Uala — perfil corporativo](https://www.softwaredoit.es/uala/uala.html) | Ámbito europeo e integración con Treatwell |
| 7 | [Koibox — precios](https://koibox.uk/pricing/) · [SoftwareDoit](https://www.softwaredoit.es/koibox/koibox.html) | Planes Lite/Basic y enfoque local español |
| 8 | [Squire — Software Advice](https://www.softwareadvice.com/barbershop/squire-profile/) · [Capterra](https://www.capterra.com/p/153899/Squire-Barber-Appointment-App/) | Verticalización en barbería y catálogo de funciones |
| 9 | [SimplyBook.me — funciones](https://simplybook.me/en/booking-system-features) · [programa white-label](https://simplybook.me/en/white-label-partner-program) | White-label por plan, widget vs sitio propio, multi-sector |
| 10 | [Cal.com — «Going Closed-Source»](https://cal.com/blog/cal-diy-open-source-to-closed-source) · [changelog v6.4](https://cal.com/blog/calcom-v6-4) | Cambio de modelo y de licencia (abril de 2026) *(fuente primaria)* |
| 11 | [`calcom/cal.diy` — GitHub API](https://github.com/calcom/cal.diy) | Licencia MIT, ≈47,5 k estrellas, actividad a 8-ago-2026 *(verificado directamente)* |
| 12 | [`alextselegidis/easyappointments` — GitHub](https://github.com/alextselegidis/easyappointments) | Funcionalidad y límites de la alternativa autoalojada |
| 13 | [Online Booking Statistics 2026 — SimplyBook.me](https://simplybook.me/en/blog/online-booking-statistics) · [No-Show Rates by Industry — Etisia](https://www.etisia.com/no-show-statistics) · [Zenoti Benchmark](https://www.zenoti.com/thecheckin/salon-revenue-management-guide) | Tasas de ausencia y efecto de los recordatorios SMS *(secundarias; cifras a reverificar antes de la memoria)* |
| 14 | [Los mejores software de reservas para peluquerías en España 2026 — Turnito](https://turnito.app/blog/los-mejores-software-de-reservas-para-peluquerias-en-espana-2026/) | Panorámica del mercado español *(secundaria)* |

> **Advertencia metodológica para la memoria.** Las fuentes 2, 3, 4, 5, 13 y 14 son comparativas de terceros, a menudo
> publicadas por competidores del sector. Antes de la redacción final (Fase 6) conviene reverificar cada cifra
> económica contra la página de precios del fabricante y actualizar la fecha de consulta, o bien presentarla como orden
> de magnitud y no como dato exacto.
