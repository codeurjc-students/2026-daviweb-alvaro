# Arquitectura objetivo y plan de migración (Firebase → NestJS + MongoDB)

> Cómo pasamos del SaaS actual (Angular + Firebase) al objetivo del TFG (SPA + **API REST propia** + Docker), tocando
> lo mínimo. Léelo bajo demanda. Reglas técnicas concretas en [`estandares-tecnicos.md`](estandares-tecnicos.md).

## 1. Arquitectura de despliegue objetivo
```
[ Navegador ]
   │  HTTPS
   ▼
[ Angular SPA (frontend/) ]  ──REST /api/v1──►  [ NestJS (backend/) ]  ──►  [ MongoDB ]
                                                     │
                                                     ├─ Auth JWT (guards)
                                                     ├─ Imágenes: GridFS / MinIO (SDK S3)
                                                     └─ SMS: adapter Mocean (evento al crear cita)
```
- **Monolito con API REST** + **SPA que la consume** + **Docker/Compose**. Imagen **única**: Nest sirve el build de
  Angular como estático (la rúbrica lo pide así). Ver §7 sobre SSR.
- **Contract-first:** la **spec OpenAPI** (`docs/api/api-docs.yaml`) es la **verdad compartida**. Como tú y tu compañero
  compartís frontend pero tenéis backends distintos, quien manda es **el contrato**, no la implementación. El front
  habla contra ese contrato; cada backend lo implementa en su tecnología.

## 2. La clave de la migración: solo cambia `infrastructure/` (y auth)
La app ya es **Clean Architecture**. `domain/` y `application/` (casos de uso, Strategy de reservas, interfaces de
repositorio) **no se tocan**. La migración es:
- **Sustituir** `src/app/infrastructure/firebase/*` por `src/app/infrastructure/http/*`: repositorios que implementan
  **los mismos interfaces** (`AppointmentRepository`, `ServiceRepository`, …) pero usando `HttpClient` contra la API REST.
- **Cambiar el binding** en `src/app/app.config.ts`: `provide: XRepository, useClass: HttpXRepository`.
- **Auth:** `presentation/shared/authentication.service.ts` pasa de Firebase Auth (Custom Claims) a **JWT** contra
  `/api/v1/auth/*`. El guard de `/admin` valida el token.
- **TenantService:** sigue resolviendo el tenant por subdominio, pero carga la config desde la API
  (`/api/v1/tenants/{id}/config`) en vez de Firestore.

> **Este hecho es oro para la memoria:** "gracias a la Clean Architecture, cambiar de backend (Firebase→NestJS/Mongo)
> se reduce a reimplementar la capa de infraestructura, sin tocar dominio ni casos de uso".

## 3. Mapeo Firebase → NestJS/MongoDB
| Firebase (actual) | Objetivo NestJS/Mongo | Notas |
|---|---|---|
| Firestore `hairdressers/{tenantId}/appointments/...` | Colección `appointments` con campo **`tenantId`** + índices compuestos | Multi-tenant por campo, no por BD. Índice `{tenantId, startAt}`. |
| Auth + Custom Claims (`role`, `tenantId`) | **JWT** con payload `{sub, role, tenantId}` + **guards** `JwtAuthGuard`/`RolesGuard`/`TenantGuard` | Contraseña admin en config/env cifrada (lo pide la rúbrica). |
| Storage (galería, fotos) | **GridFS** (imágenes en Mongo, simple para entornos restringidos) o **MinIO** (SDK S3, para cloud) | La rúbrica sugiere imágenes en BD; MinIO permite migrar a S3 sin cambiar código. |
| Cloud Function trigger `onCreate(appointment)` → SMS | Servicio Nest: al crear cita, emite evento (`EventEmitter`/cola) → `SmsService` (reusa **MoceanAdapter**) | Mantener el patrón Adapter; SMS sigue siendo intercambiable. |
| Hosting / SSR | **Docker**: Nest sirve `frontend/dist` estático | Puerto 443 HTTPS. |
| Security Rules (aislamiento) | `TenantGuard` + filtros por `tenantId` en cada query | Nunca una query sin `tenantId`. |

