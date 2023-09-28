const db = require('../config/db')
const timestamp = require('../middlewares/timestamp')
const uuid = require('uuid')

class User {
    static async getProfile(id) {

        let sql = `SELECT first_name, last_name, email FROM accounts WHERE id = '${id}'`

        const [user] = await db.execute(sql)

        return user[0]

    }

    static async getName(id) {

        let sql = `SELECT first_name FROM accounts WHERE id = '${id}'`

        const [user] = await db.execute(sql)

        return user[0]

    }

    static async getBlogs(id) {
        let sql = `SELECT blog.id, blog.title, blog.body,
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
                    LEFT JOIN comments comment ON blog.id = comment.blog_id
                    LEFT JOIN accounts author_comment ON comment.user_id = author_comment.id
                    WHERE blog.user_id = '${id}'
                    GROUP BY blog.id
                    ORDER BY MAX(comment.created_at) DESC
        `
        const [blogs] = await db.execute(sql)

        return blogs
    }
}

module.exports = User