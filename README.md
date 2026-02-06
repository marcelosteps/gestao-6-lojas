# 🏪 Sistema de Gestão Financeira - 6 Lojas

> **Sistema web completo de DRE (Demonstração do Resultado do Exercício) para gestão integrada de múltiplos estabelecimentos**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://seu-usuario.github.io/gestao-6-lojas/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## ✨ Características

- 📊 **Dashboard Executivo** - KPIs e visão consolidada em tempo real
- 💰 **Lançamentos Online** - Registre receitas e despesas direto pelo navegador
- 📋 **Histórico Completo** - Todos os lançamentos com filtros por loja e tipo
- 🏪 **DRE Individual** - Demonstrativo completo para cada uma das 6 lojas
- 🎯 **DRE Consolidado** - Visão unificada de todo o grupo empresarial
- 📱 **100% Responsivo** - Funciona perfeitamente em celulares e tablets
- 💾 **Dados Locais** - Armazenamento no navegador (LocalStorage)
- 🚀 **Zero Instalação** - Acesse de qualquer lugar pelo link

## 🌐 Como Usar Online

### Acesso Direto
```
https://seu-usuario.github.io/gestao-6-lojas/
```

**Não precisa baixar nada! Funciona 100% no navegador!** 🎉

## 📥 Publicar no GitHub Pages

### PASSO 1: Criar Repositório

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"+"** → **"New repository"**
3. Preencha:
   - **Repository name**: `gestao-6-lojas`
   - **Description**: `Sistema Web de Gestão Financeira para 6 Lojas`
   - ☑️ **Public**
   - ⬜ **NÃO marque** "Add a README file"
4. Clique em **"Create repository"**

### PASSO 2: Upload dos Arquivos

1. Na página que abrir, clique em **"uploading an existing file"**
2. Arraste os 3 arquivos:
   - `index.html`
   - `app.js`
   - `README.md`
3. Escreva: `Sistema de gestão inicial`
4. Clique em **"Commit changes"**

### PASSO 3: Ativar GitHub Pages

1. Vá em **"Settings"** (aba no topo do repositório)
2. No menu lateral esquerdo, clique em **"Pages"**
3. Em **"Source"**, selecione:
   - Branch: **main**
   - Folder: **/ (root)**
4. Clique em **"Save"**
5. Aguarde 1-2 minutos

✅ **Pronto! Seu sistema estará online em:**
```
https://seu-usuario.github.io/gestao-6-lojas/
```

## 📱 Funcionalidades Detalhadas

### 1. 📊 Dashboard Executivo

**O que você vê:**
- 💵 Receita Total do Grupo
- 💰 Lucro Líquido Consolidado
- 📈 Margem Líquida (%)
- 📋 Total de Lançamentos

**Performance por Loja:**
- Cards individuais para cada loja
- Receita, Despesas e Lucro
- Margem de lucratividade

### 2. 💰 Novo Lançamento

**Campos do formulário:**
- 📅 Data
- 🏪 Loja (1 a 6)
- 📊 Tipo (Receita/Despesa/Custo)
- 🏷️ Categoria e Subcategoria
- ✍️ Descrição
- 💵 Valor
- 🎯 Centro de Custo
- 📝 Observações (opcional)

**Categorias disponíveis:**

**Receitas:**
- Vendas à Vista
- Vendas Cartão
- Vendas Prazo
- Outras

**Despesas:**
- Pessoal (salários, encargos)
- Benefícios
- Treinamento
- Aluguel
- Utilidades (luz, água, internet)
- Material (escritório, limpeza)
- Marketing e Publicidade
- Comissões
- Frete e Entregas
- Taxas Bancárias
- Seguros
- Depreciação
- Outras

**Custos:**
- CPV (Custo Produtos Vendidos)
- Serviços

### 3. 📋 Histórico de Lançamentos

**Recursos:**
- ✅ Tabela completa com todos os lançamentos
- 🔍 Filtro por Loja
- 🔍 Filtro por Tipo
- 🗑️ Excluir lançamentos
- 📊 Ordenação por data (mais recentes primeiro)
- 🎨 Badges coloridos por tipo

### 4. 🏪 DRE por Loja (6 abas)

**Estrutura do DRE:**
```
RECEITA OPERACIONAL BRUTA
(-) CUSTOS
= LUCRO BRUTO
(-) DESPESAS OPERACIONAIS
= LUCRO LÍQUIDO
```

**Visualização:**
- 📅 Breakdown mensal (Jan a Dez)
- 📊 Total anual
- 💰 Valores formatados em R$

### 5. 🎯 DRE Consolidado

**Visão do Grupo:**
- Soma de todas as 6 lojas
- Mesma estrutura dos DREs individuais
- Performance total do grupo empresarial

## 🎯 Como Fazer um Lançamento

### Exemplo 1: Registrar Vendas

```
Data: 06/02/2026
Loja: Loja 1
Tipo: Receita
Categoria: Receita
Subcategoria: Vendas à Vista
Descrição: Vendas do dia
Valor: 5000
Centro de Custo: Comercial
```

### Exemplo 2: Registrar Despesa

