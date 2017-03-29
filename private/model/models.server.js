/**
 * Created by schanx on 3/27/17.
 */
/**
 * Created by schanx on 3/19/17.
 */
module.exports = function (app) {

    var userModel = require("./user/user.model.server.js")();
    var model= {
        userModel: userModel
    };

    userModel.setModel(model);
    return model;
}