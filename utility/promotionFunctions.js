import promotionsDB from "../controllers/promotionController.js";

export const runPromotions = async (cart) => {
    let updatedCart = [...cart];
    const activePromotions = await promotionsDB.find({ active: true });

    if (activePromotions.length >= 1) {

        for (const promotion of activePromotions) {
            switch (promotion.id) {
                case "svenssonSpecial":
                    updatedCart = await freeItem(updatedCart, promotion.items, "Kanelbulle");
                    break

                case "halfOff":
                    updatedCart = await packageDeal(updatedCart, promotion.items, .5);
                    break

            }

        }
    }

    return { updatedCart }
}
// Tar emot cart, en array av krav som ska uppfyllas och vilket föremål som bli gratis.
const freeItem = async (cart, requiredItems, freebie) => {
    const numberOfCombos = comboCount(cart, requiredItems);
    if (numberOfCombos > 0) {
        let freeItemsGranted = 0;
        for (let item of cart) {
            if (item.title === freebie && freeItemsGranted < numberOfCombos) {
                item.price = 0;
                freeItemsGranted++;
            } else if (item.title === freebie && freeItemsGranted >= numberOfCombos && item.price === 0) {

                item.price = item.originalPrice;
            }
        }
    } else {
        for (let item of cart) {
            if (item.title === freebie && item.price === 0) {
                item.price = item.originalPrice;
            }
        }
    }

    return cart;
}



const packageDeal = async (cart, requiredItems, discount) => {
    const numberOfCombos = comboCount(cart, requiredItems);

    // Återställer priset på alla requiredItems som finns i cart.
    for (const requiredItem of requiredItems) {
        for (const cartItem of cart) {
            if (cartItem.title === requiredItem) {
                cartItem.price = cartItem.originalPrice
            }
        }
    }

    if (numberOfCombos > 0) {
        for (let requiredItem of requiredItems) {
            let promotionItems = cart.filter(cartItem => cartItem.title === requiredItem);
            let itemsToDiscount = numberOfCombos * requiredItems.filter(item => item === requiredItem).length
            for (let i = 0; i < promotionItems.length && itemsToDiscount > 0; i++) {
                if (promotionItems[i].price !== 0) {
                    promotionItems[i].price = Math.ceil(promotionItems[i].originalPrice * discount);
                    itemsToDiscount--
                }
            }
        }
    }
    return cart;
}

// const packageDeal = async (cart, requiredItems, discount) => {
//     const numberOfCombos = comboCount(cart, requiredItems);
//     if (numberOfCombos > 0) {
//         for (let requiredItem of requiredItems) {
//             let promotionItems = cart.filter(cartItem => cartItem.title === requiredItem);
//             const originalItem = await menuDB.findOne({ title: requiredItem });
//             for (let i = 0; i < numberOfCombos; i++) {
//                 if (promotionItems[i].price === originalItem.price) {
//                     promotionItems[i].price = Math.ceil(promotionItems[i].price * discount);
//                 }
//             }
//         }
//     }
//     return cart
// }

const validPromotion = (cart, requiredItems) => {
    return requiredItems.every(requiredItem => cart.some(cartItem => cartItem.title === requiredItem))
}

// Går igenom arrayen requiredItems och jämför med cart. Returnerar siffran på kompletta "meals" i cart. 
// Är requiredItems [Bryggkaffe, Cortado] och cart innehåller 2 Bryggkaffe och 1 Cortado returneras 1.
const comboCount = (cart, requiredItems) => {
    const itemCount = {}

    requiredItems.forEach(item => {
        itemCount[item] = (itemCount[item] || 0) + 1;
    });

    let completeCombos = Infinity;

    Object.keys(itemCount).forEach(item => {
        const requiredCount = itemCount[item];
        const cartCount = cart.filter(cartItem => cartItem.title === item).length; // Räknar samtliga items i requiredItems.
        completeCombos = Math.min(completeCombos, Math.floor(cartCount / requiredCount)); // Sätter completeCombos till det lägsta numret av completeCombos och itemCount
    });

    return completeCombos;
};

export const freeUserShipping = () => {
    if (global.currentUser) {
        global.shipping = 0;
    } else {
        global.shipping = 50;
    }
}