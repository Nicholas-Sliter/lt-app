import { Availability } from "../../types/Availability";


abstract class API_Base {

    protected static __get<T>(url: string): Promise<T> {
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json();
        });
    }

    protected static __post<T>(url: string, body: any): Promise<T> {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        });
    }

    protected static __put<T>(url: string, body: any): Promise<T> {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        });
    }

    protected static __delete<T>(url: string): Promise<T> {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json();
        });
    }




}



abstract class API_Adaptor extends API_Base {


    public static getAvailability(date: string, language: string, length: number): Promise<Availability> {
        return API_Adaptor.__post<Availability>("/api/availability", {
            language: language,
            date: date,
            length: length
        });
    }




}

export default API_Adaptor;