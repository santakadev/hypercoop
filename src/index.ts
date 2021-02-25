document.getElementById('add-product').addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(<HTMLFormElement> e.target)

    const name = formData.get('name')
    const price = formData.get('price')

    const product = {
        name,
        price
    }

    fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then(response => {
        console.log(response)
    });
})