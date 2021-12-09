import RegisterController from "./controllers/registerController.js";
import LoaderController from "./controllers/LoaderController.js"
import ErrorController from "./controllers/ErrorController.js";

document.addEventListener("DOMContentLoaded", (event) => {
    //este controlador se hace cargo de <div class="container-loader hidden">
    const loaderElement = document.querySelector(".container-loader");
    const loaderController = new LoaderController(loaderElement);

    //este controlador se hace cargo de <div class="global-errors hidden">
    const errorElement = document.querySelector(".global-errors");
    const errorController = new ErrorController(errorElement);

    //este controlador se hace cargo de  <form novalidate>
    const registerElement = document.querySelector("form");
    const registerController = new RegisterController(registerElement);
});