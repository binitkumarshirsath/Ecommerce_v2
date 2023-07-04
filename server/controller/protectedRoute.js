const protectedRoute = (req,res)=>{
    console.log("pr");
    return res.status(200).json({success : true});
}

export default protectedRoute;