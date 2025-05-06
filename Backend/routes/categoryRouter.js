const express = require('express');
const { createCategory, getCategory, getSingleCategory } = require('../controllers/categoryController');
const router = express.Router();


router.post('/create-category', createCategory)
router.get('/get-category', getCategory)
router.get('/get-category/:slug', getSingleCategory)


module.exports = router