import axios from "axios";
// import { token } from "../index.js";
import dotenv from "dotenv";
dotenv.config();

const termid = async (programid,batchYear,token) => {
  try {
    
    const url = `${process.env.DG_URL}/rest/terms/programmeBatchTerms?batch=${batchYear}&programme=${programid}`;

    const response = await axios.get(url, {
      headers: {
        "Auth-token": token
      }
    });

   const t=response.data.terms[1]?.id;
   
   return t;

  } catch (error) {
    console.error(" Request Failed");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data || error.message);
  }
};

export { termid };
