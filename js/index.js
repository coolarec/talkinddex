var pid;
function searchInfo() {
    var continer = document.querySelector('#talk');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var p = document.createElement('p');
                p.innerHTML = "历史评论";
                p.className = 'title';
                var res = JSON.parse(xhr.responseText)['data']['data'];
                continer.innerHTML = '';
                continer.appendChild(p);
                res.forEach(function (data) {
                    var div = document.createElement('div');
                    div.id = data.objectId;
                    div.setAttribute('nick', data.nick);

                    var section = document.createElement('section');
                    section.className = 'message -left';


                    var divBalloon = document.createElement('div');
                    divBalloon.className = 'nes-balloon from-left';
                    divBalloon.innerHTML = data.comment;

                    // 添加点击事件监听器
                    divBalloon.addEventListener('click', function () {
                        infodiv(div.id,'回复给→'+div.getAttribute('nick'));
                    });

                    var child = data['children'];
                    section.appendChild(divBalloon);
                    div.appendChild(section);
                    
                    child.forEach(function (childdata) {
                        var section1 = document.createElement('section');
                        section1.className = 'message -right';
                        var div1 = document.createElement('div');
                        div1.className = 'nes-balloon from-right';
                        div1.innerHTML = childdata.comment;
                        section1.appendChild(div1);
                        div.appendChild(section1);
                    });

                    continer.appendChild(div);

                });

            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };

    xhr.open('GET', 'https://talkw.coolarec.link/api/comment?path=me&pageSize=50', true);
    xhr.send();
}
function sendInfo() {
    const nickname = document.getElementById('nickname').value || "匿名";
    const userComment = document.getElementById('comment').value;

    const xhr = new XMLHttpRequest();
    const url = 'https://talkw.coolarec.link/comment'; // 替换为实际的后端接收 POST 请求的 URL
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var info = JSON.parse(xhr.responseText)['errmsg'];
                if (info) {
                    layer.msg(info, { icon: 3 });
                } else {
                    layer.msg('你的消息我已经收到啦！', { icon: 1 });
                }
                console.log(JSON.parse(xhr.responseText)['errmsg']);

            }
        }
    };
    const data = JSON.stringify({ 'at':'匿名',"comment": userComment, "mail": "","nick": nickname,"pid": pid ,'rid':pid,'ua':"",'url':"me"});
    xhr.send(data);
    searchInfo();
    layer.closeAll();
}

win10 = function (win10text) {
    layer.alert('Windows 10 风格主题', {
        skin: 'layui-layer-win10', // 2.8+
        shade: 0.01,
        btn: ['确定', '取消'],
        title: "警告",
        content: win10text,
    })
};
function infodiv(mypid,tname) {
    pid=mypid;
    layer.open({
        type: 1,
        offset: 't',
        anim: 'slideDown', // 从上往下
        area: ['100%', '100%'],
        shade: 0.1,
        shadeClose: true,
        skin: 'sendinfo',
        title: tname,
        id: 'ID-demo-layer-direction-t',
        content: '<div style="width: 80%;margin: 20px auto;" class="nes-container is-dark with-title" id="myElement">\
                <p class="title">发送消息🚀</p>\
                <div class="nes-field">\
                <label for="name_field">不填默认匿名</label>\
                <input type="text" id="nickname" class="nes-input">\
            </div>\
            <label for="textarea_field">写点什么吧</label>\
            <textarea id="comment" class="nes-textarea" rows="10"  placeholder="评论开启了审核系统，所以并不会实时显示" style="font-size:17px;"></textarea>\
            <button type="button" class="nes-btn is-primary" onclick="sendInfo()">发送🙂</button>\
        </div>'
    });
}