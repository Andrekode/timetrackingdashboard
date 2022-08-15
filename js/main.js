const buttons = document.querySelectorAll('.btn')
const container = document.querySelector('.container')

const upDtxt = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month',
}

let timeframe = 'weekly'

buttons.forEach((element) => {
    element.addEventListener('click', buttonActive)
})

fetchAndRender()

function createCard(task, time) {
    const bg = document.createElement('div')
    bg.classList.add('secondary-box')
    bg.classList.add(task.replace(' ', '-').toLowerCase())
    const statsBoxDiv = document.createElement('div')
    statsBoxDiv.classList.add('stats-box')
    const colDiv = document.createElement('div')
    colDiv.classList.add('col')
    const title = document.createElement('h2')
    title.classList.add('stats-box-h2')
    title.innerText = task
    const col2Div = document.createElement('div')
    col2Div.classList.add('col-2')
    const statsBoxHoursDiv = document.createElement('div')
    statsBoxHoursDiv.classList.add('stats-box-hours')
    const statsBoxHoursP = document.createElement('p')
    statsBoxHoursP.innerText = time[timeframe].current
    const statsBoxDescriptionDiv = document.createElement('div')
    statsBoxDescriptionDiv.classList.add('stats-box-des')
    const statsBoxDescriptionP = document.createElement('p')
    statsBoxDescriptionP.classList.add('stats-box-des-p')
    statsBoxDescriptionP.innerText = ` ${upDtxt[timeframe]} - ${time[timeframe].previous}`

    colDiv.append(title)
    statsBoxDescriptionDiv.append(statsBoxDescriptionP)
    statsBoxHoursDiv.append(statsBoxHoursP)
    col2Div.append(statsBoxHoursDiv)
    col2Div.append(statsBoxDescriptionDiv)
    statsBoxDiv.append(colDiv)
    statsBoxDiv.append(col2Div)
    bg.append(statsBoxDiv)
    return bg
}

async function fetchAndRender() {
    const tasks = await getTasksByTime()

    for (const [task, time] of Object.entries(tasks)) {
        container.append(createCard(task, time))
    }
}

async function getTasksByTime() {
    const tasksByTime = {}
    const tasks = await fetchTasks()
    tasks.forEach((task) => {
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
    document
        .querySelectorAll('.secondary-box')
        .forEach((element) => element.remove())

    fetchAndRender()
}
