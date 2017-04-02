/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app) {
    var connectionString = 'mongodb://127.0.0.1:27017/bookhub';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var model = require("./model/models.server")();
    require("./services/user.service.server")(app, model);
    require("./services/book.service.server")(app, model);
};