<?php
// Teste de conexão com XAMPP MySQL
echo "<h2>Teste de Conexão - TarginoTur</h2>";

// Configurações do XAMPP
$host = 'localhost';
$dbname = 'site_targino';
$username = 'root';
$password = '';

try {
    // Tentar conectar
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "<p style='color: green;'>✅ Conexão com MySQL estabelecida com sucesso!</p>";
    echo "<p><strong>Banco:</strong> $dbname</p>";
    echo "<p><strong>Host:</strong> $host</p>";
    
    // Testar se as tabelas existem
    $tables = ['categorias', 'pacotes', 'clientes', 'reservas', 'contatos'];
    echo "<h3>Verificando Tabelas:</h3>";
    
    foreach ($tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            echo "<p style='color: green;'>✅ Tabela '$table' existe</p>";
        } else {
            echo "<p style='color: red;'>❌ Tabela '$table' não encontrada</p>";
        }
    }
    
    // Contar registros
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM pacotes");
    $result = $stmt->fetch();
    echo "<p><strong>Total de pacotes:</strong> " . $result['total'] . "</p>";
    
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM categorias");
    $result = $stmt->fetch();
    echo "<p><strong>Total de categorias:</strong> " . $result['total'] . "</p>";
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ Erro de conexão: " . $e->getMessage() . "</p>";
    echo "<h3>Instruções:</h3>";
    echo "<ol>";
    echo "<li>Certifique-se que o XAMPP está rodando</li>";
    echo "<li>Inicie o Apache e MySQL no painel do XAMPP</li>";
    echo "<li>Acesse http://localhost/phpmyadmin</li>";
    echo "<li>Importe o arquivo database.sql</li>";
    echo "<li>Recarregue esta página</li>";
    echo "</ol>";
}
?>

<style>
body { font-family: Arial, sans-serif; margin: 20px; }
h2 { color: #1a2b4a; }
p { margin: 5px 0; }
ol { margin-left: 20px; }
</style>