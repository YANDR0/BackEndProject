const { Schema, model, SchemaTypes } = require('mongoose');

const categorychema = new Schema({
    id: { type: SchemaTypes.number, required: true},
    category: { type: SchemaTypes.String, required: true},
    type: { type: SchemaTypes.String, required: true},
});

const user = model('category', categorychema);
export default user;