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
    <div>
      <a href="https://github.com/volotat/ARC-Game" style="color:black">
      <svg class="is_inline" height="48" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="48" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
      <span class="is_inline github_text">Github page</span>
      </a>
    <div>
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


window.addEventListener('mousemove', e => {
  var mouseX = e.pageX + 10;
  var mouseY = e.pageY + 10; 

  GE("circle").style.left = mouseX +'px'
  GE("circle").style.top = mouseY +'px'
});


var block_data_cache = {};

function create_block(params){
  var block_name = params.block_name ?? "";
  var block_data = params.block_data;
  var is_clickable = params.is_clickable ?? false;
  var is_dragable = params.is_dragable ?? false;
  var is_big = params.is_big ?? false;
  //var block_size = params.block_size ?? 260;
  var block_type = params.block_type ?? "task-train-block";

  var template = ''
  var action = "";
  if (is_dragable) action = `onclick="copy_block_from_to('${block_name}', 'test_result')" `
  template += `<div class="is_inline ${is_dragable?'is_dragable':''} ${block_type}" ${action}>`

  if (is_clickable) 
    action = `ontouchmove="onMoveOverBlock(event)" onmousemove="onMoveOverBlock(event)" 
              ontouchstart="isMoveActive(true)" ontouchend="isMoveActive(false)"
              onmousedown="isMoveActive(true); onMoveOverBlock(event)" onmouseup="isMoveActive(false)"`;
  else action = '';

  template += `<div class="block ${is_big?'is_big':''}" ${action}
           style="grid-template-columns: repeat(${block_data[0].length}, 1fr); aspect-ratio: ${block_data[0].length} / ${block_data.length};">`
  var mz = block_data.length > block_data[0].length ? block_data.length : block_data[0].length
  var rid = 0
  block_data.forEach(element => {
    var cid = 0
    element.forEach(color_ind => {
      
      var cell_ind = `${block_name}_${rid}_${cid}`;
      var action = "";
      
      if (is_clickable)
        action = `
          onpointerdown="start_interact_with_cell('${cell_ind}')" 
          onpointerover="hover_over_cell('${cell_ind}');" 
          onpointerup="end_interact_with_cell('${cell_ind}', ${rid}, ${cid})"  `
      
      template += `<div id="${cell_ind}" class="cell ${cell_colors[color_ind]} ${is_clickable?'is_clickable':''}" ${action} style="width: calc(var(${"--"+block_type+"-size"}) / ${mz} - 2px);"></div>`
      cid += 1
    })
    rid += 1
  })
  template += `</div>`

  template += `</div>`

  return template
}

var is_move_active = false
window['isMoveActive'] = (act) => {
  is_move_active = act
}

window['onMoveOverBlock'] = (e) => {
  e.preventDefault();

  if (is_move_active) {
    var touch 
    if (e.touches) touch = e.touches[0];
    else touch = e
    console.log(touch.clientX)
    var cell = document.elementFromPoint(touch.clientX, touch.clientY);

    var cell_color = Array.from(cell.classList).filter(cell_class => cell_colors.includes(cell_class))[0]
    if (cell_color) {
      var color_index = cell_colors.indexOf(cell_color) 
      console.log(cell_color, cell_colors[color_index])
      cell.classList.remove(cell_color)
      cell.classList.add(cell_colors[params.last_color_index])
    }
  }
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

        GE(out_cell_id).classList.remove(out_cell_color)
        GE(out_cell_id).classList.add(in_cell_color)
      }
      cid += 1
    })
    rid += 1
  })
}

window['set_main_color'] = (color) => {
  last_interacted_cell = null
  params.last_color_index = color
}

window['build_level'] = (level_json, level_name) =>{
  console.log(level_json)

  var template = `<h2>${level_name}</h2>`

  template += `<div class="noselect">`
  template += `<div id="train_container">`
  level_json.train.forEach(element => {
    template += `<div class="train_example">`
    template += create_block({block_data: element.input, block_type: "task-train-block"})
    template += ` <img src='images/arrow.png' class="arrow_img"/> `
    template += create_block({block_data: element.output, block_type: "task-train-block"})
    template += `</div>`
  });
  template += `</div>`
  template += `<br><br>`

  template += `<div id="test_container">`
  level_json.test.forEach(element => {
    var empty_block = Array.from(Array(element.output.length), () => Array.from(Array(element.output[0].length), () => 0))
    console.log({output: empty_block})
    if (GetSearchParam('mode') == 'edit') empty_block = element.output

    template += `<div style="margin: 0px 30px 80px 30px;">`
    template += create_block({block_data: element.input, is_dragable: true, is_big: true, block_name: "test_input", block_type: "task-test-block"})
    template += ` <img src='images/arrow.png' class="arrow_img"/> `
    template += create_block({block_data: empty_block, is_clickable: true, is_big: true, block_name: "test_result", block_type: "task-test-block"})
    template += `</div>`

    
    block_data_cache["test_input"] = element.input;
    block_data_cache["test_output"] = element.output;
    block_data_cache["test_result"] = empty_block;
  });
  template += `</div>`

  template += `
    <button class="big_button is_green" onclick="check_result()">Check</button>
    <br>
    <a href="?"><button class="big_button is_blue">Back</button></a>
    <div id="pallete_container" style="height: 140px"><div>
  `;

  template += `</div>`

  
  template += `
  <div id="pallete">
    <div id="main_color" class="pallete_cell main ${cell_colors[params.last_color_index]} is_inline"></div>`

  cell_colors.forEach(color => {
    template += `<div class="pallete_cell ${color} is_inline is_clickable" 
    onclick="set_main_color(${cell_colors.indexOf(color)})" 
    onmousedown="params.fill_color = '${color}'"></div>`
  });

  template += `</div>`;

  GE('main_container').innerHTML = template;

  var observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true)
      //console.log('Element is fully visible in screen');
      GE('pallete').classList.add('show')
    else
      GE('pallete').classList.remove('show')
  }, { threshold: [0.2] });
  
  observer.observe(GE("test_container"));
}

