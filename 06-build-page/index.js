const path = require('path');
const fs = require('fs');



fs.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true }, err => {
  if (err) throw err;
  console.log('dist created')
});

//html
 
let template = ''
fs.readFile (path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if (err) throw err;
  template = data;
})

fs.readdir(path.join(__dirname, 'components'), (err, files) => {
  if (err) throw err;
  for (const file of files) {
    let component = ''
    const name = path.parse(file).name
    const componentPath = path.join(__dirname, 'components', file)
  
    fs.readFile(componentPath, (err, data) => {
      if (err) throw err;
      else {
        component = data;
        template = template.replaceAll(`\{\{${name}\}\}`, component)
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, err => {
          if (err) throw err;
          console.log('index added')
        })
      }
  })
  }
})


//style

fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))

fs.readdir(path.join(__dirname, 'styles'), (_, files) => {
  files.forEach(file => {
    fs.stat(path.resolve(__dirname, 'styles', file), ( _, stats) => {
      if (stats.isFile() && path.extname(file) == '.css') {
        fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8')
        fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, err =>{
            if(err) throw err;
            console.log('file change')
          })
        })
    } 
  })})})

  //assets

fs.readdir(path.join(__dirname, 'assets'), (err, dirs) => {
  if(err) throw err
dirs.forEach(dir => checkDir(dir))
})

function checkDir(dir) {
  fs.stat(path.join(__dirname, 'project-dist', 'assets'), err => {
    if (!err) {
        fs.readdir(path.join(__dirname, 'project-dist', 'assets', dir), (_, files) => {
          files.forEach(file => {
                fs.unlink(path.join(__dirname, 'project-dist', 'assets', dir, file), err => {
                  if (err) throw err;
                  console.log('file remove')
          })})
        })
      }
});
}

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'),{ recursive: true }, err => {
  if (err) throw err;
  console.log('assets created')
});

fs.readdir(path.join(__dirname, 'assets'), (err, dirs) => {
  if(err) throw err
dirs.forEach(dir => copyFolder(dir))
})


function copyFolder(dir){
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dir),{ recursive: true }, err => {
    if (err) throw err;
    console.log(`assets ${dir} created`)
  });

  fs.readdir(path.join(__dirname,'assets', dir), (_, files) => {
    files.forEach(file => {
      fs.stat(path.resolve(__dirname, 'assets', dir, file), ( _, stats) => {
        if (stats.isFile()) {
          fs.copyFile(path.join(__dirname, 'assets', dir, file), path.join(__dirname, 'project-dist', 'assets', dir, file), err => {
            if (err) throw err;
            console.log('file copy')});
      } 
    })})})
}
