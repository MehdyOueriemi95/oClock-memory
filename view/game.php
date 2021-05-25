<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8"/></meta>
    <!-- Lien de la feuille de style global -->
    <link rel="stylesheet" href="../assets/css/style.css">
    <!-- On utilise jquery pour une gestion du DOM -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Ceci est le lien de la lib GSAP que nous allons utiliser -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js'></script>
</head>

<body>
    <div id="game_head_container">
        <h1>Jeu du memory</h1>
        <!-- On va ressortir de la base de données le meilleur temps -->
        <!-- On utilise les requetes PDO  -->
        <?php
            // Ici ma base de données s'appelle o-clock si tu la changes modifie le ici
            $dbh = new PDO('mysql:host=localhost;dbname=o-clock', root, root);
            // On utilise MIN() qui permet de ressortir le temps le plus rapide dans la base de données
            // Lien vers la doc https://sql.sh/fonctions/agregation/min
            $reponse = $dbh->query('SELECT MIN(finishTime) FROM Memory');
            // Les reponses de requete PHP sont ressorties en tableau nous sommes donc obligés de le parcourir 
            // pour ressortir la seule valeur donc on fait une boucle while => Tant que
            while ($donnees = $reponse->fetch())
        {
        ?>
            <p id="best_time">Le meilleur temps est<br/><?php echo $donnees['MIN(finishTime)']; ?></p>
        <?php
        }
            $reponse->closeCursor(); // Termine le traitement de la requête
        ?>
    </div>
    <!-- Notre indicateur de bonne ou mauvaise reponse -->
    <div id="indicator_container">
        <p id="good">Bien joué</p>
        <p id="bad">Loupé</p>
    </div>
    <!-- Conteneur qui va envelopper le jeu => ID car il y'a qu'un conteneur de jeu -->
    <div id="game_container">
        <!-- Nous allons le faire sous la forme d'un tableau il y'a d'autre manière de le faire aussi :) Mais manipulons un peu les tableaux -->
        <table>
            <!-- On place aux hasard dans un premier temps tous les fruits -->
            <tr>
                <!-- On utilise les class car on utilise plusieurs fois le fruit et plusieurs fois hide-->
                <td class="line1"><div class="pomme hide"></div></td>
                <td class="line1"><div class="banane hide"></div></td>
                <td class="line1"><div class="orange hide"></div></td>
                <td class="line1"><div class="citron_vert hide"></div></td>
                <td class="line1"><div class="citron_jaune hide"></div></td>
                <td class="line1"><div class="fraise hide"></div></td>
                <td class="line1"><div class="pomme_verte hide"></div></td>
            </tr>
            <tr>
                <td class="line2"><div class="pasteque hide"></div></td>
                <td class="line2"><div class="mangue hide"></div></td>
                <td class="line2"><div class="raisin hide"></div></td>
                <td class="line2"><div class="framboise hide"></div></td>
                <td class="line2"><div class="cerise hide"></div></td>
                <td class="line2"><div class="poire hide"></div></td>
                <td class="line2"><div class="prune hide"></div></td>
            </tr>
            <tr>
                <td class="line3"><div class="pomme hide"></div></td>
                <td class="line3"><div class="banane hide"></div></td>
                <td class="line3"><div class="orange hide"></div></td>
                <td class="line3"><div class="citron_vert hide"></div></td>
                <td class="line3"><div class="citron_jaune hide"></div></td>
                <td class="line3"><div class="fraise hide"></div></td>
                <td class="line3"><div class="pomme_verte hide"></div></td>
            </tr>
            <tr>
                <td class="line4"><div class="pasteque hide"></div></td>
                <td class="line4"><div class="mangue hide"></div></td>
                <td class="line4"><div class="raisin hide"></div></td>
                <td class="line4"><div class="framboise hide"></div></td>
                <td class="line4"><div class="cerise hide"></div></td>
                <td class="line4"><div class="poire hide"></div></td>
                <td class="line4"><div class="prune hide"></div></td>
            </tr>
        </table>
    </div>
    <!-- Notre barre de progression :) -->
    <div id="progressBar">
        <div class="bar"></div>
    </div>
</body>
<!-- On lie notre fichier JS au doc HTML -->
<script type="text/javascript" src="../controller/js/game_controller.js"></script>
</html>