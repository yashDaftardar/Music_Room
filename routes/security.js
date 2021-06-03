
async function CheckAuthencation(req, callback) {
    var access_service = [{
        name: 'signUpPage'
    },{
        name: 'registration'
    }, {
        name: 'forgetPassword'
    }, {    
        name: 'login'
    }, {
        name: 'homePage'
    }, {
        name: 'changePassword'
    }];

    var return_data = access_service.filter(element => {
        var re = new RegExp(element.name, 'g');
        if (req.originalUrl.match(re)) {
            return true;
        }
    });

    if(return_data.length){
        callback({"res" : 0, "msg" : "success"});
    }else{
        callback({"res" : 1, "msg" : "User not authorized"});
    }
}

module.exports = CheckAuthencation;