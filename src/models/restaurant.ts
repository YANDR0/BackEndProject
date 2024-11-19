const { Schema, model, SchemaTypes } = require('mongoose');

const restaurantSchema = new Schema({
    //id: { type: SchemaTypes.String, required: true},      //Vemos si usamos el de mongo 
    name: { type: SchemaTypes.String, required: true },
    rating: { type: SchemaTypes.Number },
    description: { type: SchemaTypes.String },
    category: [ { type: SchemaTypes.String } ],                                     //0=Fast food, 1=Mariscos, 2=Italiana, etc etc
    location: { type: SchemaTypes.String },                                         //0=Zapopan, 1=Guadalajara, 2=Tlaquepaque, etc etc
    image: { type: SchemaTypes.String }
});

const restaurant = model('restaurant', restaurantSchema);
export default restaurant;