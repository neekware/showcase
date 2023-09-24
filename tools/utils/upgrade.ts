import { execute } from './util';

// Define the packages you want to exclude
const excludedPackages = ['jest-*', 'eslint-config-*', 'typescript'];

const excludeString = excludedPackages.map((pkg) => `!${pkg}`).join(',');
const command = `yarn up '*'@latest,'${excludeString}'@latest`;

console.log(`Running: ${command}`);
execute(command);
