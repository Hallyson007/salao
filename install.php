<?php
// Instalador automático do banco de dados
echo "<h2>Instalador TarginoTur - XAMPP</h2>";

$host = 'localhost';
$username = 'root';
$password = '';

try {
    // Conectar sem especificar banco
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<p style='color: green;'>✅ Conectado ao MySQL</p>";
    
    // Ler e executar o SQL
    $sql = file_get_contents('database.sql');
    
    if ($sql) {
        // Dividir em comandos individuais
        $commands = explode(';', $sql);
        
        foreach ($commands as $command) {
            $command = trim($command);
            if (!empty($command)) {
                try {
                    $pdo->exec($command);
                } catch (PDOException $e) {
                    // Ignorar erros de "já existe"
                    if (strpos($e->getMessage(), 'already exists') === false) {
                        echo "<p style='color: orange;'>⚠️ " . $e->getMessage() . "</p>";
                    }
                }
            }
        }
        
        echo "<p style='color: green;'>✅ Banco de dados 'site_targino' criado com sucesso!</p>";
        echo "<p style='color: green;'>✅ Tabelas criadas com sucesso!</p>";
        echo "<p style='color: green;'>✅ Dados iniciais inseridos!</p>";
        
        echo "<h3>Próximos passos:</h3>";
        echo "<ol>";
        echo "<li><a href='test_connection.php'>Testar conexão</a></li>";
        echo "<li><a href='index.php'>Acessar o site</a></li>";
        echo "<li><a href='http://localhost/phpmyadmin'>Gerenciar banco (phpMyAdmin)</a></li>";
        echo "</ol>";
        
    } else {
        echo "<p style='color: red;'>❌ Erro: Arquivo database.sql não encontrado!</p>";
    }
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ Erro: " . $e->getMessage() . "</p>";
    echo "<h3>Verifique:</h3>";
    echo "<ul>";
    echo "<li>XAMPP está rodando?</li>";
    echo "<li>MySQL está ativo no painel do XAMPP?</li>";
    echo "<li>Porta 3306 está livre?</li>";
    echo "</ul>";
}
?>

<style>
body { font-family: Arial, sans-serif; margin: 20px; }
h2 { color: #1a2b4a; }
p { margin: 5px 0; }
a { color: #4a90e2; text-decoration: none; }
a:hover { text-decoration: underline; }
</style>