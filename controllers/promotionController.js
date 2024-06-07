import nedb from "nedb-promises"

//Skapar promotions db
const database = new nedb({ filename: "./data/promotions.db", autoload: true });

// @desc GET hämtar alla promotions, även inaktiva. 
// @route /promotions
export const getPromotions = async (req, res, next) => {
    try {
        const promotions = await database.find({});
        res.status(200).json(promotions)
    } catch (error) {
        next(error);
    }
}

// @desc POST Lägger till en kampanj till promotions
// @route /promotions
// @access admin
export const addPromotion = async (req, res, next) => {
    try {
        const { title, desc, price } = req.body;

        const menu = await database.find({}).sort({ id: 1 })

        const alreadyInMenu = await database.findOne({ title: title });

        if (!alreadyInMenu) {
            const newMenuItem = {
                id: menu[menu.length - 1].id + 1,
                title: title,
                desc: desc,
                price: price,
                createdAt: currentTime()
            }
            await database.insert(newMenuItem);

            res.status(201).send({
                data: {
                    newMenuItem,
                    menu
                }
            });
        } else {
            const error = new Error(`${title} finns redan på menyn.`);
            error.status = 400;
            throw error
        }

    } catch (error) {
        next(error)
    }
}

export default database