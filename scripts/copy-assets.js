const copy = require('recursive-copy');

const option = {
  overwrite: true,
  filter: ['**/*', '!**/**.md'],
};

async function main() {
  try {
    const results = await copy('_posts', 'out', option);
    for(const result of results){
        console.info(`Copied "${result.dest}"`);
    }
    console.info('Done copied assets file ' + results.length + ' files');
  } catch (error) {
    console.error('Copy failed: ' + error);
  }
}

main();
