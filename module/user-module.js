const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    googleId: String,
    rentals: [],
    properties: [],
},{
    timestamps: true
});

// const bookingSchema = new Schema(
//     {
//       event: {
//         type: Schema.Types.ObjectId,
//         ref: "Event"
//       },
//       user: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//       }
//     },
//     //so mongoose will provide a created/updated timestamp
//     { timestamps: true }
//   );
  
//   module.exports = mongoose.model("Booking", bookingSchema);

const PropertiesSchema = mongoose.Schema({
    name: String,
    description: String,
    owner_id: mongoose.Types.ObjectId,
    images: [],
},{
    timestamps: true
});

const User = mongoose.model('user',userSchema);
// const bookingSchema = mongoose.model("Booking", bookingSchema);
const properties = mongoose.model('Properties', PropertiesSchema);

module.exports = User;
