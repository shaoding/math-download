var value="";

chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendRequest(tab.id, { action: "GetDc" }, function (response) {
        value = response.dc;

        var eleButton = document.querySelector('input[type="button"]');
        if ('download' in document.createElement('a')) {
            // 作为test.html文件下载
            eleButton.addEventListener('click', function () {
                res = parseMath(value);
                funDownload(res, 'math.txt');    
            });
        } else {
            eleButton.onclick = function () {
                alert('浏览器不支持');    
            };
        }
    });
});

// 下载文件方法
var funDownload = function (content, filename) {
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

var parseMath = function (content) {
    var reg = /<math([\S\s]*?)<\/math>/g;
    var match = content.match(reg);
    var res = '';
    if (match) {
        res =  match.join('\n');
    } else {
        res = "未匹配到公式！"
    }
    return res;
}
