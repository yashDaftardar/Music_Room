/* TOP MUSIC
 * Genres
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectId;
const genres = mongoCollections.genres;

let exportedMethods = {
  async GetAllGenres() {
    try {
      let genresCollection = await genres();
      let genresList = await genresCollection.find({}).toArray();
      if (!genresList.length) throw 'There are no genres';
      return genresList;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async GetGenresById(id) {
    try {
      let genresCollection = await genres();
      let genre = await genresCollection.findOne({ _id: id });
      return genre;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async incrementCountById(id) {
    try {
      if (id === undefined) return Promise.reject('No id provided');
      const genresCollection = await genres();
      // Can increment positively or negatively by any value
      return genresCollection
        .updateOne({ _id: id }, { $inc: { count: 1 } });
    } catch (e) {
      throw new Error(e.message);
    }
  },

  async AddGenres(genreData) {
    try {
      let genresCollection = await genres();
      let insertGenres = await genresCollection.insertMany(genreData);
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeGenre(id) {
    try {
      if (id === undefined) return Promise.reject('No id provided');
      let currentGenre = await this.GetGenresById(id);
      const genreCollection = await genres();

      const deletedInfo = await genreCollection.removeOne({ _id: ObjectId(id) });
      if (deletedInfo.deletedCount === 0) throw `Could not delete genre with id of ${id}`;

      let output = {
        "deleted": true,
        "data": {
          "_id": currentGenre._id,
          "genreName": currentGenre.genreName,
          "createdDate": currentGenre.createdDate,
          "isDeleted": currentGenre.isDeleted,
          "count": currentGenre.count
        }
      };
      return output;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateGenre(id, genreName, createdDate, isDeleted, count) {
    try {
      if (id === undefined) return Promise.reject('No id provided');
      if (genreName === undefined) return Promise.reject('No genre name provided');
      if (createdDate === undefined) return Promise.reject('No creation date provided');
      if (isDeleted === undefined) return Promise.reject('No deletion info provided');
      if (count === undefined) return Promise.reject('No count provided');
      const genreCollection = await genres();
      // const userThatPosted = await users.getUserById(posterId);
      let updatedGenre = { 
        genreName: genreName,
        createdDate: createdDate,
        isDeleted: isDeleted,
        count: count
      };
      const updateInfo = await genreCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedGenre });
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
      return this.GetGenresById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  }
};

module.exports = exportedMethods;
