# Sistema de Contacto - Grupo EMINSA

## 📋 Descripción

Sistema completo de formulario de contacto para la página web de Grupo EMINSA con funcionalidad de envío de emails automáticos usando SMTP de Gmail.

## 🎯 Características

✅ **Formulario profesional y responsivo**
- Diseño acorde con la identidad visual de EMINSA
- Validación de datos en tiempo real
- Mensajes de error claros y precisos
- Interfaz intuitiva con feedback visual

✅ **Backend escalable**
- API REST para procesar contactos (`/api/contact`)
- Validación de datos con Zod (TypeScript seguro)
- Servicios de email con Nodemailer
- Manejo de errores robusto

✅ **Emails profesionales**
- Plantilla HTML personalizada para clientes
- Notificación al administrador
- Estilos consistentes con la marca
- Información detallada y estructurada

✅ **Seguridad**
- Validación de emails temporales (disposable)
- Sanitización de datos
- Rate limiting preparado
- IP del cliente registrado

## 🛠️ Instalación

### 1. Dependencias requeridas

Ya están instaladas:
```bash
npm install nodemailer zod
```

### 2. Configuración de variables de entorno

Crea o actualiza el archivo `.env.local` en la raíz del proyecto:

```env
# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=yahinnieltheking01@gmail.com
MAIL_PASSWORD=qkpgywpuhkjppvde
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=yahinnieltheking01@gmail.com
MAIL_FROM_NAME=Grupo EMINSA

# Website Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin Email (receive copy of messages)
ADMIN_EMAIL=yahinnieltheking01@gmail.com
```

**Nota importante para Gmail:**
- Si usas Gmail con autenticación de dos factores, debes generar una "contraseña de aplicación" en: https://myaccount.google.com/apppasswords
- La contraseña mostrada en la configuración es la contraseña de aplicación, no la contraseña de tu cuenta

### 3. Verificar configuración

Para verificar que todo está correctamente configurado, puedes ejecutar:

```bash
npm run dev
```

Luego navega a `/api/contact` en tu navegador. Deberías ver información sobre el endpoint.

## 📁 Estructura de archivos

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts              # Endpoint API POST
│   └── globals.css                   # Estilos globales (ya existentes)
│
├── components/
│   └── sections/
│       └── ContactSection.tsx        # Componente del formulario
│
└── lib/
    ├── types-contact.ts              # Tipos TypeScript
    ├── contact-validation.ts         # Validación de datos
    └── email-service.ts              # Servicio de emails
