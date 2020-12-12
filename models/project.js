const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    key: String,
    value: String
}, { collection : 'endb' });

module.exports = mongoose.model('Project', projectSchema);