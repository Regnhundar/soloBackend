import nedb from 'nedb-promises';
import { currentTime } from '../utility/timeFunction.js';
//Skapar menu-db
const database = new nedb({
    filename: './data/menu.db',
    autoload: true
});

// @desc GET Hämtar allt på menyn
// @route /menu
export const getMenu = async (req, res, next) => {
    try {
        const menu = await database.find({}).sort({ id: 1 });
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
            let id;
            if (menu.length === 0) {
                id = 1
            } else {
                id = menu[menu.length - 1].id + 1
            }
            const newMenuItem = {
                id: id,
                title: title,
                desc: desc,
                price: price,
                originalPrice: price,
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

// @desc PUT Ändrar ett menu-item med specifikt id.
// @route /menu/:id
// @access admin
export const modifyMenuItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const error = new Error();

        if (isNaN(id)) {
            error.message = "Du måste ange produktens id med siffror";
            error.status = 401;
            throw error;
        }

        const { title, desc, price } = req.body;

        const alreadyInMenu = await database.findOne({ title: title });

        if (alreadyInMenu) {
            if (alreadyInMenu.id !== id) {
                error.message = `${title} finns redan på menyn.`;
                error.status = 400;
                throw error;
            }
            if (alreadyInMenu.title === title && alreadyInMenu.desc === desc && alreadyInMenu.price === price) {
                error.message = `Du har inte ändrat på några uppgifter för ${title}`;
                error.status = 400;
                throw error;
            }
        }

        const updateItem = await database.update(
            { id: id },
            { $set: { title, desc, price, originalPrice: price, modiefiedAt: currentTime() } }
        );

        if (updateItem === 0) {
            error.message = `Kan inte hitta en produkt med id: ${id}`;
            error.status = 404;
            throw error;
        }

        return res.status(200).send({ message: "Meny uppdaterad." });


    } catch (error) {
        next(error)
    }
}

// @desc DELETE Raderar ett menu-item med specifikt id.
// @route /menu/:id
// @access admin
export const deleteMenuItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const error = new Error();
        if (isNaN(id)) {
            error.message = "Du måste ange produktens id med siffror";
            error.status = 401;
            throw error;
        }

        const removeItem = await database.remove({ id: id });
        if (removeItem === 0) {
            error.message = `Kan inte hitta en produkt med id: ${id}`
            error.status = 404;
            throw error

        } else {
            return res.status(200).send({ message: "Meny uppdaterad." });
        }

    } catch (error) {
        next(error)
    }
}

export default database 