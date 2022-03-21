//hooks must start with use...

import {useState, useEffect} from 'react';


export default function useExample(param_that_causes_recalculation: string){

  const [example, setExample] = useState('');

  useEffect(() => {
    console.log('expensive operation here');
    setExample('result of expensive operation');
  }, [param_that_causes_recalculation]);


    return example;

}