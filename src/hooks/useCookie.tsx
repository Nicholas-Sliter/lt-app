import { useState } from 'react';
import Cookies from 'universal-cookie';

interface useGetCookieProps<T = void> {
    key: string;
    defaultValue?: T;
    parseCookie?: boolean;
}

function useCookie<T>({ key, defaultValue, parseCookie = true }: useGetCookieProps<T>) {
    const [value, setValue] = useState(defaultValue);
    const cookies = new Cookies();

    const setCookieHandler = (newValue: T) => {
        setValue(newValue);
        cookies.set(key, newValue, { path: '/' });
    }

    const options = {
        doNotParse: !parseCookie
    };

    const cookie = cookies.get(key, options) ?? defaultValue;
    if (cookie) {
        setValue(cookie);
    }

    return [value, setCookieHandler];

}


export default useCookie;