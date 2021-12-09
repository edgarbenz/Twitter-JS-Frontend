import ErrorController from "./controllers/ErrorController.js";
import LoaderController from "./controllers/LoaderController.js";
import NewTweetController from "./controllers/NewTweetController.js";

document.addEventListener("DOMContentLoaded", (event) => {
    const elementLoader = document.querySelector(".container-loader");
    const loa = new LoaderController(elementLoader);

    const errorElement = document.querySelector(".global-errors");
    new ErrorController(errorElement);

    const crearTweetElement = document.querySelector("form");
    new NewTweetController(crearTweetElement);

})