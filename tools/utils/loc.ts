import * as fs from 'fs';

import { execute, projDir, readme } from './util';

const { program } = require('commander');
const replaceSection = require('markdown-replace-section');

const DEBUG = false;
const EXCLUDE_LIST = ['pnpm-lock.yaml'];
const sectionName = 'Lines of Code (auto-generated stats)';
const sectionHelp = `
### Line of code generation

The above line of code table is auto generated and should not be edited manually.
Note: \`loc\` should be installed on your system, in order to generate the above stats.
      It will ignore all directories, files that you have in .gitignore.
- \`brew install loc\` # install on mac
`;
/**
 * Note, the "Lines of Code" section cannot be at the end
 * https://github.com/renke/markdown-replace-section/issues/1
 */
async function main() {
  const excludes = EXCLUDE_LIST.map((e) => `--exclude ${e}`).join(' ');
  const cmd = `loc ${projDir} ${excludes}`;
  console.log(`Running: ${cmd}`);
  const loc = await execute(cmd, !DEBUG);
  let readMeContent: string;

  try {
    readMeContent = fs.readFileSync(readme, 'utf-8');
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
    process.exit(111);
  }

  if (!readMeContent.includes(sectionName)) {
    readMeContent = `${readMeContent}\n\n## ${sectionName}\n\n${sectionHelp}`;
  }

  const replaceAllMatches = false;
  readMeContent = replaceSection(
    readMeContent,
    sectionName,
    '```txt<br>' + loc + '```',
    replaceAllMatches
  );

  fs.writeFileSync(readme, readMeContent, { encoding: 'utf8', flag: 'w' });
}

program.version('0.0.1', '-v, --version').parse(process.argv);

main().catch((err) => {
  console.error(`Error updating Readme.md`, err);
  process.exit(111);
});
