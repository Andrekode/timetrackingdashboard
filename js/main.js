// variables
const buttons = document.querySelectorAll('.btn');
const container = document.querySelector('.container');
const upDtxt = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month',
};

let timeframe = 'weekly';
let secBox;

let edata = {};

// eventlistener

buttons.forEach((element) => {
    element.addEventListener('click', buttonActive);
});

// json data

fetch('./js/data.json')
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((element) => {
            container.insertAdjacentHTML(
                'beforeend',
                renderData(element, timeframe)
            );
        });
        data.forEach((element) => {
            edata[element.title] = element.timeframes;
        });
        secBox = document.querySelectorAll('.secondary-box');
    });

// functions

function buttonActive(event) {
    buttons.forEach((element) => {
        element.classList.remove('active');
    });
    event.target.classList.add('active');
    timeframe = event.target.innerText.toLowerCase();
    updateBoxes(timeframe);
}

function updateBoxes(timeframe) {
    secBox.forEach((box) => {
        updateBox(box, timeframe);
    });
}

function updateBox(box, timeframe) {
    const title = box.querySelector('.stats-box-h2').innerText;
    const current = edata[title][timeframe].current;
    const previous = edata[title][timeframe].previous;

    const hoursEl = box.querySelector('.stats-box-hours-p');
    hoursEl.innerText = `${current}hrs`;
    const msgEl = box.querySelector('.stats-box-des-p');
    msgEl.innerText = `${upDtxt[timeframe]} - ${previous}hrs`;
}

function renderData(element, timeframe) {
    let title = element.title;
    let current = element.timeframes[timeframe].current;
    let previous = element.timeframes[timeframe].previous;

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
                <p class="stats-box-des-p">${
                    upDtxt[timeframe]
                } - ${previous}hrs</p>
            </div>
        </div>
    </div>
</div>
`;
}
