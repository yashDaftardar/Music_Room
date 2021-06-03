/* TOP MUSIC
 * Users
 * ~
 */

const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

async  function GetAllUsers() {
    try {
        let usersCollection = await users();
        let usersList = await usersCollection.find().toArray();
        if (!usersList.length) throw 'There are no users in the system';
        return usersList;
    }
    catch (error) {
        throw new Error(error.message)
    }
};

async function GetUserById(id) {
    try {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: id });
        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

async function CreateUser(userData) {
    try {
        let userCollection = await users();
        let newInsertInfo = await userCollection.insertOne(userData);
        if (newInsertInfo.insertedCount === 0) throw 'Something went wrong.';
        return true;
    } catch (e) {
        throw new Error(e.message);
    }
};
async function CheckUserExist(emailAddress) {
    try {
        let userCollection = await users();
        let user = await userCollection.findOne({ 'emailAddress': emailAddress, isDeleted: 0 });
        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

async function updatePassword(id, password) {
    try {
        let userCollection = await users();
        let user = await userCollection.updateOne({ _id: id }, { $set: { password: password } });
        return true;
    } catch (e) {
        throw new Error(e.message);
    }
};

async function updateUserProfile(user_data, id) {
    try {
        let userCollection = await users();
        let user = await userCollection.updateOne({ _id: id }, { $set: user_data });
        return true;
    } catch (e) {
        throw new Error(e.message);
    }
};

async function deleteUSer(user_id){
    try {
        let userCollection = await users();
        let user = await userCollection.updateOne({ _id: user_id }, { $set: {isDeleted : 1} });
        return true;
    }
    catch (e) {
        throw new Error(e.message)
    }
}
module.exports = {
    CreateUser,
    GetAllUsers,
    GetUserById,
    CheckUserExist,
    updatePassword,
    updateUserProfile,
    deleteUSer
}