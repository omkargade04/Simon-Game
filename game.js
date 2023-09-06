//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
let buttonColours = ["red", "blue", "green", "yellow"];

//5. At the top of the game.js file, create a new empty array called gamePattern.
let gamePattern = [];

//10. At the top of the game.js file, create a new empty array with the name userClickedPattern.
let userClickedPattern = [];

//20. Create a new variable called level and start at level 0.
let level = 0;

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
let started = false;

//19. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){
    if(!started){

        //21. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("h1").text("Level " + level);
        nextSequence();
        started = true
    }
});

$(".start").click(function(){
    if(!started){

        nextSequence();
        started = true
    }
});

//1. Inside game.js create a new function called nextSequence()
function nextSequence(){

    //29. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //22. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //23. Inside nextSequence(), update the h1 with this change in the value of level.
    $("h1").text("Level " + level);

    //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
    let randomNumber = (Math.floor(Math.random()*4));

    //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    let randomChosenColour = buttonColours[randomNumber];

    //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    gamePattern.push(randomChosenColour);

    //7. Use jQuery to select the button with the same id as the randomChosenColour || Fade Transition
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
     
    //15. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
    playSound(randomChosenColour);

}

//8. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){

    //9. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    let userChosenColour = $(this).attr("id");

    //11. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    //12. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColour);

    animatePress(userChosenColour);

    //25. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

});

//24. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){

    //26. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        //27. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length){

            //28. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");

        //30. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        //31. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        //32. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("h1").text("Game Over, Press Any Key to Restart");

        //34. Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

//13. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name){

    //14. Take the code we used to play sound in the nextSequence() function and add it to playSound().
    let audio = new Audio(name + ".mp3");
    audio.play();
}

//16. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){

    //17. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColour).addClass("pressed");

     //18. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

//33. Create a new function called startOver().
function startOver(){

    //35. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}


