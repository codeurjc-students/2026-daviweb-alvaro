# TFG — Especificación destilada (rúbrica y proceso)

> Fuente: el enunciado oficial completo está en [`enunciado-tfg-web.md`](enunciado-tfg-web.md) (*"Desarrollo de una aplicación web como TFG v3"*, URJC · ETSII). Este documento es la **versión
> operativa** de la rúbrica para el asistente. Si algo aquí contradice al PDF original o a tu tutor, **manda el
> original / el tutor**. Léelo bajo demanda; para el estado del día a día usa [`estado-vs-rubrica.md`](estado-vs-rubrica.md).

## 1. Marco
- **Título/tipo:** TFG de tipo Web, tutorizado en la ETSII (URJC). Tutores del área web (Michel Maes, Óscar Soto,
  Iván Chicano o Micael Gallego).
- **Licencias:** código **Apache 2.0**; memoria **Creative Commons**.
- **Metodología:** iterativa e incremental (principios ágiles, XP + Kanban; **no** Scrum). Registro de **horas reales**
  y **diagrama de Gantt**.
- **Rol del tutor (matiz importante):** actúa como **jefe de proyecto / arquitecto**: marca prioridades, revisa
  planificación y guía en decisiones técnicas de alto nivel. **Sí ayuda** en proceso, arquitectura y prioridades, e
  incluso propone alternativas si te atascas. Lo que **no** cubre es soporte técnico de bajo nivel del **stack
  alternativo** (Node/NestJS/MongoDB no es el recomendado Java/Spring/MySQL) → ahí tiras de autosuficiencia + este
  asistente. **Prepara cada tutoría** (agenda, estado, 3-5 dudas concretas) con el modo Asesor.

## 2. Stack elegido (alternativo al recomendado)
| Área | Recomendado (con soporte) | **Nuestro (alternativo)** |
|---|---|---|
| Backend | Java + Spring Boot | **Node.js + NestJS** |
| Base de datos | MySQL | **MongoDB (Mongoose)** |
| Frontend | Angular (SPA) | **Angular (SPA)** ✅ mismo |
| Pruebas | JUnit + Selenium + Rest Assured | **Jest + Supertest + Playwright/Cypress** |
| Repo / CI | GitHub / GitHub Actions | **GitHub / GitHub Actions** ✅ |
| Empaquetado | Docker | **Docker** ✅ |
| Despliegue | VM / PaaS / K8s (optativa) | **Kubernetes en la nube** (2 pts) |

Arquitectura objetivo: **monolito con API REST + SPA que la consume + Docker, desplegado en Kubernetes**. Detalle en
[`arquitectura-objetivo.md`](arquitectura-objetivo.md).

## 3. Fases y fechas límite
**Calendario comprimido** (acordado 2026-08-06): el desarrollo se cierra en **diciembre de 2026**, no en abril de 2027.

| Fase | Descripción | Fecha límite |
|---|---|---|
| 1 | Definición de funcionalidades y pantallas | 31 ago 2026 |
| 2 | Repositorio, pruebas, CI **y modernización de Angular** | 30 sep 2026 |
| 3 | Versión 0.1 — Funcionalidad básica operativa sobre el backend propio + Docker | 31 oct 2026 |
| 4 | Versión 0.2 — Funcionalidad intermedia + **despliegue en Kubernetes** | 30 nov 2026 |
| 5 | Versión 1.0 — Funcionalidad avanzada + **despliegue continuo al clúster** | 22 dic 2026 |
| 6 | Memoria | 31 ene 2027 |
| 7 | Defensa | *convocatoria oficial URJC* |

> **Reenfoque:** como el proyecto parte de una app funcional (aceptado por la tutoría), el objetivo de las fases 3-5
> **no** es crear funcionalidad, sino alcanzar **paridad funcional sobre la nueva arquitectura**. La compensación en
> trabajo nuevo es la **modernización de Angular** en Fase 2.
>
> **Las fechas son objetivos orientativos, no vencimientos** (tutoría, 2026-09-01): sirven para ordenar el trabajo y
> detectar desvíos pronto. Lo evaluable es el **registro real** —fecha de inicio y de cierre efectivos de cada fase,
> con la desviación justificada— que alimenta el Gantt y el capítulo de metodología. Se lleva en la tabla de fases y en
> el registro de horas de [`seguimiento.md`](seguimiento.md). Que sean orientativas no las hace elásticas: el tope duro
> sigue siendo **diciembre de 2026** para cerrar el desarrollo, y las fases posteriores empujan a las anteriores.

## 4. Partes optativas (mínimo 3 puntos) — **elegidas**
- ✅ **Pruebas unitarias y de integración (2 pts)** — back y front, además de las E2E/sistema obligatorias.
- ✅ **Diseño responsive en móvil (1 pt)** — desde Fase 3 (la app ya es mobile-first).
- ✅ **Despliegue con Kubernetes en la nube (2 pts)** — **pactado con la tutoría al plantear el TFG**, junto con el
  stack de backend; documentado en el repositorio el 2026-09-01. Descartadas VM IaaS (0.5), BD gestionada (1) y PaaS (1). El enunciado lo sitúa en Fase 5, pero la
  release 0.2 (Fase 4) ya debe quedar desplegada en un entorno distinto del de desarrollo → **el clúster tiene que
  estar en pie en Fase 4**.
