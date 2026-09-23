# Estándares técnicos (buenas prácticas + reglas evaluables)

> Referencia del **modo Ingeniero**. Antes de implementar, consúltalo (la sección que toque). Las reglas marcadas
> **[EVAL]** puntúan en la rúbrica de calidad de código: incumplirlas baja nota.

## 0. Reglas transversales [EVAL]
- **Idioma:** todo el **código y los comentarios en inglés**. Español **solo** en textos que ve el usuario (UI).
  Español en el código = penalización.
- **Nombres descriptivos:** `getAppointmentsByDateRange`, no `getData`. Nada de `any` en TS.
- **Sin duplicación:** si dos fragmentos se parecen, refactoriza (herencia/composición/subprogramación).
- **Métodos cortos**, baja complejidad ciclomática.
- **Eficiencia:** nada de "traer todo y filtrar en memoria". Filtra/pagina en la BD.
- **Logging con librería** (Nest `Logger`/pino). Nunca `console.log`/`System.out`.
- **Desacoplo por capas:** `controller → service → repository`. Un controller **nunca** toca el repositorio directo;
  la lógica de negocio vive en el `service`.

## 1. NestJS (backend/)
- **Estructura por módulo de dominio:** `appointments/`, `services/`, `barbers/`, `auth/`, `tenants/`… Cada módulo:
  `*.controller.ts` (fino), `*.service.ts` (negocio), `*.repository.ts` o modelo Mongoose, `dto/`, `entities/`.
- **DTOs + validación:** `class-validator` + `class-transformer`; `ValidationPipe` global (`whitelist: true`).
- **Auth/seguridad:** `@nestjs/passport` + JWT. Guards: `JwtAuthGuard` (autenticado), `RolesGuard` (rol), `TenantGuard`
  (aísla por `tenantId` del token). Contraseñas con `bcrypt`/`argon2`.
- **Config:** `@nestjs/config` + `.env` validado (Joi/zod). Nada de secretos en el código.
- **Errores:** excepciones HTTP de Nest + `ExceptionFilter` global para respuesta uniforme.
- **OpenAPI:** `@nestjs/swagger` → genera `docs/api/api-docs.yaml` + HTML. Decoradores `@ApiTags`, `@ApiResponse`.
- **Prefijo global** `api/v1` (`app.setGlobalPrefix('api/v1')`).
- **Logging:** `Logger` de Nest (o pino con `nestjs-pino`).

### API REST — reglas del doc [EVAL]
- URLs bajo **`/api/v1`**; recursos en **inglés y plural** (`/appointments`, `/services`).
- **Verbos:** GET (leer), POST (crear), PUT (modificar), DELETE (borrar). **Códigos** HTTP correctos.
- **Crear** devuelve `201` + header **`Location`** con la URL del recurso creado.
- **Filtros/búsqueda** como **query params** (`?from=&to=&barberId=`).
- **Paginación** en todos los listados (10 por defecto + "más").

## 2. MongoDB / Mongoose
- **Un esquema por entidad**; `tenantId` en todas las colecciones multi-tenant.
- **Índices:** compuestos por `tenantId` + campo de consulta (p. ej. `{tenantId:1, startAt:1}`). Índice **único**
  donde aplique (evitar doble reserva: `{tenantId, barberId, startAt}`).
- **`lean()`** para lecturas de solo lectura; proyecciones para no traer campos de más.
- **Transacciones** (replica set) para operaciones críticas: creación de cita con comprobación de solape.
- **Nada de N+1**; usa `$lookup`/populate con cabeza o rediseña.

## 3. Angular (frontend/)
- **Standalone + Signals** (`input()`, `output()`, `computed()`, `effect()`); control flow `@if/@for/@switch`.
- **Separación:** componentes (UI) vs **services** (conexión backend). Mantener **Clean Architecture**: la UI usa casos
  de uso de `application/`; la infraestructura (`infrastructure/http/`) implementa los repositorios con `HttpClient`.
- **UI con librería de componentes** (ng-bootstrap o Angular Material) — lo recomienda la rúbrica.
- **Páginas de error** con el estilo de la app (404 y error de servidor).
- **Paginación** 10 + botón/enlace "más resultados".
- Sustituir suscripciones live de Firestore por HTTP (request/response, polling, o WebSocket puntual).

## 4. Pruebas (optativa elegida: unit + integración, 2 pts)
- **Unitarias (Jest):** lógica de negocio de los `service` con **doble de BD** (mock del repositorio). Front: componente
  con doble de servicios + DOM virtual.
- **Integración (Supertest / `mongodb-memory-server`):** servicios contra **BD real** (efímera). Front: servicios
  contra **API REST real**.
- **Sistema / E2E (obligatoria):** Playwright o Cypress. Mínimo: los datos de ejemplo de la entidad principal se
  muestran en la página; probar la API REST end-to-end.
- **Cobertura medida** y publicada en CI. **Trazabilidad `RF-xx ↔ test`** (numera requisitos y enlaza cada prueba).

## 5. CI/CD (GitHub Actions)
- **Control básico** (push a rama `feature/*`): compila/build + tests unitarios.
- **Control completo** (PR → `main`): todos los tests (unit + integración + sistema); **si fallan, bloquea el merge**.
- Rama de arranque **`add-ci-workflow`**; probar con `workflow_dispatch`/`push` y luego fijar triggers.
- **CD:** `main` → imagen Docker tag `dev` + compose OCI `dev`; **release** → tag `<versión>` + `latest`;
  `workflow_dispatch` → build desde cualquier rama/commit (tag `<rama>-<fecha>-<commit>`).
