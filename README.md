# RateMyVeganProduct
Angular App to rate Products and Vote for best Products in Categories. Because of the german audiance, the app is developed for, most of the frontend language is in german. But feel free to build up different languages or language options.
In future there should be a region server, because of the different products in different countries.

# Work in Progress Screenshot
![nopic](https://github.com/valplusplusle/RateMyVeganProduct/blob/master/preview.png)

# Technical Infos
The App is build in Angular with the Angular CLI. In Future you can start it as native android app on your phone. But here we will use the app just for a headless browser like electron on pc. (Just with a littlebit of caching).
Focus is that nobody needs an account to use the app. But there is a mechanism missing atm. to check if the content the user posts is okay.
The backend ist fully nodejs with express and uses a nedb as database.
