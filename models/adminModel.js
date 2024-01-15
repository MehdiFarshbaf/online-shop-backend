import {Sequelize} from "sequelize";
import bcrypt from 'bcrypt'
import db from "../config/database.js";

const {DataTypes} = Sequelize


const Admin = db.define("admin", {
    email: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "ایمیل الزامی است."
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "گذرواژه الزامی است."
        }
    },
    fullname: {
        type: DataTypes.STRING,
        defaultValue: "مدیر سیستم"
    },
    mobile: {
        type: DataTypes.STRING(11),
    },
    image: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
})

Admin.beforeCreate((admin) => {
    return bcrypt.hash(admin.password, 10)
        .then(hash => {
            admin.password = hash;
        })
        .catch(err => {
            throw new Error();
        });
})
export default Admin