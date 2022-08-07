import { useState, useEffect } from 'react';


/**
 * Returns the list of languages
 * @param 
 * @returns 
 */


const DEFAULT_LANGUAGES = [
  "French",
  "Spanish",
  "Chinese"];

function useLanguages() {
  const [languages, setLanguages] = useState(DEFAULT_LANGUAGES);

  useEffect(() => {
    console.log('getting languages');
  }, []);


  return languages;

}

export default useLanguages;