```

## 🔌 API Endpoint

### POST `/api/contact`

Endpoint para enviar solicitudes de contacto.

**Request:**
```json
{
  "nombre": "Juan Pérez",
  "empresa": "Empresa XYZ",
  "email": "juan@example.com",
  "telefono": "+1 809-123-4567",
  "tipoServicio": "Transformadores Nuevos (MTN)",
  "mensaje": "Quisiera solicitar información sobre..."
}
```

**Validaciones:**
- `nombre`: Requerido, 2-100 caracteres
- `empresa`: Opcional, máx 100 caracteres
- `email`: Requerido, formato válido
- `telefono`: Requerido, 7-20 caracteres (solo dígitos y símbolos)
- `tipoServicio`: Opcional, máx 50 caracteres
- `mensaje`: Requerido, 10-5000 caracteres

**Response (Éxito):**
```json
{
  "success": true,
  "message": "Tu solicitud ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Los datos del formulario no son válidos",
  "errors": {
    "nombre": "El nombre debe tener al menos 2 caracteres",
    "email": "Por favor ingresa un email válido"
  }
}
```

## 🎨 Componentes

### ContactSection.tsx

Componente React que contiene:
- Sección de información de contacto (izquierda)
- Formulario de contacto (derecha)
- Manejo de estado del formulario
- Gestión de errores y envío

**Props:** Ninguna (usa datos del contexto de navegación)

**Estados:**
- `formData`: Datos del formulario
- `isSubmitting`: Indica si está procesando
- `isSubmitted`: Indica si se envió exitosamente
- `errorMessage`: Mensaje de error general
- `formErrors`: Errores por campo

## 📧 Plantillas de Email

### Email del Cliente
- Confirmación de recepción
- Resumen de datos enviados
- Información de contacto alternativa
- Información de tiempo de respuesta

### Email del Administrador
- Datos completos del cliente
- Contenido del mensaje
- IP del cliente
- Timestamp de envío
- Link para responder directamente

## 🔒 Buenas prácticas implementadas

✅ **Validación en dos capas**
- Cliente: Validación HTML5 + Zod
- Servidor: Validación Zod completa

✅ **Manejo de errores**
- Mensajes de error claros para el usuario
- Logging en servidor para debugging
- No expone detalles técnicos al cliente

✅ **Rendimiento**
- useCallback para optimizar renders
- Estilos con Tailwind CSS
- Animaciones con Framer Motion

✅ **Accesibilidad**
- Labels asociados correctamente
- Atributos ARIA preparados
- Validación clara de campos

✅ **SEO**
- Formulario semántico
- Meta información adecuada
- URLs limpias

## 📝 Customización

### Cambiar servicios disponibles

En `ContactSection.tsx`, modifica las opciones del select:

```tsx
<option value="Transformadores Nuevos (MTN)">Transformadores Nuevos (MTN)</option>
<option value="Reparación (ETRYS)">Reparación (ETRYS)</option>
// Agrega más opciones aquí
```

### Cambiar plantillas de email

Modifica las funciones en `src/lib/email-service.ts`:
- `getCustomerEmailTemplate()` - Email al cliente
- `getAdminEmailTemplate()` - Email al admin

### Agregar más campos

1. Agrega el campo en el estado `FormState`
2. Agrega validación en `contactFormSchema` (zod)
3. Agrega el input en el formulario
4. Incluye en el email

## 🐛 Troubleshooting

### Los emails no se envían

**Problema:** Error de autenticación SMTP
**Solución:**
- Verifica que las credenciales en `.env.local` sean correctas
- Para Gmail, asegúrate de usar una "contraseña de aplicación"
- Verifica que el puerto sea 465 para SSL

**Problema:** Error de certificado SSL
**Solución:**
- En desarrollo, puedes agregar a `.env.local`:
  ```env
  NODE_TLS_REJECT_UNAUTHORIZED=0
  ```
- En producción, asegúrate que el servidor SMTP tenga certificado válido

### El formulario no responde

**Problema:** El botón de envío no funciona
**Solución:**
- Abre la consola del navegador (F12) y busca errores
- Verifica que `/api/contact` esté disponible
- Revisa los logs del servidor con `npm run dev`

### Validación muy estricta

Para relajar la validación, modifica `contactFormSchema` en `src/lib/contact-validation.ts`:

```typescript
// Ejemplo: reducir caracteres mínimos del mensaje
mensaje: z
  .string()
  .min(5, 'El mensaje debe tener al menos 5 caracteres')
  .max(5000, 'El mensaje no puede exceder 5000 caracteres')
  .trim(),
```

## 🚀 Deployment

### Variables de entorno en producción

Configura estas variables en tu plataforma de hosting:
- MAIL_HOST
- MAIL_PORT
- MAIL_USERNAME
- MAIL_PASSWORD
- MAIL_FROM_ADDRESS
- MAIL_FROM_NAME
- ADMIN_EMAIL
- NEXT_PUBLIC_SITE_URL

### En Vercel

1. Ve a Configuración del Proyecto
2. Variables de Entorno
3. Agrega todas las variables de .env.local
4. Deploy

## 📊 Monitoreo

### Logs recomendados

En `src/app/api/contact/route.ts`, los logs incluyen:
- IP del cliente que envía solicitud
- Errores de validación
- Errores de email

Para producción, considera agregar:
- Base de datos para almacenar solicitudes
- Servicio de logging (Sentry, LogRocket, etc.)
- Alertas por email en caso de errores

## 🎓 Extensiones futuras

- [ ] Google reCAPTCHA v3 para anti-spam
- [ ] Base de datos para historial de contactos
- [ ] Panel de admin para revisar solicitudes
- [ ] Envío de propuesta automática por email
- [ ] Integración con CRM
- [ ] Archivos adjuntos
- [ ] Múltiples idiomas
- [ ] WebhooksPara zapier/Make

## 📄 Licencia

Proyecto privado de Grupo EMINSA

## 📞 Contacto

Para soporte técnico:
- Email: info@eminsa.com
- Teléfono: +1 809-560-7773
- WhatsApp: +1 809-560-7773
