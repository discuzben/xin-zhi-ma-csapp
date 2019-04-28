/******************************************
 jquery程序
 */
var jq = $.noConflict();
jq(document).ready(function() {

	//初始化，固定显示30天；
	var thisdt = new Date().getTime();
	var thisd = 0; //日期
	var thism = 0; //月份
	//console.log(thism + "," + thisd);
	for (var i = 1; i <= 30; i++) {
		thisdt = thisdt + 24 * 3600 * 1000;
		//console.log(thisdt);
		newdt = new Date(thisdt);
		thisd = newdt.getDate();
		thism = newdt.getMonth() + 1; //由于月从0开始计,所以加1转成实际值
		jq('#datesel').append('<li class="dateitem mui-table-view-cell" key="' + i + '" thisd="' + thisd + '" thism="' +
			thism + '"><span>' + thisd + '</span><span>' + thism + '月</span></li>');
	}
	/*  初始化结束*/

	//连续选择
	jq('#btn_selectdate_con').on("click", function() {

		var total_amount = vm1.$data.amount;
		if (total_amount == null || total_amount == "" || total_amount == 0) {
			mui.alert("请填写还款金额！")
			return false;
		}

		jq('#selfmask').show();
		jq(this).addClass('bluebackgroud');
		jq("#btn_selectdate_discon").removeClass("bluebackgroud");
	})

	//间隔选择
	jq('#btn_selectdate_discon').on("click", function() {

		var total_amount = vm1.$data.amount;
		if (total_amount == null || total_amount == "" || total_amount == 0) {
			mui.alert("请填写还款金额！");
			return false;
		}
		jq('#selfmask').show();
		jq(this).addClass('bluebackgroud');
		jq("#btn_selectdate_con").removeClass("bluebackgroud");

	})

	//日期取消
	jq('#datecancel').on('click', function() {
		//jq('#selfmask').hide();
	})
	//日期确认
	jq('#dateconfirm').on('click', function() {
		jq('#selfmask').hide();
		var datelist = jq('.isSelect');
		vm1.$data.date_count = datelist.length;

		//将选中的日期拼成字符串，放到vm1的data中
		var sel_date = "";
		var list=new Array();
		datelist.each(function(index, element) {
			var dt = new Date();
			var ty = dt.getFullYear();
			var tm = jq(this).attr("thism");
			var td = jq(this).attr("thisd");

			list[index]=ty + "-" + tm + "-" + td;

		})
		vm1.$data.select_date = JSON.stringify(list);
		//console.log(sel_date);

	})

	//选中日期
	jq('#dateview .dateitem').on("click", function() {

		if (jq('#btn_selectdate_discon').hasClass("bluebackgroud")) {
			//间隔选
			if (jq(this).hasClass('isSelect')) {
				jq(this).removeClass('isSelect');
			} else {
				jq(this).addClass('isSelect');
			}
		} else if (jq('#btn_selectdate_con').hasClass("bluebackgroud")) {
			//连续选
			var selectlist = jq(this).closest('ul').find('.isSelect');
			if (selectlist.length == 1) {
				var k1 = parseInt(jq(selectlist[0]).attr("key"));
				var k2 = parseInt(jq(this).attr("key"));
				//逆向选的话,就重新选;
				if (k1 > k2) {
					selectlist.removeClass('isSelect');
					jq(this).addClass('isSelect');
				} else {
					//选中两个之间的所有;
					jq(this).addClass('isSelect');
					var list = jq(selectlist[0]).nextUntil(this);
					list.addClass('isSelect');
				}
			} else {
				selectlist.removeClass('isSelect');
				jq(this).addClass('isSelect');
			}
		}
	})
})
