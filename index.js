import { toSvg } from "jdenticon"
import levels_data from "./tasks/levels.json"

console.log(levels_data);

var template = ""

for (var level_name in levels_data) {
  template += 
    `<h2>${level_name}</h2>
    <div class="levels-block">`

    for (var ind in levels_data[level_name]) {
      var level = levels_data[level_name][ind]
      var svg = toSvg(level, 128)
      template += 
      `<div class="level-card">
        <div id="${level}" class="task-icon">${svg}</div> 
        ${level}
      </div>`
    }
  template += `</div>`
}

document.getElementById("levels_data").innerHTML = template