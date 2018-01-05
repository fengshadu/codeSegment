var IdCard = {
  /**
		 *	@brief	校验字符串是否为合法的15或18位身份证号码
		 *
		 *	@param 	string 	待校验的字符串
		 *
		 *	@return	<#return value description#>
		 */
		verifyIsIdCard: function(string) {
			var length = string.length;
		    if (length != 15 && length != 18) {
		        return false;
		    }
		    if (15 == length) {
		    	// 校验是否为纯数字
		        if (!this.verifyIsPureInt(string)) {
		            return false;
		        }
		        // 规则校验
		        var iCheck = new Array(15);
		        var num;
		        for(var i = 0; i < 15; i++) {
		            num = string.charAt(i);
		            iCheck[i] = parseInt(num);
		        }
		        var iMonth = iCheck[8]*10 + iCheck[9];
		        if (iMonth <= 0 || iMonth > 12) {
		            return false;
		        }
		        var iDay = iCheck[10]*10 + iCheck[11];
		        if (iDay <= 0 || iDay > 31) {
		            return false;
		        }
		        //end 校验规则
		    }
		    if (18 == length) {
		        var checkNum = string.substr(0, 17);
		        var check = string.substr(17, 1);
		        if (!this.verifyIsPureInt(checkNum)) { 
		            return false;
		        }
		        if (!this.verifyIsPureInt(check) && check != "X" && check != "x") {
		            return false;
		        }
		        //规则校验
		        var iCheck = new Array(18);
		        var num;
		        for(var i = 0; i < 17; i++) {
		            num = string.charAt(i);
		            iCheck[i] = parseInt(num); 
		        }
		        var iYear = iCheck[6]*10 + iCheck[7];
		        if (iYear < 19 || iYear > 20) {
		            return false;
		        }
		        var iMonth = iCheck[10]*10 + iCheck[11];
		        if (iMonth <= 0 || iMonth > 12) {
		            return false;
		        }
		        var iDay = iCheck[12]*10 + iCheck[13];
		        if (iDay <= 0 || iDay > 31) {
		            return false;
		        }
		        var sum = 0;
		        var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		        var list = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
		        for (var i = 0; i < 17; i++) {
		            sum += iCheck[i] * wi[i];
		        }
		        var iCheckNum = sum % 11;
		        var checkCode = list[iCheckNum];
		        if ("x" == check || "X" == check) {
		            if (checkCode != 'X') {
		                return false;
		            }
		        } else {
		            if (parseInt(check) != (checkCode-'0')) {
		                return false;
		            }
		        }
		        //end 规则校验
		    }
		    //end 规则校验
		    return true;
		},
    /**
		 *	@brief	校验字符串是否为纯数字
		 *
		 *	@param 	string 	待校验的字符串
		 *
		 *	@return	true或者false，分别表示待校验的字符串是否为纯数字
		 */
		verifyIsPureInt: function(string) {
		    for (var i = 0; i < string.length; i++) {
		        var character = string.charAt(i);
		        if (character < '0' || character > '9') {
		            return false;
		        }
		    }
		    return true;
		}
}