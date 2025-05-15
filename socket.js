module.exports = function(io) {
  const users = [];

  const addUser = (id, username, room) => {
    // Remove existing user with the same username in the same room
    const existingIndex = users.findIndex(user => user.username === username && user.room === room);
    if (existingIndex !== -1) {
      users.splice(existingIndex, 1); // Remove the duplicate
    }

    const user = { id, username, room };
    users.push(user);
    return user;
  };

  const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  };

  const getRoomUsers = (room) => {
    return users.filter(user => user.room === room);
  };

  io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('joinRoom', ({ username, room }) => {
      const user = addUser(socket.id, username, room);
      socket.join(room);
      socket.username = username;

      // Welcome message to the user
      socket.emit('message', { user: 'System', text: `Welcome ${username}` });


      // Notify others in the room
      socket.broadcast.to(room).emit('message', {
        user: 'System',
        text: `${username} has joined the chat`
      });

      // Send updated user list
      io.to(room).emit('roomUsers', {
        room: room,
        users: getRoomUsers(room)
      });
    });

    socket.on('chatMessage', (data) => {
      io.to(data.room).emit('message', {
        user: data.user,
        text: data.text
      });
    });

    socket.on('disconnect', () => {
  const user = removeUser(socket.id);
  if (user) {
    // Send a system message indicating the user left
    io.to(user.room).emit('message', {
      user: 'System',  // Change 'Admin' to 'System' for differentiation
      text: `${user.username} has left the chat`
    });

    // Update the user list after a user leaves
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  }
});

  });
};
