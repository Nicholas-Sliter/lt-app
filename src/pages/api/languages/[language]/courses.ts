import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import getCourses from "../../../../lib/backend/database/getCourses";

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
        res.status(404).end("Page is not found");
    },
})
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const language = req.query.language as string;
        const courses = await getCourses(language);
        res.status(200).end(JSON.stringify(courses));
    }
    )


export default handler;