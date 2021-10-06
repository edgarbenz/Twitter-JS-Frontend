import Pubsub from "../services/Pubsub.js";
import BaseController from "./BaseController.js";

export default class LoaderController extends BaseController {
    constructor(element) {
        super(element);
        Pubsub.subscribe("startloading", () => {
            this.showLoading();
        });
        Pubsub.subscribe("finishLoading", () => {
            this.hideLoading();
        });
    }
    showLoading() {
        this.element.classList.remove("hidden");
    }

    hideLoading() {
        this.element.classList.add("hidden");
    }
}