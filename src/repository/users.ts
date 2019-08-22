// Models
import User, { IUser } from '../models/User';

class UsersClass {

  // Get user by email
  async getUserByEmail(email: string) {
    
    let response;

    try {
      response = await User.findOne({ email: email });
    }
    catch(err) {
      response = err;
    }

    return response;

  }

  // Add new user
  async register(user: IUser) {
    
    let response;

    try {
      response = await user.save();
    }
    catch(err) {
      response = err;
    }

    return response;

  }

  // Get user by id
  async getUserByID(_id: string) {

    let response;

    try {
      response = await User.findById(_id);
    }
    catch(err) {
      response = err;
    }

    return response;  

  }

  // Get all Strava authenticated users
  async getStravaUsers() {
    
    let response;

    try {
      response = await User.where("stravaUserID").ne("");
    }
    catch(err) {
      response = err;
    }

    return response;

  }   
}

module.exports = new UsersClass();