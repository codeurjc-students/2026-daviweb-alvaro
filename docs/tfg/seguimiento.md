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
| Fase | Descripción | Fecha límite | Estado |
|---|---|---|---|
| 1 | Definición de funcionalidades y pantallas | 15 sep | 🟡 README publicado; **falta solo wireframes** + confirmar titulación/tutor |
| 2 | Repositorio, pruebas y CI | 15 oct | ❌ |
| 3 | v0.1 — Básica + Docker (MVP) | 15 dic | ❌ |
| 4 | v0.2 — Intermedia + despliegue | 1 mar | ❌ |
| 5 | v1.0 — Avanzada | 15 abr | ❌ |
| 6 | Memoria | 15 may | ❌ |
| 7 | Defensa | 15 jun | ❌ |

> Confirmar año académico con el tutor (arranque jul-2026 → previsiblemente curso 2026/2027).

## Roadmap inmediato (siguientes pasos)
1. ~~**Formalizar Fase 1** en el README: objetivos, funcionalidades básica/intermedia/avanzada, modelo de entidades,
   mapa de pantallas.~~ ✅ **2026-08-06.** Queda pendiente: **wireframes/capturas**.
2. **Confirmar con el tutor** (bloquea el cierre de Fase 1): titulación y nombre del tutor para el README (hoy con
   marcadores `⚠️ PENDIENTE` visibles), y **validar el planteamiento de partir de una aplicación previa** (ver riesgo).
3. ~~**Preparar el repo del TFG**~~ ✅ **2026-08-06** (queda reestructurar a `frontend/` + `backend/`, en Fase 2).
4. **Fase 2:** NestJS mínimo + 1 entidad end-to-end desde Mongo + OpenAPI + primer test de sistema + CI + Docker mínimo.
4. **Modernizar Angular** (`ng update` a la última estable, reverificar build/tests) — *"trabajo nuevo" para la memoria*.
5. **GitHub Projects (Kanban) + Issues por fase** (el modo Asesor genera el backlog).

## Registro de horas (para el Gantt)
| Fecha | Fase | Tarea | Horas |
|---|---|---|---|
| 2026-07-23 | 0 | Setup asistente multi-modo + docs TFG | — |
| 2026-08-06 | 1 | Creación del repo del TFG + README de Fase 1 (objetivos, Gantt, entidades, permisos, análisis) | — |

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| **El enunciado presupone partir de cero** ("no se ha comenzado la implementación") y aquí hay una app previa | Alto | README con sección *Punto de partida y alcance* que delimita qué es previo y qué es evaluable, y enlaza el repo original. **Validar con el tutor en la primera tutoría**; si no lo acepta, renegociar el alcance del trabajo nuevo. |
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

## Índice de posts del blog (Medium, EN)
| Fecha | Título | URL | Release |
|---|---|---|---|
| — | (pendiente: post de arranque / Fase 2) | — | — |