var last_interacted_cell;
//var last_color_index;
var hover_color_index;
var start_cell_ind;

var params = {
  last_color_index_: 1,
  set last_color_index(value){
    this.last_color_index_ = value
    
    var main_color = Array.from(GE("main_color").classList).filter(cell_class => cell_colors.includes(cell_class))[0]
    GE("main_color").classList.remove(main_color) 
    GE("main_color").classList.add(cell_colors[this.last_color_index_]) 
  },
  get last_color_index(){ 
    return this.last_color_index_
  },

  fill_color_: null,
  set fill_color(value){
    this.fill_color_ = value
    
    var circle_color = Array.from(GE("circle").classList).filter(cell_class => cell_colors.includes(cell_class))[0]
    GE("circle").classList.remove(circle_color) 
    GE("circle").classList.add(this.fill_color_) 
  },
  get fill_color(){ 
    return this.fill_color_
  },
}

window['params'] = params

window.addEventListener('mouseup', ()=>{
  //if (hover_color_index != null) 
  //  params.last_color_index = hover_color_index
  hover_color_index = null
  params.fill_color = null
});


var initial_cell_color = null
window['start_interact_with_cell'] = (cell_ind) => {
  var cell_color = Array.from(GE(cell_ind).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
  var color_index = cell_colors.indexOf(cell_color)

  initial_cell_color = cell_color
  hover_color_index = params.last_color_index
  start_cell_ind = cell_ind

  GE(cell_ind).classList.remove(cell_color)
  GE(cell_ind).classList.add(cell_colors[hover_color_index])
  //params.last_color_index = hover_color_index
}

window['hover_over_cell'] = (cell_ind) => {
  var cell_color = Array.from(GE(cell_ind).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
  var color_index = cell_colors.indexOf(cell_color)
  if (hover_color_index != null) {
    GE(cell_ind).classList.remove(cell_color)
    GE(cell_ind).classList.add(cell_colors[hover_color_index])
    //params.last_color_index = hover_color_index
  }
}

window['end_interact_with_cell'] = (cell_ind, x, y) => {
  if (params.fill_color != null) {
    flood_fill(x, y, params.fill_color)
    params.fill_color = null
  } else {
    var cell_color = Array.from(GE(cell_ind).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
    var color_index = cell_colors.indexOf(cell_color)

    if (start_cell_ind == cell_ind && cell_color == initial_cell_color){
      params.last_color_index = (color_index + 1) % cell_colors.length
      GE(cell_ind).classList.remove(cell_color)
      GE(cell_ind).classList.add(cell_colors[params.last_color_index])
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

    setTimeout(()=>{window.location = "?"}, 2600)
  } else {
    var ind = Math.floor(Math.random() * 6);
    GE(`anim_false_${ind}`).classList.remove('is_hidden')
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window['flood_fill'] = (x, y, fill_color, start_color = null) =>{
  //console.log('flood_fill', x, y, fill_color, start_color)
  let cell_id = `test_result_${x}_${y}`;
  if (GE(cell_id) && start_color != fill_color) {
    let cell_color = Array.from(GE(cell_id).classList).filter(cell_class => cell_colors.includes(cell_class))[0]
    if (!start_color) start_color = cell_color
    //var color_ind = cell_colors.indexOf(res_cell_color)

    if (cell_color == start_color) {
      GE(cell_id).classList.remove(cell_color)
      GE(cell_id).classList.add(fill_color)

      setTimeout(()=>{
        flood_fill(x + 1, y, fill_color, start_color)
        flood_fill(x - 1, y, fill_color, start_color)
        flood_fill(x, y + 1, fill_color, start_color)
        flood_fill(x, y - 1, fill_color, start_color)
      }, 10)
    }
  }
}