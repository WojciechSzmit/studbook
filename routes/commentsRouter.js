const router = require("express").Router();
const commentsController = require("../controllers/commentsController");
const auth = require("../authorization/auth");

router.post("/comment", auth, commentsController.createComment);
router.patch("/comment/:id", auth, commentsController.updateComment);
router.patch("/comment/:id/like", auth, commentsController.likeComment);
router.patch("/comment/:id/unlike", auth, commentsController.unLikeComment);
router.delete("/comment/:id", auth, commentsController.deleteComment);

module.exports = router;
