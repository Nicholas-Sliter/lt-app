// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Result } from "antd";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDateInfo, insertIntoDB } from "../../lib/backend/database-utils";
type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method == "POST") {
    
  } else {
  }
};

export default handler;
