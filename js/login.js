import LoginController from "./controllers/LoginController.js";
import LoaderController from "./controllers/LoaderController.js"
import ErrorController from "./controllers/ErrorController.js";

document.addEventListener("DOMContentLoaded", (event) => {
    const loaderElement = document.querySelector(".container-loader");
    const loaderController = new LoaderController(loaderElement);

    const errorElement = document.querySelector(".global-errors");
    const errorController = new ErrorController(errorElement);

    const loginElement = document.querySelector("form");
    const loginController = new LoginController(loginElement);

});