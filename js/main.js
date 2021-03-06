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
const timeElement = document.querySelector(".time")
let i = 0;
let count = 0;
let delayArrayIndex = 0;

let val;
let ballVal;
var delay = 3000;

layoutBtn.addEventListener("click", function () {
    layoutBtn.classList.toggle("aan")
    layoutBtn.classList.toggle("layout")
    Array.from(messages).forEach(item => {
        item.classList.toggle("uitlijnen")
    })
})
var delayArray = messagesArray.map(item => {
    return item.textContent.split(" ").length * 200
})
var timeToRead = delayArray.reduce((current, result) => {
    return current + result
}) / 1000 / 60;

timeElement.textContent = `Lees tijd: ${Math.floor(timeToRead)} min`
ballsContGast.addEventListener('click', function () {
    var delayArray = messagesArray.map(item => {
        return item.textContent.split(" ").length * 200
    })
    var timeToRead = delayArray.reduce((current, result) => {
        return current + result
    }) / 1000;
    clearInterval(val)
    startInterval(delayArray[delayArrayIndex]);
    if (delayArrayIndex == messagesArray.length - 1) {
        delayArrayIndex = 0
        clearInterval(val)
    } else {
        delayArrayIndex++
    }
    console.log(delayArray[delayArrayIndex])
})

button.addEventListener("click", function () {
    if (count == 0) {
        messagesArray.forEach(item => {
            item.classList.remove("show")
        })
    }
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
        startInterval(delay)
    } else if (button.innerText == "Stop") {
        button.innerText = "Begin"
        clearInterval(val)
        ballsContGast.classList.remove("show-balls")
        ballsContInter.classList.remove("show-balls")
    }
})

function jumping(ballsArray) {
    ballVal = setInterval(() => {
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


let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function startInterval(interval) {
    val = setInterval(() => {
        if (messagesArray[count].classList.contains("interviewer")) {
            messagesArray[count].classList.add("show")
            messagesArray[count].scrollIntoView();
        } else if (messagesArray[count].classList.contains("gast")) {
            messagesArray[count].classList.add("show")
            messagesArray[count].scrollIntoView();
        }
        if (messagesArray[count].nextElementSibling) {
            if (messagesArray[count].nextElementSibling.classList.contains("interviewer")) {
                ballsContGast.classList.remove("show-balls")
                ballsContInter.classList.add("show-balls")
            } else if (messagesArray[count].nextElementSibling.classList.contains("gast")) {
                ballsContInter.classList.remove("show-balls")
                ballsContGast.classList.add("show-balls")
            }
        }
        if (count == messagesArray.length - 1) {
            ballsContGast.classList.remove("show-balls")
            ballsContInter.classList.remove("show-balls")
            clearInterval(val)
            count = 0
            button.innerText = "Begin"
        } else {
            count++
        }
        ballsContGast.click()
    }, interval);
}