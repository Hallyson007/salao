// ==================== CONFIGURAÇÕES ====================
const CONFIG = {
  STORAGE_KEY: 'territorios_monte_castelo',
  HISTORY_KEY: 'territorios_history',
  MAX_HISTORY: 50,
  TOAST_DURATION: 2500,
  TOOLTIP_DELAY: 350
};

const MAP_LINKS = {
  1: 'https://maps.app.goo.gl/XXZFyFwbCjsePvyq8',
  2: 'https://maps.app.goo.gl/5RfgEJun9nYpD6Dk8',
  3: 'https://maps.app.goo.gl/bUaHrWpoq2nHzmH66',
  4: 'https://maps.app.goo.gl/bKGM7NxE6vvUc9uw7',
  5: 'https://maps.app.goo.gl/jKBjRV7FdqfFGux98',
  6: 'https://maps.app.goo.gl/uzgpAzA4zmQBUqgTA',
  7: 'https://maps.app.goo.gl/fgZWwebRsoHjUweL6',
  8: 'https://maps.app.goo.gl/VsP5Zc7P9gkjJ59B7'
};

const INITIAL_TERRITORIES = {
  t1: { id: "t1", numero: 1, nome: "SR", cep: "60325-110", cor: "#48bb78", addresses: [], diasTrabalhados: [], fixado: false },
  t2: { id: "t2", numero: 2, nome: "Amaro Cavalcante", cep: "60325-120", cor: "#4299e1", addresses: [], diasTrabalhados: [], fixado: false },
  t3: { id: "t3", numero: 3, nome: "Casa da ração", cep: "60325-130", cor: "#ed8936", addresses: [], diasTrabalhados: [], fixado: false },
  t4: { id: "t4", numero: 4, nome: "Correios x Chico Alves", cep: "60325-140", cor: "#9c6644", addresses: [], diasTrabalhados: [], fixado: false },
  t5: { id: "t5", numero: 5, nome: "Carneiro da Cunha", cep: "60325-150", cor: "#ecc94b", addresses: [], diasTrabalhados: [], fixado: false },
  t6: { id: "t6", numero: 6, nome: "Morro do Ouro", cep: "60325-160", cor: "#f56565", addresses: [], diasTrabalhados: [], fixado: false },
  t7: { id: "t7", numero: 7, nome: "Frangolândia", cep: "60325-170", cor: "#9f7aea", addresses: [], diasTrabalhados: [], fixado: false },
  t8: { id: "t8", numero: 8, nome: "Pdr Anchieta x Bezerra", cep: "60325-180", cor: "#ed64a6", addresses: [], diasTrabalhados: [], fixado: false }
};

const STATUS_LABELS = {
  'nao-visitado': '📘 Não Visitado',
  'ausente': '🚪 Ausente',
  'conversado': '💬 Conversado',
  'carta': '✉️ Deixou Carta',
  'folheto': '📄 Deixou Folheto',
  'recusou': '🚫 Recusou',
  'estudo': '📚 Estudo'
};

const PORTARIA_TYPES = {
  'porteiro': '👨💼 Porteiro',
  'eletronica': '🔐 Eletrônica',
  'interfone': '📞 Interfone'
};

// ==================== ESTADO GLOBAL ====================
const AppState = {
  territories: {},
  apartmentNotes: {},
  addressNotes: {},
  currentTerritory: null,
  currentBuilding: null,
  currentBlock: null,
  currentApartment: null,
  currentAddress: null,
  history: [],
  historyIndex: -1
};

// ==================== UTILITÁRIOS ====================
const Utils = {
  generateId() {
    return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  },
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  },
  
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  
  formatDate(date, options = {}) {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return d.toLocaleDateString('pt-BR', options);
  },
  
  formatDateTime(date) {
    return new Date(date).toLocaleString('pt-BR');
  },
  
  truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }
};

// ==================== TOAST ====================
const Toast = {
  element: null,
  timeout: null,
  
  init() {
    this.element = document.getElementById('toast');
  },
  
  show(message, duration = CONFIG.TOAST_DURATION) {
    if (!this.element) return;
    this.element.textContent = message;
    this.element.classList.add('show');
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.element.classList.remove('show');
    }, duration);
  }
};

// ==================== TOOLTIP ====================
const Tooltip = {
  element: null,
  timeout: null,
  
  init() {
    this.element = document.getElementById('tooltipContainer');
  },
  
  show(targetElement, content, delay = CONFIG.TOOLTIP_DELAY) {
    if (!this.element) return;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!this.element) return;
      this.element.innerHTML = content;
      this.element.classList.add('show');
      this.position(targetElement);
    }, delay);
  },
  
  hide() {
    if (!this.element) return;
    clearTimeout(this.timeout);
    this.element.classList.remove('show');
    setTimeout(() => {
      if (this.element && !this.element.classList.contains('show')) {
        this.element.innerHTML = '';
      }
    }, 200);
  },
  
  position(targetElement) {
    if (!this.element) return;
    const rect = targetElement.getBoundingClientRect();
    const padding = 10;
    setTimeout(() => {
      const tooltipRect = this.element.getBoundingClientRect();
      let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
      let top = rect.bottom + padding;
      
      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = rect.top - tooltipRect.height - padding;
      }
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }
      
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
    }, 0);
  }
};

