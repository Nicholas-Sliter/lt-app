// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Result } from "antd";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDateInfo, makeRes } from "../../lib/backend/database-utils";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method == "POST") {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const language = req.body.language;
    const course = req.body.course;
    const middID = req.body.middID;
    const resDate = req.body.resDate;
    const type = req.body.type;
    const is_cancelled = req.body.is_cancelled;
    const on_waitlist = req.body.on_waitlist;
    const attended = req.body.attended;
    const data = await makeRes(
      firstName,
      lastName,
      email,
      language,
      course,
      middID,
      resDate,
      type,
      is_cancelled,
      on_waitlist,
      attended
    );
    res.status(200).json({ name: "success" });
  } else {
  }
};

export default handler;
