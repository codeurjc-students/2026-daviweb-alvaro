# Seguimiento del TFG (fases, horas, riesgos, decisiones)

> **Memoria de trabajo** + fuente para el capítulo de metodología de la memoria y el Gantt. Actualízalo al cerrar cada
> sesión relevante. Última actualización: **2026-08-06** (repo del TFG creado + README de Fase 1).

> **Repositorio del TFG:** [`codeurjc-students/2026-daviweb-alvaro`](https://github.com/codeurjc-students/2026-daviweb-alvaro)
> — commit inicial `a2109d5`. Historial previo (206 commits) en el repo público
> [`DaviDevs-org/ProyectoWebPeluqueros`](https://github.com/DaviDevs-org/ProyectoWebPeluqueros), enlazado desde el README
> para preservar la trazabilidad. Copia de seguridad íntegra del `.git` original en
> `~/Escritorio/Programación/Angular/backup-daviweb-git-20260806.bundle` (contiene `dd82d1e` de la rama `multitenant` y
> el stash del revert de SSR, que **no** estaban en ningún remoto).

## Estado de fases
**Calendario comprimido** (2026-08-06): desarrollo cerrado en **diciembre de 2026**. Fases 3-5 reenfocadas a
**paridad funcional sobre el backend propio**, no a crear funcionalidad desde cero.

| Fase | Descripción | Fecha límite | Estado |
|---|---|---|---|
| 1 | Definición de funcionalidades y pantallas | 31 ago 2026 | 🟡 README completo con bocetos y wireframes. Falta: **estado del arte**, GitHub Project + Issues, índice a `docs/` y blog |
| 2 | Repositorio, pruebas, CI **y modernización de Angular** | 30 sep 2026 | ❌ |
| 3 | v0.1 — Básica sobre backend propio + Docker | 31 oct 2026 | ❌ |
| 4 | v0.2 — Intermedia + despliegue cloud | 30 nov 2026 | ❌ |
| 5 | v1.0 — Avanzada | 22 dic 2026 | ❌ |
| 6 | Memoria | 31 ene 2027 | ❌ |
| 7 | Defensa | *convocatoria oficial* | ❌ |

> Curso 2026/2027. Alumno: **Álvaro Fuente González** · Grado en **Ingeniería del Software** · tutores **Óscar Soto
> Sánchez** y **Natalia Madrueño Sierro**.

## Roadmap inmediato (siguientes pasos)
1. ~~**Formalizar Fase 1** en el README: objetivos, funcionalidades básica/intermedia/avanzada, modelo de entidades,
   mapa de pantallas.~~ ✅ **2026-08-06.** Queda pendiente: **wireframes/capturas**.
2. ~~**Confirmar con el tutor** titulación, tutores y el planteamiento de partir de una aplicación previa.~~ ✅
   **2026-08-06.** Aceptado por la tutoría; datos de autoría ya en el README.
   → **Queda pendiente confirmar las fechas nuevas** del calendario comprimido con Óscar y Natalia.
3. ~~**Preparar el repo del TFG**~~ ✅ **2026-08-06** (queda reestructurar a `frontend/` + `backend/`, en Fase 2).
4. **Fase 2:** NestJS mínimo + 1 entidad end-to-end desde Mongo + OpenAPI + primer test de sistema + CI + Docker mínimo.
4. **Modernizar Angular** (`ng update` a la última estable, reverificar build/tests) — *"trabajo nuevo" para la memoria*.
5. **GitHub Projects (Kanban) + Issues por fase** (el modo Asesor genera el backlog).

## Registro de horas (para el Gantt)
| Fecha | Fase | Tarea | Horas |
|---|---|---|---|
| 2026-07-23 | 0 | Setup asistente multi-modo + docs TFG | 3 |
| 2026-08-06 | 1 | Creación del repo del TFG + README de Fase 1 (objetivos, Gantt, entidades, permisos, análisis) | 2 |
| 2026-08-06 | 1 | Reenfoque de fases, calendario comprimido y GitHub Flow como regla del agente | 2 |
| 2026-08-11 | 1 | Capturas y wireframes (Figma) + redacción de bocetos de pantalla en el README | 3 |

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| **Calendario comprimido**: 9 meses de desarrollo reducidos a 4,5, sin recortar entregables y **añadiendo** la modernización de Angular | Alto | Priorizar sin piedad por fase; cerrar Fase 1 ya. La **Fase 2 es la más cargada** (monorepo + backend mínimo + CI + Docker + `ng update`) y solo tiene septiembre: si algo descarrila, es ahí. **Confirmar las fechas nuevas con Óscar y Natalia** — las del enunciado son las oficiales. |
| **La defensa depende de convocatorias oficiales de la URJC**, no es una fecha elegible | Medio | Consultar el calendario de convocatorias antes de comprometer la fecha de la Fase 7; el README ya la marca como orientativa. |
| **Soporte técnico limitado del tutor en Node/NestJS/Mongo** (stack alternativo) | Alto | Tests sólidos + docs + este asistente + comunidad. Preparar dudas concretas para tutorías. |
| Concurrencia de reservas (doble booking) | Alto | Transacciones Mongo / índice único `{tenantId,barberId,startAt}`. |
| Alcance grande del SaaS vs tiempo del TFG | Medio | Priorizar por fases (básica→intermedia→avanzada); no reimplementar todo a la vez. |
| SSR complica la imagen Docker única | Medio | Servir SPA compilada desde Nest para el artefacto; decidir en Fase 3. |
| Compartir frontend con Dario (backends distintos) | Medio | **Contrato OpenAPI** como verdad compartida; sincronizar cambios de front. |

## Decisiones (ADR-lite)
| # | Fecha | Decisión | Motivo |
|---|---|---|---|
| 1 | 2026-07-23 | Backend **NestJS + MongoDB** | Alineado con capas de la rúbrica (tipo Spring); Swagger/Jest/guards integrados. |
| 2 | 2026-07-23 | **Un repo propio** por alumno (monorepo `frontend/`+`backend/`) | Cada uno su versión del front + su backend. |
| 3 | 2026-07-23 | **Contract-first OpenAPI** | Front compartido / backends distintos; impresiona al tribunal. |
| 4 | 2026-07-23 | Config del asistente **versionada** en el repo | Portable al fork; misma experiencia en app nativa y VSCode. |
| 5 | 2026-07-23 | **SRS traído al repo** (`docs/SRS.md`) como fuente única | Estaba fuera del repo del TFG (`business/…`); es materia prima clave de la memoria y debe versionarse/viajar. |
| 6 | 2026-08-06 | Repo del TFG con **un único commit inicial**, sin arrastrar los 206 previos | El README documenta el punto de partida y el repo original sigue público: la trazabilidad se preserva por enlace. El historial de este repo queda así limpio y equivale al trabajo del TFG. |
| 7 | 2026-08-06 | **Declarar el trabajo previo** en el README en lugar de omitirlo | El historial es público y verificable: adelantarse convierte un problema de credibilidad en un argumento de arquitectura (Clean Architecture ⇒ migración acotada a `infrastructure/`). |
| 8 | 2026-08-06 | **Abandonar el remote `DaviDevs-org`** en esta carpeta | El repo compartido con Dario no se seguirá actualizando; esta copia de trabajo pasa a ser exclusivamente del TFG. |
| 9 | 2026-08-06 | **Calendario comprimido: desarrollo cerrado en dic-2026** (v1.0 el 22 dic) en lugar de abr-2027 | Decisión del alumno. Memoria en enero y defensa en convocatoria oficial. |
| 10 | 2026-08-06 | **Modernizar Angular en Fase 2** (última versión estable + signals, nuevo control de flujo, `inject()`) | Compensación en trabajo nuevo por partir de una app preexistente: al terminar, ninguna de las dos mitades queda en su estado original. |
| 11 | 2026-08-06 | **GitHub Flow estricto**, con la regla elevada a `CLAUDE.md` | Vivía solo en `tfg-spec.md` (carga bajo demanda) y por eso se commiteó directo a `main` el 6-ago. Ramas `add-x`/`fix-x` **sin prefijo `feature/`**, según el ejemplo del enunciado §2.4.1. |

## Índice de posts del blog (Medium, EN)
| Fecha | Título | URL | Release |
|---|---|---|---|
| — | (pendiente: post de arranque / Fase 2) | — | — |
