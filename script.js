let gamePattern=[];
let userClickedPattern=[];
let buttonColors=['red','blue','green','yellow'];
let buttons= document.querySelectorAll('.btn');
let level=0;
let gameStart=false;

for(i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click', function(){
    userClickedPattern.push(this.id);
    console.log(userClickedPattern);
    playSound(userClickedPattern.slice(-1));
    animatePress(document.querySelector(`#${this.id}`));
    checkAnswer(userClickedPattern.length-1);

    });
 }
 let playSound=(name)=>{
    let noise= new Audio(`sounds/${name}.mp3`)
    noise.play()
}
let animatePress=(color)=>{
    color.classList.add('pressed');
    setTimeout(function(){
        color.classList.remove('pressed')
     },100)

}

const nextSequence=()=>{
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    let currentColor=document.querySelector(`#${randomChosenColor}`);
    let sound=()=>{
        let noise= new Audio(`sounds/${randomChosenColor}.mp3`)
        noise.play()};
    currentColor.classList.add('pressed');
    sound();
    setTimeout(function(){currentColor.classList.remove('pressed')
        },100);
    level++;
    document.querySelector('h1').innerHTML=`level ${level}`;
    gameStart=true;
    if(gameStart){document.removeEventListener('keydown', nextSequence)}
    
}

document.addEventListener('keydown', nextSequence);

let checkAnswer=(currentColor)=>{
    if(userClickedPattern[currentColor]===gamePattern[currentColor]&&userClickedPattern.length===gamePattern.length){
        setTimeout(function(){nextSequence()},1000);
        userClickedPattern=[]

    }else if(userClickedPattern[currentColor]!==gamePattern[currentColor]){
        let badSound=new Audio('sounds/wrong.mp3');
        badSound.play();
        document.body.classList.add('game-over');
        setTimeout(function(){document.body.classList.remove('game-over')},200);
        document.querySelector('h1').innerHTML='Game Over! Press Any Key to Restart'

        startOver();
    }
}
    
let startOver=()=>{
    gameStart=false;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    document.addEventListener('keydown', nextSequence);


}
