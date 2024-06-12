# Individuell examination Backend med Node.js
Det här är fortsättnigen på [gruppuppgiften.](https://github.com/Regnhundar/reschedulersBackend)
Instruktion för uppgiften finns [här.](https://docs.google.com/document/d/1MJNTJo4U2JyGz2sVRwW42vEmDBrAYX8mmAC1IUTvvNM/edit#heading=h.q4mhl65fa75e)



# Route /about:
## About:
### Beskrivning:  
En GET-förfrågan som hämtar all information som är skrivet i vår about-databas. Informationen hämtas i JSON-format.  
### URL:  
``` GET: http://localhost:1337/about```  

# Route /auth:
## Registrera användare:  
POST-förfrågan med JSON-data i body som försöker registrera en ny användare.  
Lyckat anrop loggar in den nyregistrerade användaren.
Nya användare sparas i JSON-data i user-databasen och har automatiskt role: "user".  
För att sätta admin måste man manuellt ändra i databasen.
### Body:  
```{"username": "Mourinho", "password": "Special1", "email": "mrboring@mail.com"}```
### URL:   
```POST: http://localhost:1337/auth/register```    

## Logga in:
POST-förfrågan med JSON-data i body som försöker logga in en redan existerande användare i vår databas. Vid lyckat anrop loggas användaren in.  
**OBS: Wenger är admin. Använd den här inloggningen för att testa admin-tillstånd.**
### Body:  
```{"username": "Wenger", "password": "MyWinterCoat9"```
### URL:   
```POST: http://localhost:1337/auth/login```
## Logga ut:
POST-förfrågan som loggar ut en inloggade användaren eller returnerar ett fel ifall ingen är inloggad.
### URL:   
```POST: http://localhost:1337/auth/logout```

# Route /menu:
## Hämta menyn:
GET-förfrågan som försöker hämta hem samtliga produkter som är sparade i vår meny-databas. Datan hämtas i JSON-format.
### URL:   
```GET: http://localhost:1337/menu```
## Lägg till produkt i meny:
POST-förfrågan med JSON-data i body som försöker lägga till en ny produkt i vår meny-databas. Vid lyckat anrop sparas datan i JSON-format.
### Body:
```{title": "Macaron", "desc": "Franskt kladd. Köp en Kanelbulle istället.", "price": 30}```
### URL:   
```POST: http://localhost:1337/menu```
### URL:   
```PUT: http://localhost:1337/menu/:id```
### URL:   
```DELETE: http://localhost:1337/menu/:id```

# Route /cart:
### URL:  
```GET: http://localhost:1337/cart```
### URL:  
```POST: http://localhost:1337/cart```
router.post('/', adminAccess, joiHandler(cartItemSchema), addcartItem);
### URL:  
```PUT: http://localhost:1337/cart/:id```
router.put('/:id', adminAccess, joiHandler(cartItemSchema), modifycartItem);
### URL:  
```DELETE: http://localhost:1337/cart/:id```
router.delete('/:id', adminAccess, deleteMenuItem);

# Orders:
### URL:  
```POST: http://localhost:1337/orders```
### URL:  
```POST: http://localhost:1337/orders/user```
### URL:  
```GET: http://localhost:1337/orders/status```

# Promotions 
### URL:  
```GET: http://localhost:1337/promotions```
### URL:  
```POST: http://localhost:1337/promotions```
### URL:  
```PATCH: http://localhost:1337/promotions/:id```
### URL:  
```PUT: http://localhost:1337/promotions/:id```

// 
router.post("/", adminAccess, joiHandler(promotionSchema), addPromotion);

// 
router.patch("/:id", adminAccess, togglePromotion)

// 
router.put("/:id", adminAccess, joiHandler(promotionSchema), modifyPromotion)