```
Data: 06/02/2026
Loja: Loja 1
Tipo: Despesa
Categoria: Despesa
Subcategoria: Marketing
Descrição: Anúncios Facebook - Campanha Fevereiro
Valor: 1500
Centro de Custo: Marketing
```

**⚠️ Importante:** 
- Valores de receita: positivos
- Valores de despesa/custo: **o sistema converte automaticamente para negativo**

## 💾 Armazenamento de Dados

### LocalStorage (Navegador)

Os dados ficam salvos no navegador (LocalStorage):
- ✅ Persistem entre sessões
- ✅ Não precisam de servidor
- ✅ Totalmente privados
- ⚠️ Vinculados ao navegador usado

### Backup Manual

**Para fazer backup:**
1. Abra o navegador (Chrome/Edge/Firefox)
2. Pressione **F12** (abre DevTools)
3. Vá na aba **"Console"**
4. Digite e execute:
```javascript
copy(localStorage.getItem('lancamentos'))
```
5. Cole em um arquivo `.txt` e salve

**Para restaurar backup:**
1. Abra o DevTools (F12)
2. Aba **"Console"**
3. Digite e execute:
```javascript
localStorage.setItem('lancamentos', 'COLE_AQUI_O_CONTEUDO_DO_BACKUP')
```
4. Recarregue a página

## 🔧 Personalização

### Adicionar Mais Lojas

No arquivo `app.js`, procure por:
```javascript
for (let i = 1; i <= 6; i++) {
```

Mude `6` para o número desejado (ex: `8` para 8 lojas).

### Adicionar Categorias

No arquivo `app.js`, edite o objeto `categoriasPorTipo`:

```javascript
const categoriasPorTipo = {
    "Receita": {
        "Receita": ["Vendas à Vista", "Vendas Cartão", "Nova Categoria"]
    },
    // ...
};
```

### Mudar Cores

No arquivo `index.html`, edite as variáveis CSS em `:root`:

```css
:root {
    --primary: #2C3E50;      /* Azul escuro */
    --secondary: #3498db;    /* Azul */
    --success: #27ae60;      /* Verde */
    --danger: #e74c3c;       /* Vermelho */
    --warning: #f39c12;      /* Laranja */
}
```

## 📊 Relatórios e Análises

### Exportar Dados

**Para análise em Excel:**
1. Abra DevTools (F12)
2. Console
3. Execute:
```javascript
const data = JSON.parse(localStorage.getItem('lancamentos'));
console.table(data);
```
4. Copie e cole no Excel

### Métricas Calculadas

O sistema calcula automaticamente:
- 📊 **Receita Total** - Soma de todas as receitas
- 💰 **Lucro Líquido** - Receita - Despesas - Custos
- 📈 **Margem Líquida** - (Lucro / Receita) × 100
- 🏪 **Performance por Loja** - Métricas individuais

## 🎓 Casos de Uso

### 🛍️ Varejo
- Lojas de roupas (múltiplas filiais)
- Supermercados/Mercados
- Farmácias
- Eletrônicos

### 🍔 Alimentação
- Restaurantes (várias unidades)
- Lanchonetes
- Cafeterias
- Food trucks

### 🏋️ Serviços
- Academias (múltiplas unidades)
- Clínicas/Consultórios
- Salões de beleza
- Escolas/Cursos

### 🏢 Franquias
- Gestão de franqueados
- Comparação entre unidades
- Consolidação para franqueador

## 📱 Compatibilidade

- ✅ Chrome / Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile (iOS / Android)
- ✅ Tablets

## 🆘 Solução de Problemas

### Dados não aparecem
1. Verifique se JavaScript está ativado
2. Limpe o cache (Ctrl+Shift+Del)
3. Tente outro navegador

### Site não carrega
1. Confirme que GitHub Pages está ativado
2. Aguarde 2-3 minutos após qualquer mudança
3. Acesse o link correto: `https://usuario.github.io/repositorio/`

### Perdi meus dados
1. Dados ficam no navegador (LocalStorage)
2. Se mudou de navegador, dados não migram
3. Faça backup regularmente (ver seção Backup)

## 🔐 Segurança e Privacidade

- ✅ Dados armazenados **localmente** no navegador
- ✅ Nenhuma informação enviada para servidores
- ✅ 100% privado
- ⚠️ Faça backups regulares
- ⚠️ Dados são vinculados ao navegador/dispositivo

## 🚀 Roadmap Futuro

- [ ] Exportar para Excel/PDF
- [ ] Gráficos e visualizações
- [ ] Projeções e metas
- [ ] Multi-usuário com login
- [ ] Sincronização em nuvem
- [ ] App mobile nativo
- [ ] Integração com APIs contábeis

## 📄 Licença

MIT License - Uso livre para qualquer finalidade

## 🤝 Contribuições

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 💬 Suporte

- 📧 Issues no GitHub
- 💬 Discussões na aba Discussions
- 📚 Documentação neste README

## ⭐ Mostre seu Apoio

Se este projeto foi útil, considere dar uma ⭐!

---

**Desenvolvido com ❤️ para facilitar a gestão financeira de empresas multi-lojas**

**🔗 Demo:** https://seu-usuario.github.io/gestao-6-lojas/
