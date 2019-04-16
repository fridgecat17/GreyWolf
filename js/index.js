$(function () {
    //1.监听游戏规则的点击
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });
    //2.监听关闭按钮的点击
    $(".rule>a").click(function () {
        $(".rule").stop().fadeOut(100);
    });
    //3.监听开始按钮的点击
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        //调用处理进度条的方法
        progressHandler();
        //调用处理灰太狼动画的方法
        wolfAnimation();
        $(".score").text("0");
    });
    //监听重新开始按钮的点击
    $(".again").click(function () {
        $(".mask").stop().fadeOut(100);
        progressHandler();
        //调用处理灰太狼动画的方法
        wolfAnimation();
        $(".score").text("0");
    });
    //监听返回按钮的点击
    $(".close").click(function () {
        $(".mask").stop().fadeOut(100);
        $(".start").stop().fadeIn(100);
    });

    //定义一个专门处理进度条的方法
    function progressHandler() {
        //重新设置进度条的宽度
        $(".progress").css({
            width: 180
        });
        //开始定时器处理进度条
        var timer = setInterval(function () {
            //拿到进度条当前的宽度
            var progressWidth = $(".progress").width();
            //减少当前的宽度
            progressWidth--;
            //将减少的宽度给progress设置
            $(".progress").css("width", progressWidth);
            //监听进度条是否走完
            if (progressWidth <= 0) {
                //已经走完了 关闭定时器
                clearInterval(timer);
                //显示重新开始界面
                $(".mask").stop().fadeIn(100);
                //停止灰太狼的动画
                stopWolfAnimation();
            }
        }, 100);
    }

    var wolfTimer;
    //定义处理灰太狼动画的方法
    function wolfAnimation() {
        //1.定义两个数组保存所有灰太狼和小灰灰的图片
        wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png',
            './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'
        ];
        wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png',
            './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'
        ];
        //2.定义一个数组保存所有可能出现的位置
        arrPos = [{
                left: "100px",
                top: "115px"
            },
            {
                left: "190px",
                top: "142px"
            },
            {
                left: "20px",
                top: "160px"
            },
            {
                left: "105px",
                top: "193px"
            },
            {
                left: "202px",
                top: "212px"
            },
            {
                left: "19px",
                top: "221px"
            },
            {
                left: "120px",
                top: "275px"
            },
            {
                left: "30px",
                top: "295px"
            },
            {
                left: "209px",
                top: "297px"
            }
        ];

        //3.创建一个图片
        var $wolfImg = $("<img src='' class='wolfImg'>");
        //随机获取图片的位置
        var index = parseInt(Math.random() * 9);
        //4.设置图片显示的位置
        $wolfImg.css({
            position: "absolute",
            left: arrPos[index].left,
            top: arrPos[index].top
        });
        //随机获取数组类型
        var wolf = parseInt(Math.random() * 2) == 0 ? wolf_1 : wolf_2;
        //5.设置图片的内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 6;
        wolfTimer = setInterval(() => {
            $wolfImg.attr("src", wolf[wolfIndex]);
            wolfIndex++;
            if (wolfIndex == wolfIndexEnd) {
                $wolfImg.remove();
                clearInterval(wolfTimer);
                wolfAnimation();
            }
        }, 250);

        //6.将图片添加到界面上
        $(".container").append($wolfImg);

        //7.调用处理游戏规则的方法
        gameRules($wolfImg);
    }

    //定义游戏规则方法
    function gameRules($wolfImg) {
        $wolfImg.one("click", function () {
            //修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            //拿到当前点击图片的地址
            var $src = $($wolfImg).attr("src");
            //判断当前图片是小灰灰还是灰太狼 
            var flag = $src.indexOf("h") >= 0;
            //根据点击的图片类型增减分数
            if (flag) {
                //+10
                $(".score").text(parseInt($(".score").text()) + 10);
            } else {
                //-10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }

    //停止灰太狼的动画  
    function stopWolfAnimation() {
        $(".wolfImg").remove();
        clearInterval(wolfTimer);
    }
});