- ✅ **Despliegue continuo (1 pt)** — Fase 5: la pipeline despliega sola en el clúster.
- 💡 *Bonus fácil no elegido:* **Análisis estático (Sonar, 1 pt)** — barato de añadir en CI si quieres subir nota.

**Total elegido: 6 puntos** sobre el mínimo de 3. Es holgura deliberada, no colchón infinito: si el calendario aprieta,
lo que se recorta primero es el CD automatizado (1 pt) —el despliegue manual documentado sigue valiendo para K8s—, no
las pruebas.

## 5. Requisitos obligatorios (checklist) y cómo los cubre el proyecto
- **≥4 entidades relacionadas, una = Usuario.** ✅ Sobra: `User/Owner`, `Appointment`, `Barber`, `Service`,
  `Schedule/Exception/ReservedSlot`, `GalleryPhoto`, `BlockedPhone`, `TenantConfig`.
- **3 tipos de usuario:** anónimo (consulta/reserva), registrado y **administrador** (contraseña en config cifrada). 🟡
  Hoy solo hay `owner` (admin). Falta modelar "registrado" si se quiere (o justificar por tipo de app).
- **Permisos/propiedad:** solo el dueño edita/borra sus datos. 🟡 Reforzar en el backend con ownership checks.
- **Subida de imágenes** (avatars/fotos). ✅ Galería (migrar Storage→GridFS/MinIO).
- **Gráficos (charts).** 🟡 Épica de analítica (KPIs por día/hora) cubre esto → implementar dashboard.
- **Tecnología complementaria** (emails, PDFs, websockets, mapas, API externa). ✅ **SMS (Mocean)** ya cuenta; se puede
  sumar mapa de ubicación o PDF de "ticket" de cita.
- **Algoritmo / consulta avanzada** (más allá de CRUD). ✅ **Cálculo de disponibilidad multi-barbero (Strategy)** — es
  el algoritmo avanzado; documentarlo bien.
- **Wireframes** (Figma/Lucidchart, no HTML). 🟡 Generar/derivar de la UI existente para la memoria.
- **OpenAPI** en `docs/api/` (`api-docs.yaml` + `api-docs.html`). ❌ Crear (NestJS/Swagger lo genera).
- **Datos de ejemplo representativos** al arrancar. ❌ Seed de Mongo.
- **Paginación** (10 + "más resultados") en listados. ❌ Implementar en API y UI.

## 6. Proceso y herramientas
- **GitHub Flow:** `main` estable (**nunca commits directos**), integración por **Pull Request**. Nombres de rama
  cortos, descriptivos, en inglés y **sin prefijo de carpeta**: `add-login-page`, `fix-booking-overlap` — así lo
  ejemplifica el enunciado (§2.4.1), **no** `feature/*`. Mensajes de commit en inglés y descriptivos.
- **GitHub Issues** por fase; **GitHub Projects** con vista **Kanban**.
- **Blog (Medium):** una entrada por avance/release; **inglés recomendado** (practicar idioma + promoción). Avisar al
  tutor por email al publicar.
- **README.md + `docs/`:** estructura exigida (ver §7). Debe renderizar bien en GitHub.
- **Calidad de código evaluable** (¡puntúa!): ver [`estandares-tecnicos.md`](estandares-tecnicos.md) → inglés en
  código/comentarios, capas desacopladas, sin duplicación, métodos cortos, consultas eficientes, logging con librería.

## 7. Documentación exigida (README + docs/)
Estructura que pide la rúbrica (se va completando por fases):
- **Página principal (README.md):** título (nombre app), párrafo de funcionalidad, capturas/bocetos, **índice** con
  enlaces al resto de `docs/`, vídeo de 1 min por release (0.1/0.2/1.0).
- **Objetivos:** funcionales (párrafo + lista 3-10) y técnicos (párrafo + lista 3-10).
- **Metodología:** fases + fechas + **Gantt**.
- **Funcionalidades detalladas:** básicas / intermedias / avanzadas + a qué rol van dirigidas + estado
  (implementada/no).
- **Análisis:** pantallas y navegación (mockups), **entidades** (atributos + relaciones), permisos por rol, imágenes,
  **gráficos**, tecnología complementaria, **algoritmo/consulta avanzada**.
- **Guía de desarrollo:** introducción (arquitectura de despliegue), tecnologías (con URL oficial), herramientas,
  **arquitectura** (modelo de dominio, API REST enlazada vía raw.githack, arquitectura de servidor y de cliente por
  capas), control de calidad (pruebas + estáticos), despliegue, proceso (git, CI/CD, versionado), **ejecución y edición
  de código** (clonar, arrancar BD/servicios, comandos, colección Postman de la API).
- **Seguimiento:** enlace al blog + al GitHub Project.
- **Autores:** contexto TFG (titulación, ETSII/URJC) + alumno y tutor.

## 8. Guías externas (pídelas / consúltalas cuando toque)
- **Guía para el desarrollo de la memoria del TFG v2** → estructura de la memoria (Fase 6). El modo Redacción la sigue.
- **Guía para la preparación de la defensa del TFG** → Fase 7.

## 9. Cómo usa el asistente este documento
- **Asesor:** referencia principal para planificar fases, priorizar y hacer gap-analysis.
- **Ingeniero:** consulta §5 y §7 para saber qué requisito satisface cada cambio.
- **Redacción:** §7 define la estructura de README/docs; §5 alimenta "Análisis" y "Funcionalidades".
