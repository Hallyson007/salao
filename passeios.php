<?php
require_once 'config.php';
require_once 'includes/DatabaseManager.php';

// Inicializar conexão com banco
$db = DatabaseManager::getInstance();

// Obter ID do pacote se fornecido
$pacoteId = isset($_GET['PacoteId']) ? (int)$_GET['PacoteId'] : null;

// Buscar pacote no banco ou usar dados estáticos
$pacote = null;
if ($pacoteId) {
    try {
        $pacote = $db->getPacoteById($pacoteId);
    } catch (Exception $e) {
        error_log("Erro ao buscar pacote: " . $e->getMessage());
    }
}

// Dados dos pacotes (simulando banco de dados)
$pacotes = [
    123 => [
        'id' => 123,
        'titulo' => '3 Praias em 1 Dia',
        'descricao' => 'Conheça as três praias mais belas do Ceará em um único dia: Morro Branco, Praia das Fontes e Canoa Quebrada.',
        'preco' => 'R$ 85,00',
        'duracao' => '12 horas',
        'incluso' => ['Transporte', 'Guia turístico', 'Seguro viagem'],
        'imagens' => ['pacotes/123_1.jpg', 'pacotes/123_2.jpg', 'pacotes/123_3.jpg'],
        'itinerario' => [
            '06:00 - Saída de Fortaleza',
            '08:30 - Chegada ao Morro Branco',
            '11:00 - Praia das Fontes',
            '14:00 - Almoço (não incluso)',
            '15:30 - Canoa Quebrada',
            '18:00 - Retorno para Fortaleza'
        ]
    ],
    124 => [
        'id' => 124,
        'titulo' => 'Canoa Quebrada',
        'descricao' => 'Explore a famosa Canoa Quebrada, com suas falésias coloridas e o icônico símbolo da lua e estrela.',
        'preco' => 'R$ 65,00',
        'duracao' => '10 horas',
        'incluso' => ['Transporte', 'Guia turístico'],
        'imagens' => ['pacotes/124_1.jpg', 'pacotes/124_2.jpg'],
        'itinerario' => [
            '07:00 - Saída de Fortaleza',
            '09:30 - Chegada a Canoa Quebrada',
            '10:00 - Passeio pelas falésias',
            '12:00 - Tempo livre na praia',
            '16:00 - Retorno para Fortaleza'
        ]
    ],
    125 => [
        'id' => 125,
        'titulo' => 'Cumbuco',
        'descricao' => 'Aventure-se nas dunas do Cumbuco com passeios de buggy e kitesurf.',
        'preco' => 'R$ 55,00',
        'duracao' => '8 horas',
        'incluso' => ['Transporte', 'Guia turístico'],
        'imagens' => ['pacotes/125_1.jpg', 'pacotes/125_2.jpg'],
        'itinerario' => [
            '08:00 - Saída de Fortaleza',
            '09:00 - Chegada ao Cumbuco',
            '09:30 - Passeio nas dunas',
            '12:00 - Praia e esportes aquáticos',
            '15:00 - Retorno para Fortaleza'
        ]
    ],
    126 => [
        'id' => 126,
        'titulo' => 'Jericoacoara - 1 Dia',
        'descricao' => 'Conheça o paraíso de Jericoacoara em um dia inesquecível.',
        'preco' => 'R$ 95,00',
        'duracao' => '14 horas',
        'incluso' => ['Transporte', 'Guia turístico', 'Seguro viagem'],
        'imagens' => ['pacotes/126_1.jpg', 'pacotes/126_2.jpg'],
        'itinerario' => [
            '05:00 - Saída de Fortaleza',
            '08:30 - Chegada a Jericoacoara',
            '09:00 - Duna do Pôr do Sol',
            '12:00 - Almoço (não incluso)',
            '14:00 - Praia de Jericoacoara',
            '17:00 - Pôr do sol na duna',
            '19:00 - Retorno para Fortaleza'
        ]
    ],
    127 => [
        'id' => 127,
        'titulo' => 'Jeri 3 Dias',
        'descricao' => 'Pacote completo de 3 dias em Jericoacoara com hospedagem.',
        'preco' => 'R$ 350,00',
        'duracao' => '3 dias',
        'incluso' => ['Transporte', 'Hospedagem', 'Café da manhã', 'Guia turístico'],
        'imagens' => ['pacotes/127_1.jpg', 'pacotes/127_2.jpg'],
        'itinerario' => [
            'Dia 1: Chegada e Duna do Pôr do Sol',
            'Dia 2: Lagoa Azul e Lagoa do Paraíso',
            'Dia 3: Pedra Furada e retorno'
        ]
    ],
    128 => [
        'id' => 128,
        'titulo' => 'Mundaú e Flecheiras',
        'descricao' => 'Descubra as praias paradisíacas de Mundaú e Flecheiras.',
        'preco' => 'R$ 70,00',
        'duracao' => '10 horas',
        'incluso' => ['Transporte', 'Guia turístico'],
        'imagens' => ['pacotes/128_1.jpg', 'pacotes/128_2.jpg'],
        'itinerario' => [
            '07:00 - Saída de Fortaleza',
            '08:30 - Chegada a Mundaú',
            '12:00 - Flecheiras',
            '15:00 - Retorno para Fortaleza'
        ]
    ],
    129 => [
        'id' => 129,
        'titulo' => 'Morro Branco e Praia das Fontes',
        'descricao' => 'Visite as famosas falésias coloridas do Morro Branco e as águas cristalinas da Praia das Fontes.',
        'preco' => 'R$ 60,00',
        'duracao' => '9 horas',
        'incluso' => ['Transporte', 'Guia turístico'],
        'imagens' => ['pacotes/129_1.jpg', 'pacotes/129_2.jpg'],
        'itinerario' => [
            '07:30 - Saída de Fortaleza',
            '09:00 - Morro Branco',
            '12:00 - Praia das Fontes',
            '15:30 - Retorno para Fortaleza'
        ]
    ],
    132 => [
        'id' => 132,
        'titulo' => 'Praia de Lagoinha',
        'descricao' => 'Relaxe na paradisíaca Praia de Lagoinha com suas águas cristalinas.',
        'preco' => 'R$ 65,00',
        'duracao' => '9 horas',
        'incluso' => ['Transporte', 'Guia turístico'],
        'imagens' => ['pacotes/132_1.jpg', 'pacotes/132_2.jpg'],
        'itinerario' => [
            '07:00 - Saída de Fortaleza',
            '08:30 - Chegada a Lagoinha',
            '09:00 - Tempo livre na praia',
            '15:00 - Retorno para Fortaleza'
        ]
    ]
];

