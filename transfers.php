<?php
require_once 'config.php';

// Obter ID do transfer se fornecido
$transferId = isset($_GET['PacoteId']) ? (int)$_GET['PacoteId'] : null;

// Dados dos transfers
$transfers = [
    120 => [
        'id' => 120,
        'titulo' => 'Transfer Aeroporto × Hotel na Orla',
        'descricao' => 'Transfer confortável e seguro do Aeroporto de Fortaleza para hotéis na orla de Fortaleza.',
        'preco' => 'R$ 35,00',
        'duracao' => '30-45 min',
        'incluso' => ['Transporte executivo', 'Motorista profissional', 'Ar condicionado'],
        'imagens' => ['pacotes/120_1.jpg', 'pacotes/120_2.jpg'],
        'detalhes' => [
            'Veículos com ar condicionado',
            'Motoristas experientes e pontuais',
            'Atendimento 24 horas',
            'Monitoramento de voos',
            'Bagageiro incluso'
        ],
        'trajeto' => 'Aeroporto Internacional de Fortaleza → Hotéis da Orla (Iracema, Meireles, Mucuripe)'
    ],
    121 => [
        'id' => 121,
        'titulo' => 'Transfer Aeroporto × Praia do Futuro',
        'descricao' => 'Transfer direto do aeroporto para a região da Praia do Futuro.',
        'preco' => 'R$ 40,00',
        'duracao' => '35-50 min',
        'incluso' => ['Transporte executivo', 'Motorista profissional', 'Ar condicionado'],
        'imagens' => ['pacotes/121_1.jpg', 'pacotes/121_2.jpg'],
        'detalhes' => [
            'Veículos confortáveis',
            'Motoristas conhecedores da região',
            'Serviço porta a porta',
            'Pontualidade garantida',
            'Seguro incluso'
        ],
        'trajeto' => 'Aeroporto Internacional de Fortaleza → Região da Praia do Futuro'
    ],
    122 => [
        'id' => 122,
        'titulo' => 'Transfer Aeroporto × Cumbuco',
        'descricao' => 'Transfer para a praia do Cumbuco, ideal para quem busca aventura e esportes aquáticos.',
        'preco' => 'R$ 60,00',
        'duracao' => '45-60 min',
        'incluso' => ['Transporte executivo', 'Motorista profissional', 'Ar condicionado'],
        'imagens' => ['pacotes/122_1.jpg', 'pacotes/122_2.jpg'],
        'detalhes' => [
            'Veículos adequados para estrada',
            'Motoristas especializados',
            'Paradas para fotos (opcional)',
            'Informações turísticas durante o trajeto',
            'Flexibilidade de horários'
        ],
        'trajeto' => 'Aeroporto Internacional de Fortaleza → Cumbuco (Caucaia)'
    ]
];

