var mongoose    = require("mongoose");
mongoose.set('debug', true);

var UserSchema = new mongoose.Schema({
        name: {type: String,trim: true},
        phone: {type: String,trim: true},
        email: {type: String, trim: true,unique:true},
        address: {type: String},
        reg_date:  { type: Date,default: Date.now}
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);