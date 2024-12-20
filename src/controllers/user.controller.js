import {asyncHandlers} from "../utils/asyncHandler.js";

const registerUser=asyncHandlers(async(req,res)=>{
  return res.status(200).json({
    //success:true,
    message:"ok "
  }
  );
})

export default registerUser
