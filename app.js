// Sistema de Gestão 6 Lojas - JavaScript

// Estrutura de dados
const categoriasPorTipo = {
    "Receita": {
        "Receita": ["Vendas à Vista", "Vendas Cartão", "Vendas Prazo", "Outras"]
    },
    "Despesa": {
        "Despesa": ["Pessoal", "Benefícios", "Treinamento", "Aluguel", "Utilidades", 
                    "Material", "Comunicação", "Manutenção", "Marketing", "Comissões", 
                    "Frete", "Taxas", "Seguros", "Depreciação", "Outras"]
    },
    "Custo": {
        "Custo": ["CPV", "Serviços"]
    }
};

// Storage
let lancamentos = JSON.parse(localStorage.getItem('lancamentos')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Set data atual
    document.getElementById('data').valueAsDate = new Date();
    
    // Render dashboard
    updateDashboard();
    renderHistorico();
    
    // Form submit
    document.getElementById('lancamentoForm').addEventListener('submit', handleSubmit);
});

// Tabs
function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
    
    // Render DRE se necessário
    if (tabId.startsWith('dre-loja')) {
        const lojaNum = tabId.replace('dre-loja', '');
        renderDRE(`Loja ${lojaNum}`, `dre-content-loja${lojaNum}`);
    } else if (tabId === 'consolidado') {
        renderDREConsolidado();
    }
}

// Update categorias baseado no tipo
function updateCategorias() {
    const tipo = document.getElementById('tipo').value;
    const categoriaSelect = document.getElementById('categoria');
    const subcategoriaSelect = document.getElementById('subcategoria');
    
    categoriaSelect.innerHTML = '<option value="">Selecione...</option>';
    subcategoriaSelect.innerHTML = '<option value="">Selecione a categoria primeiro...</option>';
    
    if (tipo && categoriasPorTipo[tipo]) {
        Object.keys(categoriasPorTipo[tipo]).forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoriaSelect.appendChild(option);
        });
    }
}

// Update subcategorias baseado na categoria
function updateSubcategorias() {
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categoria').value;
    const subcategoriaSelect = document.getElementById('subcategoria');
    
    subcategoriaSelect.innerHTML = '<option value="">Selecione...</option>';
    
    if (tipo && categoria && categoriasPorTipo[tipo][categoria]) {
        categoriasPorTipo[tipo][categoria].forEach(subcat => {
            const option = document.createElement('option');
            option.value = subcat;
            option.textContent = subcat;
            subcategoriaSelect.appendChild(option);
        });
    }
}

// Handle form submit
function handleSubmit(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo').value;
    let valor = parseFloat(document.getElementById('valor').value);
    
    // Se for despesa ou custo, tornar negativo
    if ((tipo === 'Despesa' || tipo === 'Custo') && valor > 0) {
        valor = -valor;
    }
    
    const lancamento = {
        id: Date.now(),
        data: document.getElementById('data').value,
        loja: document.getElementById('loja').value,
        categoria: document.getElementById('categoria').value,
        subcategoria: document.getElementById('subcategoria').value,
        descricao: document.getElementById('descricao').value,
        valor: valor,
        tipo: tipo,
        centroCusto: document.getElementById('centroCusto').value,
        observacoes: document.getElementById('observacoes').value
    };
    
    lancamentos.push(lancamento);
    localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
    
    // Show success message
    const alert = document.getElementById('successAlert');
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), 3000);
    
    // Reset form
    document.getElementById('lancamentoForm').reset();
    document.getElementById('data').valueAsDate = new Date();
    
    // Update dashboard
    updateDashboard();
    renderHistorico();
}

