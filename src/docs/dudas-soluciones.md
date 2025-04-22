# LISTADO DE SEGUIMIENTO DE DUDAS

### Ejemplo de cómo estructurar una duda.
EQUIPO A QUIÉN VA DIRIGIDA - Duda en cuestión.

`BACK - Gestión de la entidades`

## SIN PLANTEAR
> Dudas que tenemos pero que aún no hemos transmitido.

- [ ] DEVOPS - ¿Cuando va a empezar a funcionar DevOps?
- [ ] UX/UI - Botón buscar en el topbar. `No sabemos qué función tiene exactamente. Si es un buscador general de la aplicación, plantea un funcionalidad extra que puede ser trabajada una vez resueltas las historias de usuario principales.`
- [ ] INTERNA - ¿Con qué tipo de petición vamos a trabajar en la actualización de entidades? `Caro propone que en la actualización de los productos se haga una petición PATCH, ya que de hacer una petición PUT se tiene que enviar toda la data de nuevo, incluida la imagen. Este protocolo lo podemos igual aplicar al resto de actualizaciones necesarias, como perfil.`
- [ ] INTERNA - En teoría se tienen que poder registrar "egresos" o devoluciones. El flujo parece ser que el cliente facilite el número de orden, se pueda acceder a dicha orden haciendo una petición por su id, y está se pueda modificar, quitando los productos necesarios. Esto debería modificar también el reporte del día concreto (en tanto que es una entidad). El resto de reportes se generan a petición, no influiría nada más que en temas de caché almacenada y afectada por estos cambios.
- [ ] INTERNA - Otro escenario son las roturas. El comerciante debe poder quitar productos rotos que registren una pérdida como tal. UX/UI proponía que el mismo botón de "Registrar egreso" permita la elección entre devolver de un pedido, o quitar del inventario por el motivo de rotura. Tenemos que ver cómo lo aplicamos.

## PLANTEADAS
> Propuestas pero que todavíano han obtenido feedback.


## EN CONSULTA
> La/s persona/s implicada conoce la problemática y se está buscando solución.

- [ ] UX/UI - Login con Facebook o Google. `Resolver una vez resueltas las historias de usuario principales.`


## EN PROGRESO
> Se está trabajando en la solución.

- [ ] BACK - Cookie HTTP-only para el manejo de sesión. `Falta concretar qué data vendrá en la cookie. En principio el token tendrá el email, id de usuario e id del store. Esta data será necesaria para el manejo de las peticiones en el back.`
- [ ] UX/UI - Control de flujos de la aplicación. `Se siguen ajustando distintos elementos, y falta cerrar las vistas de perfil, alertas y estadísticas.`


## RESUELTAS
> Cerradas.

- [x] UX/UI - Iconos de material design no coinciden. `Finalmente se encuentran casi todos, y se recurrirá a otros en caso de no coincidir. Existe un documento Icons.md en la carpeta /docs/ para guiarse.`
- [x] UX/UI - Colores de los botones en sus diferentes estados (base, hover, active, active+hover). `Se explica en el Figma.`
- [x] UX/UI - Botón flotante para agregar/editar producto. `Ha cambiado (07/04) siendo un botón fijo en la parte superior de la vista inventario.`
- [x] UX/UI - Botón de cerrar menú. `El botón hamburger en el SIDENAVBAR y en DESKTOP busca colapsar el menú y expandirlo. En el modo MOBILE busca cerrar el menú. El botón hamburger en el modo MOBILE del TOPBAR busca abrir el menú.`
- [x] BACK - Cómo gestionar el guardado/recuperación de la imagen por producto,

```
1. Formato admitido (control desde el front): JPG, JPEG, PNG y WEBP.
2. Peso máximo de 2MB (control desde el front).
3. El back gestiona el guardado de la imagen reduciendo peso, ajustando resolución y convirtiendo a WEBP.
```