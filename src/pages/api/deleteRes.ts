
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteReservation } from "../../lib/backend/database-utils";

const handler = async (req, res) => {
    console.log(" in change status", req.body.person, req.body.language,req.body.date);
    var data;
    if (req.method == "POST") {
        data = await deleteReservation(req.body.person, req.body.language, req.body.date);
    } else {
        data = "none";
    }
    res.status(200).json({ data: data });
};

export default handler;
