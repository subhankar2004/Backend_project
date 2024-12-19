 const asyncHandlers=(requestHandler)=>{
    (req,res,next)=>{
      Promise.resolve(requestHandler(req,res,next)).catch(err=>next(err));
    }
 }



export {asyncHandlers}



//Try Catch Method

// const asyncHandlers=(fn)=>{  //higher order functions
//   return async  (req,res,next)=>{
//     try{
//        await fn(req,res,next);
//     }catch(e){
//       res.status(e.code || 500).json({success:false,message:e.message});
//       next(e);
//     }
//   }
// }