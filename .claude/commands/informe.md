---
description: Genera un informe técnico corto de una feature (semilla de memoria), estilo docs/informe-*.md
argument-hint: [feature o rama, p.ej. "http-migration" o "availability"]
---

Escribe un **informe técnico breve** de la feature **$ARGUMENTS** en `docs/informe-<slug>.md` (amplíalo si ya existe),
con el estilo de los informes que ya usa el repo (`docs/informe-rama-sms-sender.md`, `docs/Multi-appointments.md`).

Objetivo: dejar **rastro técnico mientras se construye**, como **semilla de la memoria** — NO es la memoria formal
(esa es Fase 6 con `/memoria`).

Redacta de forma concisa, basándote en lo **realmente hecho** (git log/diff reciente, código tocado, decisiones):
1. **Problema / objetivo** de la feature.
2. **Decisiones técnicas** clave y el **porqué** (alternativas descartadas).
3. **Arquitectura**: qué capas se tocaron (recuerda: la migración vive en `infrastructure/`), patrones usados
   (Strategy, Repository, Adapter…).
4. **Pruebas** añadidas y qué cubren (enlaza RF-xx si aplica).
5. **Pendiente / riesgos**.

Reglas: cuerpo en **español** (semilla de memoria), términos de código en **inglés** (usa `docs/tfg/glosario.md`).
**Cero invención**: distingue implementado vs planificado. Registra la entrada en `docs/tfg/seguimiento.md` para
trazabilidad. Aquí no se escribe código de producción, es documentación.
