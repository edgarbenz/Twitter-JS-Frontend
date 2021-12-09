import BaseController from "./BaseController.js";
import dataService from "../services/DataServices.js"
import { tweetView } from "../views.js";
import DeleteController from "./DeleteController.js"

export default class PostListController extends BaseController {
    constructor(element) {
        super(element);
        this.subscribe(this.event.SEARCH, (textToLookFor) => {
            this.loadPosts(textToLookFor);
        });
        this.subscribe(this.event.TWEET_DELETED, ev => {
            this.loadPosts();
        })
    }

    render(tweets, userInfo) {
        this.element.innerHTML = "";
        //para cada elemento del arreglo tweets se crea un elemento article
        //y al machote de HTML en views se le llena con cada elemento del arreglo
        //y se agrega un nuevo hijo a la etiqueya: <main class="posts-list"></main>
        //eso hace que se vaya creando la lista de tweets
        tweets.forEach(async tweet => {
            const article = document.createElement("article");
            article.innerHTML = tweetView(tweet, userInfo);
            this.element.appendChild(article);

            const boton = article.querySelector(".borrar-button");
            new DeleteController(boton, tweet);
            /*
                        if (deleteButton) {
                            deleteButton.addEventListener("click", event => {
                                console.log("click en borrar");
                                const deleteConfirm = confirm("Are you sure you want to delete this tweet? ")
                                if (deleteConfirm) {
                                    dataService.deleteTweet(tweet);
                                    article.remove();
                                }
                            });
                        }*/
        })
    }

    async loadPosts(textToLookFor = "") {
        this.publish(this.event.START_LOADING, {});
        const userInfo = await dataService.getUser(); // checa que usuario esta activo para pintarle el boton borrar a todos sus tweets
        console.log("userinfo: ", userInfo)
        try {
            const tweets = await dataService.getTweets(textToLookFor);
            //tweets es: un arreglo de objetos, eso es lo que es (osea un JSON)
            //cada elemento del arreglo contiene:
            //"id", "message", "userId", "createdAt" o:
            //"id", "text", "userId", "updatedAt"  o:
            //"id", "message", "userId", "updatesAt"
            this.render(tweets, userInfo);
        } catch (error) {
            console.log(error);
            this.publish(this.event.ERROR, error);

        } finally { // se ejecuta inmediatamente al TERMINAR el try o el catch segun asi hubo o no error
            this.publish(this.event.FINISH_LOADING, {});
        }
    }
}