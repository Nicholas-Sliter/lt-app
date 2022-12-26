import knex from "../knex";

interface ILanguage {
    name: string;
    
}


interface ILanguages {

}

export async function getLanguages(): Promise<any> {
    const languages = await knex("languages");
  
    if (!languages) {
      return null;
    }
    return languages;
  }
