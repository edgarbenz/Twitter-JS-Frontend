import { errorView } from "../views.js";
import BaseController from "./BaseController.js";

export default class ErrorController extends BaseController {
    showError (errorMessage) {
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove("hidden")
    }
}