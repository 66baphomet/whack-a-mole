const square=document.querySelectorAll(".square");
const mole=document.querySelectorAll(".mole");
const timeLeft=document.querySelector("#time-left");
let score=document.querySelector("#score");

let result=0;
let hitPosition;
let currentTime = timeLeft.textContent;

function randomSquare()
{
    
    square.forEach(className => {
        className.classList.remove("mole");
    })



    let randomPosition = square[Math.floor(Math.random()*9)];

    randomPosition.classList.add("mole");

    hitPosition = randomPosition.id;

    setTimeout( ()=>{
        randomPosition.classList.remove("mole");
        hitPosition=undefined;
    },750);

    // console.log(hitPosition);
}

square.forEach(id=>{

    id.addEventListener("click", ()=> {
        if(id.id==hitPosition)
        {
            let whack = new Audio("whack.mp3");
            whack.play();

            hitPosition=undefined;
            // randomSquare();

            result++;
            score.textContent=result;
        }
        else
        {
            let notWhack = new Audio("notWhack.mp3");
            notWhack.play();
        }

        console.log(id.id);
        console.log(hitPosition);
    })
})

let timerId;
let moleMoveId;

let startOnce=true;

function moveMole()
{
    if(startOnce)
    {
    moleMoveId = setInterval(randomSquare, 880);
    timerId = setInterval(countDown, 1000);
    }

    startOnce=false;
}

function countDown()
{
    if(currentTime>0){
    currentTime--;
    }

    timeLeft.textContent=currentTime;

    if(currentTime==0 && result>=40)
    {
        let win = new Audio("win.mp3");
        win.play();

        clearInterval(timerId);
        clearInterval(moleMoveId);

        setTimeout(()=>{
        alert("Congratulations! You have won.");
        },1000)
    }
    else if(currentTime==0 && result<40)
    {
        let failed = new Audio("failed.mp3");
        failed.play();

        clearInterval(timerId);
        clearInterval(moleMoveId);

        setTimeout( ()=>{

        alert("Game Over! You lost.");
        },1000)
    }
}

