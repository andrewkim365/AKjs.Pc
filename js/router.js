/*
                       _oo0oo_
                      o8888888o
                      88" . "88
                      (| -_- |)
                      0\  =  /0
                    ___/`---'\___
                  .' \\|     |// '.
                 / \\|||  :  |||// \
                / _||||| -:- |||||- \
               |   | \\\  -  /// |   |
               | \_|  ''\---/''  |_/ |
               \  .-\__  '-'  ___/-. /
             ___'. .'  /--.--\  `. .'___
          ."" '<  `.___\_<|>_/___.' >' "".
         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
         \  \ `_.   \_ __\ /__ _/   .-` /  /
     =====`-.____`.___ \_____/___.-`___.-'=====
                       `=---='
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
$(document).ready(function(){
    /*-----------------------------------------------AKjs_Router (路由全局设置）使用方法-------------------------------------------*/
    AKjs_Router({ //路由配置管理
        Router: true, //是否开启路由（开启路由URL中带#的路径访问页面不刷新页面形式跳转 (开启 true, 停用 false）
        FileFormat: ".html", //路由目录中的文件格式设置,该参数设置后data-href值里可以不写文件格式 （可设置html,php,aspx,jsp...等程序的文件名）
        Parameter: false, //是否开启URL的akjs参数，启用该功能可以解决浏览器缓存问题 （开启 true, 停用 false）
        Animate:"fadeIn ani_05s", //切换页面时的动画效果设置（输入动画库样式中的动画名称以及动画毫秒的样式名，社为空值无动画效果）
        ErrorMsg: "很抱歉，您要访问的界面加载失败！请稍后再试。", //界面加载失败时提示的信息 （找不到相关页面或者网络环境不稳定时提示的信息）
        RouterPath:["router","layout/main.html"], //路由目录和界面布局文件设置（第1个参数是路由目录文件夹名，第2个参数是指定整个界面布局的文件）
        startPage: "/page1", //首次访问的界面您要跳转到哪个界面？
        changePage: function (hash,change) { //路由初始化调用和页面变化时的回调（公共插件引入的区域）
            if (!change) { //change是用于判断hash模式是否跳页
                AKjs_Include("css/theme.default.css"); //颜色相关样式文件引入（AKjs_Include是js文件中引入另一个js或css文件的功能）
                AKjs_Include("js/data.js"); //Json数据文件引入（AKjs_Include是js文件中引入另一个js或css文件的功能）
            }
            AKjs_Include("js/plugin.js"); //功能插件按需引入（为了正常运行功能插件通过AKjs_Include方式引入）
            /*-----------------------------------------------AKjs_MenuList (菜单控制插件）使用方法-------------------------------------------*/
            $(function() {
                $(".plug_nav li").AKjs_MenuList({ //底部菜单的图标以及文字样式变化设置
                    icon_text: ["dt i","dt span"], //设置需要控制的菜单图标和文字元素
                    btn_color: "hover_gray_222 c_white", //未选中的文字和图标的颜色
                    active_color: "pointer bg_title02 c_title_sub01", //被选中的文字和图标的颜色
                    Callback: function(ele,index) {
                        console.log(ele, index);
                    }
                });
            });

            /*-----------------------------------------------AKjs_Lazyload 使用方法-------------------------------------------*/
            $(function() {
                $("*[data-animation]").AKjs_Lazyload({ //对所有带data-animation属性的元素进行懒加载，让滚动条位置到达该元素区域时动画播放；
                    scroll: $("main"), //滚动区域的容器
                    scrollTop: 100, //设置初始化滚动条位置（当滚动条滚动到当前设置的位置时所有效果将进行初始化）
                    Callback: function(ele) { //初始化回调入口
                        //console.log(ele);
                    },
                    Scrollback: function(ele,scroll) { //页面滚动后的回调
                        //console.log(scroll);
                    }
                });
            });
            $(function() {
                $("img").AKjs_Lazyload({ //对所有的图片懒加载
                    scroll: $("main"), //滚动区域的容器
                    scrollTop: 100, //设置初始化滚动条位置（当滚动条滚动到当前设置的位置时所有效果将进行初始化）
                    Img_Effect: "fadeIn", //图片加载动画效果
                    Img_LoadStyle: "loading01", //图片加载之前显示的Loading效果 （loading01~05）注：Img_Effect，Img_LoadStyle，Img_Error 三个参数是图片懒加载专用参数；
                    Img_Error: "./img/noimage.png", //图片加载失败时默认显示图片URL
                    Callback: function(ele) { //初始化回调入口
                        //console.log(ele);
                    },
                    Scrollback: function(ele,scroll) { //页面滚动后的回调
                        //console.log(ele);
                    }
                });
            });
            ak_mainHeight(); //重新设置main元素的高度
            /*
                 AKjs_Location 使用方法：
                //url=跳转路径，{type=跳转类型（href,history,reload），time=延迟时间，router=页面切换效果（left,right）}

                AKjs_Location("url",{type:"", time: "", router:""}); //参数设置结构
                AKjs_Location("/start"); //location.replace 跳转模式(第二个参数默认识别time参数)
                AKjs_Location("/start",{type:"href"}); //location.href 跳转模式
                AKjs_Location("/",{type:"reload"}); //location.reload() 刷新当前页
                AKjs_Location("-1",{type:"history"}); //history.back(-1) 跳转返回上一页,也可以设置0，-2 等数值
                AKjs_Location("/start",{time:1000}); //location.replace 跳转模式 (延迟1秒后跳转)
                AKjs_Location("/start",{router:left}); //location.replace 跳转模式 (router参数是页面切换效果，left是左滑[返回效果]，right是右滑[进入效果])

                AKjs_getUrlParam &  AKjs_changeURLArg 使用方法：
                console.log("GET_ak: "+AKjs_getUrlParam('ak')); //获取URL中的参数值
                console.log(AKjs_changeURLArg(location.hash,"ak","change"+AKjs_getUrlParam('ak'))); //更改URL中的参数值

                AKjs_Unicode 使用方法：
                console.log(AKjs_Unicode("中文字符"));

                 AKjs_setCookie & AKjs_getCookie & AKjs_delCookie 使用方法：
                 AKjs_setCookie("username", user, 365); //设置cookie
                 var user = AKjs_getCookie("username"); //获取cookie
                 AKjs_delCookie(name) //删除cookie

                 AKjs_htmlEncode & AKjs_htmlDecode 使用方法：
                 AKjs_htmlEncode(str); //把TEXT转换HTML
                 AKjs_htmlDecode(str); //把HTML转换TEXT

                 AKjs_DateFormat & AKjs_FileFormat 使用方法：
                 console.log(AKjs_DateFormat("2018/03/30 17:50","yyyy-MM-dd HH:mm"));
                 console.log(AKjs_DateFormat(new Date(),"yyyy-MM-dd HH:mm"));
                 AKjs_FileFormat(filename) //获取文件的扩展名
             */
        },
        error:function (hash) { //请求加载页面失败后的回调 （可删除该回调入口）
            if (hash) { //获取hash的参数值，当前的判断是hash有值的情况
                AKjs_Include("js/plugin.js"); //功能插件按需引入（为了正常运行功能插件通过AKjs_Include方式引入）
                AKjs_WebToast("您访问的界面加载失败,请稍后再试!","middle",3000); //(提示文字，显示位置 [top ，middle ，bottom ]，遮挡背景[加mask即可用]，耗时)
                AKjs_Location("/page1",{time:3000}); //location.replace 跳转模式 (延迟跳转)
            }
        }
    });
});


//main元素自定义设置高度-----------------------------------------------------------------------------------------//
function ak_mainHeight() {
    $("body").fadeIn();
    $("header, aside, footer").removeClass("dis_none_im");
    header_footer();
    $(window).resize(function(){
        header_footer();
    });
    function header_footer() {
        var header_h = $("header").outerHeight();
        var footer_h = $("footer").outerHeight()+10;
        $("main").css({
            "margin-top": header_h,
            "margin-bottom": footer_h,
            "max-height": $(window).height() - header_h - footer_h
        });
    }
}
