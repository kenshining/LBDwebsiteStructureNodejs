var httpClient=require('../lib/HttpClient');
var config=require('../config/config.json');

function MainService(param){
 	this.host=config.webservice.url;//配置文件中读取
 	this.http=httpClient.init({host:this.host,timeout:config.serverInfo.timeout});
}
MainService.prototype.callServer=function(formDatas,successFun,errorFun,path){
	this.http.post(path,formDatas,function(jsonObj){
		successFun(jsonObj);
	},function(errorText){
		errorFun(errorText);
	});
}
exports.init= function (httpObj){
	//console.log(httpObj['host']+"****************************");
	return new MainService(httpObj);
};