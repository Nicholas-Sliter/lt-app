// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Result } from "antd";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteRes } from "../../lib/backend/database-utils";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log("deleting reservation with ", req.body);
  if (req.method == "POST") {
    //first delete the reservation
    const data = await deleteRes(req.body.middID, req.body.resDate);

    //send confirmation email
    console.log("Send confirmation email");
  } else {
  }
};

export default handler;
