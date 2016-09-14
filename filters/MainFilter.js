// express support
var express = require('express');
var session = require('express-session');
var config = require("../config/config.json");
var urlTool = require('url');

module.exports = function(app,logInfo){
	//session filter
	app.use(function (req, res, next) {
		var url = urlTool.parse(req.originalUrl);
		console.log("accept url:"+url.pathname);
  		//过滤需要登录才能执行的操作
		var needs = config.roleURL;
		  for(var i = 0 ; i < needs.length ; i++){
		    if(url.pathname == needs[i]){
		      if(!req.session || !req.session.user){
		        return res.redirect("/user/login");
		      }
		    }
		}
  		next();
	});

};