
**Découvrir en live : http://esipe.geonef.fr/montee-des-eaux/**

Cette carte présente la supposée montée des eaux dans le monde entre 10 et 70 mètres.

Pour rendre la carte utilisable et compréhensible, j'ai ajouté une couche des continents, une couche des pays, une couche des limites administratives et une couche des villes. Ces couches vont nous permettre de voir les parties du monde qui seront noyées suite aux importantes montées des eaux.


Visualiser en WMS sous QGIS
---------------------------

...ou tout autre [client WMS](http://fr.wikipedia.org/wiki/Web_Map_Service).
Procédure pour [QGIS](http://www.qgis.org/) :

 * *Couche* -> *Ajouter une couche WMS*
 * cliquer sur *Nouveau* pour ajouter ce serveur WMS :
   * Nom : *montee-des-eaux* (ou autre)
   * URL : *http://mapserver.esipe.geonef.fr/montee-des-eaux/map?*
 * cliquer *OK* puis de retour à la fenêtre précédente, cliquer en bas sur *Ajouter* puis *Fermer*
 * c'est prêt : la couche devrait apparaître sous quelques secondes, navigable évidemment. Enjoy!


Installation
------------
Le [tutoriel du cours](http://www.geonef.fr/doc/cours/mapserver-et-wms/installation-systeme)
vous guide dans la mise en place de l'environnement sur une machine virtuelle
VirtualBox, donc utilisable depuis Windows, Mac ou Linux.

La machine installée est une *Debian GNU/Linux* exploitant
*MapServer* en FastCGI derrière le serveur HTTP *Nginx*.

Il est bien-sûr possible d'utiliser d'autres environnements comme par
exemple Apache sur Windows.

Après avoir cloné localement ce dépôt Git, il faut récupérer le fichier
http://esipe.geonef.fr/montee-des-eaux/SRTM_500m.tif
(attention, le fichier pèse 4,6 Go !)
et l'enregistrer en tant que map/data/SRTM_500m.tif, en faisant :
```
curl http://esipe.geonef.fr/montee-des-eaux/SRTM_500m.tif >map/data/SRTM_500m.tif
```


Auteurs
-------

Projet réalisé par Rachid Ben Salah <rbensa01@etudiant.univ-mlv.fr>,
étudiant IG2 de
[l'École Supérieure D'Ingénieurs de l'Université Paris-Est Marne-la-Vallée (ESIPE)](http://esipe.u-pem.fr/),
dans le cadre du cours *[Serveurs cartographiques](http://www.geonef.fr/doc/cours/mapserver-et-wms/)*.


Licence
-------

Les fichiers présents dans ce dépôt sont distribués sous les termes de
la licence CeCILL 2.1 contenue dans le fichier [LICENSE](LICENSE) et dont l'original
est disponible à l'URL http://www.cecill.info/licences/Licence_CeCILL_V2.1-fr.html
