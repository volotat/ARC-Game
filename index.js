import { toSvg } from "jdenticon"
import arrow from "./images/arrow.png"
import { makeid, GE } from "./utils.js"

var cell_colors = ['is_black', 'is_blue', 'is_red', 'is_green', 'is_yellow', 'is_grey', 'is_magenta', 'is_orange', 'is_aqua', 'is_maroon']

fetch("tasks/levels.json")
  .then(response => response.json())
  .then(json => build_levels(json));

window['build_levels'] = (levels_data) => {
  console.log(levels_data);
  
  var template = "..."

  for (var level_name in levels_data) {
    template += 
      `<h2>${level_name}</h2>
      <div class="levels-block">`

      for (var level_ind in levels_data[level_name]) {
        var level = levels_data[level_name][level_ind]
        var svg = toSvg(level_ind, 128)
        template += 
        `<div class="level-card" onclick="load_level('tasks/${level}')">
          <div id="${level}" class="task-icon">${svg}</div> 
          ${level_ind}
        </div>`
      }
    template += `</div>`
  }

  document.getElementById("levels_data").innerHTML = template
  
}

window['load_level'] = (level_path) =>{
  document.body.innerHTML = 'Загрузка...';
  console.log(level_path)
  fetch(level_path)
  .then(response => response.json())
  .then(json => build_level(json));
}

function create_block(block_data, is_clickable = false){
  var template = '';
  template += `<div class="is_inline"><table>`
  block_data.forEach(element => {
    template += `<tr>`
    element.forEach(color_ind => {
      var cell_ind = makeid(8)
      template += `<td id="${cell_ind}" class="is_cell ${cell_colors[color_ind]} ${is_clickable?'is_clickable':''}" ${is_clickable?`onclick="interact_with_cell('${cell_ind}')"`:''}></td>`
    })
    template += `</tr>`
  })
  template += `</table></div>`

  return template
}

window['build_level'] = (level_json) =>{
  console.log(level_json)
  var template = '';

  level_json.train.forEach(element => {
    template += `<div style="display:inline-block; margin: 0px 30px 80px 30px;">`
    template += create_block(element.input)
    template += ` <img src='${arrow}' style="vertical-align: middle; width: 40px"/> `
    template += create_block(element.output)
    template += `</div>`
  });

  template += `<br><br>`

  level_json.test.forEach(element => {
    var empty_block = Array.from(Array(element.output.length), () => Array.from(Array(element.output[0].length), () => 0))
    console.log({output: empty_block})

    template += `<div>`
    template += create_block(element.input)
    template += ` <img src='${arrow}' style="vertical-align: middle; width: 40px"/> `
    template += create_block(empty_block, true)
    template += `</div>`
    //template += `<br><br>`
  });

  document.body.innerHTML = template;
}

window['interact_with_cell'] = (cell_ind) => {
  var cell_color = Array.from(GE(cell_ind).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
  var color_index = cell_colors.indexOf(cell_color)
  console.log(cell_color)
  console.log(color_index)

  GE(cell_ind).classList.remove(cell_color)
  GE(cell_ind).classList.add(cell_colors[(color_index + 1) % cell_colors.length])

}