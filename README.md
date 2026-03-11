# 🏢 Sistema de Territórios — Monte Castelo / Centro

> Sistema web **offline-first** para gerenciamento de territórios de pregação urbana em Fortaleza, CE.  
> Funciona direto no navegador — sem servidor, sem instalação, sem internet obrigatória.

🔗 **[Abrir o Sistema](https://hallyson007.github.io/salao/)**

---

## 📱 Compatibilidade

| Plataforma | Suporte |
|---|---|
| Android (Chrome) | ✅ |
| iPhone / iPad (Safari) | ✅ |
| PC / Mac (Chrome, Firefox, Edge) | ✅ |
| Sem internet (após primeiro acesso) | ✅ |

---

## 🗺️ Cobertura

**25 territórios** na região de Monte Castelo e Centro de Fortaleza  
**84 quadras** pré-mapeadas com logradouros e observações (T9–T21)

---

## ✨ Funcionalidades

- 📦 **Quadras** — cadastro com 4 lados (Norte/Sul/Leste/Oeste), número de casas por lado, progresso visual
- 🏠 **Casas** — status de visita por casa com cor indicativa (Visitado, Ausente, Recusou…)
- 🏢 **Prédios** — blocos, apartamentos, tipo de portaria, porta-carta
- 📅 **Dias trabalhados** — registro de data, ruas percorridas e observações
- 💾 **Salvar automático** — dados ficam no dispositivo (localStorage)
- 📤 **Exportar / 📥 Importar JSON** — backup e sincronização entre dispositivos
- 🔀 **Merge inteligente** — importação nunca apaga dados existentes
- ↶ **Desfazer / ↷ Refazer** — até 50 estados de histórico
- 📋 **Copiar resumo** — texto pronto para colar em qualquer lugar
- 📲 **Compartilhar via WhatsApp** — resumo formatado direto no app
- 🗺️ **RotaMax** — módulo de planejamento de rota de visitas
- 🌙 **Tema claro / escuro** — com persistência
- 🔎 **Busca** — filtra territórios por número ou nome em tempo real

---

## 📁 Arquivos do Projeto

```
territorios-monte-castelo/
├── index.html                          # Aplicação principal
├── styles.css                          # Estilos base
├── responsive_improvements.css         # Melhorias responsivas (mobile/tablet)
├── app_full.js                         # Toda a lógica do sistema
├── criador_de_quadra.html              # Módulo RotaMax
└── banco_territorios_monte_castelo.json  # Banco inicial (importar na 1ª vez)
```

---

## 🚀 Como Usar

### Primeira vez
1. Acesse o link do sistema
2. Clique em **📥 Importar**
3. Selecione o arquivo `banco_territorios_monte_castelo.json`
4. Os 25 territórios e 84 quadras serão carregados automaticamente

### Fluxo diário
1. Selecione o território na barra lateral
2. Clique nas casas das quadras para registrar o status de visita
3. Ao terminar, clique em **📅 Dia** e registre as ruas percorridas
4. Salve com **💾** ou `Ctrl+S`
5. Exporte backup com **📤** periodicamente

### Sincronizar entre dispositivos
1. No dispositivo A: **📤 Exportar** → salva um arquivo `.json`
2. No dispositivo B: **📥 Importar** → seleciona o arquivo
3. Os dados são **mesclados** — nada é perdido

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|---|---|
| `Ctrl + S` | Salvar |
| `Ctrl + Z` | Desfazer |
| `Ctrl + Y` | Refazer |
| `Escape` | Fechar modal |

---

## 🔧 Tecnologia

- **HTML5 + CSS3 + JavaScript** puro (sem frameworks, sem dependências)
- **localStorage** para persistência offline
- **ViaCEP** para busca automática de endereço por CEP
- **Google Maps** para links de localização
- Responsivo com suporte a `prefers-reduced-motion` e `pointer: coarse`

---

## 📊 Estatísticas do Banco Inicial

| Item | Quantidade |
|---|---|
| Territórios | 25 |
| Quadras mapeadas | 84 |
| Territórios com quadras | 12 (T9–T21) |
| Territórios prontos para preencher | 13 (T1–T8, T14, T22–T25) |

---

## 📌 Dica: Adicionar à Tela Inicial do Celular

**Android (Chrome):**  
Menu (⋮) → *Adicionar à tela inicial*

**iPhone (Safari):**  
Botão compartilhar (⬆️) → *Adicionar à Tela de Início*

O sistema se comporta como um app nativo após adicionado!

---

*Monte Castelo / Centro · Fortaleza, CE · v2.1*
