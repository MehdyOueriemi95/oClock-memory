<?php
// On se connecte à notre base de données en utilisant encore notre ami PDO
// Consulter la bible du PDO https://www.php.net/manual/fr/ref.pdo-mysql.php
$dbh = new PDO('mysql:host=localhost;dbname=o-clock', root, root);

// On récupère en post la valeur
$time = $_POST["time"];
// On prend la valeur maximale du chronomètre
$total_time = "00:10:00";
$time = "00:" . $time;

// On convertit en temps nos deux valeurs avant de les soustraire 
$total_time = strtotime($total_time);
$time = strtotime($time);

// Nous faisons la différence des deux temps pour obtenir le temps final
$time_diff = date('H:i:s',$total_time-$time);

// Enfin on insère notre valeur dans notre base de données
$sql = $dbh->prepare('INSERT INTO Memory (finishTime) VALUES (?)');
$sql->execute([$time_diff]);

// Si on voulait rediriger l'utilisateur en PHP 
// header('Location: ../../view/end.php');
exit();
?>