const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

// Local Files
const connectDB = require("./config/db");
const socketHandler = require("./socket/socketHandler");

// Load Environment Variables
dotenv.config();

// Create Express App
const app = express();

// ==========================================
// CREATE HTTP SERVER
// ==========================================

const server = http.createServer(app);

// ==========================================
// CREATE SOCKET.IO SERVER
// ==========================================

const io = new Server(server, {
    path: "/socket.io",
    serveClient: true,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

console.log("Socket.IO initialized successfully");

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// ==========================================
// API ROUTES
// ==========================================

app.use(
    "/api/users",
    require("./routes/userRoutes")
);

// ==========================================
// STATIC PUBLIC FOLDER
// ==========================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

// ==========================================
// HOME PAGE
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});

// ==========================================
// USERS PAGE
// ==========================================

app.get("/users.html", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "users.html"
        )
    );

});

// ==========================================
// START SOCKET.IO HANDLER
// ==========================================

socketHandler(io);

// ==========================================
// CONNECT MONGODB
// ==========================================

connectDB();

// ==========================================
// PORT
// ==========================================

const PORT =
    process.env.PORT || 5000;

// ==========================================
// START HTTP + SOCKET.IO SERVER
// ==========================================

// IMPORTANT:
// app.listen() use nahi karna.
// server.listen() hi use karna hai.

server.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

    console.log(
        `Socket.IO Client: http://localhost:${PORT}/socket.io/socket.io.js`
    );

});