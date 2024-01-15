import {Sequelize} from "sequelize";

import db from './../config/database.js'

const {DataTypes} = Sequelize

const Permission = db.define("permission", {
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true
})

export default Permission