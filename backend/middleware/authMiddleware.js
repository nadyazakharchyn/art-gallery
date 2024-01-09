import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  //const { token } = req.cookies;
  const token = req.cookies.jwt;
  
  //console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Please login to access this resource' });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    // Add the user object to the request for further use in the controller
    req.user = decodedData.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
  //req.user = await User.findById(decodedData.id);

  
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

export { protect, isAuthenticatedUser, authorizeRoles };