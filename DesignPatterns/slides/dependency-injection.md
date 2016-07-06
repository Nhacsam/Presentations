Inversion of Control
=======================

---------------------
## Principe

Ce n'est plus toi qui appelle les méthodes de la lib, c'est la lib qui appelle tes functions.

Au lieu de
```js
const mailer = require('mailer');
function sendUserMail(user) {
    mailer.send('template.html', {name: user.name});
}
```

```js
function sendUserMail(user, mailer) {
    mailer.send('template.html', {name: user.name});
}
```
-----------------
### Applications classiques

 - Callback
 - Injection de dépendance
 - Strategy
 - Middleware
----------------

## Injection de dépendance

Ou l'art de ne pas choisir ses libs.

--------------------
## Découplage et dependency inversion

Imaginons
```js
var UserManager = function (storage) {
	this.save = save;

    function save(user) {
	    storage.setItem('user/' + user.id, user);
    }
};
```

---------------------
On peut faire :

```js
var localManager = new UserManager(localStorage);
var sessionManager = new UserManager(sessionStorage);
var ajaxManager = new UserManager({
	setItem: function(route, user) {
		return $post('/' + route, JSON.stringify(user));
	}
});

var mock = { setItem: sinon.spy() };
var testedManager = new UserManger(mock);
testedManager.save({id: 1]);
expect(mock.setItem.called).to.be.true;
```

C'est le principe de Dependency Inversion.

-----------------------------
### Astuces :

Dans les langages typés on dépend d'interfaces (en plus, c'est facile a Mocker)

-----------------

J'aime bien l'utiliser pour retirer certains switch case.

```js
function Service() {

    this.doSomething = function(action) {
        switch(action) {
            case 'machin':
                machinHandler.handle(action);
                break;
            case 'truc':
                trucHandler.handle(action);
                break;
            //...
        }
    }
}
```

---------------------

```js
function Service(handlers = []) {

    this.addHandler = function(handler) {
        handlers.push(handler);
    }

    this.doSomething = function(action) {
        handlers.forEach(function(handler) {
            if (handler.handledAction !== action) {
                return;
            }
            handler.handle(action);
        });
    }
}
```




--------------------------
### Inconvénient

 - On en sait pas ce qui effectivement inejecté/utilisé.
 - C'est lourd à mettre en place

--------------------------
## Strategy

Similaire au DI. Les grosse différences sont :

 - On prévoit plusieur inmplémentations
 - Elles peuvent changer au runtimes

 Exemple : Serializer / Normalizer

----------------------













