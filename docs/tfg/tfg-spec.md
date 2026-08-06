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

Arquitectura objetivo: **monolito con API REST + SPA que la consume + Docker**. Detalle en
[`arquitectura-objetivo.md`](arquitectura-objetivo.md).

## 3. Fases y fechas límite
| Fase | Descripción | Fecha límite |
|---|---|---|
| 1 | Definición de funcionalidades y pantallas | 15 sep |
| 2 | Repositorio, pruebas y CI | 15 oct |
| 3 | Versión 0.1 — Funcionalidad básica y Docker (MVP) | 15 dic |
| 4 | Versión 0.2 — Funcionalidad intermedia + despliegue | 1 mar |
| 5 | Versión 1.0 — Funcionalidad avanzada | 15 abr |
| 6 | Memoria (primer borrador) | 15 may |
| 7 | Defensa | 15 jun |

> Las fechas son del calendario del curso; **confirma el año académico exacto con tu tutor** (arranque en jul-2026 →
> curso 2026/2027). No se pueden superar salvo fuerza mayor. Estado real por fase en [`seguimiento.md`](seguimiento.md).

## 4. Partes optativas (mínimo 3 puntos) — **elegidas**
- ✅ **Pruebas unitarias y de integración (2 pts)** — back y front, además de las E2E/sistema obligatorias.
- ✅ **Diseño responsive en móvil (1 pt)** — desde Fase 3 (la app ya es mobile-first).
- ✅ **Despliegue continuo (1 pt)** + **plataforma cloud** (VM IaaS 0.5 / BD gestionada 1 / PaaS 1 / K8s 2 / integrado
  S3-RDS 3) — Fases 4-5.
- 💡 *Bonus fácil no elegido:* **Análisis estático (Sonar, 1 pt)** — barato de añadir en CI si quieres subir nota.

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
- **GitHub Flow:** `main` estable (nunca commits directos), ramas `feature/*` y `fix/*` en inglés, integración por
  **Pull Request**. Mensajes de commit en inglés y descriptivos.
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
