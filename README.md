# Sistema de Monitoramento de Pressão Arterial 🩺

Um sistema para monitorar e acompanhar registros de pressão arterial, medicações e observações médicas.

## 🚀 Funcionalidades

- ✅ **Registro de Pressão Arterial**: Registre pressão sistólica, diastólica e pulso
- ✅ **Controle de Medicações**: Acompanhe medicamentos e horários
- ✅ **Notas e Observações**: Registre sintomas, dieta, exercícios
- ✅ **Sistema de Alertas**: Alertas automáticos para pressão alta/baixa
- ✅ **Dados de Usuário**: Perfil completo com condições médicas
- 📊 **Gráficos** (em desenvolvimento): Visualização dos dados ao longo do tempo

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### `user` - Usuários do Sistema
- Informações pessoais (nome, email, data de nascimento)
- Dados físicos (peso, altura)
- Condições médicas existentes

#### `blood_pressure_record` - Registros de Pressão
- Pressão sistólica e diastólica
- Pulso
- Horário da medição
- Posição durante a medição (sentado, deitado, em pé)
- Braço usado (esquerdo, direito)
- Se foi antes ou depois da medicação
- Observações

#### `medication_record` - Registros de Medicação
- Nome do medicamento
- Dosagem
- Frequência
- Horário que foi tomado
- Observações

#### `note` - Notas e Observações
- Título e conteúdo
- Categoria (sintoma, dieta, exercício, geral)
- Data da nota

#### `alert` - Sistema de Alertas
- Tipo de alerta (pressão alta, baixa, pulso irregular)
- Mensagem do alerta
- Severidade (baixa, média, alta, crítica)
- Status de leitura

## 🛠️ Configuração

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env` e configure:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/blood_pressure_ai"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Configurar Banco de Dados

#### Opção A: Banco Local (PostgreSQL)
1. Instale PostgreSQL
2. Crie um banco de dados:
```sql
CREATE DATABASE blood_pressure_ai;
```

#### Opção B: Banco na Nuvem (Recomendado)
Use um serviço como:
- [Neon](https://neon.tech/) (gratuito)
- [Supabase](https://supabase.com/) (gratuito)
- [Railway](https://railway.app/) (gratuito)

### 4. Executar Migrações
```bash
# Gerar arquivos de migração
npm run db:generate

# Aplicar migrações no banco
npm run db:push
```

### 5. Popular Banco com Dados de Exemplo
```bash
npm run db:seed
```

### 6. Executar o Projeto
```bash
npm run dev
```

## 📋 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Builda o projeto para produção
- `npm run start` - Inicia o servidor de produção
- `npm run db:generate` - Gera arquivos de migração
- `npm run db:push` - Aplica mudanças no banco (desenvolvimento)
- `npm run db:migrate` - Executa migrações (produção)
- `npm run db:studio` - Abre Drizzle Studio para visualizar dados
- `npm run db:seed` - Popula o banco com dados de exemplo

## 🔍 Visualizar Dados

### Drizzle Studio
Para visualizar e editar dados diretamente:
```bash
npm run db:studio
```

Isso abrirá uma interface web para explorar as tabelas e dados.

## 📊 Exemplos de Uso

### Registros de Pressão Arterial
- **Normal**: 120/80 mmHg
- **Elevada**: 130-139/80-89 mmHg
- **Hipertensão Estágio 1**: 140-159/90-99 mmHg
- **Hipertensão Estágio 2**: ≥160/≥100 mmHg

### Categorias de Notas
- `symptom` - Sintomas (dor de cabeça, tontura, etc.)
- `diet` - Alimentação (redução de sal, dieta específica)
- `exercise` - Exercícios físicos
- `general` - Observações gerais

### Tipos de Alertas
- `high_pressure` - Pressão arterial elevada
- `low_pressure` - Pressão arterial baixa
- `irregular_pulse` - Pulso irregular

## 🎯 Próximos Passos

1. **Interface Web**: Criar formulários para adicionar registros
2. **Gráficos**: Implementar visualizações com Chart.js ou Recharts
3. **Relatórios**: Gerar relatórios em PDF
4. **Notificações**: Lembretes para medicação
5. **Integração**: APIs de dispositivos de medição
6. **Mobile**: App mobile React Native

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.
