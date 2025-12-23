# 🏢 Sistema de Territórios - Monte Castelo / Centro

Sistema completo para gerenciamento de territórios de pregação com suporte a casas, prédios e apartamentos individualizados.

## 📁 Arquivos Principais

- **index_complete.html** - HTML principal (use este!)
- **app_full.js** - Lógica JavaScript completa
- **styles.css** - Estilos CSS responsivos

## ✨ Funcionalidades Completas

### 🗺️ Gerenciamento de Territórios
- ✅ Criar, editar e deletar territórios
- ✅ Listar e buscar territórios
- ✅ Fixar/desafixar territórios importantes
- ✅ 8 territórios pré-configurados com links do Google Maps
- ✅ Cores personalizadas por território
- ✅ Visualização detalhada com estatísticas

### 📅 Dias Trabalhados
- ✅ Adicionar dias com data automática
- ✅ Registrar ruas/quadras trabalhadas
- ✅ Adicionar observações detalhadas
- ✅ Deletar dias registrados
- ✅ Ordenação automática por data
- ✅ Tooltips com informações completas

### 🏠 Gerenciamento de Endereços

#### Casas
- ✅ Adicionar casas com CEP automático
- ✅ Busca de endereço via ViaCEP
- ✅ Registrar status de visita
- ✅ Adicionar observações e data
- ✅ Link direto para Google Maps

#### Prédios
- ✅ Adicionar prédios com múltiplos blocos
- ✅ Blocos individualizados (cada bloco com quantidade diferente de apartamentos)
- ✅ 3 tipos de portaria: Porteiro, Eletrônica, Interfone
- ✅ Busca de endereço via CEP
- ✅ Link direto para Google Maps

### 🏢 Gerenciamento de Apartamentos
- ✅ Visualização por bloco
- ✅ Registro individual de cada apartamento
- ✅ Status de visita (7 opções)
- ✅ Observações detalhadas
- ✅ Data de última visita
- ✅ Filtro para mostrar apenas apartamentos com notas
- ✅ Indicador visual de apartamentos visitados
- ✅ Tooltips com informações completas
- ✅ Edição múltipla permitida

### 💾 Sistema de Dados
- ✅ Salvamento automático no LocalStorage
- ✅ Histórico com 50 níveis (Desfazer/Refazer)
- ✅ Exportar dados em JSON
- ✅ Importar dados de backup
- ✅ Copiar resumo para área de transferência
- ✅ Compartilhar via WhatsApp

### 🎨 Interface
- ✅ Tema claro/escuro com persistência
- ✅ Layout 100% responsivo (Desktop, Tablet, Mobile)
- ✅ Tooltips informativos em todos elementos
- ✅ Toast notifications para feedback
- ✅ Modais funcionais e acessíveis
- ✅ Labels nos botões (visíveis em mobile)
- ✅ Animações suaves

## 🚀 Como Usar

1. Abra o arquivo `index_complete.html` no navegador
2. O sistema carrega com 8 territórios pré-configurados
3. Use os botões no header:
   - **➕ Novo** - Criar território
   - **💾 Salvar** - Salvar manualmente
   - **📤 Exportar** - Baixar backup JSON
   - **📥 Importar** - Restaurar backup
   - **📋 Copiar** - Copiar resumo
   - **📲 WhatsApp** - Compartilhar
   - **🌙 Tema** - Alternar claro/escuro
   - **↶ Desfazer** - Desfazer última ação
   - **↷ Refazer** - Refazer ação

## ⌨️ Atalhos de Teclado

- `Ctrl+Z` - Desfazer
- `Ctrl+Y` ou `Ctrl+Shift+Z` - Refazer
- `Ctrl+S` - Salvar
- `Ctrl+E` - Exportar

## 📊 Status de Visita

- 📘 Não Visitado
- 🚪 Ausente
- 💬 Conversado
- ✉️ Deixou Carta
- 📄 Deixou Folheto
- 🚫 Recusou
- 📚 Estudo

## 🏢 Tipos de Portaria

- 👨💼 Porteiro (físico)
- 🔐 Eletrônica (senha/cartão)
- 📞 Interfone (chamada)

## 🗺️ Territórios Pré-configurados

1. SR
2. Amaro Cavalcante
3. Casa da ração
4. Correios x Chico Alves
5. Carneiro da Cunha
6. Morro do Ouro
7. Frangolândia
8. Pdr Anchieta x Bezerra

Todos com links diretos para Google Maps!

## 💡 Recursos Avançados

### Blocos Individualizados
Cada bloco de um prédio pode ter quantidade diferente de apartamentos:
- Bloco A: 12 apartamentos
- Bloco B: 8 apartamentos
- Bloco C: 16 apartamentos

### Tooltips Informativos
Passe o mouse sobre qualquer elemento para ver:
- Territórios: dias, casas, prédios, apartamentos, CEP
- Endereços: CEP, bairro, status, última visita
- Apartamentos: status, data, observações
- Blocos: total, visitados, não visitados
- Dias: ruas/quadras, observações completas

### Busca de CEP
Integração com ViaCEP para preenchimento automático de:
- Logradouro
- Bairro
- Cidade
- UF

## 📱 Responsividade

### Desktop (>1024px)
- Labels ocultos nos botões
- Sidebar fixa lateral
- Grid de 2 colunas

### Tablet (768-1024px)
- Labels ocultos
- Layout adaptado

### Mobile (≤768px)
- Labels visíveis em todos botões
- Sidebar em menu hambúrguer
- Botões em grid 2 colunas
- Layout em 1 coluna

### Mobile Pequeno (≤480px)
- Botões em 1 coluna
- Fonte e espaçamentos otimizados

## 💾 Estrutura de Dados

```json
{
  "territories": {
    "t1": {
      "id": "t1",
      "numero": 1,
      "nome": "SR",
      "cep": "60325-110",
      "cor": "#48bb78",
      "addresses": [],
      "diasTrabalhados": [],
      "fixado": false
    }
  },
  "apartmentNotes": {
    "t1_building1_A_01": {
      "notes": "Conversou sobre...",
      "status": "conversado",
      "dia": "2024-01-15",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  },
  "addressNotes": {
    "t1_house1": {
      "status": "ausente",
      "dia": "2024-01-15",
      "obs": "Ninguém atendeu",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

## 🔧 Tecnologias

- HTML5 semântico
- CSS3 com variáveis e responsividade
- JavaScript ES6+ modular
- LocalStorage API
- ViaCEP API
- Google Maps API

## 🐛 Correções Recentes

- ✅ Problema de fuso horário nas datas corrigido
- ✅ Tooltips não bloqueiam mais cliques
- ✅ Apartamentos podem ser editados múltiplas vezes
- ✅ Salvamento automático silencioso
- ✅ Event listeners ao invés de onclick inline
- ✅ Formatação de data corrigida

## 📝 Notas Importantes

- Dados salvos automaticamente a cada ação
- Histórico limitado a 50 níveis
- Backup recomendado via Exportar
- Funciona offline após primeiro carregamento
- Compatível com Chrome, Firefox, Safari, Edge

---

**Desenvolvido com ❤️ para facilitar o trabalho de pregação**

**Versão:** 2.0 Completa  
**Última atualização:** 22/12/2025
