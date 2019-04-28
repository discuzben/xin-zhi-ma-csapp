mui.init();
mui.plusReady(function() {
    // 跳转注册页面
    document.getElementById("go-login").addEventListener("tap",function(){
        mui.openWindow({
            url:'login.html' ,
            id: 'loginpage',
            createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
            show: {
                autoShow: true, //页面loaded事件发生后自动显示，默认为true
                aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
                //duration: 300 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
            },
            waiting: {
                autoShow: false, //自动显示等待框，默认为true
                title: '正在加载...', //等待对话框上显示的提示内容

            }
        })
    })
    //提交注册
    document.getElementById("btn_register").addEventListener("tap", function() {
        var phone = document.getElementById("txt_phone").value;
        var vcode = document.getElementById("txt_vcode").value;
        var osname = plus.os.name;
        var devuuid = plus.device.uuid;
        console.log('register...');

        var requestUrl = adressl + "/api/Login/register";
        mui.post(requestUrl,
            {"phone": phone,
                "vcode": vcode,
                "osname": osname,
                "uuid": devuuid
            },

            function(data) {
                console.log(JSON.stringify(data));
                //return;
                var token = data.data.logintoken;
                console.log(typeof(token));
                console.log(token);
                if (data.code==1 && ( typeof(token) != undefined )) {
                    //保存token本地
                    localStorage.logintoken = token;
                    localStorage.signkey=data.data.userinfo.sign;

                    console.log(localStorage.signkey);
                    plus.nativeUI.toast("注册成功，跳转首页")
                    //plus.webview.open("index.html",);
                    mui.openWindow({
                        url:'index.html' ,
                        id: 'indexpage',
                        createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
                        show: {
                            autoShow: true, //页面loaded事件发生后自动显示，默认为true
                            aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
                            //duration: 300 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                        },
                        waiting: {
                            autoShow: false, //自动显示等待框，默认为true
                            title: '正在加载...', //等待对话框上显示的提示内容

                        }
                    })
                }
                else
                {
                    plus.nativeUI.toast("手机号或者验证码有误！")
                }
            }, 'json')

    });


    //获取验证码
    document.getElementById("btn_getvalidcode").addEventListener("tap", function() {
        var phone = document.getElementById("txt_phone").value;
        if(phone=="")
        {
            plus.nativeUI.toast("请填写手机号码！")
            return false;
        }
        var requestUrl = adressl + "/api/login/sendVerifyCode";
        mui.post(requestUrl, {
                'phone':phone
            },
            function(data) {

                console.log(JSON.stringify(data));

            }, 'json')

    })

})