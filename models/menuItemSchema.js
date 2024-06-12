import Joi from "joi";

const menuItemSchema = Joi.object({
    title: Joi.string()
        .min(2).max(15).message("Måste ange en titel mellan 2 och 15 tecken.")
        .required(),
    desc: Joi.string()
        .min(10).max(50).message("Du måste ange en beskrivning mellan 10 och 50 tecken.")
        .required(),
    price: Joi.number()
        .integer().message("Du måste ange heltal. Inga ören!")
        .required()
});

export default menuItemSchema