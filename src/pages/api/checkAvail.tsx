// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Result } from "antd";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDateInfo,
  makeRes,
  getLanguageInfo,
} from "../../lib/backend/database-utils";

//this function will check the availability
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("in api with ", req.body);
  if (req.method == "POST") {
    //first get the information for the requested date and language to see number of seats taken already
    var data = getDateInfo(req.body.date, req.body.language).then(
      (returned) => {
        console.log("passed", req.body.date, req.body.language);
        //get the max available number of seats possible for a given language
        getLanguageInfo(req.body.language).then((languageRes) => {
          console.log("getLanguageInfo api call returns, ", languageRes);
          if (languageRes != undefined) {
            var max_seats =
              languageRes[0].tablesOf8 * 8 +
              languageRes[0].tablesOf6 * 6 -
              languageRes[0].reserved_seats;
            console.log("max seats for this language", max_seats);
            var takenSeats = returned.length;
            console.log("taken seats:", takenSeats);
            var availible = max_seats - takenSeats;
            res.status(200).json({ data: availible });
          } else {
            res.status(200).json({ data: 0 });
          }
        });
        console.log(returned);
        console.log(req.body.date);
      }
    );
  }
};

export default handler;
