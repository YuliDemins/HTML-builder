const path = require('path');
const fs = require('fs');
const { stdout } = require('process')

  fs.readdir(path.join(__dirname, 'secret-folder'), (_, files) => {
    files.forEach((file) => {
      fs.stat(path.resolve(__dirname, 'secret-folder', file), (_, stats) => {
        if (stats.isFile()) {
          const name = path.parse(file).name
          const ext = path.parse(file).ext.slice(1)
          const size = stats.size / 1024;
          stdout.write(`${name} - ${ext} - ${size}kb\n`)
          }
        })
      })
  });
