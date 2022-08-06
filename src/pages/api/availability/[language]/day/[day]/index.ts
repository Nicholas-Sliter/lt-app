import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Get availbility for the given language and day.
 * @param req 
 * @param res: boolean if a reservation is available.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {

    res.status(200).end();
  } catch (e) {
    res.status(500).end("Something went wrong");
  }
};

export default handler;
