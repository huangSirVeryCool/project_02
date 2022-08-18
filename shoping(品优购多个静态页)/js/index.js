// 获取轮播图盒子
var focus = document.querySelector('.focus');
// 获取轮播图
var focusimg = document.querySelector('.focus-img');
// 获取左箭头
var arrowl = document.querySelector('.arrow-l');
// 获取右箭头
var arrowr = document.querySelector('.arrow-r');
// 获取ol小圆点
var round = document.querySelector('.round');
// 获取单张轮播图的宽度
var focusWidth = focus.offsetWidth;
// 记录当前的页数
var num = 0;
// 小圆圈跟随变化
var circle = 0;

// 轮播图下面有几个子元素就生成几个小圆圈
for (var i = 0; i < focusimg.children.length; i++) {
    // 生成节点
    var li = document.createElement('li');
    // 放入round圆圈里面
    round.appendChild(li)
    // 给每个li添加自定义属性
    li.setAttribute('data-index', i);
    // 给每个li添加点击事件
    li.addEventListener('click', function () {
        // 在给背景变色之前，先把所有的li的背景变成没有
        for (var i = 0; i < round.children.length; i++) {
            round.children[i].style.backgroundColor = '';
        }
        // 每次点击小圆圈变化图片的时候把获取图片的索引号给num和circle
        num = this.getAttribute('data-index');
        circle = this.getAttribute('data-index');
        // 所有的li背景颜色都没了再给当前的点击下的a背景改色
        this.style.backgroundColor = 'red';
        // 获取当前li的自定义属性当序号然后乘以单张轮播图的宽度
        var min = this.getAttribute('data-index') * focusWidth;
        // 把获取到的目标距离弄成负数
        animate(focusimg, -min);
    });
}




// 右按钮
arrowr.addEventListener('click', function () {
    // 当页数到了倒数第二张的时候
    if (num == focusimg.children.length - 1) {
        // 把ul的left值设置为0
        focusimg.style.left = '0px';
        // 并且把页数设置为0
        num = 0;
    }
    num++;
    animate(focusimg, -num * focusWidth);
    // 每次点击右侧按钮就让圆圈变量自增
    circle++;
    // 如果圆圈和圆的个数一样大的话
    if (circle == round.children.length) {
        // 把圆圈设置为0重新开始记
        circle = 0
    }
    circle = circle == round.children.length ? 0 : circle;
    // 排他思想，每次点击的时候先把所有的小圆圈的背景设置为无
    for (var i = 0; i < round.children.length; i++) {
        round.children[i].style.backgroundColor = ''
    }
    // 然后把当前的圆圈的背景设置为有
    round.children[circle].style.backgroundColor = 'red'
})
// 创建定时器
var timer = setInterval(function () {
    // 手动调用，右箭头点击事件
    arrowr.click();
}, 2500);


// 左按钮
arrowl.addEventListener('click', function () {
    // 当页数到了第一张的时候
    if (num == 0) {
        // 就把num设置为最后一张图片 
        num = focusimg.children.length - 1;
        // 把ul的left值改为最后一张图片
        focusimg.style.left = -num * focusWidth + 'px';
    }
    // 把页数自减
    num--;
    animate(focusimg, -num * focusWidth);
    // 每次点击左侧侧按钮就让圆圈变量自减
    circle--;
    // 如果圆圈小于0的话
    if (circle < 0) {
        // 把圆圈设置为最后一个重新开始记
        circle = round.children.length - 1;
    }
    // 排他思想，每次点击的时候先把所有的小圆圈的背景设置为无
    for (var i = 0; i < round.children.length; i++) {
        round.children[i].style.backgroundColor = ''
    }
    // 然后把当前的圆圈的背景设置为有
    round.children[circle].style.backgroundColor = 'red'
})
// 复制图片是在生成小圆圈后面写的，所以小圆圈不会多一个
// 复制轮播图的第一张图片
var focusimg_one = focusimg.children[0].cloneNode(true);
// 把复制的第一张图片添加到轮播图的最后面去
focusimg.appendChild(focusimg_one);



// 把第一个圆点的背景弄成红色
round.children[0].style.backgroundColor = 'red';
// 当经过轮播图就把指标显示出来，离开就去掉
focus.addEventListener('mouseover', function () {
    arrowl.style.display = 'block';
    arrowr.style.display = 'block';
    // 当鼠标经过图片的时候就停止定时器
    clearInterval(timer);
    timer = null;
});
focus.addEventListener('mouseout', function () {
    arrowl.style.display = 'none';
    arrowr.style.display = 'none';
    // 鼠标离开的时候就启动定时器
    timer = setInterval(function () {
        arrowr.click();
    }, 2000);
});


// 固定电梯导航
// 固定锁
var flag = true;
var guessTop = $(".recom").offset().top;
// 封装到指定位置显示函数
function toggleTool() {
    if ($(document).scrollTop() >= guessTop) {
        $(".fixedtool").fadeIn();
    } else {
        $(".fixedtool").fadeOut();
    }
}
// 窗口滚动事件
$(window).scroll(function () {
    toggleTool();
    if(flag) {
        $(".floor .w").each(function (i, ele) {
            if ($(document).scrollTop() >= $(ele).offset().top) {
                console.log(i); b
                $(".fixedtool li").eq(i).addClass("current").siblings("li").removeClass("current");
            }
        })
    }
})
// 电梯导航
$(".fixedtool ul li").click(function () {
    // 当点击下导航按钮的时候滚动事件不需要触发
    flag = false;
    $(this).addClass("current").siblings("li").removeClass("current");
    var offsetTop = $(".floor .w").eq($(this).index()).offset().top;
    $("html").stop().animate({
        scrollTop: offsetTop
    }, function () {
        // 等动画结束了，不会滚动了再打开固定锁
        flag = true;
    })
})