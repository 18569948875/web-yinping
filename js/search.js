var searchObj = (function () {
    
    // 页面的初始化，
    function init() {
        FastClick.attach(document.body);
        $("header .sub").on("click", function(){
            var temp = $("input");
            if( !temp.val() ){
                temp.val("手机麦克风");
            }
            $("form").submit();
        });
        readHotSearchItems();
        readHistoryItems();
    }

    // 读取热门搜索的项目
    function readHotSearchItems() {
        var itemsObj = {
            "count": 6,
            "list": [
                { "id": 15, "url": "", "name": "手机麦克风", "orderSort": 1 },
                { "id": 16, "url": "", "name": "K歌声卡", "orderSort": 2 },
                { "id": 17, "url": "", "name": "录音声卡", "orderSort": 3 },
                { "id": 18, "url": "", "name": "吉他", "orderSort": 4 },
                { "id": 19, "url": "", "name": "电容麦", "orderSort": 5 },
                { "id": 35, "url": "", "name": "创新声卡", "orderSort": 6 }
            ]
        };
        var html = "";
        for (var i = 0; i < itemsObj.count; i++) {
            var temp = itemsObj.list[i];
            html += '<a href="https://m.ingping.com/search?kw='+ temp.name +'">' + temp.name + '</a>';
        }
        $(".hot-items").html(html);
    }

    // 读取历史搜索记录
    function readHistoryItems(){
        var res = JSON.parse( localStorage.getItem("list") );
        var html = "";
        if( res ){
            res.forEach( function( val ){
                html += '<a href="https://m.ingping.com/search?kw='+ val +'">'+ val +'</a>';
            });
            $(".hist-items").html( html );
        } 
    }

    // 点击删除搜索历史图标时，删除搜索历史
    function delSearchHistory() {
        FastClick.attach(document.body);
        $(".del-btn").on("click", function () {
            var res = confirm("确定删除历史记录吗");
            console.log(res);
            if (res) {
                localStorage.removeItem("list");
                $(".hist-items").html("");
            }
        })
    }

    // 当在输入框中输入搜索字段时，进行提示搜索
    function handleSearch(){
        var flag  = true;
        $("input").on("keyup", function(){
            if( flag ){
                flag = false;
                $.ajax({
                    url:"https://www.ingping.com/search/solrCheck?format=json",
                    type: "get",
                    data: {term: $(this).val() },
                    dataType: "jsonp",
                    success: function( data ){
                        if( data.length > 0 ){
                            var html = "";
                            for( var i = 0; i < data.length; i++ ){
                                html += '<li><a href="javascript:void(0);">'+ data[i] +'</a></li>';
                            }
                            $(".tip-items-box").html( html );
                            judgeShowOrHide( false );
                        }else{
                            judgeShowOrHide( true );
                        }
                        flag = true;
                    }
                });
            }
        });
    }

    // 控制搜索框提示项目是否显示
    function judgeShowOrHide( tag ){
        if( tag ){
            $(".hot-search").show();
            $(".tip-items-box").hide();
        }else{
            $(".hot-search").hide();
            $(".tip-items-box").show();
        }   
    }

    // 给搜索框提示选项绑定点击事件
    function handleSearchItemsClick(){
        FastClick.attach(document.body);
        $(".tip-items-box").on("click", "a", function(){
            var value = $(this).html().trim();
            $("input").val( value );
            var listValue = JSON.parse( localStorage.getItem("list") ? localStorage.getItem("list") : '[]' );
            var tempFlag = true;
            listValue.forEach(function( val ){
                if( val === value ){
                    tempFlag = false;
                }
            });
            if( tempFlag && listValue.length <= 5 ){
                listValue.push( value );
                localStorage.setItem( "list", JSON.stringify( listValue) );
            }
            $("form")[0].submit();
        });
    }

    return {
        init: init,
        delSearchHistory: delSearchHistory,
        handleSearch: handleSearch,
        handleSearchItemsClick: handleSearchItemsClick
    }
})();

searchObj.init();
searchObj.delSearchHistory();
searchObj.handleSearch();
searchObj.handleSearchItemsClick();