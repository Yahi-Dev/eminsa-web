#!/bin/bash

# Script para testing del sistema de contacto
# Ejecutar desde la raíz del proyecto: bash scripts/test-contact.sh

API_URL="http://localhost:3000/api/contact"
TIMESTAMP=$(date +%s)
TEST_EMAIL="test-${TIMESTAMP}@example.com"

echo "🧪 Testing Contact Form API"
echo "================================"
echo ""

# Test 1: GET endpoint info
echo "Test 1: GET /api/contact"
curl -s -X GET "$API_URL" | jq '.' || echo "Error"
echo ""

# Test 2: Valid contact submission
echo "Test 2: Valid contact submission"
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "empresa": "Test Company",
    "email": "'$TEST_EMAIL'",
    "telefono": "+1-809-123-4567",
    "tipoServicio": "Transformadores Nuevos (MTN)",
    "mensaje": "This is a test message with enough content to be valid according to our validation rules."
  }')
echo $RESPONSE | jq '.'
echo ""

# Test 3: Missing required field
echo "Test 3: Missing required field (nombre)"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "telefono": "+1-809-123-4567",
    "mensaje": "Test message"
  }' | jq '.'
echo ""

# Test 4: Invalid email
echo "Test 4: Invalid email format"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "invalid-email",
    "telefono": "+1-809-123-4567",
    "mensaje": "This is a test message with enough content to be valid."
  }' | jq '.'
echo ""

# Test 5: Message too short
echo "Test 5: Message too short"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "telefono": "+1-809-123-4567",
    "mensaje": "Short"
  }' | jq '.'
echo ""

# Test 6: Invalid HTTP method
echo "Test 6: Invalid HTTP method (PUT)"
curl -s -X PUT "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.'
echo ""

echo "================================"
echo "✅ Tests completed!"
echo ""
echo "Note: If Test 2 is successful, check your email:"
echo "- Customer email should be sent to: $TEST_EMAIL"
echo "- Admin email should be sent to: $ADMIN_EMAIL (from .env.local)"
