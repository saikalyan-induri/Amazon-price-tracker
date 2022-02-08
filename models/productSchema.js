const mongoose = require('mongoose');

const currUserSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    ID:{
        type: String,
    },
    photo:{
        type: String,
        default:"https://cdn.vox-cdn.com/thumbor/Jb2X5lJUrIJtKw9eI3hbSYurZyU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22449912/DS_Still_21.jpg",
    },
    title:{
        type: String,
        default: "",
    },
    
});

module.exports = currUserSchema;