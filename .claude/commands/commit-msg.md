---
description: Propone 2-3 mensajes de commit según tus cambios y el estilo del repo (Conventional Commits, sin Co-Authored-By)
argument-hint: [pista opcional del cambio]
---

Genera **opciones de mensaje de commit** para los cambios actuales. **No hagas el commit** por tu cuenta salvo que
Álvaro elija una opción y te lo pida explícitamente.

## Pasos
1. **Inspecciona los cambios sin commitear:**
   - `git status --short`, `git diff` (unstaged) y `git diff --cached` (staged).
   - Si hay algo **staged**, el mensaje es para *eso*; si no hay nada staged, considera todo lo modificado y **dilo**.
2. **Aprende el estilo real del repo** (no lo inventes):
   - `git log --pretty=format:'%s' -20` y `git log -3 --pretty=format:'%h%n%B'`.
   - Hoy el patrón es **Conventional Commits** `type: subject` en **inglés**, subject en minúscula, y a veces con
     **cuerpo** (línea en blanco + qué/por qué envuelto a ~72 columnas). Si el patrón cambia, **adáptate al log**.
3. **Redacta 2-3 opciones** coherentes con ese estilo y con las reglas de `CLAUDE.md`:
   - **Inglés**, descriptivo, subject ≤ ~72 caracteres.
   - **Tipo** adecuado: `feat` / `fix` / `docs` / `chore` / `refactor` / `test` / `ci` / `perf`.
   - **Sin `Co-Authored-By`** ni ninguna firma/trailer automático (regla del repo).
   - Da **variedad**: p. ej. una escueta solo-subject y otra **con cuerpo** en bullets si el cambio lo merece.
   - Afina el foco con la pista si la hay: **$ARGUMENTS**.
4. **Presenta** las opciones numeradas (1/2/3), cada una en **bloque de código** para copiar-pegar en VSCode, con **una
   línea** de por qué. Si los cambios mezclan asuntos distintos, **avísalo** y propón un **desglose en varios commits**
   (cada uno con su mensaje).
5. **GitHub Flow:** `main` es intocable. Comprueba la rama (`git branch --show-current`); si es `main`, recuérdalo y
   sugiere crear rama `add-*`/`fix-*` antes de commitear. Si Álvaro elige una opción y pide que commitees, **hazlo
   entonces** (en rama, con el mensaje elegido, **sin `Co-Authored-By`**).
