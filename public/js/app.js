const a = document.querySelector('form')  // 'querySelector('...tag_name...')' is a method we use to select a tag (similar to CSS)
const b = document.querySelector('input')
const c = document.querySelector('#one')
const d = document.querySelector('#two') 

a.addEventListener('submit', (e) => {
    e.preventDefault()                     // Prevents the output from immediately disappearing from web-console/browserterminal
    
    c.textContent = 'Loading....'
    d.textContent = ''                      // To empty the second paragraph for later reuse!
    fetch('/weather?address=' + b.value).then((response) => {    // 'fetch().then()' is an asynchronous function
        response.json().then((data) => {
            if(data.error)
                c.textContent = data.error
            else {
                c.textContent = data.location
                d.textContent = data.summary
            }
        })
    })
})