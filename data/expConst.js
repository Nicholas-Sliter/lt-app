export const languages = [
  { label: "french", value: "FMMC" },
  { label: "german", value: "GRMN" },
  { label: "spanish", value: "SPAN" },
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
//var data_filter = data.filter((element) => element.departmentID == "AMST");

const arr = data;
arr.forEach((obj) => renameKey(obj, "courseName", "label"));
const updatedJson = JSON.stringify(arr);

console.log(JSON.parse(updatedJson));

export const courses = updatedJson;

//console.log(courses);
