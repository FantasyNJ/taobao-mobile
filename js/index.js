document.addEventListener('touchstart', function(e){
    e.preventDefault();
});
//为导航添加背景图片
(function(){
    var aProcImgs = document.querySelectorAll('.proc-img');

    for(var i = 0; i < aProcImgs.length;i++){
        aProcImgs[i].style.backgroundImage = 'url("img/proc-'+(i+1)+'.png")';
    }
})();

//实惠栏添加背景图片
(function(){
    var col = document.querySelectorAll('.economy .con-wrap .col');

    for(var i = 0; i < col.length;i++){
        col[i].style.backgroundImage = 'url("img/en-'+(i+1)+'.jpg")';
    }
})();
//好货添加背景图片
(function(){
    var col = document.querySelectorAll('.goods .con-wrap .col');
    for(var i = 0; i < col.length;i++){
        col[i].style.backgroundImage = 'url("img/goods-'+(i+1)+'.jpg")';
    }
})();
//猜你喜欢
var likeData = [
    {
        //img: '',
        name: '[为你推荐][痣] 礼盒冬字款（含2只碗2双筷子）/景德镇高温瓷/瓷碗',
        price: 339
    },
    {
        //img: '',
        name: '[为你推荐]BOLEN穿衣镜子全身镜试衣镜支架简约现代落地镜 壁挂服装店大镜子',
        price: 207
    },
    {
        //img: '',
        name: '[为你推荐]导轨U型滑轨轨道蚊帐1.5m床1.8米床不锈钢铝合金拉幕式免伸缩蚊帐',
        price: 358
    },
    {
        //img: '',
        name: '[为你推荐]品维 十周年果蔬脆礼盒 山东寿光特产 脱水蔬菜干88gX6罐装零食',
        price: 68
    }
];
(function(){
    var list = document.querySelector('.like-list');
    var sHtml = '';
    var len = likeData.length;
    for(var i = 0; i < 3;i++){
        likeData = likeData.concat(likeData);
    }
    likeData.forEach(function(item, index){
        //var name =
        sHtml += '<li><div class="img"></div><div class="name">'+item.name+'</div><div class="price">￥ '+(item.price)+'</div></li>';
    });
    list.innerHTML = sHtml;

    var img = document.querySelectorAll('.like-list .img');
    for(var i = 0; i < img.length;i++){
        img[i].setAttribute('bg-src', 'url("img/like-'+(i%len+1)+'.jpg")');
    }
})();

