
# Les Standards

Et autres normes et conventions dans le code

--------------------
## Pourquoi s'imposer des standarts ?

Réduit ou évite :
 * le temps pour chercher une informations
 * le temps pour comprendre un élément
 * les répétitions
 * les erreurs

--------------------
## Bref: gros gain de maintenabilité

------------------
## Le coding style

Vous y avez tous pensé. Vous savez ce que c'est. On passe

-------------------
## Le Framework / La Lib

Dans chaque des parties qui vont suivre :

*Si votre Framework utilise certaines normes, utilisez les mêmes !!*

------------------
## L'Architecture des Fichiers

3 Écoles : 
 - 1 Dossier par composant minimal qui continent tout (MVC)
 - Séparation par type d'élément (`Controller`, `Views`, `Services`, `Model`)
 - Un peu des deux

--------------------
### The Best Way

```
Component Domain    Framework

./Component:
Calendar       StorageManager

./Domain:
Accounts Cookers  Model

./Framework:
Config      Controllers
```

Pas toujours aussi clair qu'en théorie ...

----------------------------------------------

## Les Convetions de nommage
----------------------
### CamelCase, sneak-case, Choisissez !!!

```
$ ls -R
./automaticSavings:
automatic-choose-date.tpl.html
automatic-choose-date.view.js
automatic-overview.view.js
automatic-validation.tpl.html
automatic.controller.js
automatic.module.js
automatic.router.js


./common:
components
marionette.showAnimated.js
navigation.manager.js
on-mobile.helper.js
promisifyJquery.js
pushInterceptor.js
staticView.factory.js

./common/persistenceLayers:
abstact
backboneAdapteur
objectManagerDispatcher.persistence-layer.js
```

------------------------
### Soyez consistant avec votre code et celui de votre framework

```php

public function findUserById();
public function fetchUserById();
public function searchUser();
public function getUserById();
// ...
```

---------------------
### Donnez des noms a vos éléments et tenez vous y !

--------------------
Si ceci est un User :
```php
class User {
	private $id;
	private $email;
	private $username;
	private $birthday;
}
```
-----------------
Ceci n'en est pas un :
```php
$user = [
	'id' => 1234,
	'email' => 'batman@waine.com',
];
```
------------------
Et donc cette fonction est bien nommée :
```php
public function createUser() {
	return new User();
}
```

Et pas celle là 
```php
public function findUser() {
	return json_decode($this->get('/user/1'));
}
```

-----------------------
Ni celles là :

```php
public function findUsers() {
	return $sqlQuery(
		'SELECT id, email, COUNT(DISTINCT id)'.
		'FROM User'
	)->getResults();
}
```

```php
public function getUsersByBirthday() {
	/** @var User[] */
	$users = $this->findUsers();
	
	$results = [];
	foreach ($users as $user) {
		$date = $user->getBirthDay()->format('Y-M-d');
		if (! $results[$date]) {
			$results[$date] = [];
		}

		$results[$date][] = $user;
	}
	
	return $results;
}
```

--------------------------
### Au dela du nommage, gardez une seule représentation de la même entité

Ou éventuellement avec des transformer pour passer de l'une à l'autre.

--------------------------

