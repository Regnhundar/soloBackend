import menu from "../controllers/menuController.js";
import { runPromotions } from "../utility/promotionFunctions.js";

//Skapar cart
let cart = []

// @desc GET Hämta hem varukorgen och applicerar kampanjer.
// @route /cart
export const getCart = async (req, res, next) => {
    try {
        const error = new Error();

        if (!cart.length > 0) {
            error.message = 'Varukorgen är tom'
            error.status = 200
            throw error;
        }

        let totalPrice = 0

        const { updatedCart } = await runPromotions(cart);

        cart.forEach(item => totalPrice += item.price);

        res.status(200).send({
            success: true,
            status: 200,
            data: {
                cart: updatedCart,
                shipping: global.shipping,
                total: totalPrice + global.shipping
            }
        });
    } catch (error) {
        next(error)
    }

};

// @desc POST Lägg till i varukorgen
// @route /cart
export const addToCart = async (req, res, next) => {
    try {

        const id = parseInt(req.params.id);

        const error = new Error();

        if (isNaN(id)) {
            error.message = "Du måste ange produktens id med siffror";
            error.status = 401;
            throw error;
        }

        const foundItem = await menu.findOne({ id: id })

        if (!foundItem) {
            error.message = `Finns ingen produkt med id: ${id}`
            error.status = 404
            throw error;
        }


        cart.push(foundItem);

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Produkt tillagd i varukorgen',
            data: { cart }
        })
    } catch (error) {
        next(error);
    }

}

// @desc DELETE Ta bort från varukorgen
// @route /cart/:id
export const removeFromCart = (req, res, next) => {

    const id = parseInt(req.params.id);

    const error = new Error();

    if (isNaN(id)) {
        error.message = "Du måste ange produktens id med siffror";
        error.status = 401;
        return next(error)
    }

    const foundItem = cart.find(item => item.id === id)
    // Om produkten inte finns i varukorgen skickas ett felmeddelande
    if (!foundItem) {
        error.message = 'Produkten finns inte i varukorgen';
        error.status = 404;
        return next(error)
    }

    // Om produkten finns i varukorgen letar vi upp dess index och tar bort den
    cart.splice(cart.indexOf(foundItem), 1)
    res.status(200).send({
        success: true,
        status: 200,
        message: 'Produkt borttagen från varukorgen',
        data: { cart }
    })
}

export default cart;