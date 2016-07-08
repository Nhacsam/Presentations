Inversion of Control
=======================

---------------------
## Principe

Ce n'est plus toi qui appelle les méthodes de la lib, c'est la lib qui appelle tes fonctions.

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
 - Injection de dépendances
 - Strategy
 - Plugin / Middleware
----------------

## Injection de dépendances

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

Très utile pour éliminer les dépendances à une librairie (pour créer un package npm par exemple)

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

 - On en sait pas ce qui effectivement injecté/utilisé.
 - C'est lourd à mettre en place si ce n'est pas géré par le framework.

--------------------------
## Strategy

Similaire au DI. Mais plus orienté configuration du composant.

 - On prévoit généralement plusieurs implémentations
 - Elles peuvent changer au runtimes

 Exemple : Serializer / Normalizer

------------------------

Très utile pour des application très configurables

Par exemple, le  backend envoie
```json
[
    {
        "displayType": "lineGraph"
    }, {
        "displayType": "barChart"
    }
]
```

On peut faire :
```jsx
const strategies = {
    lineGraph: LineGraph,
    barChart: BarChart
};

const ChartScene = (props) => (
    <Chart strategy={strategies[props.displayType]} data={props.data} />;
);
```


----------------------

## Plugin / Middleware

Permet d'ajouté des modules qui seront exécuté lors de certaines partie du flow.

Contrairement aux listeners, ils ont un impact sur l'entrée et la sortie.

-----------------------

Surtout utile quand on expose une librairy.

Peut-être aussi utile pour refactoriser des actions courantes en début ou en fin de certaines méthodes.

-----------------------

```js
export default function Api() {
    const plugins = [];
    this.use = use;

    function use (plugin) {
        plugins.push(plugin);
    }

    this.fetch = function(route, params, headers = {}) {
        canst config = {params: params, headers: headers}
        reutrn launchPlugin(config)
            .then(function() {
                return fetch (baseUrl + route, config.params, config.headers);
            })
            .then(function(result) {
               const pluginParams = {result: result};
               launchPlugin(pluginParams, true);
               return pluginParams.result;
            });
    }
}
```

--------------------------------

```js

export default function Api() {
    function launchPlugin(params, after) {
        let pluginArray = plugins;
        if (after) {
            pluginArray = _.reverse(_.clone(pluginArray));
        }
        return async.series(pluginArray.map(function(plugin) {
            if (after) {
                return plugin.after(params);
            }
            return plugin.before(params);
        }));
    }
};
// ...
api.use({
    before: (params) => (done) => {
        params.headers.Authorization = 'Bearer ' + token;
        done();
    }
}):

api.use({
    after: (params) => (done) => {
        if (! params.result.error) {
            return done();
        }
        params.result = parseError(params.result);
        done();
    }
}):

```

---------------------------------------
## Résumé


| Pattern | Objectif | Exemple d'utilisation |
| ------- | -------- | --------------------- |
| Dependency Injection | Découplage | Enlever la dependance à un framework, retirer un switch case |
| Strategy | Configuration | Implémenter plusieurs comportements possibles |
| Plugin | Étendre les fonctionnalités | Faire des opérations avant/après une requète

