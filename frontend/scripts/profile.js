// import { allBlogs } from "../data/allBlogs.js"
const uri = 'https://hiit-blog-api.onrender.com'     // the server url

const token = window.localStorage.getItem('token')

async function getProfile() {
    const response = await fetch(`${uri}/user/`, {
        headers: {
            // the authorization token is sent to the server to authenticate the user. See requireAuth.js in the server folder on how to get the token
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data
}

async function getBlogs() {
    const response = await fetch(`${uri}/user/blogs`, {
        headers: {
            // the authorization token is sent to the server to authenticate the user. See requireAuth.js in the server folder on how to get the token
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data
}


const user = await getProfile()
const blogs = await getBlogs()
console.log(blogs)


const main = document.querySelector('main')

const profile = document.createElement('div')
profile.className = 'profile'
main.appendChild(profile)

const welcomeMsg = document.createElement('h2')
welcomeMsg.className = 'welcome'
welcomeMsg.innerText = `Hi, ${user.first_name}`
profile.appendChild(welcomeMsg)

const userEmail = document.createElement('p')
userEmail.className = 'userEmail'
userEmail.innerText = user.email
profile.appendChild(userEmail)

const editProfileBtn = document.createElement('button')
editProfileBtn.className = 'edit-profile'
editProfileBtn.innerText = 'Edit Profile'
profile.appendChild(editProfileBtn)


editProfileBtn.addEventListener('click', () => {
    editProfilePopup()
})


const userBlogs = document.createElement('div')
userBlogs.className = 'userBlogs'
main.appendChild(userBlogs)

const blogHeader = document.createElement('h3')
blogHeader.className = 'blogHeader'
blogHeader.innerText = 'Blogs'
userBlogs.appendChild(blogHeader)

blogs.forEach((blog, index) => {

    const blog_container = document.createElement('div')
    blog_container.key = index
    blog_container.setAttribute('class', 'blog-container')

    const blog_title = document.createElement('h4')
    blog_title.setAttribute('class', 'blog-title')
    blog_title.innerText = blog.title

    const blog_body = document.createElement('p')
    blog_body.setAttribute('class', 'blog-body')
    blog_body.innerText = blog.body

    const btn_container = document.createElement('div')
    btn_container.setAttribute('class', 'btn-container')
    const view_btn = document.createElement('button')
    view_btn.innerText = 'Edit'

    view_btn.addEventListener('click', () => {
        blogPopup(blog.id)
    })
    btn_container.appendChild(view_btn)

    blog_container.appendChild(blog_title)
    blog_container.appendChild(blog_body)
    blog_container.appendChild(btn_container)
    userBlogs.appendChild(blog_container)
})

const editProfilePopup = () => {
    // pop-up to edit profile
    const cover = document.createElement('div')
    cover.className = 'cover'
    main.appendChild(cover)

    const profileForm = document.createElement('form')
    profileForm.className = 'profileForm'
    cover.appendChild(profileForm)

    const firstNameLabel = document.createElement('label')
    firstNameLabel.className = 'firstNameLabel'
    firstNameLabel.innerText = 'First Name'
    profileForm.appendChild(firstNameLabel)

    const firstNameInput = document.createElement('input')
    firstNameInput.type = 'text'
    firstNameInput.className = 'firstNameInput'
    firstNameInput.setAttribute('value', user.first_name)
    profileForm.appendChild(firstNameInput)

    const lastNameLabel = document.createElement('label')
    lastNameLabel.className = 'lastNameLabel'
    lastNameLabel.innerText = 'Last Name'
    profileForm.appendChild(lastNameLabel)

    const lastNameInput = document.createElement('input')
    lastNameInput.type = 'text'
    lastNameInput.className = 'lastNameInput'
    lastNameInput.setAttribute('value', user.last_name)
    profileForm.appendChild(lastNameInput)


    const emailLabel = document.createElement('label')
    emailLabel.className = 'emailLabel'
    emailLabel.innerText = 'Email'
    profileForm.appendChild(emailLabel)

    const emailInput = document.createElement('input')
    emailInput.type = 'email'
    emailInput.className = 'emailInput'
    emailInput.setAttribute('value', user.email)
    profileForm.appendChild(emailInput)

    const passwordLabel = document.createElement('label')
    passwordLabel.className = 'passwordLabel'
    passwordLabel.innerText = 'Password'
    profileForm.appendChild(passwordLabel)

    const passwordInput = document.createElement('input')
    passwordInput.type = 'password'
    passwordInput.className = 'passwordInput'
    profileForm.appendChild(passwordInput)

    const cpasswordLabel = document.createElement('label')
    cpasswordLabel.className = 'cpasswordLabel'
    cpasswordLabel.innerText = 'Confirm Password'
    profileForm.appendChild(cpasswordLabel)

    const cpasswordInput = document.createElement('input')
    cpasswordInput.type = 'password'
    cpasswordInput.className = 'cpasswordInput'
    profileForm.appendChild(cpasswordInput)

    const btnContainer = document.createElement('div')
    btnContainer.className = 'btnContainer'
    profileForm.appendChild(btnContainer)

    const discardBtn = document.createElement('button')
    discardBtn.className = 'discardBtn'
    discardBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" fill='#ffffff'/>
            </svg>
            `
    discardBtn.addEventListener('click', (e) => {
        e.preventDefault()
        cover.classList.add('hide')
    })
    btnContainer.appendChild(discardBtn)

    const confirmBtn = document.createElement('button')
    confirmBtn.className = 'confirmBtn'
    confirmBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
            <path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" fill='#ffffff'/>
            </svg>`
    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault()
        cover.classList.add('hide')
    })
    btnContainer.appendChild(confirmBtn)
}

const blogPopup = (id) => {
    // blog

    let [currentBlog] = blogs.filter(blog => blog.id === id)
    console.log(currentBlog)

    const blogCover = document.createElement('div')
    blogCover.className = 'cover'
    main.appendChild(blogCover)

    const blogContainer = document.createElement('div')
    blogContainer.className = 'blogContainer'
    blogCover.appendChild(blogContainer)


    const blogBtnContainer = document.createElement('div')
    blogBtnContainer.className = 'blogBtnContainer'
    blogContainer.appendChild(blogBtnContainer)

    const blogDiscardBtn = document.createElement('button')
    blogDiscardBtn.className = 'blogDiscardBtn'
    blogDiscardBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
        <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" fill='#ffffff'/>
        </svg>
        `
    blogDiscardBtn.addEventListener('click', () => {
        blogCover.classList.add('hide')
    })
    blogBtnContainer.appendChild(blogDiscardBtn)

    const blogDeleteBtn = document.createElement('button')
    blogDeleteBtn.className = 'blogDeleteBtn'
    blogDeleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
            <path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z" fill='#ffffff'/>
            </svg>
                `
    blogDeleteBtn.addEventListener('click', () => {
        blogCover.classList.add('hide')
    })
    blogBtnContainer.appendChild(blogDeleteBtn)

    const blogConfirmBtn = document.createElement('button')
    blogConfirmBtn.className = 'blogConfirmBtn'
    blogConfirmBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30">
            <path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" fill='#ffffff'/>
            </svg>`
    blogConfirmBtn.addEventListener('click', () => {
        blogCover.classList.add('hide')
    })
    blogBtnContainer.appendChild(blogConfirmBtn)

    const currentBlogContainer = document.createElement('div')
    currentBlogContainer.className = 'currentBlogContainer'
    blogContainer.appendChild(currentBlogContainer)

    const blogContent = document.createElement('div')
    blogContent.className = 'blogContent'
    currentBlogContainer.appendChild(blogContent)

    const blogTitle = document.createElement('p')
    blogTitle.className = 'blogTitle'
    blogTitle.innerText = 'Title: ' + currentBlog.title
    blogContent.appendChild(blogTitle)

    const blogContentContainer = document.createElement('div')
    blogContentContainer.className = 'blogContentContainer'
    blogContentContainer.innerHTML = `<p> ${currentBlog.body} </p>`
    blogContent.appendChild(blogContentContainer)

    const blogComments = document.createElement('div')
    blogComments.className = 'blogComments'
    currentBlogContainer.appendChild(blogComments)

    if (currentBlog.comments.length === 0) blogComments.className = 'blogComments hide'

    currentBlog.comments.forEach(comment => {
        const eachComments = document.createElement('div')
        eachComments.className = 'eachComments'

        const name = document.createElement('h3')
        name.className = 'name'
        name.innerText = comment.name
        eachComments.appendChild(name)

        const body = document.createElement('p')
        body.className = 'body'
        body.innerText = comment.comment
        eachComments.appendChild(body)

        blogComments.appendChild(eachComments)
    })
}

const addBlog = document.createElement('a')
addBlog.className = 'addBlog'
addBlog.href = 'addBlog.html'
addBlog.innerText = 'Add Blog'
main.appendChild(addBlog)