- **CD a Kubernetes** (optativa elegida): tras publicar la imagen, un job aplica el despliegue en el clúster
  (`kubectl apply -k k8s/overlays/prod` o `helm upgrade --install --atomic --wait`) usando el `kubeconfig` guardado
  como **secret de GitHub**. Se despliega por **tag inmutable** (`0.2.0`, `sha-<commit>`), **nunca `latest`** en
  producción. Usar **environment `production`** de GitHub para dejar traza del despliegue.
- **Sincronía de versión:** `package.json` (front y back) ↔ tag de `docker-compose.yml` ↔ **tag git** ↔ `image:` del
  manifiesto de K8s. Evitar duplicar lógica entre jobs. Publicar en **DockerHub** (cuenta del alumno).

## 6. Docker
- `Dockerfile` (multi-stage: build Angular + build Nest → imagen final que sirve ambos) en carpeta **`docker/`**.
- `docker-compose.yml` (prod, imagen tag `0.1`) y `docker-compose-dev.yml` (dev, tag `dev`), también en `docker/`.
- Contenedor **MongoDB** + espera por **`healthcheck`**; toda la config por **variables de entorno**.
- Publicar `docker-compose.yml` como **artefacto OCI** en DockerHub.
- La imagen debe ser **apta para Kubernetes**: usuario **no root**, apagado limpio ante `SIGTERM`, y endpoint de salud
  (`GET /api/v1/health`) del que se cuelgan las *probes*. Cero configuración horneada en la imagen: todo por env.

## 7. Kubernetes (despliegue en la nube) [optativa, 2 pts]
> Es la parte optativa de despliegue elegida. Compose sigue existiendo para desarrollo local; **K8s es el entorno de
> producción** del TFG. Documentar arquitectura de despliegue y proceso en `docs/` (lo exige la rúbrica).

- **Manifiestos versionados** en `k8s/`, organizados con **Kustomize** (`base/` + `overlays/dev|prod`) o un **chart de
  Helm**. Regla: el estado del clúster se puede reconstruir entero desde el repositorio; nada de `kubectl edit` a mano.
- **Objetos mínimos:** `Deployment` de la app (≥2 réplicas), `Service` (ClusterIP), `Ingress` (NGINX Ingress
  Controller), `ConfigMap` (config no sensible), `Secret` (JWT, credenciales Mongo, API key de Mocean), y para la base
  de datos **`StatefulSet` + `PersistentVolumeClaim`** o, si se opta por BD gestionada, solo el `Secret` con la URI.
- **Salud y resiliencia:** `readinessProbe` y `livenessProbe` contra `/api/v1/health`, `resources.requests/limits`
  fijados, `RollingUpdate` con `maxUnavailable: 0`. Opcional si sobra tiempo: `HorizontalPodAutoscaler`.
- **HTTPS:** `cert-manager` + Let's Encrypt emitiendo el certificado del `Ingress`. Como la app es **multi-tenant por
  subdominio**, hace falta **host wildcard** (`*.dominio`) y, por tanto, certificado wildcard con reto **DNS-01**
  (HTTP-01 no emite wildcards). Es la decisión de despliegue con más riesgo: cerrarla pronto.
- **Secretos:** nunca en el repositorio. En el clúster, `Secret` creado fuera del versionado (o `SealedSecrets` si se
  quiere versionarlo cifrado); en CI, secrets de GitHub.
- **Persistencia:** las imágenes de galería en **GridFS** viajan con el volumen de Mongo (una sola cosa que respaldar);
  si se usa MinIO/S3, es otro `StatefulSet` u otro servicio gestionado. Decidir antes de escribir los manifiestos.
- **Namespace propio** por entorno (`daviweb-dev`, `daviweb-prod`); nada en `default`.
- **Comprobación de despliegue:** tras cada `rollout`, `kubectl rollout status` en el job de CD y una prueba de humo
  (smoke test) contra la URL pública. Si falla, el job falla.

## 8. Seguridad
- **JWT** con expiración + refresh; **HTTPS** (443 en el artefacto).
- **Ownership:** un usuario solo edita/borra lo suyo (comprobación en el `service`, no solo en la UI).
- **Validación** de toda entrada; `helmet`; **rate limiting** (`@nestjs/throttler`).
- **GDPR:** **sin PII en logs** (nombre/teléfono). Exportaciones sin PII cuando se pueda (ver épica Export Center).
- **En el clúster:** TLS terminado en el `Ingress` (cert-manager), contenedores sin privilegios y **BD nunca expuesta**
  fuera del clúster (`ClusterIP`, jamás `NodePort`/`LoadBalancer` para Mongo).

## 9. Definition of Done (por cambio)
1. Cumple las reglas **[EVAL]**. 2. Tiene pruebas (unit y/o integración) y pasan en CI. 3. Documentado si toca
(OpenAPI/README). 4. Mapeado al requisito de rúbrica que satisface. 5. Actualizados
[`estado-vs-rubrica.md`](estado-vs-rubrica.md) y [`seguimiento.md`](seguimiento.md).
