const { Schema, model, SchemaTypes } = require('mongoose');

const reviewSchema = new Schema({
    userId: { type: SchemaTypes.String, required: true },
    restaurantId: { type: SchemaTypes.String, required: true },
    score: { type: SchemaTypes.number, required: true },
    content: { type: SchemaTypes.String, required: true },
    priority: { type: SchemaTypes.number, default: 0 },
});

const user = model('user', reviewSchema);
export default user;