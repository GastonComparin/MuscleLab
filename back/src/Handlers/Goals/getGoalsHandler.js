const getGoals=require('../../Controllers/Goals/getGoals');

const getGoalsHandler= async(req,res)=>{
    try {
        let goals= await getGoals();
        res.status(200).json(types);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports=getGoalsHandler;