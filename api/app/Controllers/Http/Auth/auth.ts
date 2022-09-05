import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {

    Route.post('/register', 'Auth/AuthController.register')
    Route.post('/login', 'Auth/AuthController.login')
    Route.get('/getUser', 'Auth/AuthController.getUser')
    Route.get('/logout', 'Auth/AuthController.logout')

    

    Route.delete("/delete", "Auth/AuthController.delete")

}).prefix('auth')
