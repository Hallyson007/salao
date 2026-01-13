-- Banco de dados TarginoTur
-- Criado para gerenciar passeios, transfers e reservas

CREATE DATABASE IF NOT EXISTS site_targino CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE site_targino;

-- Tabela de categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    ativo TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de pacotes/passeios
CREATE TABLE pacotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2),
    duracao VARCHAR(50),
    incluso TEXT,
    itinerario TEXT,
    imagem_principal VARCHAR(255),
    imagens_galeria TEXT,
    ativo TINYINT(1) DEFAULT 1,
    destaque TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    telefone VARCHAR(20),
    whatsapp VARCHAR(20),
    cpf VARCHAR(14),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de reservas
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    pacote_id INT,
    data_reserva DATE,
    data_passeio DATE,
    quantidade_pessoas INT DEFAULT 1,
    valor_total DECIMAL(10,2),
    status ENUM('pendente', 'confirmada', 'cancelada', 'finalizada') DEFAULT 'pendente',
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (pacote_id) REFERENCES pacotes(id)
);

-- Tabela de contatos/mensagens
CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    telefone VARCHAR(20),
    assunto VARCHAR(200),
    mensagem TEXT NOT NULL,
    status ENUM('novo', 'lido', 'respondido') DEFAULT 'novo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir categorias
INSERT INTO categorias (nome, descricao) VALUES
('Passeios', 'Passeios turísticos pelo Ceará'),
('Transfers', 'Serviços de transfer aeroporto e hotéis');

-- Inserir pacotes de passeios
INSERT INTO pacotes (categoria_id, titulo, descricao, preco, duracao, incluso, itinerario, imagem_principal) VALUES
(1, '3 Praias em 1 Dia', 'Conheça as três praias mais belas do Ceará em um único dia: Morro Branco, Praia das Fontes e Canoa Quebrada.', 85.00, '12 horas', 'Transporte,Guia turístico,Seguro viagem', '06:00 - Saída de Fortaleza|08:30 - Chegada ao Morro Branco|11:00 - Praia das Fontes|14:00 - Almoço (não incluso)|15:30 - Canoa Quebrada|18:00 - Retorno para Fortaleza', 'pacotes/123_1.jpg'),

(1, 'Canoa Quebrada', 'Explore a famosa Canoa Quebrada, com suas falésias coloridas e o icônico símbolo da lua e estrela.', 65.00, '10 horas', 'Transporte,Guia turístico', '07:00 - Saída de Fortaleza|09:30 - Chegada a Canoa Quebrada|10:00 - Passeio pelas falésias|12:00 - Tempo livre na praia|16:00 - Retorno para Fortaleza', 'pacotes/124_1.jpg'),

(1, 'Cumbuco', 'Aventure-se nas dunas do Cumbuco com passeios de buggy e kitesurf.', 55.00, '8 horas', 'Transporte,Guia turístico', '08:00 - Saída de Fortaleza|09:00 - Chegada ao Cumbuco|09:30 - Passeio nas dunas|12:00 - Praia e esportes aquáticos|15:00 - Retorno para Fortaleza', 'pacotes/125_1.jpg'),

(1, 'Jericoacoara - 1 Dia', 'Conheça o paraíso de Jericoacoara em um dia inesquecível.', 95.00, '14 horas', 'Transporte,Guia turístico,Seguro viagem', '05:00 - Saída de Fortaleza|08:30 - Chegada a Jericoacoara|09:00 - Duna do Pôr do Sol|12:00 - Almoço (não incluso)|14:00 - Praia de Jericoacoara|17:00 - Pôr do sol na duna|19:00 - Retorno para Fortaleza', 'pacotes/126_1.jpg'),

(1, 'Jeri 3 Dias', 'Pacote completo de 3 dias em Jericoacoara com hospedagem.', 350.00, '3 dias', 'Transporte,Hospedagem,Café da manhã,Guia turístico', 'Dia 1: Chegada e Duna do Pôr do Sol|Dia 2: Lagoa Azul e Lagoa do Paraíso|Dia 3: Pedra Furada e retorno', 'pacotes/127_1.jpg'),

