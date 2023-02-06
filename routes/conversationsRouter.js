const router = require("express").Router();
const messangerController = require("../controllers/communicatorController");
const auth = require("../authorization/auth");

router.post("/message", auth, messangerController.createMessage);
router.get("/conversations", auth, messangerController.getConversations);
router.get("/message/:id", auth, messangerController.getMessages);
router.delete("/message/:id", auth, messangerController.deleteMessages);
router.delete(
  "/conversation/:id",
  auth,
  messangerController.deleteConversation
);

module.exports = router;
