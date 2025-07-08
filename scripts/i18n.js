//console.log('hello world')

/*
const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  console.log(`Output:\n${stdout}`);
});
*/

/*
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'example.txt');
const fileContent = 'This is the content of the file.';

try {
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log('File created successfully at', filePath);
} catch (err) {
  console.error('Error writing file:', err);
}
*/