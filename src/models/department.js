const schema = mongoose.Schema({
    name:String,
    price:Number
});

module.exports = mongoose.model('department',schema);