//轮播图
(function(){
    var banner = document.querySelector(".banner");
    var list = document.querySelector(".banner .list");
    list.innerHTML += list.innerHTML;
    var lis = document.querySelectorAll(".list li");
    var nav = document.querySelectorAll("nav span");

    var startPoint = 0;
    var startX = 0;
    var transX = 0;
    var now = 0;
    var lastTime = 0;

    var distanceX = 0;
    var distanceTime = 0;
    var lastX = 0;
    var nowTime = 0;

    banner.addEventListener('touchstart', function(e){
        clearInterval(timer);
        list.style.transition = 'none';
        //清除速度，防止点击的时候速度还存在
        distanceX = distanceTime = 0;

        lastX = 0;
        lastTime = Date.now();

        now = Math.round(- transX / banner.clientWidth);
        if(now == 0){
            now = lis.length / 2;
        }
        if(now == lis.length-1){
            now = lis.length / 2 - 1;
        }
        startPoint = e.changedTouches[0].pageX;
        transX = -now * banner.clientWidth;
        startX = transX;
        list.style.WebkitTransform = list.style.transform = 'translateX('+transX+'px)';
        e.preventDefault();
        e.stopPropagation();
    });
    banner.addEventListener('touchmove', function(e){
        var newPoint = e.changedTouches[0].pageX;
        var disX = newPoint - startPoint;
        transX = startX + disX;
        list.style.WebkitTransform = list.style.transform = 'translateX('+transX+'px)';

        distanceX = disX - lastX;
        lastX = disX;
        nowTime = Date.now();
        distanceTime = nowTime - lastTime;
        lastTime = nowTime;

        e.stopPropagation();
    });
    banner.addEventListener('touchend', function(e){
        var speed = distanceX / distanceTime;
        if(speed < -0.5){
            now++;
            now = now % lis.length;
        }else if(speed > 0.5){
            now--;
            if(now < 0){
                now = lis.length - 1;
            }
        }else{
            now = Math.round(- transX / banner.clientWidth);
        }
        tab();
        autoPlay();
        e.stopPropagation();
    })

    var timer = null;
    autoPlay();
    function autoPlay(){
        clearInterval(timer);
        timer = setInterval(function(){
            if( now === lis.length - 1 ){
                list.style.transition = 'none';
                now = lis.length / 2 - 1;
                transX = - now * banner.clientWidth;
                list.style.WebkitTransform = list.style.transform = 'translateX('+transX+'px)';
            }
            setTimeout(
                function () {
                    now++;
                    tab();
                },30
            );
        }, 3000);
    }
    function tab(){
        for(var i = 0;i < nav.length;i++){
            nav[i].className = '';
        }
        nav[now%nav.length].className = 'active';
        list.style.transition = '.5s ease-out';
        transX = - now * banner.clientWidth;
        list.style.WebkitTransform = list.style.transform = 'translateX('+transX+'px)';
    }
})();

