const db = require('../config/db')
const timestamp = require('../middlewares/timestamp')
const uuid = require('uuid')

class Blogs {

    static async createNewBlog(user_id, title, body) {

        if (!title) throw Error('Blog must have a title')
        if (!body) throw Error('Blog must have a content')

        const id = uuid.v4()
        const created_at = await timestamp()
        title = title.split("'").join("''")
        body = body.split("'").join("''")

        let sql = `INSERT INTO blogs (id, user_id, title, body, created_at)
                    VALUES('${id}', '${user_id}', '${title}', '${body}', '${created_at}')`

        await db.execute(sql)

    }

    static async getAllBlogs() {
        let sql = `SELECT blog.id, blog.title, blog.body, blog.created_at, account.first_name AS author 
                    FROM blogs blog
                    JOIN accounts account ON blog.user_id = account.id
                    ORDER BY blog.created_at DESC
                    `

        const [blogs] = await db.execute(sql)

        return blogs
    }

    static async getBlog(id) {
        let sql = `SELECT blog.id, blog.title, blog.body, account.first_name AS author,
                    CASE WHEN COUNT(comment.id)= 0
                    THEN JSON_ARRAY()
                    ELSE JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'name', author_comment.first_name,
                            'comment', comment.comment,
                            'date_posted', comment.created_at
                        )
                    ) END AS comments
                    FROM blogs blog
                    JOIN accounts account ON blog.user_id = account.id
                    LEFT JOIN comments comment ON blog.id = comment.blog_id
                    LEFT JOIN accounts author_comment ON comment.user_id = author_comment.id
                    WHERE blog.id = '${id}'
                    ORDER BY comment.created_at ASC
        `

        const [blog] = await db.execute(sql)

        return blog[0]
    }

    static async addComment(blog_id, user_id, body) {

        if (!blog_id || !user_id || !body) throw Error('All fields must be filled')
        const id = uuid.v4()
        const created_at = await timestamp()
        body = body.split("'").join("''")

        let sql = `INSERT INTO comments (id, user_id, blog_id, comment, created_at) 
                    VALUES('${id}', '${user_id}', '${blog_id}', '${body}', '${created_at}')`

        await db.execute(sql)
    }

}

module.exports = Blogs