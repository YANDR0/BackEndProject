const { Schema, model, SchemaTypes } = require('mongoose');

const imageSchema = new Schema({
    url: { type: SchemaTypes.String, required: true },
    uploadedAt: { type: SchemaTypes.Date, default: Date.now },
});

const image = model('image', imageSchema);
export default image;
