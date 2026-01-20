# 🚀 GUÍA DE INICIO RÁPIDO - SISTEMA DE CONTACTO

## ¿Qué se ha implementado?

Un sistema completo de contacto con **envío de emails real** usando tu cuenta de Gmail. El formulario está en:
- **Página dedicada:** `http://localhost:3000/contacto`
- **Página de inicio:** Scrollear hasta la sección de contacto

---

## ⚡ Requisitos

El archivo `.env.local` ya está configurado con tus credenciales. Simplemente asegúrate que:

1. **MAIL_PASSWORD es una contraseña de aplicación, NO tu contraseña de Gmail**
   - Si no la tienes, crea una en: https://myaccount.google.com/apppasswords
   - Selecciona "Mail" → "Windows Computer"
   - Copia la contraseña generada

2. **Verifica que esté en `.env.local`:**
   ```env
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=465
   MAIL_USERNAME=yahinnieltheking01@gmail.com
   MAIL_PASSWORD=qkpgywpuhkjppvde
   MAIL_FROM_ADDRESS=yahinnieltheking01@gmail.com
   MAIL_FROM_NAME=Grupo EMINSA
   ADMIN_EMAIL=yahinnieltheking01@gmail.com
   ```

---

## 🎯 Pasos para ejecutar

### 1. Inicia el servidor
```bash
npm run dev
```

### 2. Abre el navegador
```
http://localhost:3000/contacto
```

### 3. Envía un mensaje de prueba
- Completa el formulario
- Haz clic en "Enviar Solicitud"
- Recibirás:
  - ✅ Email de confirmación en tu inbox
  - ✅ Notificación al admin (ADMIN_EMAIL)

---

## 📧 ¿Qué emails recibirás?

### Cliente (quien llena el formulario)
- Email con confirmación de recepción
- Resumen de lo que envió
- Datos de contacto alternativo (teléfono, WhatsApp)
- Información de tiempo de respuesta

### Admin (ADMIN_EMAIL)
- Notificación inmediata
- Datos completos del cliente
- Contenido del mensaje
- Link para responder

---

## ✨ Características del formulario

✅ **Validación inteligente**
- Valida datos en tiempo real
- Rechaza emails temporales (hotmail de 10 minutos, etc.)
- Mensajes de error claros por campo

✅ **Responsive**
- Funciona perfecto en móvil, tablet y desktop
- Diseño coherente con EMINSA

✅ **Seguridad**
- Sanitización de datos
- Validación en servidor
- Manejo seguro de credenciales

✅ **UX Mejorada**
- Animaciones suaves
- Indicador de caracteres en mensaje
- Feedback visual de carga
- Mensaje de éxito personalizado

---

## 🛠️ Archivos clave creados

| Archivo | Descripción |
|---------|-------------|
| `/src/app/api/contact/route.ts` | Endpoint que procesa los emails |
| `/src/app/contacto/page.tsx` | Página de contacto |
| `/src/components/sections/ContactSection.tsx` | Componente mejorado |
| `/src/lib/email-service.ts` | Servicio de emails |
| `/src/lib/contact-validation.ts` | Validación de datos |
| `/src/lib/types-contact.ts` | Tipos TypeScript |
| `.env.local` | Variables de entorno |

---

## 🧪 Testing rápido

### Opción 1: Formulario web (recomendado)
1. Ve a `http://localhost:3000/contacto`
2. Completa y envía

### Opción 2: API direct (curl)
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+1-809-123-4567",
    "mensaje": "Este es un mensaje de prueba con suficientes caracteres para ser válido."
  }'
```

### Opción 3: Script de prueba
```bash
bash scripts/test-contact.sh
```

---

## 🐛 Solucionar problemas

### No recibo los emails
1. Verifica que `.env.local` tenga credenciales correctas
2. Para Gmail: la contraseña debe ser de aplicación, no tu contraseña
3. Revisa la consola de desarrollo (F12) para ver errores

### El formulario dice "Email no válido"
- Algunos emails de disposable (temporales) son rechazados por seguridad
- Usa un email real

### El servidor no inicia
```bash
# Limpia y reinstala
rm -rf node_modules .next
npm install
npm run dev
```

---

## 📱 Funcionalidades adicionales

El formulario también incluye:
- **Botón de WhatsApp:** Link directo a chat
- **Información de contacto:** Teléfono, email, ubicación, horarios
- **Información de servicios:** Tipos de servicio disponibles

---

## 🎨 Personalización

### Cambiar servicios disponibles
En `ContactSection.tsx` (línea ~150):
```tsx
<option value="Tu Servicio">Tu Servicio</option>
```

### Cambiar plantilla de emails
En `email-service.ts`:
- `getCustomerEmailTemplate()` - Email al cliente
- `getAdminEmailTemplate()` - Email al admin

### Agregar más campos
1. Agrega en el estado `FormState`
2. Agrega validación en `contactFormSchema`
3. Agrega input en JSX

---

## 📞 Referencias

- **Documentación completa:** Ver `CONTACTO_SISTEMA.md`
- **Verificación:** Ver `VERIFICACION_CONTACTO.md`
- **API Endpoint:** `POST /api/contact`

---

## ✅ Checklist final

- [ ] `.env.local` tiene credenciales correctas
- [ ] `npm run dev` funciona sin errores
- [ ] Puedes acceder a `http://localhost:3000/contacto`
- [ ] El formulario se envía sin errores
- [ ] Recibes email de confirmación
- [ ] El admin recibe notificación

**¡Listo! Tu sistema de contacto está completamente funcional.** 🎉
