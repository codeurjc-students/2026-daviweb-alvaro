# Glosario ES/EN

> Para uso bilingüe consistente: **UI en español**, **código/comentarios en inglés**, **memoria en español**. Cuando el
> Ingeniero nombre clases/variables usa la columna EN; cuando Redacción escriba la memoria usa la ES.

## Dominio
| Español (UI / memoria) | English (código) | Notas |
|---|---|---|
| cita | appointment | entidad core |
| reserva / reservar | booking / to book | acción de crear cita |
| hueco / franja | slot | unidad de disponibilidad |
| disponibilidad | availability | resultado del algoritmo |
| barbero / peluquero | barber | recurso con horario propio |
| servicio (corte, tinte…) | service | duración + precio |
| horario | schedule | plantilla semanal |
| excepción (festivo, cierre) | exception | día especial |
| hueco reservado / bloqueo | reserved slot / block | `barberId` null = bloqueo global |
| galería | gallery | portfolio de fotos |
| foto | photo | imagen de galería |
| lista negra (teléfonos) | blacklist / blocked phone | anti-abuso |
| negocio | business | datos del local |
| inquilino / cliente SaaS | tenant | una peluquería |
| propietario / administrador | owner / admin | rol con control total |
| usuario registrado | registered user | rol intermedio |
| usuario anónimo | anonymous user | sin credenciales |

## Técnico / TFG
| Español | English | Notas |
|---|---|---|
| requisito funcional | functional requirement (RF-xx) | numerar para trazabilidad |
| caso de uso | use case | capa `application/` |
| repositorio (puerto) | repository (port/interface) | contrato de datos |
| algoritmo avanzado | advanced algorithm | = cálculo de disponibilidad |
| memoria (del TFG) | thesis / report | licencia CC |
| tribunal | committee / board | defensa |
| despliegue | deployment | Fases 4-5 |
| entrega/despliegue continuo | CI / CD | GitHub Actions |
| capacidad | capacity | huecos simultáneos (multi-barbero) |

> Añade términos aquí en cuanto aparezcan, para no traducir dos veces distinto lo mismo.
