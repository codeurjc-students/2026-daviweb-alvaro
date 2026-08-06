# Estado vs rúbrica (gap analysis vivo)

> **Memoria de trabajo del proyecto.** Léelo al empezar cada sesión para orientarte barato; **actualízalo al terminar**.
> Estados: ❌ no hecho · 🟡 parcial / en curso · ✅ hecho. Última actualización: **2026-08-06** (repo del TFG creado + README de Fase 1).

## Resumen rápido
El SaaS funcional está muy avanzado (Angular + Firebase), pero **el TFG exige lo que aún no hay**: backend propio
(NestJS/Mongo), API REST + OpenAPI, pruebas, CI/CD y Docker. La fortaleza es la Clean Architecture (migración barata) y
que ya se cumplen requisitos "difíciles" (algoritmo avanzado, tecnología complementaria, entidades de sobra).

## Requisitos obligatorios
| Requisito | Fase | Estado | Notas / gap |
|---|---|---|---|
| Backend propio con API REST (NestJS) | 2-3 | ❌ | Hoy es Firebase. Crear `backend/`. |
| ≥4 entidades relacionadas (una = Usuario) | 1 | ✅ | Sobran entidades; documentar modelo. |
| 3 roles (anónimo/registrado/admin) | 3 | 🟡 | **Definidos y documentados** en README (matriz de permisos). Implementado solo `owner`; falta construir el rol "registrado". |
| Permisos/propiedad (ownership) | 3 | 🟡 | Reforzar en backend (service). |
| Subida de imágenes | 3 | 🟡 | Galería existe (Firebase Storage) → migrar a GridFS/MinIO. |
| Gráficos (charts) | 4 | ❌ | Implementar dashboard de analítica (KPIs día/hora). |
| Tecnología complementaria | 3-5 | ✅ | SMS (Mocean) ya cuenta. |
| Algoritmo / consulta avanzada | 3 | ✅ | Disponibilidad multi-barbero (Strategy). Documentar. |
| Wireframes (Figma) | 1 | ❌ | **Único bloqueante de Fase 1.** Capturas de la app actual + wireframes de las pantallas nuevas (área de cliente, dashboard). Sección ya reservada en el README. |
| OpenAPI en `docs/api/` | 2 | ❌ | Generar con `@nestjs/swagger`. |
| Datos de ejemplo (seed) | 3 | ❌ | Seed de Mongo con peluquería demo. |
| Paginación (10 + más) | 3 | ❌ | API + UI. |
| README + docs/ (estructura rúbrica) | 1-5 | 🟡 | **README de Fase 1 publicado** (11 apartados del enunciado, Gantt Mermaid, ER, matriz de permisos). Pendiente: wireframes, `docs/api/`, titulación y tutor. |
| Gráficos (charts) — *definición* | 1 | ✅ | 5 gráficos especificados en README con su tipo. Implementación en Fase 4. |
| Blog (Medium, EN) | 3-5 | ❌ | Una entrada por release. |
| Gantt + horas reales | 1-6 | ❌ | Empezar registro en `seguimiento.md`. |
| GitHub Flow + Issues + Projects (Kanban) | 2 | 🟡 | **Repo del TFG operativo** (`codeurjc-students/2026-daviweb-alvaro`, commit `a2109d5`). Falta Projects/Issues formal por fase. |

## Optativas elegidas
| Parte | Pts | Fase | Estado | Notas |
|---|---|---|---|---|
| Pruebas unit + integración | 2 | 2→ | ❌ | Hoy 0 tests (skipTests). |
| Responsive móvil | 1 | 3 | 🟡 | App ya mobile-first; validar y documentar. |
| Despliegue continuo + cloud | 1-2 | 4-5 | ❌ | Elegir plataforma (VM/PaaS/K8s). |
| *(bonus) Análisis estático Sonar* | 1 | 2 | ❌ | Opcional, barato en CI. |

## Calidad de código [EVAL]
| Aspecto | Estado | Notas |
|---|---|---|
| Código/comentarios en inglés | 🟡 | Revisar; hay algo de español en logs/console. |
| ESLint + Prettier | ❌ | Configurar. |
| Sin `console.log` (logging lib) | 🟡 | Funciones usan emojis en logs; cambiar a logger. |
| Capas desacopladas | ✅ | Clean Architecture ya aplicada. |
| Docker / Compose | ❌ | Crear en `docker/`. |
| CI/CD (Actions) | ❌ | Crear workflows. |
