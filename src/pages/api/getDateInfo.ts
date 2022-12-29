// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDateInfo } from "../../lib/backend/database-utils";

const handler = async (req, res) => {
    console.log(" in getDateInfo");
    var data;
    if (req.method == "POST") {
        data = await getDateInfo(req.body.date, req.body.language);
    } else {
        data = "none";
    }
    console.log("in api getDateInfo, ", data);
    res.status(200).json({ data: data });
};

export default handler;
