import { Data } from "../models/data.models.js";




const updt = async (req,res)=>{
    const result = await Data.updateMany(
        { country: "" },
        { $set: { country: "India" } }
      );
      const result1= await Data.updateMany(
        { region: "" },
        { $set: { region: "Russia"} }
      );
      const result2= await Data.updateMany(
        { topic: "" },
        { $set: {topic: "Global Warming"} }
      );
      const result3= await Data.updateMany(
        { sector: "" },
        { $set: { sector: "Sports"} }
      );
      const result4= await Data.updateMany(
        { pestle: "" },
        { $set: { pestle: "Agriculture"} }
      );
      const result5= await Data.updateMany(
        { relevance: null },
        { $set: { relevance: 0} }
      );
      const result6= await Data.updateMany(
        { source: "" },
        { $set: { source: "World Development"} }
      );
      const result7= await Data.updateMany(
        { likelihood: null },
        { $set: { likelihood: 5} }
      );
      const result8= await Data.updateMany(
        { impact: "" },
        { $set: { impact: "1"} }
      );
      const result9= await Data.updateMany(
        { start_year: "" },
        { $set: { start_year: "2015"} }
      );
      const result10= await Data.updateMany(
        { end_year: "" },
        { $set: { end_year: "2023"} }
      );
      const result11= await Data.updateMany(
        { intensity: null},
        { $set: { intensity: 50} }
      );
      console.log("everything is fine")


      res.status(200).json(result11)
}


export {updt}