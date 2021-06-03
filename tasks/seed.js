var dbConnection = require('../config/mongoConnection');
var data = require("../data");
var moment = require('moment');
var uuid = require('uuid');

async function AddDataToDatabase() {
    try {
        const db = await dbConnection();
        await db.dropDatabase();

        var genres_array = [{
            _id: uuid.v4(),
            genreName: "Jazz",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 2
        }, {
            _id: uuid.v4(),
            genreName: "Rock",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 1
        }, {
            _id: uuid.v4(),
            genreName: "Pop",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 4
        }, {
            _id: uuid.v4(),
            genreName: "Hip-Hop",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 3
        }, {
            _id: uuid.v4(),
            genreName: "Folk",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 5
        }, {
            _id: uuid.v4(),
            genreName: "Classic",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 6
        }, {
            _id: uuid.v4(),
            genreName: "Reggae",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 7
        }, {
            _id: uuid.v4(),
            genreName: "KPop",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 8
        }, {
            _id: uuid.v4(),
            genreName: "Grunge",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 9
        }, {
            _id: uuid.v4(),
            genreName: "Country",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 0
        }, {
            _id: uuid.v4(),
            genreName: "Ska",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 0
        }, {
            _id: uuid.v4(),
            genreName: "LoFi",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 0
        }, {
            _id: uuid.v4(),
            genreName: "Punk",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 0
        }, {
            _id: uuid.v4(),
            genreName: "EDM",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 0
        }, {
            _id: uuid.v4(),
            genreName: "Indie",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            count: 0
        }];


        var insertGenre = await data.genres.AddGenres(genres_array);
        var getGenreData = await data.genres.GetAllGenres();

        var artist_array = [{
            _id: uuid.v4(),
            artistName: "Astrud Gilberto",
            profileLogo: "Astrud_Gilberto.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Jazz"],
            count: 0
        }, {
            _id: uuid.v4(),
            artistName: "Audioslave",
            profileLogo: "Audioslave.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Rock"],
            count: 0
        }, {
            _id: uuid.v4(),
            artistName: "Bill Evans",
            profileLogo: "Bill_Evans.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Jazz"],
            count: 0
        }, {
            _id: uuid.v4(),
            artistName: "Lady Gaga",
            profileLogo: "Lady_Gaga.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop"],
            count: 5
        }, {
            _id: uuid.v4(),
            artistName: "Alicia Keys",
            profileLogo: "Alicia_Keys.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop", "Pop"],
            count: 6
        }, {
            _id: uuid.v4(),
            artistName: "David Bowie",
            profileLogo: "David_Bowie.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Rock", "Pop"],
            count: 3
        }, {
            _id: uuid.v4(),
            artistName: "Madonna",
            profileLogo: "Madonna.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop"],
            count: 2
        }, {
            _id: uuid.v4(),
            artistName: "Young Jeezy",
            profileLogo: "Young_Jeezy.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop"],
            count: 0
        }, {
            _id: uuid.v4(),
            artistName: "Frank Zappa",
            profileLogo: "Frank_Zappa.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Rock", "Jazz", "Classic"],
            count: 4
        }, {
            _id: uuid.v4(),
            artistName: "Lana Del Rey",
            profileLogo: "Lana_Del_Rey.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop", "Rock"],
            count: 3
        }, {
            _id: uuid.v4(),
            artistName: "Leon Russell",
            profileLogo: "Leon_Russell.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop", "Rock", "Folk"],
            count: 1
        }, {
            _id: uuid.v4(),
            artistName: "Young Jeezy",
            profileLogo: "Young_Jeezy.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop"],
            count: 1
        }, {
            _id: uuid.v4(),
            artistName: "Frida Lyngstad",
            profileLogo: "Frida_Lyngstad.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Pop", "Jazz"],
            count: 7
        }, {
            _id: uuid.v4(),
            artistName: "Eric B. & Rakim",
            profileLogo: "Eric_Rakim.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop"],
            count: 5
        }, {
            _id: uuid.v4(),
            artistName: "Mac Miller",
            profileLogo: "",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Hip-Hop"]
        }, {
            _id: uuid.v4(),
            artistName: "Elvis Costello",
            profileLogo: "Elvis_Costello.jpg",
            createdDate: moment(new Date()).format("DD:MM:YYYY HH:mm:ss"),
            isDeleted: 0,
            genres: ["Rock", "Pop"],
            count: 0
        }];

        artist_array.forEach(ele1 => {
            getGenreData.forEach(ele2 => {
                if (ele1.genres.includes(ele2.genreName)) {
                    ele1.genres = ele1.genres.map(dt => {
                        if (dt == ele2.genreName) {
                            return dt = ele2._id;
                        } else {
                            return dt;
                        }
                    });
                }
            });
        });

        var insertArtist = await data.artists.AddArtists(artist_array);
        let top10A = await data.metrics.topTenArtists();
        let top10G = await data.metrics.topTenGenres();
        let top10AiG = await data.metrics.topTenArtistsInGenre();
        // console.log(top10A);
        // console.log(top10G);
        // console.log(top10AiG);
        console.log("genre and artist data inserted successfully");
        await db.serverConfig.close();

    } catch (e) {
        console.log(e.message);
    }
}

AddDataToDatabase();