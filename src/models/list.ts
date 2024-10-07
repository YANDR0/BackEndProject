const { Schema, model, SchemaTypes } = require('mongoose');

const listSchema = new Schema({
    userId: { type: SchemaTypes.String, required: true},
    restaurantId: { type: SchemaTypes.String, required: true},
    category: [ { type: SchemaTypes.String} ],
    score: { type: SchemaTypes.Number },
}); 

const user = model('list', listSchema);
export default user;