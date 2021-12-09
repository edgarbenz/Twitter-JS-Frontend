import BaseController from "./BaseController.js";
import { debounce } from "../services/Debounce.js"

export default class toLookForController extends BaseController {
    constructor(element) {
        super(element); //puedo usar los metodos de esa clase
        this.wordOrPhraseToSearch();
    }

    wordOrPhraseToSearch() {

        this.element.addEventListener("keyup", debounce(event => {
            const textToLookFor = this.element.value;
            console.log("textTo LookFor: ", textToLookFor);
            this.publish(this.event.SEARCH, textToLookFor);
        }, 250));
        //PostListController.loadpost(textToLookFor);
    }
}