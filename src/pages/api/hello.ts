// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDateInfo } from "../../../src/lib/backend/database-utils";
type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const data = await getDateInfo();
    console.log(data);
    res.status(200).end(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    res.status(500).end("Something went wrong");
  }
};

export default handler;
