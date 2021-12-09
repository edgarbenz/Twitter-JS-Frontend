import PostListController from "./controllers/PostListController.js"
import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/errorController.js";
import ShowOrNotNewTweetController from "./controllers/ShowOrNotNewTweetController.js"
import toLookForController from "./controllers/toLookForController.js"

//esta primera instruccion agrega un escuchador de eventos en todo el 
//"DOMContentLoaded", quiere decir que todo lo el codigo dentro de aqui 
//sera capaz de escuchar eventos del DOM, como tu sabes el DOM
//es que cualquier etiqueta de HTML puede ser accesada desde JS
//es obligatorio poner este escuchador de eventos
window.addEventListener("DOMContentLoaded", () => {
    const loaderElement = document.querySelector(".container-loader");
    new LoaderController(loaderElement)
        // LoaderController se hace cargo de "mostrar" o "No mostrar" el icono de carga 
        // se suscribe para que lo usen los demas controladores, inicialmente esta hidden

    const elementSearch = document.querySelector(".search");
    new toLookForController(elementSearch);

    const element = document.querySelector(".posts-list");
    const controller = new PostListController(element);
    controller.loadPosts();
    //PostListController se hace cargo del <div class="post-list"> </div>
    //Tiene 2 metodos: render(tweets) "Pintar tweets" y loadPost() "cargar tweets"

    const elementBotones = document.querySelector(".botones");
    new ShowOrNotNewTweetController(elementBotones);
    //ShowOrNotNewTweetController se hace cargo del elemento <div class="botones">


    const errorElement = document.querySelector(".global-errors");
    new ErrorController(errorElement);
    //ErrorController se hace cargo del elemento:  <div class="global-errors hidden">

});