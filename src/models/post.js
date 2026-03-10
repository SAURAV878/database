import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Post = sequelize.define('Post', {
    title: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20]
        }
    },
    content: {
        type:DataTypes.TEXT,
    },
    status: {
        type:DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft',
    }
})

export default Post;