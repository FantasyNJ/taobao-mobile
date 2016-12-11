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
        //img[i].setAttribute('bg-src', 'url("img/like-'+(i%len+1)+'.jpg")');
        img[i].style.backgroundImage = 'url("img/like-'+(i%len+1)+'.jpg")';
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
    var startPoint = 0;
    var transY = css(content, 'translateY');  //content现在的translateY
    var nowTime = 0;
    var lastY = 0;
    var lastTime = 0;
    var distanceY = 0;
    var distanceTime = 0;

    content.addEventListener('touchstart', function(e){
        startPoint = e.changedTouches[0].pageY;
        content.style.transition = 'none';
        lastTime = Date.now();
    });
    content.addEventListener('touchmove', function(e){
        var newPoint = e.changedTouches[0].pageY;
        var disY = newPoint - startPoint;  //从点击到现在移动的距离

        content.style.WebkitTransform = content.style.transform = 'translateY('+(transY+disY)+'px)';
        //计算移动时相差的距离和时间
        distanceY = disY - lastY;
        lastY = disY;
        nowTime = Date.now();
        distanceTime = nowTime - lastTime;
        lastTime = nowTime;
    });
    content.addEventListener('touchend', function(e){
        var newPoint = e.changedTouches[0].pageY;
        var disY = newPoint - startPoint;
        var speed = distanceY / distanceTime;
        if(Math.abs(speed) < 1){
            speed = 0;
        }

        transY = Math.round(transY+disY+speed*800);
        if( transY > 0 ){
            transY = 0;
        }
        if( -transY + wrap.clientHeight > content.offsetHeight ){
            transY = wrap.clientHeight - content.offsetHeight;
        }
        content.style.transition = '.8s ease-out';

        content.style.WebkitTransform = content.style.transform = 'translateY('+transY+'px)';
    });
})();
//自定义滚动条
(function(){
    var wrap = document.querySelector('.wrap');
    var content = document.querySelector('.content');
    var scrollbar = document.querySelector('.scrollbar');
    var per = Math.round(wrap.clientHeight / content.offsetHeight * 100);
    scrollbar.style.height = per+'%';

    content.addEventListener('touchstart', function(e){
        scrollbar.style.visibility = 'visible';
    });
    content.addEventListener('touchmove', function(e){

    });
    content.addEventListener('touchend', function(e){
        scrollbar.style.visibility = 'hidden';
    });
})();