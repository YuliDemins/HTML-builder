const fs = require('fs')
const path = require('path')
const {stdin, stdout, exit } = require('process')

const output = fs.createWriteStream(path.join('02-write-file', 'text.txt'));
stdout.write('whats you name?\n')
stdin.on('data', data => {
  if(data.toString().trim() === 'exit') {
    stdout.write('bye')
    exit()
  }
  output.write(data)
})

process.on('SIGINT', () => {
  stdout.write('bye')
  exit()
});
