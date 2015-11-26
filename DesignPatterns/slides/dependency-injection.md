Dependency Injection
=======================

---------------------
## Principe

On injecte les dépendances dans le constructeur.

```js
var Machin = function (dependence1, dependence2) {
	dependence1.awesomeMethod();
};
```

-----------------
### Avantages

* Construction des éléments simplifiée
* Gestion des Singletons plus simple
* Module Découplé avec ces dépendances

----
### Incovénient

* Gestion de l'injection complexe
* Difficulté à navviguer entre les modules

--------------------
## Découplage et dependency inversion

Imaginons
```js
var UserManager = function (storage) {
	this.storage = storage;
};

UserManager.prototype.save = function(user) {
	this.storage.setItem('user/' + user.id, user);
}
```

---------------------
On peut faire :

```js
var localManager = new UsermManager(localStorage);
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
Dans les langages typés on dépend d'interface (en plus, c'est facile a Mocker)

```php

class UserManager implements UserManagerInterface
{

	private $storage;

	public function construct(StorageInterface $storage)
	{
		$this->storage = $storage;
	}

	public function save($user)
	{
		$this->storage->setItem('user/'.$user->getId(),  $user);
	}
}
```

```php
Iterface StorageInterface {
	public function setItem($label, $item);
}
```

---------------------------
Toutes les Classes de Symfony Implémentes des interfaces. Pourquoi se priver ?

--------------------------
### Inconvénient : On en sait pas ce qui effectivement inejecté/utilisé.

------------------------
## Mise en place

----------------------
### Ceci n'est pas de l'injection de dépendance !!!

```js
var dep = require('./dep1');

module.export = function() {
	return dep.method();
};
```

C'est une dépendance hardcodé. Les deux modules sont couplés.

On ne peux ni la remplacer, ni la mocker.

------------------------
### L'injection manuelle

```js
var dep1 = new require('dep1')();
var dep2 = new require('dep2')();

var module1 = new require('module1')(dep1, dep2);
var module2 = new require('module2')(dep2, module1);

module2.run();
```

C'est chiant

Mais on voit bien qui dépend de quoi.

---------------------
### Service Locator

```js
var serviceLocator = require('service-locator');
serviceLocator.define('dep1', require('dep1'));
serviceLocator.define('dep2', require('dep2'));
serviceLocator.define('dep3', require('dep3'));

var module = new require('module')(serviceLocator);
```

```js
module.export = function (serviceLocator) {
	var dep1 = serviceLocator.require('dep1');
	var dep3 = serviceLocator.require('dep3');
}
```
----------------------------

Moins chiant à mettre ne place.

On a besoin d'un service locator pour utiliser les plugins.

Les modules ont connaissance des noms de leurs dépendances.

------------------------------
### Denpendency Container

```js
var DIContainer = require('DIContainer');
DIContainer.define('dep1', [], require('dep1'));
DIContainer.define('dep2', [], require('dep2'));
DIContainer.define('dep3', [], require('dep3'));

DIContainer.define('module1', ['dep1', 'dep3'], require('module1'));
DIContainer.define('dep3', ['dep1'], require('module2'));
// dep2 n'est jamais construit
```

Toujours un peu lourd à mettre en place. Mais les modules ne vont plus chercher eux même ce dont ils ont besoins.

On peux envisager rendre le 2ieme paramètre optionnel et utiliser la reflection (comme dans angular).

-------------------------------
### Quelques features sympa pour un container

* Définition par fichiers de conf automatiquement inclus
* Possibilité de lancer des éléments à la construction / au démarrage de l'appli
* Gestion des événements globaux
* Possibilité d'injecter dynamiquement des modules en fonction d'un tag


----------------------------------
## Discussions

--------------------------------
### React

```js
import BattleState from '../../Models/BattleState';
import SwipableCard from './SwipableCard';
import ImageCache from '../../Services/ImageCache';
import React, {
	Component,
		StyleSheet,
		Text,
		View,
		PropTypes,
		Image,
} from 'react-native';

export default class Battle extends Component {

	constructor(props) {
		super(props);

		this.state = {
			battleState: battleState,
			 topImage: battleState.getImage(0),
			 bottomImage: battleState.getImage(1),
		};
	}
}
```
---------------
### Angular

```js
angular.module '%module%.user'
.controller 'RegisterCtrl', ($scope, AccountManager, Redirect, LoadingModal) ->

	$scope.formData =
		user: {},
		civility: 'M.'
	$scope.formErrors = null
```

-------------
### Symfony 2

```php
<?php
namespace AppBundle\Services;
use AppBundle\Exception\PaymentException;
use AppBundle\Model\PaymentFacade;
use AppBundle\Entity\Booking;

class PaymentService
{
	private $mangoPayService;
	private $priceCalculator;

	public function __construct(MangoPayService $mangoPayService, PriceCalculator $priceCalculator)
	{
		$this->mangoPayService = $mangoPayService;
		$this->priceCalculator = $priceCalculator;
	}
}
```
```xml
<service id="payment_service" class="AppBundle\Services\PaymentService">
	<argument type="service" id="mangopay_service"/>
	<argument type="service" id="price_calculator"/>
</service>
```

--------------------
### requireJS 1

```js
define([
	'../Backbone.js',
	'../event/event.manager.js',
	'./user.manager.js'
], function (Backbone, eventManager, userManager) {
	return function() {
	};
});
```

------------------
### requirejs 2

```js
define('piggy-home.view', [
	'Backbone',
	'piggy-actions-buttons.view',
	'piggy-coin-area.view',
	'navigation.manager',
	'analytics',
	'piggy.model',
], function piggyHomeView(
	Backbone,
	ButtonsView,
	CoinAreaView,
	navigation,
	analytics,
	Piggy
) {
	return Backbone.Marionette.LayoutView.extend({
	});
});
```

