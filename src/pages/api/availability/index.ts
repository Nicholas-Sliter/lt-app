import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getDateAvailabilities } from "../../../lib/backend/database-utils";
import { addDays } from "../../../lib/frontend/utils";
import { Availability } from "../../../types/Availability";

/**
 * Get availbility for the given language and day.
 * @param req 
 * @param res: boolean if a reservation is available.
 */
const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Not found");
    }
})

    .post(async (req: NextApiRequest, res: NextApiResponse) => {

        const { date, language, length }: { date: Date, language: string, length: number } = req.body;

        const today = new Date();


        //check length is valid (between 1 and 30)
        if (length < 1 || length > 30) {
            res.status(400).end("Invalid length");
            return;

        }

        //check date is valid (not in the past)
        if (date < today) {
            res.status(400).end("Invalid date");
            return;

        }

        const dates = [];
        for (let i = 0; i < length; i++) {
            dates.push(addDays(date, i));
        }

        const availability: Availability = await getDateAvailabilities(dates, language);

        res.status(200).json(availability);



    });


export default handler;

