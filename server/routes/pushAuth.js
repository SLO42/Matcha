const express = require("express");
const router = express.Router();
const Pusher = require('pusher');

let pusher = new Pusher({
    appId: 'PUSHER_APP_ID',
    key: 'PUSHER_APP_KEY',
    secret: 'PUSHER_APP_SECRET',
    cluster: 'PUSHER_APP_CLUSTER',
    useTLS: true
});

router.post("/", (req, res) => {
    let socketId = req.body.socket_id;
    let channel = req.body.channel_name;
    let random_string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    let presenceData = {
        user_id: random_string,
        user_info: {
            username: '@' + random_string,
        }
    };
    let auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

module.exports = router;