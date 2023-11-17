const express = require('express');

const {updateUserSchema, schema, Joi} = require('../db/schema');
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
    await schema.validateAsync(req.body);
  } catch (error) {
    console.error("Validation error: ", error.message);
    return res.status(400).json({error: error.message});
  }
  try {
    const { email } = req.body;
    console.log(email);
    const patient = await patients.findOne({
        email
    });
    console.log(patient);
    // Email already registered 
    if (patient) {
      const error = new Error('Email already registered with existing patient');
      res.status(409); // conflict error
      return next(error);
    }

    // Use spread operator to include all properties dynamically
    const newuser = await patients.insert(req.body);

    res.status(201).json(newuser);
  } catch (error) {
    next(error);
  }
});

/* Update a specific patient */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await schema.validateAsync(data);
    const patient = await patients.findOne({
      _id: id,
    });

    // patient does not exist
    if (!patient) {
      return next();
    }

    const updatedPatient = await patients.update({
      _id: id,
    }, { $set: result },
    { upsert: true });

    return res.json(updatedPatient);
  } catch (error) {
    next(error);
  }
});

router.post('/update-patient-fields', async (req, res) => {
  const { customFields, data } = req.body;

  const userDefinedFields = customFields;

  const updatedSchema = updateUserSchema(userDefinedFields);

  const validationResult = updatedSchema.validate(data);
  if (validationResult.error) {
    res.status(400).json({ success: false, error: validationResult.error.details[0].message });
  } 

  return res.json({ success: true, message: 'Schema updated successfully' });
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
    await patients.remove({
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