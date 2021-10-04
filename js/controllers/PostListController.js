import BaseController from "./BaseController.js";
import dataService from "../services/DataServices.js"
import {tweetView} from "../views.js";

export default class PostListController extends BaseController {

    render(tweets) {
        tweets.forEach(tweet =>{
            const article = document.createElement("article");
            article.innerHTML = tweetView(tweet);
            this.element.appendChild(article);
        })
    }
    
    async loadPosts() {
        this.loader.showLoading();
        try {
            const tweets = await dataService.getTweets();
            this.render(tweets);
            //cargarTweets(tweets)
        } catch (error) {
            console.log(error);
          //  avisarDelError(error);
        } finally { // se ejecuta inmediatamente al TERMINAR el try o el catch segun si hubo o no error
            this.loader.hideLoading();
        }
    }
}