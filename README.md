# Share your favorite street food on this website!

* Issue: can not load all comments from MongoDB.
    *  change the format of embedding the comments in streetfood schema
    *  instead of storing the comments' id, we store actually the comment itself!
* Issue: can not delete embedded comment from Streetfood schema
    * Modified comment/delete router
    * Not only delete comment in database's Comment collection, but also delete the comment embedded in streetfood. 

* Todo:
    * Add streetfood creating time
    * Add comment creating time