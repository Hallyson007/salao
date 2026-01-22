# 🗺️ Sistema de Territórios - Monte Castelo

Sistema completo para gerenciamento de territórios de pregação das Testemunhas de Jeová no bairro Monte Castelo/Centro - Fortaleza/CE.

## 📋 Funcionalidades

### 🏘️ Gerenciamento de Territórios
- **8 territórios pré-configurados** com cores e mapas
- **Criação de novos territórios** personalizados
- **Fixação de territórios** para acesso rápido
- **Busca e filtros** por número ou nome

### 🏠 Cadastro de Endereços
- **Casas individuais** com CEP automático
- **Prédios completos** com blocos e apartamentos
- **Sistema de quadras** para organização
- **Edição completa** de prédios existentes

### 🏢 Gestão de Prédios
- **Múltiplos blocos** (A,B,C ou 1,2,3)
- **Apartamentos editáveis** por bloco
- **Tipos de portaria**: Porteiro, Eletrônica, Interfone
- **Sistema de porta carta**: Coletivo ou Individual
- **Badges visuais** para identificação rápida

### 📝 Controle de Visitas
- **Status detalhados**: Não Visitado, Ausente, Conversado, Carta, Folheto, Recusou, Estudo
- **Anotações por apartamento** com data e observações
- **Filtros inteligentes** (só com notas, por status)
- **Histórico completo** de visitas

### 📅 Dias Trabalhados
- **Registro de dias** com ruas/quadras trabalhadas
- **Observações detalhadas** (clima, eventos)
- **Histórico cronológico** automático

### 💾 Backup e Sincronização
- **Salvamento automático** no navegador
- **Exportação JSON** para backup
- **Importação de dados** de outros dispositivos
- **Histórico com desfazer/refazer** (50 ações)

### 🎨 Interface Moderna
- **Tema claro/escuro** alternável
- **Design responsivo** para mobile/desktop
- **Tooltips informativos** com detalhes
- **Atalhos de teclado** (Ctrl+S, Ctrl+Z, etc.)

## 🚀 Como Usar

### Instalação
1. Baixe os arquivos `index.html` e `app_full.js`
2. Coloque em uma pasta do servidor web (ex: `xampp/htdocs/MC/`)
3. Acesse via navegador: `http://localhost/MC/`

### Primeiros Passos
1. **Selecione um território** na barra lateral
2. **Adicione endereços** usando os botões "🏠 Casa" ou "🏢 Prédio"
3. **Registre visitas** clicando nos endereços
4. **Marque dias trabalhados** com o botão "📅 Dia"

### Cadastro de Prédios
1. Preencha **CEP** (busca automática de endereço)
2. Complete **logradouro, número, nome do prédio**
3. Defina **quadra** para organização
4. Escolha **tipo de portaria**
5. Marque **porta carta** se houver (coletivo/individual)
6. Configure **blocos** (ex: A,B,C) e **apartamentos por bloco**

### Edição de Prédios
- Use o botão **"✏️"** ao lado do prédio
- Modifique **número de apartamentos** por bloco
- Atualize **informações de portaria e porta carta**
- **Anotações existentes são preservadas**

## 📱 Recursos Avançados

### Atalhos de Teclado
- `Ctrl + S` - Salvar dados
- `Ctrl + Z` - Desfazer última ação
- `Ctrl + Y` - Refazer ação
- `Ctrl + E` - Exportar dados

### Badges e Indicadores
- 🏢 **Amarelo** - Prédios com número de apartamentos
- 👨💼🔐📞 **Azul** - Tipo de portaria
- 📮📬 **Verde** - Porta carta (coletivo/individual)
- ✓ **Verde** - Endereços com anotações
- 📌 **Laranja** - Territórios fixados

### Formatação de Endereços
- **Com quadra**: "Quadra 1 Rua Caririaçu • ED Caririaçu, Nº 850"
- **Sem quadra**: "Rua Caririaçu • ED Caririaçu, Nº 850"

## 🔧 Tecnologias

- **HTML5** - Estrutura e semântica
- **CSS3** - Estilos e responsividade
- **JavaScript ES6+** - Lógica e interatividade
- **LocalStorage** - Persistência de dados
- **ViaCEP API** - Busca automática de endereços

## 📊 Estatísticas

O sistema fornece estatísticas em tempo real:
- Total de territórios, endereços, prédios e apartamentos
- Dias trabalhados por território
- Apartamentos visitados vs não visitados
- Status detalhado das visitas

## 🌐 Compatibilidade

- ✅ **Chrome/Edge** (recomendado)
- ✅ **Firefox**
- ✅ **Safari**
- ✅ **Mobile** (iOS/Android)
- ✅ **Offline** (após primeiro carregamento)

## 💡 Dicas de Uso

### Organização
- Use **quadras** para dividir territórios grandes
- **Fixe territórios** mais utilizados
- **Exporte dados** regularmente para backup

### Eficiência
- Use **filtros** para focar em apartamentos não visitados
- **Tooltips** mostram informações sem abrir modais
- **Busca** por nome ou número de território

### Colaboração
- **Exporte/importe** dados entre dispositivos
- **Compartilhe** resumos via WhatsApp
- **Copie** estatísticas para relatórios

## 🆘 Suporte

### Problemas Comuns
- **Dados perdidos**: Verifique se JavaScript está habilitado
- **CEP não encontrado**: Confira se está no formato correto
- **Lentidão**: Exporte/importe dados para limpar cache

### Backup de Segurança
1. Clique em **"📤 Exportar"**
2. Salve o arquivo `.json` em local seguro
3. Para restaurar: **"📥 Importar"** + selecionar arquivo

---

**Desenvolvido para as Testemunhas de Jeová - Congregação Monte Castelo/Centro - Fortaleza/CE**

*Sistema offline, dados armazenados localmente no dispositivo*
