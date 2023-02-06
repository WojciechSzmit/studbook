const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const authorizationController = {
  //LOGOWANIE
  logUserIn: async (request, response) => {
    try {
      const { email, password } = request.body;
      const user = await Users.findOne({ email }).populate(
        "followers following",
        "avatar username fullname followers following"
      );
      if (!user)
        return response.status(400).json({ msg: "Ten email nie istnieje" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return response.status(400).json({ msg: "Hasło jest nieprawidłowe" });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      response.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/refreshToken ",
        maxAge: 14 * 24 * 60 * 60 * 1000, //trwałość refresza 14 dni
      });

      response.json({
        msg: "Logowanie zakończone sukcesem! :-)",
        accessToken,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },

  //REJESTRACJA
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      //console.log(req.body);
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name)
        return res.status(400).json({ msg: "Ten użytkownik już istnieje" });

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "Ten email już istnieje" });

      if (password.length < 7)
        return res
          .status(400)
          .json({ msg: "Hasło musi mieć minimum 6 znaków" });

      const passwordHash = await bcrypt.hash(password, 12);

      //console.log(passwordHash);

      //console.log(newUserName);

      //tworzenie nowego użytkownika na modelu mongoose
      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      //console.log(newUser);

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      //console.log({ accessToken , refreshToken  });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/refreshToken ",
        maxAge: 14 * 24 * 60 * 60 * 1000, //trwałość ciasteczka 30 dni
      });

      await newUser.save(); //bez tego nie zapisze usera do bazy

      res.json({
        msg: "Rejstracja zakończona sukcesem! :-)",
        accessToken,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refreshToken" });
      return res.json({ msg: "Poprawnie wylogowano!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Zaloguj się" });
      jsonwebtoken.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Zaloguj się" });

          console.log(result);
          const user = await Users.findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "avatar username fullname followers following"
            );

          if (!user)
            return res.status(400).json({ msg: "Czego tutaj szukasz" });

          const accessToken = createAccessToken({ id: result.id });

          res.json({ accessToken, user });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });
};

module.exports = authorizationController;
