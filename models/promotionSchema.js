import Joi from "joi";

const promotionSchema = Joi.object({
    id: Joi.string()
        .min(5).max(15).message("Måste ange ett ID mellan 2 och 15 tecken.")
        .required(),
    title: joi.string()
        .min(5).max(20).message("Måste ange en titel mellan 5 och 20 tecken."),
    information: Joi.string()
        .min(10).max(100).message("Du måste ange en beskrivning mellan 10 och 100 tecken.")
        .required(),
    item1: Joi.string()
        .min(5).max(20).message("Måste ange ett produktnamn mellan 5 och 20 tecken.")
        .required(),
    item2: Joi.string()
        .min(5).max(20).message("Måste ange ett produktnamn mellan 5 och 20 tecken."),
    item3: Joi.string()
        .min(5).max(20).message("Måste ange ett produktnamn mellan 5 och 20 tecken."),
    item4: Joi.string()
        .min(5).max(20).message("Måste ange ett produktnamn mellan 5 och 20 tecken.")
});

export default promotionSchema