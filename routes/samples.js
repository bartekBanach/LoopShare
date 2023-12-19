const express = require('express');

const { 
    createSample,
    getSamples,
    getSamplesByUser,
    deleteAllSamples,
} = require('../controllers/sampleController');
const requireAuth = require('../middleware/requireAuth');


const router = express.Router();

router.get('/:id', getSamplesByUser);
router.get("/", getSamples);

router.use(requireAuth);

router.post("/", createSample,);
router.delete("/", deleteAllSamples,);



module.exports = router