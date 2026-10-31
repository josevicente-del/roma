# 🏛️ ROMA MMXXVI · Guía Interactiva, Gastronomía & Álbum de Viaje (PWA)

[![PWA Ready](https://img.shields.io/badge/PWA-Offline--First-orange.svg)](https://developer.mozilla.org/es/docs/Web/Progressive_web_apps)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green.svg)](https://leafletjs.com/)

**Aplicación Web Progresiva (PWA)** mobile-first y offline-first diseñada a medida para el fin de semana en Roma del **viernes 6 al domingo 8 de noviembre de 2026** para el grupo de 5 viajeros (**Laura, José Antonio, Mónica, José Vicente y Beatriz**), con centro de operaciones en **Via Palermo 4 (Rione Monti / Viminale)**.

---

## 📑 Tabla de Contenidos

1. [Estilo Visual e Identidad](#-estilo-visual-e-identidad)
2. [Estructura y Secciones Principales](#-estructura-y-secciones-principales)
3. [Calculadora de Gastos y Adelantos](#-calculadora-de-gastos-y-adelantos)
4. [Previsión Meteorológica Horaria](#-previsión-meteorológica-horaria)
5. [Guía Gastronómica y Modo Restaurantes](#-guía-gastronómica-y-modo-restaurantes)
6. [Fichas Enriquecidas (Audioguía, Foto Tips & Cine)](#-fichas-enriquecidas)
7. [Álbum Compartido y Sincronización](#-álbum-compartido-y-sincronización)
8. [Seguridad y Perfiles de Viajeros](#-seguridad-y-perfiles-de-viajeros)
9. [Instalación de la PWA en el Móvil](#-instalación-de-la-pwa-en-el-móvil)
10. [Instrucciones de Desarrollo y Despliegue](#-instrucciones-de-desarrollo-y-despliegue)

---

## 🎨 Estilo Visual e Identidad

La aplicación sigue una línea gráfica minimalista y moderna inspirada en los tonos clásicos de la ciudad eterna:

- **Paleta de Color Romana:**
  - Fondo travertino/crema: `#F7F3EC` (modo oscuro: `#181412`).
  - Acento terracota SPQR: `#B5532F`.
  - Texto marrón cálido: `#2B2420` (modo oscuro: `#F5F0E8`).
  - Tonos secundarios: Salvia romana (`#5B7065`) y dorado apagado (`#C9933B`).
  - Cumplimiento de accesibilidad y contraste **WCAG AA**.
- **Tipografía autoalojada 100% offline:**
  - Títulos elegantes: *Playfair Display* (serif).
  - Cuerpo e interfaces: *DM Sans* (sans-serif legible).
- **Diseño Mobile-First:** botones y áreas táctiles de al menos 44 px para uso ergonómico con una sola mano.
- **Cronología Viva «Ab Urbe Condita» (a.U.c.):** contador en tiempo real que calcula dinámicamente en cada ejecución los días exactos transcurridos desde la mítica fundación de Roma por Rómulo el 21 de abril del 753 a.C. (+1.014.800 días) y el año clásico (*MMDCCLXXIX a.U.c.* / Año 2779), con el año del viaje (**2026**) visible en todas las secciones.

---

## 📱 Estructura y Secciones Principales

La barra de navegación inferior fija proporciona acceso directo a las **6 secciones clave**:

| Pestaña | Icono | Descripción |
| :--- | :---: | :--- |
| **Hoy** | `Compass` | Radar en tiempo real: parada actual y siguiente parada según la hora, cálculo de distancia a pie, botón «Cómo llegar ahora» con GPS, minimapa del recorrido y accesos rápidos. |
| **Ruta** | `Calendar` | Línea de tiempo vertical numerada con tiempos de caminata entre monumentos, selector de jornadas (Viernes, Sábado y Domingo) y estado dinámico según la hora. |
| **Mapa** | `Map` | Mapa interactivo Leaflet con las paradas numeradas en orden, trazado de la ruta, ubicación del apartamento en Via Palermo 4, fuentes públicas de agua potable (*nasoni*) y geolocalización. |
| **Gastos** | `Coins` | **Calculadora de Adelantos y Gastos Comunes con Asuntos** (sección independiente): gestión de dinero adelantado, cálculo de cuota ($Total \div 5$), balances de **Superávit / Déficit** y transferencias sugeridas. |
| **Tiempo** | `CloudSun` | Previsión meteorológica detallada hora a hora para los tres días, horas de amanecer y puesta de sol (para fotografía), consejos de vestimenta por capas y Plan B para lluvia. |
| **Álbum** | `Camera` | Álbum fotográfico colaborativo con compresión en cliente (ahorro de datos móviles en roaming), asignación por parada, galería lightbox y descarga de todas las fotos en un archivo `.ZIP`. |

---

## 💰 Calculadora de Gastos y Adelantos

Ubicada en su **sección propia e independiente** (pestaña *Gastos*), permite llevar las cuentas del grupo con total transparencia:

1. **Registro de adelantos por persona:**
   - Selección del pagador entre los 5 perfiles con un solo toque.
   - Selector de asuntos rápidos: *Hotel*, *Entradas*, *Autobús / Transfer*, *Restaurante*, *Tasa Turística*, *Helados / Café*, *Otros*.
   - Campo para detalle descriptivo libre (ej. *«Entradas Coliseo x5»* o *«Reserva Via Palermo 4»*).
   - Importe exacto en euros (€).
2. **Cálculo de Cuota y Balances:**
   - Sumatorio global del gasto común y cuota individual ($Total \div 5$).
   - Tarjetas por viajero con desglose de sus aportaciones y distintivo visual:
     - 🟢 **Superávit (a recibir):** para quien ha adelantado más de su cuota.
     - 🔴 **Déficit (a poner):** para quien ha adelantado menos de lo que le corresponde pagar.
3. **Liquidación Óptima:**
   - Propuesta paso a paso para saldar todas las diferencias entre los 5 miembros con el mínimo número de transferencias.
   - Historial editable con opción de eliminar registros erróneos.
   - Persistencia local en `localStorage` (sin necesidad de cobertura móvil).

---

## 🌤️ Previsión Meteorológica Horaria

Diseñada específicamente para las condiciones climatológicas de Roma a principios de noviembre:

- **Ficha del Día:** Temperatura máxima/mínima ($17^\circ\text{C} - 19^\circ\text{C}$ / $9^\circ\text{C} - 11^\circ\text{C}$), sensación térmica, humedad, índice UV y probabilidad máxima de precipitaciones.
- **Hora Dorada y Fotografía:** Horarios exactos de salida del sol (~06:50 h) y puesta de sol (~17:00 h) para aprovechar la mejor luz en el Coliseo, Trastevere y los miradores.
- **Línea Temporal Horaria (08:00 a 23:00 h):**
  - Variación de temperatura y probabilidad de lluvia en cada franja.
  - Cruce automático con la actividad programada en el itinerario.
- **Consejos de Vestimenta y Calzado:** recomendaciones prácticas para vestir por capas y calzado adecuado para los adoquines romanos (*sampietrini*).
- **Plan B en caso de lluvia:** guía de refugios y monumentos cubiertos (Basílica de San Pedro, excavaciones de San Clemente, Santa Maria Maggiore, Panteón).

---

## 🍝 Guía Gastronómica y Modo Restaurantes

Accesible mediante un modal flotante desde la pestaña *Hoy* o desde las paradas de comida:

- **Trattorias y Restaurantes Seleccionados por Zonas:**
  - **Monti (a 4–8 min de Via Palermo 4):** *La Carbonara dal 1906*, *Ai Tre Scalini dal 1895*, *Trattoria Vecchia Roma* (comida del sábado con bucatini flambeados en pecorino) y *Pasticceria Regoli dal 1916* (el mejor maritozzo con nata).
  - **Trastevere:** *Trattoria Da Enzo al 29*, *Tonnarello* y *Otaleg* (heladería artesana).
  - **Ghetto Judío & Panteón:** *Nonna Betta* (auténtico *Carciofo alla Giudia*), *Armando al Pantheon* y *Gelateria Giolitti dal 1900*.
- **Información Práctica:** Precios medios (€ / €€ / €€€), plato imprescindible a pedir, horario, teléfono para reservas y botón directo **«Cómo llegar a pie»** con enlace a Google Maps.
- **Las 4 Pastas Sagradas de Roma:**
  - Explicación de la evolución histórica: **Gricia** $\rightarrow$ **Amatriciana** $\rightarrow$ **Carbonara**, más el **Cacio e Pepe**.
  - **Reglas de Oro Anti-Trampas:** advertencias claras para evitar locales turísticos de baja calidad (ej. *¡nunca nata ni cebolla en la carbonara!*).
  - Maridaje sugerido con vinos de la región del Lazio (Frascati, Cesanese).

---

## 🎧 Fichas Enriquecidas

Cada uno de los monumentos y paradas del itinerario cuenta con una ficha emergente con:

- **Audioguía Offline Integrada:** reproductor de narración por voz en español mediante la API nativa `SpeechSynthesis`, accesible sin consumir datos móviles.
- **Tips Fotográficos:** mejores encuadres, puntos de fuga y horarios de luz óptimos.
- **Conexión Cinematográfica:** anécdotas de películas rodadas en el lugar (*Vacaciones en Roma*, *Ángeles y Demonios*, *Gladiator*, *La Dolce Vita*, etc.).
- **Información Logística:** horarios de apertura, normas de vestimenta en basílicas (hombros y rodillas cubiertos) y enlaces a mapas nativos.

---

## 📸 Álbum Compartido y Sincronización

- **Compresión en el Dispositivo:** las fotografías tomadas con la cámara del móvil se comprimen y redimensionan automáticamente en el navegador mediante `HTMLCanvasElement`, garantizando subidas ultra rápidas incluso con cobertura 3G/4G limitada.
- **Almacenamiento Híbrido:**
  - Si hay conexión y Supabase está configurado: subida a Supabase Storage y base de datos PostgreSQL.
  - Si no hay conexión: guardado instantáneo en `IndexedDB` local y sincronización automática en segundo plano al recuperar la cobertura.
- **Filtros por Viajero y Lugar:** visualización en cuadrícula tipo *masonry*.
- **Exportación Completa en .ZIP:** botón para descargar todas las fotografías del viaje empaquetadas en un único archivo comprimido.

---

## 🔐 Seguridad y Perfiles de Viajeros

1. **Acceso Unificado:**
   - **Usuario:** `roma2026`
   - **Contraseña:** `spqr2026`
   - Validación mediante hash criptográfico **SHA-256** con la `Web Crypto API`, sin credenciales en texto plano en el cliente.
2. **5 Perfiles de Viajeros Activos:**
   - 🔴 **Laura** (`#B5532F`) · *Navegante Principal*
   - 🔵 **José Antonio** (`#2E6F8E`) · *Historiador Imperial*
   - 🟢 **Mónica** (`#4D7A58`) · *Gourmet & Crítica*
   - 🟣 **José Vicente** (`#7B4E8C`) · *Logística & Rutas*
   - 🟡 **Beatriz** (`#C9933B`) · *Fotógrafa Oficial*
   - Selector de cambio de viajero en **un solo toque** desde la cabecera superior.

---

## 📲 Instalación de la PWA en el Móvil

La aplicación está lista para funcionar a pantalla completa (*standalone*) y almacenar recursos en caché mediante su Service Worker (`sw.js`):

### En iPhone (Safari en iOS)
1. Abre el enlace de la aplicación en **Safari**.
2. Toca el botón **Compartir** (icono de cuadrado con flecha hacia arriba en la barra inferior).
3. Selecciona **«Añadir a la pantalla de inicio»**.
4. Pulsa **«Añadir»**. La app aparecerá en tu pantalla con su icono de Roma y se abrirá sin barras de navegación.

### En Android (Google Chrome)
1. Abre el enlace en **Chrome**.
2. Pulsa en el aviso emergente **«Instalar aplicación»** o en el menú de tres puntos `⋮` arriba a la derecha y elige **«Instalar aplicación»**.

---

## 🛠️ Instrucciones de Desarrollo y Despliegue

### Requisitos previos
- Node.js $\ge 18.x$
- npm $\ge 9.x$

### Puesta en marcha local
```bash
# 1. Clonar o acceder al directorio del proyecto
cd ROMA

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo Vite
npm run dev

# 4. Compilar y verificar tipos de TypeScript
npm run build
```

El servidor local se iniciará habitualmente en `http://localhost:5173/`.

### Configuración opcional de Supabase (Álbum en la Nube)
Si deseas almacenar las fotos en un backend cloud gratuito:
1. Crea un proyecto en [Supabase](https://supabase.com).
2. En el **SQL Editor**, ejecuta el script provisto [`supabase_schema.sql`](./supabase_schema.sql).
3. Añade tus claves en el archivo `.env`:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```
*(Nota: Si no se configuran estas variables, la aplicación guardará las fotos localmente en `IndexedDB` de forma totalmente funcional).*

### Despliegue en producción
- **Vercel:** Compatible de forma nativa a través de [`vercel.json`](./vercel.json).
- **Netlify:** Compatible con el archivo [`netlify.toml`](./netlify.toml) preconfigurado.

---

*¡Buon viaggio a Roma! 🏛️🍕✨*
