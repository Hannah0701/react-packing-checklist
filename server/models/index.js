const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Holiday = sequelize.define("holidays", {
    destination: Sequelize.STRING,
    holidayType: Sequelize.STRING,
    duration: Sequelize.INTEGER,
});

const HolidayMaker = sequelize.define("holidayMakers", {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
});

Holiday.belongsToMany(HolidayMaker, {through: 'holidayHolidayMaker'})
HolidayMaker.belongsToMany(Holiday, {through: 'holidayHolidayMaker'})

module.exports = {
    db: sequelize,
    Holiday,
    HolidayMaker,
};
