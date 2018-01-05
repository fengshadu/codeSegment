$(function(){
    var payment = '1';//1支付宝 ，2微信
    var jps = $("#jp"),
        tds = jps.find('td'),
        arrays = new Array(),
        payBtn = $("#payBtn"),
        moneyNum = $(".money-num");
    tds.on('touchstart',function(){
        var $this = $(this);
        var text = $this.text();
        
        //判断是支付宝还是微信支付  作对应的按钮反应
        if( payment == 1 ){
            $this.addClass('td-bg-zfb');
            setTimeout(function(){
                $this.removeClass('td-bg-zfb');
            },100)
        }else if( payment == 2 ){
            $this.addClass('td-bg-wx');
            setTimeout(function(){
                $this.removeClass('td-bg-wx');
            },100)
        }

        //判断td是否是x  作对应处理
        if( $this.hasClass('del') ){
            //从数组末尾删除一个
            arrays.pop(text);
            //把数组转换为字符串并赋值
            moneyNum.html( arrays.join('') )
        }else{
            //判断数组的长度
            if( arrays.length > 10 ){
                return false;
            }
            //正则判断输入2个小数   金额
            var reg = /^\d+\.?\d{0,2}$/;
            //数组转换为字符串 并和当前的值拼接
            var moneyStr = arrays.join('') + text;
            //判断金额符合正则表达式且不等于00且不等于0.00
            if( reg.test(moneyStr) && moneyStr != '00' && moneyStr != '0.00' ){
                //往数组里加入元素
                arrays.push(text);
                var moneyStrs = arrays.join('');
                
                //判断数组中第二个值大于0  且  第一个等于0
                if( arrays[1] > 0 && arrays[0] == 0){
                    //删除数组中的第一个
                    arrays.shift();
                }
                moneyNum.html( arrays.join('') )
            }
        }

        //判断金额不等于空 或者 数组对应的字符串小于等于0
        if( moneyNum.text() == '' || arrays.join('') <= 0 ){
            payBtn.find('span').removeClass('bg_wx');
            payBtn.find('span').removeClass('bg_zfb');
            moneyNum.text('0.00');
        }else{
            if( payment == '1' ){
                payBtn.find('span').addClass('bg_zfb').removeClass('bg_wx');
            }else if( payment == '2' ){
                payBtn.find('span').addClass('bg_wx').removeClass('bg_zfb');
            }
        }
    })
})