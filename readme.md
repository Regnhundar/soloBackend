# Individuell examination Backend med Node.js
Instruktion för uppgiften finns [här.](https://docs.google.com/document/d/1MJNTJo4U2JyGz2sVRwW42vEmDBrAYX8mmAC1IUTvvNM/edit#heading=h.q4mhl65fa75e)  

Det här är fortsättningen på [gruppuppgiften.](https://github.com/Regnhundar/reschedulersBackend)<br><br><br>

# :exclamation: Route /about:  <br>
Routen hanterar information sparad i vår about-databas.<br><br>  

## :small_orange_diamond: Hämta about:  
En GET-förfrågan som hämtar all information som är skrivet i vår about-databas. Informationen hämtas i JSON-format.  

### URL:  
```GET: http://localhost:1337/about```<br><br><br><br>

# :exclamation: Route /auth:  <br>
Routen hanterar registrering, inlogging och utloggning av användare.<br><br><br>

## :small_orange_diamond: Registrera användare:   
POST-förfrågan med JSON-data i body som försöker registrera en ny användare.  
Lyckat anrop loggar in den nyregistrerade användaren.
Nya användare sparas i JSON-data i user-databasen och har automatiskt role: "user".  
För att sätta admin måste man manuellt ändra i databasen.  

### Body:  

```{"username": "Mourinho", "password": "Special1", "email": "mrboring@mail.com"}```  

### URL:   

```POST: http://localhost:1337/auth/register```<br><br><br>

## :small_orange_diamond: Logga in:  
POST-förfrågan med JSON-data i body som försöker logga in en redan existerande användare i vår databas. Vid lyckat anrop loggas användaren in.  

### Body:  

```{"username": "Wenger", "password": "MyWinterCoat9"```<br><br>

> [!TIP]
> Wenger är admin. Använd den här inloggningen för att testa admin-tillstånd.  
<br>

### URL:   

```POST: http://localhost:1337/auth/login```<br><br><br>

## :small_orange_diamond: Logga ut:  

POST-förfrågan som loggar ut en inloggad användare eller returnerar ett fel ifall ingen är inloggad.  

### URL:   

```POST: http://localhost:1337/auth/logout```<br><br><br><br>

# :exclamation: Route /menu:  <br>

Routen hanterar hämtning, tillägg, modifiering och radering av produkter i meny-databasen.<br><br><br>

## :small_orange_diamond: Hämta menyn:  
GET-förfrågan som försöker hämta hem samtliga produkter som är sparade i vår meny-databas. Datan hämtas i JSON-format.  

### URL:  

```GET: http://localhost:1337/menu```<br><br><br>

## :small_orange_diamond: Lägg till produkt i meny:  

POST-förfrågan med JSON-data i body som försöker lägga till en ny produkt i vår meny-databas. Vid lyckat anrop sparas datan i JSON-format.<br>  

> [!WARNING]
> Kräver admin-tillstånd. Logga in som Wenger.  


### Body:  

```{title": "Macaron", "desc": "Franskt kladd. Köp en Kanelbulle istället.", "price": 30}```  

### URL:   

```POST: http://localhost:1337/menu```<br><br><br>

## :small_orange_diamond: Ändra på produkt i meny:  

PUT-anrop med JSON-data i body som försöker ändra på en produkt i vår meny-databas. Om förfrågan lyckas skrivs den gamla informationen över i databasen.<br>  

> [!WARNING]
> Kräver admin-tillstånd. Logga in som Wenger.  


### URL:    

```PUT: http://localhost:1337/menu/:id```  

### URL-parameter:  

:id måste vara en siffra och motsvarar produktens id.  

### Body:  

```{title": "Macaron", "desc": "Franskt kladd. Köp en Kanelbulle istället.", "price": 40}```<br><br><br>

## :small_orange_diamond: Radera en produkt i meny:  

DELETE-förfrågan som försöker radera en produkt i meny-databasen. Vid lyckat anrop raderas produkten.<br>  

> [!WARNING]
> Kräver admin-tillstånd. Logga in som Wenger.  


### URL:   

```DELETE: http://localhost:1337/menu/:id```  

### URL-parameter:  

:id måste vara en siffra och motsvarar produktens id i meny-databasen.<br><br><br><br>

# :exclamation: Route /cart:  <br>

Routen hanterar hur produkter hämtas, läggs till och raderas från cart. Applicerar också aktiva kampanjer.<br><br><br>

## :small_orange_diamond: Hämta produkter i cart:  

GET-anrop som försöker hämta hem produkter som lagts in i cart. Vid lyckat anrop hämtas cart med innehåll.<br>  

> [!NOTE]
> Just nu appliceras kampanjer om några är aktiva via detta anrop.  
<br>

### URL:   

```GET: http://localhost:1337/cart```<br><br><br>

## :small_orange_diamond: Lägg till produkt i cart:  

POST-anrop som försöker lägga till en produkt från meny-databasen i cart.  

### URL:   

```POST: http://localhost:1337/cart/:id```  

### URL-parameter:  

:id måste vara en siffra och motsvarar produktens id i meny-databasen.<br><br><br>

## :small_orange_diamond: Ta bort en produkt från cart:  

DELETE-anrop som försöker ta bort en produkt från cart. Tar bort den första produkten med matchande id.  

### URL:   

```DELETE: http://localhost:1337/cart/:id```  

### URL-parameter:  

:id måste vara en siffra och motsvarar produktens id i meny-databasen.<br><br><br><br>

# :exclamation: Route /orders:  <br>

Routen hanterar tillverkning av orders, hämtning av orderhistorik och leverensstatus av order.<br><br><br>

## :small_orange_diamond: Skapa order:  

POST-förfrågan som vid lyckat anrop hämtar cart och sparar informationen i JSON-format i vår orders-databas. Om en användare är inloggad sparas också datan i den inloggade användarens objekt vår users-databas.  

### URL:   

```POST: http://localhost:1337/orders```<br><br><br>

## :small_orange_diamond: Hämta orderhistorik:  

POST-förfrågan som försöker hämta orderhistoriken av en inloggad användare i vår users-databas. Vid lyckat anrop returneras informationen som JSON-data.  

### URL:   

```POST: http://localhost:1337/orders/user```<br><br><br>

## :small_orange_diamond: Hämta orderstatus:  

POST-anrop som försöker hämta orderstatusen för den inloggade användarens senaste beställning. Vid lyckat anrop returneras antingen aktuell tid för leverans eller om tiden passerat ett meddelande att leveransen redan levererats samt vad ordern innehåller. Datan returneras i JSON-format.  

### URL:   

```GET: http://localhost:1337/orders/status```<br><br><br><br>

# :exclamation: Route /promotions   <br>

Routen hanterar hämtning, addering, aktivering och ändring av kampanjer.<br><br><br>

## :small_orange_diamond: Hämta kampanjer:  

GET-förfrågan som försöker hämta samtliga kampanjer som är sparade i promotions-databasen. Vid lyckat anrop returneras datan i JSON-format.  

### URL:   

```GET: http://localhost:1337/promotions```<br><br><br>

## :small_orange_diamond: Lägg till kampanj:  

POST-förfrågan som skickar med JSON-data i body och vid lyckat anrop läggs datan in i promotions-databasen.<br>  

> [!NOTE]
> Nya kampanjer läggs till som inaktiva. Du behöver göra ett PATCH-anrop på respektive kampanjs id för att toggla status.
<br>  

### Body:  
<br>

> [!IMPORTANT]
> Promotions har tre types. ["free", "package", "shipping"] och beroende på vilken type krävs olika data i body.  
<br>

* FREE:  
```{"type": "free", "code": "svenssonSpecial", "title": "Äventyrligheten själv!", "information": "Du får en gratis kanelbulle vid köp av en slät kopp bryggkaffe!", "items": ["Kanelbulle", "Bryggkaffe"], "freeItem": "Kanelbulle"}```  
* PACKAGE:  
```{"type": "package", "code": "halfOff", "title": "Triple threat!", "information": "Köp 3 Macarons och få dem för halva priset!", "items": ["Macaron", "Macaron", "Macaron"], "discount": 0.5}```  

* SHIPPING:  
```{"type": "shipping", "code": "freeShipping", "title": "Gratis frakt!", "information": "Ja alltså om du är registrerad användare och inloggad."}```   

### URL:   

```POST: http://localhost:1337/promotions```<br><br><br>

## :small_orange_diamond: Aktivera kampanj:  

PATCH-anrop som togglar active: true/false på respektive kampanj i databasen. Nya kampanjer startar alltid som false.  <br>

> [!CAUTION]
> Just nu fungerar det inte att ha fler av samma type av kampanj aktiv.  
<br>

### URL:   

```PATCH: http://localhost:1337/promotions/:id```  

### URL-parameter:  

:id måste vara en siffra och motsvarar kampanjens id i promotions-databasen.<br><br><br>

## :small_orange_diamond: Ändra på kampanj:  

PUT-förfrågan för att ändra på en redan existerande kampanj. Skickar JSON-data i body och vid lyckat anrop skrivs existerande kampanj i databasen över med ny information.  

### Body:  
<br>

> [!IMPORTANT]
> Promotions har tre types. ["free", "package", "shipping"] och beroende på vilken type krävs olika data i body.  
<br>

* FREE:  
```{"type": "free", "code": "svenssonSpecial", "title": "Äventyrligheten själv!", "information": "Du får en gratis kanelbulle vid köp av en slät kopp bryggkaffe!", "items": ["Kanelbulle", "Bryggkaffe"], "freeItem": "Kanelbulle"}```  

* PACKAGE:  
```{"type": "package", "code": "halfOff", "title": "Triple threat!", "information": "Köp 3 Macarons och få dem för halva priset!", "items": ["Macaron", "Macaron", "Macaron"], "discount": 0.5}```  

* SHIPPING:  
```{"type": "shipping", "code": "freeShipping", "title": "Gratis frakt!", "information": "Ja alltså om du är registrerad användare och inloggad."}```  

### URL:   

```PUT: http://localhost:1337/promotions/:id```  

### URL-parameter:  

:id måste vara en siffra och motsvarar kampanjens id i promotions-databasen.  

