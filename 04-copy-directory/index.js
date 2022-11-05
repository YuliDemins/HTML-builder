const path = require('path');
const fs = require('fs');

  fs.stat(path.join(__dirname, 'files-copy'), err => {
    if (!err) {
        fs.readdir(path.join(__dirname, 'files-copy'), (_, files) => {
          files.forEach(file => {
                fs.unlink(path.join(__dirname, 'files-copy', file), err => {
                  if (err) throw err;
                  console.log('file remove')
          })})
        })
      }
});
copyFolder()

function copyFolder(){
  fs.mkdir(path.join(__dirname, 'files-copy'),{ recursive: true }, err => {
    if (err) throw err;
    console.log('dir created')
  });

  fs.readdir(path.join(__dirname, 'files'), (_, files) => {
    files.forEach(file => {
      fs.stat(path.resolve(__dirname, 'files', file), ( _, stats) => {
        if (stats.isFile()) {
          fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), err => {
            if (err) throw err;
            console.log('file copy')});
      } 
    })})})
}

