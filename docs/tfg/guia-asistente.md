# Guía del asistente TFG — cómo funciona y mapa de ficheros

> El "para qué sirve cada cosa" del asistente multi-modo. Si algún día vuelves y no te acuerdas de cómo va, empieza
> por aquí. (Esto documenta la **configuración del asistente y la documentación**, no el código de la app.)

## TL;DR
- El asistente es **configuración de proyecto versionada** en el repo: `CLAUDE.md` + `.claude/` + `docs/tfg/`.
- Funciona **igual en la CLI, en la app nativa y en la extensión de VSCode**: todas leen los mismos ficheros del repo.
- **Solo se auto-carga `CLAUDE.md`** (y el índice de memoria). El resto (`docs/tfg/`, `docs/`) se lee **bajo demanda**,
  a propósito, para no saturar el contexto.

---

## 1. Cómo funciona en 1 minuto

Tres capas:

1. **Base de conocimiento** (la "verdad"):
   - `CLAUDE.md` (raíz) → **corto y siempre cargado**. Es el "mapa": reglas evaluables, arquitectura en 30 s, y punteros
     al resto. Hace que el **modo por defecto sea el Ingeniero del TFG**.
   - `docs/tfg/*.md` → el detalle. **No se carga solo**; el agente abre el fichero (y la sección) que necesita.
2. **Identidades** (`.claude/output-styles/`) → las cambias con `/output-style`.
3. **Comandos** (`.claude/commands/`) → atajos que funcionan en cualquier modo.

**Por qué no se carga todo de golpe:** eficiencia. No hace falta que el agente tenga los 10 documentos en la cabeza a la
vez; con `CLAUDE.md` sabe *dónde* está cada cosa y lo lee cuando toca. Esto es lo que evita que se sature, se líe o
gaste tokens de más.

---

## 2. ¿Y si lo uso desde VSCode? (mismo contexto, tranquilo)

**Sí tiene el mismo contexto.** La extensión de VSCode usa el **mismo motor de Claude Code** y lee los **mismos ficheros
del workspace**: `CLAUDE.md`, `.claude/` (output styles, comandos, settings) y la memoria. No pierdes nada respecto a la
app nativa.

Matiz importante para quitarte la sensación de "no tiene todo el contexto":
- **Nunca** se carga "todo" de golpe — ni en VSCode ni en la app nativa. Se carga `CLAUDE.md` y se lee `docs/tfg/` **a
  demanda**. Eso es lo normal y lo deseable.
- Lo **único** que no es del repo es la **memoria personal** (`~/.claude/.../memory/`), que está atada a la **ruta del
  proyecto en tu máquina**. Abrir el repo en VSCode = misma máquina + misma ruta → **misma memoria**. Cuando hagas el
  **fork a otra ruta/máquina**, esa memoria no viaja; por eso lo importante está en `docs/tfg/` (versionado).

**Cómo comprobar que va bien en VSCode (30 s):**
1. `/output-style` → deben aparecer **TFG · Asesor**, **TFG · Redacción**, **TFG · Ingeniero**.
2. Pregunta *"¿qué reglas de código son evaluables?"* → debe recitarlas (confirma que `CLAUDE.md` se ha cargado).

---

## 3. Las 3 identidades (modos)

| Modo | Cómo entrar | Para qué |
|---|---|---|
| **Ingeniero** (por defecto) | nada / `/output-style default` | Programar respetando rúbrica + buenas prácticas. |
| **Asesor** | `/output-style tfg-advisor` | Planificar, priorizar, organizar, preparar tutorías. No programa. |
| **Redacción** | `/output-style tfg-redaccion` | Memoria (ES), blog (EN), README/docs. |

## 4. Los comandos (`/`)

| Comando | Qué hace |
|---|---|
| `/tfg-estado` | Dónde estás vs rúbrica + próximas acciones + fecha límite. Reorientación barata. |
| `/tfg-fase [n]` | Backlog priorizado de una fase (borrador de GitHub Issues). |
| `/rest-audit [recurso]` | Audita la API contra las reglas REST de la rúbrica. |
| `/informe [feature]` | Informe técnico corto de una feature (semilla de memoria). |
| `/blog [tema]` | Borrador de post de Medium (EN) del avance reciente. |
| `/memoria [sección]` | Redacta/expande una sección de la memoria (ES). |

