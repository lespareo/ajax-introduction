// Création de l'objet httpRequest à partir de la class XMLHttpRequest
//
// @see https://developer.mozilla.org/fr/docs/AJAX
var httpRequest = new window.XMLHttpRequest()
// Récupération de l'élément html <img> qui a l'id "gif"
var gifsHTML = document.querySelector('div#gifs')

// Fonction principale de l'application
// Est lancée au chargement du DOM (Document Object Model)
// DOM: object javascript "représentant" l'HTML
function app () {
  var buttonHTML = document.querySelector('button')
  
  // Evénement "click" sur le bouton, on exécute la fonction requestFactory
  buttonHTML.onclick = requestFactory
  // Lorsque la requête est terminée, on exécute la fonction responseHandler
  httpRequest.onload = responseHandler
}

// Fonction de construction de la requête à giphy avec httpRequest.open("...")
// Exécute directement la requête avec httpRequest.send()
function requestFactory () {
  httpRequest.open(
    "GET", 
    "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC"
  )
  httpRequest.send()
}

// Fonction de gestion de la réponse http de giphy
function responseHandler () {
  var res
  var l
  var imgHTML
  
  // Si 
  // le status ("http status code") de la réponse est différent de 200 (tout s'est bien passé)
  // Alors
  // on arrête l'exécution de la fonction
  //
  // @see les "http status code" : https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
  if (httpRequest.status !== 200) {
    // On log le status pour pouvoir débuguer l'erreur
    console.log(httpRequest.status)
    return false
  }

  // On essaye de transformer la réponse de giphy 
  // qui est seulement du texte en objet javascript
  //
  // @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/try...catch
  try {  
    res = JSON.parse(httpRequest.response)
  } catch (error) {
    // On attrape l'erreur si il y a eu une erreur
    // On log l'erreur, et l'objet httpRequest pour pouvoir débuguer
    // On stop l'exécution de la fonction
    console.log(
      error,
      httpRequest
    )
    return false
  }

  // Si il n'y a pas eu d'erreur
  // On ajoute l'url du gif à l'attribut "src" de l'élément html <img>

  l = res.data.length

  for (i = 0 ; i<l ; i++) {
    imgHTML = document.createElement('img')
    imgHTML.setAttribute('src', res.data[i].images.original.url)
    imgHTML.setAttribute('alt', 'gif from giphy, a funny cat')
    gifsHTML.appendChild(imgHTML)
  }






  // On ajoute la valeur de l'attribut "alt"
  // Cet attribut est obligatoire pour les balises <img>
  // Il permet d'afficher un texte court à la place de l'image
  // Utile pour les mal-voyants et / ou lorsque le navigateur n'arrive pas à récupérer l'image


}
