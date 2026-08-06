# Seguimiento del TFG (fases, horas, riesgos, decisiones)

> **Memoria de trabajo** + fuente para el capítulo de metodología de la memoria y el Gantt. Actualízalo al cerrar cada
> sesión relevante. Última actualización: **2026-07-23** (siembra inicial).

## Estado de fases
| Fase | Descripción | Fecha límite | Estado |
|---|---|---|---|
| 1 | Definición de funcionalidades y pantallas | 15 sep | 🟡 (base existente; falta formalizar docs/wireframes) |
| 2 | Repositorio, pruebas y CI | 15 oct | ❌ |
| 3 | v0.1 — Básica + Docker (MVP) | 15 dic | ❌ |
| 4 | v0.2 — Intermedia + despliegue | 1 mar | ❌ |
| 5 | v1.0 — Avanzada | 15 abr | ❌ |
| 6 | Memoria | 15 may | ❌ |
| 7 | Defensa | 15 jun | ❌ |

> Confirmar año académico con el tutor (arranque jul-2026 → previsiblemente curso 2026/2027).

## Roadmap inmediato (siguientes pasos)
1. **Formalizar Fase 1** en la memoria/README: objetivos, funcionalidades básica/intermedia/avanzada, wireframes,
   modelo de entidades, mapa de pantallas.
2. **Preparar el repo del TFG:** fork/copia al repo con acceso del profesor; reestructurar a `frontend/` + `backend/`.
3. **Fase 2:** NestJS mínimo + 1 entidad end-to-end desde Mongo + OpenAPI + primer test de sistema + CI + Docker mínimo.
4. **Modernizar Angular** (`ng update` a la última estable, reverificar build/tests) — *"trabajo nuevo" para la memoria*.
5. **GitHub Projects (Kanban) + Issues por fase** (el modo Asesor genera el backlog).

## Registro de horas (para el Gantt)
| Fecha | Fase | Tarea | Horas |
|---|---|---|---|
| 2026-07-23 | 0 | Setup asistente multi-modo + docs TFG | — |

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
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

## Índice de posts del blog (Medium, EN)
| Fecha | Título | URL | Release |
|---|---|---|---|
| — | (pendiente: post de arranque / Fase 2) | — | — |
