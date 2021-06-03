/* TOP MUSIC
 * Private
 * ~
 */

const express = require('express');
const router = express.Router();

const data = require('../data');
const moment = require('moment');
const jwt = require('jsonwebtoken');

//Profile Page

router.get('/profile', async (req, res) => {
    res.render('profile/private', {
        layout: "main",
        title: "Music Room - Profile",
        auth: (req.session.auth) ? req.session.auth : "",
        message: "Please login to view profile.",
        userID: user_id
      });
});

module.exports = router;