const {holidays, holidayMakers} = require('./seedData.js');

const {sequelize} = require('./db');
// const {Sauce} = require('./models');
const {Holiday, HolidayMakers} = require('./models');

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await sequelize.sync({ force: true });
    
        // insert data
        await Promise.all(holidays.map(holiday => Holiday.create(holiday)));
        
        await Promise.all(holidayMakers.map(holidayMaker => HolidayMakers.create(holidayMaker)));

        console.log("db populated!");
    } catch (error) {
        console.error(error);
    }
}

seed();