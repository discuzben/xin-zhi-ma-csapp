// mui.init({
// 
// })
// mui.plusReady(function(){
//     window.addEventListener('planInfoEvent',function(e){
//         mui.toast(e.detail.writer);
//     })
// 
//     // 预加载计划任务详情页面
//     var detailPlanPage = mui.preload({
//         url:'repayment_planDetail.html',
//         id:'repayment_planDetail.html'
//     })
//     //该html计划主任务页面触发tap事件，回去传入执行日期到子页面（计划详情页）
//     mui('#main_plan_li').on('tap','#main_plan_li span',function(e){
//         // 自定义一个传参事件
//         mui.fire(detailPlanPage,'date_id_event',{'date':this.innerHTML});
//         //打开计划详情页面
//         mui.openWindow({
// 
//             url:'repayment_planDetail.html',
//             id:'repayment_planDetail.html',
// 
//             createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
//             show: {
//                 autoShow: true, //页面loaded事件发生后自动显示，默认为true
//                 aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
//                 //duration: 300  页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
//             },
//             waiting: {
//                 autoShow: false, //自动显示等待框，默认为true
//                 title: '正在加载...', //等待对话框上显示的提示内容
// 
//             }
//         })
// 
//     })
// })