// Render histórico
function renderHistorico() {
    const container = document.getElementById('historicoContainer');
    const filtroLoja = document.getElementById('filtroLoja').value;
    const filtroTipo = document.getElementById('filtroTipo').value;
    
    let filtered = lancamentos.filter(l => {
        if (filtroLoja && l.loja !== filtroLoja) return false;
        if (filtroTipo && l.tipo !== filtroTipo) return false;
        return true;
    });
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3>Nenhum lançamento encontrado</h3>
                <p>Faça seu primeiro lançamento na aba "Novo Lançamento"</p>
            </div>
        `;
        return;
    }
    
    // Sort by date desc
    filtered.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Loja</th>
                    <th>Tipo</th>
                    <th>Subcategoria</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Centro</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    filtered.forEach(l => {
        const badgeClass = l.tipo === 'Receita' ? 'badge-receita' : 
                          l.tipo === 'Despesa' ? 'badge-despesa' : 'badge-custo';
        
        html += `
            <tr>
                <td>${formatDate(l.data)}</td>
                <td>${l.loja}</td>
                <td><span class="badge ${badgeClass}">${l.tipo}</span></td>
                <td>${l.subcategoria}</td>
                <td>${l.descricao}</td>
                <td style="font-weight: bold; color: ${l.valor >= 0 ? '#27ae60' : '#e74c3c'}">
                    ${formatMoney(l.valor)}
                </td>
                <td>${l.centroCusto}</td>
                <td>
                    <button class="delete-btn" onclick="deleteLancamento(${l.id})">🗑️</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Delete lançamento
function deleteLancamento(id) {
    if (confirm('Tem certeza que deseja excluir este lançamento?')) {
        lancamentos = lancamentos.filter(l => l.id !== id);
        localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
        renderHistorico();
        updateDashboard();
    }
}

// Update dashboard
function updateDashboard() {
    const stats = calculateStats();
    
    document.getElementById('kpi-receita-total').textContent = formatMoney(stats.receitaTotal);
    document.getElementById('kpi-lucro').textContent = formatMoney(stats.lucroLiquido);
    document.getElementById('kpi-margem').textContent = `${stats.margemLiquida.toFixed(2)}%`;
    document.getElementById('kpi-lancamentos').textContent = lancamentos.length;
    
    // Render performance por loja
    const container = document.getElementById('lojas-performance');
    let html = '';
    
    for (let i = 1; i <= 6; i++) {
        const loja = `Loja ${i}`;
        const lojaStats = calculateLojaStats(loja);
        
        html += `
            <div class="loja-card">
                <h4>🏪 ${loja}</h4>
                <div class="loja-stat">
                    <span>Receita</span>
                    <strong style="color: #27ae60">${formatMoney(lojaStats.receita)}</strong>
                </div>
                <div class="loja-stat">
                    <span>Despesas</span>
                    <strong style="color: #e74c3c">${formatMoney(lojaStats.despesas)}</strong>
                </div>
                <div class="loja-stat">
                    <span>Lucro</span>
                    <strong style="color: ${lojaStats.lucro >= 0 ? '#27ae60' : '#e74c3c'}">
                        ${formatMoney(lojaStats.lucro)}
                    </strong>
                </div>
                <div class="loja-stat">
                    <span>Margem</span>
                    <strong>${lojaStats.margem.toFixed(1)}%</strong>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Calculate stats
function calculateStats() {
    const receitas = lancamentos.filter(l => l.tipo === 'Receita').reduce((sum, l) => sum + l.valor, 0);
    const despesas = lancamentos.filter(l => l.tipo === 'Despesa').reduce((sum, l) => sum + Math.abs(l.valor), 0);
    const custos = lancamentos.filter(l => l.tipo === 'Custo').reduce((sum, l) => sum + Math.abs(l.valor), 0);
    
    const receitaTotal = receitas;
    const lucroLiquido = receitas - despesas - custos;
    const margemLiquida = receitaTotal > 0 ? (lucroLiquido / receitaTotal) * 100 : 0;
    
    return { receitaTotal, lucroLiquido, margemLiquida };
}

// Calculate loja stats
function calculateLojaStats(loja) {
    const lojaLancamentos = lancamentos.filter(l => l.loja === loja);
    
    const receita = lojaLancamentos.filter(l => l.tipo === 'Receita').reduce((sum, l) => sum + l.valor, 0);
    const despesas = lojaLancamentos.filter(l => l.tipo === 'Despesa').reduce((sum, l) => sum + Math.abs(l.valor), 0);
    const custos = lojaLancamentos.filter(l => l.tipo === 'Custo').reduce((sum, l) => sum + Math.abs(l.valor), 0);
    
    const lucro = receita - despesas - custos;
    const margem = receita > 0 ? (lucro / receita) * 100 : 0;
    
    return { receita, despesas, custos, lucro, margem };
}

// Render DRE
function renderDRE(loja, containerId) {
    const container = document.getElementById(containerId);
    const lojaLancamentos = lancamentos.filter(l => l.loja === loja);
    
    // Calculate values by month
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const valores = {};
    
    // Initialize
    meses.forEach(mes => valores[mes] = {});
    
    // Populate
    lojaLancamentos.forEach(l => {
        const mes = meses[new Date(l.data).getMonth()];
        if (!valores[mes][l.subcategoria]) valores[mes][l.subcategoria] = 0;
        valores[mes][l.subcategoria] += l.valor;
    });
    
    // Calculate totals
    const totais = {};
    meses.forEach(mes => {
        totais[mes] = {
            receita: 0,
            despesas: 0,
            custos: 0
        };
        
        Object.keys(valores[mes]).forEach(subcat => {
            const val = valores[mes][subcat];
            const lancamento = lojaLancamentos.find(l => l.subcategoria === subcat);
            if (lancamento) {
                if (lancamento.tipo === 'Receita') totais[mes].receita += val;
                else if (lancamento.tipo === 'Despesa') totais[mes].despesas += Math.abs(val);
                else if (lancamento.tipo === 'Custo') totais[mes].custos += Math.abs(val);
            }
        });
    });
    
    let html = `
        <div class="dre-table">
            <h3>Demonstração do Resultado do Exercício - ${loja}</h3>
            
            <div class="dre-row header">
                <div class="dre-cell">CONTA</div>
                ${meses.map(m => `<div class="dre-cell">${m}</div>`).join('')}
                <div class="dre-cell">TOTAL</div>
            </div>
    `;
    
    // RECEITAS
    html += renderDRELine('RECEITA OPERACIONAL BRUTA', totais, 'receita', true);
    html += renderDRELine('(-) CUSTOS', totais, 'custos', false);
    
    const lucrosBrutos = {};
    meses.forEach(mes => {
        lucrosBrutos[mes] = totais[mes].receita - totais[mes].custos;
    });
    html += renderDRELineCustom('LUCRO BRUTO', lucrosBrutos, true);
    
    html += renderDRELine('(-) DESPESAS OPERACIONAIS', totais, 'despesas', false);
    
    const lucrosLiquidos = {};
    meses.forEach(mes => {
        lucrosLiquidos[mes] = totais[mes].receita - totais[mes].custos - totais[mes].despesas;
    });
    html += renderDRELineCustom('LUCRO LÍQUIDO', lucrosLiquidos, true);
    
    html += '</div>';
    container.innerHTML = html;
}

// Render DRE line
function renderDRELine(label, totais, key, isTotal) {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const classe = isTotal ? 'total' : 'subtotal';
    
    let total = 0;
    let html = `<div class="dre-row ${classe}">
        <div class="dre-cell">${label}</div>`;
    
    meses.forEach(mes => {
        const valor = totais[mes][key] || 0;
        total += valor;
        html += `<div class="dre-cell">${formatMoney(valor)}</div>`;
    });
    
    html += `<div class="dre-cell">${formatMoney(total)}</div></div>`;
    return html;
}

// Render DRE line custom
function renderDRELineCustom(label, valores, isTotal) {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const classe = isTotal ? 'total' : 'subtotal';
    
    let total = 0;
    let html = `<div class="dre-row ${classe}">
        <div class="dre-cell">${label}</div>`;
    
    meses.forEach(mes => {
        const valor = valores[mes] || 0;
        total += valor;
        html += `<div class="dre-cell">${formatMoney(valor)}</div>`;
    });
    
    html += `<div class="dre-cell">${formatMoney(total)}</div></div>`;
    return html;
}

// Render DRE Consolidado
function renderDREConsolidado() {
    const container = document.getElementById('dre-consolidado-content');
    
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const totais = {};
    
    // Initialize
    meses.forEach(mes => {
        totais[mes] = { receita: 0, despesas: 0, custos: 0 };
    });
    
    // Sum all lojas
    for (let i = 1; i <= 6; i++) {
        const loja = `Loja ${i}`;
        const lojaLancamentos = lancamentos.filter(l => l.loja === loja);
        
        lojaLancamentos.forEach(l => {
            const mes = meses[new Date(l.data).getMonth()];
            if (l.tipo === 'Receita') totais[mes].receita += l.valor;
            else if (l.tipo === 'Despesa') totais[mes].despesas += Math.abs(l.valor);
            else if (l.tipo === 'Custo') totais[mes].custos += Math.abs(l.valor);
        });
    }
    
    let html = `
        <div class="dre-table">
            <h3>DRE CONSOLIDADO - GRUPO (6 Lojas)</h3>
            
            <div class="dre-row header">
                <div class="dre-cell">CONTA</div>
                ${meses.map(m => `<div class="dre-cell">${m}</div>`).join('')}
                <div class="dre-cell">TOTAL</div>
            </div>
    `;
    
    html += renderDRELine('RECEITA OPERACIONAL BRUTA', totais, 'receita', true);
    html += renderDRELine('(-) CUSTOS', totais, 'custos', false);
    
    const lucrosBrutos = {};
    meses.forEach(mes => {
        lucrosBrutos[mes] = totais[mes].receita - totais[mes].custos;
    });
    html += renderDRELineCustom('LUCRO BRUTO', lucrosBrutos, true);
    
    html += renderDRELine('(-) DESPESAS OPERACIONAIS', totais, 'despesas', false);
    
    const lucrosLiquidos = {};
    meses.forEach(mes => {
        lucrosLiquidos[mes] = totais[mes].receita - totais[mes].custos - totais[mes].despesas;
    });
    html += renderDRELineCustom('LUCRO LÍQUIDO', lucrosLiquidos, true);
    
    html += '</div>';
    container.innerHTML = html;
}

// Format money
function formatMoney(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
}
