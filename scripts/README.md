# developer setup notes

Setup

- `git clone` and navigate to this directory
- `npm install`
- create .env file in root with create-react-app conventions
  - REACT_APP_ENV
  - Firebase project credentials, one for prod and one for sandbox (for sandbox, prefix with _SBX_). Go to console > project > project overview > (gear icon) > project settings
    - REACT_APP_FIREBASE_API_KEY
    - REACT_APP_AUTH_DOMAIN
    - REACT_APP_DATABASE_URL
    - REACT_APP_PROJECT_ID
    - REACT_APP_STORAGE_BUCKET
    - REACT_APP_MESSENGER_SENDER_ID
    - REACT_APP_APP_ID
    - REACT_APP_MEASUREMENT_ID

Development

- `npm run start`

Deployment 

- `npm install -g firebase-tools`
- login to admin user with `firebase login`

- `npm run deployToSandbox`
- `npm run deployToProduction` 