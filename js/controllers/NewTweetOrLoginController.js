import BaseController from "./BaseController.js";
import DataServices from "../services/DataServices.js";

export default class NewTweetOrLoginController extends BaseController {
    constructor(element) {
        super(element);
        this.showApropiateButton();
    }

    async showApropiateButton() {
        //const token = await DataServices.getToken();
        const estaLogado = await DataServices.isUserLogged();
        if (estaLogado) {
            console.log("estaLogado= ", estaLogado);
            console.log("this.element: ", this.element);
            const newTweet = this.element.querySelector(".new-tweet");
            console.log("newTweet: ", newTweet);
            newTweet.classList.remove("hidden");
            console.log("entro al estaLogado true ", estaLogado)
        } else {
            const register = this.element.querySelector(".register");
            register.classList.remove("hidden");
            const login = this.element.querySelector(".login");
            login.classList.remove("hidden");
            console.log("entro al estaLogado false ", estaLogado)
        }

    }

}