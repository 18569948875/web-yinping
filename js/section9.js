(function () {
     var c_obj = (function () {
        
        // 滚动按需加载商品
        function scrollList(obj) {
            var flag = true;
            //判断加载时机
            function old() {
                // 获取窗口高度
                var winH = $(window).height(),
                    //获取卷起高度
                    scrollH = $(window).scrollTop();
                obj.each(function (index, ele) {
                    //获取内容高度
                    var divH = $(ele).offset().top;
                    if (divH - (winH + scrollH) < 30 ) {
                        //只加载一次处理
                        if (flag && $(this).data('list')){
                            flag = false;
                            // console.log($(this).index());
                            // console.log($(this).html());
                            // console.log($(this).children(".Mike-list"));
                            var mikeList = $(this).children(".Mike-list").children(".Mike-list-box"),
                            _this = $(this);
                            //调用ajax请求
                            ajax(_this,mikeList);
                            $(this).data("list","");
                            flag = true;
                        }
                        
                    }
                })
            }
            //ajax请求函数
            function ajax(_this,mikeList){
                $.ajax({
                   type: "get",
                   url: "../api/section9.php",
                   data: {
                       user: _this.data("list")
                   },
                   dataType: 'json',
                   success:function(data){
                       // console.log(data.res[0].brand);
                       // console.log(data.res);
                       if(data.res){
                        //    console.log(data.res);
                           var html = ejs.render($('.tpl').html(), {foods: data.res});//编译数据
                           // $('.meeting-Mike .Mike-list').prepend(html);      //加入页面中
                           mikeList.prepend(html);
                       }
                   }
               })
            }
            //滚动触发事件
            $(window).scroll(function () {
                old();
            })
       }
       // top切换事件
       function topDeal(btn,list){
           var flag = true;
            //初始化样式
            btn.eq(0).addClass('btn-list2');
            ajax(btn.eq(0));
            //解决click 点击事件延迟
            FastClick.attach(document.body);
            // 点击调用ajax事件
            btn.on('click',function(){
                // console.log($(this).html());
                if(flag){
                    flag = false;
                    var _this = $(this);
                    _this.addClass('btn-list2').siblings().removeClass('btn-list2');
                    // 调用ajax函数
                    ajax(_this);
                }
            })
            //发起ajax请求
            function ajax(_this){
                $.ajax({
                   type: "get",
                   url: "../api/section9.php",
                   data: {
                       user: _this.html()
                   },
                   dataType: 'json',
                   success:function(data){ 
                       // console.log(data.res[0].brand);
                    //    console.log(data.res);
                       if(data.res){
                        //    console.log(data.res);
                           var html = ejs.render($('.tpl2').html(), {foods: data.res});//编译数据
                           list.html(html);  //加入页面中
                           flag = true;
                    }
                   }
               })
            }
       }
        //图片懒加载
        function lazyLoad() {
        $("img").each(function (index, ojb) {
            var srcUrl = $(this).attr("src");
            $(this).data("original", srcUrl);
            $(this).attr("src", "../imgs/section9/timg.gif");
        });
        load();
        $(window).scroll(function () {
            load();
        });

        function load() {
            var windowH = $(window).height(),
                scrollH = $(window).scrollTop(),
                len = $("img").length;
            for (var i = 0; i < len; i++) {
                var offsetT = $("img").eq(i).offset().top;
                if (offsetT - (windowH + scrollH) < 1) {
                    var url = $($("img")[i]).data("original");
                    $($("img")[i]).attr("src", url);
                }
            }
        }
        }

        //加入购物车
        function addCart(objP){
            objP.on('click',".xuan",function(){
                var idj = $(this).parent().data('id');
                //将商品添加到本地并跳转购物车（cart2.js内方法）
                c_cart.cart(idj); 
            })
        }
        return {
            scrollList: scrollList,
            topDeal: topDeal,
            lazyLoad:lazyLoad,
            addCart:addCart
        }
    })();

    //全部商品    处理鼠标悬浮事件
    c_obj.scrollList($(".cont .meeting-Mike")); 
    // ajax请求数据
    c_obj.topDeal($(".btn-box .btn-list"),$(".list-box")); 
    //加入购物车
    c_obj.addCart($(".list-box")); 
    //图片懒加载调用
    // c_obj.lazyLoad();
})();
