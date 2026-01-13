<?php
echo "<h2>Debug - Verificação de Imagens</h2>";

$directories = [
    'banner' => 'banner/',
    'pacotes' => 'pacotes/',
    'images' => 'images/'
];

foreach ($directories as $name => $dir) {
    echo "<h3>Pasta: $name</h3>";
    
    if (is_dir($dir)) {
        $files = scandir($dir);
        $imageFiles = [];
        
        foreach ($files as $file) {
            if (in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                $imageFiles[] = $file;
            }
        }
        
        if (!empty($imageFiles)) {
            echo "<div style='display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin: 20px 0;'>";
            foreach ($imageFiles as $image) {
                $path = $dir . $image;
                echo "<div style='border: 1px solid #ddd; padding: 10px; text-align: center;'>";
                echo "<img src='$path' alt='$image' style='max-width: 100%; height: 150px; object-fit: cover;' onerror='this.style.display=\"none\"; this.nextElementSibling.style.display=\"block\";'>";
                echo "<div style='display: none; color: red; padding: 20px;'>❌ Erro ao carregar</div>";
                echo "<p style='font-size: 12px; margin-top: 5px;'>$image</p>";
                echo "</div>";
            }
            echo "</div>";
        } else {
            echo "<p style='color: orange;'>Nenhuma imagem encontrada</p>";
        }
    } else {
        echo "<p style='color: red;'>Pasta não encontrada</p>";
    }
}

// Testar URLs específicas
echo "<h3>Teste de URLs Específicas</h3>";
$testImages = [
    'banner/banner01.jpg',
    'pacotes/123_1.jpg',
    'images/logo.jpg',
    'images/cartoes2.png'
];

foreach ($testImages as $img) {
    $exists = file_exists($img) ? '✅' : '❌';
    $size = file_exists($img) ? filesize($img) . ' bytes' : 'N/A';
    echo "<p>$exists $img ($size)</p>";
}
?>

<style>
body { font-family: Arial, sans-serif; margin: 20px; }
h2, h3 { color: #1a2b4a; }
</style>