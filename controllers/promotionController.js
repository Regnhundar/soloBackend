import nedb from "nedb-promises"
import { currentTime } from "../utility/timeFunction.js";
import { compareArrays } from "../utility/utilityFunctions.js";
import menu from "../controllers/menuController.js"

//Skapar promotions db
const database = new nedb({ filename: "./data/promotions.db", autoload: true });

// @desc GET hämtar alla promotions, även inaktiva. 
// @route /promotions
export const getPromotions = async (req, res, next) => {
    try {
        const promotions = await database.find({}).sort({ id: 1 });
        res.status(200).json(promotions)
    } catch (error) {
        next(error);
    }
}

// @desc POST Lägger till en promotion.
// @route /promotions
// @access admin
export const addPromotion = async (req, res, next) => {
    try {
        const { code, title, information, items } = req.body;

        const error = new Error();

        if (items.length > 0) {
            const menuToCheck = await menu.find({});
            const validatePromotionItems = items.every(requiredItem => menuToCheck.some(menuItem => menuItem.title.toLowerCase() === requiredItem.toLowerCase()));
            if (!validatePromotionItems) {
                error.message = `Ett av föremålen du försöker lägga till existerar inte i menyn. Har du stavat fel?`
                error.status = 404
                throw error
            }
        }

        const promotions = await database.find({}).sort({ id: 1 })
        const alreadyAPromotion = await database.findOne({ code: code });

        if (!alreadyAPromotion) {

            let id;
            if (promotions.length === 0) {
                id = 1
            } else {
                id = promotions[promotions.length - 1].id + 1
            }

            const newPromotion = {
                id,
                active: false,
                code,
                title,
                information,
                items,
                createdAt: currentTime()
            }
            await database.insert(newPromotion);

            res.status(201).send({
                data: {
                    newPromotion,
                    promotions
                }
            });
        } else {
            error.message = `Finns redan en kampanj med code: ${code}`
            error.status = 400;
            throw error
        }

    } catch (error) {
        next(error)
    }
}

// @desc PATCH Togglar active true/false på kampanj.
// @route /promotions/:id
// @access admin
export const togglePromotion = async (req, res, next) => {
    try {

        const id = parseInt(req.params.id)

        let promotionToToggle = await database.findOne({ id: id });

        if (promotionToToggle) {

            await database.update(
                { id: id },
                { $set: { active: !promotionToToggle.active, modiefiedAt: currentTime() } }
            );
            // Behöver anropa igen för annars blir inte variabeln i data uppdaterad.
            promotionToToggle = await database.findOne({ id: id });

            res.status(200).send({
                data: {
                    activatedPromotion: promotionToToggle
                }
            });

        } else {
            const error = new Error(`Finns ingen kampanj med id: ${id}`);
            error.status = 404;
            throw error
        }

    } catch (error) {
        next(error)
    }
}

// @desc PUT modifierar kampanj.
// @route /promotions/:id
// @access admin
export const modifyPromotion = async (req, res, next) => {
    try {

        const id = parseInt(req.params.id);

        const { code, title, information, items } = req.body;

        const error = new Error();

        if (items.length > 0) {
            const menuToCheck = await menu.find({});
            const validatePromotionItems = items.every(requiredItem => menuToCheck.some(menuItem => menuItem.title.toLowerCase() === requiredItem.toLowerCase()));
            if (!validatePromotionItems) {
                error.message = `Ett av föremålen du försöker lägga till existerar inte i menyn. Har du stavat fel?`
                error.status = 404
                throw error
            }
        }

        let promotionToModify = await database.findOne({ code: code });

        if (promotionToModify) {
            if (promotionToModify.id !== id) {
                error.message = `Finns redan en promotion med code: ${code}`;
                error.status = 400;
                throw error;
            }

            if (promotionToModify.code === code && promotionToModify.title === title && promotionToModify.information === information && compareArrays(promotionToModify.items, items)) {
                error.message = `Du har inte ändrat på några uppgifter för ${code}`;
                error.status = 400;
                throw error;
            }
        }

        const updatePromotion = await database.update(
            { id: id },
            { $set: { code, title, information, items, modiefiedAt: currentTime() } }
        );

        if (updatePromotion === 0) {
            error.message = `Finns ingen kampanj med code: ${code}`;
            error.status = 404;
            throw error
        }
        // Behöver anropa igen ifall code har ändrats.
        promotionToModify = await database.findOne({ id: id });

        return res.status(200).send({
            data: {
                modifiedPromotion: promotionToModify
            }
        });



    } catch (error) {
        next(error)
    }
}

export default database