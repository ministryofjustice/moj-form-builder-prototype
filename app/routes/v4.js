var express = require('express');
var router = express.Router();

router.get('/:version/1/pages/2/show', (req, res) => {

  var rulesValue = 'No rules';

  if(req.session.data.rules) {
    rulesValue = req.session.data.rules.length + ' rule(s).';
  }

  var pageObject = {
    rulesValue: rulesValue
  };

  res.render(`${req.params.version}/1/pages/2/show.html`, pageObject);

});

router.get('/:version/1/pages/2/conditional-display', (req, res) => {

  var pageObject = {
    rules: req.session.data.rules
  };

  res.render(`${req.params.version}/1/pages/2/conditional-display/index.html`, pageObject);

});

router.post('/:version/1/pages/2/conditional-display/create-rule-step1', (req, res) => {

  if(!req.session.data.rules) {
    req.session.data.rules = [];
  }


  // hack for getting the value
  // req.body['rule-value'];

  var ruleValue = req.body['rule-value'].find(function(element) {
    return element.length > 0;
  });


  var rule = {
    question: req.body['rule-question'],
    operator: req.body['rule-operator'],
    value: ruleValue
  };

  req.session.data.rules.push(rule);

  res.redirect(`/${req.params.version}/1/pages/2/conditional-display/`)

});

module.exports = router;