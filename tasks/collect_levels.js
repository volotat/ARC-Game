const fs = require('fs')
var levels_data = require('./levels.json')
const task_folders = ['./training/', './evaluation/']

task_folders.forEach((folder, index) => {
  fs.readdir(folder, (err, files) => {
    console.log(files.length);
    files.forEach(file => {
      var name = file.split('.').slice(0, -1).join('.')

      if (Object.keys(levels_data.Entry).includes(name) ||
          Object.keys(levels_data.Easy).includes(name) ||
          Object.keys(levels_data.Medium).includes(name) ||
          Object.keys(levels_data.Hard).includes(name) ||
          Object.keys(levels_data.Other).includes(name)) {
        console.log(`${file} is already included`)
      } else {
        levels_data.Other[name] = folder.slice(2) + file
        console.log(`${file} added to "Other" cathegory`)
      }
    })
    var json = JSON.stringify(levels_data, null, 2)
    fs.writeFile('levels.json', json, 'utf8', err => {console.log(err)});
  })
})


