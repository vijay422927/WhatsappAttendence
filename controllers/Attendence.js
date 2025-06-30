
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
 const attendance_=async (ukid,term_id,token) => {
     const url = `${process.env.DG_URL}/api/attendance/student/${ukid}/term/${term_id}`;
     const response=await axios.get(url,
        {
                headers:
                {
                        "Auth-Token": token,
                }
        }
     );
     const attendance=response.data.percentage;
     const sub=response.data.courseAttendance;
     let sublist="";
     for(const subject of sub)
     {
        const courseName=subject.courseName;
        const percentage=subject.percentage;
        sublist+=`${courseName}:${percentage}\n`;
     }
     const finalmessage=`Attendence:${attendance}\n\n ${sublist}`;
     return finalmessage;

 }
 export {attendance_};