const express = require("express");
const router = express.Router();
const { Holiday } = require("../models");
const { check, validationResult } = require("express-validator");

// GET /holidays
router.get("/", async (req, res, next) => {
  try {
    const holidays = await Holiday.findAll();
    res.send(holidays);
  } catch (error) {
    next(error);
  }
});

// GET /api/holidays/:id
router.get("/:id", async (req, res, next) => {
  try {
    const holidayId = req.params.id; 
    const holiday = await Holiday.findByPk(holidayId);
    if (holiday) {
      res.send(holiday);
    } else {
      res.status(404).send({ error: "Item not found"});
    }
  }
   catch (error) {
    next(error);
  }
}); 

router.use(express.json());
router.use(express.urlencoded({extended: true}))

//ADD holiday
router.post("/", [
  check("destination").notEmpty({ ignore_whitespace: true }),
  check("type").notEmpty({ ignore_whitespace: true }),
  check("duration").notEmpty({ ignore_whitespace: true })
],
async (req,res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const newHoliday = await Holiday.create(req.body);
      res.status(201).send(newHoliday);
    }
  } catch (error) {
    next(error);
  }
})

//UPDATE Holiday
router.put("/:id", [
    check("destination").notEmpty({ ignore_whitespace: true }),
    check("type").notEmpty({ ignore_whitespace: true }),
    check("duration").notEmpty({ ignore_whitespace: true })
],
async (req,res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const updateHoliday = await Holiday.findByPk(req.params.id);
       await updateHoliday.update(req.body);
      res.status(214).json(updateHoliday);
    }
  } catch(error) {
      next(error);
  }
})

//DELETE Holiday
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteHoliday = await Holiday.findByPk(req.params.id)
    await deleteHoliday.destroy();
    res.status(200).json(deleteHoliday);
  }
  catch (error) {
    next (error);
  }
})

module.exports = router;
