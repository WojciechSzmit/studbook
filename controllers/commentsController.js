const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentsController = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;

      const post = await Posts.findById(postId);
      if (!post)
        return res.status(400).json({ msg: "Ta wiadomość nie istnieje" });

      if (reply) {
        const cm = await Comments.findById(reply);
        if (!cm)
          return res.status(400).json({ msg: "Ten komentarz nie istnieje" });
      }

      const newComment = new Comments({
        user: req.user._id,
        content,
        tag,
        reply,
        postUserId,
        postId,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment._id } },
        { new: true }
      );

      await newComment.save();

      res.json({ newComment });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { content }
      );

      // if (!cm) return res.status(400).json({ msg: "Błąd" });

      res.json({ msg: "Aktualizacja zakończona sukcesem" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = await Comments.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      // console.log(post);

      // console.log(post);
      if (comment.length > 0)
        return res.status(400).json({ msg: "Polubiłeś ten komentarz" });
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: "Post polubiny" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  unLikeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: "Cofnięto polubienie komentarza" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comments.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { postUserId: req.user._id }],
      });

      await Posts.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { comments: req.params.id },
        }
      );

      res.json({ msg: "Komentarz skasowany" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = commentsController;
