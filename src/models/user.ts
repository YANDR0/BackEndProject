const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
    //id: { type: SchemaTypes.String},      //Vemos si usamos el de mongo 
    name: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true },
    password: { type: SchemaTypes.String },
    role: { type: SchemaTypes.String, default: 'user' },
    location: { type: SchemaTypes.String }, //0=Zapopan, 1=Guadalajara, 2=Tlaquepaque, etc etc o el lugar también :v
    biography: { type: SchemaTypes.String },
    image: { type: SchemaTypes.String },
    status: { type: SchemaTypes.Number, require: true}
});

const user = model('user', userSchema);
export default user;