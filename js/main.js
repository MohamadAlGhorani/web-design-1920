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

var i = 0;
var count = 0;

var val;
var balVal;

layoutBtn.addEventListener("click", function () {
    Array.from(messages).forEach(item => {
        item.classList.toggle("uitlijnen")
    })
})

button.addEventListener("click", function () {
    if (button.innerText == "Stop") {
        button.innerText = "Begin"
        clearInterval(val)
        ballsContGast.classList.remove("show-balls")
        ballsContInter.classList.remove("show-balls")
    } else {
        button.innerText = "Stop"
        val = setInterval(() => {
            if (messagesArray[count].classList.contains("interviewer")) {
                messagesArray[count].classList.add("show")
                messagesArray[count].scrollIntoView();
                ballsContInter.classList.add("show-balls")
                ballsContGast.classList.remove("show-balls")
            } else if (messagesArray[count].classList.contains("gast")) {
                messagesArray[count].classList.add("show")
                messagesArray[count].scrollIntoView();
                ballsContGast.classList.add("show-balls")
                ballsContInter.classList.remove("show-balls")
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