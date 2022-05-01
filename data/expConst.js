export const languages = [
  { label: "French", value: "FMMC" },
  { label: "German", value: "GRMN" },
  { label: "Spanish", value: "SPAN" },
];

//function for changing and filtering the JSON of all courses
function renameKey(obj, oldKey, newKey) {
  //  obj["value"] = "test";
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
  delete obj["courseDescription"];
}

let data = require("./Courses.json");
let tempCoursesVar = [];

const arr = data;
arr.forEach((obj) => renameKey(obj, "courseName", "label"));
const updatedJson = JSON.stringify(arr);

export const courses = updatedJson;
