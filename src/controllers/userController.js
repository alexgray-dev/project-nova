const user = require('../models/user');

function getUsers(req, res) {
  res.json(user.findAll());
}

function getUser(req, res) {
  const found = user.findById(req.params.id);
  if (!found) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(found);
}

function createUser(req, res) {
  try {
    const created = user.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function updateUser(req, res) {
  const updated = user.update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(updated);
}

function deleteUser(req, res) {
  const removed = user.remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).end();
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
