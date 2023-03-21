const express = require("express");
const router = express.Router();
const {
  addGroup,
  getUserGroup,
  deleteGroupById,
  updateGroup,
} = require("../controllers/group.js");
const auth = require("../middleware/auth");

router.post("", auth, addGroup);
router.put("", auth, updateGroup);
router.get("", auth, getUserGroup);
router.delete("", auth, deleteGroupById);

module.exports = router;
