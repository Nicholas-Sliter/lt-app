import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { createReservation, getReservation } from "../../../lib/backend/database-utils";
import { addDays, toTitleCase } from "../../../lib/frontend/utils";
import Reservation from "../../../types/Reservation";

/**
 * Set and check reservations
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
        const {
            date,
            language,
            course,

            first_name,
            last_name,
            email,
            middlebury_id,

        } = req.body;

        let error = false;
        let message = "";


        /* Check reservation validity */
        // check if user already has a reservation for this date
        const existingReservation = await getReservation(email, date);


        if (existingReservation) {
            error = true;
            message = `You already have a reservation on ${date} for ${toTitleCase(existingReservation.language)}`;
            return res.status(400).json({
                error,
                message
            });

        }

        // check if user has too many reservations in 2-week forward window
        const twoWeeksForward = new Date();
        addDays(twoWeeksForward, 14);

        ///stuff here



        const reservationObj: Reservation = {
            first_name,
            last_name,
            email,
            middlebury_id,
            type: "student",

            language,
            date,
            course,

            created_at: new Date(),
            is_cancelled: false,
            on_waitlist: false, /*temp*/
            attended: false,

        };






        const reservation = await createReservation(reservationObj);

        if (!reservation) {
            res.status(400).end({ message: "Invalid reservation" });
            return;
        }

        res.status(200).json({
            error,
            message
        });

    });

export default handler;