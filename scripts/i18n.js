const fs = require('fs');
const { exec } = require('child_process');

const override = true;

// Process strings
['en', 'fr'].map(id => {
  let extract = require(`../translation/extract/${id}/translation.json`);
  let merge = require(`../translation/merge/${id}.json`);
  let output = {...merge};

  for (const [key, val] of Object.entries(extract)) {
    let index = Object.keys(merge).findIndex(v => v == key);

    if (index === -1 || !merge[key].length || id == 'en' || override === true) {
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
