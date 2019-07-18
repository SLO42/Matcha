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

router.post('/update-location', (req, res) => {
    // trigger a new location update event via pusher
    pusher.trigger('presence-channel', 'location-update', {
        'username': req.body.username,
        'location': req.body.location
    })
    res.json({ 'status': 200 });
});

module.exports = router;
