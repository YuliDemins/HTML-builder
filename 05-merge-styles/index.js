const path = require('path');
const fs = require('fs');


fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))

fs.readdir(path.join(__dirname, 'styles'), (_, files) => {
  files.forEach(file => {
    fs.stat(path.resolve(__dirname, 'styles', file), ( _, stats) => {
      if (stats.isFile() && path.extname(file) == '.css') {
        fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8')
        fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, err =>{
            if(err) throw err;
            console.log('file change')
          })
        })
    } 
  })})})
