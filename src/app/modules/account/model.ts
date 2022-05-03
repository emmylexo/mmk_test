import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from "../../utils/db";
import { AccountInterface } from "./interface";

export const TABLE = "account";

type AccountAttributes = Optional<AccountInterface, 'id'>;

const Account: ModelDefined<AccountInterface, AccountAttributes> = db.define('account', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    auth_id: {
        type: DataTypes.STRING
    },

    username: {
        type: DataTypes.STRING
    }
}, { freezeTableName: true, tableName: 'account', timestamps: false })

export default Account;

