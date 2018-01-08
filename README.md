# Share your favorite street food on this website!

* Issue: can not load all comments from MongoDB.
    *  change the format of embedding the comments in streetfood schema
    *  instead of storing the comments' id, we store actually the comment itself!
* Issue: can not delete embedded comment from Streetfood schema
    * Modified comment/delete router
    * Not only delete comment in database's Comment collection, but also delete the comment embedded in streetfood. 
* Issue: Edit can not apply to both comment and embedded comment
    * Now edit can apply to all comment and embedded comment.

* Todo:
    * Add streetfood creating time - completed
    * Add comment creating time - completed
    * Add streetfood delete feature - completed
    * Add styling to jumbotron on index page
    * Add google map api