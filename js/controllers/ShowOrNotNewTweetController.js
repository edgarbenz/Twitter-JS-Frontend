import BaseController from "./BaseController.js";
import DataServices from "../services/DataServices.js";

//Este controlador tiene a su cargo el elemento <div class="botones">
//Ejecuta automaticamente el metodo showApropiateButton
export default class ShowOrNotNewTweetController extends BaseController {
    constructor(element) {
        super(element);
        this.showApropiateButton();
    }

    async showApropiateButton() {
        const estaLogado = await DataServices.isUserLogged();
        //siUserLogged llama a su vez a getToken y este "lee" el takenlogin
        //desde el LocalStorage del navegador, lo trata como una promesa por pura mamada al santo
        //solo porque los metodos del DataService son promesas casi todos le puse async para uniformidad
        if (estaLogado) {
            //Si hay existe el takenlogin en el navegador entonces:
            const newTweet = this.element.querySelector(".new-tweet-button");
            newTweet.classList.remove("hidden");
            //le quito la etiqueta de hidden al <div class="new-tweet-button hidden"> para que lo pinte
            //si esta logeado, entonces puede crear nuevo tweet
        } else {
            const register = this.element.querySelector(".register-button");
            register.classList.remove("hidden");
            const login = this.element.querySelector(".login-button");
            login.classList.remove("hidden");
            //si no existe token en el localStorage entonces no esta logeado
            //Y le pinto los botones para que se registre y para que haga login
            //estos:  <div class="register-button hidden">
            //        <div class="login-button hidden">
        }

    }

}