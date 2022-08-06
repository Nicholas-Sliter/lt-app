import type { NextApiRequest, NextApiResponse } from "next";
import { getLanguages } from "../../../lib/backend/database-utils";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  try {
    const data = await getLanguages();
    console.log(data);
    res.status(200).end(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    res.status(500).end("Something went wrong");
  }
};

export default handler;
