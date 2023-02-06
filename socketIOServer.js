let users = [];

const socketIOServer = (socket) => {
  //połączenie -rozłączenie socketa
  socket.on("joinUser", (user) => {
    users.push({
      id: user._id,
      socketId: socket.id,
      followers: user.followers,
    });
    //console.log({ users });
  });

  socket.on("disconnect", () => {
    const data = users.find((user) => user.socketId === socket.id);

    if (data) {
      const clients = users.filter((user) =>
        data.followers.find((item) => item._id === user.id)
      );
      if (clients.length > 0) {
        clients.forEach((client) => {
          socket.to(`${client.socketId}`).emit("CheckUserOffline", data.id);
        });
      }
    }

    users = users.filter((user) => user.socketId !== socket.id);
  });

  //polubienia
  socket.on("likePost", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("likeToClient", newPost);
      });
    }
  });

  socket.on("unLikePost", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("unLikeToClient", newPost);
      });
    }
  });

  //komentarze
  socket.on("createComment", (newPost) => {
    //console.log(newPost);
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("createCommentToClient", newPost);
      });
    }
  });

  //Kasowanie komentarzy

  socket.on("deleteComment", (newPost) => {
    //console.log(newPost);
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("deleteCommentToClient", newPost);
      });
    }
  });

  //Śledzenie userów
  socket.on("follow", (newUser) => {
    // console.log(newUser);
    const user = users.find((user) => user.id === newUser._id);
    //console.log(user);
    user && socket.to(`${user.socketId}`).emit("followToClient", newUser);
  });

  socket.on("unFollow", (newUser) => {
    // console.log(newUser);
    const user = users.find((user) => user.id === newUser._id);
    //console.log(user);
    user && socket.to(`${user.socketId}`).emit("unFollowToClient", newUser);
  });

  //notyfikacje
  socket.on("createNotify", (msg) => {
    const client = users.find((user) => msg.recipients.includes(user.id));
    client && socket.to(`${client.socketId}`).emit("createNotifyToClient", msg);
  });

  //Usuń notificationa
  socket.on("removeNotify", (msg) => {
    const client = users.find((user) => msg.recipients.includes(user.id));
    client && socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg);
  });

  //Komunikator
  socket.on("addMessage", (msg) => {
    const user = users.find((user) => user.id === msg.recipient);
    user &&
      socket.to(`${user.socketId}`).emit("addMessageToSocketConnection", msg);
  });

  //Online/offline oto jest pytanie

  socket.on("checkUserOnline", (data) => {
    const following = users.filter((user) =>
      data.following.find((item) => item._id === user.id)
    );

    socket.emit("checkUserOnlineToMe", following);

    const clients = users.filter((user) =>
      data.followers.find((item) => item._id === user.id)
    );

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit(`checkUserOnlineToClient`, data._id);
      });
    }
  });
};

module.exports = socketIOServer;
