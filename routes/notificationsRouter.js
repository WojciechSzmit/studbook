const router = require("express").Router();
const auth = require("../authorization/auth");
const notifyController = require("../controllers/notificationController");

router.post("/notify", auth, notifyController.createNotify);
router.delete("/notify/:id", auth, notifyController.removeNotify);

router.get("/notifies", auth, notifyController.getNotifies);

router.patch("/isReadNotify/:id", auth, notifyController.isReadNotify);

router.delete("/deleteAllNotify", auth, notifyController.deleteAllNotifies);

module.exports = router;
