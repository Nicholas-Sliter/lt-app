// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Result } from "antd";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDateInfo, makeRes } from "../../lib/backend/database-utils";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log("creating reservation with ", req.body);
  if (req.method == "POST") {
    //first make reservation
    const data = await makeRes(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.language,
      req.body.course,
      req.body.middID,
      req.body.resDate,
      req.body.type,
      req.body.is_cancelled,
      req.body.on_waitlist,
      req.body.attended
    );

    //send confirmation email
    console.log('Send confirmation email')
  } else {
  }
};

export default handler;
