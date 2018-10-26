chrome.extension.onRequest.addListener(//监听扩展程序进程或内容脚本发送请求的请求
    function (request, sender, sendResponse) {
        if (request.action == "GetDc") {
            sendResponse({ dc: document.documentElement.innerHTML });
        }
    }
);