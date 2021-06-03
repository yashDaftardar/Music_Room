/* TOP MUSIC
 * Threads
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const threads = mongoCollections.threads;
const subThreads = mongoCollections.subThreads;
const threadLikes = mongoCollections.threadLikes;
const users = mongoCollections.users;
const moment = require('moment');

let exportedMethods = {
    async GetAllThreads() {
        try {
            let threadsCollection = await threads();
            let threadList = await threadsCollection.find({}).sort({ createdDate: -1 }).toArray();
            let user_ids = threadList.map(x => x.userId);
            let usersCollection = await users();
            let userData = await usersCollection.find({ _id: { $in: user_ids } }).toArray();
            threadList.forEach(element => {
                userData.forEach(uelement => {
                    if (element.userId == uelement._id) {
                        element["fullName"] = uelement.fullName;
                        element["profileLogo"] = uelement.profileLogo;
                    }
                });
            });
            return threadList;
        } catch (e) {
            throw new Error(e.message);
        }
    },

    async AddThread(threadData) {
        try {
            let threadsCollection = await threads();
            await threadsCollection.insertOne(threadData);
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    },

    async GetThread(id) {
        try {
            let threadsCollection = await threads();
            let threadList = await threadsCollection.find(
                { $query: { _id: id } }
            ).project({ _id: 1, title: 1, comment: 1, media: 1, likeCount: 1, commentCount: 1 }).toArray();
            return threadList;
        } catch (e) {
            throw new Error(e.message);
        }
    },

    async GetAllUserThreads(user_id) {
        try {
            let threadsCollection = await threads();
            let threadList = await threadsCollection.find({ $query: { userId: user_id } }).sort({ createdDate: -1 }).toArray();
            return threadList;
        } catch (e) {
            throw new Error(e.message);
        }
    },

    async getThreadByLike(thread_id, user_id) {
        try {
            let likeCollection = await threadLikes();
            let likeData = await likeCollection.findOne({ userId: user_id, threadId: thread_id });
            return likeData;
        } catch (e) {
            throw new Error(e.message);
        }
    },

    async addThreadLike(likeData) {
        try {
            let likeCollection = await threadLikes();
            let addLike = await likeCollection.insertOne(likeData);
            let getThread = await this.GetThread(likeData.threadId);
            let threadsCollection = await threads();
            let count = (getThread.length && getThread[0].likeCount) ? getThread[0].likeCount + 1 : 1;
            let updateLikeCount = await threadsCollection.updateOne({ _id: likeData.threadId }, { $set: { likeCount: count } });
            return count;
        } catch (e) {
            throw new Error(e.message);
        }
    },

    async removeThreadLike(thread_id, user_id) {
        try {
            let likeCollection = await threadLikes();
            let removeLike = await likeCollection.deleteOne({ threadId: thread_id, userId: user_id });
            let getThread = await this.GetThread(thread_id);
            let threadsCollection = await threads();
            let count = 0;
            if (getThread.likeCount != 0) {
                count = (getThread.length && getThread[0].likeCount) ? getThread[0].likeCount - 1 : 1;
                let updateLikeCount = threadsCollection.updateOne({ _id: thread_id }, { $set: { likeCount: count } });
            }
            return count;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async getThreadLikeWise(thread_id, user_id) {
        try {
            let likeCollection = await threadLikes();
            let likeData = await likeCollection.find({ $query: { userId: user_id, threadId: { $in: thread_id } } }).toArray();
            return likeData;
        } catch (e) {
            throw new Error(e.message);
        }
    },

    async UpdateThread(threadData, thread_id) {
        try {
            let threadsCollection = await threads();
            let updateLikeCount = await threadsCollection.updateOne({ _id: thread_id }, { $set: threadData });
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async DeleteThread(thread_id) {
        try {
            let threadsCollection = await threads();
            let deleteThread = await threadsCollection.deleteOne({ _id: thread_id });
            let subThreadsCollection = await subThreads();
            let deleteSubThread = await subThreadsCollection.deleteMany({ threadId: thread_id });
            let likeCollection = await threadLikes();
            let removeLike = await likeCollection.deleteMany({ threadId: thread_id });
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async CreateSubThread(threadData) {
        try {
            let subThreadsCollection = await subThreads();
            await subThreadsCollection.insertOne(threadData);
            let getThread = await this.GetThread(threadData.threadId);
            let count = getThread[0].commentCount + 1;
            let threadsCollection = await threads();
            let updateLikeCount = await threadsCollection.updateOne({ _id: threadData.threadId }, { $set: { commentCount: count } });
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async DeleteSubThread(sub_thread_id) {
        try {
            let subThreadsCollection = await subThreads();
            let threadsCollection = await threads();
            let threadData = await subThreadsCollection.find({ $query: { _id: sub_thread_id } }).project({ threadId: 1 }).toArray();
            let deleteSubThread = await subThreadsCollection.deleteOne({ _id: sub_thread_id });
            let getThread = await this.GetThread(threadData[0].threadId);
            let count = (getThread[0].commentCount > 0) ? getThread[0].commentCount - 1 : 0;
            let updateLikeCount = await threadsCollection.updateOne({ _id: threadData[0].threadId }, { $set: { commentCount: count } });
            return true;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async GetSubThread(thread_ids) {
        try {
            let subThreadsCollection = await subThreads();
            let subThreadList = await subThreadsCollection.find({ threadId: { $in: thread_ids } }).sort({ createdDate: -1 }).toArray();
            let user_ids = subThreadList.map(x => x.userId);
            let usersCollection = await users();
            let userData = await usersCollection.find({ _id: { $in: user_ids } }).toArray();
            subThreadList.forEach(element => {
                userData.forEach(uelement => {
                    if (element.userId == uelement._id) {
                        element["fullName"] = uelement.fullName;
                        element["profileLogo"] = uelement.profileLogo;
                    }
                });
            });
            return subThreadList;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    async sortThreads(input) {
        try {
            const threadCollection = await threads();
            let sort;
            if (input == 'artist') {
                sort = await threadCollection.find({}).sort({ artist: 1, createdDate: -1 }).toArray();
            } else if (input == 'comments') {
                sort = await threadCollection.find({}).sort({ commentCount: -1, createdDate: -1 }).toArray();
            } else if (input == 'date') {
                sort = await threadCollection.find({}).sort({ createdDate: 1 }).toArray();
            } else if (input == 'genre') {
                sort = await threadCollection.find({}).sort({ genres: 1, createdDate: -1 }).toArray();
            } else {
                sort = await threadCollection.find({}).sort({ likeCount: -1, createdDate: -1 }).toArray();
            }
            let user_ids = sort.map(x => x.userId);
            const usersCollection = await users();
            let userData = await usersCollection.find({ _id: { $in: user_ids } }).toArray();
            sort.forEach(element => {
                userData.forEach(uelement => {
                    if (element.userId == uelement._id) {
                        element["fullName"] = uelement.fullName;
                        element["profileLogo"] = uelement.profileLogo;
                    }
                });
            });
            return sort;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = exportedMethods;