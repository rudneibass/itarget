#!/bin/bash

echo "🔍 Testando Swagger com CDN..."

echo ""
echo "📚 Verificando se a página HTML está carregando CDN..."
if curl -s http://localhost:3000/docs | grep -q "cdn.jsdelivr.net"; then
    echo "✅ CDN está sendo carregado corretamente"
else
    echo "❌ CDN não está sendo carregado"
    exit 1
fi

echo ""
echo "📋 Verificando especificação JSON da API..."
if curl -s http://localhost:3000/docs-json | jq '.info.title' > /dev/null 2>&1; then
    echo "✅ Especificação JSON está sendo gerada corretamente"
    TITLE=$(curl -s http://localhost:3000/docs-json | jq -r '.info.title')
    echo "   Título da API: $TITLE"
else
    echo "❌ Especificação JSON não está sendo gerada"
    exit 1
fi

echo ""
echo "🧪 Testando endpoint da API..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/user/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}')

if echo "$RESPONSE" | grep -q '"id"'; then
    echo "✅ API está funcionando corretamente"
    echo "   Resposta: $RESPONSE"
else
    echo "❌ API não está funcionando corretamente"
    echo "   Resposta: $RESPONSE"
    exit 1
fi

echo ""
echo "🎉 Swagger está funcionando corretamente com CDN!"
echo ""
echo "📖 Para acessar a documentação:"
echo "   🌐 Abra seu navegador e acesse: http://localhost:3000/docs"
echo ""
echo "💡 Agora o Swagger está usando CDN externo, então não deve haver mais"
echo "   problemas com arquivos estáticos não encontrados."
echo ""
echo "🔧 Endpoints disponíveis:"
echo "   POST http://localhost:3000/api/user/create"
echo "   DELETE http://localhost:3000/api/user/{id}" 