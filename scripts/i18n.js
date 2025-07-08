const fs = require('fs');
const path = require('path');

// Extract strings


// Process strings
['en', 'fr'].map(id => {
  let extract = require(`../translation/extract/${id}/translation.json`);
  let merge = require(`../translation/merge/${id}.json`);
  let output = {...merge};

  for (const [key, val] of Object.entries(extract)) {
    let index = Object.keys(merge).findIndex(v => v == key);

    if (index === -1 || !merge[key].length || id == 'en') {
      output[key] = key;
    }
    else {
      output[key] = merge[key];
    }
  }

  try {
    fs.writeFileSync(`./translation/output/${id}.json`,  JSON.stringify(output, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing file:', err);
  }

});




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