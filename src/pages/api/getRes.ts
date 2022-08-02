// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Result } from "antd";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDateInfo, makeRes, getRes } from "../../lib/backend/database-utils";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log("creating reservation with ", req.body);
  //first make reservation
  const data = await getRes(req.body.middID).then((response: any) => {
    console.log("api returnes,", response);
    res.status(200).json({ data: response });
  });
};

export default handler;
