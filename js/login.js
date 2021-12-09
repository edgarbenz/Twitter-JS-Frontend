import LoginController from "./controllers/LoginController.js";
import LoaderController from "./controllers/LoaderController.js"
import ErrorController from "./controllers/ErrorController.js";

//esta primera instruccion agrega un escuchador de eventos en todo el 
//"DOMContentLoaded", quiere decir que todo lo el codigo dentro de aqui 
//sera capaz de escuchar eventos del DOM, como tu sabes el DOM
//es que cualquier etiqueta de HTML puede ser accesada desde JS
//es obligatorio poner este escuchador de eventos
document.addEventListener("DOMContentLoaded", (event) => {
    const loaderElement = document.querySelector(".container-loader");
    new LoaderController(loaderElement);
    // LoaderController se hace cargo de "mostrar" o "No mostrar" el icono de carga 
    // se suscribe para que lo usen los demas controladores, inicialmente esta hidden

    const errorElement = document.querySelector(".global-errors");
    new ErrorController(errorElement);
    //ErrorController se hace cargo del elemento:  <div class="global-errors hidden">

    //este controlador se encarga del elemento <form novalidate>
    const loginElement = document.querySelector("form");
    new LoginController(loginElement);

});