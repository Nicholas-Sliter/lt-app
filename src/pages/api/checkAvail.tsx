// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Result } from "antd";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDateInfo, makeRes } from "../../lib/backend/database-utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    var data = getDateInfo(req.body.date).then((returned) => {
      res.status(200).json({ data: returned });
      console.log(returned);
      console.log(req.body.date);
    });
  }
};

export default handler;
