//**接口枚举*/
function ServiceEnumeration(){
	//用户查询接口
 	this.USER_INFOMATION = "userAccount/userinfo.do";
};
exports.init= function (){
	return new ServiceEnumeration();
};