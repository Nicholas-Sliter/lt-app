import { useEffect, useState } from "react";
import API_Adaptor from "../lib/frontend/adaptor";
import { Availability } from "../types/Availability";


function useAvailability(date: string, language: string, length: number): Availability {
    const [availability, setAvailability] = useState<Availability>({});

    useEffect(() => {
        if (date && language && length) {
            API_Adaptor.getAvailability(date, language, length).then((res) => {
                setAvailability(res);
            });
        }

    }, [date, language, length]);

    return availability;
}

export default useAvailability;