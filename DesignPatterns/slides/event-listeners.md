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

*Les événements métier* : c'est ceux lié au domaine de votre application. Le PO les comprend (À l'inscription, Lors d'un nouvel achat, ...)

*Les événements "systèmes"* : Les autres (Lors d'une requête AJAX, lors de l'enregistrement dans la BDD, ...)

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


