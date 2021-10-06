import BaseController from "./BaseController.js";
import dataService from "../services/DataServices.js"
import {tweetView} from "../views.js";
import Pubsub from "../services/Pubsub.js";

export default class PostListController extends BaseController {

    render(tweets) {
        tweets.forEach(tweet =>{
            const article = document.createElement("article");
            article.innerHTML = tweetView(tweet);
            this.element.appendChild(article);
        })
    }
    
    async loadPosts() {
        Pubsub.publish("startloading", {});
        try {
            const tweets = await dataService.getTweets();
            this.render(tweets);
        } catch (error) {
            console.log(error);
            Pubsub.publish("error", error);

        } finally { // se ejecuta inmediatamente al TERMINAR el try o el catch segun si hubo o no error
            Pubsub.publish("finishLoading", {});
        }
    }
}