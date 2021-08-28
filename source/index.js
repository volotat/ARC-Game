import { toSvg } from "jdenticon"
import { makeid, GE, GetSearchParam, SetSearchParam } from "./utils.js"

var cell_colors = ['is_black', 'is_blue', 'is_red', 'is_green', 'is_yellow', 'is_grey', 'is_magenta', 'is_orange', 'is_aqua', 'is_maroon']
var cached_levels_data
var cached_level_path

GE('animation').innerHTML = `
<img id="anim_false_0" class="animation_image is_hidden" src="images/false/weary_face.gif"/>
<img id="anim_false_1" class="animation_image is_hidden" src="images/false/frowning_face.gif"/>
<img id="anim_false_2" class="animation_image is_hidden" src="images/false/unamused_face.gif"/>
<img id="anim_false_3" class="animation_image is_hidden" src="images/false/crying_face.gif"/>
<img id="anim_false_4" class="animation_image is_hidden" src="images/false/pleading_face.gif"/>
<img id="anim_false_5" class="animation_image is_hidden" src="images/false/thinking_face.gif"/>

<img id="anim_true_0" class="animation_image is_hidden" src="images/true/winking_face.gif"/>
<img id="anim_true_1" class="animation_image is_hidden" src="images/true/beaming_face_with_smiling_eyes.gif"/>
<img id="anim_true_2" class="animation_image is_hidden" src="images/true/grinning_face_with_smiling_eyes.gif"/>
<img id="anim_true_3" class="animation_image is_hidden" src="images/true/hugging_face.gif"/>
<img id="anim_true_4" class="animation_image is_hidden" src="images/true/partying_face.gif"/>
<img id="anim_true_5" class="animation_image is_hidden" src="images/true/relieved_face.gif"/>
<img id="anim_true_6" class="animation_image is_hidden" src="images/true/smiling_face.gif"/>
<img id="anim_true_7" class="animation_image is_hidden" src="images/true/smiling_face_with_sunglasses.gif"/>
<img id="anim_true_8" class="animation_image is_hidden" src="images/true/star_struck.gif"/>
<img id="anim_true_9" class="animation_image is_hidden" src="images/true/upside_down_face.gif"/>  
`;

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
        var svg = toSvg(level_ind, 100)
        template += 
        `<a href="?task=${encodeURIComponent(level)}">
          <div class="level-card">
            <div id="${level}" class="task-icon ${localStorage.getItem(`tasks/${level}`)?'solved':''}">${svg}</div> 
            ${level_ind}
          </div>
        </a>`
      } //solved
    template += `</div>`
  }
  template += `</div>`
  GE("main_container").innerHTML = template

  window.scrollTo(0, 0)
  
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


if (GetSearchParam('task')) {
  var task = decodeURIComponent(GetSearchParam('task'))
  load_level('tasks/' + task)
} else {
  fetch("tasks/levels.json")
    .then(response => response.json())
    .then(json => build_levels(json));
}


var block_data_cache = {};

