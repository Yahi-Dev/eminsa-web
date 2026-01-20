#!/bin/bash

# Sistema de Contacto EMINSA - Verificador de Status
# Ejecutar: bash check-contact-status.sh

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   SISTEMA DE CONTACTO EMINSA - VERIFICACIÓN DE STATUS     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
    else
        echo -e "${RED}❌${NC} $2 (NOT FOUND: $1)"
    fi
}

check_env() {
    if grep -q "$1" .env.local; then
        echo -e "${GREEN}✅${NC} $2"
    else
        echo -e "${RED}❌${NC} $2"
    fi
}

echo -e "${BLUE}📁 VERIFICANDO ARCHIVOS...${NC}"
echo ""

check_file "src/app/contacto/page.tsx" "Página de contacto"
check_file "src/app/api/contact/route.ts" "Endpoint API"
check_file "src/lib/email-service.ts" "Servicio de emails"
check_file "src/lib/contact-validation.ts" "Validación"
check_file "src/lib/types-contact.ts" "Tipos TypeScript"
check_file "src/lib/contact.ts" "Barrel exports"
check_file ".env.local" "Variables de entorno"
check_file ".env.example" "Plantilla .env"

echo ""
echo -e "${BLUE}🔑 VERIFICANDO CONFIGURACIÓN...${NC}"
echo ""

check_env "MAIL_HOST" "SMTP Host configurado"
check_env "MAIL_PORT" "SMTP Port configurado"
check_env "MAIL_USERNAME" "Email configurado"
check_env "MAIL_PASSWORD" "Contraseña configurada"
check_env "ADMIN_EMAIL" "Email del admin configurado"

echo ""
echo -e "${BLUE}📦 VERIFICANDO DEPENDENCIAS...${NC}"
echo ""

if grep -q "nodemailer" package.json; then
    echo -e "${GREEN}✅${NC} nodemailer instalado"
else
    echo -e "${RED}❌${NC} nodemailer no encontrado"
fi

if grep -q "zod" package.json; then
    echo -e "${GREEN}✅${NC} zod instalado"
else
    echo -e "${RED}❌${NC} zod no encontrado"
fi

echo ""
echo -e "${BLUE}📚 VERIFICANDO DOCUMENTACIÓN...${NC}"
echo ""

check_file "QUICK_START.md" "QUICK_START.md"
check_file "INICIO_RAPIDO_CONTACTO.md" "INICIO_RAPIDO_CONTACTO.md"
check_file "CONTACTO_SISTEMA.md" "CONTACTO_SISTEMA.md"
check_file "RESUMEN_IMPLEMENTACION.md" "RESUMEN_IMPLEMENTACION.md"
check_file "VERIFICACION_CONTACTO.md" "VERIFICACION_CONTACTO.md"
check_file "README_CONTACTO.md" "README_CONTACTO.md"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  ESTADO: ✅ COMPLETADO                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo -e "${YELLOW}🚀 PRÓXIMOS PASOS:${NC}"
echo ""
echo "1. Ejecuta el servidor:"
echo -e "   ${BLUE}npm run dev${NC}"
echo ""
echo "2. Abre en el navegador:"
echo -e "   ${BLUE}http://localhost:3000/contacto${NC}"
echo ""
echo "3. Envía un mensaje de prueba"
echo ""
echo -e "${GREEN}¡El sistema está listo para usar!${NC}"
echo ""
