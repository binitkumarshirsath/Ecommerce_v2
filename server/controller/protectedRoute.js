const protectedRoute = (req,res)=>{
    return res.status(200).json({success : true});
}

export default protectedRoute;