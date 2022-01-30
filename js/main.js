// add listeneres to to menu buttons
// set buttons to active if clicked
let timeframe = 'weekly'
let buttons = document.querySelectorAll('.btn')

const container = document.querySelector('.container')

let normalCards

buttons.forEach((element) => {
    element.addEventListener('click', buttonActive)
})

// json data

fetch('./js/data.json')
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((element) => {
            container.insertAdjacentHTML(
                'beforeend',
                renderData(element, timeframe)
            )
        })
    })

function buttonActive(event) {
    buttons.forEach((element) => {
        element.classList.remove('active')
    })
    event.target.classList.add('active')
    timeframe = event.target.innerText.toLowerCase
}

function renderData(element, timeframe) {
    let title = element.title
    let current = element.timeframes[timeframe].current
    let previous = element.timeframes[timeframe].previous

    return `
<div class="secondary-box ${title.toLowerCase().replace(' ', '-')}">
    <div class="stats-box">
        <div class="col">
            <div class="col-h2">
                <h2 class="stats-box-h2">${title}</h2>
            </div>
            <div class="col-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
        <div class="col-2">
            <div class="stats-box-hours">
                <p class="stats-box-hours-p">${current}hrs</p>
            </div>
            <div class="stats-box-des">
                <p class="stats-box-des-p">Last Week - ${previous}hrs</p>
            </div>
        </div>
    </div>
</div>
`
}
