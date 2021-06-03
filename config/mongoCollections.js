const dbConnection = require("./mongoConnection");
let getCollectionFn = collection => {
  let _col = undefined;
  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }
    return _col;
  };
};
module.exports = {
  artists: getCollectionFn("artists"),
  genres: getCollectionFn("genres"),
  metrics: getCollectionFn("metrics"),
  threads: getCollectionFn("threads"),
  users: getCollectionFn("users"),
  threadLikes: getCollectionFn("threadLikes"),
  subThreads: getCollectionFn("subThreads"),
};
