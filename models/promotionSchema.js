import Joi from "joi";

const promotionSchema = Joi.object({
    type: Joi.string()
        .valid('free', 'package', 'shipping')
        .required()
        .messages({
            "any.only": "Endast: free, package och shipping är tillåtna ord."
        }),
    code: Joi.string()
        .min(2).message("Code får minst vara 2 tecken.")
        .max(15).message("Code får högst vara 15 tecken.")
        .required(),
    title: Joi.string()
        .min(5).message("Title får minst vara 5 tecken")
        .max(25).message("Title får högst vara 25 tecken")
        .required(),
    information: Joi.string()
        .min(10).message("Information får minst vara 10 tecken")
        .max(100).message("Information får högst vara 100 tecken")
        .required(),
    items: Joi.array().items(
        Joi.string()
            .min(2).message("Produktnamn får minst vara 2 tecken.")
            .max(15).message("Produktnamn får högst vara 15 tecken.")
    ),
    discount: Joi.number()
        .min(0.01).message("Du måste ange ett decimaltal med ett minumum värde av 0.01 vilket betyder 99% rabatt")
        .max(0.99).message("Du måste ange ett decimaltal med ett maximum värde av 0.99 vilket betyder 1% rabatt")
        .messages({
            "number.base": "Du måste ange ett decimaltal mellan 0.01 och 0.99 Där .6 betyder 40% rabatt"
        }),
    freeItem: Joi.string()
        .min(2).message("Produktnamn får minst vara 2 tecken.")
        .max(15).message("Produktnamn får högst vara 15 tecken.")
});

export default promotionSchema