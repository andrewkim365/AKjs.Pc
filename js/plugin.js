/*-----------------------------------------------AKjs_Config (全局设置）使用方法-------------------------------------------*/
AKjs_Config({ //环境配置管理
    MaskStyle: ["style3", "opacity07"], //1.所有弹窗背景图案选择（样式style1~8）、2.遮挡层背景的透明度（opacity01~09）
    Responsive: true, //是否开启文字大小按屏幕尺寸自适应变化，考虑到兼容平板电脑建议开启 (开启 true, 停用 false）
    ButtonLink: true, //通过元素中加data-href属性的方式跳转界面, 建议开启路由功能后使用。(使用button超链接 true,不使用button超链接 false）
    animation: true, //是否开启元素里加动画参数的功能？（例：data-animation="{name: 'zoomIn', duration:1, delay: 0}"） 动画库：akjs.animate.css
    pluginPath: "./compress/", //功能插件文件所在的目录设置
    pluginClear: { //定期清理功能插件的缓存 【days=天数, hours=小时, minutes=分钟，seconds=秒数 （当前提供的四个参数中任意抽选一个设置时间清理功能插件的缓存。四个参数不能同时设置）】
        /*使用帮助：项目开发阶段建议使用秒数间隔清理缓存，项目正式上线后不经常改动插件所以建议使用天数间隔清理缓存。*/
        /*注意：清理缓存时按需引入的功能插件将重新网络请求所以会影响到页面加载速度。*/
        minutes: 10 //分钟
    }
});

/******JS插件按需引入（注意：插件名称和插件文件名需要保持一致，而且插件文件必须要放到plugin目录里面，否则会出错！）******/
/*
参数说明：AKjs_Plugin("插件名称或插件的js文件名","该插件是否存在相关css文件？存在写css，不存在设为空。");
* 做项目时不必要的插件可以注释处理。
* 注：调用插件的地方在router目录里的相关html文件中的最底部。
*/

/*-----------------------------------------------AKjs_Plugin 功能插件引入-------------------------------------------*/
AKjs_Plugin("AKjs_plugin.pc.min","css"); //引入压缩版的全部功能插件

/*-----------------------------------------------AKjs_Loader 使用方法-------------------------------------------*/
$(function() {
    AKjs_Loader({
        ele: $("main").children("#ak-main"), //是否使用局部遮挡层，使用请设置指定的局部元素 （不设置任何参数代表使用全部遮挡层）
        autoMode: false, //是否开启指定的时间后自动消失功能 (开启 true, 关闭 false）
        timeToHide: 1000, //毫秒时间设置 (automode必须开启才能有效)
        iconColor: "#ffffff", //图标颜色设置
        maskBG: false, //是否开启遮挡背景 (开启 true, 关闭 false）
        Loader: "load_2", //loading效果选择（load_1~7），在PC端使用时请填写load_0,让IE8也兼容。
        //text: "内容加载中", //Loading时显示的文字
        boxsize: "3em", //Loading框大小设置
        eleclass: "animated fadeIn zindex_6 c_gray_333", //Loading的ele区域的样式设置
        callback:function (ele,destroy) { //回调入口 （ele：元素，destroy：摧毁开关控制）
            console.log(ele);
            setTimeout(function() { //页面加载完2秒后执行
                destroy(true); //关闭loading窗 [true:关闭loading效果，false:重新显示或不关闭loading效果]（使用该功能autoMode参数设为false，并且timeToHide参数不需要设置值）
            },2000);
            /*if($("#ak-scrollview").css('display') == 'block'){
                $("#ak-scrollview").animate({scrollTop:0},0); //指定元素区域的滚动条返回到最顶部
            }*/
        }
    });
});

