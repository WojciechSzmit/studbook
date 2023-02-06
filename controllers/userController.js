const Users = require("../models/userModel");

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");
      if (!user)
        return res.status(400).json({ msg: "Użytkownik nie istnieje" });
      res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  upadteUser: async (req, res) => {
    try {
      const { avatar, fullname, mobile, address, story, website, gender } =
        req.body;
      if (!fullname)
        return res.status(400).json({ msg: "Dodaj imię i nazwisko" });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          fullname,
          mobile,
          address,
          story,
          website,
          gender,
        }
      );

      res.json({ msg: "Dane zaktualizowano poprawnie :-)" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  follow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0)
        return res.status(500).json({ msg: "Śledzisz tego użytkwonika" });

      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  unfollow: async (req, res) => {
    try {
      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 5;

      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },

        //operator agregacji, który pozwala na losowe wybieranie określonej liczby dokumentów z kolekcji
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.json({
        users,
        result: users.length,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar");
      res.json({ users });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userController;
