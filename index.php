<?php
// Função para buscar imagens dinamicamente
function getImagesFromDirectory($dir, $extensions = ['jpg', 'jpeg', 'png', 'webp']) {
    $images = [];
    if (is_dir($dir)) {
        $files = array_diff(scandir($dir), ['.', '..']);
        foreach ($files as $file) {
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($extension, $extensions)) {
                $images[] = $dir . '/' . $file;
            }
        }
    }
    return $images;
}

// Buscar imagens dos diretórios
$bannerImages = getImagesFromDirectory('banner');
$pacoteImages = getImagesFromDirectory('pacotes');

// Dados dos passeios
$tours = [
    ['id' => 123, 'title' => '3 Praias em 1 Dia', 'desc' => 'Conheça as melhores praias do Ceará em um único dia'],
    ['id' => 124, 'title' => 'Canoa Quebrada', 'desc' => 'Praias paradisíacas e falésias coloridas'],
    ['id' => 125, 'title' => 'Cumbuco', 'desc' => 'Kitesurf, dunas e lagoas cristalinas'],
    ['id' => 126, 'title' => 'Jericoacoara - 1 Dia', 'desc' => 'O paraíso em um dia inesquecível'],
    ['id' => 127, 'title' => 'Jeri 3 Dias', 'desc' => 'Pacote completo para Jericoacoara'],
    ['id' => 128, 'title' => 'Mundaú e Flecheiras', 'desc' => 'Praias selvagens e tranquilas'],
    ['id' => 129, 'title' => 'Morro Branco e Praia das Fontes', 'desc' => 'Falésias e águas termais'],
    ['id' => 130, 'title' => 'Águas Belas e Barra Nova', 'desc' => 'Praias preservadas e natureza exuberante'],
    ['id' => 131, 'title' => 'City Tour com Praia de Cumbuco', 'desc' => 'Conheça Fortaleza e relaxe em Cumbuco'],
    ['id' => 132, 'title' => 'Praia de Lagoinha', 'desc' => 'Uma das praias mais belas do Ceará'],
    ['id' => 133, 'title' => 'Ipark Complexo Turístico', 'desc' => 'Diversão garantida para toda família']
];

