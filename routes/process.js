var express = require('express');
var router = express.Router();

// Require controller modules.
// var book_controller = require('../controllers/bookController');
var processController = require('../controllers/processController');

// GET request for list of all Book items.
// router.get('/books', book_controller.book_list);

/// BOOK ROUTES ///

/* GET query string information */
router.get('/', processController.index);

/* Search by qs */
router.get('/search', processController.search);


module.exports = router;