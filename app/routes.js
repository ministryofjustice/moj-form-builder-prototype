const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.use('/:version/', function (req, res, next) {
  const version = `/${req.params.version}`;
  res.locals.getUrl = function(url) {
    return version+url;
  };
  next();
});

router.use('/', require('./routes/v3'));
router.use('/', require('./routes/v4'));

module.exports = router
