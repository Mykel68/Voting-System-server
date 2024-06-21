const db = require("../model");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findOne({ where: { user_id: id } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findOne({ where: { user_id: id } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updatedUser = await user.update(req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findOne({ where: { user_id: id } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
