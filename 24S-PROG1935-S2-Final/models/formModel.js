const { Schema, model } = require("mongoose");

// TODO: Create a schema
const formSchema = new Schema({
    customerName: { type: String },
    phoneNumber: { type: String },
    mangoJuiceQuantity: { type: Number, default: 0 },
    berryJuiceQuantity: { type: Number, default: 0 },
    appleJuiceQuantity: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
});

// Create a model
const FormModel = model("entries", formSchema);

// Export the model
module.exports = {
    FormModel
};
