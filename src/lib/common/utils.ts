/**
 * Shared utililty functions
 */



function stringFormattedDate(date: Date): string {
    /**
     * Returns a string of the form YYYY-MM-DD
     */


    return date?.toISOString()?.split("T")?.[0] ?? null;
}




//needed when file is empty to prevent errors
export { stringFormattedDate };