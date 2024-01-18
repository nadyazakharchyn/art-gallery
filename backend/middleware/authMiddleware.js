import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { JWT_SECRET } from "../config.js";

const protect =  async(req, res, next) => {
  let token;
  token = req.cookies.token;
  //console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      //console.log(decoded);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({message: 'Not authorized, token failed'});
    }
  } else {
    res.status(401).json({message: 'Not authorized, no token'});
  }
};

const getUserFromToken = async (req, res, next) => {
  let token;
  token = req.cookies.token; // Retrieve the token from the 'token' cookie
  //token = req.params.token;
  console.log(token); // Log the token for debugging purposes

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      // Fetch the user ID from the decoded token
      console.log(decoded);
      const userId = decoded.userId;
      console.log(userId);
      // Fetch the user details from the database bvased on the user ID
      const user = await User.findById(userId).select('-password');
      if (!user) {
        res.status(401).json({ message: 'Not authorized, user not found' });
      }
      // Attach the user object to the request object
      //req.user = user;
      console.log(user)
      res.json({user})
      next();
    } catch (error) {
      // If there's an error while decoding or verifying the token, handle it
      console.log(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If there's no token in the request, respond with a 401 status and an error message
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      // Get token from cookies
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({message: 'Not authorized, no token'});
      }
      // Verify the token and get user details
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      //console.log(user)
      if (!user) {
        // return next(
        //   new ErrorHandler('Not authorized, user not found', 401)
        // );
        res.status(401).json({message: 'Not authorized, user not found'});
      }
      // Check if user's role is allowed
      if (!roles.includes(user.role)) {
        res.status(401).json({message: 'Not authorized to access this resource'});
      }

      // Set user details in the request object for further use
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
    }
  };
};

export { protect, authorizeRoles, getUserFromToken };