# Portafolio web · Gabriel Bravo

Sitio estático (HTML5, CSS3 y JavaScript vanilla, sin dependencias) con cuatro secciones: Inicio, Videojuegos, Blog y Contacto.

```
portafolio/
├── index.html          estructura y contenido
├── css/styles.css      estilos (variables de color en :root)
├── js/config.js        ⚙ URLs de los juegos e identificador de Formspree
├── js/main.js          navegación, animaciones y formulario
├── assets/images/      capturas de los juegos (.webp, 1280×720)
├── assets/fonts/       Inter y Manrope (woff2, solo caracteres latinos)
└── README.md
```

## 1. Lo que debes configurar tú
1. **Formspree** (obligatorio, el formulario no envía hasta hacerlo): ver sección 4.
2. Comprobar que las dos URL de los juegos abren (ver sección 3).

## 2. Cambiar las capturas
Las capturas están en `assets/images/` (`futbol-arcade-2d.webp` y `ping-pong-2d.webp`, proporción 16:9). Para cambiarlas, reemplaza el archivo conservando el nombre, o cambia el `src` y el `alt` en `index.html`. Conviene usar 1280×720 y formato WebP o JPG.

## 3. Cambiar las URL de los juegos
Edita `js/config.js`, objeto `games` (`futbol` y `pingpong`). Los botones «Jugar» se abren en una pestaña nueva con `rel="noopener noreferrer"`.

## 4. Configurar Formspree
1. Crea una cuenta en https://formspree.io.
2. **New form**, ponle un nombre y escribe el correo receptor.
3. Formspree te enviará un **correo de verificación** a ese correo: debes confirmarlo, o no recibirás notificaciones.
4. Copia el identificador del formulario: es la parte final del endpoint `https://formspree.io/f/XXXXXXXX`.
5. Abre `js/config.js` y reemplaza `TU_FORM_ID` por ese identificador (es el único lugar). No hay claves privadas en el código.
6. Haz un envío de prueba desde la página publicada. El primer envío puede pedir confirmación en Formspree; revisa también la carpeta de spam.
7. Verifica que el contacto aparece en **Submissions** del formulario en Formspree y que llega el correo.

Mientras el identificador sea `TU_FORM_ID`, la página muestra «El formulario aún no está configurado» y no simula ningún envío. El mensaje de éxito solo aparece cuando Formspree responde que aceptó el envío.

## 5. Publicar en GitHub Pages
1. Crea un repositorio nuevo (por ejemplo `portafolio`) y sube **el contenido** de esta carpeta, con `index.html` en la raíz.
2. En GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**.
3. Espera uno o dos minutos; la URL será `https://TU_USUARIO.github.io/portafolio/`.
4. Para actualizar: sube los cambios a `main` y GitHub Pages republica solo.

## 6. Pruebas manuales
- [ ] Las cuatro secciones existen y los enlaces del menú te llevan a cada una.
- [ ] El menú marca la sección activa al desplazarte.
- [ ] Los botones «Jugar» abren las URL correctas en pestaña nueva.
- [ ] Las capturas corresponden a cada juego y no se deforman.
- [ ] Sin desplazamiento horizontal en móvil (≈360 px), tableta y escritorio.
- [ ] Formulario: vacío muestra errores; un correo mal escrito muestra error.
- [ ] Con el identificador real: envío válido → indicador de carga, botón bloqueado y mensaje de éxito; el contacto aparece en Formspree.
- [ ] Sin conexión: mensaje de error y los datos siguen en los campos.
- [ ] Navegación solo con teclado (Tab) con foco visible.
- [ ] Con «reducir movimiento» activado en el sistema, no hay animaciones.

## 7. Lighthouse (pendiente de ejecutar)
Con la página publicada: Chrome en ventana de incógnito → F12 → pestaña **Lighthouse** → modo **Mobile** → marcar las cuatro categorías → **Analyze page load**. Objetivo: 90 o más en cada una. Las puntuaciones no se han medido todavía.
