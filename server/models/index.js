const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Holiday = sequelize.define("holidays", {
    destination: Sequelize.STRING,
    type: Sequelize.STRING,
    duration: Sequelize.INTEGER,
});

const HolidayMaker = sequelize.define("holidayMakers", {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
});

HolidayMaker.belongsTo(Holiday, { as: 'holidayMaker' })
Holiday.hasMany(HolidayMakers, { foreignKey: 'holidayId' })

module.exports = {
    db: sequelize,
    Holiday,
    HolidayMaker,
};
