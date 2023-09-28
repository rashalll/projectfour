// import { allBlogs } from "../data/allBlogs.js";

const uri = 'https://hiit-blog-api.onrender.com'     // the server url
// const uri = 'http://127.0.0.1:5000'     // the server url

const token = window.localStorage.getItem('token')

async function getAllBlogs() {
    const response = await fetch(`${uri}/blogs/`);
    const data = await response.json();
    return data
}

const allBlogs = await getAllBlogs()

const main = document.querySelector('main')

allBlogs.forEach((blog, index) => {

    const blog_container = document.createElement('div')
    blog_container.key = index
    blog_container.setAttribute('class', 'blog-container')

    const blog_title = document.createElement('h3')
    blog_title.setAttribute('class', 'blog-title')
    blog_title.innerText = blog.title

    const blog_author = document.createElement('p')
    blog_author.setAttribute('class', 'blog-authur')
    blog_author.innerText = `by: ${blog.author}`

    const blog_body = document.createElement('p')
    blog_body.setAttribute('class', 'blog-body')
    blog_body.innerText = blog.body

    const btn_container = document.createElement('div')
    btn_container.setAttribute('class', 'btn-container')
    const view_btn = document.createElement('button')
    view_btn.innerText = 'View'

    view_btn.addEventListener('click', () => {
        let params = new URLSearchParams();
        params.set('blogId', blog.id);
        window.location.href = `blog.html?${params.toString()}`
    })
    btn_container.appendChild(view_btn)


    blog_container.appendChild(blog_title)
    blog_container.appendChild(blog_author)
    blog_container.appendChild(blog_body)
    blog_container.appendChild(btn_container)
    main.appendChild(blog_container)
})


if (token) {    // ensures only authenticated users can add a new blog
    const addBlog = document.createElement('a')
    addBlog.className = 'addBlog'
    addBlog.href = 'addBlog.html'
    addBlog.innerText = 'Add Blog'
    main.appendChild(addBlog)
}