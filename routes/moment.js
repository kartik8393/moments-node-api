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

router.get('/get', function(req, res, next) {
  momentController.getOne(req,res)
});

router.put('/', function(req, res, next) {
  momentController.update(req,res)
});

router.delete('/', function(req, res, next) {
  momentController.delete(req,res)
});

router.delete('/image', function(req, res, next) {
  momentController.deleteImage(req,res)
});

module.exports = router;
