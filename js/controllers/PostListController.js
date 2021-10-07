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
        this.publish(this.event.START_LOADING, {});
        try {
            const tweets = await dataService.getTweets();
            this.render(tweets);
        } catch (error) {
            console.log(error);
            this.publish(this.event.ERROR, error);

        } finally { // se ejecuta inmediatamente al TERMINAR el try o el catch segun si hubo o no error
            this.publish(this.event.FINISH_LOADING, {});
        }
    }
}