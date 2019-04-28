var repayment_mainPlan = null;
mui.init();

function da(id,status,vmindex){
	var da ={};
	var token=localStorage.logintoken;
	//保存本地的数据
	da["token"]=token;
	// da["bank_card_id"] = id;
	da["pay_channel_id"] = 1;
	da['status'] = status;
	// console.log(plus.webview.currentWebview().cardid)
	da["bankcard_id"]=plus.webview.currentWebview().cardid; //银行卡id
	// console.log(vmindex.page);
	

	da["page"] = vmindex.page++;
	// console.log("当前页数"+ vmindex.page);
	
	var signkey=localStorage.signkey;
	var signcode=sign(da,signkey);
						
	da['sign']=signcode;
	return da;
}

function vmdata(statufun,vmindex,index){
	if(vmindex.isloading == true){
		return;
	}
	vmindex.isloading = true;
	//请求历史列表信息流
	var plansUrl=address("/api/Repayment/plans");
	let self = this;
	mui.post(plansUrl,statufun,function(data){
		// document.write("执行成功"+JSON.stringify(data));
		
		let curdata = data.data.data;
		vmindex.isloading = false;
		
		if( data.data.max_page == data.data.page){
			self.endPullUpToRefresh(true);
		}

		if (data.code == 1 && (typeof(token) != undefined)) {
			plus.nativeUI.toast(data.msg);
			mui.each(curdata,function(index,item){
				if(item.status == '1'){
					item['icon_status'] = 'mui-icon iconfont icon-zhixingzhong';
					item['icon_style'] = 'color:#FFD14B;font-size: 1.4rem !important;';
				}else if(item.status == '2'){
					item['icon_status'] = 'mui-icon iconfont icon-zhixingchenggong';
					item['icon_style'] = 'color: #71E9A4;font-size: 1.4rem !important;';
				}else if(item.status == '9'){
					item['icon_status'] = 'mui-icon iconfont icon-shibai';
					item['icon_style'] = 'color:#F16541;font-size: 1.4rem !important;';
				}
			})
			console.log(index)

			vmindex.planList = vmindex.planList.concat(curdata);
		}else{
			plus.nativeUI.toast(data.msg);
		}
	},'json')
}
mui.plusReady(function(){
	//智能还款统计金额
	var statisticUrl=address("/api/Repayment/statistics");
	mui.post(statisticUrl,
	da('','',''),
	function(data){
		// console.log("统计金额"+JSON.stringify(data));
		if (data.code == 1 && (typeof(token) != undefined)) {
		plus.nativeUI.toast(data.msg);
		vm1.repayment_amount = data.data.repayment_amount;
		vm1.consumption_amount = data.data.consumption_amount;
		}else{
			plus.nativeUI.toast(data.msg);
		}
	},'json')
	
	//计划列表全部

	mui('#item_all').pullToRefresh({
		up: {
			callback: function(){
				var self = this;
				setTimeout(function() {
					vmdata.call(self,da('','all',vm2),vm2,2);
					self.endPullUpToRefresh();
				}, 1000);
			},
			auto:true
		}
	});
	
	//计划列表执行成功
	mui('#item_1').pullToRefresh({
		up: {
			callback: function(){
				var self = this;
				setTimeout(function() {
					vmdata.bind(self)(da('','2',vm3),vm3,3);
					self.endPullUpToRefresh();
				}, 1000);
			},
			auto:true
		}
	});
	//计划列表执行中
	mui('#item_3').pullToRefresh({
		up: {
			callback: function(){
				var self = this;
				setTimeout(function() {
					vmdata.bind(self)(da('','1',vm4),vm4,4);
					self.endPullUpToRefresh();
				}, 1000);
			},
			auto:true
		}
	});
	//计划列表执行失败
	mui('#item_4').pullToRefresh({
		up: {
			callback: function(){
				var self = this;
				setTimeout(function() {
					vmdata.bind(self)(da('','9',vm5),vm5,5);
					self.endPullUpToRefresh();
				}, 1000);
			},
			auto:true
		}
	});
	//预加载主计划页
	repayment_mainPlan = mui.preload({
		url: 'repayment_mainPlan.html',
		id: 'repayment_mainPlan',
		styles: {
			"render": "always",
			"popGesture": "hide",
			"bounce": "vertical",
			"bounceBackground": "#efeff4"
		}
	});
})
function open_mainPlan(item) {
	//触发子窗口传递下列数据变更计划主任务详情
	mui.fire(repayment_mainPlan, 'get_mainPlan', {
		// console.log(item.id);
		planid: item.id
	});
	setTimeout(function() {
		repayment_mainPlan.show("slide-in-right", 300);
	}, 150);
}
var vm1 = new Vue({
	el: '#list-top',
	data: {
		repayment_amount:null,
		consumption_amount:null
	}
});
var vm2 = new Vue({
	el: '#list-main',
	data: {
		planList:[],
		page:1
	}
});
var vm3 = new Vue({
	el: '#exe-success',
	data: {
		planList:[],
		page:1
	}
});
var vm4 = new Vue({
	el: '#executing',
	data: {
		planList:[],
		page:1
	}
});
var vm5 = new Vue({
	el: '#fail',
	data: {
		planList:[],
		page:1
	}
});
// (function($) {
//     $('#scroll').scroll({
//         indicators: true //是否显示滚动条
//     });
// })(mui);