$(document).ready(function() {
    let colors = ["red", "blue", "white", "yellow", "orange",
        "purple", "aqua", "chartreuse", "mistyrose", "grey",
        "fuchsia", "gold", "pink", "magenta", "navy",
        "salmon", "deeppink", "firebrick", "black", "lightskyblue"];
    let matches = [1,2,3,4,5,6,7,8,9,10,10,9,8,7,6,5,4,3,2,1];
    let firstChoice = true;
    let i = 0;
    let j = 0;
    let temp = null;
    let temp2 = null;
    let firstPic = "";
    let sencondPic = "";
    let firstPicId = "";
    let secondPicId = "";
    let nextTurn = true;
    let bgcolor1 = "";
    let bgcolor2 = "";
    let starIsRecharged = true;
    let starClicked = "no";
    let time = 0;
    let time2 = 0;
    let starTime = 0;
    let madeMatch = false;
    let gameTime = 0;
    let gameOver = null;
    let milisecond = 0;
    let leftSec = 0;
    let rightSec = 0;
    let minute = 0;
    let gameStarted = false;
    let correct = 0;
    let alreadySolved = "no";
    let midTime = 1000;
    let rotate = "";

    $("#playAgain").hide();

    shuffleColorsAndImages();
    

    // $('#myModal').modal("toggle");

    $("#showTimer").on("click", function(event) {
        $("#timeStuff").fadeIn("slow");
    });

    $("#hideTimer").on("click", function(event) {
        $("#timeStuff").fadeOut("slow");
    });

    $("#modalBtn").on("click", function(event) {
        $('#myModal').modal("toggle");
        intervalId1 = setInterval(shortTimer, 10);
        let timeLeft = 100;
        function shortTimer() {
        if (timeLeft === 0) {
            clearInterval(intervalId1);
            $("#modalSection").remove();
        }
        timeLeft--;
    }
        
    });

    // This displays all pictures for 1.5 seconds
    // It occurs every 30 seconds
    $("#star").on("click", function(event) {
        // This checks to see if the game has begun. If it hasn't, then the game timer starts
        if (gameStarted === false) {
            playerTime();
            gameStarted = true;
        }

        // This makes sure the user hasn't selected 1 image already and that the game is not over
        if (firstChoice === true && gameOver === false) {
            nextTurn = false;
            if (starIsRecharged === true) {
                for (let i=0; i<21; i++) {
                    $("#" + i).attr("src", "assets/images/" + matches[i-1] + ".jpg");
                    $("#" + i).css("transition", "filter .2s");
                    $("#" + i).css("transition", "all ease-in-out .2s"); 
                }
                $("#star").css("opacity", "0.2");
                $("#star").css("transform", "scale(0.01)");
                
                $("#star").addClass("smallStar");
                $("#star").attr("src", "assets/images/stopped_star.gif");
                $("#star").fadeTo(7000, 1.0);
                starTime = 3000;
                starClicked = "yes";
                starTimer();
            }
        }
    });

    // This is for the ornaments that are clickable
    $(".clickable").on("click", function(event) {

        alreadySolved = $(this).attr("solved");

        // This checks to see if the game has begun. If it hasn't, then the game timer starts
        if (gameStarted === false) {
            playerTime();
            gameStarted = true;
        }

        // nextTurn is so the player cannot click on the star and an ornament at the same time
        // alreadySolved means the user has already solved that image
        if (nextTurn === true && alreadySolved === "no") {
            if (firstChoice === true) {
                firstChoice = false;
                firstPic = $(this).attr("match");
                firstPicId = $(this).attr("id");
                $("#" + firstPicId).attr("src", "assets/images/" + firstPic + ".jpg");
                $("#" + firstPicId).addClass("largerImg");

            } else {
                secondPic = $(this).attr("match");
                secondPicId = $(this).attr("id");
                $("#" + secondPicId).attr("src", "assets/images/" + secondPic + ".jpg");
                $("#" + secondPicId).addClass("largerImg");
                
                // This checks to see if the 2 pictures match each other
                if (firstPic === secondPic) {
                    madeMatch = true;
                    nextTurn = false;
                    correct++;
                    time = 200;
                    pauseTime();
                } else {
                    nextTurn = false;
                    time = 200;
                    pauseTime();
                }
                
                if (correct === 2) {
                    endGame();
                }
            }
        } 
    });





    // THis is for the stopwatch timer in the upper right corner
    function playerTime() {
        intervalId3 = setInterval(gameStart, 10);
    }

    function gameStart() {
        if (gameOver === true) {
            clearInterval(intervalId3);
        }
        if (milisecond === 100) {
            rightSec++;
            milisecond = 0;
        }
        if (rightSec === 10) {
            leftSec++;
            rightSec = 0;
        }
        if (leftSec === 6) {
            minute++;
            leftSec = 0;
        }
        if (milisecond < 10) {
            $("#msecs").html("0" + milisecond);
        } else {
            $("#msecs").html(milisecond);
        }

        
        $("#sec1").html(leftSec);
        $("#sec2").html(rightSec);
        $("#minute").html(minute);
        milisecond++;
        gameTime++;
        
        
        // This part will determine if the tree moves from side to side
        if (gameTime > midTime && gameTime < (midTime+2)) {
            let random = Math.floor((Math.random() * 10) + 1);
            console.log(random);
            if (random === 7 || random === 8 || random === 9 || random === 10) {
                if (rotate === "neg45") {
                    $(".gameboard").addClass("neg45ToBase");
                    $(".gameboard").removeClass("rotateNeg45");
                    rotate = "";
                } else if (rotate === "pos45") {
                    
                    $(".gameboard").addClass("pos45ToBase");
                    $(".gameboard").removeClass("rotatePos45");
                    rotate = "";
                } else {
                    if (random === 7 || random === 8) {
                        $(".gameboard").removeClass("pos45ToBase");
                        $(".gameboard").addClass("rotateNeg45");
                        $(".gameboard").removeClass("neg45ToBase");
                        rotate = "neg45";
                    } else if (random === 9 || random === 10) {
                        $(".gameboard").removeClass("neg45ToBase");
                        $(".gameboard").addClass("rotatePos45");
                        $(".gameboard").removeClass("pos45ToBase");
                        rotate = "pos45";
                    }
                }           
            }
            midTime = midTime + 1000;
        }

    }









    // This is the after 2 ornaments are clicked timer
    function pauseTime() {
	    intervalId = setInterval(count, 10);
    }

    function count () {
        // console.log(`nextTurn = ${nextTurn}, starClicked = ${starClicked}, starIsRecharged = ${starIsRecharged}`);
        // When 2 ornaments are clicked and they DO NOT match
        if (time === 0 && nextTurn === false && madeMatch === false) {
            $("#" + firstPicId).attr("src", "assets/images/trans.png");
            $("#" + secondPicId).attr("src", "assets/images/trans.png");
            $("#" + firstPicId).css("background-color", colors[firstPicId-1]);
            $("#" + secondPicId).css("background-color", colors[secondPicId-1]);
            $("#" + firstPicId).removeClass("largerImg");
            $("#" + secondPicId).removeClass("largerImg");
            nextTurn = true;
            firstChoice = true;
            clearInterval(intervalId);
        } else if (time === 0 && madeMatch === true) {
            $("#" + firstPicId).attr("solved", "yes");
            $("#" + secondPicId).attr("solved", "yes");
            $("#" + firstPicId).addClass("solved");
            $("#" + secondPicId).addClass("solved");
            $("#" + firstPicId).removeClass("largerImg");
            $("#" + secondPicId).removeClass("largerImg");
            firstChoice = true;
            nextTurn = true;
            madeMatch = false;
        }
        time--;
    }
    
    // This is the timer when the STAR is clicked
    function starTimer() {
        intervalId2 = setInterval(starCount, 10);
    }

    function starCount () {
       
        // This turns back all images to colored circles after 2 seconds (time = 900 when run)
        if (starTime === 2800) {
            for (let i=0; i<21; i++) {
                $("#" + i).attr("src", "assets/images/trans.png");
                $("#" + i).css("background-color", colors[i-1]);
                $("#" + i).removeClass("largerImg");
            }
            nextTurn = true;
        } else if (starTime === 0) {
            // console.log("STAR IS RECHARGED");
            $('#myModal').modal("toggle");
            $("#star").attr("src", "assets/images/star.gif");
            starIsRecharged = true;
            starClicked = "no";
            $("#star").removeClass("smallStar");
            $("#star").css("transform", "scale(1.0)");
            clearInterval(intervalId2);
            // console.log(`nextTurn = ${nextTurn}, starClicked = ${starClicked}, starIsRecharged = ${starIsRecharged}`);
        }
        starTime--;
    }















    function endGame() {
        clearInterval(intervalId3);
        console.log("YOU WIN!");
        console.log(gameTime);
        $("#titleTop").html("YOU WIN!");
        $("#playAgain").fadeIn("slow");
        $(".gameboard").removeClass("rotateNeg45");
        $(".gameboard").removeClass("neg45ToBase");
        $(".gameboard").removeClass("rotatePos45");
        $(".gameboard").removeClass("pos45ToBase");
    }

    $("#playAgain").on("click", function(event) {
        // This resets everything to the beginning
        $("#playAgain").fadeOut("slow");
        $("#titleTop").html("Merry Christmas");
        $("#minute").html("0");
        $("#sec1").html("0");
        $("#sec2").html("0");
        $("#msecs").html("00");
        for (let i=1; i<21; i++) {
            $("#" + i).attr("solved", "no");
            $("#" + i).attr("src", "assets/images/trans.png");
            $("#" + i).css("background-color", colors[i-1]);
            $("#" + i).removeClass("solved");
        }
        shuffleColorsAndImages();

        firstChoice = true;
        i = 0;
        j = 0;
        temp = null;
        temp2 = null;
        firstPic = "";
        sencondPic = "";
        firstPicId = "";
        secondPicId = "";
        nextTurn = true;
        bgcolor1 = "";
        bgcolor2 = "";
        starIsRecharged = true;
        starClicked = "no";
        time = 0;
        time2 = 0;
        starTime = 0;
        madeMatch = false;
        gameTime = 0;
        gameOver = null;
        milisecond = 0;
        leftSec = 0;
        rightSec = 0;
        minute = 0;
        gameStarted = false;
        correct = 0;
        alreadySolved = null;
        let midTime = 1000;
    });





    function shuffleColorsAndImages() {
     
        // This shuffles the colors & matches array
        for (i = colors.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = colors[i];
            temp2 = matches[i];
            colors[i] = colors[j];
            // matches[i] = matches[j];
            colors[j] = temp;
            // matches[j] = temp2;
        }

        // This assigns each color on the board
        for (let i=1; i<colors.length+1; i++) {
            $("#" + i).css("background-color", colors[i-1]);
            $("#" + i).attr("match", matches[i-1]);
        }
        
    }
});