import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize

const Category = db.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "نام دسته بندی الزامی است."
        },
    },
    parent_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    freezeTableName: true
})

export default Category