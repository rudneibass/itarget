# Path Aliases e Configuração de Testes

Este documento descreve as configurações implementadas para path aliases e testes no projeto NestJS.

## Alterações Implementadas

### 1. tsconfig.json
**Alteração:** Adicionado `paths` mapping para `@src/*`

```json
{
  "compilerOptions": {
    // ... outras configurações existentes ...
    "paths": {
      "@src/*": ["src/*"]
    }
  }
}
```

### 2. nest-cli.json
**Alteração:** Configurado webpack para suportar path aliases

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": true,
    "webpackConfigPath": "webpack.config.js"
  }
}
```

### 3. webpack.config.js
**Arquivo criado:** Configuração do webpack para path aliases

```javascript
const path = require('path');

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

  return {
    ...options,
    externals: {},
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
    resolve: {
      ...options.resolve,
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
  };
};
```

### 4. package.json
**Alteração:** Configuração do Jest para testes unitários e de integração

```json
{
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "^@src/(.*)$": "<rootDir>/$1"
    },
    "modulePaths": ["<rootDir>"]
  }
}
```

### 5. test/jest-e2e.json
**Alteração:** Configuração do Jest para testes e2e

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "moduleNameMapper": {
    "^@src/(.*)$": "<rootDir>/../src/$1"
  },
  "modulePaths": ["<rootDir>/../src"]
}
```

## Path Aliases

### Configuração Implementada

1. **tsconfig.json**: Adicionado path mapping para `@src/*`
2. **nest-cli.json**: Configurado webpack para suportar path aliases
3. **webpack.config.js**: Criado para configurar aliases no webpack

### Como Usar

Agora você pode usar o path alias `@src` em suas importações:

```typescript
// Antes
import { AppModule } from '../../../src/app.module';

// Depois
import { AppModule } from '@src/app.module';
```

## Configuração de Testes

### Testes Unitários

- Configurados no `package.json` com `moduleNameMapper` para path aliases
- Comando: `npm test`

### Testes de Integração

- Usam a mesma configuração dos testes unitários
- Comando: `npm test`

### Testes E2E

- Configurados em `test/jest-e2e.json`
- Comando: `npm run test:e2e`
- **Nota**: Requer banco de dados PostgreSQL rodando

### Scripts Disponíveis

```bash
# Testes unitários e de integração
npm test

# Testes unitários em modo watch
npm run test:watch

# Testes com cobertura
npm run test:cov

# Testes e2e
npm run test:e2e

# Testes em modo debug
npm run test:debug
```

## Estrutura de Arquivos

```
backend-javascript/
├── src/
│   ├── app.module.ts
│   ├── app.module.spec.ts (exemplo de teste unitário)
│   └── ...
├── test/
│   ├── jest-e2e.json
│   └── account/user/create-user.e2e-spec.ts (exemplo de teste e2e)
├── tsconfig.json (path aliases configurados)
├── nest-cli.json (webpack configurado)
├── webpack.config.js (aliases do webpack)
└── package.json (configuração do Jest)
```

## Exemplos de Uso

### Teste Unitário
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
```

### Teste E2E
```typescript
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/create')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456',
      });

    expect(response.status).toBe(201);
  });
});
```

## Resumo das Alterações

| Arquivo | Alteração | Propósito |
|---------|-----------|-----------|
| `tsconfig.json` | Adicionado `paths` | Configurar path mapping para TypeScript |
| `nest-cli.json` | Adicionado `webpack` e `webpackConfigPath` | Habilitar webpack com configuração customizada |
| `webpack.config.js` | Arquivo criado | Configurar aliases no webpack para build |
| `package.json` | Adicionado `moduleNameMapper` e `modulePaths` | Configurar Jest para testes unitários |
| `test/jest-e2e.json` | Adicionado `moduleNameMapper` e `modulePaths` | Configurar Jest para testes e2e | 