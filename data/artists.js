/* TOP MUSIC
 * Artists
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const ObjectId = require('mongodb').ObjectId;
const artists = mongoCollections.artists;

let exportedMethods = {
    async GetAllArtists() {
        try {
            let artistsCollection = await artists();
            let artistsList = await artistsCollection.find().toArray();
            if (!artistsList.length) throw 'There are no artists';
            return artistsList;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async GetArtistsById(id) {
        try {
            let artistsCollection = await artists();
            let artistsList = await artistsCollection.findOne({ _id: id, isDeleted: 0 });
            if (!artistsList) throw 'Artist not found';
            return artistsList;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async incrementCountById(id) {
        try {
            if (id === undefined) return Promise.reject('No id provided');
            const artistCollection = await artists();
            // Can increment positively or negatively by any value
            return artistCollection
                .updateOne({ _id: id }, { $inc: { count: 1 } });
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async AddArtists(artistData) {
        try {
            let artistsCollection = await artists();
            let insertArtist = await artistsCollection.insertMany(artistData);
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async removeArtist(id) {
        try {
            if (id === undefined) return Promise.reject('No id provided');
            let currentArtist = await this.GetArtistsById(id);
            const artistCollection = await artists();

            const deletedInfo = await artistCollection.removeOne({ _id: ObjectId(id) });
            if (deletedInfo.deletedCount === 0) throw `Could not delete artist with id of ${id}`;

            let output = {
                "deleted": true,
                "data": {
                    "_id": currentArtist._id,
                    "artistName": currentArtist.artistName,
                    "profileLogo": currentArtist.profileLogo,
                    "createdDate": currentArtist.createdDate,
                    "isDeleted": currentArtist.isDeleted,
                    "genres": currentArtist.genres,
                    "count": currentArtist.count
                }
            };
            return output;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async updateArtist(id, artistName, profileLogo, createdDate, isDeleted, genres, count) {
        try {
            if (id === undefined) return Promise.reject('No id provided');
            if (artistName === undefined) return Promise.reject('No artist name provided');
            if (profileLogo === undefined) return Promise.reject('No profile logo provided');
            if (createdDate === undefined) return Promise.reject('No created date provided');
            if (isDeleted === undefined) return Promise.reject('No deletion info provided');
            if (genres === undefined) return Promise.reject('No genres provided');
            if (count === undefined) return Promise.reject('No count provided');

            const artistCollection = await artists();
            // const userThatPosted = await users.getUserById(posterId);

            let updatedArtist = {
                artistName: artistName,
                profileLogo: profileLogo,
                createdDate: createdDate,
                isDeleted: isDeleted,
                genres: genres,
                count: count
            };

            const updateInfo = await artistCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedArtist });
            if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
            return this.GetArtistsById(id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
};

module.exports = exportedMethods;
