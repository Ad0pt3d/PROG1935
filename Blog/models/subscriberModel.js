const mongoose = require('mongoose');

// Create a schema
const subscriberSchema = new mongoose.Schema({
    fullName: { type: String },
    emailAddress: { type: String, lowercase: true},
});

// Create a model
const BlogSubscriber = mongoose.model("subscribers", subscriberSchema);

// Export the model
module.exports = {
    BlogSubscriber,
}