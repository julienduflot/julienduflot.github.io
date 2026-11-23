# julienduflot.com

Site statique une page (HTML/CSS + quelques lignes de JS pour le thème), hébergé sur GitHub Pages. Pas de build, pas de dépendance.

```
index.html              page principale
mentions-legales.html   mentions légales
404.html                toute ancienne URL HubSpot renvoie vers l'accueil
assets/style.css        styles, thèmes clair et sombre (variables CSS)
assets/theme.js         bouton de thème (choix mémorisé, sinon thème système)
robots.txt, sitemap.xml
```

Aperçu local : `python3 -m http.server 8000` puis http://localhost:8000

## Mise en ligne sur GitHub Pages

1. Pousser ces fichiers sur la branche `main` du repo.
2. Repo › Settings › Pages : Source = « Deploy from a branch », branche `main`, dossier `/`.
3. Aperçu avant bascule : https://julienduflot.github.io/
4. Recommandé : vérifier le domaine dans les Settings du compte GitHub › Pages › Verified domains (ajoute un TXT `_github-pages-challenge-julienduflot` chez GoDaddy).
5. Le jour de la bascule seulement : renseigner Custom domain = `julienduflot.com` (GitHub crée alors le fichier CNAME). Le faire plus tôt redirigerait l'aperçu vers le site HubSpot encore en place.

## Bascule DNS depuis HubSpot (à faire avec l'accord de Julien)

**Avant (J-1)**
- Relever tous les enregistrements DNS actuels chez GoDaddy (Mes produits › DNS) (capture d'écran).
- Baisser le TTL des enregistrements `@` et `www` à 300 s.
- Pas de messagerie sur ce domaine : ne rien ajouter côté MX. Laisser en place les autres enregistrements existants (TXT de vérification, etc.).

**Bascule**
- Supprimer les enregistrements `@` et `www` qui pointent vers HubSpot (`*.hs-sites-eu1.com` ou équivalent).
- Ajouter pour l'apex `@` :
  - A : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - AAAA : `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- `www` : CNAME vers `julienduflot.github.io`
- Si GoDaddy a une « redirection de domaine » active sur l'apex, la supprimer : elle écrase les A records.
- Dans GitHub › Settings › Pages : Custom domain = `julienduflot.com`.
- Dans GitHub › Settings › Pages, attendre le certificat puis cocher « Enforce HTTPS ».

**Après**
- Vérifier `https://julienduflot.com`, `https://www.julienduflot.com`, une ancienne URL (doit revenir à l'accueil) et les mentions légales.
- Dans HubSpot : déconnecter le domaine julienduflot.com (Paramètres › Contenu › Domaines et URL), puis dépublier les pages, dont /temp_dev.
- Google Search Console : soumettre le nouveau sitemap.
- Remonter le TTL à 3600 s.

**Retour arrière** : remettre les enregistrements relevés à J-1. Avec un TTL de 300 s, c'est effectif en quelques minutes.
