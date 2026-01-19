# Grupo EMINSA - Sitio Web Corporativo

## 🚀 Proyecto Next.js para Grupo EMINSA

Sitio web moderno y profesional para Grupo EMINSA, empresa líder en transformadores eléctricos en República Dominicana y el Caribe con más de 50 años de experiencia.

## 📋 Estructura del Proyecto

El sitio está dividido en 4 áreas de negocio principales:

### 🏭 MTN (Mateo Transformadores Nacionales)
- Transformadores de fabricación nacional
- Tipos: Poste, Pad Mounted, Subestación, Secos en Resina
- Certificados ISO 9001:2015

### 🔧 ETRYS
- Reparación de transformadores
- Transformadores remanufacturados
- Alquiler de equipos
- Garantía de 18 meses

### 🌍 EIC (Eminsa International Corp)
- Importaciones y representaciones internacionales
- Marcas: INATRA, Schneider, Hammond, Top Cable, etc.

### ⚙️ Servicios
- Mantenimiento preventivo y correctivo
- Emergencias 24/7
- Pruebas de laboratorio
- Ingeniería de proyectos

## 🔐 Panel de Administración (CMS)

El sitio incluye un sistema de gestión de contenido para Noticias y Proyectos.

### Acceso al Panel
- **URL:** `/login` (también hay un enlace discreto "Admin" en el footer)
- **Usuario de demostración:**
  - Email: `admin@eminsa.com`
  - Contraseña: `eminsa2024`

### Funcionalidades del CMS
- ✅ **Noticias:** Crear, editar, eliminar, publicar/despublicar, destacar
- ✅ **Proyectos:** Crear, editar, eliminar, publicar/despublicar, destacar
- ✅ Filtros por categoría y división
- ✅ Búsqueda de contenido
- ✅ Vista previa de estado (publicado/borrador)
- ✅ Generación automática de URLs amigables (slugs)

### Estructura del Panel
```
/admin              → Dashboard principal
/admin/noticias     → Listado de noticias
/admin/noticias/nueva → Crear noticia
/admin/noticias/[id]  → Editar noticia
/admin/proyectos    → Listado de proyectos
/admin/proyectos/nuevo → Crear proyecto
/admin/proyectos/[id]  → Editar proyecto
```

## 🎨 Identidad Visual

### Colores Corporativos
- **Azul Principal (Reflex Blue):** `#001689`
- **Gris (Cool Gray 9):** `#76777A`
- **Cian Accent:** `#00A3E0`
- **Naranja Servicios:** `#FF5500`
- **Verde EIC:** `#00B140`

### Tipografía
- **Montserrat** (Regular y Bold)

## 🛠️ Tecnologías Utilizadas

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **LocalStorage** - Persistencia de datos (demo)

## 📁 Estructura de Carpetas

```
src/
├── app/                    # Páginas de Next.js
│   ├── page.tsx           # Página principal
│   ├── admin/             # Panel de administración
│   ├── login/             # Página de login
│   ├── noticias/          # Página pública de noticias
│   ├── proyectos/         # Página pública de proyectos
│   ├── mtn/               # División MTN
│   ├── servicios/         # División Servicios
│   └── cotizar/           # Formulario de cotización
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Secciones reutilizables
│   ├── admin/             # Componentes del admin
│   └── ui/                # Componentes UI
├── data/                  # Datos y configuración
└── lib/                   # Utilidades y contextos
    ├── auth-context.tsx   # Autenticación
    └── content-context.tsx # Gestión de contenido
```

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar en producción
npm start
```

## 📱 Características

### Sitio Público
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Animaciones suaves con Framer Motion
- ✅ Formulario de cotización completo
- ✅ Botón flotante de WhatsApp
- ✅ SEO optimizado
- ✅ Menú de navegación con dropdowns
- ✅ Secciones de servicios y productos
- ✅ Estadísticas y certificaciones
- ✅ Página de noticias con filtros
- ✅ Página de proyectos por división

### Panel de Administración
- ✅ Login seguro
- ✅ Dashboard con estadísticas
- ✅ CRUD completo de Noticias
- ✅ CRUD completo de Proyectos
- ✅ Publicar/Despublicar contenido
- ✅ Marcar contenido como destacado
- ✅ Búsqueda y filtros
- ✅ Interfaz moderna y fácil de usar

## 📄 Páginas Implementadas

### Públicas
1. **Página Principal** - Hero, divisiones, servicios, estadísticas, contacto
2. **MTN** - Productos de fabricación nacional
3. **Servicios** - Todos los servicios técnicos
4. **Cotizar** - Formulario completo de solicitud
5. **Noticias** - Listado de noticias con filtros
6. **Proyectos** - Portafolio de proyectos por división

### Administración
7. **Login** - Acceso al panel
8. **Dashboard** - Panel principal
9. **Gestión de Noticias** - CRUD completo
10. **Gestión de Proyectos** - CRUD completo

## ⚠️ Notas para Producción

El sistema actual usa **localStorage** para almacenar datos (demo). Para producción se recomienda:

1. Implementar una base de datos (PostgreSQL, MongoDB, etc.)
2. Crear API routes en Next.js para el backend
3. Implementar autenticación real (NextAuth.js, Clerk, etc.)
4. Agregar sistema de subida de imágenes (Cloudinary, S3, etc.)
5. Implementar validación de formularios más robusta

## 📞 Contacto

**Grupo EMINSA**
- Teléfono: +1 809-560-7773
- Email: info@eminsa.com
- Ubicación: Santo Domingo, República Dominicana

---

*Desarrollado para el proyecto de rediseño web de Grupo EMINSA*
>>>>>>> 626de26 (Primer commit del proyecto eminsa-web)
