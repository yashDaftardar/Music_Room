/* TOP MUSIC
 * Routes
 * ~
 */

const data = require("../data");
const threads = require("./threads");
const users = require("./users");
const jwt = require('jsonwebtoken');
const uuid = require("uuid/v4");

const accessRoutes = require("./access");
const threadRoutes = require("./threads");

module.exports = app => {
  app.use("/access", accessRoutes);
  app.use("/thread", threads);
  app.use("/users", users);


  app.get("/*.handlebars", async (req, res) => {
    let url = req.originalUrl;
    let page = url.substring(1, url.length - 11);
    res.render(page);
  });

  app.get("/", async (req, res) => {
    let user_id = "", getLikeData =[];
    if (req.session.auth) {
      user_id = await jwt.verify(req.session.auth, 'secret').userid;
    }
    let getThreadData = await data.threads.GetAllThreads();
    app.locals.sess = req.session;
    let thread_ids = getThreadData.map(x => x._id);
    let getsubThreadData = await data.threads.GetSubThread(thread_ids);
    if(user_id){
     getLikeData = await data.threads.getThreadLikeWise(thread_ids, user_id);
    }
    getThreadData.forEach(element => {
      getLikeData.forEach(lelement => {
        if (user_id && element._id == lelement.threadId && element.userId == user_id) {
          element["userlike"] = 1;
        }
      });
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
        auth: (req.session.auth) ? req.session.auth : "",
        userID: user_id,
        top_artist : top_artist,
        top_genres : top_genres,
        top_artist_by_genres : top_artist_by_genres
      });
    } else {
      res.render('profile/homePage', {
        layout: "main",
        title: "Music Room",
        threadData: getThreadData,
        auth: (req.session.auth) ? req.session.auth : "",
        message: "No Posts Yet. Login to be the first post!",
        userID: user_id,
        top_artist : top_artist,
        top_genres : top_genres,
        top_artist_by_genres : top_artist_by_genres
      });
    }
  });

  app.post("/", async (req, res) => {
    let input = req.body.dropdown;
    let user_id = "", getLikeData =[];
    if (req.session.auth) {
      user_id = await jwt.verify(req.session.auth, 'secret').userid;
    }
    let sorted = await data.threads.sortThreads(input);
    app.locals.sess = req.session;
    let thread_ids = sorted.map(x => x._id);
    let getsubThreadData = await data.threads.GetSubThread(thread_ids);
    if(user_id){
      getLikeData = await data.threads.getThreadLikeWise(thread_ids, user_id);
     }
    sorted.forEach(async (element) => {
      getLikeData.forEach(lelement => {
        if (user_id && element._id == lelement.threadId && element.userId == user_id) {
          element["userlike"] = 1;
        }
      });
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
    res.render('profile/homePage', {
      layout: "main",
      title: "Music Room",
      threadData: sorted,
      auth: (req.session.auth) ? req.session.auth : "",
      userID: user_id,
      top_artist : top_artist,
      top_genres : top_genres,
      top_artist_by_genres : top_artist_by_genres
    });
  });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });

};