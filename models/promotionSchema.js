import Joi from "joi";

const promotionSchema = Joi.object({
    id: Joi.string()
        .min(5).max(15).message("Måste ange ett ID mellan 2 och 15 tecken.")
        .required(),
    title: Joi.string()
        .min(5).max(25).message("Måste ange en titel mellan 5 och 20 tecken."),
    information: Joi.string()
        .min(10).max(100).message("Du måste ange en beskrivning mellan 10 och 100 tecken.")
        .required(),
    items: Joi.array().items(
        Joi.string()
            .min(5).max(15).message("Produktnamn måste vara mellan 2 och 15 tecken.")
    ).min(1).message("Du måste ange minst ett produktnamn.")
        .required()
});

export default promotionSchema