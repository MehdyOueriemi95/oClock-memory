<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8"/></meta>
    <!-- Lien de la feuille de style global -->
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- Ceci est le lien de la lib GSAP que nous allons utiliser -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js'></script>
</head>

<body>
    <!-- ID parce qu'il n'y a qu'un begin_container -->
    <div id="begin_container">
        <!-- Nous pouvons mettre un h1 comme un h2 h3 h4 ça dependra de l'importance du titre (important pour le SEO référencement) -->
        <h1>Bienvenue dans le jeu du memory</h1>
        <!-- Lien pour ramener à la page game où il y'a le jeu du memeory -->
        <a id="btn_play" href="view/game.php">Jouer</a>
    </div>
</body>
<!-- On lie notre fichier JS au doc HTML -->
<script type="text/javascript" src="controller/js/intro_controller.js"></script>
</html>