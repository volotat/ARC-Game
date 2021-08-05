import { toSvg } from "jdenticon"

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

var colors = ['is_black', 'is_blue', 'is_red', 'is_green', 'is_yellow', 'is_grey', 'is_magenta', 'is_orange', 'is_aqua', 'is_maroon']

function create_block(block_data){
  var template = '';
  template += `<div class="is_inline"><table>`
  block_data.forEach(element => {
    template += `<tr>`
    element.forEach(color_ind => {
      template += `<td class="is_cell ${colors[color_ind]}"></td>`
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
    template += `<span> => </span>`
    template += create_block(element.output)
    template += `</div>`
  });

  template += `<br><br>`

  level_json.test.forEach(element => {
    var empty_block = Array.from(Array(element.output.length), () => Array.from(Array(element.output[0].length), () => 0))
    console.log({output: empty_block})

    template += `<div>`
    template += create_block(element.input)
    template += `<span> => </span>`
    template += create_block(empty_block)
    template += `</div>`
    //template += `<br><br>`
  });
  /*
  var 
    <div class="is_inline">
      <table>
        <tr>
          <td class="is_cell is_black"></td>
          <td class="is_cell is_blue"></td>
          <td class="is_cell is_black"></td>
          <td class="is_cell is_blue"></td>
        </tr>
        <tr>
          <td class="is_cell is_blue"></td>
          <td class="is_cell is_black"></td>
          <td class="is_cell is_blue"></td>
          <td class="is_cell is_black"></td>
        </tr>
        <tr>
          <td class="is_cell is_black"></td>
          <td class="is_cell is_blue"></td>
          <td class="is_cell is_black"></td>
          <td class="is_cell is_blue"></td>
        </tr>
        <tr>
          <td class="is_cell is_blue"></td>
          <td class="is_cell is_black"></td>
          <td class="is_cell is_blue"></td>
          <td class="is_cell is_black"></td>
        </tr>
      </table>
    </div>`
    */
  document.body.innerHTML = template;
}
