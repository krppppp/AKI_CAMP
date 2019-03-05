console.log("Loading event")
var aws = require('aws-sdk');
var s3 = new aws.S3({apiVersion: '2006-03-01'});
var mailer = require('nodemailer');

var settings = {
    service: 'Gmail',
    auth: {
        user: 'krppppp@gmail.com',
        pass: '9610pggj',
        port: 25
    }
};

var smtp = mailer.createTransport(settings);

exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var bucket = event.Records[0].s3.bucket.name;
    var key = event.Records[0].s3.object.key;
    s3.getObject({Bucket: bucket, Key: key},
        function(err, data) {
            if (err){
                context.done('error', 'error getting file' + err);
            } else {
                var message = JSON.parse(data.Body);
                var options = {
                    to : 'black@akitennis.co.jp',
                    replyTo : message.mail,
                    subject: message.title+"より",
                    text:"tel:"+ message.tel +"　　" + message.contents + "　　　"+  message.date
                };
                smtp.sendMail(options, function(error, info){
                    if (error){
                        console.log('error:' + error);
                    } else {
                        console.log('Message sent:' + info.response);
                    }
                })
            }
        }
    );
};