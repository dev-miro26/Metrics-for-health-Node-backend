const Group = require("../models/group");
const { check, validationResult } = require("express-validator");

exports.addGroup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newGroup = new Group({
      userId: req.user.id,
      name: req.body.name,
      contents: req.body.contents,
    });

    const group = await newGroup.save();

    res.json({ doc: group });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Group name duplicated!" }] });
  }
};

exports.updateGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, contents } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (contents !== undefined) updates.contents = contents;
    // Scope by userId to prevent editing another user's group (IDOR)
    const group = await Group.findOneAndUpdate(
      { _id: req.body._id, userId: req.user.id },
      updates,
      { new: true }
    );
    if (!group) {
      return res.status(404).json({ errors: [{ msg: "Group not found" }] });
    }
    res.status(200).json({ doc: group });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

exports.getUserGroup = async (req, res, next) => {
  try {
    const groups = await Group.find({ userId: req.user.id });
    res.json({ docs: groups });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

exports.deleteGroupById = async (req, res, next) => {
  try {
    // Scope by userId to prevent deleting another user's group (IDOR)
    const group = await Group.findOne({
      _id: req.query._id,
      userId: req.user.id,
    });
    if (!group) {
      return res.status(404).json({ errors: [{ msg: "Group not found" }] });
    }
    await group.deleteOne();
    res.status(200).json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
