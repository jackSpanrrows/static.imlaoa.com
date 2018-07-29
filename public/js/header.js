window.onload = function () {
    setInterval(function () {
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份
        var mon = date.getMonth() + 1; //获取当前月份
        var da = date.getDate(); //获取当前日
        var day = Week[date.getDay()]; //获取当前星期几
        var h = date.getHours(); //获取小时
        var m = date.getMinutes(); //获取分钟
        var s = date.getSeconds(); //获取秒
        var d = document.getElementById('show_date');
        var text = '当前时间:' + year + '年' + mon + '月' + da + '日' + '星期' + day + ' ' + h + ':' + m + ':' + s;
        d.innerHTML = text;
    }, 1000);
};