//滑屏
(function(){
    var wrap = document.querySelector('.wrap');
    var content = document.querySelector('.content');
    var gotop = document.querySelector('.gotop');
    var img = document.querySelectorAll('.like-list .img');  //图片
    imgArr = Array.prototype.slice.call(img);
    var startPoint = 0;
    var transY = css(content, 'translateY');  //content现在的translateY
    var nowTime = 0;
    var lastY = 0;
    var lastTime = 0;
    var distanceY = 0;
    var distanceTime = 0;
    var timer = null;  //返回顶部计时器

    content.addEventListener('touchstart', function(e){
        clearInterval(this.timer);
        clearInterval(timer);
        transY = css(content, 'translateY');
        startPoint = e.changedTouches[0].pageY;
        lastTime = Date.now();
        lastY = css(content, 'translateY');
        distanceY = distanceTime = 0;  //间隔距离和间隔时间清空
    });
    content.addEventListener('touchmove', function(e){
        var newPoint = e.changedTouches[0].pageY;
        var disY = newPoint - startPoint;  //从点击到现在移动的距离
        var nowY = transY+disY;

        if(nowY > 0 ){
            nowY = nowY/4;
        }
        var bottomY = wrap.clientHeight - content.offsetHeight
        if( nowY < bottomY ){
            nowY = bottomY + (nowY - bottomY)/4;
        }

        css(content, 'translateY', nowY);
        //计算移动时相差的距离和时间
        distanceY = css(content, 'translateY') - lastY;
        lastY = css(content, 'translateY');
        nowTime = Date.now();
        distanceTime = nowTime - lastTime;
        lastTime = nowTime;
        //图片按需加载
        imgLoad(nowY);
    });
    content.addEventListener('touchend', function(e){
        var newPoint = e.changedTouches[0].pageY;
        var disY = newPoint - startPoint;
        var transition = 'easeOutStrong';  //运动形式

        var speed = distanceTime === 0 ? 0 : distanceY / distanceTime;
        if(Math.abs(speed) < 1){
            speed = 0;
        }
        transY = transY+disY+speed*400;

        if( transY > 0 ){
            transY = 0;
            transition = 'backOut';
        }
        if( wrap.clientHeight - transY > content.offsetHeight ){
            transY = wrap.clientHeight - content.offsetHeight;
            transition = 'backOut';
        }


        var scrollbar = document.querySelector('.scrollbar');
        //不是点击的情况执行
        if(transY !== css(content, 'translateY')){
            movejs(content, {translateY: transY}, 800, transition,function(){
                //图片按需加载
                imgLoad(transY);
            });
            //滚动条
            movejs(scrollbar, {top: -transY/content.offsetHeight*wrap.clientHeight}, 800, transition,function(){
                scrollbar.style.visibility = 'hidden';
            });
            //返回顶部检测
            var n = 0;
            var allN = 800 / 40;
            timer = setInterval(function(){
                n++;
                
                var top = css(content, 'translateY');
                if(top < -500){
                    gotop.style.display = 'block';
                }else{
                    gotop.style.display = 'none';
                }

                if(n === allN){
                    clearInterval(timer);
                }
            },40)
        }else{
            //点击的情况直接隐藏
            scrollbar.style.visibility = 'hidden';
        }
    });
    //图片按需加载
    function imgLoad(target){
        var i = 0;
        while (i < imgArr.length){
            var item = imgArr[i];
            if(Math.floor(item.getBoundingClientRect().top-target) <= wrap.clientHeight-target ){
                var src = item.getAttribute('bg-src');
                item.style.backgroundImage = src;
                imgArr.splice(i,1);
            }else{
                i++;
            }
        }
    }
})();
//自定义滚动条
(function(){
    var wrap = document.querySelector('.wrap');
    var content = document.querySelector('.content');
    var scrollbar = document.querySelector('.scrollbar');
    var per = Math.round(wrap.clientHeight / content.offsetHeight * 100);
    scrollbar.style.height = per+'%';

    content.addEventListener('touchstart', function(e){
        clearInterval(scrollbar.timer);
        scrollbar.style.visibility = 'visible';
    });
    content.addEventListener('touchmove', function(e){
        var Y = Math.round(-css(content, 'translateY')/content.offsetHeight*wrap.clientHeight);
        css(scrollbar, 'top', Y);
    });
    content.addEventListener('touchend', function(e){

    });
})();
//进入造物节
(function(){
    var startX = 0;
    var startY = 0;
    var make = document.querySelector('.make a');
    make.addEventListener('touchstart', function(e){
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
    });
    make.addEventListener('touchend', function(e){
        var endX = e.changedTouches[0].pageX;
        var endY = e.changedTouches[0].pageY;
        if(endY === startY && endX === startX){
            console.log(this.getAttribute('data-href'))
            window.location = this.getAttribute('data-href');
        }
    })
})();

//头条内容轮播
(function(){
    var ul = document.querySelector('.topline-list');
    var li = document.querySelectorAll('.topline-list li');
    var liHeight = li[0].offsetHeight;
    var n = 0;

    var timer = setInterval(function(){
        n++;
        if(n >= li.length){
            n = 0;
        }
        css(ul , 'translateY', -n*liHeight);
    }, 3000);
})();
//返回顶部
(function(){
    var gotop = document.querySelector('.gotop');
    var wrap = document.querySelector('.wrap');
    var content = document.querySelector('.content');
    var scrollbar = document.querySelector('.scrollbar');
    var startX = 0;
    var startY = 0;

    content.addEventListener('touchmove', function(){
        var top = css(content, 'translateY');
        if(top < -500){
            gotop.style.display = 'block';
        }else{
            gotop.style.display = 'none';
        }
    });

    gotop.addEventListener('touchstart', function(e){
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
    })

    gotop.addEventListener('touchend', function(e){
        var nowX = e.changedTouches[0].pageX;
        var nowY = e.changedTouches[0].pageY;

        if(nowX === startX && nowY === startY){
            movejs(content, {translateY: 0}, 500, 'linear', function(){
                gotop.style.display = 'none';
            })
            //滚动条
            scrollbar.style.visibility = 'visible';
            movejs(scrollbar, {top: 0}, 500, 'linear',function(){
                scrollbar.style.visibility = 'hidden';
            });
        }
    })

})();