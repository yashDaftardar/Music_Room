const express = require('express');
const router = express.Router();
const data = require('../data');
const uuid = require('uuid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

//Register Page
router.get('/signUpPage', async (req, res) => {
    try {
        let artist_data = await data.artists.GetAllArtists();
        let genre_data = await data.genres.GetAllGenres();
        res.render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
    } catch (e) {
        res.status(401).redirect('/');
    }
});

//Registration Api
router.post("/registration", async (req, res) => {
    try {
        let artist_data = await data.artists.GetAllArtists();
        let genre_data = await data.genres.GetAllGenres();
        if (!req.body.full_name) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else if (!req.body.email_address) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else if (!req.body.password) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else if (!req.body.genres_ids) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else if (!req.body.artist_ids) {
            res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data });
        } else {
            let userData = {
                _id: uuid.v4(),
                fullName: req.body.full_name,
                emailAddress: req.body.email_address.toLowerCase(),
                password: data.encryption.encrypt(req.body.password),
                genres: req.body.genres_ids,  // should be array
                artist: req.body.artist_ids, // should by array
                createDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
                isDeleted: 0,
                lastUpdatedDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
                profileLogo: req.body.profileLogo
            }
            if (Array.isArray(userData.genres)) {
                for (let i of userData.genres){
                    await data.genres.incrementCountById(i);
                }
            } else {
                await data.genres.incrementCountById(userData.genres);
            }
            if (Array.isArray(userData.genres)) {
                for (let j of userData.artist){
                    await data.artists.incrementCountById(j);
                }
            } else {
                await data.genres.incrementCountById(userData.artist);
            }

            let checkUser = await data.users.CheckUserExist(req.body.email_address.toLowerCase());
            if (checkUser == null) {
                let AddUser = await data.users.CreateUser(userData);
                // res.json(AddUser)
                res.render("profile/login", { layout: "main", "success" : "You have successfully registered. Please login!" });
            } else {
                res.status(401).render("profile/signUpPage", { layout: "main", artist_data: artist_data, genre_data: genre_data, error_message: "Email address already exists." });
            }
        }
    } catch (e) {
        res.status(401).redirect('/');
    }
});

router.post("/login", async (req, res) => {
    try {
        var userData = await data.users.CheckUserExist(req.body.email_address.toLowerCase());
        if (userData == null) {
            res.status(401).render("profile/login", { layout: "main", error: "No user found." });
        } else {
            let password = data.encryption.decrypt(userData.password);
            if (password == req.body.password) {
                req.session.auth = jwt.sign({ userid: userData._id }, 'secret');
                let getThreadData = await data.threads.GetAllThreads();
                let thread_ids = getThreadData.map(x => x._id);
                let getLikeData = await data.threads.getThreadLikeWise(thread_ids, userData._id);
                let getsubThreadData = await data.threads.GetSubThread(thread_ids);
                let top_artist = await data.metrics.topTenArtists();
                let top_genres = await data.metrics.topTenGenres();
                let top_artist_by_genres = await data.metrics.topTenArtistsbyGenre();
                getThreadData.forEach(async (element) => {
                    getLikeData.forEach(lelement => {
                        if (element._id == lelement.threadId && element.userId == userData._id) {
                            element["userlike"] = 1;
                        }
                    });
                    element["subThread"] = [];
                    getsubThreadData.forEach(selement => {
                        if (element._id == selement.threadId) {
                            element["subThread"].push(selement);
                        }
                    });
                })
                if (getThreadData.length) {
                    res.render("profile/homePage", {
                        auth: req.session.auth,
                        threadData: getThreadData,
                        userID: userData._id,
                        top_artist : top_artist,
                        top_genres : top_genres,
                        top_artist_by_genres : top_artist_by_genres
                    });
                } else {
                    res.render("profile/homePage", {
                        auth: req.session.auth,
                        threadData: getThreadData,
                        userID: userData._id,
                        message: "No Forum Posts!",
                        top_artist : top_artist,
                        top_genres : top_genres,
                        top_artist_by_genres : top_artist_by_genres
                    });
                }
            } else {
                res.status(404).render("profile/login", { layout: "main", error: "Incorrect email address/password." });
            }
        }
    } catch (error) {
        res.status(404).render("profile/login", { layout: "main" });
    }
});

router.get("/logout", async (req, res) => {
    try {
        req.session.destroy();
        let getThreadData = await data.threads.GetAllThreads();
        let thread_ids = getThreadData.map(x => x._id);
        let getsubThreadData = await data.threads.GetSubThread(thread_ids);
 
        getThreadData.forEach(async (element) => {
            element["subThread"] = [];
            getsubThreadData.forEach(selement => {
                if (element._id == selement.threadId) {
                    element["subThread"].push(selement);
                }
            });
        });
        let top_artist = await data.metrics.topTenArtists();
        let top_genres = await data.metrics.topTenGenres();
        let top_artist_by_genres = await data.metrics.topTenArtistsbyGenre();
        if (getThreadData.length) {
            res.render('profile/homePage', {
                layout: "main",
                title: "Music Room",
                threadData: getThreadData,
                auth: "",
                top_artist : top_artist,
                top_genres : top_genres,
                top_artist_by_genres : top_artist_by_genres
            });
        } else {
            res.render('profile/homePage', {
                layout: "main",
                title: "Music Room",
                threadData: getThreadData,
                auth: "",
                message: "No Posts Yet. Login to be the first post!",
                top_artist : top_artist,
                top_genres : top_genres,
                top_artist_by_genres : top_artist_by_genres
            });
        }
    } catch (e) {
        res.status(401).redirect('/');
    }
});

router.post("/forgetPassword", async (req, res) => {
    if (!req.body.email_address) {
        res.status(401).render("profile/forgetPassword", { layout: "main", error: "Please provide an email address." });
    } else {
        var userData = await data.users.CheckUserExist(req.body.email_address);
        if (userData == null) {
            res.status(401).render("profile/forgetPassword", { layout: "main", error: "That email address is not valid." });
        } else {
            res.status(401).render("profile/forgetPassword", { layout: "main", email_data: req.body.email_address, user_id: userData._id });
        }
    }
});

router.post("/changePassword", async (req, res) => {
    try {
        if (!req.body.new_password) {
            res.status(401).render("profile/forgetPassword", { layout: "main", error: "Please provide a new password.", email_data: req.body.email_address });
        } else {
            let password = data.encryption.encrypt(req.body.new_password);
            var userData = await data.users.updatePassword(req.body.user_id, password);
            if (userData == null) {
                res.render("profile/forgetPassword", { layout: "main", error: "The email address is not valid." });
            } else {
                res.render("profile/login", { layout: "main", message: "Password has been successfully changed. Please login!" });
            }
        }
    } catch (e) {
        res.status(401).redirect('/');
    }
});

module.exports = router;