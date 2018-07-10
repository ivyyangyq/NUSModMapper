'use strict';

var http = require('http'),
    path = require('path'),
    config = require('./config'),
    fs = require('fs');


var express = require('express');
var app = express();

var modules = require("./mods.json");
var schools = require("./sch.json");
var mod_list = require("./mod_list.json");
var sch_list = require("./sch_list.json");
var test = require("./test.json");

var mod_name_list = Object.keys(mod_list);

function search_module(mod) {
  var module_name_list = matchSubstring(mod, mod_name_list);
  if (module_name_list === undefined || module_name_list.length == 0) {
    // array empty or does not exist
    return "Not Found";
  }
  var result_list =[];
  module_name_list.forEach(function(mod_name){
    var mod_sub = mod_list[mod_name]['Subject'];
    var mod_code = mod_list[mod_name]['Module code'];
    var mod_info = modules[mod_sub][mod_code];
    mod_info['Module code'] = mod_code;
    result_list.push(mod_info);
  });
  return result_list;
}

function includes(input, dataList) {
  return dataList.filter(function(text){
    if (text.includes(input)) {
      return text;
    }
  })
}

function matchSubstring(input, dataList) {
  var reg = new RegExp(input, 'i');
  return dataList.filter(function(text) {
    if (reg.test(text)) {
      return text;
    }
  });
}

function search_school(sch) {
  var sch_name_list = matchSubstring(sch, sch_list);
  if (sch_name_list === undefined || sch_name_list.length == 0) {
    // array empty or does not exist
    return "Not Found";
  }
  var result =[];
  sch_name_list.forEach(function(sch){
    var sch_info = schools[sch];
    sch_info['Name'] = sch;
    result.push(sch_info);
  });
  return result;
}

function search_sub(sub) {
  var subject_mod = modules[sub];
  var result = [];
  for (var key in subject_mod){
    if (subject_mod.hasOwnProperty(key)) {
      subject_mod[key]['Module code'] = key;
      result.push(subject_mod[key]);
    }
  }
  return result;
}

app.configure(function() {
    app.set('port', config.port);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler());
});

app.get('/hello', function(req, res){
    res.send('Hello World!');
    res.end();
});

app.post('/send_mod_list', function(req, res){
  res.send({mod: mod_list});
})

app.post('/send_sch_list', function(req, res){
  res.send({sch: sch_list});
})

app.post('/get_subject', function(req, res){
  var result = search_sub(req.body.sub);
  res.send({sub: result});
})

app.post('/search_mod', function(req, res){
  var result = search_module(req.body.mod);
            res.send({mod: result});

});

app.post('/search_sch', function(req, res){
  var result = search_school(req.body.sch);
            res.send({sch: result});

});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
