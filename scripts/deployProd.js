const execSync = require('child_process').execSync;
const fs = require('fs');

console.log('>> Switching project to alecng-site...');
console.log('-------------------------------------------------------\n');
execSync('firebase use alecng-site', {stdio: 'inherit'});

console.log('\n>> Rewriting env var to production...');
console.log('-------------------------------------------------------\n');
let envFile = fs.readFileSync(`${__dirname}/../.env`, 'utf-8');
let topVariable = envFile.split('\n')[0];
const [envVar] = topVariable.split('=');
if (envVar !== 'REACT_APP_ENV') {
  console.error('ERROR: Make sure that the top environment variable in .env is REACT_APP_ENV');
  return;
} 
let prodEnv = `${envVar}=production`;
let variables = envFile.split('\n');
variables[0] = prodEnv;
fs.writeFileSync(`${__dirname}/../.env`, variables.join('\n'));

console.log('\n>> Building...');
console.log('-------------------------------------------------------\n');
execSync('react-scripts build', {stdio: 'inherit'});

console.log('\n>> Deploying...');
console.log('-------------------------------------------------------\n');
execSync('firebase deploy --only hosting:cms', {stdio: 'inherit'});

console.log('\n>> Rewriting local env var back to sandbox...');
console.log('-------------------------------------------------------\n');

let sandboxEnv = `${envVar}=sandbox`;
variables = envFile.split('\n');
variables[0] = sandboxEnv;
fs.writeFileSync(`${__dirname}/../.env`, variables.join('\n'));