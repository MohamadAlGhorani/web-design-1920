const balls = document.querySelectorAll(".ball")
const ballsArray = Array.from(balls)
const ballsGast = document.querySelectorAll(".ball-gast")
const ballsArrayGast = Array.from(ballsGast)
const button = document.querySelector(".start")
const layoutBtn = document.querySelector(".layout")
const messages = document.querySelectorAll("li")
const ballsContGast = document.querySelector(".balls-cont-gast")
const ballsContInter = document.querySelector(".balls-cont")
const messagesArray = Array.from(messages)

let i = 0;
let count = 0;

let val;
let balVal;

layoutBtn.addEventListener("click", function () {
    layoutBtn.classList.toggle("aan")
    layoutBtn.classList.toggle("layout")
    Array.from(messages).forEach(item => {
        item.classList.toggle("uitlijnen")
    })
})

button.addEventListener("click", function () {
    if (messagesArray[count].classList.contains("interviewer")) {
        ballsContGast.classList.remove("show-balls")
        ballsContInter.classList.add("show-balls")
    } else if (messagesArray[count].classList.contains("gast")) {
        ballsContInter.classList.remove("show-balls")
        ballsContGast.classList.add("show-balls")
    }
    setTimeout(() => {
        ballsContInter.classList.remove("show-balls")
        ballsContGast.classList.remove("show-balls")
    }, 3000);
    if (button.innerText == "Begin") {
        button.innerText = "Stop"
        val = setInterval(() => {
            if (messagesArray[count].classList.contains("interviewer")) {
                ballsContGast.classList.add("show-balls")
                ballsContInter.classList.remove("show-balls")
                messagesArray[count].classList.add("show")
                messagesArray[count].scrollIntoView();
            } else if (messagesArray[count].classList.contains("gast")) {
                ballsContInter.classList.add("show-balls")
                ballsContGast.classList.remove("show-balls")
                messagesArray[count].classList.add("show")
                messagesArray[count].scrollIntoView();
            }
            if (count == messagesArray.length - 1) {
                messagesArray.forEach(item => {
                    item.classList.remove("show")
                })
                ballsContGast.classList.remove("show-balls")
                ballsContInter.classList.remove("show-balls")
                count = 0
            } else {
                count++
            }
        }, 3000);
    } else if (button.innerText == "Stop") {
        button.innerText = "Begin"
        clearInterval(val)
        ballsContGast.classList.remove("show-balls")
        ballsContInter.classList.remove("show-balls")
    }
})

function jumping(ballsArray) {
    balVal = setInterval(() => {
        if (ballsArray[i]) {
            ballsArray[i].classList.add("jump")
            if (i == ballsArray.length - 1) {
                i = 0
            } else {
                i++
            }
            setTimeout(() => {
                if (ballsArray[i]) {
                    ballsArray[i].classList.remove("jump")
                }
            }, 500);
        }
    }, 500);
}

jumping(ballsArray)
jumping(ballsArrayGast)


window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.querySelector("body").style.setProperty('--vh', `${vh}px`);
});