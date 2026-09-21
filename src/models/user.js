let users = [];
let nextId = 1;

function create({ name, email, age }) {
  if (!name || !email) {
    throw new Error('name and email are required');
  }
  if (users.some((user) => user.email === email)) {
    throw new Error('A user with this email already exists');
  }
  const user = {
    id: nextId++,
    name,
    email,
    age: age ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

function findAll() {
  return users;
}

function findById(id) {
  return users.find((user) => user.id === Number(id)) || null;
}

function update(id, changes) {
  const user = findById(id);
  if (!user) {
    return null;
  }
  if (changes.name !== undefined) {
    user.name = changes.name;
  }
  if (changes.email !== undefined) {
    user.email = changes.email;
  }
  if (changes.age !== undefined) {
    user.age = changes.age;
  }
  user.updatedAt = new Date().toISOString();
  return user;
}

function remove(id) {
  const index = users.findIndex((user) => user.id === Number(id));
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return true;
}

function reset() {
  users = [];
  nextId = 1;
}

module.exports = { create, findAll, findById, update, remove, reset };
