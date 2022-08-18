window.onload = function () {
    var regtel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    var tel = document.querySelector('#tel');
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z]\w{6,16}$/;
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd')
    var pwd1 = document.querySelector('#pwd2')
    regexp(tel, regtel);
    regexp(msg, regmsg);
    regexp(pwd, regmsg);
    function regexp(ele, reg) {
        ele.addEventListener('blur', function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 格式正确</span>';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确，请重新输入</span>';
            }
        })
    }
    pwd1.addEventListener('blur', function () {
        if (pwd.value == pwd1.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 格式正确</span>';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>密码不一致，请重新输入</span>';
        }
    })

}