---

## 5. Mapa de ficheros (el tutorial)

### Raíz
| Fichero | Qué es | Cuándo se carga |
|---|---|---|
| `CLAUDE.md` | Cerebro del asistente: reglas evaluables, arquitectura resumida, punteros, modos. | **Auto, siempre.** |

### `.claude/` — configuración del agente
| Fichero | Qué es | Cuándo se carga |
|---|---|---|
| `settings.json` | Permisos cómodos (allow-list de `ng`/`npm`/`nest`/git read-only…). | Se aplica siempre (no es "contexto"). |
| `output-styles/tfg-advisor.md` | Persona del **Asesor**. | Al activar ese modo. |
| `output-styles/tfg-redaccion.md` | Persona del **Redactor**. | Al activar ese modo. |
| `output-styles/tfg-engineer.md` | Alias explícito del Ingeniero (**redundante con el default**; borrable). | Al activar ese modo. |
| `commands/*.md` | Los 6 comandos de arriba. | Al invocar el comando. |

### `docs/tfg/` — base de conocimiento del TFG (bajo demanda)
| Fichero | Qué es | Quién lo usa |
|---|---|---|
| `guia-asistente.md` | **Este fichero**: cómo funciona todo + mapa. | Álvaro |
| `README.md` | Índice de `docs/tfg/`. | Todos |
| `tfg-spec.md` | Rúbrica **destilada** (fases, fechas, optativas, requisitos, doc exigida). | Asesor / Redacción |
| `enunciado-tfg-web.md` | **Enunciado oficial completo** (fuente autoritativa; consulta puntual). | (fuente de verdad) |
| `arquitectura-objetivo.md` | Objetivo NestJS/Mongo + plan de migración Firebase→Node. | Ingeniero |
| `estandares-tecnicos.md` | Buenas prácticas por tecnología + reglas evaluables. | Ingeniero |
| `estado-vs-rubrica.md` | **Gap analysis vivo** (memoria de trabajo). Leer al empezar. | Todos |
| `seguimiento.md` | Fases, horas, riesgos, decisiones, índice de blog. | Asesor / Redacción |
| `glosario.md` | Términos ES/EN consistentes. | Ingeniero / Redacción |

### `docs/` — documentación de producto (reutilizable como material de memoria)
| Fichero | Qué es |
|---|---|
| `SRS.md` | Especificación de requisitos (IEEE-830/ISO-29148). Semilla de la memoria. |
| `vision-producto-y-requisitos-funcionales.md` | Visión de producto + requisitos funcionales. |
| `Multi-appointments.md` | Diseño del **algoritmo avanzado** (disponibilidad multi-barbero). |
| `informe-rama-sms-sender.md` | Informe técnico del SMS (tecnología complementaria). |
| `epicas-export-backups-analytics.md` | Épicas futuras (export, backups, analítica/gráficos). |
| `legal/` | Aviso legal y política de privacidad. |

### `~/.claude/.../memory/` — memoria personal (NO viaja con el fork)
`MEMORY.md` (índice) + hechos durables (quién eres, la voz "The Gentleman", que el repo se moverá, dónde vive el
asistente). Apoyo entre sesiones **en esta máquina y ruta**. Lo crítico y portable está en `docs/tfg/`.

---

## 6. Recetas para usarlo bien
- Empieza cada sesión con **`/tfg-estado`**.
- **Una tarea por sesión**; `/clear` al cambiar de tema.
- Deja que el agente **actualice `estado-vs-rubrica.md` y `seguimiento.md`** al cerrar (si no, pídeselo).
- Al terminar una feature: **`/informe`**. Al terminar una release: cambia a Redacción y **`/blog`**.
- No escribas la memoria formal hasta Fase 6; ve dejando **informes** por el camino.