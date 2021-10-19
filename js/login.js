import LoginController from "./controllers/LoginController.js";
import LoaderController from "./controllers/LoaderController.js"
import ErrorController from "./controllers/ErrorController.js";

document.addEventListener("DOMContentLoaded", (event) => {
    const loaderElement = document.querySelector(".container-loader");
    new LoaderController(loaderElement);

    const errorElement = document.querySelector(".global-errors");
    new ErrorController(errorElement);

    const loginElement = document.querySelector("form");
    new LoginController(loginElement);

});