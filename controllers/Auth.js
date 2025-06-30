
import axios from "axios";

const required_token = async function authenticate(email, password) {
    try {
        const response = await axios.post(
            `${process.env.DG_URL}/rest/service/authenticate`,
            { email, password },
            { headers: { "Content-Type": "application/json" } }
        );

        const token = response.data.res.token;
        const ukid = response.data.res.user.ukid;
        const programid = response.data.res.user.programmeId;
        const batchYear = response.data.res.user.batchYear;

        return { token, ukid, programid, batchYear };

    } catch (error) {
        console.error("❌ Error:", error.message);
        if (error.response) {
            console.log("👉 Server said:", error.response.data);
        }
    }
};

export { required_token };
