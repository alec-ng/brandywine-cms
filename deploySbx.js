const execSync = require('child_process').execSync;
const fs = require('fs');

console.log('>> Switching project to alec-ng-sandbox...');
console.log('-------------------------------------------------------\n');
execSync('firebase use alec-ng-sandbox', {stdio: 'inherit'});

console.log('\n>> Ensuring env var is set to sandbox...');
console.log('-------------------------------------------------------\n');
let envFile = fs.readFileSync('.env', 'utf-8');
let topVariable = envFile.split('\n')[0];
const [envVar, value] = topVariable.split('=');
if (envVar !== 'REACT_APP_ENV') {
  console.error('ERROR: Make sure that the top environment variable in .env is REACT_APP_ENV');
  return;
} 
if (value !== 'sandbox') {
  console.log(`Environment was ${value} - Rewriting .env so REACT_APP_ENV=sandbox...`);
  topVariable = `${envVar}=sandbox`;
  let variables = envFile.split('\n');
  variables[0] = topVariable;
  fs.writeFileSync('.env', variables.join('\n'));
}

console.log('\n>> Building...');
console.log('-------------------------------------------------------\n');
execSync('react-scripts build', {stdio: 'inherit'});

console.log('\n>> Deploying...');
console.log('-------------------------------------------------------\n');
execSync('firebase deploy --only hosting:sbx-cms', {stdio: 'inherit'});
