export const users = {
    "Checkers": [],
    "Chess": [],
    "Connect 4": []
};
export const userToRoom = {};

export function userJoin(id, username, room) {
    const user = { id, username };
    users[room].push(user);
    userToRoom[id] = room;
    console.log(users, userToRoom);
    return user;
}

export function getCurrentUser(id, room) {
    if (!users[room]) {
        return
    }
    console.log(users, userToRoom);
    return users[room].find(user => user.id === id);
}

export function userLeaves(id, room) {
    if (!users[room]) {
        return
    }
    users[room] = users[room].filter(user => user.id !== id);
    delete userToRoom[id];
    console.log(users, userToRoom);
}