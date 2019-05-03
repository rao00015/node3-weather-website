console.log('file loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


messageOne.textContent = 'From Javascript'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageTwo.textContent = ''
            return messageOne.textContent = data.error
        } 

        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    })
})
})