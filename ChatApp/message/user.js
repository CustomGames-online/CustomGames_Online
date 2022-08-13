const users = {
    "Checkers": [],
    "Chess": [],
    "Connect 4": []
};
const userToRoom = {};

function userJoin(id, username, room) {
    const user = { id, username };
    users[room].push(user);
    userToRoom[id] = room;
    console.log(users, userToRoom);
    return user;
}

function getCurrentUser(id, room) {
    console.log(users, userToRoom);
    return users[room].find(user => user.id === id);
}

function userLeaves(id, room) {
    users[room] = users[room].filter(user => user.id !== id);
    delete userToRoom[id];
    console.log(users, userToRoom);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeaves,
    users,
    userToRoom
};