$pacote = $pacoteId && isset($pacotes[$pacoteId]) ? $pacotes[$pacoteId] : null;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= $pacote ? $pacote['descricao'] : 'Conheça nossos incríveis passeios pelo Ceará' ?>">
    <title><?= $pacote ? $pacote['titulo'] . ' - TarginoTur' : 'Passeios - TarginoTur' ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        .package-detail {
            padding: 100px 20px 80px;
            background: var(--background);
        }
        
        .package-header {
            text-align: center;
            margin-bottom: 50px;
        }
        
        .package-title {
            font-size: 48px;
            color: var(--primary-blue);
            margin-bottom: 20px;
        }
        
        .package-price {
            font-size: 36px;
            color: var(--accent-gold);
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .package-duration {
            font-size: 18px;
            color: var(--text-light);
        }
        
        .package-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .package-gallery {
            display: grid;
            gap: 15px;
        }
        
        .main-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 15px;
            box-shadow: 0 10px 30px var(--shadow);
        }
        
        .thumbnail-images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 10px;
        }
        
        .thumbnail {
            width: 100%;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            cursor: pointer;
            transition: var(--transition);
            border: 2px solid transparent;
        }
        
        .thumbnail:hover,
        .thumbnail.active {
            border-color: var(--accent-blue);
            transform: scale(1.05);
        }
        
        .package-info {
            background: var(--white);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px var(--shadow);
            border: 1px solid var(--border);
        }
        
        .info-section {
            margin-bottom: 30px;
        }
        
        .info-section h3 {
            font-size: 24px;
            color: var(--primary-blue);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .info-section ul {
            list-style: none;
            padding: 0;
        }
        
        .info-section li {
            padding: 8px 0;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .info-section li:last-child {
            border-bottom: none;
        }
        
        .info-section li i {
            color: var(--accent-blue);
            width: 20px;
        }
        
        .book-button {
            width: 100%;
            background: linear-gradient(135deg, var(--accent-blue) 0%, var(--secondary-blue) 100%);
            color: var(--white);
            padding: 20px;
            border: none;
            border-radius: 15px;
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            text-decoration: none;
            display: inline-block;
            text-align: center;
        }
        
        .book-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(74, 144, 226, 0.4);
        }
        
        .packages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }
        
        @media (max-width: 768px) {
            .package-content {
                grid-template-columns: 1fr;
                gap: 30px;
            }
            
            .package-title {
                font-size: 32px;
            }
            
            .package-price {
                font-size: 28px;
            }
            
            .package-info {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Theme Toggle -->
    <button class="theme-toggle" id="themeToggle" aria-label="Alternar tema">
        <i class="fas fa-moon"></i>
    </button>

    <!-- Header -->
    <header class="header-top">
        <div class="header-container">
            <div class="logo-section">
                <div class="logo-text">TarginoTur</div>
            </div>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <a href="tel:+5585987360977" class="phone-number">(85) 98736-0977</a>
                </div>
                <div class="social-links">
                    <a href="https://api.whatsapp.com/send?phone=5585987360977" class="social-icon" title="WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a href="https://www.facebook.com/targinotur.tur" class="social-icon" title="Facebook" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/targino_tur/" class="social-icon" title="Instagram" target="_blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=5585987360977&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20TarginoTur%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20passeios.%20Podem%20me%20ajudar%3F" class="whatsapp-btn">
                        <i class="fab fa-whatsapp"></i> Fale Conosco
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <button class="mobile-menu-toggle" id="mobileMenuToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-menu" id="navMenu">
                <li><a href="index.php">Página Inicial</a></li>
                <li><a href="index.php#about">Quem Somos</a></li>
                <li><a href="passeios.php">Passeios</a></li>
                <li><a href="transfers.php">Transfers</a></li>
                <li><a href="index.php#contact">Fale Conosco</a></li>
            </ul>
        </div>
    </nav>

    <?php if ($pacote): ?>
    <!-- Package Detail -->
    <section class="package-detail">
        <div class="container">
            <div class="package-header">
                <h1 class="package-title"><?= htmlspecialchars($pacote['titulo']) ?></h1>
                <div class="package-price"><?= htmlspecialchars($pacote['preco']) ?></div>
                <div class="package-duration">
                    <i class="fas fa-clock"></i> <?= htmlspecialchars($pacote['duracao']) ?>
                </div>
            </div>
            
            <div class="package-content">
                <div class="package-gallery">
                    <img src="<?= $pacote['imagens'][0] ?>" alt="<?= htmlspecialchars($pacote['titulo']) ?>" class="main-image" id="mainImage">
                    <?php if (count($pacote['imagens']) > 1): ?>
                    <div class="thumbnail-images">
                        <?php foreach ($pacote['imagens'] as $index => $imagem): ?>
                        <img src="<?= $imagem ?>" alt="<?= htmlspecialchars($pacote['titulo']) ?>" 
                             class="thumbnail <?= $index === 0 ? 'active' : '' ?>" 
                             onclick="changeMainImage('<?= $imagem ?>', this)">
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                </div>
                
                <div class="package-info">
                    <div class="info-section">
                        <h3><i class="fas fa-info-circle"></i> Descrição</h3>
                        <p><?= htmlspecialchars($pacote['descricao']) ?></p>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-check-circle"></i> Incluso no Pacote</h3>
                        <ul>
                            <?php foreach ($pacote['incluso'] as $item): ?>
                            <li><i class="fas fa-check"></i> <?= htmlspecialchars($item) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-route"></i> Itinerário</h3>
                        <ul>
                            <?php foreach ($pacote['itinerario'] as $item): ?>
                            <li><i class="fas fa-clock"></i> <?= htmlspecialchars($item) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    
                    <a href="https://api.whatsapp.com/send?phone=5585987360977&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20TarginoTur%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20passeio:%20<?= urlencode($pacote['titulo']) ?>%20-%20Valor:%20<?= urlencode($pacote['preco']) ?>%20Podem%20me%20dar%20mais%20detalhes%3F" class="book-button" target="_blank">
                        <i class="fab fa-whatsapp"></i> Reservar Agora
                    </a>
                </div>
            </div>
        </div>
    </section>
    <?php else: ?>
    <!-- All Packages -->
    <section class="section">
        <div class="container">
            <h1 class="section-title">Nossos Passeios</h1>
            <div class="packages-grid">
                <?php foreach ($pacotes as $pkg): ?>
                <div class="tour-card">
                    <div class="tour-image-container">
                        <img src="<?= $pkg['imagens'][0] ?>" alt="<?= htmlspecialchars($pkg['titulo']) ?>" class="tour-image" loading="lazy">
                        <div class="tour-overlay">
                            <a href="passeios.php?PacoteId=<?= $pkg['id'] ?>" class="tour-btn">
                                <i class="fas fa-eye"></i> Ver Detalhes
                            </a>
                        </div>
                    </div>
                    <div class="tour-content">
                        <h3 class="tour-title"><?= htmlspecialchars($pkg['titulo']) ?></h3>
                        <p class="tour-price"><?= htmlspecialchars($pkg['preco']) ?></p>
                        <p><?= htmlspecialchars(substr($pkg['descricao'], 0, 100)) ?>...</p>
                        <a href="passeios.php?PacoteId=<?= $pkg['id'] ?>" class="tour-link">
                            Saiba Mais <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>TarginoTur</h3>
                <p>Especialista em Passeios em Fortaleza</p>
                <p><i class="fas fa-phone"></i> <a href="tel:+5585987360977">(85) 98736-0977</a></p>
                <p><i class="fas fa-envelope"></i> <a href="mailto:targinotur.fretamento@gmail.com">targinotur.fretamento@gmail.com</a></p>
            </div>

            <div class="footer-section">
                <h3>Menu</h3>
                <a href="index.php">Página Inicial</a>
                <a href="empresa.php">Quem Somos</a>
                <a href="passeios.php">Nossos Passeios</a>
                <a href="transfers.php">Nossos Transfers</a>
                <a href="contato.php">Fale Conosco</a>
            </div>

            <div class="footer-section payment-methods">
                <h3>Formas de Pagamento</h3>
                <img src="images/cartoes2.png" alt="Formas de Pagamento" loading="lazy">
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; <?= date('Y') ?> TarginoTur - Todos os Direitos Reservados</p>
        </div>
    </footer>

    <!-- Floating WhatsApp Button -->
    <div class="floating-whatsapp">
        <a href="https://api.whatsapp.com/send?phone=5585987360977&text=Ol%C3%A1!%20Estou%20navegando%20no%20site%20da%20TarginoTur%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20passeios%20e%20transfers.%20Podem%20me%20atender%3F" target="_blank" title="Fale conosco pelo WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <script src="assets/js/script.js"></script>
    <script>
        function changeMainImage(src, thumbnail) {
            document.getElementById('mainImage').src = src;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        }
    </script>
</body>
</html>