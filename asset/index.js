//1. Récuperer l'element <canvas> du DOM 
let canvas= document.querySelector("#ecranJeux"); //ou document.getElementById("ecranJeux")

//2. Appeler le contexte(=les axes utilisés pour dessiner) de l'element <canvas> 
let contexte= canvas.getContext('2d');

let gameStarted= false;

let delais=200;

const grid= 20;

//variable pour quand le delais de mouvement du snake pour eviter les demi-tour
let isMoving = false

//5. Définir l'object Snake: const snake={}
const snake= {
    tete:{
        largeur: grid,
        hauteur: grid,
    },
    position:{
        x:canvas.width/2,
        y:canvas.height/2
    },
    deplacement:{
        x:0,
        y:0
    }, 
//14. Diviser le corps du Snake en section
    corps:[],
    taille:3,

//6. Afficher notre Snake dans le <canvas>: contexte.fillRect(x,y, width, height) & contexte.fillStyle="color"
    afficher:()=>{
        contexte.clearRect(0,0,canvas.width,canvas.height);
        contexte.fillStyle="white";

        //11. Définir le corps du Snake: const Snake={corps:[]} 
        
        for(let index of snake.corps){
            contexte.fillRect(index.x, index.y, snake.tete.largeur-2,snake.tete.hauteur-2);
        }
    },

//7. Faire bouger le Snake: snake.position.x++ 
    deplacer:()=>{
        snake.position.x+=snake.deplacement.x*snake.tete.largeur;
        snake.position.y+=snake.deplacement.y*snake.tete.hauteur;
        let coordonees={
            x:snake.position.x,
            y:snake.position.y,
        };
        snake.corps.push(coordonees);

    //8. Effacer sa trace: contexte.clearRect(x,y, width, height)

        while(snake.corps.length>snake.taille){
            snake.corps.shift();
        };
    },

    grandir:()=>{
        snake.taille++;
    },
};
//15. Définir l'object pomme: const pomme={}
const pomme= {
    dimension:{
        rayon: grid/2,
    },
    position:{
        x:(Math.floor(Math.random()*(canvas.width/grid))*grid),
        y:(Math.floor(Math.random()*(canvas.height/grid))*grid),
    },

    afficher:()=>{
       contexte.beginPath();
       contexte.arc(pomme.position.x+pomme.dimension.rayon,pomme.position.y+pomme.dimension.rayon,pomme.dimension.rayon,0,Math.PI*2);
       contexte.fillStyle= "darkred";
       contexte.fill();
       contexte.closePath(); 
    },

    initialiser:()=>{
        pomme.position.x=(Math.floor(Math.random()*(canvas.width/grid))*grid);
        pomme.position.y=(Math.floor(Math.random()*(canvas.height/grid))*grid);
    }

}

const reinitialiser=()=>{
    snake.taille=3;
    snake.position.x=canvas.width/2;
    snake.position.y=canvas.height/2;
    snake.deplacement.x=0;
    snake.deplacement.y=0;
    snake.corps=[];
    delais=200;

    if(gameStarted===false){
        game(); 
    }

}
//18. Afficher un score.






//4. Créer la fonction principale du jeu: game()
function game (){

    gameStarted=true;

    if(snake.position.x >= canvas.width || snake.position.y >= canvas.height || snake.position.x < 0 || snake.position.y < 0){
        alert("t'as perdu!");
        gameStarted=false;
        reinitialiser();

        return;
    };

    snake.afficher();

    snake.deplacer();

    pomme.afficher();

    //16. Dans la fonction game définit plus haut, vérifier s'il y a des collisions entre la pomme et le Snake
    //17. Adapter le comportement du Snake et de la pomme s'il y a collisions
    if(snake.position.x === pomme.position.x && snake.position.y === pomme.position.y){
        pomme.initialiser();
        snake.grandir();

        if(delais>=100){
            delais-=5;
        }
        
    }

//13. Adapter la delais du Snake: setTimeout(game, snake.delais)

    setTimeout(game,delais);

}
game()

//9. Manipuler le Snake avec les touches du clavier (key)
//10. Empecher le Snake de faire demi-tour

const clavier=(touche)=>{
    
    switch(touche.key){

        case "ArrowRight":
            if(snake.deplacement.x===-1){break;}
            snake.deplacement.x=1;
            snake.deplacement.y=0;
            break;
        case "ArrowLeft":
            if(snake.deplacement.x===1){break;}
            snake.deplacement.x=-1;
            snake.deplacement.y=0;
            break;
        case "ArrowUp":
            if(snake.deplacement.y===1){break;}
            snake.deplacement.x=0;
            snake.deplacement.y=-1;
            break;
        case "ArrowDown":
            if(snake.deplacement.y===-1){break;}
            snake.deplacement.x=0;
            snake.deplacement.y=1;
            break;

        case "Enter": reinitialiser();
            break;

        case " ":
            snake.deplacement.x=0;
            snake.deplacement.y=0;
            break;
    }

};
window.addEventListener("keydown", (touche) => {
    if (!isMoving) {
        isMoving = true
        clavier(touche)
        setTimeout(() =>  {
            isMoving = false
        },70)
    }
});



