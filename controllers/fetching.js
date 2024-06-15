import { Data } from "../models/data.models.js";



const fetchit = async (req,res)=>{
    const allData = await Data.find()
    console.log(allData.length)
    res.status(200).json(allData)
}



export {fetchit}