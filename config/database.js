import {Sequelize} from "sequelize";

const db = new Sequelize("online_shop", "admin_online_shop", "[OY!j]yRhEy[v8Vb", {
    host: "localhost",
    dialect: "mysql"
})
export default db