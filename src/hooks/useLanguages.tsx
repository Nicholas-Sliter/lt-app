import {useState, useEffect} from 'react';


/**
 * Returns the list of languages
 * @param 
 * @returns 
 */

export default function useLanguages(){
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    console.log('expensive operation here');
    setExample('result of expensive operation');
  }, [param_that_causes_recalculation]);


    return example;

}