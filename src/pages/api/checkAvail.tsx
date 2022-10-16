// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getDateInfo,
  makeRes,
  getLanguageInfo,
} from "../../lib/backend/database-utils";
import { addDays, getNextWeekday } from "../../lib/frontend/utils";

//this function will check the availability
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method == "POST") {
    //first get the information for the requested date and language to see number of seats taken already

    //for each date in the range: 
    let returnDict = {};

    const today = new Date("2022-10-18T04:00:00.000Z");//2022-10-18T04:00:00.000Z
    // console.log("in api with ", req.body);
    var languageRes = await getLanguageInfo(req.body.language)
    if (await languageRes != undefined) {
      var max_seats =
        await languageRes[0].tablesOf8 * 8 +
        await languageRes[0].tablesOf6 * 6 -
        await languageRes[0].reserved_seats;
      // console.log(max_seats);

      for (var i = 0; i < 30; i++) {
        const nextDate = addDays(today, i);
        // console.log("next day: ", nextDate.toISOString())
        var returned = await getDateInfo(nextDate, req.body.language.toLowerCase())
        // console.log("getDateInfo return for", nextDate, " and", req.body.language.toLowerCase(), "is: ", returned)
        var takenSeats = await returned.length;
        var availible = await max_seats - takenSeats;
        if (await availible < 21) {
          returnDict[nextDate.toISOString()] = "unavailable";
        } else {
          returnDict[nextDate.toISOString()] = "available";
        }


        // console.log("current returnDict", returnDict)

      }
    } else { }
    console.log("dict", await returnDict)
    res.status(200).json({ data: returnDict });
  }
};

export default handler;
