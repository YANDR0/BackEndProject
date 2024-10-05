const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
    name: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true },
    password: { type: SchemaTypes.String, required: true },
    role: { type: SchemaTypes.String, default: 'user' },
    location: { type: SchemaTypes.String }, //0=Zapopan, 1=Guadalajara, 2=Tlaquepaque, etc etc
    biography: { type: SchemaTypes.String },
    image: { type: SchemaTypes.String }
});

const user = model('user', userSchema);
export default user;