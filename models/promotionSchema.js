import Joi from "joi";

const promotionSchema = Joi.object({
    code: Joi.string()
        .min(2).message("Code får minst vara 2 tecken.").max(15).message("Code får högst vara 15 tecken.")
        .required(),
    title: Joi.string()
        .min(5).message("Titel får minst vara 5 tecken").max(25).message("Titel får högst vara 25 tecken"),
    information: Joi.string()
        .min(10).message("Kampanjinformationen får minst vara 10 tecken").max(100).message("Kampanjinformationen får högst vara 100 tecken")
        .required(),
    items: Joi.array().items(
        Joi.string()
            .min(2).message("Produktnamn får minst vara 2 tecken.").max(15).message("Produktnamn får högst vara 15 tecken.")
    )
        .required()
});

export default promotionSchema