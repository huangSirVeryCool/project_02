// 获取元素
var focus = document.querySelector('.focus');
var focusImg = document.querySelector('.focusImg');
var ol = document.querySelector('ol');
// 页数
var index = 0;
// 轮播图的宽度
var w = focus.offsetWidth;
var timer = setInterval(animate, 2000);
// 创建一个变量来判断是否手指有移动，否则手指没移动也要进行判断的话，太浪费资源了
var flag = false;

var flag1 = true;
function animate() {
    index++;
    // 把页数乘以轮播图的宽度就能获得移动距离
    var x = index * w;
    // 给ul添加过渡
    focusImg.style.transition = 'all .3s';
    // 用css3的2d动画然后给X轴移动
    focusImg.style.transform = 'translateX(' + -x + 'px)';
}



// 过渡结束监听事件
focusImg.addEventListener('transitionend', end);
// 结束函数
function end() {
    // 如果页数等于3的话
    if (index >= 3) {
        index = 0;
        // 把过渡效果取消，直接跳到第一张
        focusImg.style.transition = 'none';
        // 获取移动的距离
        var x = index * w;
        // 立即无缝跳转到第一张，等到2秒后定时器再次启动之后的话，过渡又会恢复原状
        // 这个的跳动是在过渡结束监听事件的一瞬间执行的，不会影响定时器
        focusImg.style.transform = 'translateX(' + -x + 'px)';
        // 如果页数小于0的话
    } else if (index < 0) {
        // 把页数变成2
        index = 2;
        // 并且取消动画
        focusImg.style.transition = 'none';
        // 快速跳到
        var x = index * w;
        focusImg.style.transform = 'translateX(' + -x + 'px)';
    }
    // 选出ol里面带有current类名的li，然后删除掉这个类名
    ol.querySelector('.current').classList.remove('current');
    // 再给ol里面当前这个图片对应的li添加类名
    ol.children[index].classList.add('current');
    // 只执行一次的定时器
    focusImg.addEventListener('touchstart', start)
    focusImg.addEventListener('touchmove', move);
    flag1 = true;
}




var startX = 0; // 手指一开始的位置
var moveX = 0; //要移动的距离
// 手指触摸的时候触发
focusImg.addEventListener('touchstart', start)
// 触摸时的函数
function start(e) {
    // 获取手指一开始的位置
    startX = e.targetTouches[0].pageX;
    // 手指触摸的时候就让定时器先停止
    clearInterval(timer);
}



// 手指移动的时候触发
focusImg.addEventListener('touchmove', move);
function move(e) {
    flag = true;
    // 获取要移动的距离，用一开始手指的距离减去手指最后移动的距离
    moveX = (e.targetTouches[0].pageX - startX);
    // 用当前盒子的距离加上要移动的距离就会移动
    var x = -index * w + moveX;
    // 不需要过渡效果，手指是慢慢移动的
    focusImg.style.transition = 'none';
    // 给2d动画x轴移动
    focusImg.style.transform = 'translateX(' + x + 'px)';
}



// 当手指离开屏幕的时候
focusImg.addEventListener('touchend', function () {
    if (flag1) {
        focusImg.removeEventListener('touchstart', start);
        focusImg.removeEventListener('touchmove', move);
        flag1 = false;
        if (flag) {
            // 如果滑动的距离大于了50的话，用绝对值来保证moveX一定是正数
            if (Math.abs(moveX) > 50) {
                // 如果moveX是正数的话就代表的向右滑
                if (moveX > 0) {
                    index--;
                    // 如果moveX是负数的话就代表的向左滑
                } else {
                    index++;
                }
                // 用最新获取的index来跳转图片
                var x = -index * w;
                focusImg.style.transition = 'all .3s';
                focusImg.style.transform = 'translateX(' + x + 'px)';
                // 否则，也就是滑动的距离不大于50的话
            } else {
                // 就获取当前页数然后重新移动到当前图片
                var x = -index * w;
                focusImg.style.transition = 'all .3s';
                focusImg.style.transform = 'translateX(' + x + 'px)';
            }
            flag = false;
        }
        // 在启动定时器之前先把定时器给清除，确保此时只有一个定时器是有用的
        clearInterval(timer);
        timer = setInterval(animate, 2000);
    }
});







// 获取返回顶部按钮
var goback = document.querySelector('.goback');
var nav = document.querySelector('nav');
window.addEventListener('scroll', function () {
    // 页面被卷去的长度大于超过了导航栏距离顶部的距离的话就把按钮显示
    // this.pageYOffset已经被scrollY给代替了
    if (window.scrollY >= nav.offsetTop) {
        goback.style.display = 'block';
    } else {
        goback.style.display = 'none';
    }
})
goback.addEventListener('click', function () {
    animate(window, 0);
    function animate(obj, min, fun) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // 步长公式,min（目标距离）-window.pageYOffset（当前距离顶部的位置）/ 10
            var step = (min - window.pageYOffset) / 10;
            // 三元运算符判断是否大于0
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // 在当前位置等于目标距离的时候就停下
            if (window.pageYOffset == min) {
                clearInterval(obj.timer);
                // 判断如果有fun的话就调用
                // 短路运算符判断，&&表示两边都要有，先判断fun有没有参数传递进来
                // 如果有的话就是true，那就会执行右边的方法
                // 如果没有的话就直接不执行右边的方法
                fun && fun();
            } else {
                // 把每次增加的步数改成计算出来的步长
                // window.pageYOffset = window.pageYOffset + step;
                window.scroll(0, window.pageYOffset + step);
            }
        }, 20);
    }
})

