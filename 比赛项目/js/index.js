// 把所有的navs1放进这个集合里面
var navs1 = document.querySelectorAll('.navs1');
// 把隐藏的ul获取
var navs2s = document.querySelectorAll('.navs2-none');

for (var i = 0; i < navs1.length; i++) {
	navs1[i].addEventListener('mouseover', function() {
		// 获取自定义属性当下标
		var index = this.dataset.index;
		// 让当前li下的ul显示
		navs2s[index].style.display = 'block';
	})
	navs1[i].addEventListener('mouseout', function() {
		var index = this.dataset.index;
		navs2s[index].style.display = 'none';
	})
}
// 获取列表
var list = document.querySelector('#tab-list').children;
// 获取内容
var con = document.querySelector('#tab-con').children;

	for(var i = 0; i < list.length; i++){
		// 给所以列表添加经过事件
		list[i].addEventListener('mouseover', function() {
			for(var i = 0; i < list.length; i++) {
				list[i].style.backgroundColor = '#cccccc';
			}
			this.style.backgroundColor = 'red';
			// 获取当前列表的序列号当下标
			var index = this.dataset.index;
			// 先把所有的内容给隐藏
			for(var i = 0; i < con.length; i++){
				con[i].style.display = 'none'
			}
			// 然后把当前的内容给显示
			con[index].style.display = 'block'
		})
	}
