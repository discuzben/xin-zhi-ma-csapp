/*
		mui('.mui-scroll-wrapper').scroll({
			indicators: true //是否显示滚动条
		});
		
		*/
		
					//var dateview = document.getElementById('dateview');
					//var selfmask = document.getElementById('selfmask');
					//var datecancel = document.getElementById('datecancel');
					//var dateconfirm = document.getElementById('dateconfirm');
					
					var d = new Date();

					var daysRemainingc = getMonthDays(d.getFullYear(),(d.getMonth()+1))-d.getDate();
					
					//设置今月剩余的日期
					var itemstatus = [];
					var scstatus = ["nor","nor"];
					var dateContent = document.getElementById('datesel');
					var dataitem = dateContent.children;
					var sc = document.getElementsByClassName('btn-change');
					// console.log(sc);
					separateChoice = sc[0];
					rankingChoice = sc[1];
					var	dateStart,dateEnd,index=0;
					
				
					initele();
					//设置初始化之前已选择元素
					
				
					//设置日期选择方式按钮切换,切换一次，初始化子标签一次
/*
					for (let i = 0; i < sc.length; i++) {
						sc[i].addEventListener("tap", function(event) {
							// console.log('ss')
							let laststate1 = scstatus[0];
							let laststate2 = scstatus[1];
							if (i == 0) {
								//间隔选择
								selfmask.style.display = "block";
								dateview.style.display="block";
								scstatus[0] = "nor";
								scstatus[1] = "sel";
								initdata(laststate1,laststate2,scstatus[0],scstatus[1]);
								console.log(scstatus)
							}else if (i ==1){
								//连续选择
								dateview.style.display="block";					
								selfmask.style.display = "block";
								scstatus[0] = "sel";
								scstatus[1] = "nor";
								initdata(laststate1,laststate2,scstatus[0],scstatus[1]);					
								console.log(scstatus)
							}
						});
					}

*/
					
					
					selfmask.addEventListener("tap", function(event) {
						selfmask.style.display = "none";
						dateview.style.display="none";
					});
					datecancel.addEventListener("tap", function(event) {
						selfmask.style.display = "none";
						dateview.style.display="none";
					});
					dateconfirm.addEventListener("tap", function(event) {
						selfmask.style.display = "none";
						dateview.style.display="none";
					});
		
		
		// 设置选中元素切换背景颜色
		function switchbac(itemind){
			if (itemstatus[itemind] == 'true') {
				dataitem[itemind].style.backgroundColor = 'white';
				itemstatus[itemind] = 'false';
			} else {
				dataitem[itemind].style.backgroundColor = 'skyblue';
				itemstatus[itemind] = 'true';
			}
			// console.log(itemstatus);
		}
		
		//创建子标签
		function initele(){
			if (dataitem.length != 0) {
				dateContent.innerHTML = "";
			}
			if(itemstatus.length != 0){
				itemstatus.splice(0,itemstatus.length); 
			}
			for (var i = 0; i <= daysRemainingc; i++) {
				var item = document.createElement('li');
				item.classList.add("dateitem");
				item.classList.add("mui-table-view-cell");
				// p.style.marginTop = '-10px';
				item.innerHTML = d.getDate()+i;
				var p = document.createElement('p');
				p.innerHTML = (d.getMonth()+1+'月');
				p.style.width = '100%';
				p.style.marginTop = '-3px';
				p.style.color = 'black';
				p.style.fontSize = '13px';
				item.appendChild(p);
				dateContent.appendChild(item);
				itemstatus.push('false');
			}
			//设置下月开始到下月今日的日期
			for (var i = 0; i < d.getDate()-1; i++) {
				var item = document.createElement('li');
				item.classList.add("dateitem");
				item.classList.add("mui-table-view-cell");
				item.innerText = i+1;
				var p = document.createElement('p');
				p.innerHTML = (d.getMonth()+2+'月');
				p.style.width = '100%';
				p.style.marginTop = '-3px';
				p.style.color = 'black';
				p.style.fontSize = '13px';
				item.appendChild(p);
				dateContent.appendChild(item);
				itemstatus.push('false');
			}
		}
		
		
		function getMonthDays(year,month){//获取某年某月的天数
			var d = new Date(year,month,0); //当天数为0 js自动处理为上一月的最后一天
			return d.getDate();
		}
		
		// 初始化所有日期元素
		function initdata(laststate1,laststate2,state1,state2){
			//判断选择日期方式是否与上次选择相同，不相同则清空上次选择,相同则显示上次的选择
			if(laststate1 != state1&&laststate2 != state2){
				index = 0;//初始化点击次数
				initele();
			}
			if(scstatus[0] == "sel"&&scstatus[1] == "nor"){
				for (var i = 0; i < dataitem.length; i++) {
					dataitem[i].onclick = function() {
						console.log('间隔选择')
						switchbac(i);
					}
				}
			}else if(scstatus[0] == "nor"&&scstatus[1] == "sel"){
				console.log('连续选择')
				for (var i = 0; i < dataitem.length; i++) {
					dataitem[i].onclick = function() {
						//切换两个日期的选择状态
						// 选择两个日期后日期中间也改为选择状态
						if (index%2 == 0) {
							// if (dateStart!=''&&dateEnd!='') {//判断排除第一次连续选择
								//每次的startclick初始化之前点击的背景
								for (var s = 0; s < dataitem.length; s++) {
									dataitem[s].style.backgroundColor = 'white';
									itemstatus[s] = 'false';
								}
							// }
							switchbac(i);
							dateStart = i;
						}else if (index%2 == 1){
							switchbac(i);
							dateEnd = i;
							if(dateStart > dateEnd){//排除先点击后面的日期，再点击前面的日期
								var rep = dateStart;
								dateStart = dateEnd;
								dateEnd = rep;
							}
							var len = dateEnd - dateStart;
							for (var s = dateStart+1; s < dateEnd; s++) {
								dataitem[s].style.backgroundColor = 'skyblue';
								itemstatus[s] = 'true';
							}
							console.log(itemstatus);
						}
						index++;
					}
				}
			}
		}
		
