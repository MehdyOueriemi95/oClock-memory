// Pour une mise en prod commenter tous les console.log
// Les console.log servent à debugger et vérifier tes variables
// Ouvre ton inspecteur web pour regarder nos messages et mieux comprendre notre algo


$(document).ready(function(){
    $('.good').click(function(){return false;});
    // On applique le tri ligne par ligne 
    // CF function shuffleElements ligne 164
    shuffleElements( $('.line1') );
    shuffleElements( $('.line2') );
    shuffleElements( $('.line3') );
    shuffleElements( $('.line4') );

    // Initialisation des variables nécessaires au dev
    let nbCardReturn = 0;
    let firstFruitReturned = "";
    let secondFruitReturned = "";
    let pairsFind = 0;
    let time = "";
    // Ici mon met une const car c'est une variable qui n'évolue pas durant la duré du jeu 
    const nbOfPairs = 14;

    // On affiche pas les indicateurs au debut vu que le joueur n'a pas joué
    $("#good").hide();
    $("#bad").hide();

    // Et si on s'amusait un peu à animer tout ça 
    TweenMax.staggerFrom(".hide", 0.5,  { opacity:0, y:-150, ease:Back.easeOut}, 0.15);
    // Vous avez vu c'est simple en une ligne tout est animé :) 

    // On active notre progressbar
    progress(600, 600, $('#progressBar'));

    $(".hide").click(function()
    {   
        // On incrémente notre variable de carte retourner => nbCardReturn++
        nbCardReturn++;
        console.log("Vous avez retourner : " +nbCardReturn);
        console.log("Tu as bien cliqué sur une case caché");
        // On regarde la valeur de la variable "nbCardReturn" pour vérifier combien de carte l'utilisateur à retourner
        // et faire ce qu'il faut dans la boucle
        // N-B : "=" pour une affectation
        // "==" : pour une comparaison abstraite => Il effectue les conversions de type nécessaire avant de faire la comparaison de l'égalité 
        // ======> Donc "15" et 15 sont égaux car "15" est convertie en 15
        // "===" : égalité stricte AUCUNE conversion de type n'a lieu
        if (nbCardReturn == 1) {
            // on enlève la class hide pour retourner la carte
            $(this).removeClass("hide");
            // On stock la valeur du premier fruit cliquer pour comparer par la suite 
            // Vu que ça retourne un tableau on le split et prend la valeur 0 du tableau
            firstFruitReturned = $(this).attr("class").split(' ')[0];
            console.log("Vous avez retourner en premier : " + firstFruitReturned);
            // Explication de la condition ci dessous 
            // ----> Si la variable "nbCardReturn" est à deux et que le deuxieme element cliqué contient la class hide (c'est a dire qu'il est encore face caché)
            // On rentre dans cette boucle sinon on va dans le "else" ligne 108
        } else if ((nbCardReturn == 2) && ($(this).hasClass("hide"))) {
            $(this).removeClass("hide");
            // On stock la valeur du deuxieme fruit cliqué pour comparer par la suite 
            secondFruitReturned = $(this).attr("class").split(' ')[0];
            console.log("La seconde carte retourné est : " + secondFruitReturned);
            // On lance la vérification des deux cartes 
            if (isTwoCardsGood(firstFruitReturned, secondFruitReturned) === true) {
                // On grise les cartes pour montrer qu'il a bon et qu'il ne peut plus cliquer dessus
                $("."+ firstFruitReturned +"").addClass("good");
                $("."+ secondFruitReturned +"").addClass("good");
                // On reset la variable "nbCardReturn" comme ça il peut continuer la partie
                nbCardReturn = 0;
                // On incremente la variable "pairsFind" 
                pairsFind ++;
                // On affiche l'indication good
                $("#good").show();
                // On l'efface au bout d'un certain pour laisse le joueur jouer
                setTimeout(function() { 
                    $("#good").hide();
                }, 1000);
                // On check si le jeu est fini en appelant notre fonction isFinished
                if (isFinished(pairsFind, nbOfPairs)) {
                    // On récupère le temps dans la progress bar
                    // On utilise text() pour récupérer le contenu de la div donc récupérer le temps
                    time = $('.bar').text();
                    console.log(time);
                    // On envoie avec AJAX la reponse
                    // On a choisi de le faire en ajax car c'est une variable JS qu'on envoie vers le PHP
                    // Pour l'envoi en base regarder le fichier send_time.php
                    $.post( '../controller/php/send_time.php', {time : time}).done(
                        // Promise qui est faite que si l'utilisateur gagne
                        // et que les données sont bien envoyées en base de données
                        function (response){
                            console.log(response);
                            setTimeout(function() { 
                                // Alert pour dire qu'il à gagné
                                alert("Vous avez gagné") ;  
                                window.location.href = "../view/end.php";
                            }, 1000);
                        }
                    );
                }
            } else {
                // On affiche l'indication bad
                $("#bad").show();
                // On remet hide au deux fruits => On met un setTimeOut pour que l'utilisateur puisse voir qu'il a faux
                setTimeout(function() { 
                    $("."+ firstFruitReturned +"").addClass("hide");
                    $("."+ secondFruitReturned +"").addClass("hide");
                    // On réinitialise le nbCardReturn
                    nbCardReturn = 0;
                    // On efface l'indication
                    $("#bad").hide();
                }, 1000);
            }
        } else {
            // Si il clique deux fois sur la meme carte on reset la variable nbCardReturn 
            // et on cache la carte sur laquelle il a cliqueé deux fois
            // Si on veut ajouter un message d'erreur dans ce cas la c'est ici 
            // Bonne idée d'exercice non ? Allez c'est par ici :) 
            nbCardReturn = 0;
            $(this).addClass("hide");
            console.log("Oups tu as cliqué sur la même case");
        }
    });


    ////////////////////////////// NOS FONCTIONS ////////////////////////

    // Fonction isTwoCardsGood retourne un booléen (true, false)
    // On compare les deux cartes
    function isTwoCardsGood(card1, card2) {
        if (card1 == card2) {
            return true;
        } else {
            return false;
        }
    }

    // Fonction isFinished return un booléen (true, false)
    // On regarde si l'utilisateur a fini la partie 
    function isFinished(pairsfinded, pairsFinal) {
        if (pairsfinded == pairsFinal) {
            return true;
        } else {
            return false;
        }
    }

    // Fonction pour notre progressBar 
    function progress(timeleft, timetotal, $element) {
        var progressBarWidth = timeleft * $element.width() / timetotal;
        $element.find('div').animate({ width: progressBarWidth }, 500).html(Math.floor(timeleft/60) + ":"+ timeleft%60);
        // On décremente la variable timeleft jusqu'a 0
        if(timeleft > 0) {
            setTimeout(function() {
                progress(timeleft - 1, timetotal, $element);
            }, 1000);
        } else {
            // Si le temps est fini
            alert("Vous avez perdu");  
            window.location.href = "../view/end.php";
        }
    };


    // Fonction qui mélange le plateau 
    // l'action de melanger et enfaite de deplacer le DOM pour chaque ligne du tableau
    // On s'est un peu compliqué la vie mais cela nous a fait manipuler les tableaux ça fait du bien :)
    // et ça fonctionne surtout !!!
    function shuffleElements($elements) {
        // On déclare nos variables
        var i, index1, index2, temp_val;
        // On met dans une variable le nombre 
        var count = $elements.length;
        var $parent = $elements.parent();
        var shuffled_array = [];
        // populate array of indexes
        for (i = 0; i < count; i++) {
            shuffled_array.push(i);
        }
        // On mélange les index du tableau pour les trier 
        for (i = 0; i < count; i++) {
            index1 = (Math.random() * count) | 0;
            index2 = (Math.random() * count) | 0;
            temp_val = shuffled_array[index1];
            shuffled_array[index1] = shuffled_array[index2];
            shuffled_array[index2] = temp_val;
        }
        // detach() est la même méthode que remove() mais elle conserve les données JQUERY 
        // C'est utilisé quand on doit réinsérer la ligne dans le DOM 
        // Parfait pour notre cas
        $elements.detach();
        for (i = 0; i < count; i++) {
            // Append permet d'inserer dans le HTML le tableau trié
            $parent.append( $elements.eq(shuffled_array[i]) );
        }
    }
});



