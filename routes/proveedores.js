var express = require('express');
var router = express.Router();
/* inicio */
router.get('/', function (req,res,next) {
    res.send("proveedores");
})
module.exports = router;