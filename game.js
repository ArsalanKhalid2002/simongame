var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keydown(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})

$(".btn").on("click",function(){
    var yourChoosenColor=$(this).attr("id");
    userClickedPattern.push(yourChoosenColor);
    playSound(yourChoosenColor);
    animatePress(yourChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("true");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    }}
    else{
        console.log("false");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
     
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randNumber=Math.floor(Math.random()*4);
    var randomChooseColor=buttonColors[randNumber];
    gamePattern.push(randomChooseColor);
    $("#"+randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);;
    playSound(randomChooseColor);
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    },100)
}
function startOver(){
    gamePattern=[];
    level=0;
    started=false;
}
