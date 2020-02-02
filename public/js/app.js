const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
let errorMessage = document.querySelector('#errorMessage')
let weatherMessage = document.querySelector('#weatherMessage')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    errorMessage.textContent = 'Loading...'
    weatherMessage.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {    
        response.json().then((data) => {
        if (data.error) {
           errorMessage.textContent = data.error

        } else {
            errorMessage.textContent = `Location: ${data.location}`
            weatherMessage.textContent = `Forecast: ${data.forecast}`
        }
    
        
    })
})
})