let buttons = document.querySelectorAll('.btn')

buttons.forEach((element) => {
    element.addEventListener('click', () => {
        event.target.classList.add('active')
    })
    element.classList.remove('active')
})
