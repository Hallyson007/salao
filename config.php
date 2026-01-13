<?php
// Configurações do banco de dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'site_targino');
define('DB_USER', 'root');
define('DB_PASS', '');

// Configurações do site
define('SITE_NAME', 'TarginoTur');
define('SITE_URL', 'http://localhost/site_targino');
define('SITE_EMAIL', 'targinotur.fretamento@gmail.com');
define('SITE_PHONE', '5585987360977');

// Configurações de segurança
define('SECURE_KEY', 'targino_tur_2024_secure_key');

// Classe de conexão com banco de dados
class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $conn = null;

    public function getConnection() {
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8",
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
                )
            );
        } catch(PDOException $exception) {
            error_log("Erro de conexão: " . $exception->getMessage());
            return null;
        }
        return $this->conn;
    }
}

// Funções utilitárias
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function generateSecureToken() {
    return bin2hex(random_bytes(32));
}

function formatPhone($phone) {
    $phone = preg_replace('/[^0-9]/', '', $phone);
    if (strlen($phone) == 11) {
        return '(' . substr($phone, 0, 2) . ') ' . substr($phone, 2, 5) . '-' . substr($phone, 7);
    }
    return $phone;
}

// Configurações de sessão segura
function startSecureSession() {
    if (session_status() == PHP_SESSION_NONE) {
        ini_set('session.cookie_httponly', 1);
        ini_set('session.cookie_secure', 1);
        ini_set('session.use_strict_mode', 1);
        session_start();
    }
}

// Headers de segurança
function setSecurityHeaders() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
}

// Aplicar headers de segurança
setSecurityHeaders();
?>