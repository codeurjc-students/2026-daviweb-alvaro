# Daviweb

Aplicación web **SaaS multi-tenant** de gestión de reservas para peluquerías y barberías. Cada negocio (*tenant*)
dispone de su propia web pública personalizada —branding, servicios, horarios y contenidos propios— desde la que sus
clientes reservan cita online sin necesidad de registrarse, y de un panel de administración con el que gestionar la
agenda, el equipo de profesionales, el catálogo de servicios y la configuración del negocio. El sistema calcula la
disponibilidad real en tiempo real teniendo en cuenta horarios, excepciones, bloqueos de agenda y la carga de trabajo
de cada profesional, y notifica a los clientes por SMS los eventos relevantes de su cita.

---

## Punto de partida y alcance del Trabajo de Fin de Grado

> **Este apartado delimita con precisión qué se ha desarrollado con anterioridad y qué constituye el trabajo evaluable
> de este TFG. Léase antes que cualquier otra sección.**

Este TFG **no parte de cero**, y así ha sido planteado y acordado con la tutoría del trabajo. Existe una aplicación
previa, funcional y en uso, desarrollada **fuera del marco de este trabajo** y con anterioridad a su inicio: un SaaS
de reservas construido con **Angular 19 + Firebase** (Firestore, Authentication, Storage y Cloud Functions), cuyo
historial de desarrollo completo permanece públicamente consultable en el repositorio original:

