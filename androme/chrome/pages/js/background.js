var fcState = false; // false表示未连接, true表示连接
function activeFc() {
    var iconPath = '';
    if (!fcState) {
        iconPath = 'images/icon2.png';
        fcState = true;
        console.log('active');

        connect();
    } else {
        iconPath = 'images/icon1.png';
        fcState = false;
        console.log('deactive');

        disconnect();
    }
    chrome.browserAction.setIcon({
        path: iconPath
    });
}

chrome.browserAction.onClicked.addListener(activeFc);


function connect() {
    var socket = io.connect('http://localhost'); // TIP: .connect with no args does auto-discovery
    socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
        console.log('connect');
        chrome.browserAction.setPopup('/pages/popup.html')
    });

    socket.on('remote_cmd', function (cmd) {
        console.log('recieve a cmd');
        //log();
        chrome.tabs.executeScript(null, {code:"window.scrollBy(0, 100)"});
        
        chrome.tabs.getSelected(null, function(tab) {
            if (cmd.cmd === 'up') {
                window.scrollBy(0, cmd.moveBy);
            } else if (cmd.cmd === 'down') {
                window.scrollBy(0, cmd.moveBy);
            }
            //chrome.tabs.update(tab.id, {url: 'http://baidu.com'});
        });
    });
}
