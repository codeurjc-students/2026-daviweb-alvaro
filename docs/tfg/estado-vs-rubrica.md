# Estado vs rúbrica (gap analysis vivo)

> **Memoria de trabajo del proyecto.** Léelo al empezar cada sesión para orientarte barato; **actualízalo al terminar**.
> Estados: ❌ no hecho · 🟡 parcial / en curso · ✅ hecho. Última actualización: **2026-09-08** (optativa de despliegue:
> Kubernetes en la nube; **cierre de la Fase 1**). Fase en curso: **2 — repositorio, pruebas, CI y modernización de
> Angular** (objetivo: 30 sep 2026).

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
| **Estado del arte** (estudio de apps similares) | 1 | ✅ | **Hecho 2026-08-14.** `docs/tfg/estado-del-arte.md`: 9 productos en 5 familias, comparativa por 11 criterios, 6 carencias → decisiones de diseño trazadas a las funcionalidades del README, ideas incorporadas y descartadas, fuentes con fecha. Resumen en el README. Materia prima directa del capítulo homónimo de la memoria. |
| Wireframes (Figma) | 1 | ✅ | **Hecho 2026-08-11.** 14 capturas de la app actual + 4 wireframes de las pantallas nuevas (login/registro, área de cliente, repetir/cancelar, cuadro de mando) en `docs/tfg/images/`, integrados en el README y enlazados desde la tabla de pantallas. **Validados por la tutoría el 2026-09-01.** |
| OpenAPI en `docs/api/` | 2 | ❌ | Generar con `@nestjs/swagger`. |
| Datos de ejemplo (seed) | 3 | ❌ | Seed de Mongo con peluquería demo. |
| Paginación (10 + más) | 3 | ❌ | API + UI. |
| README + docs/ (estructura rúbrica) | 1-5 | 🟡 | **README de Fase 1 publicado** (11 apartados del enunciado, Gantt Mermaid, ER, matriz de permisos, estado por funcionalidad, autoría). Wireframes y estado del arte ya integrados. **Checklist del enunciado §3.2 verificado el 2026-09-01**: contenido completo (objetivos funcionales 9 y técnicos 10, ambos dentro del rango 3-10). Pendiente y **exigible ya en Fase 1**: enlaces reales de blog y GitHub Project en el apartado *Seguimiento*. Pendiente de **Fase 2** en adelante: índice a `docs/`, `docs/api/`, vídeo por release. |
| Gráficos (charts) — *definición* | 1 | ✅ | 5 gráficos especificados en README con su tipo. Implementación en Fase 4. |
| Blog (Medium, EN) | 1-5 | 🟡 | **Primer post publicado el 2026-09-08** ([Phase 1](https://medium.com/@alvarofuenteg/phase-1-defining-the-product-and-studying-the-competition-641178c6dedd)), enlazado desde el README. Falta una entrada por fase/release; fuente y flujo de publicación en [`blog/README.md`](blog/README.md). |
| Gantt + horas reales | 1-6 | ❌ | Empezar registro en `seguimiento.md`. |
| GitHub Flow + Issues + Projects (Kanban) | 2 | 🟡 | **Repo del TFG operativo** (`codeurjc-students/2026-daviweb-alvaro`). Regla de ramas `add-x`/`fix-x` + PR ya en `CLAUDE.md`. **Project por crear por la tutoría** (el alumno no tiene permisos en la organización); falta pegar su URL directa en el README y poblarlo de issues por fase. |

## Optativas elegidas
| Parte | Pts | Fase | Estado | Notas |
|---|---|---|---|---|
| **Modernización de Angular** (última estable + signals, nuevo control de flujo, `inject()`) | — | 2 | ❌ | **Compensación acordada** por partir de app preexistente. No puntúa como optativa de rúbrica, pero es trabajo nuevo evaluable y argumento de memoria. Hoy Angular 19 congelado desde feb-2026. |
| Pruebas unit + integración | 2 | 2→ | ❌ | Hoy 0 tests (skipTests). |
| Responsive móvil | 1 | 3 | 🟡 | App ya mobile-first; validar y documentar. |
| **Despliegue con Kubernetes en la nube** | 2 | 4 | ❌ | **Plataforma pactada con la tutoría desde el planteamiento del TFG**, no elegida sobre la marcha. Pendiente: elegir proveedor de clúster (y confirmar si la URJC da créditos cloud), dominio + DNS wildcard, manifiestos en `k8s/` (Kustomize), Ingress NGINX + cert-manager, Mongo `StatefulSet`+PVC o gestionado. Clúster en pie **antes del 30 nov** (la release 0.2 debe estar desplegada). |
| Despliegue continuo | 1 | 5 | ❌ | Pipeline build→push→`rollout`→smoke test contra el clúster, con `kubeconfig` en secret de GitHub. |
| *(bonus) Análisis estático Sonar* | 1 | 2 | ❌ | Opcional, barato en CI. |

## Calidad de código [EVAL]
| Aspecto | Estado | Notas |
|---|---|---|
| Código/comentarios en inglés | 🟡 | Revisar; hay algo de español en logs/console. |
| ESLint + Prettier | ❌ | Configurar. |
| Sin `console.log` (logging lib) | 🟡 | Funciones usan emojis en logs; cambiar a logger. |
| Capas desacopladas | ✅ | Clean Architecture ya aplicada. |
| Docker / Compose | ❌ | Crear en `docker/`. Imagen no-root + `/api/v1/health` (requisito de las *probes* de K8s). |
| Manifiestos Kubernetes | ❌ | Crear `k8s/` (base + overlays dev/prod). |
| CI/CD (Actions) | ❌ | Crear workflows. |
