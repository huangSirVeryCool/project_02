function animate(obj, min, fun) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长公式,min（目标距离）-obj.offsetLeft（当前位置）/ 10
        var step = (min - obj.offsetLeft) / 10;
        // 三元运算符判断是否大于0
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 在当前位置等于目标距离的时候就停下
        if (obj.offsetLeft == min) {
            clearInterval(obj.timer);
            // 判断如果有fun的话就调用
            if (fun) {
                fun();
            }
        } else {
            // 把每次增加的步数改成计算出来的步长
            obj.style.left = obj.offsetLeft + step + 'px'
        }
    }, 30);
}