var express = require('express');
var router = express.Router();
const momentController=require('../controller/momentController')


/* GET users listing. */
router.post('/', function(req, res, next) {
    momentController.newMoment(req,res)
});

router.get('/', function(req, res, next) {
  momentController.getAll(req,res)
});

module.exports = router;
