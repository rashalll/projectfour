const uri = 'https://hiit-blog-api.onrender.com'     // the server url

const details = document.querySelectorAll('input')

const btn = document.querySelector('.submit')
const msg = document.querySelector('.message')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    msg.innerText = ''

    if (!details[0].value || !details[1].value || !details[2].value || !details[3].value || !details[4].value) {
        msg.innerText = 'All fields must be filled'
    }
    else if (details[3].value !== details[4].value) {
        msg.innerText = "Password and Confirm Password doesn't match"
    }
    else {
        let user = {
            first_name: details[0].value,
            last_name: details[1].value,
            email: details[2].value,
            password: details[3].value
        }

        createAccount(user)
    }

})

async function createAccount(data) {
    try {
        const response = await fetch(`${uri}/accounts/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.error) msg.innerText = result.error

        if (response.status === 200) window.location.href = 'login.html'

        console.log(result);
    } catch (error) {
        msg.innerText = error.error
        console.error(error);
    }
}