const db = require("../model/index");

exports.vote = async (req, res) => {
  const { id } = req.params;
};

exports.getAllVotes = async (req, res) => {
  try {
    const votes = await db.Vote.findAll();
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVote = async (req, res) => {
  const { id } = req.params;
  try {
    const vote = await db.Vote.findOne({ where: { vote_id: id } });
    if (!vote) {
      return res.status(404).json({ msg: "Vote not found" });
    }
    res.status(200).json(vote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVote = async (req, res) => {
  const { name } = req.body;
  try {
    const vote = await db.Vote.create({ name });
    res.status(201).json(vote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
