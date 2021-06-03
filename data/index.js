/* TOP MUSIC
 * Data
 * ~
 */

const artistData = require("./artists");
const genreData = require("./genres");
const metricData = require("./metrics");
const threadData = require("./threads");
const userData = require("./users");
const encryption = require("./encryption");

module.exports = {
  artists: artistData,
  genres: genreData,
  metrics: metricData,
  threads: threadData,
  users: userData,
  encryption: encryption
};
