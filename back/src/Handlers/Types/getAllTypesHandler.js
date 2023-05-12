const getTypes=require('../../Controllers/Types/getTypes');

const getAllTypesHandler= async(req,res)=>{
    try {
        let types= await getTypes();
        res.status(200).json(types);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports=getAllTypesHandler;