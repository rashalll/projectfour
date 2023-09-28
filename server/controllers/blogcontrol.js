const Blogs = require('../model/blogModel')

exports.addBlog = async (req, res) => {
    const { title, body } = req.body

    try {
        const user_id = req.user_id
        const blog = await Blogs.createNewBlog(user_id, title, body)
        res.status(200).json({ message: "Blog Created" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllBlogs = async (req, res) => {

    try {
        const blogs = await Blogs.getAllBlogs()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getBlog = async (req, res) => {

    const { blog_id } = req.params

    try {
        const blog = await Blogs.getBlog(blog_id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.postComment = async (req, res) => {

    const { blog_id } = req.params
    const { body } = req.body

    try {
        const user_id = req.user_id
        const comment = await Blogs.addComment(blog_id, user_id, body)
        res.status(200).json({ message: 'Comment posted' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}