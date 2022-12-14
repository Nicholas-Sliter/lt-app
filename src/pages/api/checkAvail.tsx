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
    
    console.log("in getAvail API call. the passed data is: ", req.body.data, ", and the language is:", req.body.langauge)

    let returnDict: { [key: string]: string } = {};

    //TODO - make today in this time format (T04 is important)
    // const today = new Date("2022-10-18T04:00:00.000Z");//2022-10-18T04:00:00.000Z
    const today = new Date().toISOString().split("T")[0] + "T05:00:00.000Z"
    console.log("today's date ", today)

    //first see how many max seats we have for that language
    var languageRes = await getLanguageInfo(req.body.language)
    if (await languageRes != undefined) {
      var max_seats =
        await languageRes[0].tablesOf8 * 8 +
        await languageRes[0].tablesOf6 * 6 -
        await languageRes[0].reserved_seats;
        console.log("max seats: ", max_seats);

      //check the availability for each date in the next 30 days
      for (var i = 0; i < 30; i++) {
        const nextDate = addDays(today, i);
        var returned = await getDateInfo(nextDate.toISOString().split("T")[0], req.body.language.toLowerCase())
        console.log("getDateInfo returns:", await returned)
        var takenSeats = await returned.length;
        var availible = await max_seats - takenSeats;
        //should be avail > 0 = avail, but using 21 to see changes on calender.
        
        if (await availible < 21) {
        //if (await availible < 21) {
          returnDict[nextDate.toISOString().split("T")[0]] = "unavailable";
        } else {
          returnDict[nextDate.toISOString().split("T")[0]] = "available";
        }


        // console.log("current returnDict", returnDict)

      }
    } else { }
    console.log("dict", await returnDict)
    res.status(200).json({ data: returnDict });
  }
};

export default handler;