/*-----------------------------------------------AKjs_ToolTip 使用方法-------------------------------------------*/
$(function () {
    $("*[title]").AKjs_ToolTip({
        mouse: "hover", //鼠标操作类型 (hover,click)
        boxClass: "border bor_black bg_black05 c_white",  //弹出层样式class设置
        arrowSize: "10", //箭头大小设置 （单位默认是px）
        arrowColor:"c_gray_333", //箭头颜色class设置
        arrowPosition: "top", //弹出层显示位置 (top,bottom)
        callback: function(self,box,option,setting) { //弹出层显示后的回调（注：元素中有title属性时无需当前回调）
            box.parent().addClass("line_h_2em");
            box.parent().children("i").addClass("minus_mb_08em");
            //setting(); //考虑数据加载先后顺序，该方法数据加载完后需要再次执行。
        }
    });
});
/*
# 所有功能插件的中文说明：

    AKjs_AllChecked //全选功能
        AKjs_ChangeIcon //图标切换功能
        AKjs_ChangeInput //输入框值互换功能
        AKjs_Checkbox //复选框美化
        AKjs_ChooseList //按钮模式复选和单选功能
        AKjs_Circliful //圆形统计插件
        AKjs_Codeval //图片验证功能
        AKjs_Completer //自动完成输入功能
        AKjs_CountDown //倒计时功能
        AKjs_CountTo //数字动画效果
        AKjs_DateTime //日期和时间插件
        AKjs_Dialog //alert，confirm，prompt等弹出层功能
        AKjs_DropUpDown //列表展开和收起功能
        AKjs_Favorite //点赞或收藏功能
        AKjs_Filterizr //筛选及排序插件
        AKjs_Flying //加入购物车飞入动画效果
        AKjs_Form //表单提交相关效果
        AKjs_GetVerifyCode //手机短信验证码认证功能
        AKjs_IntlTelInput //国际区号选择功能
        AKjs_Lazyload //图片加载时有动画效果
        AKjs_Loader //Loading效果功能
        AKjs_Menu //菜单控制功能 (Router专用)
        AKjs_MenuList //导航状态控制功能 (Router专用)
        AKjs_NavMenu //导航菜单效果插件 (Router专用)
        AKjs_Marquee //上下左右滚动插件
        AKjs_MultiDate //多功能日期和时间插件
        AKjs_NowTime //获取当前时间的功能
        AKjs_Paginator //分页插件
        AKjs_PassLevel //密码安全等级插件
        AKjs_PickupTime //选择时间插件
        AKjs_Popupwin //弹窗功能
        AKjs_PortraitImage //头像上传功能
        AKjs_PreviewImage //同时上传多个图片的功能
        AKjs_ProductPhoto //产品联播图功能
        AKjs_Progress //进度条插件
        AKjs_QRcode //二维码生成插件
        AKjs_Radio //单选框美化
        AKjs_Range //滑块功能插件
        AKjs_Ratyli //星级评价功能
        AKjs_SelectOption //pc端专用select下拉框插件
        AKjs_Slider //欢迎页和联播图功能
        AKjs_SnInput //输入支付密码功能
        AKjs_Spinner //数量控制功能
        AKjs_StepOrder //步骤插件
        AKjs_Substring //输入框里输入的数字强行转换为人民币格式的插件
        AKjs_Switch //开关按钮美化
        AKjs_Tabs //TABS切换内容功能
        AKjs_Template //模板引擎插件
        AKjs_Textarea //多行输入框实时查询字符数的功能
        AKjs_TimeAxis //时间轴展示功能
        AKjs_TimeClock //时钟功能
        AKjs_Typeahead //模糊搜索功能
        AKjs_TypeIt //文字打字效果
        AKjs_Validate //表单校验插件
        AKjs_Viewer //图片放大预览功能
        AKjs_Vticker //列表垂直滚动插件
        AKjs_WebToast //提示框效果
        AKjs_MediaElement //视频播放器
        AKjs_FullScreen //全屏功能
        AKjs_ElementControl //元素控制插件
        AKjs_ToolTip //提示工具插件
        AKjs_Mkinfinite //动画效果联播图插件
        AKjs_HoverBorder //布局边框动画插件
        AKjs_GoTop //返回页面顶部插件
        AKjs_ImgSubject //图片列表滑动效果
        AKjs_HotspotMap //图片热点注释和提示工具
*/