// ==================== STORAGE ====================
const Storage = {
  load(fromJson = null) {
    try {
      if (fromJson) {
        AppState.territories = fromJson.territories ? Utils.deepClone(fromJson.territories) : Utils.deepClone(INITIAL_TERRITORIES);
        AppState.apartmentNotes = fromJson.apartmentNotes || {};
        AppState.addressNotes = fromJson.addressNotes || {};
        Toast.show('✅ Dados importados');
      } else {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          AppState.territories = parsed.territories || Utils.deepClone(INITIAL_TERRITORIES);
          AppState.apartmentNotes = parsed.apartmentNotes || {};
          AppState.addressNotes = parsed.addressNotes || {};
        } else {
          AppState.territories = Utils.deepClone(INITIAL_TERRITORIES);
        }
        History.load();
      }
      if (AppState.history.length === 0) History.save();
      History.updateButtons();
    } catch (e) {
      console.error('Erro ao carregar:', e);
      AppState.territories = Utils.deepClone(INITIAL_TERRITORIES);
      Toast.show('⚠️ Erro ao carregar');
    }
  },
  
  persist(showMessage = true) {
    try {
      const data = {
        territories: AppState.territories,
        apartmentNotes: AppState.apartmentNotes,
        addressNotes: AppState.addressNotes
      };
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
      History.save();
      if (showMessage) Toast.show('💾 Dados salvos');
    } catch (e) {
      console.error('Erro ao salvar:', e);
      Toast.show('❌ Erro ao salvar');
    }
  },
  
  exportData() {
    try {
      const data = {
        territories: AppState.territories,
        apartmentNotes: AppState.apartmentNotes,
        addressNotes: AppState.addressNotes,
        exportDate: new Date().toISOString()
      };
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `territorios_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      Toast.show('📤 Exportado');
    } catch (e) {
      console.error('Erro ao exportar:', e);
      Toast.show('❌ Erro ao exportar');
    }
  },
  
  importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        this.load(data);
        UI.renderTerritories();
        UI.renderOverview();
      } catch (error) {
        console.error('Erro ao importar:', error);
        Toast.show('❌ Arquivo inválido');
      }
    };
    reader.readAsText(file);
  }
};

// ==================== HISTÓRICO ====================
const History = {
  save() {
    if (AppState.historyIndex < AppState.history.length - 1) {
      AppState.history = AppState.history.slice(0, AppState.historyIndex + 1);
    }
    const snapshot = {
      territories: Utils.deepClone(AppState.territories),
      apartmentNotes: Utils.deepClone(AppState.apartmentNotes),
      addressNotes: Utils.deepClone(AppState.addressNotes)
    };
    AppState.history.push(snapshot);
    if (AppState.history.length > CONFIG.MAX_HISTORY) {
      AppState.history.shift();
    } else {
      AppState.historyIndex++;
    }
    this.updateButtons();
    try {
      localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify({
        history: AppState.history,
        historyIndex: AppState.historyIndex
      }));
    } catch (e) {
      console.error('Erro ao salvar histórico:', e);
    }
  },
  
  undo() {
    if (AppState.historyIndex > 0) {
      AppState.historyIndex--;
      this.restore();
      Toast.show('↶ Desfeito');
    }
  },
  
  redo() {
    if (AppState.historyIndex < AppState.history.length - 1) {
      AppState.historyIndex++;
      this.restore();
      Toast.show('↷ Refeito');
    }
  },
  
  restore() {
    const snapshot = AppState.history[AppState.historyIndex];
    AppState.territories = Utils.deepClone(snapshot.territories);
    AppState.apartmentNotes = Utils.deepClone(snapshot.apartmentNotes);
    AppState.addressNotes = Utils.deepClone(snapshot.addressNotes);
    Storage.persist(false);
    UI.renderTerritories();
    if (AppState.currentTerritory && AppState.territories[AppState.currentTerritory]) {
      Territory.open(AppState.currentTerritory);
    } else {
      UI.renderOverview();
    }
    this.updateButtons();
  },
  
  updateButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    if (undoBtn) undoBtn.disabled = AppState.historyIndex <= 0;
    if (redoBtn) redoBtn.disabled = AppState.historyIndex >= AppState.history.length - 1;
  },
  
  load() {
    try {
      const saved = localStorage.getItem(CONFIG.HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        AppState.history = parsed.history || [];
        AppState.historyIndex = parsed.historyIndex ?? -1;
      }
    } catch (e) {
      console.error('Erro ao carregar histórico:', e);
    }
  }
};

// ==================== TEMA ====================
const Theme = {
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.apply(current === 'dark' ? 'light' : 'dark');
  },
  
  apply(theme) {
    const btn = document.getElementById('themeBtn');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (btn) btn.innerHTML = '☀️ <span class="btn-label">Tema</span>';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (btn) btn.innerHTML = '🌙 <span class="btn-label">Tema</span>';
    }
    localStorage.setItem('theme', theme);
  },
  
  load() {
    const saved = localStorage.getItem('theme');
    if (saved) this.apply(saved);
  }
};

// ==================== TERRITÓRIO ====================
const Territory = {
  open(territoryId) {
    AppState.currentTerritory = territoryId;
    const territory = AppState.territories[territoryId];
    if (!territory) {
      UI.renderOverview();
      return;
    }
    UI.renderTerritoryView(territory);
    UI.updateActiveTab(territoryId);
  },
  
  create(data) {
    const id = Utils.generateId();
    const colors = ['#48bb78', '#4299e1', '#ed8936', '#9f7aea', '#ed64a6', '#38b2ac', '#667eea'];
    const newTerritory = {
      id,
      numero: data.numero,
      nome: data.nome,
      cep: data.cep || '60325-000',
      cor: colors[Math.floor(Math.random() * colors.length)],
      addresses: [],
      diasTrabalhados: [],
      fixado: false
    };
    AppState.territories[id] = newTerritory;
    Storage.persist(false);
    UI.renderTerritories();
    this.open(id);
    Toast.show('✅ Território criado');
    return id;
  },
  
  togglePin(territoryId) {
    const territory = AppState.territories[territoryId];
    if (!territory) return;
    territory.fixado = !territory.fixado;
    Storage.persist(false);
    UI.renderTerritories();
    this.open(territoryId);
    Toast.show(territory.fixado ? '📌 Fixado' : '📍 Desfixado');
  },
  
  delete(territoryId) {
    if (!confirm('🗑️ Excluir território?')) return;
    delete AppState.territories[territoryId];
    Object.keys(AppState.apartmentNotes).forEach(k => {
      if (k.startsWith(`${territoryId}_`)) delete AppState.apartmentNotes[k];
    });
    Object.keys(AppState.addressNotes).forEach(k => {
      if (k.startsWith(`${territoryId}_`)) delete AppState.addressNotes[k];
    });
    Storage.persist(false);
    UI.renderTerritories();
    UI.renderOverview();
    Toast.show('🗑️ Excluído');
  },
  
  addWorkDay(territoryId, dayData) {
    const territory = AppState.territories[territoryId];
    if (!territory) return;
    const newDay = {
      data: dayData.data,
      ruas: dayData.ruas || '',
      obs: dayData.obs || '',
      timestamp: new Date().toISOString()
    };
    if (!territory.diasTrabalhados) territory.diasTrabalhados = [];
    territory.diasTrabalhados.push(newDay);
    territory.diasTrabalhados.sort((a, b) => {
      const dateA = new Date(a.data + 'T12:00:00');
      const dateB = new Date(b.data + 'T12:00:00');
      return dateB - dateA;
    });
    Storage.persist(false);
    this.open(territoryId);
    Toast.show('📅 Dia adicionado');
  },
  
  deleteWorkDay(territoryId, dayIndex) {
    const territory = AppState.territories[territoryId];
    if (!territory || !confirm('Deletar dia?')) return;
    territory.diasTrabalhados.splice(dayIndex, 1);
    Storage.persist(false);
    this.open(territoryId);
    Toast.show('🗑️ Removido');
  }
};

// ==================== ENDEREÇO ====================
const Address = {
  addHouse(territoryId, addressData) {
    const territory = AppState.territories[territoryId];
    if (!territory) return;
    const newAddress = {
      id: Utils.generateId(),
      type: 'house',
      logradouro: addressData.logradouro,
      numero: addressData.numero || 'S/N',
      quadra: addressData.quadra || '',
      cep: addressData.cep,
      bairro: addressData.bairro,
      cidade: addressData.cidade || 'Fortaleza',
      uf: addressData.uf || 'CE'
    };
    if (!territory.addresses) territory.addresses = [];
    territory.addresses.push(newAddress);
    Storage.persist(false);
    Territory.open(territoryId);
    Toast.show('✅ Casa adicionada');
  },
  
  addBuilding(territoryId, buildingData) {
    const territory = AppState.territories[territoryId];
    if (!territory) return;
    
    const blocks = buildingData.blocks || [];
    const totalApartments = blocks.reduce((sum, block) => sum + (block.apartments || 0), 0);
    
    const newBuilding = {
      id: Utils.generateId(),
      type: 'building',
      logradouro: buildingData.logradouro,
      numero: buildingData.numero || 'S/N',
      name: buildingData.name || '',
      quadra: buildingData.quadra || '',
      cep: buildingData.cep,
      bairro: buildingData.bairro,
      cidade: buildingData.cidade || 'Fortaleza',
      uf: buildingData.uf || 'CE',
      blocks: blocks,
      totalApartments: totalApartments,
      portariaType: buildingData.portariaType || 'porteiro',
      portaCarta: buildingData.portaCarta || false,
      portaCartaTipo: buildingData.portaCartaTipo || 'coletivo'
    };
    
    if (!territory.addresses) territory.addresses = [];
    territory.addresses.push(newBuilding);
    Storage.persist(false);
    Territory.open(territoryId);
    Toast.show(`✅ Prédio adicionado (${totalApartments} apts)`);
  },
  
  delete(territoryId, addressId) {
    const territory = AppState.territories[territoryId];
    if (!territory || !confirm('Remover endereço?')) return;
    const index = territory.addresses?.findIndex(a => a.id === addressId);
    if (index !== undefined && index >= 0) {
      const address = territory.addresses[index];
      territory.addresses.splice(index, 1);
      if (address.type === 'building') {
        Object.keys(AppState.apartmentNotes).forEach(k => {
          if (k.startsWith(`${territoryId}_${addressId}_`)) delete AppState.apartmentNotes[k];
        });
      } else {
        delete AppState.addressNotes[`${territoryId}_${addressId}`];
      }
      Storage.persist(false);
      Territory.open(territoryId);
      Toast.show('🗑️ Removido');
    }
  },
  
  saveNote(territoryId, addressId, noteData) {
    const key = `${territoryId}_${addressId}`;
    AppState.addressNotes[key] = {
      status: noteData.status,
      dia: noteData.dia,
      obs: noteData.obs || '',
      updatedAt: new Date().toISOString()
    };
    Storage.persist(false);
    Toast.show('💾 Salvo');
  },
  
  getNote(territoryId, addressId) {
    const key = `${territoryId}_${addressId}`;
    return AppState.addressNotes[key] || null;
  }
};

// ==================== APARTAMENTO ====================
const Apartment = {
  saveNote(territoryId, buildingId, block, apartmentNum, noteData) {
    const key = `${territoryId}_${buildingId}_${block}_${apartmentNum}`;
    AppState.apartmentNotes[key] = {
      notes: noteData.notes || '',
      status: noteData.status,
      dia: noteData.dia,
      updatedAt: new Date().toISOString()
    };
    Storage.persist(false);
    Toast.show('💾 Salvo');
  },
  
  getNote(territoryId, buildingId, block, apartmentNum) {
    const key = `${territoryId}_${buildingId}_${block}_${apartmentNum}`;
    return AppState.apartmentNotes[key] || null;
  },
  
  deleteNote(territoryId, buildingId, block, apartmentNum) {
    const key = `${territoryId}_${buildingId}_${block}_${apartmentNum}`;
    delete AppState.apartmentNotes[key];
    Storage.persist(false);
    Toast.show('🗑️ Removido');
  },
  
  getStats(territoryId, buildingId) {
    const stats = { total: 0, visited: 0, notVisited: 0, byStatus: {} };
    const territory = AppState.territories[territoryId];
    if (!territory) return stats;
    const building = territory.addresses?.find(a => a.id === buildingId);
    if (!building || building.type !== 'building') return stats;
    
    stats.total = building.totalApartments || 0;
    
    building.blocks?.forEach(blockData => {
      const blockName = blockData.name;
      const apartmentCount = blockData.apartments || 0;
      
      for (let i = 1; i <= apartmentCount; i++) {
        const aptNum = i.toString().padStart(2, '0');
        const note = this.getNote(territoryId, buildingId, blockName, aptNum);
        
        if (note) {
          stats.visited++;
          stats.byStatus[note.status] = (stats.byStatus[note.status] || 0) + 1;
        } else {
          stats.notVisited++;
        }
      }
    });
    
    return stats;
  }
};

// ==================== MODAL ====================
const Modal = {
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  },
  
  close(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
};

// ==================== CEP ====================
const CEP = {
  async search(cep) {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      Toast.show('❌ CEP inválido');
      return null;
    }
    
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (data.erro) {
        Toast.show('❌ CEP não encontrado');
        return null;
      }
      return data;
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
      Toast.show('❌ Erro ao buscar CEP');
      return null;
    }
  }
};

// ==================== SHARE ====================
const Share = {
  copySummary() {
    const text = this.buildSummary();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => Toast.show('✅ Copiado'));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        Toast.show('✅ Copiado');
      } catch (e) {
        Toast.show('❌ Erro ao copiar');
      }
      ta.remove();
    }
  },
  
  whatsapp() {
    const text = this.buildSummary();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  },
  
  buildSummary() {
    const territories = Object.values(AppState.territories || {});
    const totalAddresses = territories.reduce((s, t) => s + (t.addresses?.length || 0), 0);
    const totalBuildings = territories.reduce((s, t) => s + (t.addresses?.filter(a => a.type === 'building').length || 0), 0);
    const totalApartments = territories.reduce((s, t) => s + (t.addresses?.filter(a => a.type === 'building').reduce((sum, b) => sum + (b.totalApartments || 0), 0) || 0), 0);
    const totalDias = territories.reduce((s, t) => s + (t.diasTrabalhados?.length || 0), 0);
    
    let text = `🗺️ SISTEMA DE TERRITÓRIOS\nMONTE CASTELO/CENTRO - FORTALEZA\n\n📊 RESUMO:\n`;
    text += `• Territórios: ${territories.length}\n`;
    text += `• Endereços: ${totalAddresses}\n`;
    text += `• Prédios: ${totalBuildings}\n`;
    text += `• Apartamentos: ${totalApartments}\n`;
    text += `• Dias Trabalhados: ${totalDias}\n\n`;
    text += `Exportado em: ${new Date().toLocaleString('pt-BR')}`;
    return text;
  }
};

// ==================== UI ====================
const UI = {
  renderTerritories() {
    const list = document.getElementById('territoriesList');
    if (!list) return;
    
    const searchQuery = (document.getElementById('territorySearch')?.value || '').toLowerCase().trim();
    let territories = Object.values(AppState.territories || {});
    
    if (searchQuery) {
      territories = territories.filter(t => `${t.numero} ${t.nome}`.toLowerCase().includes(searchQuery));
    }
    
    territories.sort((a, b) => {
      if (a.fixado && !b.fixado) return -1;
      if (!a.fixado && b.fixado) return 1;
      return a.numero - b.numero;
    });
    
    list.innerHTML = '';
    territories.forEach(t => {
      const buildings = t.addresses?.filter(a => a.type === 'building') || [];
      const houses = t.addresses?.filter(a => a.type === 'house') || [];
      const totalApts = buildings.reduce((sum, b) => sum + (b.totalApartments || 0), 0);
      
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tab ${t.fixado ? 'fixado' : ''} ${AppState.currentTerritory === t.id ? 'active' : ''}`;
      btn.setAttribute('data-id', t.id);
      btn.innerHTML = `
        <span class="tab-badge" style="background:${t.cor}">${t.numero}</span>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${Utils.escapeHtml(t.nome)}
          </div>
          <div style="font-size:.85rem;color:var(--muted)">
            ${t.diasTrabalhados?.length || 0} dias • ${t.addresses?.length || 0} end.
          </div>
        </div>
      `;
      btn.addEventListener('click', () => Territory.open(t.id));
      btn.addEventListener('mouseenter', () => {
        Tooltip.show(btn, `<strong>${t.numero}. ${Utils.escapeHtml(t.nome)}</strong><div class=tooltip-divider></div><div class=tooltip-item><span class=tooltip-label>Dias Trabalhados:</span><span class=tooltip-value>${t.diasTrabalhados?.length || 0}</span></div><div class=tooltip-item><span class=tooltip-label>Casas:</span><span class=tooltip-value>${houses.length}</span></div><div class=tooltip-item><span class=tooltip-label>Prédios:</span><span class=tooltip-value>${buildings.length}</span></div><div class=tooltip-item><span class=tooltip-label>Apartamentos:</span><span class=tooltip-value>${totalApts}</span></div><div class=tooltip-item><span class=tooltip-label>CEP:</span><span class=tooltip-value>${t.cep}</span></div>`);
      });
      btn.addEventListener('mouseleave', () => Tooltip.hide());
      list.appendChild(btn);
    });
    
    const totalEl = document.getElementById('totalTerritories');
    if (totalEl) totalEl.textContent = territories.length;
  },
  
  renderOverview() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;
    
    AppState.currentTerritory = null;
    const territories = Object.values(AppState.territories || {});
    const totalAddresses = territories.reduce((s, t) => s + (t.addresses?.length || 0), 0);
    const totalBuildings = territories.reduce((s, t) => s + (t.addresses?.filter(a => a.type === 'building').length || 0), 0);
    const totalApartments = territories.reduce((s, t) => s + (t.addresses?.filter(a => a.type === 'building').reduce((sum, b) => sum + (b.totalApartments || 0), 0) || 0), 0);
    const totalDias = territories.reduce((s, t) => s + (t.diasTrabalhados?.length || 0), 0);
    
    mainContent.innerHTML = `
      <h2 style="margin-bottom:16px">📊 Visão Geral</h2>
      <div class="stats-grid">
        <div class="stat-card"><h4>${territories.length}</h4><p>Territórios</p></div>
        <div class="stat-card"><h4>${totalAddresses}</h4><p>Endereços</p></div>
        <div class="stat-card"><h4>${totalBuildings}</h4><p>Prédios</p></div>
        <div class="stat-card"><h4>${totalApartments}</h4><p>Apartamentos</p></div>
        <div class="stat-card"><h4>${totalDias}</h4><p>Dias</p></div>
      </div>
      <div class="card">
        <h3>🗺️ Territórios</h3>
        <div class="address-list">
          ${territories.map(t => `
            <div class="address-item" style="border-left-color:${t.cor};cursor:pointer" onclick="Territory.open('${t.id}')">
              <div style="flex:1">
                <strong>${t.fixado ? '📌 ' : '📍 '}${t.numero}. ${Utils.escapeHtml(t.nome)}</strong>
                <div style="color:var(--muted);margin-top:4px">
                  ${t.cep} • ${t.diasTrabalhados?.length || 0} dias • ${t.addresses?.length || 0} end.
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    this.updateActiveTab(null);
  },
  
  renderTerritoryView(territory) {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;
    
    const buildings = territory.addresses?.filter(a => a.type === 'building') || [];
    const houses = territory.addresses?.filter(a => a.type === 'house') || [];
    const mapLink = MAP_LINKS[territory.numero] || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(territory.nome + ', Fortaleza, CE')}`;
    
    mainContent.innerHTML = `
      <div class="card" style="background:linear-gradient(135deg, ${territory.cor}22, transparent)">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
          <div style="flex:1">
            <h2>${territory.fixado ? '📌 ' : '📍 '}Território ${territory.numero}: ${Utils.escapeHtml(territory.nome)}</h2>
            <div style="color:var(--muted);margin-top:4px">${territory.cep} • ${territory.diasTrabalhados.length} dias • ${territory.addresses.length} end.</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn ${territory.fixado ? 'btn-warning' : 'btn-success'}" onclick="Territory.togglePin('${territory.id}')">
              ${territory.fixado ? '📌 Fixado' : '📌 Fixar'}
            </button>
            <button class="btn btn-success" onclick="UI.showAddWorkDayModal()">📅 Dia</button>
            <a class="btn btn-primary" href="${mapLink}" target="_blank">🗺️ Maps</a>
            <button class="btn btn-danger" onclick="Territory.delete('${territory.id}')">🗑️</button>
            <button class="btn btn-secondary" onclick="UI.renderOverview()">🔙</button>
          </div>
        </div>
      </div>
      
      <div class="card">
        <h3>📅 Dias Trabalhados (${territory.diasTrabalhados.length})</h3>
        ${this.renderWorkDays(territory)}
      </div>
      
      <div class="card">
        <h3>🏘️ Endereços (${territory.addresses.length})</h3>
        ${this.renderAddresses(territory)}
      </div>
    `;
  },
  
  renderWorkDays(territory) {
    if (!territory.diasTrabalhados || territory.diasTrabalhados.length === 0) {
      return '<p style="color:var(--muted);text-align:center;padding:20px">Nenhum dia registrado</p>';
    }
    return `
      <div class="address-list">
        ${territory.diasTrabalhados.map((dia, index) => {
          const tooltipContent = `<strong>📅 ${Utils.formatDate(dia.data, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong><div class=tooltip-divider></div>${dia.ruas ? `<div class=tooltip-item><span class=tooltip-label>Ruas/Quadras:</span></div><div style=&quot;margin-top:4px;font-size:0.9em&quot;>${Utils.escapeHtml(dia.ruas)}</div>` : ''}<div class=tooltip-divider></div>${dia.obs ? `<div class=tooltip-item><span class=tooltip-label>Observações:</span></div><div style=&quot;margin-top:4px;font-size:0.9em&quot;>${Utils.escapeHtml(dia.obs)}</div>` : '<div style=&quot;color:var(--muted);font-size:0.9em&quot;>Sem observações</div>'}`;
          return `
          <div class="address-item" onmouseenter="Tooltip.show(this, \`${tooltipContent}\`)" onmouseleave="Tooltip.hide()">
            <div style="flex:1">
              <strong>📅 ${Utils.formatDate(dia.data, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
              ${dia.ruas ? `<div style="color:var(--muted);margin-top:4px">🗺️ ${Utils.escapeHtml(Utils.truncateText(dia.ruas, 100))}</div>` : ''}
            </div>
            <button onclick="Territory.deleteWorkDay('${territory.id}', ${index})" class="btn-icon">🗑️</button>
          </div>
        `;
        }).join('')}
      </div>
    `;
  },
  
  renderAddresses(territory) {
    if (!territory.addresses || territory.addresses.length === 0) {
      return `
        <p style="color:var(--muted);text-align:center;padding:20px">Nenhum endereço cadastrado</p>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:16px">
          <button class="btn btn-success" onclick="UI.showAddHouseModal()">🏠 Adicionar Casa</button>
          <button class="btn btn-warning" onclick="UI.showAddBuildingModal()">🏢 Adicionar Prédio</button>
        </div>
      `;
    }
    return `
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-bottom:12px">
        <button class="btn btn-success" onclick="UI.showAddHouseModal()">🏠 Casa</button>
        <button class="btn btn-warning" onclick="UI.showAddBuildingModal()">🏢 Prédio</button>
      </div>
      <div class="address-list">
        ${territory.addresses.map(addr => {
          const isBuilding = addr.type === 'building';
          const hasNote = AppState.addressNotes[`${territory.id}_${addr.id}`];
          const portariaBadge = isBuilding ? `<span class="badge" style="background:var(--info);color:#fff;margin-left:8px">${PORTARIA_TYPES[addr.portariaType] || '🚪'}</span>` : '';
          const portaCartaBadge = isBuilding && addr.portaCarta ? `<span class="badge" style="background:var(--success);color:#fff;margin-left:4px">${addr.portaCartaTipo === 'individual' ? '📬' : '📮'}</span>` : '';
          
          // Formatação do endereço com quadra
          const enderecoCompleto = addr.quadra ? 
            `${addr.quadra} ${addr.logradouro} • ${addr.name ? addr.name + ', ' : ''}Nº ${addr.numero}` :
            `${addr.logradouro}${addr.name ? ' • ' + addr.name : ''}, Nº ${addr.numero}`;
          
          let tooltipContent = '';
          if (isBuilding) {
            const stats = Apartment.getStats(territory.id, addr.id);
            tooltipContent = `<strong>🏢 ${Utils.escapeHtml(addr.name || addr.logradouro)}</strong><div class=tooltip-divider></div><div class=tooltip-item><span class=tooltip-label>Total Apts:</span><span class=tooltip-value>${stats.total}</span></div><div class=tooltip-item><span class=tooltip-label>Visitados:</span><span class=tooltip-value>${stats.visited}</span></div><div class=tooltip-item><span class=tooltip-label>Não Visitados:</span><span class=tooltip-value>${stats.notVisited}</span></div><div class=tooltip-item><span class=tooltip-label>Blocos:</span><span class=tooltip-value>${addr.blocks.map(b => b.name).join(', ')}</span></div><div class=tooltip-item><span class=tooltip-label>Portaria:</span><span class=tooltip-value>${PORTARIA_TYPES[addr.portariaType]}</span></div>${addr.portaCarta ? `<div class=tooltip-item><span class=tooltip-label>Porta Carta:</span><span class=tooltip-value>${addr.portaCartaTipo === 'individual' ? 'Individual' : 'Coletivo'}</span></div>` : ''}`;
          } else {
            const note = hasNote ? AppState.addressNotes[`${territory.id}_${addr.id}`] : null;
            tooltipContent = `<strong>🏠 ${Utils.escapeHtml(enderecoCompleto)}</strong><div class=tooltip-divider></div><div class=tooltip-item><span class=tooltip-label>CEP:</span><span class=tooltip-value>${addr.cep || 'N/A'}</span></div><div class=tooltip-item><span class=tooltip-label>Bairro:</span><span class=tooltip-value>${addr.bairro || 'N/A'}</span></div>${note ? `<div class=tooltip-item><span class=tooltip-label>Status:</span><span class=tooltip-value>${STATUS_LABELS[note.status] || 'N/A'}</span></div><div class=tooltip-item><span class=tooltip-label>Última Visita:</span><span class=tooltip-value>${note.dia ? Utils.formatDate(note.dia) : 'N/A'}</span></div>` : '<div class=tooltip-item><span class=tooltip-label>Status:</span><span class=tooltip-value>Não visitado</span></div>'}`;
          }
          
          return `
            <div class="address-item" style="border-left-color:${isBuilding ? 'var(--warning)' : territory.cor}" onmouseenter="Tooltip.show(this, \`${tooltipContent}\`)" onmouseleave="Tooltip.hide()">
              <div style="flex:1">
                <strong>${Utils.escapeHtml(enderecoCompleto)}
                ${isBuilding ? `<span class="badge badge-warning" style="margin-left:8px">🏢 ${addr.totalApartments} APs</span>` : ''}
                ${portariaBadge}
                ${portaCartaBadge}
                ${hasNote ? '<span class="badge" style="background:var(--success);color:#fff;margin-left:8px">✓</span>' : ''}
                </strong>
                <small style="color:var(--muted);display:block;margin-top:6px">${addr.cep || ''} • ${addr.bairro || ''}</small>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${isBuilding ? `<button class="btn btn-warning" onclick="Building.open('${addr.id}')">🏢 Apts</button><button class="btn btn-info" onclick="Building.editBuilding('${addr.id}')">✏️</button>` : `<button class="btn btn-secondary" onclick="UI.showAddressDetails('${addr.id}')">🔍</button>`}
                <a class="btn btn-primary" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${addr.logradouro}, ${addr.numero}, ${addr.bairro || ''}, ${addr.cidade || 'Fortaleza'}, ${addr.uf || 'CE'}, ${addr.cep || ''}`.trim())}" target="_blank" title="Ver no Google Maps">🗺️</a>
                <button class="btn btn-danger" onclick="Address.delete('${territory.id}', '${addr.id}')">🗑️</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },
  
  showAddWorkDayModal() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('diaDate').value = `${year}-${month}-${day}`;
    document.getElementById('diaRuas').value = '';
    document.getElementById('diaObs').value = '';
    Modal.open('diasModal');
  },
  
  showAddressDetails(addressId) {
    AppState.currentAddress = addressId;
    const territory = AppState.territories[AppState.currentTerritory];
    const address = territory.addresses.find(a => a.id === addressId);
    if (!address) return;
    
    const noteKey = `${AppState.currentTerritory}_${addressId}`;
    const savedNote = AppState.addressNotes[noteKey];
    
    document.getElementById('addressInfoDisplay').innerHTML = `
      <strong>${Utils.escapeHtml(address.logradouro)}, Nº ${Utils.escapeHtml(address.numero)}</strong>
      <div style="color:var(--muted);margin-top:4px">${address.cep} • ${address.bairro}</div>
    `;
    
    if (savedNote) {
      document.getElementById('addressStatusSelect').value = savedNote.status || '';
      document.getElementById('addressDia').value = savedNote.dia || '';
      document.getElementById('addressObs').value = savedNote.obs || '';
      document.getElementById('deleteAddressNoteBtn').style.display = 'inline-flex';
    } else {
      document.getElementById('addressStatusSelect').value = '';
      document.getElementById('addressDia').value = '';
      document.getElementById('addressObs').value = '';
      document.getElementById('deleteAddressNoteBtn').style.display = 'none';
    }
    
    Modal.open('addressDetailsModal');
  },
  
  updateActiveTab(territoryId) {
    document.querySelectorAll('.tab').forEach(tab => {
      if (tab.getAttribute('data-id') === territoryId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  },
  
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
  },
  
  showAddHouseModal() {
    document.getElementById('houseCEP').value = '';
    document.getElementById('houseLogradouro').value = '';
    document.getElementById('houseNumero').value = '';
    document.getElementById('houseQuadra').value = '';
    document.getElementById('houseBairro').value = '';
    Modal.open('addHouseModal');
  },
  
  showAddBuildingModal() {
    document.getElementById('buildingCEP').value = '';
    document.getElementById('buildingLogradouro').value = '';
    document.getElementById('buildingNumero').value = '';
    document.getElementById('buildingName').value = '';
    document.getElementById('buildingBairro').value = '';
    document.getElementById('buildingQuadra').value = '';
    document.getElementById('buildingPortaria').value = 'porteiro';
    document.getElementById('buildingPortaCarta').checked = false;
    document.getElementById('buildingPortaCartaTipo').value = 'coletivo';
    document.getElementById('portaCartaTipoGroup').style.display = 'none';
    document.getElementById('buildingBlocks').value = '';
    document.getElementById('blockApartmentsContainer').innerHTML = '';
    Modal.open('addBuildingModal');
  }
};

// ==================== BUILDING ====================
const Building = {
  open(buildingId) {
    AppState.currentBuilding = buildingId;
    const territory = AppState.territories[AppState.currentTerritory];
    const building = territory.addresses.find(a => a.id === buildingId);
    if (!building) return;
    
    if (building.blocks.length > 1) {
      const selector = document.getElementById('blockSelector');
      selector.innerHTML = building.blocks.map(b => {
        const stats = this.getBlockStats(buildingId, b.name);
        const tooltipContent = `<strong>Bloco ${b.name}</strong><div class=tooltip-divider></div><div class=tooltip-item><span class=tooltip-label>Total:</span><span class=tooltip-value>${b.apartments} apts</span></div><div class=tooltip-item><span class=tooltip-label>Visitados:</span><span class=tooltip-value>${stats.visited}</span></div><div class=tooltip-item><span class=tooltip-label>Não Visitados:</span><span class=tooltip-value>${stats.notVisited}</span></div>`;
        return `<button class="block-btn" onclick="Building.selectBlock('${b.name}')" onmouseenter="Tooltip.show(this, \`${tooltipContent}\`)" onmouseleave="Tooltip.hide()">${b.name}<br><small>${b.apartments} apts</small></button>`;
      }).join('');
      Modal.open('blockModal');
    } else {
      this.selectBlock(building.blocks[0].name);
    }
  },
  
  editBuilding(buildingId) {
    const territory = AppState.territories[AppState.currentTerritory];
    const building = territory.addresses.find(a => a.id === buildingId);
    if (!building) return;
    
    // Preenche o modal com os dados atuais
    document.getElementById('buildingCEP').value = building.cep || '';
    document.getElementById('buildingLogradouro').value = building.logradouro || '';
    document.getElementById('buildingNumero').value = building.numero || '';
    document.getElementById('buildingName').value = building.name || '';
    document.getElementById('buildingBairro').value = building.bairro || '';
    document.getElementById('buildingQuadra').value = building.quadra || '';
    document.getElementById('buildingPortaria').value = building.portariaType || 'porteiro';
    document.getElementById('buildingPortaCarta').checked = building.portaCarta || false;
    document.getElementById('buildingPortaCartaTipo').value = building.portaCartaTipo || 'coletivo';
    document.getElementById('portaCartaTipoGroup').style.display = building.portaCarta ? 'block' : 'none';
    
    const blocksStr = building.blocks.map(b => b.name).join(',');
    document.getElementById('buildingBlocks').value = blocksStr;
    
    // Gera campos de apartamentos
    const container = document.getElementById('blockApartmentsContainer');
    container.innerHTML = building.blocks.map(block => `
      <div class="form-group">
        <label>Apartamentos no Bloco ${Utils.escapeHtml(block.name)}</label>
        <input type="number" id="block_${block.name}" placeholder="Ex: 12" min="1" value="${block.apartments}">
      </div>
    `).join('');
    
    // Marca como edição
    AppState.editingBuildingId = buildingId;
    Modal.open('addBuildingModal');
  },
  
  selectBlock(blockName) {
    AppState.currentBlock = blockName;
    Modal.close('blockModal');
    
    const territory = AppState.territories[AppState.currentTerritory];
    const building = territory.addresses.find(a => a.id === AppState.currentBuilding);
    const blockData = building.blocks.find(b => b.name === blockName);
    
    const portariaBadge = PORTARIA_TYPES[building.portariaType] || '🚪';
    document.getElementById('apartmentListTitle').innerHTML = 
      `🏢 ${Utils.escapeHtml(building.name || building.logradouro)} - Bloco ${blockName} ${portariaBadge}`;
    
    this.renderApartmentList(blockData.apartments);
    Modal.open('apartmentListModal');
  },
  
  renderApartmentList(apartmentCount) {
    const onlyNoted = document.getElementById('onlyNotedToggle').checked;
    const selector = document.getElementById('apartmentSelector');
    selector.innerHTML = '';
    
    for (let i = 1; i <= apartmentCount; i++) {
      const aptNumber = String(i).padStart(2, '0');
      const noteKey = `${AppState.currentTerritory}_${AppState.currentBuilding}_${AppState.currentBlock}_${aptNumber}`;
      const note = AppState.apartmentNotes[noteKey];
      const hasNote = !!note;
      
      if (onlyNoted && !hasNote) continue;
      
      const btn = document.createElement('button');
      btn.className = `apartment-btn ${hasNote ? 'has-note' : ''}`;
      btn.textContent = aptNumber;
      btn.addEventListener('click', () => Building.openApartmentNote(aptNumber));
      
      if (hasNote) {
        const tooltipContent = `<strong>🏠 Apartamento ${aptNumber}</strong><div class=tooltip-divider></div><div class=tooltip-item><span class=tooltip-label>Status:</span><span class=tooltip-value>${STATUS_LABELS[note.status] || 'N/A'}</span></div><div class=tooltip-item><span class=tooltip-label>Data:</span><span class=tooltip-value>${note.dia ? Utils.formatDate(note.dia) : 'N/A'}</span></div>${note.notes ? `<div class=tooltip-divider></div><div style="margin-top:4px;font-size:0.9em">${Utils.escapeHtml(note.notes)}</div>` : ''}`;
        btn.addEventListener('mouseenter', () => Tooltip.show(btn, tooltipContent));
        btn.addEventListener('mouseleave', () => Tooltip.hide());
      } else {
        btn.addEventListener('mouseenter', () => Tooltip.show(btn, `<strong>🏠 Apartamento ${aptNumber}</strong><div class=tooltip-divider></div><div style="color:var(--muted);font-size:0.9em">Não visitado</div>`));
        btn.addEventListener('mouseleave', () => Tooltip.hide());
      }
      
      selector.appendChild(btn);
    }
    
    if (selector.children.length === 0) {
      selector.innerHTML = '<p style="text-align:center;padding:20px;color:var(--muted)">Nenhum apartamento com notas</p>';
    }
  },
  
  openApartmentNote(aptNumber) {
    AppState.currentApartment = aptNumber;
    const noteKey = `${AppState.currentTerritory}_${AppState.currentBuilding}_${AppState.currentBlock}_${aptNumber}`;
    const savedNote = AppState.apartmentNotes[noteKey];
    
    document.getElementById('apartmentModalTitle').textContent = `🏠 Apartamento ${aptNumber}`;
    
    if (savedNote) {
      document.getElementById('apartmentNotes').value = savedNote.notes || '';
      document.getElementById('apartmentStatus').value = savedNote.status || '';
      document.getElementById('apartmentDia').value = savedNote.dia || '';
      document.getElementById('deleteApartmentNoteBtn').style.display = 'inline-flex';
    } else {
      document.getElementById('apartmentNotes').value = '';
      document.getElementById('apartmentStatus').value = '';
      document.getElementById('apartmentDia').value = '';
      document.getElementById('deleteApartmentNoteBtn').style.display = 'none';
    }
    
    Modal.open('apartmentModal');
  },
  
  getBlockStats(buildingId, blockName) {
    const territory = AppState.territories[AppState.currentTerritory];
    const building = territory.addresses.find(a => a.id === buildingId);
    const blockData = building.blocks.find(b => b.name === blockName);
    
    let visited = 0;
    let notVisited = 0;
    
    for (let i = 1; i <= blockData.apartments; i++) {
      const aptNum = i.toString().padStart(2, '0');
      const note = Apartment.getNote(AppState.currentTerritory, buildingId, blockName, aptNum);
      if (note) visited++;
      else notVisited++;
    }
    
    return { visited, notVisited, total: blockData.apartments };
  }
};

// ==================== FUNÇÕES GLOBAIS CEP ====================
window.searchHouseCEP = async function() {
  const cep = document.getElementById('houseCEP').value;
  const data = await CEP.search(cep);
  if (data) {
    document.getElementById('houseLogradouro').value = data.logradouro || '';
    document.getElementById('houseBairro').value = data.bairro || '';
  }
};

window.searchBuildingCEP = async function() {
  const cep = document.getElementById('buildingCEP').value;
  const data = await CEP.search(cep);
  if (data) {
    document.getElementById('buildingLogradouro').value = data.logradouro || '';
    document.getElementById('buildingBairro').value = data.bairro || '';
  }
};

// ==================== INICIALIZAÇÃO ====================
function initApp() {
  Toast.init();
  Tooltip.init();
  Theme.load();
  Storage.load();
  
  UI.renderTerritories();
  UI.renderOverview();
  
  // Botões principais
  document.getElementById('themeBtn')?.addEventListener('click', () => Theme.toggle());
  document.getElementById('undoBtn')?.addEventListener('click', () => History.undo());
  document.getElementById('redoBtn')?.addEventListener('click', () => History.redo());
  document.getElementById('saveBtn')?.addEventListener('click', () => Storage.persist());
  document.getElementById('exportBtn')?.addEventListener('click', () => Storage.exportData());
  document.getElementById('importBtn')?.addEventListener('click', () => document.getElementById('fileInput').click());
  document.getElementById('fileInput')?.addEventListener('change', (e) => {
    if (e.target.files[0]) Storage.importData(e.target.files[0]);
    e.target.value = '';
  });
  document.getElementById('copySummaryBtn')?.addEventListener('click', () => Share.copySummary());
  document.getElementById('shareBtn')?.addEventListener('click', () => Share.whatsapp());
  document.getElementById('newTerritoryBtn')?.addEventListener('click', () => Modal.open('newTerritoryModal'));
  
  // Busca
  document.getElementById('territorySearch')?.addEventListener('input', () => UI.renderTerritories());
  
  // Sidebar
  document.getElementById('sidebarToggle')?.addEventListener('click', () => UI.toggleSidebar());
  document.getElementById('sidebarOverlay')?.addEventListener('click', () => UI.toggleSidebar());
  
  // Modal Novo Território
  document.getElementById('createTerritoryBtn')?.addEventListener('click', () => {
    const numero = document.getElementById('newTerritoryNumber').value;
    const nome = document.getElementById('newTerritoryName').value;
    const cep = document.getElementById('newTerritoryCEP').value;
    if (numero && nome) {
      Territory.create({ numero: parseInt(numero), nome, cep });
      Modal.close('newTerritoryModal');
      document.getElementById('newTerritoryNumber').value = '';
      document.getElementById('newTerritoryName').value = '';
      document.getElementById('newTerritoryCEP').value = '';
    } else {
      Toast.show('⚠️ Preencha número e nome');
    }
  });
  
  // Modal Dias
  document.getElementById('saveDiaBtn')?.addEventListener('click', () => {
    const data = document.getElementById('diaDate').value;
    const ruas = document.getElementById('diaRuas').value;
    const obs = document.getElementById('diaObs').value;
    if (data && AppState.currentTerritory) {
      Territory.addWorkDay(AppState.currentTerritory, { data, ruas, obs });
      Modal.close('diasModal');
    } else {
      Toast.show('⚠️ Selecione uma data');
    }
  });
  
  // Modal Apartamento
  document.getElementById('saveApartmentNoteBtn')?.addEventListener('click', () => {
    const notes = document.getElementById('apartmentNotes').value;
    const status = document.getElementById('apartmentStatus').value;
    const dia = document.getElementById('apartmentDia').value;
    
    Apartment.saveNote(AppState.currentTerritory, AppState.currentBuilding, AppState.currentBlock, AppState.currentApartment, { notes, status, dia });
    Modal.close('apartmentModal');
    const territory = AppState.territories[AppState.currentTerritory];
    const building = territory.addresses.find(a => a.id === AppState.currentBuilding);
    const blockData = building.blocks.find(b => b.name === AppState.currentBlock);
    Building.renderApartmentList(blockData.apartments);
  });
  
  document.getElementById('deleteApartmentNoteBtn')?.addEventListener('click', () => {
    if (!confirm('🗑️ Apagar nota?')) return;
    Apartment.deleteNote(AppState.currentTerritory, AppState.currentBuilding, AppState.currentBlock, AppState.currentApartment);
    Modal.close('apartmentModal');
    const territory = AppState.territories[AppState.currentTerritory];
    const building = territory.addresses.find(a => a.id === AppState.currentBuilding);
    const blockData = building.blocks.find(b => b.name === AppState.currentBlock);
    Building.renderApartmentList(blockData.apartments);
  });
  
  // Modal Endereço
  document.getElementById('saveAddressDetailsBtn')?.addEventListener('click', () => {
    const status = document.getElementById('addressStatusSelect').value;
    const dia = document.getElementById('addressDia').value;
    const obs = document.getElementById('addressObs').value;
    
    Address.saveNote(AppState.currentTerritory, AppState.currentAddress, { status, dia, obs });
    Modal.close('addressDetailsModal');
    Territory.open(AppState.currentTerritory);
  });
  
  document.getElementById('deleteAddressNoteBtn')?.addEventListener('click', () => {
    if (!confirm('🗑️ Apagar nota?')) return;
    const noteKey = `${AppState.currentTerritory}_${AppState.currentAddress}`;
    delete AppState.addressNotes[noteKey];
    Storage.persist();
    Modal.close('addressDetailsModal');
    Territory.open(AppState.currentTerritory);
    Toast.show('🗑️ Removido');
  });
  
  // Filtro apartamentos
  document.getElementById('onlyNotedToggle')?.addEventListener('change', () => {
    const territory = AppState.territories[AppState.currentTerritory];
    const building = territory.addresses.find(a => a.id === AppState.currentBuilding);
    const blockData = building.blocks.find(b => b.name === AppState.currentBlock);
    Building.renderApartmentList(blockData.apartments);
  });
  
  // Modal Casa
  document.getElementById('saveHouseBtn')?.addEventListener('click', () => {
    const logradouro = document.getElementById('houseLogradouro').value;
    const numero = document.getElementById('houseNumero').value;
    const quadra = document.getElementById('houseQuadra').value;
    const cep = document.getElementById('houseCEP').value;
    const bairro = document.getElementById('houseBairro').value;
    
    if (!logradouro || !AppState.currentTerritory) {
      Toast.show('⚠️ Preencha o logradouro');
      return;
    }
    
    Address.addHouse(AppState.currentTerritory, { logradouro, numero, quadra, cep, bairro });
    Modal.close('addHouseModal');
  });
  
  // Checkbox porta carta
  document.getElementById('buildingPortaCarta')?.addEventListener('change', (e) => {
    const group = document.getElementById('portaCartaTipoGroup');
    group.style.display = e.target.checked ? 'block' : 'none';
  });
  
  // Modal Prédio - Gerar campos de apartamentos
  document.getElementById('buildingBlocks')?.addEventListener('input', (e) => {
    const blocksInput = e.target.value.trim();
    const container = document.getElementById('blockApartmentsContainer');
    
    if (!blocksInput) {
      container.innerHTML = '';
      return;
    }
    
    const blocks = blocksInput.split(',').map(b => b.trim()).filter(Boolean);
    container.innerHTML = blocks.map(block => `
      <div class="form-group">
        <label>Apartamentos no Bloco ${Utils.escapeHtml(block)}</label>
        <input type="number" id="block_${block}" placeholder="Ex: 12" min="1" value="12">
      </div>
    `).join('');
  });
  
  // Modal Prédio - Salvar
  document.getElementById('saveBuildingBtn')?.addEventListener('click', () => {
    const logradouro = document.getElementById('buildingLogradouro').value;
    const numero = document.getElementById('buildingNumero').value;
    const name = document.getElementById('buildingName').value;
    const quadra = document.getElementById('buildingQuadra').value;
    const cep = document.getElementById('buildingCEP').value;
    const bairro = document.getElementById('buildingBairro').value;
    const portariaType = document.getElementById('buildingPortaria').value;
    const portaCarta = document.getElementById('buildingPortaCarta').checked;
    const portaCartaTipo = document.getElementById('buildingPortaCartaTipo').value;
    const blocksInput = document.getElementById('buildingBlocks').value.trim();
    
    if (!logradouro || !blocksInput || !AppState.currentTerritory) {
      Toast.show('⚠️ Preencha logradouro e blocos');
      return;
    }
    
    const blockNames = blocksInput.split(',').map(b => b.trim()).filter(Boolean);
    const blocks = blockNames.map(blockName => {
      const input = document.getElementById(`block_${blockName}`);
      const apartments = input ? parseInt(input.value) || 12 : 12;
      return { name: blockName, apartments };
    });
    
    if (AppState.editingBuildingId) {
      // Edição
      const territory = AppState.territories[AppState.currentTerritory];
      const building = territory.addresses.find(a => a.id === AppState.editingBuildingId);
      if (building) {
        building.logradouro = logradouro;
        building.numero = numero;
        building.name = name;
        building.quadra = quadra;
        building.cep = cep;
        building.bairro = bairro;
        building.portariaType = portariaType;
        building.portaCarta = portaCarta;
        building.portaCartaTipo = portaCartaTipo;
        building.blocks = blocks;
        building.totalApartments = blocks.reduce((sum, b) => sum + (b.apartments || 0), 0);
        Storage.persist(false);
        Territory.open(AppState.currentTerritory);
        Toast.show('✅ Prédio atualizado');
      }
      AppState.editingBuildingId = null;
    } else {
      // Novo prédio
      Address.addBuilding(AppState.currentTerritory, {
        logradouro,
        numero,
        name,
        quadra,
        cep,
        bairro,
        portariaType,
        portaCarta,
        portaCartaTipo,
        blocks
      });
    }
    Modal.close('addBuildingModal');
  });
  
  // Fechar modais
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      if (modalId) Modal.close(modalId);
    });
  });
  
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) Modal.close(modal.id);
    });
  });
  
  // Atalhos de teclado
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        History.undo();
      } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
        e.preventDefault();
        History.redo();
      } else if (e.key === 's') {
        e.preventDefault();
        Storage.persist();
      } else if (e.key === 'e') {
        e.preventDefault();
        Storage.exportData();
      }
    }
  });
  
  // Auto-collapse sidebar em mobile
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar')?.classList.add('collapsed');
  }
  
  console.log('✅ Sistema Completo Inicializado');
  Toast.show('✨ Sistema pronto', 2000);
}

// ==================== EXPOR APIS GLOBAIS ====================
window.Territory = Territory;
window.Address = Address;
window.Apartment = Apartment;
window.Building = Building;
window.UI = UI;
window.Storage = Storage;
window.Theme = Theme;
window.History = History;
window.Toast = Toast;
window.Tooltip = Tooltip;
window.Utils = Utils;
window.Modal = Modal;
window.CEP = CEP;
window.Share = Share;
window.AppState = AppState;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
