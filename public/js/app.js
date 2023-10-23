const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //this will prevent the default refresh of the browser

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response) => {
    response.json().then((body) => {
        if(body.error){
            messageOne.textContent = body.error;
        } else{
            messageOne.textContent = body.location;
            messageTwo.textContent = body.forecast;
        }
    })
})
})