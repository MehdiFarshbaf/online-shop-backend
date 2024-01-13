import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize

const Brand = db.define("brand", {
    color: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "انتخاب رنگ برای برند الزامی است"
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "نام برند الزامی است."
        },
    },
    image: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "تصویر برند الزامی است."
        },
    },
}, {
    freezeTableName: true
})
export default Brand