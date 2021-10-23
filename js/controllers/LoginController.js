import BaseController from "./BaseController.js";
import dataService from "../services/DataServices.js"
import RegisterController from "./registerController.js";

export default class LoginController extends RegisterController {
    constructor(element) {
        super(element);
        this.attachEventListener();
    }

    attachEventListener() {
        this.element.addEventListener("submit", async(event) => {
            event.preventDefault(); // evita que el formulario se envie al backend, ahora JS lo controlara
            const user = {
                username: this.element.elements.email.value, // toma el email que alguien escribio en el backend
                password: this.element.elements.password.value // toma el pass que alguien escribio en el backend
            };
            //console.log("SE ENVIA EL FORMULARIO", user);
            //console.log("el formulario contiene este email ", user.username, " y este pass ", user.password);
            this.publish(this.event.START_LOADING, {});
            try {
                const data = await dataService.post(user, "/auth/login");
                if (data.accessToken) {
                    dataService.saveToken(data.accessToken); //puedo quitar el await
                    console.log("hago un getgToken ", dataService.getToken()); //puedo quitar el await

                    document.location.href = "/twetts.html"
                    alert("User loged sucessful !!");

                    this.token = data.accessToken;
                } else {
                    alert("Usuario no existe en nuestra base de datos");
                }
                //this.render(tweets);
            } catch (error) {
                console.log(error);
                this.publish(this.event.ERROR, error);
            } finally { // se ejecuta inmediatamente al TERMINAR el try o el catch segun si hubo o no error
                this.publish(this.event.FINISH_LOADING, {});
            }
        });

        this.element.querySelectorAll("input").forEach(input => {
            const button = this.element.querySelector("button");
            input.addEventListener("keyup", (event) => {
                //console.log("INPUT VALIDITY= ", input.validity);
                if (input.validity.valid) { // pone de color verde si es valido tanto el email como el password
                    input.classList.remove("is-danger");
                    input.classList.add("is-success");
                } else {
                    input.classList.remove("is-success");
                    input.classList.add("is-danger");
                }
                if (this.element.checkValidity()) { //checa si los campos de user y pass estan llenos
                    button.removeAttribute("disabled");
                } else {
                    button.setAttribute("disabled", true);
                }

            });
        });
    }
}