const Sample = require("../models/sampleModel");
const allKeys = require("../data/keys");
const allCategories = require("../data/categories");
const allTypes = require("../data/types");

const getSamples = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const search = req.query.q || "";

  const type = req.query.type ? req.query.type : allTypes;
  const minBpm = req.query.minbpm;
  const maxBpm = req.query.maxbpm;
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";
  let userId = req.query.user || "";

  const categories = req.query.cat ? req.query.cat.split(",") : allCategories;

  let query = {
    name: { $regex: search, $options: "i" },
    type: { $in: type },
    category: { $in: categories },
    $or: [{ key: { $exists: false } }, { key: { $in: allKeys } }],
  };

  if (userId) {
    query["user_id"] = userId;
  }

  if (req.query.key) {
    query["key"] = { $in: req.query.key.split(",") };
  }
  if (minBpm || maxBpm) {
    query["bpm"] = { $gt: minBpm ? minBpm : 0, $lt: maxBpm ? maxBpm : 999 };
  }

  try {
    const items = await Sample.find(query)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Sample.countDocuments(query);

    const pageCount = Math.ceil(count / limit);

    res.status(200).json({
      pagination: {
        count,
        pageCount,
      },
      items,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getSamplesByUser = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const userId = req.params.id;

  try {
    const items = await Sample.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Sample.countDocuments(items);
    const pageCount = Math.ceil(count / limit);

    res.status(200).json({
      pagination: {
        count,
        pageCount,
      },
      items,
    });
  } catch (err) {
    console.log("error", err);
    return err;
  }
};

const deleteAllSamples = async (req, res) => {
  try {
    const samples = await Sample.deleteMany({});
    res.status(200).json(samples);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createSample = async (req, res) => {
  const { name, url, public_id, category, type, key, bpm, size } = req.body;
  const username = req.user.username;
  const user_id = req.user._id;

  try {
    const sample = await Sample.create({
      name,
      url,
      public_id,
      category,
      type,
      key,
      bpm,
      size,
      username,
      user_id,
    });
    res.status(200).json(sample);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSample,
  getSamples,
  getSamplesByUser,
  deleteAllSamples,
};
