# Guía de Despliegue — new.eminsa.com (cPanel)

## Resumen del proceso
1. Preparar archivos localmente (build)
2. Crear la base de datos en cPanel
3. Subir archivos al servidor
4. Configurar la app Node.js en cPanel
5. Instalar dependencias y migrar BD en el servidor
6. Verificar que todo funcione

---

## PASO 1 — Preparar el .env.production

Abre `.env.production` y completa los valores que faltan:

- `DATABASE_URL` → con las credenciales de la BD que crees en el Paso 2
- `BETTER_AUTH_SECRET` → genera uno con: `openssl rand -base64 32`
- Email corporativo (si ya existe en cPanel)

---

## PASO 2 — Crear base de datos en cPanel

1. Entra a **cPanel → MySQL Databases**
2. Crear base de datos: `eminsa_prod` (se crea como `cpaneluser_eminsa_prod`)
3. Crear usuario: `eminsa_user` con contraseña fuerte
4. Asignar **todos los privilegios** al usuario sobre esa BD
5. Anota:
   - DB: `cpaneluser_eminsa_prod`
   - User: `cpaneluser_eminsa_user`
   - Pass: la que pusiste
6. Actualiza `DATABASE_URL` en `.env.production`:
   ```
   mysql://cpaneluser_eminsa_user:TUPASSWORD@localhost:3306/cpaneluser_eminsa_prod
   ```

---

## PASO 3 — Build local

En tu máquina, copia `.env.production` como `.env` temporalmente para el build,
o simplemente corre el build (el build ya está completo si corriste `npm run build`):

```bash
npm run build
```

Si el build falla, revisa errores antes de continuar.

---

## PASO 4 — Subir archivos al servidor

Conéctate por **FTP** (FileZilla) o usa el **File Manager** de cPanel.

Directorio destino en el servidor: `/home/eminsa/new.eminsa.com/` (o el que cPanel asigne)

### Archivos y carpetas a subir:

| Lo que subes | Descripción |
|---|---|
| `.next/` | Build de producción (carpeta completa) |
| `public/` | Archivos estáticos |
| `prisma/` | Schema de BD |
| `src/messages/` | Traducciones i18n |
| `src/config/` | Configuraciones |
| `package.json` | Dependencias |
| `package-lock.json` | Lock file |
| `server.js` | Servidor de producción |
| `next.config.ts` | Config de Next.js |
| `.env.production` | **Renómbralo a `.env` al subirlo** |

### Lo que NO subes:
- `node_modules/` (se instala en el servidor)
- `src/app/`, `src/lib/`, etc. (ya compilado en `.next/`)
- `.env` (el de desarrollo)
- `DEPLOY.md` este archivo

### Forma más rápida — ZIP:
1. Selecciona todos los archivos/carpetas de la lista de arriba
2. Comprime en `deploy.zip`
3. Sube el ZIP al File Manager de cPanel
4. Extrae en el directorio de la app
5. Renombra `.env.production` → `.env`

---

## PASO 5 — Configurar Node.js App en cPanel

1. En cPanel, busca **"Setup Node.js App"**
2. Haz clic en **"Create Application"**
3. Configura:

| Campo | Valor |
|---|---|
| Node.js version | **18.x** o **20.x** (la más reciente disponible) |
| Application mode | **Production** |
| Application root | `/home/eminsa/new.eminsa.com` |
| Application URL | `new.eminsa.com` |
| Application startup file | `server.js` |

4. Haz clic en **"Create"**

---

## PASO 6 — Instalar dependencias en el servidor

Una vez creada la app, cPanel muestra un botón **"Run NPM Install"** — haz clic en él.

O por SSH:
```bash
cd /home/eminsa/new.eminsa.com
npm install --production
```

---

## PASO 7 — Migrar base de datos

Por SSH (cPanel → Terminal o SSH):
```bash
cd /home/eminsa/new.eminsa.com

# Generar cliente Prisma para el servidor
npx prisma generate

# Crear las tablas en la BD
npx prisma db push

# Crear el usuario admin inicial
npx prisma db seed
```

Usuarios creados por el seed:
- `yahinnielvas@gmail.com` / `Eminsa2024!`
- `admin@eminsa.com` / `Admin2024!`
- `editor@eminsa.com` / `Editor2024!`

**Importante:** Después del seed, cambia las contraseñas desde el panel admin.

---

## PASO 8 — Iniciar la aplicación

En cPanel → Setup Node.js App → encuentra tu app → haz clic en **"Start"** (o el botón de play ▶).

---

## PASO 9 — Verificar

1. Abre https://new.eminsa.com — debe cargar la web
2. Abre https://new.eminsa.com/admin — debe aparecer el login
3. Inicia sesión con `admin@eminsa.com` / `Admin2024!`
4. Cambia la contraseña del admin

---

## Solución de problemas comunes

| Problema | Solución |
|---|---|
| App no inicia | Revisar logs en cPanel → Node.js App → Logs |
| Error 500 | Revisar que `.env` esté en el servidor con los datos correctos |
| BD no conecta | Verificar `DATABASE_URL` — el host debe ser `localhost` en cPanel |
| `prisma generate` falla | Verificar que Node.js version sea 18+ |
| Imágenes no cargan | Cloudinary config correcta en `.env` |

---

## Actualizaciones futuras

Para actualizar la app en producción:
1. Hacer cambios localmente
2. `npm run build`
3. Subir solo la carpeta `.next/` (reemplazar)
4. En cPanel → Node.js App → Restart
