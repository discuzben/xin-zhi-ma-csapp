
/**
 * 共用常量定义
 */

var addr_api="http://api.xinzhima.cn";
var addr_api2="http://api2.xinzhima.cn";
var addr_pay="http://pay.xinzhima.cn"
var addr_pay2="http://pay2.xinzhima.cn"

var test_addr = "http://192.168.0.108:9006/";



/*
将数组data中的数据进行返key排序，然后组成字符串，后面接sign，再进行md5()加密；

**/
function sign(data,sign){
			// console.log(JSON.stringify(data)+sign);
			
            var keys = Object.keys(data);
            var str = '';
            keys.sort();
            keys.forEach(function(v){
                str += v + '=' + data[v] + '&';
            });
            str = str.replace(/&$/ , '');
            str += sign;
			//console.log('字符串'+str);
            //console.log('加密后的字符串' , str);
            return md5(str);
        }

		/**
		 * 拼接api访问地址
		 */	
		
function address(data){
	var address = addr_api2 + data;
	return address;
}

function address_pay(data)
{
	var address = addr_pay2 + data;
	return address;
}

function formatDate(time){
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
                month + '-' +
                day + ' ' +
                hour + ':' +
                min + ':' +
                sec;
    return newTime;         
}


//返回唯品会网址
function vipUrl(){
	var vipshopUrl = 'https://m.vip.com/';
	return vipshopUrl;
}
//判断数据是否为空
function getEarn(earnnum){
	let backnum;
	if(earnnum == null){
		backnum = '0.00';
	}else{
		backnum = earnnum;
	}
	return backnum;
}
//转换数据类型
function translateType(data){
	let curdata;
	if(typeof data == 'string'){
		curdata = JSON.parse(data);
	}else{
		curdata = JSON.stringify(data);
	}
	return curdata;
}
//验证码倒计时
function countdownp(obj,code){
	console.log(code)
	if(code !== 1){
		return;
	}
	obj.disabled = true;
	obj.style.backgroundColor = "lightgrey";
	let countdown = 59;
	let countdownfun = setInterval(function(){
		obj.innerText = countdown--;
		if(countdown <= 0){
			clearInterval(countdownfun);
			obj.innerText = '获取验证码';
			obj.disabled = false;
			obj.style.backgroundColor = "#1B99DC";
		}
	},1000)
}