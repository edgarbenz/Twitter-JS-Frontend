import BaseController from "./BaseController.js";
import dataService from "../services/DataServices.js"

export default class RegisterController extends BaseController {
    constructor(element) {
        super(element);
        this.attachEventListener(); //este controlador ejecuta automaticamente el attachEventListener()
    }

    checkInputErrors() {
        this.element.querySelectorAll("input").forEach((input) => {
            const button = this.element.querySelector("button");
            input.addEventListener("keyup", (event) => {
                //console.log("INPUT VALIDITY= ", input.validity);
                if (input.validity.valid) { // pone de color verde si es valido tanto el email como el password
                    input.classList.remove("is-danger");
                    input.classList.add("is-success");
                } else {
                    input.classList.remove("is-success");
                    input.classList.add("is-danger");
                    console.log(input.validationMessage); //se refiere al error que yo establezco en setCustomValidity
                    //pass.setCustomValidity("Password no coincide")
                    //passConfirm.setCustomValidity("Password no coincide")
                    //} else {
                    //pass.setCustomValidity(""); //"" es que esta OK el password
                    //passConfirm.setCustomValidity(""); //"" 
                }
                if (this.element.checkValidity()) { //checa si los campos de user y pass estan llenos
                    button.removeAttribute("disabled");
                } else {
                    button.setAttribute("disabled", true);
                }

            });
        });
    }

    attachEventListener() {
        this.element.addEventListener("submit", async(event) => {
            event.preventDefault(); // evita que el formulario se envie al backend, ahora JS lo controlara
            const user = {
                username: this.element.elements.email.value, // toma el email que alguien escribio en el backend
                password: this.element.elements.password.value // toma el pass que alguien escribio en el backend
            };

            this.publish(this.event.START_LOADING, {}); //se publica el start loading para que el controlador indicado lo muestre
            try { // podria no asignarselo a ninguna variable ya que es un registro de usuario a la BD
                const data = await dataService.post(user, "/auth/register"); //con esto el backend se da cuenta que queremos registrar un usuario en la BD del backend
                document.location.href = "/login.html";
                // me redireccion a la pagina de login para que ya que se registro , se logee y el backend
                // vea que es un usuario valido y me regrese un tokenlogin
                alert("User created sucessful !!");
                //this.render(tweets);
            } catch (error) {
                //si ocurrio un error a la hora de registrar va a caer aqui y lo vamos a publicar
                console.log(error);
                this.publish(this.event.ERROR, error);
            } finally { // se ejecuta inmediatamente al TERMINAR el try o el catch segun si hubo o no error
                this.publish(this.event.FINISH_LOADING, {});
            }
        });
        //esto hace lo mismito que el login
        this.checkInputErrors()

        this.element.querySelectorAll("input[type='password']").forEach(input => {
            const button = this.element.querySelector("button is-success");

            input.addEventListener("keyup", (event) => { //aqui vamos a checar que los valores de los 2 input osea password sean iguales
                const pass = this.element.elements["password"]; //<input name="password"
                const passConfirm = this.element.elements["password-confirm"]; // <input name="password-confirm"  AQUI EL - no se pone porque es una resta en JS , cambia a la forma de JS de ponerlo en mayusculas y pegas las palabras
                if (pass.value !== passConfirm.value) {
                    pass.setCustomValidity("Password no coincide")
                    passConfirm.setCustomValidity("Password no coincide")
                } else {
                    pass.setCustomValidity(""); //"" es que esta OK el password
                    passConfirm.setCustomValidity(""); //"" es que esta OK el password
                }
            })
        })
        this.checkInputErrors();
    }
}