const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    fullName: { type: String },
    emailAddress: { type: String, lowercase: true },
});

const NewsletterSubscriber = mongoose.model("subscribers", subscriberSchema);

module.exports = {
    NewsletterSubscriber,
}