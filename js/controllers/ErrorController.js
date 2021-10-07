import { errorView } from "../views.js";
import BaseController from "./BaseController.js";

export default class ErrorController extends BaseController {
    constructor(element) {
        super(element);
        this.subscribe(this.event.ERROR, (error) => {
            this.showError(error);
        });
    }


    showError (errorMessage) {
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove("hidden");
        this.element.addEventListener("click", (event) => {
            console.log("Click para cerrar", event);
            if(event.target.classList.contains("delete")) {
                this.element.classList.add("hidden");
            }
        })
    }
}