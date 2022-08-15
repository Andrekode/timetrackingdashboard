// variables
/* <div class="secondary-box ${title.toLowerCase().replace(' ', '-')}">
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
                <p class="stats-box-des-p">${
                    upDtxt[timeframe]
                } - ${previous}hrs</p>
            </div>
        </div>
    </div>
</div> */

const buttons = document.querySelectorAll('.btn')
const container = document.querySelector('.container')

const upDtxt = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month',
}

let timeframe = 'weekly'
let secBox

let edata = {}

buttons.forEach((element) => {
    element.addEventListener('click', buttonActive)
})

function createCard(task, time) {
    const bg = document.createElement('div');
    bg.classList.add('secondary-box', task.replace(' ', '-'))
    const statsBoxDiv = document.createElement('div');
    statsBoxDiv.classList.add('stats-box');
    const colDiv = document.createElement('div');
    colDiv.classList.add('col');
    const title = document.createElement('h2');
    title.classList.add('stats-box-h2');
    title.innerText = task
    const col2Div = document.createElement('div');
    col2Div.classList.add('col-2');
    const statsBoxHoursDiv = document.createElement('div')
    statsBoxHoursDiv.classList.add('stats-box-hours')
    const statsBoxHoursP = document.createElement('p');
    statsBoxHoursP.innerText = time[timeframe].current
    const statsBoxDescriptionDiv = document.createElement('div')
    statsBoxDescriptionDiv.classList.add('stats-box-des')
    const statsBoxDescriptionP = document.createElement('p')
    statsBoxDescriptionP.classList.add('stats-box-des-p')
    statsBoxDescriptionP.innerText = time[timeframe].previous
 
    colDiv.append(title)
    statsBoxDescriptionDiv.append(statsBoxDescriptionP)
    statsBoxHoursDiv.append(statsBoxHoursP)
    col2Div.append(statsBoxHoursDiv, statsBoxDescriptionDiv)
    statsBoxDiv.append(colDiv,col2Div)
    
    return statsBoxDiv

}
fetchAndRender()

async function fetchAndRender() {
    const tasks = await getTasksByTime()
    
    for (const [task, time] of Object.entries(tasks)) {
        console.log(task,time)
        container.append(createCard(task,time))
    }

}

async function getTasksByTime() {
    const tasksByTime = {}

    const tasks = await fetchTasks()

    tasks.forEach(task => {
        tasksByTime[task.title] = task.timeframes
    })

    return tasksByTime
}

async function fetchTasks() {
    const res = await fetch('./js/data.json')
    const tasks = await res.json()
    return tasks
}


function buttonActive(event) {
    buttons.forEach((element) => {
        element.classList.remove('active')
    })
    event.target.classList.add('active')
    timeframe = event.target.innerText.toLowerCase()
    updateBoxes(timeframe)
}

function updateBoxes(timeframe) {
    secBox.forEach((box) => {
        updateBox(box, timeframe)
    })
}

function updateBox(box, timeframe) {
    const title = box.querySelector('.stats-box-h2').innerText
    const current = edata[title][timeframe].current
    const previous = edata[title][timeframe].previous

    const hoursEl = box.querySelector('.stats-box-hours-p')
    hoursEl.innerText = `${current}hrs`
    const msgEl = box.querySelector('.stats-box-des-p')
    msgEl.innerText = `${upDtxt[timeframe]} - ${previous}hrs`
}

function renderData(element, timeframe) {
    let title = element.title
    let current = element.timeframes[timeframe].current
    let previous = element.timeframes[timeframe].previous

    return `
`
}
