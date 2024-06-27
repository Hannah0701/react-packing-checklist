const express = require("express");
const router = express.Router();
const { HolidayMaker } = require("../models");
const { check, validationResult } = require("express-validator");

// GET /holidayMakers
router.get("/", async (req, res, next) => {
  try {
    const holidayMakers = await HolidayMaker.findAll();
    res.send(holidayMakers);
  } catch (error) {
    next(error);
  }
});

// GET /api/holidayMakers/:id
router.get("/:id", async (req, res, next) => {
  try {
    const holidayMakerId = req.params.id; 
    const holidayMaker = await HolidayMaker.findByPk(holidayMakerId);
    if (holidayMaker) {
      res.send(holidayMaker);
    } else {
      res.status(404).send({ error: "Holiday Maker not found"});
    }
  }
   catch (error) {
    next(error);
  }
}); 

router.use(express.json());
router.use(express.urlencoded({extended: true}))

//ADD holidayMaker
router.post("/", [
  check("name").notEmpty({ ignore_whitespace: true }),
  check("age").notEmpty({ ignore_whitespace: true })
],
async (req,res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const newHolidayMaker = await HolidayMaker.create(req.body);
      res.status(201).send(newHolidayMaker);
    }
  } catch (error) {
    next(error);
  }
})

//UPDATE HolidayMaker
router.put("/:id", [
    check("name").notEmpty({ ignore_whitespace: true }),
    check("age").notEmpty({ ignore_whitespace: true })
],
async (req,res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const updateHolidayMaker = await HolidayMaker.findByPk(req.params.id);
       await updateHolidayMaker.update(req.body);
      res.status(214).json(updateHolidayMaker);
    }
  } catch(error) {
      next(error);
  }
})

//DELETE HolidayMaker
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteHolidayMaker = await HolidayMaker.findByPk(req.params.id)
    await deleteHolidayMaker.destroy();
    res.status(200).json(deleteHolidayMaker);
  }
  catch (error) {
    next (error);
  }
})

module.exports = router;
