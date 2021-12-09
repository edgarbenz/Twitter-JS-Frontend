import BaseController from "./BaseController.js";
import dataService from "../services/DataServices.js"

export default class DeleteController extends BaseController {
    constructor(element, tweet) {
        super(element);
        this.tweet = tweet;
        this.delete();
    }
    delete() {
        this.element.addEventListener("click", event => {
            console.log("click en borrar");
            const deleteConfirm = confirm("Are you sure you want to delete this tweet? ")
            if (deleteConfirm) {
                dataService.deleteTweet(this.tweet);
                this.publish(this.event.TWEET_DELETED, this.tweet);
            }
        });
    }
}