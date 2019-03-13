var $id = function(id) { return document.getElementById(id); };
AWS.config.region = "ap-northeast-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: "ap-northeast-1:8b2a3268-dd88-4b7d-8664-558dd2bad800"});
AWS.config.credentials.get(function(err) {
    if (!err) {
        console.log("Cognito Identify Id: " + AWS.config.credentials.identityId);
    }
});

function uploadFile() {
    var s3BucketName = "akichange.com";
    var now = new Date();
    var obj = {"name":$id("name").value, "mail":$id("mail").value ,"tel":$id("tel").value,"contents":$id("contents").value, "date": now.toLocaleString()};
    var s3 = new AWS.S3({params: {Bucket: s3BucketName}});
    var blob = new Blob([JSON.stringify(obj, null, 2)], {type:'text/plain;charset=UTF-8'});
    s3.putObject({Key: "uploads/" +now.getTime()+".txt", ContentType: "text/plain;charset=UTF-8", Body: blob, ACL: "public-read"},
        function(err, data){
            if(data !== null){
                alert("お問い合わせ完了致しました");
            }
            else{
                alert("お問い合わせ失敗" + err.message);
            }
        });
}

window.onload = function () {
    var error1 = document.getElementById('error1');
    var error2 = document.getElementById('error2');
    var error3 = document.getElementById('error3');
    var error4 = document.getElementById('error4');
    var error5 = document.getElementById('error5');
    var button = document.getElementById("css_button");

    button.onclick = function () {
        var check_io = 0;

        var name = document.getElementById("name").value;
        var mail = document.getElementById("mail").value;
        var tel = document.getElementById("tel").value;
        var contents = document.getElementById("contents").value;

        if (name.length == 0){
            error1.innerHTML = "名前を入力してください";
            error1.className = "error active";
            check_io = 1;
        } else {
            error1.innerHTML = "";
        }
        if (mail.length == 0){
            error2.innerHTML = "メールアドレス入力してください";
            error2.className = "error active";
            check_io = 1;
        } else {
            error2.innerHTML = "";
        }
        if (tel.length == 0){
            error3.innerHTML = "電話番号を入力してください";
            error3.className = "error active";
            check_io = 1;
        } else {
            error3.innerHTML = "";
        }
        if (contents.length == 0){
            error4.innerHTML = "問い合わせ内容を入力してください";
            error4.className = "error active";
            check_io = 1;
        } else {
            error4.innerHTML = "";
        }

        if(check_io == 0){
            uploadFile();
            error5.innerHTML = "お問い合わせありがとうございました。";
            window.location.href = `thanks.html`;
        }else{
            error5.innerHTML = "エラーを確認してください。";
            return false;
        }
    };
};
