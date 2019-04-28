    mui.init();
    mui('.mui-scroll-wrapper').scroll({
        indicators: true //是否显示滚动条
    });
    mui.plusReady(function(mui){
        document.getElementsByClassName("change_card_info").addEventListener("tap",function(){
            mui.openWindow({
                url:'intelli_payment/change_card_info.html' ,
                id: 'my_bag',
                show: {
                    // autoShow: true, //页面loaded事件发生后自动显示，默认为true
                    // aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
                    //duration: 300 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                },
                waiting: {
                    autoShow: false, //自动显示等待框，默认为true
                    // title: '正在加载...', //等待对话框上显示的提示内容

                },
                extras:{
                    name:'cyh'
                    // 添加需要传递的参数
                }
            })
        })
    });

/*    var html1 = '<li class="mui-table-view-cell"><div class="mui-card"><div class="mui-card-header"><img class="banktype" src="../../../imgs/ad1.png" style="width: 100px;" ><span class="cardholder">林**</span></div><div class="mui-card-content"><div class="mui-card-content-inner"><span class="cardtype">信用卡</span><span class="cardnumber">6259 **** **** 8042</span></div><div class="mui-card-content-inner cardbot"><div class="limit"><span>30,000</span><br><span>额度</span></div><div class="limit-time"><span class="limit-time-left">03</span><div class="limit-time-right"><span class="limit-time-right-top">天到期</span><br><span class="limit-time-right-bottom">11-05</span></div></div><button class="unbind" type="button">立即还款</button></div></div></div></li>';
    document.getElementById('item1mobile').querySelector('.item1ul').innerHTML = html1 + html1 + html1 + html1 + html1;
    // for (i = 0;i<2;i++) {
    //     var wrapper_height = mui('.mui-scroll-wrapper')[i].offsetHeight-40;
    //     mui('.mui-scroll-wrapper')[i].style.height = wrapper_height+'px';
    // }


    var html2 = '<li class="mui-table-view-cell2"><div class="mui-card"><div class="mui-card-header"><img class="banktype" src="../../../imgs/ad1.png" style="width: 100px;" ><span class="cardholder">林**</span></div><div class="mui-card-content mui-content-2 cardbot"><div class="mui-card-content-inner mui-card-2"><span class="cardtype">信用卡</span><span class="cardnumber">6259 **** **** 8042</span></div><button class="unbind2" type="button">解除绑定</button></div></div></li>';
    var item2 = document.getElementById('item2mobile');
    document.getElementById('slider').addEventListener('slide', function(e) {
        // if (e.detail.slideNumber === 1) {
        item2.querySelector('.item2ul').innerHTML = html2 + html2 + html2 + html2 + html2;
        // }
    });*/

    $(document).ready(function(){

        var backgroundColor = ["green","red","blue","grey"];
        var list = $(".mui-table-view-cell");
        for(var i= 0;i < list.length;i++){
            list.eq(i).attr("bg",backgroundColor[0])//li属性全部设置为green
            if(list.eq(i).css('background-color') === 'rgb(255, 255, 255)'){
                list.find('.bank-top').css('background-color','green');
                list.find('.bank-middle').css('background-color','green');
                list.find('.bank-bottom').css('background-color','#00B200');
                console.log(mui('.bank-bottom').css('background-color'))
            }
        }

        var bank_num = document.getElementsByClassName('bank-card-num')[0].innerHTML;//取第一个li列表的银行卡号码
        var Length = document.getElementsByClassName('bank-card-num').length;
        BlankCardRule(bank_num);
        var newString = BlankCardRule(bank_num);
        for(var i = 0 ;i < Length;i++){
            document.getElementsByClassName('bank-card-num')[i].innerHTML = newString;
        }
        /*
            银行卡字符串4个数字一个空格
        */
        function BlankCardRule(S){
            S =S.replace(/(\s)/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'')
            return S;
        }

    })