📦 **Repositorio de origen (trabajo previo, 206 commits):**
[`DaviDevs-org/ProyectoWebPeluqueros`](https://github.com/DaviDevs-org/ProyectoWebPeluqueros)

Este repositorio se inicia con un **único commit** que consolida dicha base de código como punto de partida. La
trazabilidad del desarrollo anterior queda preservada en el repositorio enlazado; **todo el historial de commits de
este repositorio a partir de aquí corresponde al trabajo realizado durante el TFG.**

### Qué **NO** forma parte del trabajo evaluable

- La aplicación Angular existente (web pública, panel de administración, motor de reservas sobre Firebase).
- La infraestructura Firebase actual (Firestore, Auth, Storage, Cloud Functions).

### Qué **SÍ** constituye el TFG

Partir de una base existente se compensa **ampliando el trabajo evaluable**: además de sustituir íntegramente la
plataforma de backend, se acomete la **modernización del frontend heredado**, de modo que al término del trabajo no
quede ninguna de las dos mitades de la aplicación en su estado original.

| Objetivo del TFG | Estado |
|---|---|
| **Backend propio con NestJS + MongoDB** sustituyendo por completo a Firebase | No iniciado |
| **Modernización del frontend**: actualización de Angular a la última versión estable y adopción de sus APIs actuales (*signals*, nuevo control de flujo, `inject()`) | No iniciado |
| **API REST** `/api/v1` documentada con OpenAPI (contract-first) | No iniciado |
| **Autenticación propia con JWT** y sistema de **3 roles** (anónimo / registrado / administrador) | No iniciado |
| **Rol de usuario registrado**, inexistente hoy: área de cliente con historial y gestión de sus citas | No iniciado |
| **Batería de pruebas** unitarias, de integración y de sistema (Jest, Supertest, Playwright) | No iniciado |
| **Integración y despliegue continuos** (GitHub Actions) y **contenerización** con Docker | No iniciado |
| **Dashboard de analítica con gráficos** para el propietario del negocio | No iniciado |
| **Paginación** en todos los listados de la API y de la interfaz | No iniciado |
| **Despliegue en la nube** de la versión final | No iniciado |

> **Estado actual del proyecto:** finalizando la **Fase 1**. A día de hoy se han definido los objetivos funcionales y
> técnicos, el modelo de entidades, los permisos y el plan de trabajo aquí recogidos, pero **no se ha comenzado la
> implementación de ninguno de los objetivos del TFG listados en la tabla anterior.**

La viabilidad de esta migración se sustenta en que la aplicación existente está construida siguiendo **Clean
Architecture**: las capas de dominio y de aplicación son independientes de la tecnología de persistencia, por lo que
la sustitución de Firebase por el backend propio se concentra en la capa de infraestructura. Este punto se desarrolla
en los [objetivos técnicos](#objetivos-técnicos).

---

## Bocetos de pantalla

El diseño de pantallas se documenta con dos tipos de material, según el estado de cada una:

- **Capturas** de las pantallas que ya existen en la aplicación de partida. Al estar maquetadas y en uso, la captura
  refleja el diseño real con mayor fidelidad que un boceto.
- **Wireframes** de las pantallas que aún no existen y se desarrollarán durante el TFG. Son las que requieren
  validación previa por parte de la tutoría, y por tanto se han bocetado antes de escribir una sola línea de código.

### Pantallas existentes · web pública

| | |
|:---:|:---:|
| ![Portada](docs/tfg/images/hero.png) | ![Servicios y precios](docs/tfg/images/services.png) |
| **Portada.** Presentación del negocio con su branding y llamada a la acción hacia la reserva. | **Servicios y precios.** Catálogo con duración y precio de cada servicio. |
| ![Equipo de profesionales](docs/tfg/images/barbers.png) | ![Sobre nosotros](docs/tfg/images/about-us.png) |
| **Equipo de profesionales.** Ficha de cada profesional del negocio. | **Sobre nosotros.** Texto de presentación e imagen del local. |
| ![Reseñas](docs/tfg/images/opinions.png) | ![Preguntas frecuentes](docs/tfg/images/faq.png) |
| **Reseñas.** Opiniones de clientes; sección activable por *feature flag*. | **Preguntas frecuentes.** Dudas habituales en formato desplegable. |
| ![Ubicación y contacto](docs/tfg/images/location-and-contact.png) | ![Pie de página](docs/tfg/images/footer.png) |
| **Ubicación y contacto.** Dirección, horario y vías de contacto. | **Pie de página.** Redes sociales y acceso a las páginas legales. |

**Flujo de reserva**

![Flujo de reserva](docs/tfg/images/reservation.png)

Calendario de selección de día, que muestra en blanco las fechas con disponibilidad real y en color las cerradas o
completas. Es el punto de entrada del [algoritmo de cálculo de disponibilidad](#algoritmo-o-consulta-avanzada).

### Pantallas existentes · panel de administración

| | |
|:---:|:---:|
| ![Gestión de citas](docs/tfg/images/dates-dashboard.png) | ![Servicios y precios](docs/tfg/images/services-dashboard.png) |
| **Gestión de citas.** Listado completo con búsqueda y filtros por servicio y profesional, junto a la vista de calendario diario sobre la que se crean citas hueco a hueco. | **Servicios y precios.** Alta, edición y baja de los servicios del catálogo. |
| ![Galería de fotos](docs/tfg/images/galery-dashboard.png) | ![Información general](docs/tfg/images/information-dashboard.png) |
| **Galería de fotos.** Subida y ordenación de las imágenes de la web pública. | **Información general.** Datos del negocio, contacto, redes sociales y horarios. |
| ![Lista negra](docs/tfg/images/blacklist-dashboard.png) | |
| **Lista negra.** Bloqueo de números de teléfono para prevenir reservas abusivas. | |

### Pantallas nuevas · wireframes

Las cuatro pantallas siguientes **no existen en la aplicación actual** y constituyen parte del trabajo del TFG.

**Registro e inicio de sesión**

![Wireframe de registro e inicio de sesión](docs/tfg/images/login-register-wireframe.png)

Un único punto de autenticación para ambos roles: el rol codificado en el JWT decide el destino tras el acceso
—área de cliente o panel de administración—. En el registro, el teléfono actúa como nexo con las citas anónimas
previas, lo que permite vincular al historial del cliente las reservas que hizo antes de tener cuenta.

**Área de cliente**

![Wireframe del área de cliente](docs/tfg/images/registered-user-wireframe.png)

Historial completo de citas con búsqueda, filtros por servicio y estado, y **paginación de 10 resultados con carga
incremental**. El detalle de cada cita expone las acciones disponibles según su estado y su propiedad: repetir,
modificar y cancelar solo se ofrecen sobre citas futuras del propio usuario.

**Repetición y cancelación de una cita**

![Wireframe de repetición y cancelación](docs/tfg/images/cancel-repeat-date-wireframe.png)

La repetición reutiliza servicio y profesional de la reserva anterior y propone el primer hueco disponible,
apoyándose de nuevo en el cálculo de disponibilidad. La cancelación replica la confirmación de la cancelación por
enlace, pero autenticada: al conocerse la identidad del usuario, no requiere token de un solo uso.

**Cuadro de mando de analítica**

![Wireframe del cuadro de mando](docs/tfg/images/analytics-dahsboard-wireframe.png)

Nueva sección del panel de administración, con selector de periodo, cuatro indicadores principales —citas, tasa de
cancelación, ausencias y ocupación media— y las visualizaciones descritas en el apartado de [gráficos](#gráficos).

---

## Estado del arte

Antes de fijar las funcionalidades se han estudiado nueve aplicaciones del sector para obtener ideas y detectar
posibles mejoras. El estudio completo, con las fuentes y su fecha de consulta, está en
**[`docs/tfg/estado-del-arte.md`](docs/tfg/estado-del-arte.md)**; aquí se resumen sus conclusiones.

El mercado se organiza en cinco familias, y esa división —que responde al modelo de negocio, no a la funcionalidad—
explica casi todas las diferencias observadas:

| Familia | Qué vende | Productos analizados |
|---|---|---|
| **A. Marketplace + software** | Clientes nuevos; el software es el gancho para poblar el portal | Booksy · Fresha · Treatwell/Uala |
| **B. Software vertical de gestión** | Gestión integral del salón: agenda, caja, inventario, fidelización | Koibox (España) · Squire (barberías) |
| **C. Plataforma horizontal de reservas** | Un motor de citas configurable para decenas de sectores | SimplyBook.me |
| **D. *Scheduling* genérico** | Coordinación de reuniones, no negocio de servicios presencial | Cal.com / Cal.diy |
| **E. Autoalojado / código abierto** | Nada: se instala y se mantiene | Easy!Appointments |

Los tres marketplaces cobran por el cliente que presentan —Booksy un 30 % de la primera visita si se activa *Boost*,
Fresha un 20 %, Treatwell en torno al 25 %— sobre una cuota mensual que en España ronda los 15 € (Koibox) a 35 €
(Booksy). Fresha, significativamente, **no cobra comisión por los clientes que llegan desde la web propia del
negocio**: la propia plataforma reconoce el valor del canal propio, que es precisamente lo que este proyecto entrega
por defecto.

### Carencias detectadas y decisiones de diseño

| Carencia observada | Decisión de diseño | Funcionalidad |
|---|---|---|
| **El cliente final debe crear cuenta** en la plataforma para reservar (Booksy, Fresha, Treatwell) | Reserva anónima con nombre y teléfono; la cuenta es opcional y aporta historial y repetición, no es un peaje | `B3`, `B5`, `B6` |
| **Comisión sobre el cliente nuevo**, que puede acabar siendo recurrente del negocio | El negocio opera su propio canal: no hay intermediación posible por diseño | *Modelo de producto* |
| **La marca de la reserva es la del intermediario**, no la del salón | Multi-tenancy *white-label*: branding, contenidos y datos propios de cada negocio, con aislamiento estricto | `A3`, `A4` |
| Lo que se ofrece es un **widget de reservas**, no presencia web: el salón sigue pagando una web aparte | La web pública completa forma parte del producto | `B1`, `I4`, `I5` |
| **Los datos del negocio viven en la plataforma** y salir de ella es costoso | Exportación de citas y clientes como funcionalidad de primera clase, sobre base de datos propia | `A7` |
| **Motor de reserva genérico**: las plataformas horizontales no modelan la doble política de asignación de profesional ni el encadenado de servicios de una sesión | Motor de disponibilidad vertical y configurable mediante el patrón *Strategy*, y reserva multi-servicio | `A5`, `A2` |

El estudio ha aportado además dos mejoras que no figuraban en el alcance inicial: **distinguir el origen de la reserva**
como métrica del cuadro de mando —Fresha factura en función de ese dato— y sustituir el aviso único por una **secuencia
de recordatorios** antes de la cita, práctica que las referencias del sector asocian a reducciones sustanciales de las
ausencias. Quedan expresamente fuera del alcance los pagos y depósitos online, el TPV, la facturación fiscal, el
inventario y la creación de un marketplace propio, este último por contradecir la tesis del producto.

**Posicionamiento.** Ninguno de los productos analizados combina web pública completa por negocio, reserva sin registro
previo, multi-tenancy *white-label* sin comisión y motor de disponibilidad configurable. El proyecto no compite en
captación de clientes ni en gestión integral del salón: se dirige al negocio que ya tiene su clientela y quiere
presencia web propia con reserva online, sin pagar comisión por sus propios clientes ni diluir su marca.

---

## Objetivos

### Objetivos funcionales

El objetivo funcional del proyecto es ofrecer a peluquerías y barberías —negocios que habitualmente gestionan su
agenda por teléfono o mensajería— una solución completa de presencia web y reserva online que puedan poner en marcha
sin conocimientos técnicos. La aplicación debe permitir al cliente final reservar una cita en pocos pasos y sin
fricciones, garantizando que el hueco ofrecido está realmente disponible; y debe dar al propietario del negocio el
control total sobre su agenda, su catálogo y la imagen de su web, además de información agregada que le ayude a tomar
decisiones. Todo ello sobre una única plataforma capaz de servir a múltiples negocios de forma aislada y
personalizada.

1. **Reserva de cita online** para clientes no registrados, con selección de servicio, profesional, fecha y hora, y
   confirmación inmediata.
2. **Cálculo de disponibilidad en tiempo real** que respeta horarios de apertura, excepciones de calendario, bloqueos
   de agenda, duración de cada servicio y ocupación individual de cada profesional.
3. **Área de cliente registrado** con historial de citas, repetición de reservas anteriores y cancelación o
   modificación sin necesidad de enlace externo.
4. **Panel de administración** para el propietario: gestión completa de citas (alta, edición, cancelación, control de
   asistencia), servicios, profesionales, horarios, excepciones y bloqueos.
5. **Web pública personalizable** por negocio: inicio, servicios y precios, sobre nosotros, galería, reseñas,
   ubicación, contacto, preguntas frecuentes y páginas legales.
6. **Notificaciones por SMS** al cliente en los eventos clave de su cita (confirmación y cancelación), con enlace de
   cancelación mediante token de un solo uso.
7. **Multi-tenancy**: cada negocio dispone de identidad, branding, contenidos y datos propios, con aislamiento
   estricto entre negocios.
8. **Activación modular por negocio** (*feature flags*): reserva online, galería, reseñas, SMS y modo mantenimiento
   se habilitan de forma independiente para cada tenant.
9. **Cuadro de mando con gráficos** para el propietario: volumen de citas, tasa de cancelación, distribución por
   servicio y franjas horarias de mayor ocupación.

### Objetivos técnicos

Desde el punto de vista técnico, el trabajo consiste en sustituir por completo la plataforma propietaria *Backend as
a Service* sobre la que hoy se apoya la aplicación por un **backend propio desarrollado con NestJS y MongoDB**, que
exponga una **API REST** documentada y versionada, y en dotar al proyecto de todo el instrumental de un desarrollo
profesional: pruebas automatizadas en sus tres niveles, integración y despliegue continuos, contenerización y
despliegue en la nube. En paralelo se moderniza el frontend heredado, actualizándolo a la última versión estable del
framework y a sus APIs actuales. La arquitectura limpia de la aplicación existente permite acotar la migración a la
capa de infraestructura, lo que convierte esta sustitución tecnológica en una demostración práctica del valor del
desacoplamiento por capas.

1. **Backend NestJS** estructurado en capas desacopladas `controller → service → repository`, sin acceso directo del
   controlador a la persistencia.
2. **MongoDB** como base de datos, con modelo documental multi-tenant (discriminación por campo `tenantId` e índices
   compuestos) y datos de ejemplo cargados mediante *seed*.
3. **API REST** bajo `/api/v1`, con recursos en plural, uso correcto de verbos y códigos de estado HTTP, cabecera
   `Location` en las creaciones, filtrado por parámetros de consulta y paginación en todos los listados.
4. **Documentación OpenAPI** generada con `@nestjs/swagger`, adoptada como contrato de referencia entre frontend y
   backend.
5. **Autenticación y autorización con JWT**, mediante *guards* de rol y de tenant que garanticen tanto los permisos
   por tipo de usuario como el aislamiento entre negocios.
6. **Migración de la capa de infraestructura** del frontend: sustitución de las implementaciones Firebase por
   implementaciones HTTP contra la nueva API, manteniendo intactas las capas de dominio y aplicación.
7. **Modernización del frontend**: actualización de Angular a la última versión estable y adopción de sus APIs
   actuales —*signals* para la gestión de estado reactivo, nuevo bloque de control de flujo en plantillas e inyección
   de dependencias mediante `inject()`—, con la consiguiente reducción de la dependencia de RxJS heredada del modelo
   de suscripciones en tiempo real de Firestore.
8. **Pruebas automatizadas**: unitarias y de integración con Jest y Supertest, y de sistema sobre la interfaz con
   Playwright.
9. **Integración continua** con GitHub Actions (compilación, análisis estático, ejecución de la batería de pruebas en
   cada *pull request*) y **despliegue continuo** de las versiones publicadas.
10. **Contenerización con Docker** y orquestación mediante Docker Compose (aplicación + base de datos), con
    publicación de la imagen y **despliegue en la nube** de la versión final.
11. **Almacenamiento de imágenes** gestionado por el backend propio (GridFS o MinIO) en sustitución de Firebase
    Storage.

---

## Metodología

El desarrollo sigue un modelo **iterativo e incremental** organizado en siete fases. Las fases 3, 4 y 5 constituyen
los ciclos de desarrollo propiamente dichos, y cada una culmina con la publicación de una *release* funcional y
verificable de la aplicación. El trabajo se gestiona mediante **GitHub Flow**: cada tarea se corresponde con una
*issue* del repositorio, se desarrolla en una rama independiente y se integra en `main` a través de una *pull
request* que debe superar los controles automáticos de calidad configurados en la Fase 2.

Dado que el proyecto parte de una aplicación ya funcional, el objetivo de las fases de desarrollo (3, 4 y 5) no es
construir la funcionalidad desde cero, sino **alcanzar la paridad funcional sobre la nueva arquitectura**: cada
*release* incorpora un conjunto de funcionalidades plenamente operativas contra el backend propio, con sus pruebas,
su documentación de API y su despliegue.

| Fase | Descripción | Inicio | Fin |
|---|---|---|---|
| **1** | **Definición de funcionalidades y pantallas.** Objetivos funcionales y técnicos, funcionalidades detalladas por prioridad, análisis de pantallas, entidades y permisos. Se documenta en este mismo fichero: [Objetivos](#objetivos), [Funcionalidades detalladas](#funcionalidades-detalladas) y [Análisis](#análisis). | 15 jul 2026 | **31 ago 2026** |
| **2** | **Repositorio, pruebas, CI y modernización del frontend.** Reestructuración a monorepo, actualización de Angular a la última versión estable y adopción de sus APIs actuales, backend NestJS mínimo con una entidad de extremo a extremo, OpenAPI, primeras pruebas, integración continua y Docker básico. | 1 sep 2026 | **30 sep 2026** |
| **3** | **Versión 0.1 — Funcionalidad básica operativa sobre el backend propio.** Autenticación JWT y sistema de roles, motor de reservas y cálculo de disponibilidad, gestión de imágenes, paginación y contenerización. | 1 oct 2026 | **31 oct 2026** |
| **4** | **Versión 0.2 — Funcionalidad intermedia operativa sobre el backend propio.** Panel de administración completo, analítica con gráficos y despliegue en la nube. | 1 nov 2026 | **30 nov 2026** |
| **5** | **Versión 1.0 — Funcionalidad avanzada operativa sobre el backend propio.** Notificaciones SMS, multi-tenancy completo, funcionalidades avanzadas y pulido final. | 1 dic 2026 | **22 dic 2026** |
| **6** | **Escritura de la memoria.** | 7 ene 2027 | **31 ene 2027** |
| **7** | **Preparación de la presentación y defensa.** | 1 feb 2027 | *Convocatoria oficial* |

### Diagrama de Gantt

```mermaid
gantt
    title Planificación del TFG — Davidevs Hairdressers
    dateFormat YYYY-MM-DD
    axisFormat %b %Y
    tickInterval 1month

    section Definición
    Fase 1 · Funcionalidades y pantallas   :f1, 2026-07-15, 2026-08-31

    section Infraestructura
    Fase 2 · Repo, CI y modernización      :f2, 2026-09-01, 2026-09-30

    section Desarrollo
    Fase 3 · v0.1 Básica                   :f3, 2026-10-01, 2026-10-31
    Fase 4 · v0.2 Intermedia               :f4, 2026-11-01, 2026-11-30
    Fase 5 · v1.0 Avanzada                 :f5, 2026-12-01, 2026-12-22

    section Cierre
    Fase 6 · Memoria                       :f6, 2027-01-07, 2027-01-31
    Fase 7 · Presentación y defensa        :f7, 2027-02-01, 2027-02-28
```

> La fecha de la Fase 7 es orientativa: la defensa queda sujeta a las convocatorias oficiales establecidas por la
> Universidad Rey Juan Carlos.

---

## Funcionalidades detalladas

Las funcionalidades se clasifican por prioridad y se indica el tipo de usuario al que van dirigidas.

### Tipos de usuario

| Usuario | Descripción |
|---|---|
| 👤 **Anónimo** | Visitante no autenticado. Consulta la web pública del negocio y puede reservar cita aportando únicamente nombre y teléfono. |
| 🔑 **Registrado** | Cliente con cuenta en la plataforma. Además de lo anterior, dispone de área personal con el historial y la gestión de sus propias citas. |
| 🛠️ **Administrador** | Propietario o gestor del negocio. Control total sobre la operativa y la configuración de su tenant. |

La columna **Estado** distingue tres situaciones: *base previa* — funcionalidad ya operativa en la aplicación de
partida, que deberá reconstruirse sobre el backend propio para darse por completada; *nueva* — funcionalidad que no
existe y se desarrolla íntegramente durante el TFG; y *completada* — funcionalidad ya operativa sobre la arquitectura
objetivo. Ninguna se encuentra aún en este último estado.

### Funcionalidad básica

| # | Funcionalidad | Usuario | Estado |
|---|---|---|---|
| B1 | Consulta de la web pública: inicio, servicios y precios, sobre nosotros, ubicación, contacto y páginas legales | 👤 Anónimo | Base previa |
| B2 | Consulta de la disponibilidad de citas por fecha, servicio y profesional | 👤 Anónimo | Base previa |
| B3 | Reserva de cita aportando nombre y teléfono, con confirmación inmediata | 👤 Anónimo | Base previa |
| B4 | Cancelación de una cita mediante enlace con token de un solo uso | 👤 Anónimo | Base previa |
| B5 | Registro de cuenta e inicio de sesión | 👤 Anónimo → 🔑 Registrado | **Nueva** |
| B6 | Consulta del historial de citas propias y cancelación desde el área de cliente | 🔑 Registrado | **Nueva** |
| B7 | Inicio de sesión en el panel de administración | 🛠️ Administrador | Base previa |
| B8 | Gestión de citas: listado por fecha o rango, alta, edición y cancelación | 🛠️ Administrador | Base previa |
| B9 | Gestión del catálogo de servicios: nombre, duración y precio | 🛠️ Administrador | Base previa |
| B10 | Gestión del equipo de profesionales | 🛠️ Administrador | Base previa |

### Funcionalidad intermedia

| # | Funcionalidad | Usuario | Estado |
|---|---|---|---|
| I1 | Edición del perfil propio y repetición de reservas anteriores en un paso | 🔑 Registrado | **Nueva** |
| I2 | Gestión de horarios de apertura, excepciones de calendario y bloqueos de agenda | 🛠️ Administrador | Base previa |
| I3 | Control de asistencia de los clientes a sus citas | 🛠️ Administrador | Base previa |
| I4 | Gestión de la galería de imágenes del negocio | 🛠️ Administrador | Base previa |
| I5 | Configuración del contenido y los datos del negocio: contacto, redes sociales y textos | 🛠️ Administrador | Base previa |
| I6 | Cuadro de mando con gráficos: volumen de citas, cancelaciones, servicios más solicitados y franjas de mayor ocupación | 🛠️ Administrador | **Nueva** |
| I7 | Filtrado y búsqueda avanzada de citas, con listados paginados | 🛠️ Administrador | Base previa · paginación **nueva** |

### Funcionalidad avanzada

| # | Funcionalidad | Usuario | Estado |
|---|---|---|---|
| A1 | Recepción de notificaciones SMS en los eventos clave de la cita | 👤 Anónimo · 🔑 Registrado | Base previa |
| A2 | Reserva de varios servicios en una misma sesión, con encadenado automático de duraciones | 👤 Anónimo · 🔑 Registrado | **Nueva** |
| A3 | Personalización del branding del negocio: colores, tipografías, logotipo e imágenes | 🛠️ Administrador | Base previa |
| A4 | Activación modular de funcionalidades por negocio y modo mantenimiento (*feature flags*) | 🛠️ Administrador | Base previa |
| A5 | Selección de la estrategia de reserva: agenda global o disponibilidad por profesional | 🛠️ Administrador | Base previa |
| A6 | Lista de bloqueo de teléfonos para prevenir reservas abusivas | 🛠️ Administrador | Base previa |
| A7 | Exportación de los datos del negocio (citas y clientes) | 🛠️ Administrador | **Nueva** |

---

## Análisis

### Pantallas y navegación

| Pantalla | Ruta | Boceto | Descripción | Navega hacia |
|---|---|---|---|---|
| **Inicio** | `/` | [Capturas](#pantallas-existentes--web-pública) | Página principal del negocio con su branding. Integra en una única página las secciones de servicios y precios, sobre nosotros, galería, reseñas, preguntas frecuentes, ubicación y contacto, así como el formulario de reserva. | Reserva, Login, Registro, Legales |
| **Reserva** | `/` (modal) | [Captura](#pantallas-existentes--web-pública) | Flujo de reserva por pasos: selección de servicio, profesional, fecha y hora sobre la disponibilidad real, y confirmación con los datos de contacto. | Confirmación |
| **Registro / Login** | `/registro`, `/login` | [Wireframe](#pantallas-nuevas--wireframes) | Alta de cuenta de cliente e inicio de sesión. Da acceso al área de cliente y, para el propietario, al panel de administración. | Área de cliente, Panel de administración |
| **Área de cliente** | `/mis-citas` | [Wireframe](#pantallas-nuevas--wireframes) | Historial de citas del cliente registrado, con detalle, repetición y cancelación. | Reserva |
| **Panel de administración** | `/admin` | [Capturas](#pantallas-existentes--panel-de-administración) | Espacio de trabajo del propietario, organizado en secciones: agenda y gestión de citas, servicios, profesionales, horarios y excepciones, galería, configuración del negocio y cuadro de mando. | Todas las secciones de administración |
| **Cuadro de mando** | `/admin` (sección) | [Wireframe](#pantallas-nuevas--wireframes) | Visualización gráfica de los indicadores del negocio. | — |
| **Cancelación por enlace** | `/cancelar/:token` | [Wireframe](#pantallas-nuevas--wireframes) | Confirmación de la cancelación de una cita a partir del enlace recibido por SMS, sin requerir autenticación. | Inicio |
| **Páginas legales** | `/aviso-legal`, `/politica-privacidad` | — | Aviso legal y política de privacidad. | Inicio |

### Entidades

El modelo consta de **diez entidades relacionadas**, todas ellas asociadas a un tenant salvo la propia entidad
`Tenant`.

| Entidad | Atributos principales | Relaciones |
|---|---|---|
| **User** | `email`, `passwordHash`, `name`, `phone`, `role`, `tenantId` | Pertenece a un `Tenant`; tiene muchas `Appointment` |
| **Tenant** | `name`, `branding` (colores, tipografías, logotipo), `contact`, `socialLinks`, `featureFlags`, `smsSender` | Tiene muchos `User`, `Service`, `Barber`, `Appointment` |
| **Appointment** | `startAt`, `endAt`, `customerName`, `customerPhone`, `status`, `attendance`, `cancelToken`, `createdAt` | Pertenece a un `Tenant`, un `Service`, un `Barber` y, opcionalmente, un `User` |
| **Service** | `name`, `description`, `durationMin`, `price`, `isActive` | Pertenece a un `Tenant`; aparece en muchas `Appointment` |
| **Barber** | `name`, `photo`, `isAvailable`, `schedule` | Pertenece a un `Tenant`; atiende muchas `Appointment` |
| **Schedule** | `dayOfWeek`, `openTime`, `closeTime`, `isClosed` | Pertenece a un `Tenant` y, opcionalmente, a un `Barber` |
| **ScheduleException** | `date`, `reason`, `isClosed`, `customHours` | Pertenece a un `Tenant` |
| **ReservedSlot** | `startAt`, `endAt`, `reason`, `barberId` (nulo = bloqueo global) | Pertenece a un `Tenant` y, opcionalmente, a un `Barber` |
| **GalleryPhoto** | `imageRef`, `caption`, `order` | Pertenece a un `Tenant` |
| **BlockedPhone** | `phone`, `reason`, `blockedAt` | Pertenece a un `Tenant` |

```mermaid
erDiagram
    TENANT   ||--o{ USER            : "agrupa"
    TENANT   ||--o{ SERVICE         : "ofrece"
    TENANT   ||--o{ BARBER          : "emplea"
    TENANT   ||--o{ APPOINTMENT     : "registra"
    TENANT   ||--o{ SCHEDULE        : "define"
    TENANT   ||--o{ SCHEDULEEXCEPTION : "define"
    TENANT   ||--o{ RESERVEDSLOT    : "bloquea"
    TENANT   ||--o{ GALLERYPHOTO    : "publica"
    TENANT   ||--o{ BLOCKEDPHONE    : "veta"
    USER     ||--o{ APPOINTMENT     : "reserva"
    SERVICE  ||--o{ APPOINTMENT     : "se presta en"
    BARBER   ||--o{ APPOINTMENT     : "atiende"
    BARBER   ||--o{ SCHEDULE        : "tiene"
    BARBER   ||--o{ RESERVEDSLOT    : "tiene"
```

### Permisos de usuario

| Acción | 👤 Anónimo | 🔑 Registrado | 🛠️ Administrador |
|---|:---:|:---:|:---:|
| Consultar la web pública y los servicios | ✅ | ✅ | ✅ |
| Consultar disponibilidad y reservar cita | ✅ | ✅ | ✅ |
| Cancelar una cita mediante token recibido por SMS | ✅ | ✅ | ✅ |
| Registrarse e iniciar sesión | ✅ | — | — |
| Consultar y gestionar **las citas propias** | ❌ | ✅ | ✅ |
| Editar el perfil propio | ❌ | ✅ | ✅ |
| Consultar y gestionar **las citas de todo el negocio** | ❌ | ❌ | ✅ |
| Gestionar servicios, profesionales, horarios y bloqueos | ❌ | ❌ | ✅ |
| Gestionar la galería y la configuración del negocio | ❌ | ❌ | ✅ |
| Consultar el cuadro de mando y exportar datos | ❌ | ❌ | ✅ |

El acceso a los datos está sujeto a dos controles acumulativos: el **rol** determina qué operaciones puede ejecutar el
usuario, y el **tenant** determina sobre qué conjunto de datos las ejecuta. Un usuario registrado sólo puede operar
sobre las citas de las que es propietario (*ownership*), y ningún usuario —administrador incluido— puede acceder a
datos pertenecientes a otro negocio.

### Imágenes

Tres entidades llevan imágenes asociadas:

- **GalleryPhoto** — varias imágenes por negocio, subidas y ordenadas por el administrador, que componen la galería
  de la web pública.
- **Tenant** — logotipo e imagen de cabecera que definen la identidad visual del negocio.
- **Barber** — una fotografía de perfil por profesional, mostrada durante la selección en el flujo de reserva.

Las imágenes se almacenarán en el backend propio mediante **GridFS**, sustituyendo al servicio de almacenamiento
externo utilizado actualmente.

### Gráficos

El cuadro de mando del administrador —cuyo diseño se recoge en el [wireframe correspondiente](#pantallas-nuevas--wireframes)—
se articula en torno a un selector de periodo (7 días, 30 días, trimestre o año) que gobierna todas las
visualizaciones, cuatro indicadores numéricos de cabecera (citas del periodo, tasa de cancelación, ausencias y
ocupación media) y los siguientes gráficos:

| Información | Tipo de gráfico |
|---|---|
| Evolución del número de citas, comparada con el periodo anterior | Líneas |
| Citas confirmadas, canceladas y no atendidas por periodo | Barras apiladas |
| Ocupación por franja horaria y día de la semana | Mapa de calor |
| Distribución de reservas por servicio | Tarta |
| Reparto de la carga de trabajo entre profesionales | Barras horizontales |

Los datos se obtendrán mediante consultas de agregación sobre MongoDB, sin recuperar los documentos completos para
procesarlos en memoria.

### Tecnología complementaria

**Notificaciones por SMS** mediante la integración con una pasarela externa de mensajería (Mocean / GatewayAPI). El
sistema envía un mensaje al cliente al confirmarse su cita —incluyendo un enlace de cancelación con token de un solo
uso— y ante los cambios que le afectan. La integración se resuelve con el **patrón Adapter**, de modo que el proveedor
de SMS resulta intercambiable sin modificar la lógica de negocio.

### Algoritmo o consulta avanzada

**Cálculo de disponibilidad multi-profesional.** Dado un servicio, una fecha y, opcionalmente, un profesional
concreto, el algoritmo determina el conjunto de huecos reservables combinando:

- el horario de apertura del negocio y el horario particular de cada profesional,
- las excepciones de calendario (festivos, cierres puntuales, jornadas con horario especial),
- los bloqueos de agenda, tanto globales como individuales,
- las citas ya existentes y la duración específica del servicio solicitado,
- y la **estrategia de reserva** configurada por el negocio: *agenda global*, en la que basta con que algún
  profesional esté libre, o *por profesional*, en la que se calcula la disponibilidad individual de cada uno.

Ambas estrategias se implementan mediante el **patrón Strategy**, lo que permite añadir nuevas políticas de reserva
sin alterar el motor de disponibilidad. El algoritmo debe además resolver la **concurrencia**: dos clientes que
intentan reservar simultáneamente el mismo hueco. Esta garantía se abordará mediante un índice único sobre la
combinación de negocio, profesional e instante de inicio.

---

## Seguimiento

| Recurso | Enlace |
|---|---|
| **Blog de desarrollo** | 🚧 Pendiente de publicar. Se anunciará en él cada versión publicada al cierre de las fases 3, 4 y 5. |
| **GitHub Project (Kanban)** | 🚧 Pendiente de configurar en la Fase 2. Recogerá las tareas del proyecto organizadas por fase. |

---

## Autor

Esta aplicación se desarrolla en el contexto del **Trabajo de Fin de Grado** del **Grado en Ingeniería del Software**
en la **Escuela Técnica Superior de Ingeniería Informática (ETSII)** de la **Universidad Rey Juan Carlos**.

| | |
|---|---|
| **Alumno** | Álvaro Fuente González |
| **Tutores** | Óscar Soto Sánchez · Natalia Madrueño Sierro |
| **Curso académico** | 2026 / 2027 |

---

## Tecnologías

### Situación actual

| Ámbito | Tecnología |
|---|---|
| Frontend | Angular 19 · TypeScript · SCSS |
| Arquitectura | Clean Architecture (dominio · aplicación · infraestructura · presentación) |
| Backend | Firebase (Firestore · Authentication · Storage · Cloud Functions) |

### Situación objetivo

| Ámbito | Tecnología |
|---|---|
| Frontend | Angular (última versión estable) · TypeScript · SCSS |
| Backend | NestJS · TypeScript |
| Base de datos | MongoDB |
| Autenticación | JWT |
| Documentación de la API | OpenAPI (`@nestjs/swagger`) |
| Pruebas | Jest · Supertest · Playwright |
| Calidad | ESLint · Prettier · análisis estático |
| CI/CD | GitHub Actions |
| Contenerización | Docker · Docker Compose |

---

## Licencia

Distribuido bajo licencia **Apache 2.0**. Véase el fichero [`LICENSE`](LICENSE).
