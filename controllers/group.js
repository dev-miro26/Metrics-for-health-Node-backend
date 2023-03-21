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
    const group = await Group.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ doc: group });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

exports.getUserGroup = async (req, res, next) => {
  try {
    const group = await Group.find({ userId: req.user.id });
    res.json({ docs: group });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

exports.deleteGroupById = async (req, res, next) => {
  try {
    const group = await Group.findOne({ _id: req.query._id });
    group.delete();
    res.status(200).json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
