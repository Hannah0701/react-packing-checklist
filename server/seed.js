const {holidays, holidayMakers} = require('./seedData.js');

const {sequelize} = require('./db');
const {Holiday, HolidayMaker} = require('./models');

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await sequelize.sync({ force: true });
    
        // insert data
        const createdHoliday = await Promise.all(holidays.map(holiday => Holiday.create(holiday)));
        const createdHolidayMaker = await Promise.all(holidayMakers.map(holidayMaker => HolidayMaker.create(holidayMaker)));

        // associate data
        createdHoliday[0].addHolidayMaker(createdHolidayMaker[0]);
        createdHoliday[1].addHolidayMaker(createdHolidayMaker[1]);
        createdHoliday[2].addHolidayMaker(createdHolidayMaker[2]);
        createdHoliday[2].addHolidayMaker(createdHolidayMaker[0]);

        console.log("db populated!");
    } catch (error) {
        console.error(error);
    }
}

seed();