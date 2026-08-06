# Software Requirements Specification
## For Davidevs Hairdressers

Version 0.2  
Prepared by alvaroSource 
Davidevs.org  
25/01/2026

## Table of Contents
<!-- TOC -->
* [1. Introduction](#1-introduction)
    * [1.1 Document Purpose](#11-document-purpose)
    * [1.2 Product Scope](#12-product-scope)
    * [1.3 Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    * [1.4 References](#14-references)
    * [1.5 Document Overview](#15-document-overview)
* [2. Product Overview](#2-product-overview)
    * [2.1 Product Perspective](#21-product-perspective)
    * [2.2 Product Functions](#22-product-functions)
    * [2.3 Product Constraints](#23-product-constraints)
    * [2.4 User Characteristics](#24-user-characteristics)
    * [2.5 Assumptions and Dependencies](#25-assumptions-and-dependencies)
    * [2.6 Apportioning of Requirements](#26-apportioning-of-requirements)
* [3. Requirements](#3-requirements)
    * [3.1 External Interfaces](#31-external-interfaces)
    * [3.2 Functional](#32-functional)
    * [3.3 Quality of Service](#33-quality-of-service)
    * [3.4 Compliance](#34-compliance)
    * [3.5 Design and Implementation](#35-design-and-implementation)
    * [3.6 AI/ML](#36-aiml)
* [4. Verification](#4-verification)
* [5. Appendixes](#5-appendixes)
<!-- TOC -->

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|--------------------|---------|
|      |      |                    |         |
|      |      |                    |         |

## 1. Introduction
<!-- overview of the SRS: purpose, scope, audience, and organization of the document; avoid detailed requirements -->
    En este documento se recoge una idea general del proyecto desarrollado por el equipo "Davidevs", tanto en forma de requerimientos software como describiendo el alcance y propósito de dicho proyecto. Para recoger esta información se usa una plantilla que mezcla los estándares IEEE 830 e ISO 29148.

### 1.1 Document Purpose
<!-- why this SRS exists, its intended audiences, and how they'll use it; keep to 2–4 sentences and avoid implementation detail -->
El motivo de la existencia de este documento es el de tener una forma clara y organizada de recoger los pensamientos, ideas de negocio, alcance del proyecto, y requisitos necesarios para llevar a cabo el trabajo. La idea es que este documento sea privado, ya que está más enfocado a una organización del equipo más que a algo útil para el cliente.  
Para complementar este documento se tiene la arquitectura final en base a los requisitos <sup>[1-A](#51-arquitectura)</sup>

### 1.2 Product Scope
<!-- the product (name/version), its primary purpose, key capabilities, and boundaries. keep brief and focus on the "what" and "why", not the "how" -->
Davidevs Hairdresser 3.3.2  
El proyecto tiene como objetivo dar visibilidad en internet y digitalizar los procesos de reserva y gestión básica de negocio para locales destinados a peluquerías y barberías.

El producto se concibe como un **SaaS multi-tenant (white-label)**<sup>[9D](#9D) [4D](#4D) [14D](#14D)</sup> : un único producto da servicio a múltiples negocios (tenants)<sup>[12D](#12D)</sup>, donde cada tenant dispone de:
- Identidad (`tenantId`) y aislamiento de datos.
- Configuración propia de marca (tema/colores), contenidos y funcionalidades activas.

**Capacidades principales (cliente final / web pública)**
- Mostrar información del negocio (contacto, localización, horarios, RRSS<sup>[8D](#8D)</sup>).
- Mostrar catálogo de servicios (precio si aplica) y equipo (barberos/peluqueros si aplica).
- Calendario de disponibilidad y **reserva online** de citas.
- Cancelación de cita por parte del cliente (si está habilitado en el tenant y/o en el flujo).
- Secciones de contenido: galería y reseñas/opiniones (según configuración del tenant).

**Capacidades principales (owner / panel de administración con login)**
- Gestión (CRUD) <sup>[2D](#2D)</sup> de:
    - Servicios.
    - Citas.
    - Galería.
    - Barberos/peluqueros (si el negocio opera con múltiples trabajadores).
- Configuración de disponibilidad:
    - Horario semanal por tramos.
    - Excepciones (festivos, días especiales) y bloqueos.
    - (Si aplica) horarios por barbero.
- Gestión de información pública del negocio (datos de contacto, redes, etc.).
- Moderación/prevención de abuso: **bloqueo de números de teléfono**.
- Notificaciones por SMS <sup>[10D](#10D)</sup> relacionadas con citas (por ejemplo, cancelación/recordatorios) cuando el tenant lo tenga habilitado.

**Límites y exclusiones (fuera de alcance actual)**
- Procesamiento de pagos online y facturación automatizada.
- Gestión de inventario/stock.
- Nóminas/gestión avanzada de RRHH <sup>[7D](#7D)</sup>.
- POS <sup>[6D](#6D)</sup>/caja registradora.
- Marketing automatizado avanzado (email campaigns, etc.).

**Dirección y evolución (roadmap)**
Sin entrar aún en el detalle de implementación, se contempla la incorporación de:
- **Export Center** para el owner (MVP <sup>[5D](#5D)</sup>: exportación de citas a CSV <sup>[1D](#1D)</sup>).
- **Backups operacionales** de base de datos (plataforma) con retención y runbook de restauración.
- **Analíticas**:
    - de negocio para el owner (KPIs<sup>[3D](#3D)</sup> de citas, ocupación por franjas, cancelaciones, etc.).
    - de tráfico/producto para los admins internos del SaaS.
- **Sistema de planes (membresías)**: funcionalidades y/o límites disponibles en función del plan contratado por el tenant.


### 1.3 Definitions, Acronyms, and Abbreviations
<!-- glossary of domain terms, acronyms, and abbreviations; keep entries alphabetized -->

| ID | Term | Definition |
|----|------|------------|
| <a id="1D"></a>1D | CSV | Acrónimo para "Comma-Separated Values". <br> Formato de fichero tabular basado en texto. |
| <a id="2D"></a>2D | CRUD | Acrónimo para "Create, Read, Update, Delete". <br> Operaciones básicas sobre datos (crear, leer, actualizar, borrar). |
| <a id="3D"></a>3D | KPI | Acrónimo para "Key Performance Indicator". <br> Métrica usada para medir rendimiento/objetivos (por ejemplo, ocupación, cancelaciones). |
| <a id="4D"></a>4D | multi-tenant | Arquitectura en la que una única aplicación sirve a múltiples negocios (tenants) con aislamiento de datos y configuración. |
| <a id="5D"></a>5D | MVP | Acrónimo para "Minimum Viable Product". <br> Versión mínima para validar valor con usuarios. |
| <a id="6D"></a>6D | POS | Acrónimo para "Point of Sale". <br> Sistema de caja/venta en punto de venta. |
| <a id="7D"></a>7D | RRHH | Acrónimo para "Recursos Humanos". |
| <a id="8D"></a>8D | RRSS | Acrónimo para "Redes Sociales". |
| <a id="9D"></a>9D | SaaS | Acrónimo para "Software as a Service". <br> Software ofrecido como servicio (normalmente vía web) bajo suscripción. |
| <a id="10D"></a>10D | SMS | Acrónimo para "Short Message Service". <br> Mensajes de texto enviados a números de teléfono. |
| <a id="11D"></a>11D | SRS | Acrónimo para "Software Requirements Specification". <br> Documento de requisitos software. |
| <a id="12D"></a>12D | tenant | Negocio/cliente que usa el SaaS; posee identidad propia (tenantId) y datos aislados. |
| <a id="13D"></a>13D | tenantId | Identificador único del tenant usado para aislar y segmentar datos/configuración. |
| <a id="14D"></a>14D | white-label | Producto configurable por tenant para adaptarse a su marca (tema/colores, contenidos, etc.). |

### 1.4 References
<!-- normative and informative external sources; include title, owner, version, date, location/URL, and whether it is normative or informative -->

| Ref | Title | Owner/Publisher | Version/Date | Location | Type |
|-----|-------|------------------|--------------|----------|------|
| 1-R1 | IEEE 830 (Software Requirements Specification) | IEEE | Superseded (referencia histórica) | https://standards.ieee.org/ | Informative |
| 1-R2 | ISO/IEC/IEEE 29148 (Systems and software engineering — Life cycle processes — Requirements engineering) | ISO/IEC/IEEE | Latest (consultar versión vigente) | https://www.iso.org/standard/ | Normative (plantilla/criterios) |
| 1-R3 | Angular Documentation | Angular Team | Continuo | https://angular.dev/ | Informative |
| 1-R4 | Firebase Documentation (Auth/Firestore/Hosting/Functions) | Google | Continuo | https://firebase.google.com/docs | Informative |
| 1-R5 | Google Cloud Firestore (Admin import/export) | Google Cloud | Continuo | https://cloud.google.com/firestore/docs | Informative |
| 1-R6 | Google Analytics 4 Documentation | Google | Continuo | https://developers.google.com/analytics | Informative |
| 1-R7 | Stripe Billing Documentation (suscripciones) | Stripe | Continuo | https://docs.stripe.com/billing | Informative |
| 1-R8 | Multi-appointments | Proyecto (docs internos) | 2026 | docs/Multi-appointments.md | Informative |
| 1-R9 | Informe rama SMS sender | Proyecto (docs internos) | 2026 | docs/informe-rama-sms-sender.md | Informative |
| 1-R10 | Épicas (Export/Backups/Analíticas) | Proyecto (docs internos) | 2026 | docs/epicas-export-backups-analytics.md | Informative |
| 1-R11 | Visión producto y requisitos funcionales (sin código) | Proyecto (docs internos) | 2026 | docs/vision-producto-y-requisitos-funcionales.md | Informative |

### 1.5 Document Overview
<!-- document structure and conventions -->
En el primer apartado ([Introducción](#1-introduction)), se recoge un contexto general del producto y documento para introducir al lector; en [Descripción del producto](#2-product-overview) se expresa la historia, los objetivos y el contexto detrás del producto, que define los requisitos de este; en [Requisitos](#3-requirements) se reflejan de manera detallada todos los requisitos del producto, ordenados por categorías; la siguiente sección ([Verificación de requisitos](#4-verification)) sirve de guía para comprobar la completitud de los requisitos; por último, en [Apéndices](#5-appendixes) se recogen todas las fuentes de información, y referencias a otros archivos, imágenes, etc.

**Normas del documento:**  
1. La primera vez que aparezca una palabra cuyo significado no se entienda sin contexto o conocimiento previo, vendrá acompañada de un superíndice, con formato "ND" (siendo N un número natural), que dirige al apartado de [definiciones, acrónimos y abreviaciones](#13-definitions-acronyms-and-abbreviations).
2. Si a lo largo del documento se hace referencia a una fuente de información, imágen o archivo, se adjuntará también un superíndice, con formato "NA" (siendo N un número natural), que dirige al apartado de [Apéndices](#5-appendixes).
3. El documento además, se rige por las normas e información que se encuentran en [Referencias](#14-references), y en este mismo apartado, se encuentran normas generales y documentación de las partes más importantes del producto (para información específica se adjunta siguiendo el punto 2). 

## 2. Product Overview
<!-- background and context that shape the product's requirements -->


### 2.1 Product Perspective
<!-- context of the system: a new product, a replacement, or part of a family; note relationships to other systems -->
Este producto es una plataforma web orientada a la digitalización de peluquerías y barberías. Surge como una nueva idea (gracias a necesidades de una persona conocida por el equipo), en un principio totalmente independiente, aunque en un futuro formará parte de una familia más grande de productos que englobe unas características básicas comunes.  
A nivel funcional, combina:
- una web pública de cara a cliente final (descubrimiento del negocio y reserva online), y
- un panel privado de administración (operación diaria del negocio).

El sistema se integra con servicios externos para cubrir necesidades habituales en este dominio:
- persistencia de datos (citas, servicios, horarios, barberos/peluqueros, bloqueos, etc.),
- autenticación para el acceso al panel de administración,
- envío de notificaciones por SMS (cuando está habilitado).

**Pertenencia del producto**  
Dada su naturaleza SaaS, aunque los clientes compartan el código, cada uno es dueño de sus datos e imagen corporativa, aunque los desarrolladores se reservan el derecho del código.

**Diagrama de contexto (alto nivel)**
Para complementar la perspectiva se tiene un [diagrama de casos de uso](#52-diagrama-casos-de-uso), y un [diagrama de paquetes](#53-diagrama-de-paquetes). 

### 2.2 Product Functions
<!-- major functional areas or features the product provides in 5–10 concise bullets -->
Las principales funciones del producto se agrupan en:
- **Presentación del negocio (web pública):** mostrar datos del negocio, horarios, servicios y equipo; acceso a contacto y localización; contenido opcional (galería y reseñas).
- **Reserva online de citas:** visualizar disponibilidad y permitir reservar una cita en un hueco válido, evitando solapamientos y respetando horarios y excepciones.
- **Cancelación de cita (cliente):** permitir cancelar una cita por parte del cliente bajo las reglas definidas por el negocio (según configuración/flujo).
- **Gestión de citas (admin):** operaciones CRUD sobre citas, consulta por fecha y actualización de estado.
- **Gestión de servicios (admin):** operaciones CRUD de servicios del negocio.
- **Gestión de agenda (admin):** configuración de horario semanal por tramos, excepciones (festivos/días especiales) y bloqueos.
- **Gestión de barberos/peluqueros (admin, opcional):** operaciones CRUD y configuración asociada cuando el negocio opera con múltiples trabajadores.
- **Feature flags por tenant:** activar/desactivar módulos del producto según configuración (por ejemplo, reserva online, galería, SMS, modo mantenimiento).
- **Protecciones anti-abuso:** bloqueo de números de teléfono para evitar reservas maliciosas o repetitivas.

### 2.3 Product Constraints
<!-- design and implementation constraints that affect the solution -->
Las siguientes restricciones condicionan el diseño y la implementación del producto:
1. El sistema **debe** operar como SaaS multi-tenant, garantizando aislamiento de datos y configuración por tenant.
2. La apariencia y contenidos del producto **deben** poder adaptarse por tenant (white-label) sin necesidad de crear un despliegue con distinto código por cliente.
3. El sistema **debe** ser usable en navegadores modernos (mobile-first) y mantener una experiencia clara para el flujo de reserva.
4. El panel de administración **debe** requerir autenticación y **debe** impedir acceso no autorizado a acciones de gestión.
5. Las funcionalidades opcionales por tenant (feature flags) **deben** poder activarse/desactivarse sin romper el resto del producto.
6. El envío de SMS está condicionado por disponibilidad del proveedor externo y por la activación/configuración del tenant.
7. El diseño funcional **debe** contemplar evolución a planes (membresías), donde ciertas capacidades estarán condicionadas por el plan contratado (sin definir aún el detalle de catálogo en esta versión del SRS).

### 2.4 User Characteristics
<!-- classes, roles, expertise, access levels, frequency of use, and accessibility or localization needs -->
Se contemplan los siguientes tipos de usuario:

1) **Cliente final (reservas)**
- Perfil: público general, uso ocasional, desde móvil.
- Objetivo: reservar una cita lo más rápido posible.
- Acceso: web pública; no requiere conocimientos técnicos.

2) **Owner (dueño del negocio)**
- Perfil: usuario no técnico, uso frecuente (diario/semanal).
- Objetivo: gestionar citas, disponibilidad y contenidos del negocio.
- Acceso: panel de administración con login.

### 2.5 Assumptions and Dependencies
<!-- assumptions about environment, third-party services, usage patterns, and other external factors; note potential impact/risk. -->
**Suposiciones (assumptions)**
- El negocio dispone de conexión a internet estable para operar el panel admin.
- El cliente final dispone de un navegador moderno para completar la reserva.
- Los datos clave del negocio (servicios, horarios, etc.) se mantienen actualizados por el owner.
- El volumen de reservas por tenant es moderado en fases iniciales; si crece significativamente, algunas capacidades deberán evolucionar (por ejemplo, exportaciones o analíticas).

**Dependencias (dependencies)**
- Servicio de persistencia de datos: si no está disponible, la reserva y el panel admin quedan degradados o inoperativos.
- Servicio de autenticación: si falla, el owner no puede acceder al panel admin.
- Proveedor de SMS: si falla, el sistema debe degradar la notificación sin impedir la gestión de citas (cuando sea posible).
- Hosting/CDN: afecta directamente a disponibilidad y rendimiento de la web pública.

**Impacto si se incumplen**
- Caídas del proveedor de datos/auth/SMS implican degradación de funcionalidades; deben contemplarse mensajes de error y comportamientos seguros.

### 2.6 Apportioning of Requirements
<!-- map major requirements to subsystems, services, or releases/iterations -->
El reparto de requisitos se plantea por incrementos (iteraciones) para permitir entrega de valor continua. A nivel de alto nivel:

| Incremento | Alcance principal | Estado |
|-----------|-------------------|--------|
| I0 (Base) | Web pública + reserva online + panel admin (CRUD<sup>[2D](#2D)</sup> de citas/servicios/galería) + horarios/excepciones + barberos/peluqueros (opcional) + bloqueo teléfonos + SMS<sup>[10D](#10D)</sup> (si habilitado) | Implementado / en curso |
| I1 | Export Center (owner): exportación de citas a CSV<sup>[1D](#1D)</sup> (MVP<sup>[5D](#5D)</sup>) | Planificado |
| I2 | Backups operacionales (plataforma): copias automáticas y runbook de restauración | Planificado |
| I3 | Analíticas de negocio (owner): KPIs<sup>[3D](#3D)</sup> por día/franja y dashboards básicos | Planificado |
| I4 | Sistema de planes (membresías): habilitación/limitación por tenant según plan (sin detalle en este SRS) | Planificado |
| I5 | Roles adicionales (staff): permisos y visibilidad de secciones en `/admin` | Planificado |

## 3. Requirements
<!-- identifiable, verifiable, testable requirements; avoid implementation details -->

### 3.1 External Interfaces
<!-- inputs/outputs (formats, protocols, timing, etc); reference interface schemas where available. -->

#### 3.1.1 User Interfaces
<!-- user interactions (UI elements, dialogs, flows); reference design/style guides -->

#### 3.1.2 Hardware Interfaces
<!-- interactions with physical devices (types, signals, etc) -->

#### 3.1.3 Software Interfaces
<!-- integrations with other systems (APIs, contracts, owner, etc) -->

### 3.2 Functions
<!-- externally observable behaviors organized by feature/use case -->

### 3.3 Quality of Service
<!-- measurable non-functional attributes section -->

#### 3.3.1 Performance
<!-- time (latency, throughput, etc.) and space (memory, storage, bandwidth, etc.) -->

#### 3.3.2 Security
<!-- protection of data, identities, and operations (transit/rest, auth, encryption, etc); safety, confidentiality, privacy, integrity, and availability -->

#### 3.3.3 Reliability
<!-- ability to consistently perform as specified (MTBF, redundancy/failover, caches, etc) -->

#### 3.3.4 Availability
<!-- readiness to deliver service (target SLAs, maintenance windows, recovery/restore, etc) -->

#### 3.3.5 Observability
<!--  logs, metrics, traces, alerting and dashboards -->

### 3.4 Compliance
<!-- laws, standards, contracts, or policies; cite the authority and verifiable criteria. -->

### 3.5 Design and Implementation
<!-- constraints and mandates on design, deployment, and maintenance section -->

#### 3.5.1 Installation
<!-- ensure software runs smoothly in its target environments (supported platforms, prerequisites, configuration, etc) -->

#### 3.5.2 Build and Delivery
<!-- controls for building and delivering (dependency management, automation, integrity/traceability, etc) -->

#### 3.5.3 Distribution
<!-- distributed deployments, data, and devices (topologies, replication/placement, etc) -->

#### 3.5.4 Maintainability
<!-- measurable attributes that make the software easier to modify, fix, and evolve (modularity, standards, documentation, observability, etc) -->

#### 3.5.5 Reusability
<!-- components intended for reuse -->

#### 3.5.6 Portability
<!-- ability to run on multiple environments (supported OSs/runtimes, cloud providers, etc) -->

#### 3.5.7 Cost
<!-- targets/budgets that influence design or implementation (cloud spend, per-transaction, licensing, etc) -->

#### 3.5.8 Deadline
<!-- milestones, delivery dates, and readiness criteria -->

#### 3.5.9 Proof of Concept
<!-- objectives, scope, timebox, and success criteria for any POC -->

#### 3.5.10 Change Management
<!-- how changes are introduced and communicated (categories, required artifacts and workflow, etc) -->

### 3.6 AI/ML
<!-- ML-specific requirements section -->

#### 3.6.1 Model Specification
<!-- model purpose, inputs/outputs, performance targets, validation data, versioning -->

#### 3.6.2 Data Management
<!-- lifecycle of datasets (origin, labeling, anonymization, etc) -->

#### 3.6.3 Guardrails
<!-- controls that the system operates within approved boundaries (validation/sanitation, output filtering, action limits, etc) -->

#### 3.6.4 Ethics
<!-- fairness, transparency, and accountability metrics/enforcement -->

#### 3.6.5 Human-in-the-Loop
<!-- human oversight (review points, escalations, feedback, etc) -->

#### 3.6.6 Model Lifecycle and Operations
<!-- deployment, monitoring, retraining, and retiring -->

## 4. Verification

| Requirement ID | Verification Method | Test/Artifact Link | Status | Evidence |
|----------------|---------------------|--------------------|--------|----------|
|                |                     |                    |        |          |
|                |                     |                    |        |          |

## 5. Appendixes

### 5.1 Arquitectura
Enlace a la arquitectura

### 5.2 Diagrama casos de uso
Enlace/foto al diagrama de casos de uso

### 5.3 Diagrama de paquetes
Enlace/foto al diagrama de paquetes