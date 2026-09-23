# Seguimiento del TFG (fases, horas, riesgos, decisiones)

> **Memoria de trabajo** + fuente para el capítulo de metodología de la memoria y el Gantt. Actualízalo al cerrar cada
> sesión relevante. Última actualización: **2026-09-08** (optativa de despliegue: Kubernetes en la nube).

> **Repositorio del TFG:** [`codeurjc-students/2026-daviweb-alvaro`](https://github.com/codeurjc-students/2026-daviweb-alvaro)
> — commit inicial `a2109d5`. Historial previo (206 commits) en el repo público
> [`DaviDevs-org/ProyectoWebPeluqueros`](https://github.com/DaviDevs-org/ProyectoWebPeluqueros), enlazado desde el README
> para preservar la trazabilidad. Copia de seguridad íntegra del `.git` original en
> `~/Escritorio/Programación/Angular/backup-daviweb-git-20260806.bundle` (contiene `dd82d1e` de la rama `multitenant` y
> el stash del revert de SSR, que **no** estaban en ningún remoto).

## Estado de fases
**Calendario comprimido** (2026-08-06): desarrollo cerrado en **diciembre de 2026**. Fases 3-5 reenfocadas a
**paridad funcional sobre el backend propio**, no a crear funcionalidad desde cero.

> **Las fechas objetivo son orientativas** (acordado con la tutoría, 2026-09-01). Lo que se evalúa y lo que alimenta el
> Gantt de la memoria es el **registro real**: cuándo empezó y cuándo se cerró de verdad cada fase, y por qué se
> desvió. Rellenar **`Cierre real` el mismo día** en que la fase se da por terminada — reconstruirlo en enero, de
> memoria, es inventarse el dato. Una fase se considera cerrada cuando sus entregables están **en `main`** (y publicada
> la *release* correspondiente, en las fases 3-5), no cuando "ya casi está".

| Fase | Descripción | Fecha objetivo | Inicio real | Cierre real | Estado |
|---|---|---|---|---|---|
| 1 | Definición de funcionalidades y pantallas | 31 ago 2026 | 15 jul 2026 | **8 sep 2026** | ✅ **Cerrada.** README verificado contra el checklist del enunciado §3.2; wireframes y planteamiento validados por la tutoría; primer post del blog publicado; GitHub Project creado por la tutoría (el alumno no tiene permisos en la organización) |
| 2 | Repositorio, pruebas, CI **y modernización de Angular** | 30 sep 2026 | 8 sep 2026 | — | 🟡 En curso desde el cierre de la Fase 1 |
| 3 | v0.1 — Básica sobre backend propio + Docker | 31 oct 2026 | — | — | ❌ |
| 4 | v0.2 — Intermedia + **despliegue en Kubernetes** | 30 nov 2026 | — | — | ❌ |
| 5 | v1.0 — Avanzada + **despliegue continuo al clúster** | 22 dic 2026 | — | — | ❌ |
| 6 | Memoria | 31 ene 2027 | — | — | ❌ |
| 7 | Defensa | *convocatoria oficial* | — | — | ❌ |

### Desviaciones (planificado vs real)
Una línea por fase cerrada, escrita **al cerrarla**. Es la materia prima del apartado de metodología de la memoria: un
Gantt sin explicación de las desviaciones no dice nada.

| Fase | Objetivo | Real | Desviación | Causa |
|---|---|---|---|---|
| 1 | 31 ago 2026 | 8 sep 2026 | +8 días | El estudio del estado del arte (nueve productos) y la producción de capturas y wireframes se ampliaron sobre lo previsto, y el cierre esperaba además la validación de la tutoría. Sin impacto en la Fase 2, que arranca el mismo día del cierre. |

> Curso 2026/2027. Alumno: **Álvaro Fuente González** · Grado en **Ingeniería del Software** · tutores **Óscar Soto
> Sánchez** y **Natalia Madrueño Sierro**.

## Roadmap inmediato (siguientes pasos)
1. ~~**Formalizar Fase 1** en el README: objetivos, funcionalidades, entidades, mapa de pantallas.~~ ✅ **2026-08-06**.
2. ~~**Confirmar con la tutoría** titulación, tutores y el planteamiento de partir de una aplicación previa.~~ ✅
   **2026-08-06**.
3. ~~**Preparar el repo del TFG**~~ ✅ **2026-08-06** (queda reestructurar a `frontend/` + `backend/`, en Fase 2).
4. ~~**Wireframes y capturas**~~ ✅ **2026-08-11**; ~~validación por la tutoría~~ ✅ **2026-09-01**.
5. ~~**Publicar el primer post del blog**~~ ✅ **2026-09-08**.
6. ~~**GitHub Project (Kanban)**~~ ✅  Lo crea la tutoría; el alumno no tiene permisos en la
   organización. **Pendiente: pegar su URL directa en el README** (hoy apunta al listado de la organización).
7. ~~**Decisión de despliegue (K8s) aprobada por la tutoría**~~ ✅ → **Sigue abierto:** si la URJC
   facilita **créditos cloud**. De la respuesta dependen el proveedor de clúster y el gasto (ver riesgos).
8. **Fase 2** (en curso desde 2026-09-08): monorepo `frontend/` + `backend/` → `ng update` a la última estable →
   NestJS mínimo + 1 entidad end-to-end desde Mongo → OpenAPI → primer test de sistema → CI → Docker mínimo.
9. **Issues por fase** en el Project recién creado (el modo Asesor genera el backlog de la Fase 2).

## Registro de horas (para el Gantt)
| Fecha | Fase | Tarea | Horas |
|---|---|---|---|
| 2026-07-23 | 0 | Setup asistente multi-modo + docs TFG | 3 |
| 2026-08-06 | 1 | Creación del repo del TFG + README de Fase 1 (objetivos, Gantt, entidades, permisos, análisis) | 2 |
| 2026-08-06 | 1 | Reenfoque de fases, calendario comprimido y GitHub Flow como regla del agente | 2 |
| 2026-08-11 | 1 | Capturas y wireframes (Figma) + redacción de bocetos de pantalla en el README | 3 |
| 2026-08-14 | 1 | Estado del arte: estudio de 9 productos del sector, comparativa, carencias e ideas incorporadas | 4 |
| 2026-09-01 | 1 | Registro documental de la optativa de despliegue ya decidida (Kubernetes en la nube) en README y `docs/tfg/` | 1 |
| 2026-09-08 | 1 | Reescritura y publicación del primer post del blog + auditoría del README contra el checklist del enunciado y cierre de la fase | 2 |

## Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| **Calendario comprimido**: 9 meses de desarrollo reducidos a 4,5, sin recortar entregables y **añadiendo** la modernización de Angular | Alto | Priorizar sin piedad por fase; cerrar Fase 1 ya. La **Fase 2 es la más cargada** (monorepo + backend mínimo + CI + Docker + `ng update`) y solo tiene septiembre: si algo descarrila, es ahí. **Confirmar las fechas nuevas con Óscar y Natalia** — las del enunciado son las oficiales. |
| **La defensa depende de convocatorias oficiales de la URJC**, no es una fecha elegible | Medio | Consultar el calendario de convocatorias antes de comprometer la fecha de la Fase 7; el README ya la marca como orientativa. |
| **Soporte técnico limitado del tutor en Node/NestJS/Mongo** (stack alternativo) | Alto | Tests sólidos + docs + este asistente + comunidad. Preparar dudas concretas para tutorías. |
| Concurrencia de reservas (doble booking) | Alto | Transacciones Mongo / índice único `{tenantId,barberId,startAt}`. |
| Alcance grande del SaaS vs tiempo del TFG | Medio | Priorizar por fases (básica→intermedia→avanzada); no reimplementar todo a la vez. |
| SSR complica la imagen Docker única | Medio | Servir SPA compilada desde Nest para el artefacto; decidir en Fase 3. |
| **Kubernetes es la optativa más cara en tiempo** (2 pts) y cae en el mes más corto (Fase 4, nov) junto con el panel de administración y los gráficos | Alto | Preparar el terreno en Fase 3 (imagen no-root, `/api/v1/health`, config 100 % por env) para que Fase 4 sea solo escribir manifiestos. Si aprieta: desplegar a mano en Fase 4 y dejar el **CD automatizado** (1 pt, prescindible) para Fase 5. |
| **Coste del clúster y del dominio**: un K8s gestionado y un dominio propio son gasto real y recurrente | Medio | **Preguntar a Óscar/Natalia si la URJC facilita créditos cloud** (AWS Academy o similar) antes de contratar nada. Alternativas baratas: plano de control gratuito (AKS/GKE) o k3s sobre una VM pequeña. |
| **Certificado wildcard para el multi-tenant por subdominio**: el `Ingress` necesita `*.dominio` y eso obliga a reto DNS-01 con acceso por API al proveedor de DNS | Medio | Elegir proveedor de DNS soportado por cert-manager antes de comprar el dominio; probar la emisión en el entorno `dev` del clúster, no directamente en producción. |
| **Persistencia de Mongo en el clúster**: un `rollout` mal hecho o un PVC mal configurado se lleva los datos por delante | Alto | Decidir pronto `StatefulSet`+PVC vs BD gestionada; en cualquier caso, backup de Mongo antes de cada release y probar el restore una vez. |
| Compartir frontend con Dario (backends distintos) | Medio | **Contrato OpenAPI** como verdad compartida; sincronizar cambios de front. |

## Decisiones (ADR-lite)
| # | Fecha | Decisión | Motivo |
|---|---|---|---|
| 1 | *planteamiento inicial* | Backend **NestJS + MongoDB** | **Acordado con la tutoría al plantear el TFG**, junto con el despliegue en Kubernetes (ADR 14); registrado en el repositorio el 2026-07-23. Alineado con las capas que pide la rúbrica (equivalente a Spring); Swagger/Jest/guards integrados. |
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
| 12 | 2026-08-14 | **No construir marketplace ni pagos online**; el producto se posiciona como canal propio del negocio | Conclusión del estado del arte: un marketplace contradice la tesis del producto (el negocio deja de ser dueño de su cliente) y los pagos añaden pasarela, conciliación y responsabilidad económica que el calendario de dic-2026 no soporta. |
| 13 | 2026-08-14 | **Recordatorio SMS previo a la cita** como mejora candidata de la Fase 5 (hoy solo se notifica confirmación y cancelación) | El estado del arte sitúa la secuencia confirmación + recordatorio en reducciones del 25-40 % de ausencias. Sujeta al coste por SMS: se evaluará antes de comprometerla. |
| 14 | *planteamiento inicial* | **Despliegue en la nube con Kubernetes** (optativa de 2 pts), descartadas VM IaaS (0.5), BD gestionada (1) y PaaS (1). Compose queda como entorno de desarrollo local | **No es una decisión tomada durante el desarrollo: forma parte del alcance pactado con la tutoría al plantear el TFG**, junto con el backend propio (ADR 1) y el resto del stack. Se registra aquí el 2026-09-01 porque hasta entonces no estaba escrita en ningún documento del repositorio. Razones del acuerdo: es la opción de despliegue con más peso en la rúbrica abordable en solitario y encaja con el producto multi-tenant (Ingress con host wildcard, escalado horizontal del mismo binario). El total de optativas queda en **6 pts** sobre el mínimo de 3. |
| 15 | 2026-09-08 | **El clúster debe estar operativo en Fase 4**, aunque el enunciado sitúe K8s en Fase 5 | La release 0.2 tiene que quedar desplegada en un entorno distinto del de desarrollo (enunciado §6.1): si la plataforma elegida es Kubernetes, ese entorno **es** el clúster. En Fase 5 queda solo automatizar el despliegue y endurecerlo. |

## Índice de posts del blog (Medium, EN)
| Fecha | Título | URL | Release |
|---|---|---|---|
| 2026-09-08 | *Phase 1: defining the product and studying the competition* ([fuente](blog/2026-08-phase-1-scope-and-state-of-the-art.md)) | [Medium](https://medium.com/@alvarofuenteg/phase-1-defining-the-product-and-studying-the-competition-641178c6dedd) | Fase 1 |
| — | (pendiente: post de la Fase 2) | — | — |
