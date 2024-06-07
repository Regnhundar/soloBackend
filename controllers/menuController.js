import nedb from 'nedb-promises';
import { currentTime } from '../utility/timeFunction.js';
//Skapar menu-db
export const database = new nedb({
    filename: './data/menu.db',
    autoload: true
});

// @desc GET Hämtar allt på menyn
// @route /menu
export const getMenu = async (req, res, next) => {
    try {
        const menu = await database.find({});
        res.status(200).json(menu);
    } catch (error) {
        next(error);
    }
};

// @desc POST Lägger till ett menu-item
// @route /menu
// @access admin
export const addMenuItem = async (req, res, next) => {
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