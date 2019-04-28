mui.init({

})
mui.plusReady(function(){
    // 页面初始化监听date_id_event父页面items时间传入
    window.addEventListener('date_id_event',function(e){
        var dateShow = mui('.date-show');
        for(var i = 0;i<dateShow.length;i++){
            dateShow[i].innerHTML = e.detail.date;
        }
        mui.toast(e.detail.date);
    })
})