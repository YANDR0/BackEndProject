const { Schema, model, SchemaTypes } = require('mongoose');

const restaurantSchema = new Schema({
    id: { type: SchemaTypes.String, required: true},
    name: { type: SchemaTypes.String, required: true },
    rating: { type: SchemaTypes.Number, required: true },
    description: { type: SchemaTypes.String },
    category: [ { type: SchemaTypes.Number } ], //0=Fast food, 1=Mariscos, 2=Italiana, etc etc
    location: { type: SchemaTypes.String }, //0=Zapopan, 1=Guadalajara, 2=Tlaquepaque, etc etc
    menu: { type: SchemaTypes.String, required: true }
});

const restaurant = model('restaurant', restaurantSchema);
export default restaurant;