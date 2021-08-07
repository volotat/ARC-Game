import { toSvg } from "jdenticon"
import arrow from "./images/arrow.png"
import { makeid, GE } from "./utils.js"

var cell_colors = ['is_black', 'is_blue', 'is_red', 'is_green', 'is_yellow', 'is_grey', 'is_magenta', 'is_orange', 'is_aqua', 'is_maroon']
var cached_levels_data

fetch("tasks/levels.json")
  .then(response => response.json())
  .then(json => build_levels(json));

window['build_levels'] = (levels_data) => {
  if (!levels_data) levels_data = cached_levels_data
  else cached_levels_data = levels_data  
  console.log(levels_data);
  
  var template = `
    <img src="images/logo.png" id="logo-image"/>
    <div id="levels_data">`

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
      } //solved
    template += `</div>`
  }
  template += `</div>`
  GE("main_container").innerHTML = template
  
}

window['load_level'] = (level_path) =>{
  GE('main_container').innerHTML = 'Загрузка...';
  console.log(level_path)
  let level_name = level_path.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')
  fetch(level_path)
  .then(response => response.json())
  .then(json => build_level(json, level_name));
}

function create_block(block_data, is_clickable = false, is_dragable = false, is_big = false){
  var template = ''; 
  template += `<div class="is_inline ${is_dragable?'is_dragable':''}"><table class="${is_big?'is_big':''}">`
  block_data.forEach(element => {
    template += `<tr>`
    element.forEach(color_ind => {
      var cell_ind = makeid(8)
      template += `<td id="${cell_ind}" class="is_cell ${cell_colors[color_ind]} ${is_clickable?'is_clickable':''}" 
      ${is_clickable?`onmousedown="start_interact_with_cell('${cell_ind}')" onmouseover="hover_over_cell('${cell_ind}')" onmouseup="end_interact_with_cell('${cell_ind}')" `:''}></td>`
    })
    template += `</tr>`
  })
  template += `</table></div>`

  return template
}

window['build_level'] = (level_json, level_name) =>{
  console.log(level_json)

  var template = `<h2>${level_name}</h2>`;

  template += `<div class="noselect">`
  template += `<div style="background-color:bisque">`
  level_json.train.forEach(element => {
    template += `<div style="display:inline-block; margin: 40px 30px 40px 30px;">`
    template += create_block(element.input)
    template += ` <img src='${arrow}' style="vertical-align: middle; width: 40px"/> `
    template += create_block(element.output)
    template += `</div>`
  });
  template += `</div>`
  template += `<br><br>`

  level_json.test.forEach(element => {
    var empty_block = Array.from(Array(element.output.length), () => Array.from(Array(element.output[0].length), () => 0))
    console.log({output: empty_block})

    template += `<div style="margin: 0px 30px 80px 30px;">`
    template += create_block(element.input, false, true, true)
    template += ` <img src='${arrow}' style="vertical-align: middle; width: 40px"/> `
    template += create_block(empty_block, true, false, true)
    template += `</div>`
  });

  template += `
    <button class="big_button is_green" onclick="check_result()">Check</button>
    <br>
    <button class="big_button is_blue" onclick="build_levels()">Back</button>
  `;

  template += `</div>`

  GE('main_container').innerHTML = template;
}

var last_interacted_cell;
var last_color_index;
var hover_color_index;
var start_cell_ind;

window['start_interact_with_cell'] = (cell_ind) => {
  var cell_color = Array.from(GE(cell_ind).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
  var color_index = cell_colors.indexOf(cell_color)
  console.log(cell_color)
  console.log(color_index)

  hover_color_index = color_index
  start_cell_ind = cell_ind
}

window['hover_over_cell'] = (cell_ind) => {
  var cell_color = Array.from(GE(cell_ind).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
  var color_index = cell_colors.indexOf(cell_color)
  if (hover_color_index != null) {
    GE(cell_ind).classList.remove(cell_color)
    GE(cell_ind).classList.add(cell_colors[hover_color_index])
    last_color_index = hover_color_index
  }
}

window.addEventListener('mouseup', ()=>{
  //if (hover_color_index != null) 
  //  last_color_index = hover_color_index
  hover_color_index = null
});

window['end_interact_with_cell'] = (cell_ind) => {
  var cell_color = Array.from(GE(cell_ind).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
  var color_index = cell_colors.indexOf(cell_color)
  console.log(cell_color)
  console.log(color_index)
  if (start_cell_ind == cell_ind){
    if (last_interacted_cell == null || cell_ind == last_interacted_cell || cell_color == cell_colors[last_color_index]) {
        last_color_index = (color_index + 1) % cell_colors.length
        GE(cell_ind).classList.remove(cell_color)
        GE(cell_ind).classList.add(cell_colors[last_color_index])
    } else {
      GE(cell_ind).classList.remove(cell_color)
      GE(cell_ind).classList.add(cell_colors[last_color_index])
      //last_color_index = color_index
    }
  }
  last_interacted_cell = cell_ind
}


window['check_result'] = () => {
  var el = GE('animation');
  el.style.animation = 'none';
  el.offsetHeight; 
  el.style.animation = null; 

  GE('animation').classList.remove('live')
  GE('animation').classList.add('live')

  if (true){
    for (var ind = 0; ind<10; ind++) {
      GE(`anim_true_${ind}`).classList.add('is_hidden')
    }

    var ind = Math.floor(Math.random() * 10);
    GE(`anim_true_${ind}`).classList.remove('is_hidden')

    //save that level is solved
    //...

    setTimeout(build_levels, 2600)
  } else {
    for (var ind = 0; ind<6; ind++) {
      GE(`anim_false_${ind}`).classList.add('is_hidden')
    }

    var ind = Math.floor(Math.random() * 6);
    GE(`anim_false_${ind}`).classList.remove('is_hidden')
  }
}