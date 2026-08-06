---
description: Audita la API REST (o los endpoints planificados) contra las reglas de la rúbrica
argument-hint: [ruta o recurso opcional, p.ej. appointments]
---

Audita la API REST del proyecto contra las reglas del TFG (ver `docs/tfg/estandares-tecnicos.md` §1 y
`docs/tfg/arquitectura-objetivo.md` §5). Ámbito: **$ARGUMENTS** (si vacío, toda la API o el borrador de endpoints).

Comprueba y reporta ✅/❌ por regla, con el fichero:línea o el endpoint afectado:
- Prefijo **`/api/v1`**.
- Recursos en **inglés y plural**.
- **Verbos** HTTP correctos (GET/POST/PUT/DELETE) para leer/crear/modificar/borrar.
- **Códigos de estado** adecuados; **`Location`** en las creaciones (201).
- **Filtros/búsqueda** por query params.
- **Paginación** (10 + "más") en todos los listados.
- **Seguridad:** guards de auth/rol/tenant donde toque; ownership; sin PII en logs.
- Documentación **OpenAPI** presente y coherente (`docs/api/`).

Si el backend aún no existe, audita el **borrador de contrato** y señala qué falta definir. Termina con una lista
priorizada de correcciones. Para escaneos grandes, usa un subagente y devuelve solo la conclusión.
