const { Schema, model, SchemaTypes } = require('mongoose');

const categorychema = new Schema({
    //id: { type: SchemaTypes.Number, required: true},      //Vemos si usamos el de mongo 
    category: { type: SchemaTypes.String, required: true},
});

const category = model('category', categorychema);
export default category;