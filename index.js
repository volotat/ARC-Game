import { toSvg } from "jdenticon"
import arrow from "./images/arrow.png"
import { makeid, GE } from "./utils.js"

var cell_colors = ['is_black', 'is_blue', 'is_red', 'is_green', 'is_yellow', 'is_grey', 'is_magenta', 'is_orange', 'is_aqua', 'is_maroon']
var cached_levels_data
var cached_level_path

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

  for (var levels_backet in levels_data) {
    template += 
      `<h2>${levels_backet}</h2>
      <div class="levels-block">`

      for (var level_ind in levels_data[levels_backet]) {
        var level = levels_data[levels_backet][level_ind]
        var svg = toSvg(level_ind, 128)
        console.log(window.localStorage.getItem('tasks/${level}'))
        template += 
        `<div class="level-card" onclick="load_level('tasks/${level}')">
          <div id="${level}" class="task-icon ${localStorage.getItem(`tasks/${level}`)?'solved':''}">${svg}</div> 
          ${level_ind}
        </div>`
      } //solved
    template += `</div>`
  }
  template += `</div>`
  GE("main_container").innerHTML = template
  
}

window['load_level'] = (level_path) =>{
  cached_level_path = level_path

  GE('main_container').innerHTML = 'Загрузка...';
  console.log(level_path)
  let level_name = level_path.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')
  fetch(level_path)
  .then(response => response.json())
  .then(json => build_level(json, level_name));
}

var block_data_cache = {};

function create_block(params){
  var block_name = params.block_name ?? "";
  var block_data = params.block_data;
  var is_clickable = params.is_clickable ?? false;
  var is_dragable = params.is_dragable ?? false;
  var is_big = params.is_big ?? false;

  var template = ''
  var action = "";
  if (is_dragable) action = `onclick="copy_block_from_to('${block_name}', 'test_result')" `
  template += `<div class="is_inline ${is_dragable?'is_dragable':''}" ${action}><table class="${is_big?'is_big':''}">`
  var rid = 0
  block_data.forEach(element => {
    template += `<tr>`
    var cid = 0
    element.forEach(color_ind => {
      
      var cell_ind = `${block_name}_${rid}_${cid}`;
      var action = "";
      if (is_clickable)
        action = `onmousedown="start_interact_with_cell('${cell_ind}')" onmouseover="hover_over_cell('${cell_ind}')" onmouseup="end_interact_with_cell('${cell_ind}')" `
      
      template += `<td id="${cell_ind}" class="is_cell ${cell_colors[color_ind]} ${is_clickable?'is_clickable':''}" ${action}></td>`
      cid += 1
    })
    template += `</tr>`
    rid += 1
  })
  template += `</table></div>`

  return template
}

window['copy_block_from_to'] = (input_name, output_name) => {
  var input_data = block_data_cache[input_name]
  var output_data = block_data_cache[output_name]

  
  var rid = 0
  output_data.forEach(element => {
    var cid = 0
    element.forEach(color_ind => {
      var in_cell_id = `${input_name}_${rid}_${cid}`;
      if (GE(in_cell_id)){
        var in_cell_color = Array.from(GE(in_cell_id).classList).filter(cell_class => cell_colors.includes(cell_class))[0]

        var out_cell_id = `${output_name}_${rid}_${cid}`;
        var out_cell_color = Array.from(GE(out_cell_id).classList).filter(cell_class => cell_colors.includes(cell_class))[0]

        console.log(in_cell_id, in_cell_color, out_cell_color)
        GE(out_cell_id).classList.remove(out_cell_color)
        GE(out_cell_id).classList.add(in_cell_color)
      }
      cid += 1
    })
    rid += 1
  })
}

window['build_level'] = (level_json, level_name) =>{
  console.log(level_json)

  var template = `<h2>${level_name}</h2>`;

  template += `<div class="noselect">`
  template += `<div style="background-color:bisque">`
  level_json.train.forEach(element => {
    template += `<div style="display:inline-block; margin: 40px 30px 40px 30px;">`
    template += create_block({block_data: element.input})
    template += ` <img src='${arrow}' style="vertical-align: middle; width: 40px"/> `
    template += create_block({block_data: element.output})
    template += `</div>`
  });
  template += `</div>`
  template += `<br><br>`

  level_json.test.forEach(element => {
    var empty_block = Array.from(Array(element.output.length), () => Array.from(Array(element.output[0].length), () => 0))
    console.log({output: empty_block})

    template += `<div style="margin: 0px 30px 80px 30px;">`
    template += create_block({block_data: element.input, is_dragable: true, is_big: true, block_name: "test_input"})
    template += ` <img src='${arrow}' style="vertical-align: middle; width: 40px"/> `
    template += create_block({block_data: empty_block, is_clickable: true, is_big: true, block_name: "test_result"})
    template += `</div>`

    
    block_data_cache["test_input"] = element.input;
    block_data_cache["test_output"] = element.output;
    block_data_cache["test_result"] = empty_block;
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

  var check = true;

  var test_output = block_data_cache['test_output']

  var rid = 0
  test_output.forEach(element => {
    var cid = 0
    element.forEach(color_ind => {
      var res_cell_id = `test_result_${rid}_${cid}`;
      var res_cell_color = Array.from(GE(res_cell_id).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
      var res_color_ind = cell_colors.indexOf(res_cell_color)

      if (color_ind != res_color_ind) check = false;
      
      cid += 1
    })
    rid += 1
  })

  for (var ind = 0; ind<10; ind++) {
    GE(`anim_true_${ind}`).classList.add('is_hidden')
  }

  for (var ind = 0; ind<6; ind++) {
    GE(`anim_false_${ind}`).classList.add('is_hidden')
  }

  if (check){
    var ind = Math.floor(Math.random() * 10);
    GE(`anim_true_${ind}`).classList.remove('is_hidden')

    //save that level is solved
    //...
    localStorage.setItem(cached_level_path, true);

    setTimeout(build_levels, 2600)
  } else {
    var ind = Math.floor(Math.random() * 6);
    GE(`anim_false_${ind}`).classList.remove('is_hidden')
  }
}