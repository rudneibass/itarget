#!/bin/bash

echo "🔍 Verificando se o servidor está rodando..."
if curl -s http://localhost:3000/api > /dev/null 2>&1; then
    echo "✅ Servidor está rodando na porta 3000"
else
    echo "❌ Servidor não está respondendo na porta 3000"
    exit 1
fi

echo ""
echo "📚 Verificando documentação Swagger..."
if curl -s http://localhost:3000/docs > /dev/null 2>&1; then
    echo "✅ Swagger UI está acessível em http://localhost:3000/docs"
else
    echo "❌ Swagger UI não está acessível"
    exit 1
fi

echo ""
echo "📋 Verificando especificação JSON da API..."
if curl -s http://localhost:3000/docs-json | jq '.paths' > /dev/null 2>&1; then
    echo "✅ Especificação JSON está sendo gerada corretamente"
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
echo "🎉 Tudo está funcionando corretamente!"
echo ""
echo "📖 Para acessar a documentação:"
echo "   🌐 Abra seu navegador e acesse: http://localhost:3000/docs"
echo ""
echo "🔧 Endpoints disponíveis:"
echo "   POST http://localhost:3000/api/user/create"
echo "   DELETE http://localhost:3000/api/user/{id}"
echo ""
echo "💡 Dica: Se a página não carregar no navegador, tente:"
echo "   1. Limpar o cache do navegador"
echo "   2. Usar modo incógnito"
echo "   3. Verificar se não há bloqueadores de anúncios" 