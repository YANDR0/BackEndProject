const { Schema, model, SchemaTypes } = require('mongoose');

const restaurantSchema = new Schema({
    name: { type: SchemaTypes.String, required: true },
    menu: { type: SchemaTypes.String, required: true },
    rating: { type: SchemaTypes.Number, required: true },
    description: { type: SchemaTypes.String },
    type: { type: SchemaTypes.String }, //0=Fast food, 1=Mariscos, 2=Italiana, etc etc
    reviews: [{ type: SchemaTypes.String }], //array de strings
    location: { type: SchemaTypes.String } //0=Zapopan, 1=Guadalajara, 2=Tlaquepaque, etc etc
});

const restaurant = model('restaurant', restaurantSchema);
export default restaurant;