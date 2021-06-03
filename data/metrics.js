
const mongoCollections = require('../config/mongoCollections');
const artists = mongoCollections.artists;
const genres = mongoCollections.genres;
const genre = require('./genres');

let exportedMethods = {
    async topTenArtists() {
        try {
            const artistsCollection = await artists();
            const top10 = await artistsCollection.find({}).sort({ count: -1, artistName: 1 }).limit(10).toArray();
            let arr = [];
            for (let x of top10) {
                arr.push({
                    artistName : x.artistName,
                    profileLogo : x.profileLogo
                });
            }
            return arr;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async topTenGenres() {
        try {
            const genresCollection = await genres();
            const top10 = await genresCollection.find({}).sort({ count: -1, genreName: 1 }).limit(10).toArray();
            let arr = [];
            for (let x of top10) {
                arr.push(x.genreName);
            }
            return arr;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async topTenArtistsInGenre() {
        try {
            const artistsCollection = await artists();
            const sortedA = await artistsCollection.find({}).sort({ count: -1, artistName: 1 }).toArray();
            const top10G = await this.topTenGenres();
            let obj = {};
            for (let g of top10G) {
                obj[g] = "";
            }
            let count = 0;
            for (let x of sortedA) {
                for (let y of x.genres) {
                    if (count == 10) {
                        return obj;
                    }
                    let gen = await genre.GetGenresById(y);
                    if (obj[gen.genreName] === "") {
                        obj[gen.genreName] = x.artistName;
                        count++;
                    }
                }
            }
            return obj;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async topTenArtistsbyGenre() {
        try {
            const artistsCollection = await artists();
            const sortedA = await artistsCollection.find({}).sort({ count: -1, artistName: 1 }).toArray();
            const top10G = await this.topTenGenres();
            let obj = [];
            for (let g of top10G) {
                obj.push({
                    genreName : g
                });
            }
            let count = 0;
            for (let x of sortedA) {
                for (let y of x.genres) {
                    if (count == 10) {
                        break;
                    }
                    let gen = await genre.GetGenresById(y);
                    if (gen != null) {
                        obj.forEach(ele=>{
                            if(ele.genreName ==gen.genreName){
                                ele["artistName"] = x.artistName;
                                ele["profileLogo"] = x.profileLogo;
                            }
                        })
                        count++;
                    }
                }
            }
            obj = obj.filter(dt=>{
                if(!dt.artistName){
                    return false;
                }else{
                    return true;
                }
            });
            return obj;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = exportedMethods;