$transfer = $transferId && isset($transfers[$transferId]) ? $transfers[$transferId] : null;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= $transfer ? $transfer['descricao'] : 'Transfers seguros e confortáveis em Fortaleza' ?>">
    <title><?= $transfer ? $transfer['titulo'] . ' - TarginoTur' : 'Transfers - TarginoTur' ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        .transfer-hero {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
            color: var(--white);
            padding: 100px 20px 80px;
            text-align: center;
        }
        
        .transfer-hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }
        
        .transfer-hero p {
            font-size: 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .transfer-features {
            padding: 80px 20px;
            background: var(--surface);
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .feature-card {
            background: var(--white);
            padding: 40px 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px var(--shadow);
            transition: var(--transition);
            border: 1px solid var(--border);
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px var(--shadow);
        }
        
        .feature-card i {
            font-size: 48px;
            color: var(--accent-blue);
            margin-bottom: 20px;
        }
        
        .feature-card h3 {
            font-size: 24px;
            color: var(--primary-blue);
            margin-bottom: 15px;
        }
        
        .feature-card p {
            color: var(--text-light);
            line-height: 1.6;
        }
        
        .transfer-detail {
            padding: 80px 20px;
            background: var(--background);
        }
        
        .transfer-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 50px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .transfer-info {
            background: var(--white);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px var(--shadow);
            border: 1px solid var(--border);
        }
        
        .transfer-title {
            font-size: 36px;
            color: var(--primary-blue);
            margin-bottom: 20px;
        }
        
        .transfer-price {
            font-size: 32px;
            color: var(--accent-gold);
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .transfer-duration {
            font-size: 18px;
            color: var(--text-light);
            margin-bottom: 30px;
        }
        
        .transfer-route {
            background: var(--light-blue);
            padding: 20px;
            border-radius: 10px;
            margin: 30px 0;
            border-left: 4px solid var(--accent-blue);
        }
        
        .route-title {
            font-weight: 600;
            color: var(--primary-blue);
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .transfers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }
        
        .transfer-card {
            background: var(--white);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px var(--shadow);
            transition: var(--transition);
            border: 1px solid var(--border);
        }
        
        .transfer-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px var(--shadow);
        }
        
        .transfer-card-header {
            background: linear-gradient(135deg, var(--accent-blue) 0%, var(--secondary-blue) 100%);
            color: var(--white);
            padding: 30px;
            text-align: center;
        }
        
        .transfer-card-title {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .transfer-card-price {
            font-size: 28px;
            font-weight: 700;
        }
        
        .transfer-card-body {
            padding: 30px;
        }
        
        .transfer-card-body ul {
            list-style: none;
            padding: 0;
            margin-bottom: 30px;
        }
        
        .transfer-card-body li {
            padding: 8px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid var(--border);
        }
        
        .transfer-card-body li:last-child {
            border-bottom: none;
        }
        
        .transfer-card-body i {
            color: var(--accent-blue);
            width: 20px;
        }
        
        .book-transfer-btn {
            width: 100%;
            background: var(--accent-gold);
            color: var(--white);
            padding: 15px;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            text-decoration: none;
            display: inline-block;
            text-align: center;
        }
        
        .book-transfer-btn:hover {
            background: #e8941f;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .transfer-hero h1 {
                font-size: 32px;
            }
            
            .transfer-content {
                grid-template-columns: 1fr;
                gap: 30px;
            }
            
            .transfer-title {
                font-size: 28px;
            }
            
            .transfer-price {
                font-size: 24px;
            }
            
            .transfers-grid {
                grid-template-columns: 1fr;
            }
            
            .transfer-info {
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
                    <a href="https://api.whatsapp.com/send?phone=5585987360977&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20TarginoTur%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20transfers.%20Podem%20me%20ajudar%3F" class="whatsapp-btn">
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

    <?php if ($transfer): ?>
    <!-- Transfer Detail -->
    <section class="transfer-detail">
        <div class="container">
            <div class="transfer-content">
                <div class="transfer-gallery">
                    <img src="<?= $transfer['imagens'][0] ?>" alt="<?= htmlspecialchars($transfer['titulo']) ?>" class="main-image">
                </div>
                
                <div class="transfer-info">
                    <h1 class="transfer-title"><?= htmlspecialchars($transfer['titulo']) ?></h1>
                    <div class="transfer-price"><?= htmlspecialchars($transfer['preco']) ?></div>
                    <div class="transfer-duration">
                        <i class="fas fa-clock"></i> <?= htmlspecialchars($transfer['duracao']) ?>
                    </div>
                    
                    <p><?= htmlspecialchars($transfer['descricao']) ?></p>
                    
                    <div class="transfer-route">
                        <div class="route-title">
                            <i class="fas fa-route"></i> Trajeto
                        </div>
                        <p><?= htmlspecialchars($transfer['trajeto']) ?></p>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-check-circle"></i> Incluso no Serviço</h3>
                        <ul>
                            <?php foreach ($transfer['incluso'] as $item): ?>
                            <li><i class="fas fa-check"></i> <?= htmlspecialchars($item) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-star"></i> Diferenciais</h3>
                        <ul>
                            <?php foreach ($transfer['detalhes'] as $detalhe): ?>
                            <li><i class="fas fa-star"></i> <?= htmlspecialchars($detalhe) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    
                    <a href="https://api.whatsapp.com/send?phone=5585987360977&text=Olá! Gostaria de contratar o transfer: <?= urlencode($transfer['titulo']) ?>" 
                       class="book-transfer-btn" target="_blank">
                        <i class="fab fa-whatsapp"></i> Contratar Transfer
                    </a>
                </div>
            </div>
        </div>
    </section>
    <?php else: ?>
    <!-- Transfer Hero -->
    <section class="transfer-hero">
        <div class="container">
            <h1>Transfers em Fortaleza</h1>
            <p>Transporte seguro, confortável e pontual para todos os destinos. Conte com a TarginoTur para suas necessidades de locomoção.</p>
        </div>
    </section>

    <!-- Transfer Features -->
    <section class="transfer-features">
        <div class="container">
            <h2 class="section-title">Por que escolher nossos transfers?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <i class="fas fa-shield-alt"></i>
                    <h3>Segurança</h3>
                    <p>Veículos revisados, motoristas habilitados e seguro completo para sua tranquilidade.</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-clock"></i>
                    <h3>Pontualidade</h3>
                    <p>Monitoramento de voos e horários rigorosamente cumpridos para não perder compromissos.</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-car"></i>
                    <h3>Conforto</h3>
                    <p>Veículos com ar condicionado, espaçosos e limpos para uma viagem agradável.</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-headset"></i>
                    <h3>Atendimento 24h</h3>
                    <p>Suporte completo a qualquer hora do dia para atender suas necessidades.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- All Transfers -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Nossos Transfers</h2>
            <div class="transfers-grid">
                <?php foreach ($transfers as $trf): ?>
                <div class="transfer-card">
                    <div class="transfer-card-header">
                        <h3 class="transfer-card-title"><?= htmlspecialchars($trf['titulo']) ?></h3>
                        <div class="transfer-card-price"><?= htmlspecialchars($trf['preco']) ?></div>
                    </div>
                    <div class="transfer-card-body">
                        <p><?= htmlspecialchars($trf['descricao']) ?></p>
                        <ul>
                            <?php foreach (array_slice($trf['incluso'], 0, 3) as $item): ?>
                            <li><i class="fas fa-check"></i> <?= htmlspecialchars($item) ?></li>
                            <?php endforeach; ?>
                        </ul>
                        <a href="transfers.php?PacoteId=<?= $trf['id'] ?>" class="book-transfer-btn">
                            Ver Detalhes <i class="fas fa-arrow-right"></i>
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
        <a href="https://api.whatsapp.com/send?phone=5585987360977&text=Oi,%20me%20interessei%20pelos%20servicos" target="_blank" title="Fale conosco pelo WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <script src="assets/js/script.js"></script>
</body>
</html>