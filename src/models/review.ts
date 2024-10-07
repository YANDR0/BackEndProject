const { Schema, model, SchemaTypes } = require('mongoose');

const reviewSchema = new Schema({
    userId: { type: SchemaTypes.String, required: true },
    restaurantId: { type: SchemaTypes.String, required: true },
    score: { type: SchemaTypes.Number, required: true },
    content: { type: SchemaTypes.String, required: true },
    priority: { type: SchemaTypes.Number, default: 0 },
});

const user = model('user', reviewSchema);
export default user;