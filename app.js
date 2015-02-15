var config = require('./config.json');
var express = require('express');
var exec = require('child_process').exec;
var app = express();

app.get('/:hook/:token', function(req, res) {
  var hook = config[req.params.hook];

  if (!hook || hook.token !== req.params.token) {
    res.sendStatus(404);
    return;
  }

  exec(hook.scriptFile, function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (error !== null) {
      console.log('exec error: ' + error);
    }

    res.sendStatus(200);
  });
});

app.listen(process.env.PORT || 3000);
