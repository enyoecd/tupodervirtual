# Guía Rápida: Conectar Cloudflare D1 a tu Proyecto

Todo el código ya está preparado en el repositorio:
1. `d1-schema.sql` (esquema SQL y datos iniciales de todos tus enlaces).
2. `functions/api/links.ts` (API serverless de Cloudflare Pages Functions).
3. `src/services/linksService.ts` (servicio en React que se conecta automáticamente a `/api/links`).

---

## Lo que debes hacer tú en Cloudflare (Solo 3 pasos simples)

### Paso A: Crear la base de datos D1 en Cloudflare
1. Entra a tu panel de **Cloudflare Dashboard** (dash.cloudflare.com).
2. En el menú de la izquierda, ve a **Storage & Databases** → **D1 SQL Database**.
3. Haz clic en **Create database**.
4. Nómbrala como quieras (por ejemplo: `tupodervirtual-db`) y haz clic en **Create**.

---

### Paso B: Ejecutar el esquema SQL inicial (Cargar tablas y datos)
1. Dentro de tu base de datos recién creada en Cloudflare, haz clic en la pestaña **Console**.
2. Abre el archivo `d1-schema.sql` de este proyecto, copia todo su contenido y pégalo en la consola de Cloudflare.
3. Haz clic en **Execute** (o Run).
   *(¡Listo! Ya tienes la tabla `links` creada con todos tus enlaces iniciales cargados).*

---

### Paso C: Vincular la base de datos a tu proyecto de Cloudflare Pages
1. En el menú de la izquierda de Cloudflare, ve a **Workers & Pages**.
2. Haz clic en tu proyecto de **Pages** (tu sitio web).
3. Ve a **Settings** → **Functions**.
4. Baja hasta la sección **D1 database bindings** y haz clic en **Add binding**.
5. Configura estos dos campos:
   - **Variable name**: Escribe exactamente `DB` (en mayúsculas).
   - **D1 database**: Selecciona la base de datos que creaste en el Paso A (`tupodervirtual-db`).
6. Haz clic en **Save** (Guardar).

---

### ¡Y listo! 🎉
La próxima vez que hagas un commit a GitHub o despliegues tu proyecto en Cloudflare Pages, tu web se conectará automáticamente a tu base de datos D1. Cualquier enlace que arrastres, edites, agregues o borres se guardará de forma permanente en tu base de datos Cloudflare D1.
