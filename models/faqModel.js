import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize

const FAQ = db.define("faq", {
    question: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "متن سوال الزامی است."
        }
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: {
            args: false,
            msg: "متن پاسخ الزامی است."
        }
    }
}, {
    freezeTableName: true
})
export default FAQ