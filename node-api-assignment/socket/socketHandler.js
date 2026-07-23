const liveUsers = new Map();

const socketHandler = (io) => {

    io.on("connection", (socket) => {

        console.log(
            "Socket connected:",
            socket.id
        );

        // User joins live_users room
        socket.on("joinLiveUsers", (user) => {

            if (!user || !user._id) {
                return;
            }

            socket.join("live_users");

            const liveUser = {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                socketId: socket.id
            };

            // Store connected user
            liveUsers.set(
                socket.id,
                liveUser
            );

            console.log(
                "User joined live_users:",
                liveUser
            );

            // Send updated list to everyone
            io.to("live_users").emit(
                "liveUsersList",
                Array.from(
                    liveUsers.values()
                )
            );
        });


        // User disconnect
        socket.on("disconnect", () => {

            console.log(
                "Socket disconnected:",
                socket.id
            );

            // Remove user
            liveUsers.delete(socket.id);

            // Send updated list
            io.to("live_users").emit(
                "liveUsersList",
                Array.from(
                    liveUsers.values()
                )
            );
        });

    });

};

module.exports = socketHandler;