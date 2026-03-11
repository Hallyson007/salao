'use strict';

const CONFIG = {
  STORAGE_KEY: 'territorios_monte_castelo_v2',
  HISTORY_KEY: 'territorios_history_v2',
  MAX_HISTORY: 50,
  TOAST_DURATION: 2500,
  TOOLTIP_DELAY: 300
};

const MAP_LINKS = {
  1:'https://maps.app.goo.gl/XXZFyFwbCjsePvyq8',2:'https://maps.app.goo.gl/5RfgEJun9nYpD6Dk8',
  3:'https://maps.app.goo.gl/bUaHrWpoq2nHzmH66',4:'https://maps.app.goo.gl/bKGM7NxE6vvUc9uw7',
  5:'https://maps.app.goo.gl/jKBjRV7FdqfFGux98',6:'https://maps.app.goo.gl/uzgpAzA4zmQBUqgTA',
  7:'https://maps.app.goo.gl/fgZWwebRsoHjUweL6',8:'https://maps.app.goo.gl/VsP5Zc7P9gkjJ59B7'
};

const TERRITORY_COLORS = [
  '#48bb78','#4299e1','#ed8936','#9c6644','#ecc94b','#f56565','#9f7aea','#ed64a6',
  '#38b2ac','#667eea','#f6ad55','#68d391','#fc8181','#76e4f7','#b794f4','#fbb6ce',
  '#90cdf4','#9ae6b4','#fed7aa','#feb2b2','#e9d8fd','#bee3f8','#c6f6d5','#fefcbf'
];

