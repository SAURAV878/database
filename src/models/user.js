import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            len: [3,20]
        }
    },
    email: {
        type:DataTypes.STRING,
        allowNull:true,
        unique: true
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type:DataTypes.STRING,
        allowNull: false
    }
});

export default User;