(1, 'Mundaú e Flecheiras', 'Descubra as praias paradisíacas de Mundaú e Flecheiras.', 70.00, '10 horas', 'Transporte,Guia turístico', '07:00 - Saída de Fortaleza|08:30 - Chegada a Mundaú|12:00 - Flecheiras|15:00 - Retorno para Fortaleza', 'pacotes/128_1.jpg'),

(1, 'Morro Branco e Praia das Fontes', 'Visite as famosas falésias coloridas do Morro Branco e as águas cristalinas da Praia das Fontes.', 60.00, '9 horas', 'Transporte,Guia turístico', '07:30 - Saída de Fortaleza|09:00 - Morro Branco|12:00 - Praia das Fontes|15:30 - Retorno para Fortaleza', 'pacotes/129_1.jpg'),

(1, 'Águas Belas e Barra Nova', 'Explore as belas praias de Águas Belas e Barra Nova.', 65.00, '9 horas', 'Transporte,Guia turístico', '07:00 - Saída de Fortaleza|08:30 - Águas Belas|12:00 - Barra Nova|15:30 - Retorno para Fortaleza', 'pacotes/130_1.jpg'),

(1, 'City Tour com Praia de Cumbuco', 'Conheça Fortaleza e relaxe na Praia do Cumbuco.', 70.00, '8 horas', 'Transporte,Guia turístico', '08:00 - City Tour Fortaleza|10:00 - Mercado Central|12:00 - Praia do Cumbuco|16:00 - Retorno', 'pacotes/131_1.jpg'),

(1, 'Praia de Lagoinha', 'Relaxe na paradisíaca Praia de Lagoinha com suas águas cristalinas.', 65.00, '9 horas', 'Transporte,Guia turístico', '07:00 - Saída de Fortaleza|08:30 - Chegada a Lagoinha|09:00 - Tempo livre na praia|15:00 - Retorno para Fortaleza', 'pacotes/132_1.jpg'),

(1, 'Ipark Complexo Turístico', 'Diversão garantida no Ipark com piscinas, toboáguas e muito mais.', 80.00, '8 horas', 'Transporte,Entrada,Guia turístico', '08:00 - Saída de Fortaleza|09:00 - Chegada ao Ipark|09:30 - Atividades aquáticas|16:00 - Retorno para Fortaleza', 'pacotes/133_1.jpg');

-- Inserir transfers
INSERT INTO pacotes (categoria_id, titulo, descricao, preco, duracao, incluso, itinerario, imagem_principal) VALUES
(2, 'Transfer Aeroporto × Hotel na Orla', 'Transfer confortável e seguro do Aeroporto de Fortaleza para hotéis na orla de Fortaleza.', 35.00, '30-45 min', 'Transporte executivo,Motorista profissional,Ar condicionado', 'Aeroporto Internacional de Fortaleza → Hotéis da Orla (Iracema, Meireles, Mucuripe)', 'pacotes/120_1.jpg'),

(2, 'Transfer Aeroporto × Praia do Futuro', 'Transfer direto do aeroporto para a região da Praia do Futuro.', 40.00, '35-50 min', 'Transporte executivo,Motorista profissional,Ar condicionado', 'Aeroporto Internacional de Fortaleza → Região da Praia do Futuro', 'pacotes/121_1.jpg'),

(2, 'Transfer Aeroporto × Cumbuco', 'Transfer para a praia do Cumbuco, ideal para quem busca aventura e esportes aquáticos.', 60.00, '45-60 min', 'Transporte executivo,Motorista profissional,Ar condicionado', 'Aeroporto Internacional de Fortaleza → Cumbuco (Caucaia)', 'pacotes/122_1.jpg');

-- Criar índices para melhor performance
CREATE INDEX idx_pacotes_categoria ON pacotes(categoria_id);
CREATE INDEX idx_pacotes_ativo ON pacotes(ativo);
CREATE INDEX idx_reservas_cliente ON reservas(cliente_id);
CREATE INDEX idx_reservas_pacote ON reservas(pacote_id);
CREATE INDEX idx_reservas_status ON reservas(status);
CREATE INDEX idx_contatos_status ON contatos(status);

-- Criar usuário para a aplicação (opcional)
-- CREATE USER 'site_targino_user'@'localhost' IDENTIFIED BY 'senha_segura_123';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON site_targino.* TO 'site_targino_user'@'localhost';
-- FLUSH PRIVILEGES;