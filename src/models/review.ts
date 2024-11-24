const { Schema, model, SchemaTypes } = require('mongoose');

const reviewSchema = new Schema({
    userId: { type: SchemaTypes.String, required: true },
    restaurantId: { type: SchemaTypes.String, required: true },
    rating: { type: SchemaTypes.Number, required: true },
    content: { type: SchemaTypes.String, required: true },
});

const review = model('review', reviewSchema);
export default review;