## 4. Modelo de datos (colecciones Mongo, todas con `tenantId`)
- `tenants` (config: branding, theme, features flags, sms sender).
- `users` (owner/admin; y "registrado" si se modela). Campos mínimos: email, passwordHash, role, tenantId.
- `appointments` (startAt, endAt, serviceId, barberId, barberName, customerName, customerPhone E.164, status, createdAt).
- `services` (name, durationMin, price).
- `barbers` (name, isAvailable, schedule?).
- `schedules` / `exceptions` / `reservedSlots` (reservedSlot: `barberId` null=bloqueo global | uuid=barbero concreto).
- `galleryPhotos` (ref GridFS/MinIO + metadatos).
- `blockedPhones` (blacklist anti-abuso).
- `analyticsDaily` (agregados por día: totales, canceladas, `slotsByHour`) → alimenta los **gráficos**.
- `adminAudit` (eventos de exportación/borrado; sin PII en logs).

## 5. Endpoints REST (borrador, contract-first) — todos bajo `/api/v1`
- `auth`: `POST /auth/login`, `POST /auth/refresh`, `GET /auth/me`.
- `tenants`: `GET /tenants/{id}/config`.
- `appointments`: `GET` (filtros `from`,`to`,`barberId`; paginado), `POST` (devuelve `Location`), `GET/{id}`,
  `PUT/{id}`, `DELETE/{id}`, `DELETE /appointments/cancel/{token}` (público, cancelación por SMS).
- `services`, `barbers`, `schedules`, `exceptions`, `reserved-slots`, `gallery`, `blocked-phones`,
  `availability` (`GET /availability?date=&serviceId=&barberId=` → el **algoritmo avanzado**),
  `analytics` (`GET /analytics/daily?from=&to=`).
- Recursos en **inglés y plural**; verbos y códigos HTTP correctos; **paginación** en todos los listados.

## 6. Qué preservar (no perder features del SaaS)
Strategy Pattern (Global vs Multi-Barbero), multi-tenant + theming, feature flags (`enableSms`, `enableGallery`,
`enableReviews`, `maintenanceMode`), blacklist de teléfonos, normalización E.164, cancelación por token. Mapear estas
features a **básica / intermedia / avanzada** en [`seguimiento.md`](seguimiento.md).

## 7. Decisiones técnicas a cerrar pronto
- **SSR vs imagen única:** la rúbrica quiere **una imagen** (Angular estático servido por Nest). El SSR actual complica
  el contenedor. **Recomendación:** para el artefacto Docker del TFG, servir la SPA compilada (sin SSR) desde Nest; si
  quieres conservar SSR, justificarlo. Decidir en Fase 3.
- **Concurrencia de reservas:** dos clientes reservando el mismo hueco a la vez. En Mongo → **transacciones** (requiere
  replica set) o índice único sobre `{tenantId, barberId, startAt}`. Es un **riesgo real** y **gran material de memoria**.
- **Tiempo real:** las suscripciones live de Firestore (RxJS) se sustituyen por request/response + polling o
  **WebSocket** puntual (p. ej. refresco del calendario admin). No es obligatorio; decidir por coste/beneficio.
- **Datos de ejemplo:** seed de Mongo con datos representativos (peluquería demo) al arrancar (lo pide la rúbrica).

## 8. Orden sugerido de migración (encaja con las fases)
1. **Fase 2:** `backend/` NestJS mínimo + `frontend/` (mover Angular) + 1 entidad end-to-end (p. ej. `services`) leída
   desde Mongo por la SPA + OpenAPI + tests de sistema + CI. Modernizar Angular (`ng update`).
2. **Fase 3 (0.1):** auth JWT, `appointments` + `availability` (algoritmo), imágenes, paginación, Docker/Compose, CD.
3. **Fase 4 (0.2):** admin CRUD completo, analítica/gráficos, despliegue cloud.
4. **Fase 5 (1.0):** SMS, blacklist, features avanzadas, pulido.
