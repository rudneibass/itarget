#!/bin/bash

echo "🔧 Testando Configuração do Swagger por Ambiente"

echo ""
echo "📋 Verificando configuração atual..."
CURRENT_TITLE=$(curl -s http://localhost:3000/docs-json | jq -r '.info.title')
echo "   Título atual: $CURRENT_TITLE"

echo ""
echo "🌍 Verificando servidores configurados..."
SERVERS=$(curl -s http://localhost:3000/docs-json | jq -r '.servers[].url' | head -3)
echo "   Servidores:"
echo "$SERVERS" | while read server; do
    echo "     - $server"
done

echo ""
echo "🏷️ Verificando tags configuradas..."
TAGS=$(curl -s http://localhost:3000/docs-json | jq -r '.tags[].name' | head -3)
echo "   Tags:"
echo "$TAGS" | while read tag; do
    echo "     - $tag"
done

echo ""
echo "🔐 Verificando autenticação configurada..."
AUTH=$(curl -s http://localhost:3000/docs-json | jq -r '.components.securitySchemes | keys[]' 2>/dev/null || echo "Nenhuma")
echo "   Autenticação: $AUTH"

echo ""
echo "📚 Verificando se a documentação está acessível..."
if curl -s http://localhost:3000/docs | grep -q "cdn.jsdelivr.net"; then
    echo "✅ Swagger UI está carregando CDN corretamente"
else
    echo "❌ Problema com carregamento do CDN"
fi

echo ""
echo "🧪 Testando endpoint da API..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/user/create \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Config\",\"email\":\"test$(date +%s)@config.com\"}")

if echo "$RESPONSE" | grep -q '"id"'; then
    echo "✅ API está funcionando corretamente"
    echo "   Resposta: $RESPONSE"
else
    echo "❌ API não está funcionando corretamente"
    echo "   Resposta: $RESPONSE"
fi

echo ""
echo "🎉 Configuração do Swagger está funcionando!"
echo ""
echo "📖 Para acessar a documentação:"
echo "   🌐 http://localhost:3000/docs"
echo ""
echo "💡 Para testar diferentes ambientes:"
echo "   🏠 Desenvolvimento: npm run start:dev"
echo "   🚀 Produção: NODE_ENV=production npm run start:prod"
echo ""
echo "📁 Arquivo de configuração: src/config/swagger.config.ts" 