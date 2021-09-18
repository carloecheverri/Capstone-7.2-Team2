const db = require("../db/dbConfig");



const getAllUsers = async () => {
  console.log("getAllUsers");
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    console.log("you have hit an error");
    console.log(error);
  }
};

const getUser = async (id) => {
  console.log("getUser");

  try {
    const user = await db.one("SELECT * FROM users WHERE id = $1", id);
    return user;
  } catch (error) {
    console.log("you have hit an error");
    console.log(error);
  }
};
const postUser = async (newUser) => {
  const { profile_pic, type_of_art, description, phone_number, location, is_venue} =
    newUser;
  try {
    const user = await db.one(
      "INSERT INTO users(profile_pic, type_of_art, description, phone_number, location, is_venue) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [profile_pic, type_of_art, description, phone_number, location, is_venue]
    );
    return user;
  } catch (error) {
    console.log("you have hit an error");
    console.log(error);
  }
};
const editUser = async (user, id) => {
  const { profile_pic, type_of_art, description, phone_number, location, is_venue } = user;
  user;
  try {
    const updatedUser = await db.one(
      "UPDATE users SET profile_pic = $1, type_of_art = $2, description = $3, phone_number = $4, location = $5, is_venue= $6 WHERE id = $7 RETURNING *",
      [profile_pic, type_of_art, description, phone_number, location, is_venue, id]
    );
    return updatedUser;
  } catch (error) {
    console.log("you have hit an error");
    console.log(error);
  }
};

const deleteUser = async (id) => {

  try {
    const deletedUser = await db.one("DELETE FROM users WHERE id= $1 RETURNING *", id);
    return deletedUser;
  } catch (error) {
    console.log("you have hit an error");
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  postUser,
  editUser,
  deleteUser
};
