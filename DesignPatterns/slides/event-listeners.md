Event Listeners
===========

Et le pattern Observer

-----------------------
## Principe

On lance un événement quelque part

```js
obj.trigger('event:name', subject);
```

On l'attrape plus loin

```js
obj.on(function(subject) {
	// do something
});
```

-------------------------------
### Avantages

- Découplage
- Offre une API flexible et puissante à un plugin

### Inconvénient

- Pas de visibilité sur les effets d'une fonction

---------------------
## Quand l'utiliser

Tout est une question de découplage et de responsabilité.

-------------------------
### Responsabilité ?

Une méthode/objet/module/fonction doit avoir une seule et unique responsabilité bien définit.

-----------------------
### Exemple :

```js

UserController.prototype.registerValidation = function(formInfo) {
	var user = createUserFromForm(formInfo);
	userRepository.save(user);

	// is it the best place to do it ?
	sendConfirmationMail(user);
	logNewUserRegistered(user);
	doAnalyticsStuff();

	return this.template('user/registration/validation.jade', {user: user});
};
```

-------------------------------
### Refactorisation

```js

UserController.prototype.registerValidation = function(formInfo) {
	var user = createUserFromForm(formInfo);
	userRepository.save(user);

	eventManager.trigger('user:registration', user);

	return this.template('user/registration/validation.jade', {user: user});
};

// in the domain mailer module
eventmanager.on('user:registration', function() {
	sendconfirmationmail(user);
});
```

---------------------------------
### Bilan

- Le controller n'a plus à ce soucier de chose qui ne le concerne pas : plus lisible
- On peut ajouter/retirer des choses à faire sans toucher au controller
- On peut changer de système de log sans aller chercher tous les appels

--------------------------------
### Attention : Laissez au controller sa responsabilité !


```js

UserController.prototype.registerValidation = function(formInfo) {
	var user = createUserFromForm(formInfo);
	eventManager.trigger('user:registration', user);

	return this.template('user/registration/validation.jade', {user: user});
};

// Somewhere else
eventmanager.on('user:registration', function() {
	userRepository.save(user);
});
```

(true story)

---------------------
## Événements Métier

Deux type d'événements:

**Les événements métier** : c'est ceux lié au domaine de votre application. Le PO les comprend (À l'inscription, Lors d'un nouvel achat, ...)

**Les événements "systèmes"** : Les autres (Lors d'une requête AJAX, lors de l'enregistrement dans la BDD, ...)

-------------------
### Pourquoi faire la distinction

Imaginons

```js

UserController.prototype.registerValidation = function(formInfo) {
	var user = createUserFromForm(formInfo);
	userRepository.save(user);

	// Domain Event
	eventManager.trigger('user:registration', user);

	return this.template('user/registration/validation.jade', {user: user});
};

UserRepository.prototype.save = function(user) {
	db.query('INSERT INTO ...');

	// System Event
	this.trigger('user:save');
}
```

----------------------------------------
Si je fait :

```js
userRepository.on('user:save', function() {
	userRepository.save(user);
});
```

Alors que ce passera t'il ici ?
```
function migrateUserToV2() {
	var usersV1 = userRepositoryV1.findAll();

	_.each(usersV1, function(userV1) {
		var user = transformer.transform(userV1);
		userRepository.save(user); // Enjoy the spam
		userRepositoryV1.remove(userV1);
	});
}
```

--------------------------------------
### Utilisez des événements métier pour vos traitement métier

-------------------------------------
## Événements Locaux et Globaux

-----------------------------------
### Événements Locaux

```js
UserRepository.prototype.save = function(user) {
	this.trigger('user:save');
}
```

Pour l'écouter, on a besoin de l'instance de l'objet qui l'a lancé :

```js
userRepository.on('user:save', function () {
	// Doing stuff
});
```

------------------------

C'est le pattern Observer.
```js
var Obeserver = function (subject) {
	subject.on('event', this.dostuff);
};
```

C'est une très bonne manière s'offrir une API pour étendre un module.

On a besoin de connaitre l'instance qui lance l'événement.

------------------------------------
### Événements globaux

Pour les événements métier, on s'en fou de savoir qui l'a généré.

On délègue à un service externe.

```js
var RegisterValidationController = function(eventManager) {
	eventManager.trigger('user:registration', user);
};

angular.controller('RegisterValidationController', [
	'$rootScope',
	RegisterValidationController,
]);
```

--------------------
## Deniers Conseils

------------------
### Si vous devez lancer qu'un événement, lancez le à la fin

```php
	public function registerAction() {
		$em = $this->get('doctrine.orm.entity_manager');
		$user = new User();
		$em->persist($user);

		// Ici, la requête SQL n'a pas encore été faîte. L'utilisateur n'a pas d'id
		$this->get('event.dispatcher')
			->dispatch('user.register.init', new UserEvent($user));

		$em->flush();

		// ici, on est plus tranquille
		$this->get('event.dispatcher')
			->dispatch('user.register', new UserEvent($user));
	}
```

-----------------------
### Considérez un listener comme indépendant du celui qui envoie l'événement

```php
	// On nomme une fonction en fonction de ce qu'elle fait
	// Pas en fonction de quand elle est appelé !
	public function onUserRegister($event) {
		$user = $event->getUser();
		$user->setCreationDate(new Date());
		$this->em->persist($user);

		// On effectue la Requête SQL
		// Même si il va y avoir une requête par listener
		$this->em->flush($user);
	}
```

Si on a besoin de savoir dans quel ordre sont appelé les listeners, ça sens pas bon.

------------------------
### Votre fonction n'est pas sensé changer de comportement en fonction des listeners

```php
	public function registerAction(Request $request) {
		// stuff
		if ($form->isValid()) {
			// stuff
			$event = new FormEvent($form, $request);
			$dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);

			// meh.
			if (null === $response = $event->getResponse()) {
				$url = $this->generateUrl('fos_user_registration_confirmed');
				$response = new RedirectResponse($url);
			}
			return $response;
		}
	}
```

Les middlewares, les intercepteurs, l'inversion de contrôle, ... Vous avez le choix.

------------------------------
## Examples

* SogeLab: [code1](https://github.com/bamlab/soge-lab-epargne/blob/master/src/automaticSavings/automatic.controller.js#L125) - [code2](https://github.com/bamlab/soge-lab-epargne/blob/master/src/projects/projects.controller.js#L107)

* parkadom: [code1](https://github.com/bamlab/parkadom-app/blob/dev/src/menu/profile/controllers/profileEdit.controller.coffee#L14) - [code2](https://github.com/bamlab/parkadom-app/blob/dev/src/menu/cards/controllers/cardsList.controller.coffee#L10)

* millecooker: [code1](https://github.com/bamlab/millecooker-backend/blob/dev/api/controllers/MessageController.js#L15)
