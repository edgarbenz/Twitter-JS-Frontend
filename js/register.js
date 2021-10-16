import RegisterController from "./controllers/registerController.js";
import LoaderController from "./controllers/LoaderController.js"
import ErrorController from "./controllers/ErrorController.js";

document.addEventListener("DOMContentLoaded", (event) => {
    const loaderElement = document.querySelector(".container-loader");
    const loaderController = new LoaderController(loaderElement);

    const errorElement = document.querySelector(".global-errors");
    const errorController = new ErrorController(errorElement);

    const registerElement = document.querySelector("form");
    const registerController = new RegisterController(registerElement);
});