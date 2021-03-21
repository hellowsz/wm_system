export default {
  getUrlKey(name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  },
  /**
   * 存储localStorage
   */
  setStore: (name, content) => {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  dateFormat: function(DateTime, fmt) {
    var o = {
      "M+": DateTime.getMonth() + 1, // 月份
      "d+": DateTime.getDate(), // 日
      "H+": DateTime.getHours(), // 小时
      "m+": DateTime.getMinutes(), // 分
      "s+": DateTime.getSeconds(), // 秒
      "q+": Math.floor((DateTime.getMonth() + 3) / 3), // 季度
      S: DateTime.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (DateTime.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  },
  getDeviationMonth(date, offset) {
    let newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + offset);
    return newDate;
  },
  getJS(url, name, callback) {
    if (!document.getElementById(name)) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.id = name;
      if (typeof callback !== "undefined") {
        if (script.readyState) {
          script.onreadystatechange = function() {
            if (
              script.readyState === "loaded" ||
              script.readyState === "complete"
            ) {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = function() {
            callback();
          };
        }
      }
      script.src = url;
      document.body.appendChild(script);
    }
  },
  convertToZH: function(money) {
    var cnNums = new Array(
      "零",
      "壹",
      "贰",
      "叁",
      "肆",
      "伍",
      "陆",
      "柒",
      "捌",
      "玖"
    );
    var cnIntRadice = new Array("", "拾", "佰", "仟");
    var cnIntUnits = new Array("", "万", "亿", "兆");
    var cnDecUnits = new Array("角", "分", "毫", "厘");
    var cnInteger = "整";
    var cnIntLast = "元";
    var chineseStr = "";
    var maxNum = 999999999999999.9999;
    var integerNum;
    var decimalNum;
    var parts;
    if (money === "") {
      return "";
    }
    money = parseFloat(money);
    if (money >= maxNum) {
      // 超出最大处理数字
      return "";
    }
    if (money === 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    money = money.toString();
    if (money.indexOf(".") === -1) {
      integerNum = money;
      decimalNum = "";
    } else {
      parts = money.split(".");
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n === "0") {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          // 归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n, 10)] + cnIntRadice[m];
        }
        if (m === 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    if (decimalNum !== "") {
      var decLen = decimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n !== "0") {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr === "") {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === "") {
      chineseStr += cnInteger;
    }
    return chineseStr;
  },
  setCookie: function(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  getCookie: function(name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  moneyFormatter(val) {
    if (val !== null && val !== undefined && !isNaN(val)) {
      return (+val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    } else {
      return "";
    }
  },
};
