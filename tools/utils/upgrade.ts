import { execute } from './util';

// Define the packages you want to exclude
const excludedPackages = ['jest-*', 'eslint-config-*', 'typescript'];
console.log(`Running *****: ${excludedPackages}`);

async function main() {
  const excludeString = excludedPackages.map((pkg) => `!${pkg}`).join(',');
  const command = `yarn up '*'@latest,'${excludeString}'@latest`;

  // console.log(`Running *****: ${command}`);
  // execute(command);
}

main().catch((err) => {
  console.error(`Error upgrading`, err);
  process.exit(111);
});
