import { asyncHandlers } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandlers(async (req, res) => {
  //Algorythm:->

  //get user details from frontend
  //validation
  //check if user already exists: username,email
  //check for images , check for avatars
  // upload them to cloudinary, avatar
  //create user object-create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return response

  const { fullname, email, username, password } = req.body;
  console.log("email:", email);

  //method 1
  // if(fullname===""){
  //   throw new ApiError(400,"fullname is required");
  // }

  //method-2
  // Fixed syntax in the some() method
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Added await for async operation
  const existedUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  //files->multer method
  // Fixed optional chaining and property access
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  // Fixed syntax for coverImage access
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // Create user in database
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    // Fixed toLowerCase() method name
    username: username.toLowerCase(),
    password
  });

  // Fixed variable declaration and chaining
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User created successfully")
  );
});

export { registerUser };  // Fixed export syntax
