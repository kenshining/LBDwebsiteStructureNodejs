// express support
var express = require('express');
var mainService = require('../services/MainService');
var serviceEnumeration = require('../services/ServiceEnumeration');


module.exports = function(app,logInfo){
	//init service instace
	var mainServiceInstance = mainService.init();
	//init serverside enumerations service instance
	var serviceEnumerationInstance = serviceEnumeration.init();
	//main filter
	app.get("/",function(req,res,next){
		console.log("serviceEnumerationInstance:"+serviceEnumerationInstance.USER_INFOMATION);
  		res.render('index', { title: 'Express' });
	});
	app.get("/index",function(req,res,next){

  		res.render('index', { title: 'Express' });
	});
};
