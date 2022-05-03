import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import db from "../../utils/db";
import Account from "../account/model";
import { PhoneNumberInterface } from "./interface";

type PhoneNumberAttribute = Optional<PhoneNumberInterface, 'id'>;

const PhoneNumber: ModelDefined<PhoneNumberInterface, PhoneNumberAttribute> = db.define('phone_number', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    number: {
        type: DataTypes.STRING
    }
}, { freezeTableName: true, tableName: 'phone_number', timestamps: false, underscored: true })

PhoneNumber.belongsTo(Account);
// Account.hasMany(PhoneNumber);

export default PhoneNumber; 