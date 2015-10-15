
# Les Standards et conventions

Ou plus généralement, comment ajouter de la clarté à votre code.

-------------------
## Objectifs

 * Qu'on ne puisse pas reconnaitre qui a fait quelle ligne de code
 * Être capable de deviner ce que fait une classe / méthode sans lire le code

--------------------
## Pourquoi ?

Réduit ou évite :
 * le temps pour chercher une informations
 * le temps pour comprendre un élément
 * les répétitions
 * les erreurs

--------------------
### Bref: gros gain de maintenabilité

-------------------
## Le Framework / La Lib

Dans chaque des parties qui vont suivre :

*Si votre Framework utilise certaines normes, utilisez les mêmes !!*

------------------
## Le coding style

 * Améliore la lecture
 * Facilite les CR
 * Évite les erreurs courantes

-------------------
### Dans le même style, définissez :
 * L'architecture des fichiers
 * La manière de les nommer

----------------------------------------------
## Les Conventions de nommage

------------------------
### Soyez consistant

```php
public function findUserById();
public function fetchUserById();
public function searchUser();
public function getUserWithId();
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
--------------------------
### Au delà du nommage, gardez une seule représentation de la même entité

Ou éventuellement avec des transformer pour passer de l'une à l'autre.

Risques :
 * Ne pas pouvoir utiliser une méthode qui attend un objet alors qu'on a un tableau
 * Que certaines modifications ne s'applique pas à certaines portions de code

--------------------------
### N'hésitez pas à définir explicitement un type d'objets

Ceci définit un transformer :
```js
var Transformer = function () {};

Transormer.prototype.transform = function(object) {
	throw Error('Not Implemented');
};

Transformer.prototype.reverseTransform = function(transformedObject) {
	throw Error('Not Implemented');
};
```

----------------------------
### Ou un type de paramètre

```js
var PaginationParameter = function (page, pageSize) {
	this.page = page || 1;
	this.pageSize = pageSize || 20;
};

PaginationParameter.prototype.getOffset = function() {
	return (this.page -1) * this.pageSize;
}
```

----------------------
## Les Designs Patterns

Les Designs patterns sont le meilleur moyen de faire comprendre ce à quoi sers une classe.

```js
UserFactory
MagopayAdapter
BackboneWrapper
```

------------------------
## Les rôles des éléments

Conservé les même rôles pour les même type d'éléments.

Exemples:
 * Seul le controller connait la vue qui est affiché
 * Seulement une vue ou une directive peut manipuler le DOM
 * Pas de requête SQL en dehors des repository
 * Les repository ne font pas autre chose que des requêtes SQL

--------------------
### Quel est le meilleur moment pour mettre en place ces pratiques ?

------------------
## La Code Review

------------------------
### Commencez à lire le nom des méthodes et des classes et vérifiez que ça fait bien ce que vous pensiez.

Ci ce n'est pas le cas, ce n'est pas que vous êtes débile, c'est que c'est mal nommé.

------------------------
### Vérifiez que vous avez compris la manière dont le code est organisé

Pour faire pareil ensuite.

--------------------------
### N'hésitez pas à vous mettre d'accord sur une manière de faire après coup.

Même si il faut modifier une partie du code.

"Tiens, tu appelles directement le repository. Jusqu'à maintenant je passais toujours par un manager."

---------------------------
### La CR ne sert pas à trouver des bugs

Juste les plus courants. C'est le rôles des tests fonctionnels.

-----------------------------
## Quelques exemple de CR

----------------------
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
```
```
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

-----------------------
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

---------------------------


#### Sogelab
[pr1](https://github.com/bamlab/soge-lab-epargne/pull/56/files#diff-cce6907e104f30be2bdef59589018a88R1) -
[pr2](https://github.com/bamlab/soge-lab-epargne/pull/89/files#diff-125bd100581062e8cc6511b98a329b41R41)

#### 1000Coocker
[pr1](https://github.com/bamlab/millecooker-backend/pull/35/files#diff-bdb3eec8d6a76aa091288d27a0780a75R6) avec
[pr2](https://github.com/bamlab/millecooker-backend/pull/34/files#diff-9c93afef1b2ba3f78d60c0f3cba2fd80R1) -
[pr3](https://github.com/bamlab/millecooker-core/pull/38/files#diff-cbee11eab4111229bbbb9985ca7b87dfR45) -
[pr4](https://github.com/bamlab/millecooker-core/pull/36/files#diff-cbee11eab4111229bbbb9985ca7b87dfR205)

#### Dress In The city
[pr1](https://github.com/bamlab/vide-dressing-app/commit/3aa16c9a3bb47f5967b9fe83138a2cac48d1707e) -
[pr2](https://github.com/bamlab/vide-dressing-app/commit/3e9f5a285e8b400d46b31e11f2b676914fe94da5)

#### Parkadom
[pr1](https://github.com/bamlab/parkadom-backend/pull/75/files#diff-1f589dc6345d6dce3c33ec6f84c94db6R7)