function create_block(params){
  var block_name = params.block_name ?? "";
  var block_data = params.block_data;
  var is_clickable = params.is_clickable ?? false;
  var is_dragable = params.is_dragable ?? false;
  var is_big = params.is_big ?? false;
  var block_size = params.block_size ?? 260;

  var template = ''
  var action = "";
  if (is_dragable) action = `onclick="copy_block_from_to('${block_name}', 'test_result')" `
  template += `<div class="is_inline ${is_dragable?'is_dragable':''}" ${action} style="width: ${block_size}px; height: ${block_size}px;">`
  
  /*
  template += `<table class="${is_big?'is_big':''}">`
  var rid = 0
  block_data.forEach(element => {
    template += `<tr>`
    var cid = 0
    element.forEach(color_ind => {
      
      var cell_ind = `${block_name}_${rid}_${cid}`;
      var action = "";
      if (is_clickable)
        action = `onmousedown="start_interact_with_cell('${cell_ind}')" onmouseover="hover_over_cell('${cell_ind}')" onmouseup="end_interact_with_cell('${cell_ind}')" `
      
      template += `<td id="${cell_ind}" class="cell ${cell_colors[color_ind]} ${is_clickable?'is_clickable':''}" ${action}></td>`
      cid += 1
    })
    template += `</tr>`
    rid += 1
  })
  template += `</table>`
  */

  template += `<div class="block ${is_big?'is_big':''}" style="grid-template-columns: repeat(${block_data[0].length}, 1fr); aspect-ratio: ${block_data[0].length} / ${block_data.length};">`
  var mz = block_data.length > block_data[0].length ? block_data.length : block_data[0].length
  var rid = 0
  block_data.forEach(element => {
    var cid = 0
    element.forEach(color_ind => {
      
      var cell_ind = `${block_name}_${rid}_${cid}`;
      var action = "";
      if (is_clickable)
        action = `onmousedown="start_interact_with_cell('${cell_ind}')" onmouseover="hover_over_cell('${cell_ind}')" onmouseup="end_interact_with_cell('${cell_ind}')" `
      
      template += `<div id="${cell_ind}" class="cell ${cell_colors[color_ind]} ${is_clickable?'is_clickable':''}" ${action} style="width: calc(${block_size}px / ${mz} - 2px);"></div>`
      cid += 1
    })
    rid += 1
  })
  template += `</div>`

  template += `</div>`

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

window['set_main_color'] = (color) => {
  params.last_color_index = color
}

window['build_level'] = (level_json, level_name) =>{
  console.log(level_json)

  var template = `<h2>${level_name}</h2>`

  template += `<div class="noselect">`
  template += `<div id="train_container">`
  level_json.train.forEach(element => {
    template += `<div class="train_example">`
    template += create_block({block_data: element.input})
    template += ` <img src='images/arrow.png' class="arrow_img"/> `
    template += create_block({block_data: element.output})
    template += `</div>`
  });
  template += `</div>`
  template += `<br><br>`

  template += `<div id="test_container">`
  level_json.test.forEach(element => {
    var empty_block = Array.from(Array(element.output.length), () => Array.from(Array(element.output[0].length), () => 0))
    console.log({output: empty_block})

    template += `<div style="margin: 0px 30px 80px 30px;">`
    template += create_block({block_data: element.input, is_dragable: true, is_big: true, block_name: "test_input", block_size: 340})
    template += ` <img src='images/arrow.png' class="arrow_img"/> `
    template += create_block({block_data: empty_block, is_clickable: true, is_big: true, block_name: "test_result", block_size: 340})
    template += `</div>`

    
    block_data_cache["test_input"] = element.input;
    block_data_cache["test_output"] = element.output;
    block_data_cache["test_result"] = empty_block;
  });
  template += `</div>`

  template += `
    <button class="big_button is_green" onclick="check_result()">Check</button>
    <br>
    <a href="/"><button class="big_button is_blue">Back</button></a>
    <div style="height: 140px"><div>
  `;

  template += `</div>`

  
  template += `
  <div id="pallete">
    <div id="main_color" class="pallete_cell main ${cell_colors[0]} is_inline"></div>`

  cell_colors.forEach(color => {
    template += `<div class="pallete_cell ${color} is_inline is_clickable" onclick="set_main_color(${cell_colors.indexOf(color)})"></div>`
  });

  template += `</div>`;

  GE('main_container').innerHTML = template;

  var observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true)
      //console.log('Element is fully visible in screen');
      GE('pallete').classList.add('show')
    else
      GE('pallete').classList.remove('show')
  }, { threshold: [0.1] });
  
  observer.observe(GE("test_container"));
}

var last_interacted_cell;
//var last_color_index;
var hover_color_index;
var start_cell_ind;

var params = {
  last_color_index_: 0,
  set last_color_index(value){
    this.last_color_index_ = value
    
    var main_color = Array.from(GE("main_color").classList).filter(cell_class => cell_colors.includes(cell_class))[0]
    GE("main_color").classList.remove(main_color) 
    GE("main_color").classList.add(cell_colors[this.last_color_index_]) 
  },
  get last_color_index(){ 
    return this.last_color_index_
  },
}

window['params'] = params

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
    params.last_color_index = hover_color_index
  }
}

window.addEventListener('mouseup', ()=>{
  //if (hover_color_index != null) 
  //  params.last_color_index = hover_color_index
  hover_color_index = null
});

window['end_interact_with_cell'] = (cell_ind) => {
  var cell_color = Array.from(GE(cell_ind).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
  var color_index = cell_colors.indexOf(cell_color)

  if (start_cell_ind == cell_ind){
    console.log(last_interacted_cell == null, cell_ind == last_interacted_cell, cell_color == cell_colors[params.last_color_index])
    if (cell_ind == last_interacted_cell || cell_color == cell_colors[params.last_color_index]) { //last_interacted_cell == null || 
        params.last_color_index = (color_index + 1) % cell_colors.length
        GE(cell_ind).classList.remove(cell_color)
        GE(cell_ind).classList.add(cell_colors[params.last_color_index])
    } else {
      GE(cell_ind).classList.remove(cell_color)
      GE(cell_ind).classList.add(cell_colors[params.last_color_index])
      //params.last_color_index = color_index
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

    setTimeout(()=>{window.location = "/"}, 2600)
  } else {
    var ind = Math.floor(Math.random() * 6);
    GE(`anim_false_${ind}`).classList.remove('is_hidden')
  }
}