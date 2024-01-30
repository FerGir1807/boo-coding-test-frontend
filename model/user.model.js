const { mongoose } = require('mongoose');

const userModel = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    name: String,
    description: String,
    mbti: String,
    enneagram: String,
    variant: String,
    tritype: Number,
    socionics: String,
    sloan: String,
    psyche: String,
    image: String
});

module.exports = mongoose.models.users || mongoose.model('user', userModel);
