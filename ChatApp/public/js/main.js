// import Qs from "qs";

const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const socket = io();

socket.emit('joinRoom', { username, room });

// document.onload = () =>
    document.querySelector("#room-name").append(document.createTextNode(room));

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

socket.on("initializeRoom", message => {
    const users = document.querySelector("#users");

    message.users.forEach(user => {
        const li = document.createElement("li");
        li.dataset.userId = user.id;
        li.append(document.createTextNode(user.username));
        users.prepend(li);
    });
});

socket.on("newUser", ({id, username}) => {
    const users = document.querySelector("#users");
    const li = document.createElement("li");
    li.dataset.userId = id;
    li.append(document.createTextNode(username));
    users.prepend(li);
});

socket.on("byeUser", ({id, username}) => {
    document.querySelector(`#users [data-user-id="${id}"]`).remove();
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get message text
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;
})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
                <p class="text">
                    ${message.text}
                </p>`;
    document.querySelector('.chat-messages').append(div);
}