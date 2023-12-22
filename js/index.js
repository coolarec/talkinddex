function searchInfo() {
    var continer = document.querySelector('#talk');
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var res = JSON.parse(xhr.responseText)['data'];
                continer.innerHTML = '';
                res.forEach(function(data) {
                    var section = document.createElement('section');
                    section.className = 'message -left';


                    var divBalloon = document.createElement('div');
                    divBalloon.className = 'nes-balloon from-left';
                    divBalloon.innerHTML = data.comment; // 使用评论数据中的内容

                    section.appendChild(divBalloon);
                    continer.appendChild(section);
                });
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };

    xhr.open('GET', 'https://talkw.coolarec.link/api/comment?type=recent', true);
    xhr.send();
}
function send() {
    const nickname = document.getElementById('nickname').value||"匿名";
    const userComment = document.getElementById('comment').value;

    const xhr = new XMLHttpRequest();
    const url = 'https://talkw.coolarec.link/comment?lang=zh-CN'; // 替换为实际的后端接收 POST 请求的 URL
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            var info=JSON.parse(xhr.responseText)['errmsg'];
            if(info){
                layer.msg(info, {icon: 3});
            } else{
                layer.msg('你的消息我已经收到啦！', {icon: 1});
            }
          console.log(JSON.parse(xhr.responseText)['errmsg']);

        }
      }
    };
    const data = JSON.stringify({"comment":userComment,"nick":nickname,"mail":"","link":"","url":"/","ua":""});
    xhr.send(data);
    layer.close(index);
  }