// Dados dos territórios: [numero, nome, cep, quadras_iniciais]
// Quadras extraídas dos mapas físicos (imagens T9-T21)
const TERRITORY_DATA = [
  [1, 'SR', '60325-110', []],
  [2, 'Amaro Cavalcante', '60325-120', []],
  [3, 'Casa da Ração', '60325-130', []],
  [4, 'Correios x Chico Alves', '60325-140', []],
  [5, 'Carneiro da Cunha', '60325-150', []],
  [6, 'Morro do Ouro', '60325-160', []],
  [7, 'Frangolândia', '60325-170', []],
  [8, 'Pdr Anchieta x Bezerra', '60325-180', []],
  [9, 'Sgto. Hermínio / Benjamim Barroso', '60325-190', [
    {nome:'Quadra 1', logradouro:'Av. Sargento Hermínio / R. Anibal Mascarenhas', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Entre R. Padre Frota e Av. Benjamim Barroso'},
    {nome:'Quadra 2', logradouro:'R. Conrado Cabral / R. Anibal Mascarenhas', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 3', logradouro:'R. Demócrito Rocha / R. Conrado Cabral', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 4', logradouro:'R. Henrique Altran / R. Antônio Drumond', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 5', logradouro:'Av. Sargento Hermínio / R. Anibal Mascarenhas', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul'},
    {nome:'Quadra 6', logradouro:'R. Anibal Mascarenhas / R. Demócrito Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 7', logradouro:'R. Demócrito Rocha / R. Henrique Altran', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 8', logradouro:'R. Henrique Altran / R. Antônio Drumond', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul'},
  ]],
  [10, 'Bezerra de Menezes / Benjamim Barroso', '60325-200', [
    {nome:'Quadra 1', logradouro:'R. Antônio Drumond / R. Leiria de Andrade', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira norte'},
    {nome:'Quadra 2', logradouro:'R. Leiria de Andrade / R. Casimiro Montenegro', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 3', logradouro:'R. Casimiro Montenegro / R. José Marrocos', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Possui Cr. Conrado Cabral'},
    {nome:'Quadra 4', logradouro:'R. José Marrocos / Av. Bezerra de Menezes', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 5', logradouro:'R. Antônio Drumond / R. Leiria de Andrade', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul'},
    {nome:'Quadra 6', logradouro:'R. Leiria de Andrade / R. Casimiro Montenegro', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 7', logradouro:'R. Casimiro Montenegro / R. José Marrocos', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 8', logradouro:'R. José Marrocos / Av. Bezerra de Menezes', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul'},
  ]],
  [11, 'Sargento Hermínio / João Tomé', '60325-210', [
    {nome:'Quadra 1', logradouro:'R. Antônio Drumond / R. Henrique Autran', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Entre R. Padre Frota e R. Ribeiro da Silva — fileira norte'},
    {nome:'Quadra 2', logradouro:'R. Henrique Autran / R. Demócrito Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 3', logradouro:'R. Demócrito Rocha / R. Anibal Mascarenhas', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 4', logradouro:'R. Anibal Mascarenhas / Av. Sargento Hermínio', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 5', logradouro:'R. Antônio Drumond / R. Henrique Autran', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Entre R. Ribeiro da Silva e R. João Tomé — fileira sul'},
    {nome:'Quadra 6', logradouro:'R. Henrique Autran / R. Demócrito Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 7', logradouro:'R. Demócrito Rocha / R. Anibal Mascarenhas', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 8', logradouro:'R. Anibal Mascarenhas / Av. Sargento Hermínio', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
  ]],
  [12, 'Cartório', '60325-220', [
    {nome:'Quadra 1', logradouro:'Av. Bezerra de Menezes / R. Mulungu', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Entre R. Padre Frota e R. Ribeiro da Silva'},
    {nome:'Quadra 2', logradouro:'R. Mulungu', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Pequena quadra — R. Padre Frota'},
    {nome:'Quadra 3', logradouro:'R. Mulungu / R. Antônio Drumond', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 4', logradouro:'Av. Bezerra de Menezes / R. Casimiro Montenegro', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Grande quadra — fileira sul'},
    {nome:'Quadra 5', logradouro:'R. Ribeiro da Silva', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Entre R. Mulungu e R. Leiria de Andrade'},
    {nome:'Quadra 6', logradouro:'R. Leiria de Andrade / R. João Tomé', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 7', logradouro:'R. Casimiro Montenegro / R. Leiria de Andrade', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Teófilo Gurgel'},
    {nome:'Quadra 8', logradouro:'R. Leiria de Andrade', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Teófilo Gurgel — estreita'},
  ]],
  [13, 'Teófilo Gurgel', '60325-230', [
    {nome:'Quadra 1', logradouro:'R. Antônio Drumond / R. Henrique Altran', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Entre R. João Tomé e R. Dr. Sebastião Franco'},
    {nome:'Quadra 2', logradouro:'R. Henrique Altran — R. Teófilo Gurgel', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Quadra com corredor central'},
    {nome:'Quadra 3', logradouro:'R. Júlio Pinto / R. Araújo', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 4', logradouro:'R. Araújo / R. Anibal Mascarenhas', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 5', logradouro:'R. Anibal Mascarenhas / R. Pacote', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 6', logradouro:'R. Pacote / Av. Sargento Hermínio', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 7', logradouro:'R. Antônio Drumond / R. Henrique Altran', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul — R. Dr. Sebastião Franco'},
    {nome:'Quadra 8', logradouro:'R. Henrique Altran / R. Teófilo Gurgel', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul'},
  ]],
  [14, 'Bezerra x Padre Ibiapina', '60325-240', []],
  [15, 'Bezerra de Menezes / Padre Ibiapina', '60325-250', [
    {nome:'Quadra 1', logradouro:'Av. Bezerra de Menezes / R. Odilon Soares', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Justiniano de Serpa — Posto Só'},
    {nome:'Quadra 2', logradouro:'R. Odilon Soares / R. Othon de Norões', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 3', logradouro:'R. Othon de Norões / R. Carire', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Justiniano de Serpa'},
    {nome:'Quadra 4', logradouro:'Av. Bezerra de Menezes / R. Odilon Soares', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul'},
    {nome:'Quadra 5', logradouro:'R. Odilon Soares / R. Clarindo de Queiroz', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Eurico Paco'},
    {nome:'Quadra 6', logradouro:'R. Carire / Av. Duque de Caxias', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Joaquim Moreira'},
    {nome:'Quadra 7', logradouro:'R. Joaquim Moreira / Av. Duque de Caxias', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 8', logradouro:'Av. Bezerra de Menezes', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Av. Padre Ibiapina — Banco Itaú'},
    {nome:'Quadra 9', logradouro:'R. Clarindo de Queiroz / Av. Duque de Caxias', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Av. Padre Ibiapina — HB Car'},
  ]],
  [16, 'Mercado Velho / Carvoaria', '60325-260', [
    {nome:'Área 1', logradouro:'R. Júlio Pinto / Av. Duque de Caxias', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Epifânio Leite — grande área'},
    {nome:'Área 2', logradouro:'Av. Duque de Caxias', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'SESI / SENAI'},
    {nome:'Área 3', logradouro:'Av. Padre Ibiapina / Estrutural', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'DP 2000, ABCR e outros'},
  ]],
  [17, 'Bombeiros', '60325-270', [
    {nome:'Área 1', logradouro:'Av. Padre Ibiapina / R. Dom Pedro I', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'SESI-NR Saúde'},
    {nome:'Área 2', logradouro:'Av. Padre Ibiapina / R. Pedro Pereira', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Conselheiro Estelita'},
    {nome:'Área 3', logradouro:'R. Pedro Pereira / R. Liberato Barroso', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Agapito dos Santos'},
    {nome:'Área 4', logradouro:'R. Liberato Barroso / R. Guilherme Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Corpo de Bombeiros'},
    {nome:'Área 5', logradouro:'R. Liberato Barroso / R. Guilherme Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Agapito dos Santos — fileira sul'},
  ]],
  [18, 'Centro: Agapito dos Santos / Teresa Cristina', '60325-280', [
    {nome:'Quadra 1', logradouro:'Av. Duque de Caxias / R. Dom Pedro I', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'DNOCS — R. Agapito dos Santos'},
    {nome:'Quadra 2', logradouro:'R. Dom Pedro I / R. Pedro Pereira', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Padre Mororó'},
    {nome:'Quadra 3', logradouro:'R. Pedro Pereira / R. Liberato Barroso', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 4', logradouro:'Av. Duque de Caxias / R. Dom Pedro I', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul — R. Teresa Cristina'},
    {nome:'Quadra 5', logradouro:'R. Dom Pedro I / R. Pedro Pereira', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 6', logradouro:'R. Pedro Pereira / R. Liberato Barroso', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 7', logradouro:'R. Liberato Barroso / R. Guilherme Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Guilherme Rocha'},
  ]],
  [19, 'Grupo Centro', '60325-290', [
    {nome:'Quadra 1', logradouro:'Av. Duque de Caxias / R. Dom Pedro I', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Grupo Centro — Vila Diogo'},
    {nome:'Quadra 2', logradouro:'Av. Duque de Caxias / R. Dom Pedro I', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Vila Diogo — R. Princesa Isabel'},
    {nome:'Quadra 3', logradouro:'Av. Duque de Caxias', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Jardim Princesa Isabel'},
    {nome:'Quadra 4', logradouro:'Av. Duque de Caxias', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Teresa Cristina — topo'},
    {nome:'Quadra 5', logradouro:'R. Dom Pedro I / R. Pedro Pereira', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Princesa Isabel / Av. Imperador'},
    {nome:'Quadra 6', logradouro:'R. Pedro Pereira / R. Liberato Barroso', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 7', logradouro:'Gerardo Bastos / R. Pedro Pereira', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Teresa Cristina'},
    {nome:'Quadra 9', logradouro:'R. Estefânea Salgado / R. Guilherme Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:''},
    {nome:'Quadra 10', logradouro:'R. Guilherme Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Teresa Cristina — canto'},
    {nome:'Beco da Poeira', logradouro:'R. Liberato Barroso / R. Guilherme Rocha', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Av. Imperador'},
  ]],
  [20, 'Lavras da Mangabeira', '60325-300', [
    {nome:'Quadra Norte', logradouro:'R. Antônio Drumond / R. Henrique Altran', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Lavras da Mangabeira / Av. Sargento Hermínio — grande quadra'},
    {nome:'Quadra Sul A', logradouro:'R. Antônio Drumond / R. Henrique Altran', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Padre Anchieta — fileira sul esquerda'},
    {nome:'Quadra Sul B', logradouro:'R. Henrique Altran / Av. Sargento Hermínio', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Mozart Pinto — fileira sul direita'},
  ]],
  [21, 'Antonina do Norte', '60325-310', [
    {nome:'Quadra 1', logradouro:'Av. Bezerra de Menezes / R. Soares Bulcão', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Antonina do Norte / R. Padre Anchieta'},
    {nome:'Quadra 2A', logradouro:'R. Soares Bulcão / R. José Marrocos', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira norte'},
    {nome:'Quadra 2B', logradouro:'R. José Marrocos / R. Casimiro Montenegro', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira norte'},
    {nome:'Quadra 3A', logradouro:'R. Casimiro Montenegro / R. Leiria de Andrade', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. São Domingo — fileira norte'},
    {nome:'Quadra 3B', logradouro:'R. Leiria de Andrade / R. Antônio Drumond', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. São Domingo — fileira norte'},
    {nome:'Quadra 4', logradouro:'R. José Marrocos / R. Casimiro Montenegro', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'R. Mozart Pinto — fileira sul'},
    {nome:'Quadra 5', logradouro:'R. Leiria de Andrade / R. Antônio Drumond', lado_a:0,lado_b:0,lado_c:0,lado_d:0, obs:'Fileira sul direita'},
  ]],
  [22, 'Mapa 22', '60325-320', []],
  [23, 'Mapa 23', '60325-330', []],
  [24, 'Mapa 24', '60325-340', []],
  [25, 'Mapa 25', '60325-350', []],
];

const INITIAL_TERRITORIES = (function(){
  const result={};
  TERRITORY_DATA.forEach(function(row){
    var n=row[0], nome=row[1], cep=row[2], quadrasBase=row[3];
    var id='t'+n;
    var quadras=quadrasBase.map(function(q){
      return {
        id:'q_init_'+n+'_'+Math.random().toString(36).slice(2,7),
        nome:q.nome||'',numero:'',logradouro:q.logradouro||'',bairro:'Monte Castelo',cep:cep,
        lado_a:q.lado_a||0,lado_b:q.lado_b||0,lado_c:q.lado_c||0,lado_d:q.lado_d||0,
        obs:q.obs||'',createdAt:new Date().toISOString()
      };
    });
    result[id]={id:id,numero:n,nome:nome,cep:cep,
      cor:TERRITORY_COLORS[(n-1)%TERRITORY_COLORS.length],
      addresses:[],quadras:quadras,diasTrabalhados:[],fixado:false};
  });
  return result;
})();


// ==================== DADOS IMPORTADOS (merge do JSON) ====================
// Endereços, quadras e dias trabalhados vindos do arquivo importado.
// São mesclados com os dados iniciais sem sobrescrever nada existente.
const IMPORTED_DATA = {"territories":{"t1":{"addresses":[{"id":"id_1769037703943_l3yz9cl","type":"building","logradouro":"Rua Caririaçu","numero":"850","name":"ED Caririaçu","cep":"60010460","bairro":"Jacarecanga","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"a","apartments":12},{"name":"b","apartments":12}],"totalApartments":24,"portariaType":"porteiro","quadra":"Q09-","portaCarta":true,"portaCartaTipo":"individual"},{"id":"id_1769038190295_lzvxpcg","type":"building","logradouro":"Rua Mário Studart","numero":"90","name":"Ed Bene VII ","cep":"60310042","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":10}],"totalApartments":10,"portariaType":"porteiro","quadra":"Q09-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769039197998_c2b72z3","type":"building","logradouro":"Rua Carlito Pamplona","numero":"181","name":"Ed Flora","cep":"60310023","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"interfone","quadra":"Q06-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769039765726_oirdo7x","type":"building","logradouro":"Rua Mário Studart","numero":"223","name":"Ed R_do SP Silvestre","cep":"60310042","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"porteiro","quadra":"Q05-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769040265070_d2y68f6","type":"building","logradouro":"Rua Comendador Luís Ribeiro","numero":"705","name":"Ed Agripino","cep":"60326330","bairro":"Jacarecanga","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":1}],"totalApartments":1,"portariaType":"interfone","quadra":"Q04-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769040552038_ox3rbk0","type":"building","logradouro":"Rua Ametista","numero":"440","name":"Ed Sem Nome","cep":"60326300","bairro":"Jacarecanga","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12},{"name":"2","apartments":12}],"totalApartments":24,"portariaType":"porteiro","quadra":"Q04-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769040985726_dpuz3u0","type":"building","logradouro":"Rua Carlito Pamplona","numero":"258","name":"Ed Fita Branca 2","cep":"60310023","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"porteiro","quadra":"Q04-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769041042247_ag7hfyv","type":"building","logradouro":"Rua Carlito Pamplona","numero":"248","name":"Ed Fita Branca 1","cep":"60310023","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"porteiro","quadra":"Q04-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769041678494_vloq71h","type":"building","logradouro":"Rua Mário Studart","numero":"254","name":"Ed Souza","cep":"60310042","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12},{"name":"2","apartments":12}],"totalApartments":24,"portariaType":"porteiro","quadra":"Q03-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769042038694_fucci93","type":"building","logradouro":"Rua Ametista","numero":"344","name":"Ed Ananias","cep":"60310053","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":4},{"name":"2","apartments":4}],"totalApartments":8,"portariaType":"interfone","quadra":"Q03-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769042405390_i6hn2pb","type":"building","logradouro":"Rua Ametista","numero":"350","name":"Ed Ametista","cep":"60310053","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12},{"name":"2","apartments":12},{"name":"3","apartments":12}],"totalApartments":36,"portariaType":"interfone","quadra":"Q03-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769042800766_nlkybr0","type":"building","logradouro":"Rua Carlito Pamplona","numero":"201","name":"Ed Sem Nome","cep":"60310023","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"porteiro","quadra":"Q07-","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769043266942_4ywkwt5","type":"building","logradouro":"Rua Padre Anchieta","numero":"240","name":"Ed Sem Nome","cep":"60325505","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"porteiro","quadra":"Q02-","portaCarta":false,"portaCartaTipo":"coletivo"}],"diasTrabalhados":[],"quadras":[]},"t2":{"addresses":[{"id":"id_1769471039802_rd3vm73","type":"building","logradouro":"Rua Naturalista Feijó","numero":"297","name":"SEM NOME","quadra":"Q03-","cep":"60326220","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"A","apartments":3}],"totalApartments":3,"portariaType":"interfone","portaCarta":true,"portaCartaTipo":"coletivo"},{"id":"id_1769471474482_w5rjh52","type":"building","logradouro":"Rua Mário Studart","numero":"535","name":"ED Danielly","quadra":"q03-","cep":"60326025","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"porteiro","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769471619722_20u2h2v","type":"building","logradouro":"Rua Mário Studart","numero":"487","name":"ED Sem nom","quadra":"Q03-","cep":"60326025","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"interfone","portaCarta":true,"portaCartaTipo":"coletivo"},{"id":"id_1769471884233_238zntp","type":"building","logradouro":"Rua Mário Studart","numero":"460","name":"ED Sem Nome","quadra":"Q05-","cep":"60326025","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"interfone","portaCarta":true,"portaCartaTipo":"coletivo"},{"id":"id_1769472346217_ln7bhnf","type":"building","logradouro":"Rua Fernando Weyne","numero":"115","name":"ED Crato Residence","quadra":"q04-","cep":"60326010","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"A","apartments":11},{"name":"B","apartments":8},{"name":"C","apartments":16}],"totalApartments":35,"portariaType":"interfone","portaCarta":true,"portaCartaTipo":"coletivo"},{"id":"id_1769472806544_2k8jxpi","type":"building","logradouro":"Rua Gérson Faria","numero":"591","name":"ED SEM NOME","quadra":"Q07-","cep":"60326020","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":11}],"totalApartments":11,"portariaType":"interfone","portaCarta":true,"portaCartaTipo":"coletivo"}],"diasTrabalhados":[],"quadras":[]},"t3":{"addresses":[{"id":"id_1769564093991_tke2iry","type":"building","logradouro":"Avenida Sargento Hermínio Sampaio","numero":"950","name":"Condomínio do Edifício Mauricelia","quadra":"Q03- ","cep":"60326500","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"A","apartments":8},{"name":"B","apartments":8},{"name":"C","apartments":8}],"totalApartments":24,"portariaType":"porteiro","portaCarta":true,"portaCartaTipo":"coletivo"},{"id":"id_1769564340463_4h6kfag","type":"building","logradouro":"Rua Joaquim Lino","numero":"646","name":"SEM NOME","quadra":"Q04- ","cep":"60325444","bairro":"Monte Castelo","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":7}],"totalApartments":7,"portariaType":"sem-portaria","portaCarta":true,"portaCartaTipo":"coletivo"},{"id":"id_1769644590068_9skxqj5","type":"building","logradouro":"Rua Ametista","numero":"30","name":"Sem nome","quadra":"Q05- ","cep":"60326300","bairro":"Jacarecanga","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"interfone","portaCarta":false,"portaCartaTipo":"coletivo"},{"id":"id_1769645069019_89vhp1f","type":"building","logradouro":"Rua Joaquim Lino","numero":"430","name":"Sem nome","quadra":"Q7- ","cep":"60310044","bairro":"Carlito Pamplona","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":12}],"totalApartments":12,"portariaType":"sem-portaria","portaCarta":true,"portaCartaTipo":"coletivo"},{"id":"id_1769645642931_f5dc2mq","type":"building","logradouro":"Rua Naturalista Feijó","numero":"109","name":"Sem nome","quadra":"Q04-","cep":"60326302","bairro":"Jacarecanga","cidade":"Fortaleza","uf":"CE","blocks":[{"name":"1","apartments":4}],"totalApartments":4,"portariaType":"sem-portaria","portaCarta":false,"portaCartaTipo":"coletivo"}],"diasTrabalhados":[],"quadras":[]},"t4":{"addresses":[],"diasTrabalhados":[],"quadras":[]},"t5":{"addresses":[],"diasTrabalhados":[],"quadras":[]},"t6":{"addresses":[],"diasTrabalhados":[],"quadras":[]},"t7":{"addresses":[],"diasTrabalhados":[],"quadras":[]},"t8":{"addresses":[],"diasTrabalhados":[],"quadras":[]}},"apartmentNotes":{},"addressNotes":{}};

// _mergeImportedData removida — substituída por Storage._smartMerge()

const STATUS_LABELS={
  'nao-visitado':'📘 Não Visitado','ausente':'🚪 Ausente','conversado':'💬 Conversado',
  'carta':'✉️ Deixou Carta','folheto':'📄 Deixou Folheto','recusou':'🚫 Recusou','estudo':'📚 Estudo'
};
const STATUS_COLORS={
  'nao-visitado':'#0891b2','ausente':'#ea580c','conversado':'#16a34a',
  'carta':'#7c3aed','folheto':'#d97706','recusou':'#dc2626','estudo':'#0e7490'
};
const PORTARIA_TYPES={
  'sem-portaria':'🚪 Sem Portaria','porteiro':'👨‍💼 Porteiro','eletronica':'🔐 Eletrônica','interfone':'📞 Interfone'
};

const AppState={
  territories:{},apartmentNotes:{},addressNotes:{},
  currentTerritory:null,currentBuilding:null,currentBlock:null,
  currentApartment:null,currentAddress:null,currentQuadra:null,
  editingBuildingId:null,editingQuadraId:null,
  history:[],historyIndex:-1
};

const Utils={
  generateId(){return 'id_'+Date.now()+'_'+Math.random().toString(36).slice(2,9);},
  escapeHtml(text){var d=document.createElement('div');d.textContent=text||'';return d.innerHTML;},
  deepClone(obj){return JSON.parse(JSON.stringify(obj));},
  formatDate(date,options){
    if(!date)return'';
    var p=date.split('-');
    var d=new Date(parseInt(p[0]),parseInt(p[1])-1,parseInt(p[2]));
    return d.toLocaleDateString('pt-BR',options||{});
  },
  todayISO(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');},
  truncateText(text,max){if(!text)return'';return text.length>max?text.substring(0,max)+'...':text;},
  fmtCEP(v){v=v.replace(/\D/g,'').slice(0,8);return v.length>5?v.slice(0,5)+'-'+v.slice(5):v;},
  // ── Ordenação numérica → alfabética (pt-BR) ──────────────────────
  _leadingNum(str){var m=String(str||'').trim().match(/^(\d+)/);return m?parseInt(m[1]):Infinity;},
  cmp(a,b){
    var na=this._leadingNum(a),nb=this._leadingNum(b);
    if(na!==nb)return na-nb;
    return String(a||'').localeCompare(String(b||''),'pt-BR',{sensitivity:'base',numeric:true});
  },
  sortBy(arr,fieldFn){arr.sort((a,b)=>this.cmp(fieldFn(a),fieldFn(b)));return arr;}
};

const Toast={
  element:null,timeout:null,
  init(){this.element=document.getElementById('toast');},
  show(msg,dur){
    if(!this.element)return;
    this.element.textContent=msg;this.element.classList.add('show');
    clearTimeout(this.timeout);
    this.timeout=setTimeout(()=>this.element.classList.remove('show'),dur||CONFIG.TOAST_DURATION);
  }
};

const Tooltip={
  element:null,timeout:null,
  init(){this.element=document.getElementById('tooltipContainer');},
  show(el,content){
    if(!this.element)return;
    clearTimeout(this.timeout);
    this.timeout=setTimeout(()=>{
      this.element.innerHTML=content;this.element.classList.add('show');this.position(el);
    },CONFIG.TOOLTIP_DELAY);
  },
  hide(){
    if(!this.element)return;
    clearTimeout(this.timeout);this.element.classList.remove('show');
  },
  position(el){
    if(!this.element)return;
    var rect=el.getBoundingClientRect(),p=10;
    setTimeout(()=>{
      var tr=this.element.getBoundingClientRect();
      var left=rect.left+rect.width/2-tr.width/2;
      var top=rect.bottom+p;
      if(top+tr.height>window.innerHeight-p)top=rect.top-tr.height-p;
      if(left<p)left=p;
      if(left+tr.width>window.innerWidth-p)left=window.innerWidth-tr.width-p;
      this.element.style.left=left+'px';this.element.style.top=top+'px';
    },0);
  }
};

const Theme={
  load(){var s=localStorage.getItem('theme');this.apply(s||'light');},
  toggle(){var c=document.documentElement.getAttribute('data-theme');this.apply(c==='dark'?'light':'dark');},
  apply(theme){
    document.documentElement.setAttribute('data-theme',theme);
    var btn=document.getElementById('themeBtn');
    if(btn)btn.innerHTML=theme==='dark'?'☀️ <span class="btn-label">Tema</span>':'🌙 <span class="btn-label">Tema</span>';
    localStorage.setItem('theme',theme);
  }
};

const Modal={
  open(id){var m=document.getElementById(id);if(!m)return;m.classList.add('show');m.setAttribute('aria-hidden','false');},
  close(id){var m=document.getElementById(id);if(!m)return;m.classList.remove('show');m.setAttribute('aria-hidden','true');},
  closeAll(){document.querySelectorAll('.modal.show').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true');});}
};

const CEP={
  async search(cepRaw){
    var cep=cepRaw.replace(/\D/g,'');
    if(cep.length!==8){Toast.show('⚠️ CEP inválido');return null;}
    try{
      var r=await fetch('https://viacep.com.br/ws/'+cep+'/json/');
      var d=await r.json();
      if(d.erro){Toast.show('❌ CEP não encontrado');return null;}
      return d;
    }catch{Toast.show('❌ Erro ao buscar CEP');return null;}
  }
};

const History={
  save(){
    var state=Utils.deepClone({territories:AppState.territories,apartmentNotes:AppState.apartmentNotes,addressNotes:AppState.addressNotes});
    AppState.history.splice(AppState.historyIndex+1);
    AppState.history.push(state);
    if(AppState.history.length>CONFIG.MAX_HISTORY)AppState.history.shift();
    AppState.historyIndex=AppState.history.length-1;
    this.updateButtons();
  },
  undo(){
    if(AppState.historyIndex<=0){Toast.show('⚠️ Nada para desfazer');return;}
    AppState.historyIndex--;this.restore(AppState.history[AppState.historyIndex]);Toast.show('↶ Desfeito');
  },
  redo(){
    if(AppState.historyIndex>=AppState.history.length-1){Toast.show('⚠️ Nada para refazer');return;}
    AppState.historyIndex++;this.restore(AppState.history[AppState.historyIndex]);Toast.show('↷ Refeito');
  },
  restore(state){
    AppState.territories=Utils.deepClone(state.territories);
    AppState.apartmentNotes=Utils.deepClone(state.apartmentNotes);
    AppState.addressNotes=Utils.deepClone(state.addressNotes);
    UI.renderTerritories();
    if(AppState.currentTerritory&&AppState.territories[AppState.currentTerritory])Territory.open(AppState.currentTerritory);
    else UI.renderOverview();
    this.updateButtons();
  },
  updateButtons(){
    var u=document.getElementById('undoBtn'),r=document.getElementById('redoBtn');
    if(u)u.disabled=AppState.historyIndex<=0;
    if(r)r.disabled=AppState.historyIndex>=AppState.history.length-1;
  }
};

const Storage={

  // ─────────────────────────────────────────────────────────────────
  // MERGE INTELIGENTE
  // Recebe `incoming` (objeto do JSON importado / localStorage) e
  // mescla sobre o estado atual sem jamais apagar dados existentes.
  //
  // Regras:
  //  • Territórios novos no incoming são ADICIONADOS.
  //  • Territórios já existentes são MESCLADOS campo a campo:
  //      - nome/cor/cep/fixado: atualiza só se o valor atual for vazio/default.
  //      - addresses: adiciona pelo id — nunca duplica.
  //      - quadras: adiciona pelo id — nunca duplica.
  //      - diasTrabalhados: adiciona pelo id ou data — nunca duplica.
  //  • apartmentNotes / addressNotes: adiciona chaves novas; NÃO sobrescreve
  //    notas que já existam no estado atual (o usuário é a fonte da verdade).
  // ─────────────────────────────────────────────────────────────────
  _smartMerge(incoming){
    if(!incoming)return;

    // ── Territórios ────────────────────────────────────────────────
    var srcTs=incoming.territories||{};
    Object.keys(srcTs).forEach(function(tid){
      var srcT=srcTs[tid];
      if(!AppState.territories[tid]){
        // Território completamente novo → adiciona com quadras vazias
        AppState.territories[tid]=Utils.deepClone(srcT);
        if(!AppState.territories[tid].quadras)AppState.territories[tid].quadras=[];
        return;
      }
      var dst=AppState.territories[tid];

      // Metadados: só atualiza se o campo local estiver vazio/padrão
      if(!dst.nome&&srcT.nome)dst.nome=srcT.nome;
      if(!dst.cep&&srcT.cep)dst.cep=srcT.cep;
      // cor: mantém a cor atual sempre (evita flash visual)

      // addresses — mescla por id
      if(!dst.addresses)dst.addresses=[];
      var addrIds=new Set(dst.addresses.map(function(a){return a.id;}));
      (srcT.addresses||[]).forEach(function(a){
        if(!addrIds.has(a.id)){dst.addresses.push(Utils.deepClone(a));addrIds.add(a.id);}
      });

      // quadras — mescla por id
      if(!dst.quadras)dst.quadras=[];
      var qIds=new Set(dst.quadras.map(function(q){return q.id;}));
      (srcT.quadras||[]).forEach(function(q){
        if(!qIds.has(q.id)){dst.quadras.push(Utils.deepClone(q));qIds.add(q.id);}
      });

      // diasTrabalhados — mescla por id ou data
      if(!dst.diasTrabalhados)dst.diasTrabalhados=[];
      var diaKeys=new Set(dst.diasTrabalhados.map(function(d){return d.id||d.data;}));
      (srcT.diasTrabalhados||[]).forEach(function(d){
        var k=d.id||d.data;
        if(!diaKeys.has(k)){dst.diasTrabalhados.push(Utils.deepClone(d));diaKeys.add(k);}
      });
      // Reordena dias
      dst.diasTrabalhados.sort(function(a,b){return b.data.localeCompare(a.data);});
    });

    // ── Notas de apartamento ───────────────────────────────────────
    // Nunca sobrescreve uma nota existente — o estado atual é fonte da verdade
    var aN=incoming.apartmentNotes||{};
    Object.keys(aN).forEach(function(k){
      if(!AppState.apartmentNotes[k])AppState.apartmentNotes[k]=aN[k];
    });

    // ── Notas de endereço ──────────────────────────────────────────
    var adN=incoming.addressNotes||{};
    Object.keys(adN).forEach(function(k){
      if(!AppState.addressNotes[k])AppState.addressNotes[k]=adN[k];
    });
  },

  // ─────────────────────────────────────────────────────────────────
  // LOAD — inicialização do app
  // Ordem: localStorage → <script embed> → INITIAL_TERRITORIES
  // Depois sempre aplica o IMPORTED_DATA (merge estático embutido)
  // ─────────────────────────────────────────────────────────────────
  load(fromJson){
    try{
      // 1. Base: localStorage ou INITIAL_TERRITORIES
      var raw=localStorage.getItem(CONFIG.STORAGE_KEY);
      var base=raw?JSON.parse(raw):null;

      if(base&&base.territories){
        AppState.territories=Utils.deepClone(base.territories);
        AppState.apartmentNotes=Utils.deepClone(base.apartmentNotes||{});
        AppState.addressNotes=Utils.deepClone(base.addressNotes||{});
      }else{
        AppState.territories=Utils.deepClone(INITIAL_TERRITORIES);
        AppState.apartmentNotes={};AppState.addressNotes={};
      }

      // 2. Migração estrutural (garante campo quadras em todos)
      this._migrate();

      // 3. Sempre mescla o IMPORTED_DATA embutido no código
      //    (dados iniciais dos territórios 1-8 + estrutura T9-T21)
      this._smartMerge(IMPORTED_DATA);

      // 4. Se veio um JSON externo (importação manual), mescla em cima
      if(fromJson){
        this._smartMerge(fromJson);
        History.save();
        this.persist(); // salva o resultado no localStorage
        UI.renderTerritories();UI.renderOverview();
        var totalEnd=Object.values(fromJson.territories||{}).reduce(function(s,t){return s+(t.addresses?.length||0);},0);
        var totalQ=Object.values(fromJson.territories||{}).reduce(function(s,t){return s+(t.quadras?.length||0);},0);
        Toast.show('✅ Mesclado! +'+totalEnd+' end., +'+totalQ+' quadras adicionadas.',4000);
        return;
      }

      History.save();
    }catch(e){
      console.error('Erro ao carregar:',e);
      AppState.territories=Utils.deepClone(INITIAL_TERRITORIES);
      AppState.apartmentNotes={};AppState.addressNotes={};
      this._migrate();History.save();
    }
  },

  _migrate(){
    // Garante campo quadras em todos os territórios e ordena tudo
    Object.values(AppState.territories).forEach(function(t){
      if(!t.quadras)t.quadras=[];
      if(!t.addresses)t.addresses=[];
      if(!t.diasTrabalhados)t.diasTrabalhados=[];
      // Ordena quadras: numérico → alfabético
      t.quadras.sort(function(a,b){return Utils.cmp(a.nome||(a.numero||''),b.nome||(b.numero||''));});
      // Ordena endereços: casas antes de prédios, depois logradouro → número
      t.addresses.sort(function(a,b){
        if(a.type!==b.type)return a.type==='house'?-1:1;
        var lc=Utils.cmp(a.logradouro,b.logradouro);if(lc!==0)return lc;
        return Utils.cmp(String(a.numero||''),String(b.numero||''));
      });
      // Ordena dias: mais recente primeiro (já feito no addWorkDay, mas garante)
      t.diasTrabalhados.sort(function(a,b){return b.data.localeCompare(a.data);});
    });
    // Garante que todos os territórios do INITIAL existam
    Object.keys(INITIAL_TERRITORIES).forEach(function(tid){
      if(!AppState.territories[tid]){
        AppState.territories[tid]=Utils.deepClone(INITIAL_TERRITORIES[tid]);
      }
    });
  },

  persist(){
    try{
      var data={
        territories:AppState.territories,
        apartmentNotes:AppState.apartmentNotes,
        addressNotes:AppState.addressNotes,
        savedAt:new Date().toISOString(),
        version:'2.1'
      };
      localStorage.setItem(CONFIG.STORAGE_KEY,JSON.stringify(data));
      Toast.show('💾 Salvo!');
    }catch(e){
      // localStorage cheio?
      try{
        // Tenta limpar histórico antigo e salvar de novo
        localStorage.removeItem(CONFIG.HISTORY_KEY);
        localStorage.setItem(CONFIG.STORAGE_KEY,JSON.stringify({
          territories:AppState.territories,
          apartmentNotes:AppState.apartmentNotes,
          addressNotes:AppState.addressNotes,
          savedAt:new Date().toISOString(),
          version:'2.1'
        }));
        Toast.show('💾 Salvo (histórico limpo)!');
      }catch{Toast.show('❌ Erro ao salvar — armazenamento cheio');}
    }
  },

  exportData(){
    var data={
      territories:AppState.territories,
      apartmentNotes:AppState.apartmentNotes,
      addressNotes:AppState.addressNotes,
      exportedAt:new Date().toISOString(),
      version:'2.1'
    };
    var blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='territorios_'+new Date().toISOString().slice(0,10)+'.json';
    a.click();
    Toast.show('📤 Exportado!');
  },

  // importData — lê o arquivo, detecta territórios desconhecidos e abre pop-up
  importData(file){
    var reader=new FileReader();
    reader.onload=function(e){
      try{
        var parsed=JSON.parse(e.target.result);
        ImportWizard.open(parsed);
      }catch{Toast.show('❌ Arquivo JSON inválido');}
    };
    reader.readAsText(file);
  }
};

const Share={
  copySummary(){
    var ts=Object.values(AppState.territories);
    var lines=ts.map(t=>'T'+t.numero+' '+t.nome+': '+(t.addresses?.length||0)+' end., '+(t.quadras?.length||0)+' quadras, '+(t.diasTrabalhados?.length||0)+' dias');
    var text='📊 Sistema de Territórios — Monte Castelo / Centro\n'+new Date().toLocaleDateString('pt-BR')+'\n\n'+lines.join('\n');
    navigator.clipboard?.writeText(text).then(()=>Toast.show('📋 Copiado!')).catch(()=>Toast.show('❌ Erro'));
  },
  whatsapp(){
    var ts=Object.values(AppState.territories);
    var lines=ts.map(t=>'T'+t.numero+' '+t.nome+': '+(t.addresses?.length||0)+' end. · '+(t.diasTrabalhados?.length||0)+' dias');
    var text='📊 *Territórios — Monte Castelo / Centro*\n'+new Date().toLocaleDateString('pt-BR')+'\n\n'+lines.join('\n');
    window.open('https://wa.me/?text='+encodeURIComponent(text),'_blank');
  }
};

const RotaMax={
  openWithTerritory(territoryId){
    var territory=AppState.territories[territoryId];
    if(!territory)return;
    var addresses=(territory.addresses||[]).map(addr=>{
      if(addr.logradouro)return{logradouro:addr.logradouro,numero:addr.numero||'',bairro:addr.bairro||'',cep:addr.cep||'',display:addr.logradouro+', '+addr.numero};
      return null;
    }).filter(Boolean);
    if(!addresses.length){Toast.show('⚠️ Nenhum endereço cadastrado');return;}
    localStorage.setItem('rotamax_preload',JSON.stringify({addresses:addresses,territoryName:territory.numero+'. '+territory.nome}));
    window.open('criador_de_quadra.html','_blank');
  }
};

const Address={
  getNote(tId,aId){return AppState.addressNotes[tId+'_'+aId]||null;},
  saveNote(tId,aId,data){History.save();AppState.addressNotes[tId+'_'+aId]=data;Storage.persist();Toast.show('💾 Salvo!');},
  deleteNote(tId,aId){History.save();delete AppState.addressNotes[tId+'_'+aId];Storage.persist();Toast.show('🗑️ Removido');},
  delete(tId,aId){
    if(!confirm('🗑️ Remover endereço?'))return;
    History.save();
    var t=AppState.territories[tId];if(!t)return;
    t.addresses=t.addresses.filter(a=>a.id!==aId);
    Object.keys(AppState.apartmentNotes).forEach(k=>{if(k.startsWith(tId+'_'+aId))delete AppState.apartmentNotes[k];});
    Object.keys(AppState.addressNotes).forEach(k=>{if(k===tId+'_'+aId)delete AppState.addressNotes[k];});
    Storage.persist();Territory.open(tId);
  }
};

const Apartment={
  getNote(tId,bId,blk,apt){return AppState.apartmentNotes[tId+'_'+bId+'_'+blk+'_'+apt]||null;},
  saveNote(tId,bId,blk,apt,data){History.save();AppState.apartmentNotes[tId+'_'+bId+'_'+blk+'_'+apt]=data;Storage.persist();Toast.show('💾 Salvo!');},
  deleteNote(tId,bId,blk,apt){History.save();delete AppState.apartmentNotes[tId+'_'+bId+'_'+blk+'_'+apt];Storage.persist();Toast.show('🗑️ Removido');},
  getStats(tId,bId){
    var t=AppState.territories[tId],b=t?.addresses?.find(a=>a.id===bId);
    if(!b)return{visited:0,notVisited:0,total:0};
    var visited=0,total=0;
    b.blocks.forEach(blk=>{
      for(var i=1;i<=blk.apartments;i++){total++;if(this.getNote(tId,bId,blk.name,String(i).padStart(2,'0')))visited++;}
    });
    return{visited:visited,notVisited:total-visited,total:total};
  }
};

const Quadra={
  create(tId,qData){
    var t=AppState.territories[tId];if(!t)return;
    History.save();
    var id=Utils.generateId();
    var q={id:id,nome:qData.nome||'',numero:qData.numero||'',logradouro:qData.logradouro||'',
      bairro:qData.bairro||'',cep:qData.cep||'',
      lado_a:parseInt(qData.lado_a)||0,lado_b:parseInt(qData.lado_b)||0,
      lado_c:parseInt(qData.lado_c)||0,lado_d:parseInt(qData.lado_d)||0,
      obs:qData.obs||'',createdAt:new Date().toISOString()};
    if(!t.quadras)t.quadras=[];
    t.quadras.push(q);
    t.quadras.sort((a,b)=>Utils.cmp(a.nome||(a.numero||''),b.nome||(b.numero||'')));
    Storage.persist();
    var total=(q.lado_a+q.lado_b+q.lado_c+q.lado_d);
    Toast.show('✅ Quadra "'+(q.nome||q.numero)+'" criada com '+total+' casas!');
    Territory.open(tId);
  },
  edit(tId,qId,qData){
    var t=AppState.territories[tId];if(!t)return;
    History.save();
    var q=t.quadras.find(q=>q.id===qId);if(!q)return;
    Object.assign(q,qData);
    q.lado_a=parseInt(qData.lado_a)||0;q.lado_b=parseInt(qData.lado_b)||0;
    q.lado_c=parseInt(qData.lado_c)||0;q.lado_d=parseInt(qData.lado_d)||0;
    Storage.persist();Toast.show('✏️ Quadra atualizada!');Territory.open(tId);
  },
  delete(tId,qId){
    if(!confirm('🗑️ Remover esta quadra?'))return;
    var t=AppState.territories[tId];if(!t)return;
    History.save();
    t.quadras=t.quadras.filter(q=>q.id!==qId);
    Object.keys(AppState.addressNotes).forEach(k=>{if(k.includes('_quadra_'+qId))delete AppState.addressNotes[k];});
    Storage.persist();Toast.show('🗑️ Quadra removida');Territory.open(tId);
  },
  getNote(tId,qId,lado,num){return AppState.addressNotes[tId+'_quadra_'+qId+'_'+lado+'_'+num]||null;},
  saveNote(tId,qId,lado,num,data){History.save();AppState.addressNotes[tId+'_quadra_'+qId+'_'+lado+'_'+num]=data;Storage.persist();Toast.show('💾 Salvo!');},
  deleteNote(tId,qId,lado,num){History.save();delete AppState.addressNotes[tId+'_quadra_'+qId+'_'+lado+'_'+num];Storage.persist();Toast.show('🗑️ Removido');},
  getStats(tId,qId){
    var t=AppState.territories[tId],q=t?.quadras?.find(q=>q.id===qId);
    if(!q)return{visited:0,total:0,notVisited:0};
    var total=(q.lado_a||0)+(q.lado_b||0)+(q.lado_c||0)+(q.lado_d||0);
    var visited=0;
    ['a','b','c','d'].forEach(lado=>{
      var count=q['lado_'+lado]||0;
      for(var i=1;i<=count;i++){if(this.getNote(tId,qId,lado,i))visited++;}
    });
    return{visited:visited,total:total,notVisited:total-visited};
  },
  getTotalStats(tId){
    var t=AppState.territories[tId];
    if(!t?.quadras?.length)return{visited:0,total:0};
    return t.quadras.reduce((acc,q)=>{var s=this.getStats(tId,q.id);return{visited:acc.visited+s.visited,total:acc.total+s.total};},{visited:0,total:0});
  }
};

const Territory={
  open(tId){
    AppState.currentTerritory=tId;
    var t=AppState.territories[tId];
    if(!t){UI.renderOverview();return;}
    UI.renderTerritoryView(t);UI.updateActiveTab(tId);
    if(window.innerWidth<=768)UI.closeSidebar();
  },
  create(data){
    History.save();
    var id='t'+Date.now();
    var idx=Object.keys(AppState.territories).length;
    AppState.territories[id]={id:id,numero:data.numero,nome:data.nome,cep:data.cep||'',
      cor:TERRITORY_COLORS[idx%TERRITORY_COLORS.length],addresses:[],quadras:[],diasTrabalhados:[],fixado:false};
    Storage.persist();UI.renderTerritories();Territory.open(id);Toast.show('✅ Território '+data.numero+' criado!');
  },
  togglePin(tId){
    var t=AppState.territories[tId];if(!t)return;
    History.save();t.fixado=!t.fixado;Storage.persist();UI.renderTerritories();this.open(tId);
    Toast.show(t.fixado?'📌 Fixado':'📍 Desfixado');
  },
  delete(tId){
    if(!confirm('🗑️ Deletar território '+AppState.territories[tId]?.nome+'?'))return;
    History.save();delete AppState.territories[tId];
    Object.keys(AppState.apartmentNotes).forEach(k=>{if(k.startsWith(tId+'_'))delete AppState.apartmentNotes[k];});
    Object.keys(AppState.addressNotes).forEach(k=>{if(k.startsWith(tId+'_'))delete AppState.addressNotes[k];});
    Storage.persist();UI.renderTerritories();AppState.currentTerritory=null;UI.renderOverview();Toast.show('🗑️ Removido');
  },
  addWorkDay(tId,dayData){
    var t=AppState.territories[tId];if(!t)return;
    History.save();
    var newDay={id:Utils.generateId(),data:dayData.data,ruas:dayData.ruas,obs:dayData.obs};
    if(!t.diasTrabalhados)t.diasTrabalhados=[];
    t.diasTrabalhados.push(newDay);
    t.diasTrabalhados.sort((a,b)=>b.data.localeCompare(a.data));
    Storage.persist();this.open(tId);Toast.show('📅 Dia registrado!');
  },
  deleteWorkDay(tId,idx){
    var t=AppState.territories[tId];
    if(!t||!confirm('Deletar dia?'))return;
    History.save();t.diasTrabalhados.splice(idx,1);Storage.persist();this.open(tId);
  },
  addHouse(tId,addressData){
    var t=AppState.territories[tId];if(!t)return;
    History.save();
    var addr={id:Utils.generateId(),type:'house',logradouro:addressData.logradouro||'',numero:addressData.numero||'',
      quadra:addressData.quadra||'',bairro:addressData.bairro||'',cep:addressData.cep||'',cidade:'Fortaleza',uf:'CE',createdAt:new Date().toISOString()};
    if(!t.addresses)t.addresses=[];
    t.addresses.push(addr);
    t.addresses.sort(function(a,b){var lcmp=Utils.cmp(a.logradouro,b.logradouro);if(lcmp!==0)return lcmp;return Utils.cmp(String(a.numero||''),String(b.numero||''));});
    Storage.persist();Territory.open(tId);Toast.show('🏠 Casa adicionada!');
  },
  addBuilding(tId,bData){
    var t=AppState.territories[tId];if(!t)return;
    History.save();
    var b={id:Utils.generateId(),type:'building',logradouro:bData.logradouro||'',numero:bData.numero||'',quadra:bData.quadra||'',
      name:bData.name||'',bairro:bData.bairro||'',cep:bData.cep||'',portariaType:bData.portariaType||'sem-portaria',
      portaCarta:bData.portaCarta||false,portaCartaTipo:bData.portaCartaTipo||'coletivo',blocks:bData.blocks||[],
      totalApartments:(bData.blocks||[]).reduce((s,bl)=>s+(bl.apartments||0),0),createdAt:new Date().toISOString()};
    if(!t.addresses)t.addresses=[];
    t.addresses.push(b);
    t.addresses.sort(function(a,b){var lcmp=Utils.cmp(a.logradouro,b.logradouro);if(lcmp!==0)return lcmp;return Utils.cmp(String(a.numero||''),String(b.numero||''));});
    Storage.persist();Territory.open(tId);Toast.show('🏢 Prédio adicionado!');
  }
};

const UI={
  renderTerritories(){
    var list=document.getElementById('territoriesList');
    var search=(document.getElementById('territorySearch')?.value||'').toLowerCase();
    var total=document.getElementById('totalTerritories');
    if(!list)return;
    var ts=Object.values(AppState.territories||{})
      .filter(t=>!search||(''+t.numero+' '+t.nome).toLowerCase().includes(search))
      .sort((a,b)=>{
        if(a.fixado!==b.fixado)return b.fixado-a.fixado;
        if(a.numero!==b.numero)return a.numero-b.numero;
        return Utils.cmp(a.nome,b.nome);
      });
    if(total)total.textContent=Object.keys(AppState.territories||{}).length;
    list.innerHTML=ts.map(t=>{
      var qs=Quadra.getTotalStats(t.id);
      var prog=qs.total?Math.round(qs.visited/qs.total*100):0;
      var isActive=t.id===AppState.currentTerritory;
      return '<div class="tab'+(isActive?' active':'')+'" data-id="'+t.id+'" role="tab" onclick="Territory.open(\''+t.id+'\')" style="border-left:4px solid '+t.cor+'">'+
        '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">'+
        '<span style="font-size:1.1rem">'+(t.fixado?'📌':'🗺️')+'</span>'+
        '<div style="flex:1;min-width:0">'+
        '<div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+t.numero+'. '+Utils.escapeHtml(t.nome)+'</div>'+
        '<div style="font-size:.72rem;color:var(--text-secondary);margin-top:2px">'+(t.addresses?.length||0)+' end. · '+(t.quadras?.length||0)+' quad. · '+(t.diasTrabalhados?.length||0)+' dias</div>'+
        (qs.total>0?'<div style="height:3px;background:var(--border);border-radius:99px;overflow:hidden;margin-top:4px"><div style="height:100%;width:'+prog+'%;background:'+t.cor+';border-radius:99px"></div></div>':'')+
        '</div></div></div>';
    }).join('');
  },

  renderOverview(){
    var mc=document.getElementById('mainContent');if(!mc)return;
    AppState.currentTerritory=null;
    var ts=Object.values(AppState.territories||{});
    var totalQ=ts.reduce((s,t)=>s+(t.quadras?.length||0),0);
    var totalA=ts.reduce((s,t)=>s+(t.addresses?.length||0),0);
    var totalB=ts.reduce((s,t)=>s+(t.addresses?.filter(a=>a.type==='building').length||0),0);
    var totalApts=ts.reduce((s,t)=>s+(t.addresses?.filter(a=>a.type==='building').reduce((ss,b)=>ss+(b.totalApartments||0),0)||0),0);
    var totalD=ts.reduce((s,t)=>s+(t.diasTrabalhados?.length||0),0);
    var totalC=ts.reduce((s,t)=>s+(t.addresses?.filter(a=>a.type==='house').length||0),0);
    var gQ=ts.reduce((acc,t)=>{var s=Quadra.getTotalStats(t.id);return{visited:acc.visited+s.visited,total:acc.total+s.total};},{visited:0,total:0});
    var gProg=gQ.total?Math.round(gQ.visited/gQ.total*100):0;

    mc.innerHTML='<div class="overview-header"><h2>📊 Visão Geral — Territórios</h2><p style="color:var(--text-secondary);margin-top:4px">Monte Castelo / Centro · '+ts.length+' territórios</p></div>'+
    '<div class="stats-grid">'+
    '<div class="stat-card"><h4>'+ts.length+'</h4><p>Territórios</p></div>'+
    '<div class="stat-card"><h4>'+totalQ+'</h4><p>Quadras</p></div>'+
    '<div class="stat-card"><h4>'+totalA+'</h4><p>Endereços</p></div>'+
    '<div class="stat-card"><h4>'+totalC+'</h4><p>Casas</p></div>'+
    '<div class="stat-card"><h4>'+totalB+'</h4><p>Prédios</p></div>'+
    '<div class="stat-card"><h4>'+totalApts+'</h4><p>Aptos</p></div>'+
    '<div class="stat-card"><h4>'+totalD+'</h4><p>Dias Trab.</p></div>'+
    '<div class="stat-card" style="background:linear-gradient(135deg,#16a34a22,transparent)"><h4 style="color:var(--success)">'+gProg+'%</h4><p>Progresso</p></div>'+
    '</div>'+
    (gQ.total>0?'<div class="card" style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><strong>🎯 Progresso Global das Quadras</strong><span style="color:var(--text-secondary);font-size:.82rem">'+gQ.visited+' / '+gQ.total+' casas</span></div><div style="height:10px;background:var(--border);border-radius:99px;overflow:hidden"><div style="height:100%;width:'+gProg+'%;background:var(--success);border-radius:99px;transition:width .6s"></div></div></div>':'')+
    '<div class="card"><h3>🗺️ Todos os Territórios</h3><div class="territories-grid">'+
    ts.sort((a,b)=>{
      if(a.fixado!==b.fixado)return b.fixado-a.fixado;
      if(a.numero!==b.numero)return a.numero-b.numero;
      return Utils.cmp(a.nome,b.nome);
    }).map(t=>{
      var qs=Quadra.getTotalStats(t.id);var prog=qs.total?Math.round(qs.visited/qs.total*100):0;
      return '<div class="territory-overview-card" style="border-top:4px solid '+t.cor+';cursor:pointer" onclick="Territory.open(\''+t.id+'\')">'+
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">'+
        '<div><strong style="font-size:.95rem">'+(t.fixado?'📌':'🗺️')+' '+t.numero+'. '+Utils.escapeHtml(t.nome)+'</strong>'+
        '<div style="color:var(--text-secondary);font-size:.75rem;margin-top:2px">'+t.cep+'</div></div>'+
        (prog>0?'<span class="badge" style="background:'+t.cor+'33;color:'+t.cor+';font-weight:800">'+prog+'%</span>':'')+
        '</div>'+
        '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">'+
        '<span class="mini-badge">📦 '+(t.quadras?.length||0)+' quad.</span>'+
        '<span class="mini-badge">🏠 '+(t.addresses?.filter(a=>a.type==='house').length||0)+' casas</span>'+
        '<span class="mini-badge">🏢 '+(t.addresses?.filter(a=>a.type==='building').length||0)+' pred.</span>'+
        '<span class="mini-badge">📅 '+(t.diasTrabalhados?.length||0)+' dias</span>'+
        '</div>'+
        (qs.total>0?'<div style="height:5px;background:var(--border);border-radius:99px;overflow:hidden"><div style="height:100%;width:'+prog+'%;background:'+t.cor+';border-radius:99px;transition:width .5s"></div></div>':'')+
        '</div>';
    }).join('')+'</div></div>';
    this.updateActiveTab(null);
  },

  renderTerritoryView(t){
    var mc=document.getElementById('mainContent');if(!mc)return;
    var buildings=t.addresses?.filter(a=>a.type==='building')||[];
    var houses=t.addresses?.filter(a=>a.type==='house')||[];
    var quadras=t.quadras||[];
    var mapLink=MAP_LINKS[t.numero]||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(t.nome+', Fortaleza, CE');
    var aptS=buildings.reduce((acc,b)=>{var s=Apartment.getStats(t.id,b.id);return{visited:acc.visited+s.visited,total:acc.total+s.total};},{visited:0,total:0});
    var hN=houses.filter(h=>Address.getNote(t.id,h.id)).length;
    var qS=Quadra.getTotalStats(t.id);
    var totalI=houses.length+aptS.total+qS.total;
    var totalV=hN+aptS.visited+qS.visited;
    var prog=totalI?Math.round(totalV/totalI*100):0;

    mc.innerHTML=
    '<div class="card territory-hero" style="background:linear-gradient(135deg,'+t.cor+'22,transparent);border-left:5px solid '+t.cor+'">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">'+
    '<div style="flex:1;min-width:180px">'+
    '<h2 style="margin-bottom:4px">'+(t.fixado?'📌':'📍')+' Território '+t.numero+': '+Utils.escapeHtml(t.nome)+'</h2>'+
    '<div style="color:var(--muted);font-size:.82rem">'+t.cep+' · '+t.diasTrabalhados.length+' dia(s) · '+t.addresses.length+' end. · '+quadras.length+' quadra(s)</div>'+
    '<div style="display:flex;align-items:center;gap:10px;margin-top:10px">'+
    '<div style="flex:1;height:8px;background:var(--border);border-radius:9999px;overflow:hidden">'+
    '<div style="height:100%;width:'+prog+'%;background:'+t.cor+';border-radius:9999px;transition:width .5s"></div></div>'+
    '<strong style="font-size:.85rem;min-width:36px;text-align:right;color:var(--text-secondary)">'+prog+'%</strong></div>'+
    '<div style="font-size:.75rem;color:var(--muted);margin-top:3px">'+totalV+' / '+totalI+' visitados</div>'+
    '</div>'+
    '<div style="display:flex;gap:6px;flex-wrap:wrap">'+
    '<button class="btn '+(t.fixado?'btn-warning':'btn-success')+'" onclick="Territory.togglePin(\''+t.id+'\')">'+(t.fixado?'📌 Fixado':'📌 Fixar')+'</button>'+
    '<button class="btn btn-success" onclick="UI.showAddWorkDayModal()">📅 Dia</button>'+
    '<a class="btn btn-primary" href="'+mapLink+'" target="_blank" rel="noopener">🗺️ Maps</a>'+
    '<button class="btn btn-routeplanner" onclick="RotaMax.openWithTerritory(\''+t.id+'\')">🗺️ Rota</button>'+
    '<button class="btn btn-danger" onclick="Territory.delete(\''+t.id+'\')">🗑️</button>'+
    '<button class="btn btn-secondary" onclick="UI.renderOverview()">🔙</button>'+
    '</div></div></div>'+

    '<div class="card">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--spacing-md);flex-wrap:wrap;gap:8px">'+
    '<h3>🏘️ Quadras ('+quadras.length+')</h3>'+
    '<button class="btn btn-quadra" onclick="UI.showAddQuadraModal()">➕ Nova Quadra</button>'+
    '</div>'+this._renderQuadras(t)+'</div>'+

    '<div class="card"><h3>📅 Dias Trabalhados ('+t.diasTrabalhados.length+')</h3>'+this._renderWorkDays(t)+'</div>'+

    '<div class="card"><h3>🏘️ Endereços Avulsos ('+t.addresses.length+')</h3>'+this._renderAddresses(t)+'</div>';
  },

  _renderQuadras(t){
    var qs=t.quadras||[];
    if(!qs.length)return '<div class="empty-state"><div style="font-size:3rem;margin-bottom:12px">🏘️</div><p style="color:var(--muted);margin-bottom:16px">Nenhuma quadra cadastrada</p><button class="btn btn-quadra" onclick="UI.showAddQuadraModal()">➕ Criar Primeira Quadra</button></div>';
    var ladoLabel={a:'Norte',b:'Sul',c:'Leste',d:'Oeste'};
    var ladoIcon={a:'⬆️',b:'⬇️',c:'➡️',d:'⬅️'};
    var sortedQuadras=[...qs].sort((a,b)=>Utils.cmp(a.nome||(a.numero||''),b.nome||(b.numero||'')));
    return '<div class="quadras-grid">'+sortedQuadras.map(q=>{
      var stats=Quadra.getStats(t.id,q.id);
      var prog=stats.total?Math.round(stats.visited/stats.total*100):0;
      var lados=['a','b','c','d'].map(lado=>{
        var count=q['lado_'+lado]||0;if(!count)return'';
        var visitedL=0;
        for(var i=1;i<=count;i++){if(Quadra.getNote(t.id,q.id,lado,i))visitedL++;}
        var casas='';
        for(var j=1;j<=count;j++){
          var note=Quadra.getNote(t.id,q.id,lado,j);
          var color=note?(STATUS_COLORS[note.status]||'var(--success)'):'var(--bg-secondary)';
          var tc=note?'#fff':'var(--text)';
          var title=note?(STATUS_LABELS[note.status]||'Visitado'):'Não visitado';
          casas+='<button class="casa-btn" style="background:'+color+';color:'+tc+';border-color:'+color+'" title="'+Utils.escapeHtml(title)+'" onclick="UI.openQuadraCasaModal(\''+t.id+'\',\''+q.id+'\',\''+lado+'\','+j+')">'+j+'</button>';
        }
        return '<div class="lado-section">'+
          '<div class="lado-header"><span>'+ladoIcon[lado]+' Lado '+ladoLabel[lado].toUpperCase()+' ('+count+' casas)</span>'+
          '<span style="font-size:.72rem;color:var(--text-secondary)">'+visitedL+'/'+count+'</span></div>'+
          '<div class="casas-grid">'+casas+'</div></div>';
      }).join('');
      return '<div class="quadra-card" style="border-left:4px solid '+t.cor+'">'+
        '<div class="quadra-card-header">'+
        '<div><strong class="quadra-title">🏘️ '+Utils.escapeHtml(q.nome||('Quadra '+q.numero))+'</strong>'+
        (q.logradouro?'<div class="quadra-sub">'+Utils.escapeHtml(q.logradouro)+'</div>':'')+
        '</div>'+
        '<div style="display:flex;gap:5px">'+
        '<button class="btn-icon" onclick="UI.showEditQuadraModal(\''+t.id+'\',\''+q.id+'\')" title="Editar">✏️</button>'+
        '<button class="btn-icon" onclick="Quadra.delete(\''+t.id+'\',\''+q.id+'\')" title="Excluir">🗑️</button>'+
        '</div></div>'+
        '<div class="quadra-lados">'+lados+'</div>'+
        '<div style="margin-top:10px">'+
        '<div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-secondary);margin-bottom:4px">'+
        '<span>Progresso: '+stats.visited+'/'+stats.total+' casas</span><strong>'+prog+'%</strong></div>'+
        '<div style="height:6px;background:var(--border);border-radius:99px;overflow:hidden">'+
        '<div style="height:100%;width:'+prog+'%;background:'+t.cor+';border-radius:99px;transition:width .5s"></div></div></div>'+
        (q.obs?'<div class="quadra-obs">📝 '+Utils.escapeHtml(q.obs)+'</div>':'')+
        '</div>';
    }).join('')+'</div>';
  },

  _renderWorkDays(t){
    if(!t.diasTrabalhados?.length)return'<p style="color:var(--muted);text-align:center;padding:20px">Nenhum dia registrado</p>';
    return'<div class="address-list">'+t.diasTrabalhados.map((dia,idx)=>{
      var full=Utils.formatDate(dia.data,{weekday:'long',year:'numeric',month:'long',day:'numeric'});
      return'<div class="address-item" style="border-left-color:#7c3aed">'+
        '<div style="flex:1"><strong>📅 '+full+'</strong>'+
        (dia.ruas?'<div style="color:var(--muted);margin-top:3px;font-size:.82rem">🗺️ '+Utils.escapeHtml(Utils.truncateText(dia.ruas,100))+'</div>':'')+
        (dia.obs?'<div style="color:var(--muted);margin-top:2px;font-size:.78rem">📝 '+Utils.escapeHtml(Utils.truncateText(dia.obs,80))+'</div>':'')+
        '</div>'+
        '<button onclick="Territory.deleteWorkDay(\''+t.id+'\','+idx+')" class="btn-icon">🗑️</button></div>';
    }).join('')+'</div>';
  },

  _renderAddresses(t){
    if(!t.addresses?.length){
      return'<p style="color:var(--muted);text-align:center;padding:20px">Nenhum endereço avulso</p>'+
        '<div style="display:flex;gap:8px;justify-content:center;margin-top:16px;flex-wrap:wrap">'+
        '<button class="btn btn-success" onclick="UI.showAddHouseModal()">🏠 Adicionar Casa</button>'+
        '<button class="btn btn-warning" onclick="UI.showAddBuildingModal()">🏢 Adicionar Prédio</button></div>';
    }
    var sortedAddresses=[...t.addresses].sort((a,b)=>{
      // casas antes de prédios
      if(a.type!==b.type)return a.type==='house'?-1:1;
      // dentro do mesmo tipo: quadra → logradouro → numero (num→alpha)
      var qa=a.quadra||'',qb=b.quadra||'';
      var qcmp=Utils.cmp(qa,qb);if(qcmp!==0)return qcmp;
      var lcmp=Utils.cmp(a.logradouro,b.logradouro);if(lcmp!==0)return lcmp;
      return Utils.cmp(String(a.numero||''),String(b.numero||''));
    });
    return'<div style="display:flex;gap:8px;justify-content:flex-end;margin-bottom:12px;flex-wrap:wrap">'+
      '<button class="btn btn-success" onclick="UI.showAddHouseModal()">🏠 Casa</button>'+
      '<button class="btn btn-warning" onclick="UI.showAddBuildingModal()">🏢 Prédio</button></div>'+
      '<div class="address-list">'+sortedAddresses.map(addr=>{
        var isB=addr.type==='building';
        var note=!isB?Address.getNote(t.id,addr.id):null;
        var end=addr.quadra?addr.quadra+' '+addr.logradouro+(addr.name?' · '+addr.name:'')+', Nº '+addr.numero:addr.logradouro+(addr.name?' · '+addr.name:'')+', Nº '+addr.numero;
        var sc=note?(STATUS_COLORS[note.status]||t.cor):(isB?'var(--warning)':t.cor);
        var mUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(addr.logradouro+', '+addr.numero+', '+(addr.bairro||'')+', Fortaleza, CE');
        return'<div class="address-item" style="border-left-color:'+sc+'">'+
          '<div style="flex:1;min-width:0"><strong>'+(isB?'🏢':'🏠')+' '+Utils.escapeHtml(end)+
          (isB?'<span class="badge badge-warning" style="margin-left:6px">🏢 '+addr.totalApartments+' APs</span>':'')+
          (note?'<span class="badge" style="background:'+(STATUS_COLORS[note.status]||'var(--success)')+';color:#fff;margin-left:4px">'+(STATUS_LABELS[note.status]||'✓')+'</span>':'')+
          '</strong><small style="color:var(--muted);display:block;margin-top:3px">'+(addr.cep||'')+(addr.bairro?' · '+addr.bairro:'')+(note?.dia?' · '+Utils.formatDate(note.dia):'')+'</small></div>'+
          '<div style="display:flex;gap:5px;flex-wrap:wrap;flex-shrink:0">'+
          (isB?'<button class="btn btn-warning" onclick="Building.open(\''+addr.id+'\')">🏢 Apts</button><button class="btn btn-info" onclick="Building.editBuilding(\''+addr.id+'\')">✏️</button>':
               '<button class="btn btn-secondary" onclick="UI.showAddressDetails(\''+addr.id+'\')">🔍</button>')+
          '<a class="btn btn-primary" href="'+mUrl+'" target="_blank">🗺️</a>'+
          '<button class="btn btn-danger" onclick="Address.delete(\''+t.id+'\',\''+addr.id+'\')">🗑️</button>'+
          '</div></div>';
      }).join('')+'</div>';
  },

  showAddWorkDayModal(){
    document.getElementById('diaDate').value=Utils.todayISO();
    document.getElementById('diaRuas').value='';
    document.getElementById('diaObs').value='';
    Modal.open('diasModal');
  },
  showAddressDetails(addrId){
    AppState.currentAddress=addrId;
    var t=AppState.territories[AppState.currentTerritory];
    var addr=t.addresses.find(a=>a.id===addrId);if(!addr)return;
    var note=AppState.addressNotes[AppState.currentTerritory+'_'+addrId];
    document.getElementById('addressInfoDisplay').innerHTML='<strong>'+Utils.escapeHtml(addr.logradouro)+', Nº '+Utils.escapeHtml(addr.numero)+'</strong><div style="color:var(--muted);margin-top:4px">'+(addr.cep||'')+' · '+(addr.bairro||'')+'</div>';
    document.getElementById('addressStatusSelect').value=note?.status||'';
    document.getElementById('addressDia').value=note?.dia||'';
    document.getElementById('addressObs').value=note?.obs||'';
    document.getElementById('deleteAddressNoteBtn').style.display=note?'inline-flex':'none';
    Modal.open('addressDetailsModal');
  },
  updateActiveTab(tId){
    document.querySelectorAll('.tab').forEach(tab=>tab.classList.toggle('active',tab.getAttribute('data-id')===tId));
  },
  toggleSidebar(){
    var s=document.getElementById('sidebar'),o=document.getElementById('sidebarOverlay');
    var isOpen=s?.classList.contains('open');
    if(s)s.classList.toggle('open');if(o)o.classList.toggle('show');
    document.getElementById('sidebarToggle')?.setAttribute('aria-expanded',!isOpen);
  },
  closeSidebar(){
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebarOverlay')?.classList.remove('show');
  },
  showAddHouseModal(){
    ['houseCEP','houseLogradouro','houseNumero','houseQuadra','houseBairro'].forEach(id=>{var el=document.getElementById(id);if(el)el.value='';});
    Modal.open('addHouseModal');
  },
  showAddBuildingModal(){
    ['buildingCEP','buildingLogradouro','buildingNumero','buildingName','buildingBairro','buildingQuadra','buildingBlocks'].forEach(id=>{var el=document.getElementById(id);if(el)el.value='';});
    var p=document.getElementById('buildingPortaria');if(p)p.value='sem-portaria';
    var c=document.getElementById('buildingPortaCarta');if(c)c.checked=false;
    var g=document.getElementById('portaCartaTipoGroup');if(g)g.style.display='none';
    var bc=document.getElementById('blockApartmentsContainer');if(bc)bc.innerHTML='';
    AppState.editingBuildingId=null;Modal.open('addBuildingModal');
  },
  showAddQuadraModal(){
    AppState.editingQuadraId=null;
    ['quadraNome','quadraNumero','quadraLogradouro','quadraBairro','quadraCEP','quadraLadoA','quadraLadoB','quadraLadoC','quadraLadoD','quadraObs'].forEach(id=>{var el=document.getElementById(id);if(el)el.value='';});
    document.getElementById('quadraModalTitle').textContent='🏘️ Nova Quadra';
    Modal.open('addQuadraModal');
  },
  showEditQuadraModal(tId,qId){
    var t=AppState.territories[tId],q=t?.quadras?.find(q=>q.id===qId);if(!q)return;
    AppState.editingQuadraId=qId;
    document.getElementById('quadraModalTitle').textContent='✏️ Editar Quadra';
    document.getElementById('quadraNome').value=q.nome||'';
    document.getElementById('quadraNumero').value=q.numero||'';
    document.getElementById('quadraLogradouro').value=q.logradouro||'';
    document.getElementById('quadraBairro').value=q.bairro||'';
    document.getElementById('quadraCEP').value=q.cep||'';
    document.getElementById('quadraLadoA').value=q.lado_a||'';
    document.getElementById('quadraLadoB').value=q.lado_b||'';
    document.getElementById('quadraLadoC').value=q.lado_c||'';
    document.getElementById('quadraLadoD').value=q.lado_d||'';
    document.getElementById('quadraObs').value=q.obs||'';
    Modal.open('addQuadraModal');
  },
  openQuadraCasaModal(tId,qId,lado,num){
    AppState.currentTerritory=tId;AppState.currentQuadra={quadraId:qId,lado:lado,numero:num};
    var note=Quadra.getNote(tId,qId,lado,num);
    var t=AppState.territories[tId],q=t?.quadras?.find(q=>q.id===qId);
    var ladoLabels={a:'Norte',b:'Sul',c:'Leste',d:'Oeste'};
    document.getElementById('quadraCasaTitle').innerHTML='🏠 '+Utils.escapeHtml(q?.nome||('Quadra '+q?.numero))+' — Lado '+( ladoLabels[lado]||lado.toUpperCase())+', Casa Nº '+num;
    document.getElementById('quadraCasaStatus').value=note?.status||'';
    document.getElementById('quadraCasaDia').value=note?.dia||'';
    document.getElementById('quadraCasaObs').value=note?.obs||'';
    document.getElementById('deleteQuadraCasaBtn').style.display=note?'inline-flex':'none';
    Modal.open('quadraCasaModal');
  }
};

const Building={
  open(bId){
    AppState.currentBuilding=bId;
    var t=AppState.territories[AppState.currentTerritory];
    var b=t.addresses.find(a=>a.id===bId);if(!b)return;
    if(b.blocks.length>1){
      var sortedBlocks=[...b.blocks].sort((a,b)=>Utils.cmp(a.name,b.name));
      document.getElementById('blockSelector').innerHTML=sortedBlocks.map(blk=>{
        var s=this.getBlockStats(bId,blk.name);
        var pct=s.total?Math.round(s.visited/s.total*100):0;
        return'<button class="block-btn" onclick="Building.selectBlock(\''+blk.name+'\')">'+blk.name+'<br><small>'+blk.apartments+' apts · '+pct+'%</small></button>';
      }).join('');
      Modal.open('blockModal');
    }else{this.selectBlock(b.blocks[0].name);}
  },
  editBuilding(bId){
    var t=AppState.territories[AppState.currentTerritory];
    var b=t.addresses.find(a=>a.id===bId);if(!b)return;
    document.getElementById('buildingCEP').value=b.cep||'';
    document.getElementById('buildingLogradouro').value=b.logradouro||'';
    document.getElementById('buildingNumero').value=b.numero||'';
    document.getElementById('buildingName').value=b.name||'';
    document.getElementById('buildingBairro').value=b.bairro||'';
    document.getElementById('buildingQuadra').value=b.quadra||'';
    document.getElementById('buildingPortaria').value=b.portariaType||'sem-portaria';
    document.getElementById('buildingPortaCarta').checked=b.portaCarta||false;
    document.getElementById('buildingPortaCartaTipo').value=b.portaCartaTipo||'coletivo';
    document.getElementById('portaCartaTipoGroup').style.display=b.portaCarta?'block':'none';
    document.getElementById('buildingBlocks').value=b.blocks.map(bl=>bl.name).join(',');
    document.getElementById('blockApartmentsContainer').innerHTML=b.blocks.map(bl=>'<div class="form-group"><label>Apts no Bloco '+Utils.escapeHtml(bl.name)+'</label><input type="number" id="block_'+Utils.escapeHtml(bl.name)+'" min="1" value="'+bl.apartments+'"></div>').join('');
    AppState.editingBuildingId=bId;Modal.open('addBuildingModal');
  },
  selectBlock(blkName){
    AppState.currentBlock=blkName;Modal.close('blockModal');
    var t=AppState.territories[AppState.currentTerritory];
    var b=t.addresses.find(a=>a.id===AppState.currentBuilding);
    var blk=b.blocks.find(bl=>bl.name===blkName);
    document.getElementById('apartmentListTitle').innerHTML='🏢 '+Utils.escapeHtml(b.name||b.logradouro)+' — Bloco '+blkName+' '+(PORTARIA_TYPES[b.portariaType]||'🚪');
    this.renderApartmentList(blk.apartments);Modal.open('apartmentListModal');
  },
  renderApartmentList(aptCount){
    var onlyNoted=document.getElementById('onlyNotedToggle')?.checked;
    var sel=document.getElementById('apartmentSelector');sel.innerHTML='';
    var shown=0;
    for(var i=1;i<=aptCount;i++){
      var aptNum=String(i).padStart(2,'0');
      var note=Apartment.getNote(AppState.currentTerritory,AppState.currentBuilding,AppState.currentBlock,aptNum);
      if(onlyNoted&&!note)continue;
      var btn=document.createElement('button');
      btn.className='apartment-btn'+(note?' has-note':'');
      btn.textContent=aptNum;
      if(note){btn.style.background=STATUS_COLORS[note.status]||'var(--success)';btn.style.borderColor=STATUS_COLORS[note.status]||'var(--success)';btn.style.color='#fff';}
      btn.addEventListener('click',()=>this.openApartmentNote(aptNum));
      sel.appendChild(btn);shown++;
    }
    if(!shown)sel.innerHTML='<p style="text-align:center;padding:20px;color:var(--muted);grid-column:1/-1">'+(onlyNoted?'Nenhum com notas.':'Nenhum apartamento.')+'</p>';
  },
  openApartmentNote(aptNum){
    AppState.currentApartment=aptNum;
    var note=Apartment.getNote(AppState.currentTerritory,AppState.currentBuilding,AppState.currentBlock,aptNum);
    document.getElementById('apartmentModalTitle').textContent='🏠 Apartamento '+aptNum;
    document.getElementById('apartmentNotes').value=note?.notes||'';
    document.getElementById('apartmentStatus').value=note?.status||'';
    document.getElementById('apartmentDia').value=note?.dia||'';
    document.getElementById('deleteApartmentNoteBtn').style.display=note?'inline-flex':'none';
    Modal.open('apartmentModal');
  },
  getBlockStats(bId,blkName){
    var t=AppState.territories[AppState.currentTerritory];
    var b=t.addresses.find(a=>a.id===bId);
    var blk=b.blocks.find(bl=>bl.name===blkName);
    var visited=0,notVisited=0;
    for(var i=1;i<=(blk?.apartments||0);i++){
      var n=String(i).padStart(2,'0');
      Apartment.getNote(AppState.currentTerritory,bId,blkName,n)?visited++:notVisited++;
    }
    return{visited:visited,notVisited:notVisited,total:blk?.apartments||0};
  }
};


// ==================== IMPORT WIZARD ====================
// Pop-up que aparece ao importar um JSON — permite revisar cada território
// do arquivo e escolher: mesclar no território existente, criar novo, ou ignorar.
const ImportWizard = {
  _parsed: null,        // JSON completo importado
  _items: [],           // [{srcId, srcT, action, targetId}]
  _currentIdx: 0,

  open(parsed){
    this._parsed = parsed;
    this._items  = [];

    var srcTs = parsed.territories || {};
    var keys  = Object.keys(srcTs).sort(function(a,b){
      return (srcTs[a].numero||0)-(srcTs[b].numero||0);
    });

    keys.forEach(function(sid){
      var srcT = srcTs[sid];
      var addrs = (srcT.addresses||[]).length;
      var quads = (srcT.quadras||[]).length;
      var dias  = (srcT.diasTrabalhados||[]).length;
      // Só inclui se tiver algum dado real
      if(!addrs && !quads && !dias) return;

      // Tenta encontrar correspondência automática:
      // 1. mesmo id, 2. mesmo numero, 3. nome parecido
      var autoMatch = null;
      if(AppState.territories[sid]) autoMatch = sid;
      if(!autoMatch){
        var ts = Object.values(AppState.territories);
        var byNum = ts.find(function(t){return t.numero===srcT.numero;});
        if(byNum) autoMatch = byNum.id;
      }
      if(!autoMatch){
        var ts2 = Object.values(AppState.territories);
        var byName = ts2.find(function(t){
          return t.nome.toLowerCase().trim()===String(srcT.nome||'').toLowerCase().trim();
        });
        if(byName) autoMatch = byName.id;
      }

      ImportWizard._items.push({
        srcId:    sid,
        srcT:     srcT,
        action:   autoMatch ? 'merge' : 'new',  // 'merge'|'new'|'skip'
        targetId: autoMatch || null,
        addrs:    addrs,
        quads:    quads,
        dias:     dias
      });
    });

    if(!this._items.length){
      // Nada com dados — merge direto sem perguntar
      Storage.load(parsed);
      return;
    }

    this._currentIdx = 0;
    this._renderStep();
    Modal.open('importWizardModal');
  },

  _renderStep(){
    var item = this._items[this._currentIdx];
    var total = this._items.length;
    var i     = this._currentIdx;
    var srcT  = item.srcT;

    // Progresso
    document.getElementById('iwProgress').textContent =
      'Território '+(i+1)+' de '+total;
    document.getElementById('iwProgressBar').style.width =
      Math.round(((i)/total)*100)+'%';

    // Info do território importado
    document.getElementById('iwSrcInfo').innerHTML =
      '<div class="iw-src-badge">📦 Do arquivo</div>'+
      '<strong style="font-size:1.05rem">'+Utils.escapeHtml(srcT.nome||srcT.id)+'</strong>'+
      (srcT.numero?'<span class="mini-badge" style="margin-left:8px">T'+srcT.numero+'</span>':'')+
      '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">'+
      (item.addrs?'<span class="mini-badge">🏠 '+item.addrs+' endereços</span>':'')+
      (item.quads?'<span class="mini-badge">🏘️ '+item.quads+' quadras</span>':'')+
      (item.dias?'<span class="mini-badge">📅 '+item.dias+' dias</span>':'')+
      '</div>';

    // Ação selecionada
    document.getElementById('iwActionMerge').checked = item.action==='merge';
    document.getElementById('iwActionNew').checked   = item.action==='new';
    document.getElementById('iwActionSkip').checked  = item.action==='skip';

    // Selector de território destino
    this._renderTargetSelect(item.targetId);
    this._toggleTargetVisibility(item.action);

    // Botão final ou próximo
    var isLast = i === total-1;
    document.getElementById('iwBtnNext').textContent  = isLast ? '✅ Finalizar' : 'Próximo →';
  },

  _renderTargetSelect(selectedId){
    var sel = document.getElementById('iwTargetSelect');
    var ts  = Object.values(AppState.territories)
      .sort(function(a,b){return a.numero-b.numero||Utils.cmp(a.nome,b.nome);});
    sel.innerHTML = ts.map(function(t){
      return '<option value="'+t.id+'"'+(t.id===selectedId?' selected':'')+'>'+
        t.numero+'. '+Utils.escapeHtml(t.nome)+'</option>';
    }).join('');
  },

  _toggleTargetVisibility(action){
    var wrap = document.getElementById('iwTargetWrap');
    wrap.style.display = action==='merge' ? 'block' : 'none';
  },

  _setAction(action){
    var item = this._items[this._currentIdx];
    item.action = action;
    this._toggleTargetVisibility(action);
  },

  _setTarget(targetId){
    this._items[this._currentIdx].targetId = targetId;
  },

  next(){
    // Salva estado atual
    var item = this._items[this._currentIdx];
    if(item.action==='merge' && !item.targetId){
      Toast.show('⚠️ Selecione o território de destino');
      return;
    }

    var isLast = this._currentIdx === this._items.length-1;
    if(!isLast){
      this._currentIdx++;
      this._renderStep();
      return;
    }

    // Último → aplica tudo
    this._applyAll();
  },

  _applyAll(){
    Modal.close('importWizardModal');

    var added = {addresses:0, quadras:0, dias:0, newT:0};

    this._items.forEach(function(item){
      if(item.action==='skip') return;

      var srcT = item.srcT;

      if(item.action==='new'){
        // Cria território novo com dados do importado
        var newId = 't'+Date.now()+'_'+Math.random().toString(36).slice(2,5);
        var idx   = Object.keys(AppState.territories).length;
        AppState.territories[newId] = {
          id: newId,
          numero: srcT.numero || (idx+1),
          nome:   srcT.nome   || 'Importado',
          cep:    srcT.cep    || '',
          cor:    TERRITORY_COLORS[idx % TERRITORY_COLORS.length],
          addresses:      Utils.deepClone(srcT.addresses||[]),
          quadras:        Utils.deepClone(srcT.quadras||[]),
          diasTrabalhados:Utils.deepClone(srcT.diasTrabalhados||[]),
          fixado: false
        };
        added.addresses += (srcT.addresses||[]).length;
        added.quadras   += (srcT.quadras||[]).length;
        added.dias      += (srcT.diasTrabalhados||[]).length;
        added.newT++;
        return;
      }

      // action === 'merge'
      var tid = item.targetId;
      var dst = AppState.territories[tid];
      if(!dst) return;

      // addresses
      if(!dst.addresses)dst.addresses=[];
      var addrIds = new Set(dst.addresses.map(function(a){return a.id;}));
      (srcT.addresses||[]).forEach(function(a){
        if(!addrIds.has(a.id)){
          dst.addresses.push(Utils.deepClone(a));
          addrIds.add(a.id);
          added.addresses++;
        }
      });

      // quadras
      if(!dst.quadras)dst.quadras=[];
      var qIds = new Set(dst.quadras.map(function(q){return q.id;}));
      (srcT.quadras||[]).forEach(function(q){
        if(!qIds.has(q.id)){
          dst.quadras.push(Utils.deepClone(q));
          qIds.add(q.id);
          added.quadras++;
        }
      });

      // diasTrabalhados
      if(!dst.diasTrabalhados)dst.diasTrabalhados=[];
      var diaKeys = new Set(dst.diasTrabalhados.map(function(d){return d.id||d.data;}));
      (srcT.diasTrabalhados||[]).forEach(function(d){
        var k=d.id||d.data;
        if(!diaKeys.has(k)){dst.diasTrabalhados.push(Utils.deepClone(d));diaKeys.add(k);added.dias++;}
      });
      dst.diasTrabalhados.sort(function(a,b){return b.data.localeCompare(a.data);});
    });

    // Notas
    var aN = this._parsed.apartmentNotes||{};
    Object.keys(aN).forEach(function(k){if(!AppState.apartmentNotes[k])AppState.apartmentNotes[k]=aN[k];});
    var adN = this._parsed.addressNotes||{};
    Object.keys(adN).forEach(function(k){if(!AppState.addressNotes[k])AppState.addressNotes[k]=adN[k];});

    Storage._migrate();
    History.save();
    Storage.persist();
    UI.renderTerritories();
    UI.renderOverview();

    var msg = '✅ Importação concluída!';
    var parts = [];
    if(added.newT)      parts.push(added.newT+' território(s) criado(s)');
    if(added.addresses) parts.push(added.addresses+' endereço(s)');
    if(added.quadras)   parts.push(added.quadras+' quadra(s)');
    if(added.dias)      parts.push(added.dias+' dia(s)');
    if(parts.length)    msg += ' '+parts.join(', ')+'.';
    Toast.show(msg, 5000);
  }
};

window.ImportWizard = ImportWizard;

window.searchHouseCEP=async function(){var d=await CEP.search(document.getElementById('houseCEP').value);if(d){document.getElementById('houseLogradouro').value=d.logradouro||'';document.getElementById('houseBairro').value=d.bairro||'';Toast.show('✅ CEP encontrado');}};
window.searchBuildingCEP=async function(){var d=await CEP.search(document.getElementById('buildingCEP').value);if(d){document.getElementById('buildingLogradouro').value=d.logradouro||'';document.getElementById('buildingBairro').value=d.bairro||'';Toast.show('✅ CEP encontrado');}};
window.searchQuadraCEP=async function(){var d=await CEP.search(document.getElementById('quadraCEP').value);if(d){document.getElementById('quadraLogradouro').value=d.logradouro||'';document.getElementById('quadraBairro').value=d.bairro||'';Toast.show('✅ CEP encontrado');}};

window.Territory=Territory;window.Address=Address;window.Apartment=Apartment;window.Building=Building;
window.Quadra=Quadra;window.UI=UI;window.Storage=Storage;window.Theme=Theme;window.History=History;
window.Toast=Toast;window.Tooltip=Tooltip;window.Utils=Utils;window.Modal=Modal;window.CEP=CEP;
window.Share=Share;window.AppState=AppState;window.RotaMax=RotaMax;

function initApp(){
  Toast.init();Tooltip.init();Theme.load();Storage.load();
  UI.renderTerritories();UI.renderOverview();

  document.getElementById('themeBtn')?.addEventListener('click',()=>Theme.toggle());
  document.getElementById('undoBtn')?.addEventListener('click',()=>History.undo());
  document.getElementById('redoBtn')?.addEventListener('click',()=>History.redo());
  document.getElementById('saveBtn')?.addEventListener('click',()=>Storage.persist());
  document.getElementById('exportBtn')?.addEventListener('click',()=>Storage.exportData());
  document.getElementById('importBtn')?.addEventListener('click',()=>document.getElementById('fileInput').click());
  document.getElementById('fileInput')?.addEventListener('change',e=>{if(e.target.files[0])Storage.importData(e.target.files[0]);e.target.value='';});
  document.getElementById('copySummaryBtn')?.addEventListener('click',()=>Share.copySummary());
  document.getElementById('shareBtn')?.addEventListener('click',()=>Share.whatsapp());
  document.getElementById('newTerritoryBtn')?.addEventListener('click',()=>Modal.open('newTerritoryModal'));
  document.getElementById('territorySearch')?.addEventListener('input',()=>UI.renderTerritories());
  document.getElementById('sidebarToggle')?.addEventListener('click',()=>UI.toggleSidebar());
  document.getElementById('sidebarOverlay')?.addEventListener('click',()=>UI.closeSidebar());

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape')Modal.closeAll();
    if((e.ctrlKey||e.metaKey)&&e.key==='z'&&!e.shiftKey){e.preventDefault();History.undo();}
    if((e.ctrlKey||e.metaKey)&&(e.key==='y'||(e.key==='z'&&e.shiftKey))){e.preventDefault();History.redo();}
    if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();Storage.persist();}
  });
  document.addEventListener('click',e=>{
    if(e.target.dataset.close)Modal.close(e.target.dataset.close);
    if(e.target.classList.contains('modal'))Modal.close(e.target.id);
  });

  document.getElementById('createTerritoryBtn')?.addEventListener('click',()=>{
    var n=document.getElementById('newTerritoryNumber').value;
    var nome=document.getElementById('newTerritoryName').value.trim();
    var cep=document.getElementById('newTerritoryCEP').value.trim();
    if(!n||!nome){Toast.show('⚠️ Preencha número e nome');return;}
    Territory.create({numero:parseInt(n),nome:nome,cep:cep});
    Modal.close('newTerritoryModal');
    document.getElementById('newTerritoryNumber').value='';
    document.getElementById('newTerritoryName').value='';
    document.getElementById('newTerritoryCEP').value='';
  });

  document.getElementById('saveDiaBtn')?.addEventListener('click',()=>{
    var data=document.getElementById('diaDate').value;
    var ruas=document.getElementById('diaRuas').value;
    var obs=document.getElementById('diaObs').value;
    if(!data||!AppState.currentTerritory){Toast.show('⚠️ Selecione uma data');return;}
    Territory.addWorkDay(AppState.currentTerritory,{data:data,ruas:ruas,obs:obs});Modal.close('diasModal');
  });

  document.getElementById('saveApartmentNoteBtn')?.addEventListener('click',()=>{
    Apartment.saveNote(AppState.currentTerritory,AppState.currentBuilding,AppState.currentBlock,AppState.currentApartment,{
      notes:document.getElementById('apartmentNotes').value,
      status:document.getElementById('apartmentStatus').value,
      dia:document.getElementById('apartmentDia').value
    });
    Modal.close('apartmentModal');
    var t=AppState.territories[AppState.currentTerritory];
    var b=t.addresses.find(a=>a.id===AppState.currentBuilding);
    var blk=b.blocks.find(bl=>bl.name===AppState.currentBlock);
    Building.renderApartmentList(blk.apartments);
  });

  document.getElementById('deleteApartmentNoteBtn')?.addEventListener('click',()=>{
    if(!confirm('🗑️ Apagar nota?'))return;
    Apartment.deleteNote(AppState.currentTerritory,AppState.currentBuilding,AppState.currentBlock,AppState.currentApartment);
    Modal.close('apartmentModal');
    var t=AppState.territories[AppState.currentTerritory];
    var b=t.addresses.find(a=>a.id===AppState.currentBuilding);
    var blk=b.blocks.find(bl=>bl.name===AppState.currentBlock);
    Building.renderApartmentList(blk.apartments);
  });

  document.getElementById('saveAddressDetailsBtn')?.addEventListener('click',()=>{
    Address.saveNote(AppState.currentTerritory,AppState.currentAddress,{
      status:document.getElementById('addressStatusSelect').value,
      dia:document.getElementById('addressDia').value,
      obs:document.getElementById('addressObs').value
    });
    Modal.close('addressDetailsModal');Territory.open(AppState.currentTerritory);
  });

  document.getElementById('deleteAddressNoteBtn')?.addEventListener('click',()=>{
    if(!confirm('🗑️ Limpar nota?'))return;
    Address.deleteNote(AppState.currentTerritory,AppState.currentAddress);
    Modal.close('addressDetailsModal');Territory.open(AppState.currentTerritory);
  });

  document.getElementById('buildingPortaCarta')?.addEventListener('change',e=>{
    document.getElementById('portaCartaTipoGroup').style.display=e.target.checked?'block':'none';
  });

  document.getElementById('buildingBlocks')?.addEventListener('input',e=>{
    var blocks=e.target.value.split(',').map(s=>s.trim()).filter(Boolean);
    document.getElementById('blockApartmentsContainer').innerHTML=blocks.map(name=>'<div class="form-group"><label>Apts no Bloco '+Utils.escapeHtml(name)+'</label><input type="number" id="block_'+Utils.escapeHtml(name)+'" placeholder="Ex: 12" min="1"></div>').join('');
  });

  document.getElementById('saveBuildingBtn')?.addEventListener('click',()=>{
    var log=document.getElementById('buildingLogradouro').value.trim();
    if(!log){Toast.show('⚠️ Logradouro obrigatório');return;}
    var blocksRaw=document.getElementById('buildingBlocks').value.split(',').map(s=>s.trim()).filter(Boolean);
    if(!blocksRaw.length){Toast.show('⚠️ Informe ao menos um bloco');return;}
    var blocks=blocksRaw.map(name=>({name:name,apartments:parseInt(document.getElementById('block_'+name)?.value)||0}));
    var bData={logradouro:log,numero:document.getElementById('buildingNumero').value.trim(),
      name:document.getElementById('buildingName').value.trim(),bairro:document.getElementById('buildingBairro').value.trim(),
      cep:document.getElementById('buildingCEP').value.trim(),quadra:document.getElementById('buildingQuadra').value.trim(),
      portariaType:document.getElementById('buildingPortaria').value,portaCarta:document.getElementById('buildingPortaCarta').checked,
      portaCartaTipo:document.getElementById('buildingPortaCartaTipo').value,blocks:blocks};
    if(AppState.editingBuildingId){
      History.save();
      var t=AppState.territories[AppState.currentTerritory];
      var b=t.addresses.find(a=>a.id===AppState.editingBuildingId);
      Object.assign(b,bData);b.totalApartments=blocks.reduce((s,bl)=>s+(bl.apartments||0),0);
      Storage.persist();Territory.open(AppState.currentTerritory);Toast.show('✏️ Prédio atualizado!');
    }else{Territory.addBuilding(AppState.currentTerritory,bData);}
    Modal.close('addBuildingModal');
  });

  document.getElementById('saveHouseBtn')?.addEventListener('click',()=>{
    var log=document.getElementById('houseLogradouro').value.trim();
    if(!log){Toast.show('⚠️ Logradouro obrigatório');return;}
    Territory.addHouse(AppState.currentTerritory,{logradouro:log,numero:document.getElementById('houseNumero').value.trim(),quadra:document.getElementById('houseQuadra').value.trim(),bairro:document.getElementById('houseBairro').value.trim(),cep:document.getElementById('houseCEP').value.trim()});
    Modal.close('addHouseModal');
  });

  document.getElementById('saveQuadraBtn')?.addEventListener('click',()=>{
    var nome=document.getElementById('quadraNome').value.trim();
    var numero=document.getElementById('quadraNumero').value.trim();
    if(!nome&&!numero){Toast.show('⚠️ Informe o nome ou número da quadra');return;}
    var qData={nome:nome,numero:numero,logradouro:document.getElementById('quadraLogradouro').value.trim(),
      bairro:document.getElementById('quadraBairro').value.trim(),cep:document.getElementById('quadraCEP').value.trim(),
      lado_a:parseInt(document.getElementById('quadraLadoA').value)||0,
      lado_b:parseInt(document.getElementById('quadraLadoB').value)||0,
      lado_c:parseInt(document.getElementById('quadraLadoC').value)||0,
      lado_d:parseInt(document.getElementById('quadraLadoD').value)||0,
      obs:document.getElementById('quadraObs').value.trim()};
    if(!qData.lado_a&&!qData.lado_b&&!qData.lado_c&&!qData.lado_d){Toast.show('⚠️ Informe ao menos um lado com casas');return;}
    if(AppState.editingQuadraId)Quadra.edit(AppState.currentTerritory,AppState.editingQuadraId,qData);
    else Quadra.create(AppState.currentTerritory,qData);
    Modal.close('addQuadraModal');
  });

  document.getElementById('saveQuadraCasaBtn')?.addEventListener('click',()=>{
    var c=AppState.currentQuadra;if(!c)return;
    Quadra.saveNote(AppState.currentTerritory,c.quadraId,c.lado,c.numero,{
      status:document.getElementById('quadraCasaStatus').value,
      dia:document.getElementById('quadraCasaDia').value,
      obs:document.getElementById('quadraCasaObs').value
    });
    Modal.close('quadraCasaModal');Territory.open(AppState.currentTerritory);
  });

  document.getElementById('deleteQuadraCasaBtn')?.addEventListener('click',()=>{
    if(!confirm('🗑️ Limpar nota?'))return;
    var c=AppState.currentQuadra;
    Quadra.deleteNote(AppState.currentTerritory,c.quadraId,c.lado,c.numero);
    Modal.close('quadraCasaModal');Territory.open(AppState.currentTerritory);
  });

  document.getElementById('onlyNotedToggle')?.addEventListener('change',()=>{
    var t=AppState.territories[AppState.currentTerritory];
    var b=t?.addresses?.find(a=>a.id===AppState.currentBuilding);
    var blk=b?.blocks?.find(bl=>bl.name===AppState.currentBlock);
    if(blk)Building.renderApartmentList(blk.apartments);
  });

  History.updateButtons();
}
document.addEventListener('DOMContentLoaded',initApp);
