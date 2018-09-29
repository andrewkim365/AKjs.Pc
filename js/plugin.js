/*-----------------------------------------------AKjs_Config (全局设置）使用方法-------------------------------------------*/
$(function () {
    AKjs_Config({ //环境配置管理
        MaskStyle: ["style3", "opacity07"], //1.所有弹窗背景图案选择（样式style1~8）、2.遮挡层背景的透明度（opacity01~09）
        Responsive: true, //是否开启文字大小按屏幕尺寸自适应变化，考虑到兼容平板电脑建议开启 (开启 true, 停用 false）
        ButtonLink: true, //通过元素中加data-href属性的方式跳转界面, 建议开启路由功能后使用。(使用button超链接 true,不使用button超链接 false）
        animation: true, //是否开启元素里加动画参数的功能？（例：data-animation="{name: 'zoomIn', duration:1, delay: 0}"） 动画库：akjs.animate.css
        pluginPath: "./plugin/", //功能插件文件所在的目录设置
        pluginClear: { //定期清理功能插件的缓存 【days=天数, hours=小时, minutes=分钟，seconds=秒数 （当前提供的四个参数中任意抽选一个设置时间清理功能插件的缓存。四个参数不能同时设置）】
            /*使用帮助：项目开发阶段建议使用秒数间隔清理缓存，项目正式上线后不经常改动插件所以建议使用天数间隔清理缓存。*/
            /*注意：清理缓存时按需引入的功能插件将重新网络请求所以会影响到页面加载速度。*/
            minutes: 10 //分钟
        }
    });
});

/******JS插件按需引入（注意：插件名称和插件文件名需要保持一致，而且插件文件必须要放到plugin目录里面，否则会出错！）******/
/*
参数说明：AKjs_Plugin("插件名称或插件的js文件名","该插件是否存在相关css文件？存在写css，不存在设为空。");
* 做项目时不必要的插件可以注释处理。
* 注：调用插件的地方在router目录里的相关html文件中的最底部。
*/
$(function () {
    AKjs_Plugin("AKjs_AllChecked"); //全选功能
    AKjs_Plugin("AKjs_ChangeIcon"); //图标切换功能
    AKjs_Plugin("AKjs_ChangeInput"); //输入框值互换功能
    AKjs_Plugin("AKjs_Checkbox","css"); //复选框美化
    AKjs_Plugin("AKjs_ChooseList"); //按钮模式复选和单选功能
    AKjs_Plugin("AKjs_Circliful"); //圆形统计插件
    AKjs_Plugin("AKjs_Codeval","css"); //图片验证功能
    AKjs_Plugin("AKjs_CountDown"); //倒计时功能
    AKjs_Plugin("AKjs_CountTo"); //数字动画效果
    AKjs_Plugin("AKjs_DateTime","css"); //日期和时间插件
    AKjs_Plugin("AKjs_Dialog","css"); //alert，confirm，prompt等弹出层功能
    AKjs_Plugin("AKjs_DropLoad","css"); //上拉刷新和下拉加载更多功能
    AKjs_Plugin("AKjs_DropUpDown"); //列表展开和收起功能
    AKjs_Plugin("AKjs_Favorite"); //点赞或收藏功能
    AKjs_Plugin("AKjs_Form"); //表单提交相关效果
    AKjs_Plugin("AKjs_GetVerifyCode"); //手机短信验证码认证功能
    AKjs_Plugin("AKjs_IntlTelInput","css"); //国际区号选择功能
    AKjs_Plugin("AKjs_Keyboard","css"); //安全键盘
    AKjs_Plugin("AKjs_Lazyload"); //图片加载时有动画效果
    AKjs_Plugin("AKjs_lightSlider","css"); //图片列表左右滑动功能
    AKjs_Plugin("AKjs_Loader","css"); //Loading效果功能
    AKjs_Plugin("AKjs_Marquee","css"); //上下左右滚动插件
    AKjs_Plugin("AKjs_MobileChat","css"); //移动端聊天功能插件
    AKjs_Plugin("AKjs_MultiDate","css"); //多功能日期和时间插件
    AKjs_Plugin("AKjs_NavScroll"); //导航滑动功能（今日头条）
    AKjs_Plugin("AKjs_NowTime"); //获取当前时间的功能
    AKjs_Plugin("AKjs_Paginator","css"); //分页插件
    AKjs_Plugin("AKjs_Popupwin"); //弹窗功能
    AKjs_Plugin("AKjs_PortraitImage","css"); //头像上传功能
    AKjs_Plugin("AKjs_PreviewImage","css"); //同时上传多个图片的功能
    AKjs_Plugin("AKjs_Progress","css"); //进度条插件
    AKjs_Plugin("AKjs_QRcode"); //二维码生成插件
    AKjs_Plugin("AKjs_Radio","css"); //单选框美化
    AKjs_Plugin("AKjs_Range","css"); //滑块功能插件
    AKjs_Plugin("AKjs_Ratyli"); //星级评价功能
    AKjs_Plugin("AKjs_ScrollFixed"); //当屏幕滑动时把指定元素固定到页面顶部的功能
    AKjs_Plugin("AKjs_Select","css"); //下拉菜单功能
    AKjs_Plugin("AKjs_SelectOption","css"); //pc端专用select下拉框插件
    AKjs_Plugin("AKjs_Slider","css"); //欢迎页和联播图功能
    AKjs_Plugin("AKjs_SnInput"); //输入支付密码功能
    AKjs_Plugin("AKjs_Spinner"); //数量控制功能
    AKjs_Plugin("AKjs_StepOrder"); //步骤插件
    AKjs_Plugin("AKjs_Substring"); //输入框里输入的数字强行转换为人民币格式的插件
    AKjs_Plugin("AKjs_Switch","css"); //开关按钮美化
    AKjs_Plugin("AKjs_Tabs"); //TABS切换内容功能
    AKjs_Plugin("AKjs_Template"); //模板引擎插件
    AKjs_Plugin("AKjs_Textarea"); //多行输入框实时查询字符数的功能
    AKjs_Plugin("AKjs_TimeAxis","css"); //时间轴展示功能
    AKjs_Plugin("AKjs_TouchDelete","css"); //列表滑动删除功能
    AKjs_Plugin("AKjs_Typeahead","css"); //模糊搜索功能
    AKjs_Plugin("AKjs_TypeIt","css"); //文字打字效果（！！！！！！！！！！样式有改动）
    AKjs_Plugin("AKjs_Validate"); //表单校验插件
    AKjs_Plugin("AKjs_Viewer","css"); //图片放大预览功能
    AKjs_Plugin("AKjs_Vticker"); //列表垂直滚动插件
    AKjs_Plugin("AKjs_WebToast","css"); //提示框效果

    AKjs_Plugin("AKjs_MenuList"); //导航状态控制功能
    AKjs_Plugin("AKjs_NavMenu"); //导航菜单效果插件
    AKjs_Plugin("AKjs_Scrollbar"); //滚动条美化
    AKjs_Plugin("AKjs_MediaElement","css"); //视频播放器
    AKjs_Plugin("AKjs_FullScreen"); //全屏功能
    AKjs_Plugin("AKjs_ElementControl"); //元素控制插件
    AKjs_Plugin("AKjs_ToolTip","css"); //提示工具插件
    AKjs_Plugin("AKjs_Mkinfinite"); //动画效果联播图插件
    AKjs_Plugin("AKjs_HoverBorder"); //布局边框动画插件
    AKjs_Plugin("AKjs_GoTop"); //返回页面顶部插件
    AKjs_Plugin("AKjs_ImgSubject"); //图片列表滑动效果
});