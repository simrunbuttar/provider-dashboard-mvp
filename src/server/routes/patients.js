const express = require('express');
const schema = require('../db/schema');
const db = require('../db/connection');

const patients = db.get('patients');

const router = express.Router();

/* Get all patients */
router.get('/', async (req, res, next) => {
  try {
    const allPatients = await patients.find({});
    res.json(allPatients);
  } catch (error) {
    next(error);
  }
});

/* Get a specific patient */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await patients.findOne({
      _id: id,
    });

    if (!patient) {
      const error = new Error('Patient does not exist');
      return next(error);
    }

    res.json(patient);
  } catch (error) {
    next(error);
  }
});

/* Create a new patient */
router.post('/', async (req, res, next) => {
  try {
    const { firstname, lastname } = req.body;
    const result = await schema.validateAsync({ firstname, lastname });

    const patient = await patients.findOne({
        firstname, lastname
    });

    // Patient already exists
    if (patient) {
      const error = new Error('Patient already exists');
      res.status(409); // conflict error
      return next(error);
    }

    const newuser = await patients.insert({
        firstname,
        lastname,
    });

    res.status(201).json(newuser);
  } catch (error) {
    next(error);
  }
});

/* Update a specific patient */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstname, lastname } = req.body;
    const result = await schema.validateAsync({ firstname, lastname });
    const patient = await patients.findOne({
      _id: id,
    });

    // patient does not exist
    if (!patient) {
      return next();
    }

    const updatedPatient = await patient.update({
      _id: id,
    }, { $set: result },
    { upsert: true });

    res.json(updatedPatient);
  } catch (error) {
    next(error);
  }
});

/* Delete a specific patient */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await patients.findOne({
      _id: id,
    });

    // patient does not exist
    if (!patient) {
      return next();
    }
    await patient.remove({
      _id: id,
    });

    res.json({
      message: 'Patient has been deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;