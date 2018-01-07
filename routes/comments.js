var express = require("express");
var router  = express.Router({mergeParams: true});
var Streetfood = require("../models/streetfood");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find streetfood by id
    console.log(req.params.id);
    Streetfood.findById(req.params.id, function(err, streetfood){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {streetfood: streetfood});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup streetfood using ID
   Streetfood.findById(req.params.id, function(err, streetfood){
       if(err){
           console.log(err);
           res.redirect("/streetfoods");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               //save comment to nested streetfood
               streetfood.comments.push(comment);
               streetfood.save();
               console.log(comment);
               console.log(streetfood);
               req.flash('success', 'Created a comment!');
               res.redirect('/streetfoods/' + streetfood._id);
           }
        });
       }
   });
});

router.get("/:commentId/edit", middleware.isLoggedIn, function(req, res){
    // find streetfood by id
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
             res.render("comments/edit", {streetfood_id: req.params.id, comment: comment});
        }
    })
});

router.put("/:commentId", function(req, res){
   Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
       if(err){
           res.render("edit");
       } else {
           res.redirect("/streetfoods/" + req.params.id);
       }
   }); 
});

//Original delete method does not apply here.
// router.delete("/:commentId",middleware.checkUserComment, function(req, res){
//     Comment.findByIdAndRemove(req.params.commentId, function(err){
//         if(err){
//             console.log("PROBLEM!");
//         } else {
//             res.redirect("/streetfoods/" + req.params.id);
//         }
//     })
// });

router.delete("/:commentId",middleware.checkUserComment, function(req, res){
    Streetfood.findById(req.params.id, function(err, streetfood) {
        if(err){
            console.log(err);
            res.redirect("/streetfoods");
        }
        else {
            Comment.findByIdAndRemove(req.params.commentId, function(err){
                if(err){
                    console.log(err);
                } else {
                    streetfood.comments.id(req.params.commentId).remove();
                    streetfood.save();
                    req.flash('success', 'Deleted a comment!');
                    res.redirect('/streetfoods/' + streetfood._id);  
                }
            });
        }
    });
});


module.exports = router;