$transfers = [
    ['id' => 120, 'title' => 'Transfer Aeroporto × Hotel na Orla', 'desc' => 'Transporte seguro e confortável'],
    ['id' => 121, 'title' => 'Transfer Aeroporto × Praia do Futuro', 'desc' => 'Direto para a diversão'],
    ['id' => 122, 'title' => 'Transfer Aeroporto × Cumbuco', 'desc' => 'Chegue relaxado ao seu destino']
];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="TarginoTur - Especialista em Passeios e Transfers em Fortaleza. Conheça as melhores praias do Ceará com segurança e conforto.">
    <title>TarginoTur | Passeios e Transfers em Fortaleza</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
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
                <?php if (file_exists('images/logo.jpg')): ?>
                <img src="images/logo.jpg" alt="TarginoTur" class="logo-img" loading="eager">
                <?php endif; ?>
                <div class="logo-text">TarginoTur</div>
            </div>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <a href="tel:+5585987360977">(85) 98736-0977</a>
                </div>
                <div class="social-links">
                    <a href="https://api.whatsapp.com/send?phone=5585987360977" class="social-icon" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=5585987360977&text=Olá! Vim pelo site da TarginoTur e gostaria de informações sobre passeios e transfers." class="whatsapp-btn" target="_blank">
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
                <li><a href="#home">Início</a></li>
                <li><a href="#about">Quem Somos</a></li>
                <li><a href="#tours">Passeios</a></li>
                <li><a href="#transfers">Transfers</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Slider -->
    <section class="hero-slider" id="home">
        <?php if (!empty($bannerImages)): ?>
            <?php foreach ($bannerImages as $index => $image): ?>
            <div class="slide <?= $index === 0 ? 'active' : '' ?>">
                <img src="<?= htmlspecialchars($image) ?>" 
                     alt="TarginoTur - Passeios em Fortaleza" 
                     loading="<?= $index === 0 ? 'eager' : 'lazy' ?>">
            </div>
            <?php endforeach; ?>
        <?php endif; ?>
        
        <div class="hero-overlay">
            <div class="hero-content">
                <h1>Descubra o Ceará com a TarginoTur</h1>
                <p>Especialistas em Passeios e Transfers em Fortaleza</p>
                <a href="#tours" class="cta-button">Conheça Nossos Passeios</a>
            </div>
        </div>
        
        <?php if (count($bannerImages) > 1): ?>
        <div class="slider-controls">
            <button class="slider-btn prev" onclick="changeSlide(-1)">❮</button>
            <button class="slider-btn next" onclick="changeSlide(1)">❯</button>
        </div>
        <div class="slider-dots">
            <?php foreach ($bannerImages as $index => $image): ?>
            <span class="dot <?= $index === 0 ? 'active' : '' ?>" onclick="currentSlideSet(<?= $index + 1 ?>)"></span>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </section>

    <!-- About Section -->
    <section class="section" id="about">
        <div class="container">
            <h2 class="section-title">Quem Somos</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>A <strong>TarginoTur</strong> é uma empresa especializada em turismo no Ceará, oferecendo os melhores passeios e transfers em Fortaleza e região. Com anos de experiência no mercado, garantimos segurança, conforto e momentos inesquecíveis para nossos clientes.</p>
                    <div class="features">
                        <div class="feature">
                            <i class="fas fa-shield-alt"></i>
                            <h3>Segurança</h3>
                            <p>Veículos revisados e motoristas experientes</p>
                        </div>
                        <div class="feature">
                            <i class="fas fa-clock"></i>
                            <h3>Pontualidade</h3>
                            <p>Horários rigorosamente cumpridos</p>
                        </div>
                        <div class="feature">
                            <i class="fas fa-heart"></i>
                            <h3>Atendimento</h3>
                            <p>Equipe dedicada ao seu bem-estar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Tours Section -->
    <section class="section" id="tours">
        <div class="container">
            <h2 class="section-title">Nossos Passeios</h2>
            <div class="tours-grid">
                <?php foreach ($tours as $index => $tour): 
                    // Buscar imagem específica do pacote
                    $imagePath = 'pacotes/' . $tour['id'] . '_1.jpg';
                    if (!file_exists($imagePath) && isset($pacoteImages[$index])) {
                        $imagePath = $pacoteImages[$index];
                    }
                ?>
                <article class="tour-card">
                    <div class="tour-image-container">
                        <img src="<?= htmlspecialchars($imagePath) ?>" 
                             alt="<?= htmlspecialchars($tour['title']) ?>" 
                             class="tour-image" 
                             loading="lazy"
                             onerror="this.src='images/placeholder.jpg'">
                        <div class="tour-overlay">
                            <a href="javascript:void(0)" onclick="openWhatsApp('<?= urlencode($tour['title']) ?>')" class="tour-btn">
                                <i class="fas fa-whatsapp"></i> Solicitar Orçamento
                            </a>
                        </div>
                    </div>
                    <div class="tour-content">
                        <h3 class="tour-title"><?= htmlspecialchars($tour['title']) ?></h3>
                        <p class="tour-desc"><?= htmlspecialchars($tour['desc']) ?></p>
                        <a href="javascript:void(0)" onclick="openWhatsApp('<?= urlencode($tour['title']) ?>')" class="tour-link">
                            Saiba Mais <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Transfers Section -->
    <section class="section transfers-section" id="transfers">
        <div class="container">
            <h2 class="section-title">Nossos Transfers</h2>
            <div class="tours-grid">
                <?php foreach ($transfers as $index => $transfer): 
                    // Buscar imagem específica do transfer
                    $imagePath = 'pacotes/' . $transfer['id'] . '_1.jpg';
                    if (!file_exists($imagePath) && isset($pacoteImages[$index + count($tours)])) {
                        $imagePath = $pacoteImages[$index + count($tours)];
                    }
                ?>
                <article class="tour-card">
                    <div class="tour-image-container">
                        <img src="<?= htmlspecialchars($imagePath) ?>" 
                             alt="<?= htmlspecialchars($transfer['title']) ?>" 
                             class="tour-image" 
                             loading="lazy"
                             onerror="this.src='images/placeholder.jpg'">
                        <div class="tour-overlay">
                            <a href="javascript:void(0)" onclick="openWhatsApp('<?= urlencode($transfer['title']) ?>')" class="tour-btn">
                                <i class="fas fa-whatsapp"></i> Solicitar Orçamento
                            </a>
                        </div>
                    </div>
                    <div class="tour-content">
                        <h3 class="tour-title"><?= htmlspecialchars($transfer['title']) ?></h3>
                        <p class="tour-desc"><?= htmlspecialchars($transfer['desc']) ?></p>
                        <a href="javascript:void(0)" onclick="openWhatsApp('<?= urlencode($transfer['title']) ?>')" class="tour-link">
                            Saiba Mais <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="section" id="contact">
        <div class="container">
            <h2 class="section-title">Fale Conosco</h2>
            <div class="contact-content">
                <div class="contact-info-grid">
                    <div class="contact-card">
                        <i class="fas fa-phone"></i>
                        <h3>Telefone</h3>
                        <p><a href="tel:+5585987360977">(85) 98736-0977</a></p>
                    </div>
                    <div class="contact-card">
                        <i class="fas fa-envelope"></i>
                        <h3>E-mail</h3>
                        <p><a href="mailto:targinotur.fretamento@gmail.com">targinotur.fretamento@gmail.com</a></p>
                    </div>
                    <div class="contact-card">
                        <i class="fab fa-whatsapp"></i>
                        <h3>WhatsApp</h3>
                        <p><a href="https://api.whatsapp.com/send?phone=5585987360977&text=Olá! Gostaria de informações sobre os serviços da TarginoTur." target="_blank">Fale Conosco</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

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
                <h3>Serviços</h3>
                <p>Passeios em Fortaleza</p>
                <p>Transfers Aeroporto</p>
                <p>City Tours</p>
                <p>Excursões Personalizadas</p>
            </div>
            <div class="footer-section payment-methods">
                <h3>Formas de Pagamento</h3>
                <?php if (file_exists('images/cartoes2.png')): ?>
                <img src="images/cartoes2.png" alt="Cartões aceitos" loading="lazy" style="width: 100%; max-width: 300px; height: 300px;">
                <?php endif; ?>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?= date('Y') ?> TarginoTur - Todos os Direitos Reservados</p>
        </div>
    </footer>

    <!-- Floating WhatsApp -->
    <div class="floating-whatsapp">
        <a href="https://api.whatsapp.com/send?phone=5585987360977&text=Olá! Estou no site da TarginoTur e gostaria de informações sobre passeios e transfers em Fortaleza." target="_blank">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <script>
        // Função para abrir WhatsApp com mensagem específica
        function openWhatsApp(service) {
            const message = `Olá! Gostaria de informações sobre: ${service}. Podem me ajudar?`;
            const url = `https://api.whatsapp.com/send?phone=5585987360977&text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }
    </script>
    <script src="assets/js/script_optimized.js"></script>
</body>
</html>