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
    var obj = {"name":$id("name").value, "mail":$id("mail").value ,"contents":$id("contents").value, "date": now.toLocaleString()};
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