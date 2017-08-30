'use strict';

var http = require('http');
var express = require('express');
var aws = require('aws-sdk');
var path = require('path');
var mustache = require('mustache');
var fs = require('fs');
var parser = require('body-parser');

var app = express();

app.use(parser.urlencoded({
  'extended': false,
  'limit': 1024
}))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname + '/about.html'));
});

app.get('/space', function(req, res) {
  res.sendFile(path.join(__dirname + '/space.html'));
});

app.get('/graphics', function(req, res) {
  res.sendFile(path.join(__dirname + '/graphics.html'));
});

app.get('/craft', function(req, res) {
  res.sendFile(path.join(__dirname + '/craft.html'));
});

app.get('/connect', function(req, res) {
  res.sendFile(path.join(__dirname + '/connect.html'));
});

app.post('/sent', function(req, res) {
  if (req.body.name !== undefined) {
    if (req.body.email !== undefined) {
      if (req.body.message !== undefined) {

        aws.config.loadFromPath('aws-config.json');

        var ses = new aws.SES();
        ses.sendEmail({
            'Source': 'amyrenecrippswebsite@gmail.com',
            'Destination': {
              'ToAddresses': ['amyrenecripps@gmail.com']
            },
            'ReplyToAddresses': [req.body.email],
            'Message': {
              'Subject': {
                'Data': req.body.subject
              },
              'Body': {
                'Text': {
                  'Data': req.body.message
                }
              }
            }
          },
          function(objectError, objectResult) {
            console.log(objectError, objectResult);
          });
      }
    }
  }

  res.status(200);
  res.set({
    'Content-Type': 'text/html'
  });

  res.write('thank you for your message');
  res.end();
});

app.use('/', express.static(__dirname + '/'));
app.listen(8080);
