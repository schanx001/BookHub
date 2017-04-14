/**
 * Created by schanx on 2/27/17.
 */
module.exports = function (app,smtpTransport) {
    var connectionString = 'mongodb://127.0.0.1:27017/bookhub';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    //mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);

    var model = require("./model/models.server")();
    require("./services/review.service.server")(app,model);
    require("./services/user.service.server")(app, model);
    require("./services/organizer.service.server")(app, model);
    require("./services/seller.service.server")(app, model);
    require("./services/sellerBooks.service.server")(app, model);
    require("./services/book.service.server")(app, smtpTransport,model);
};
