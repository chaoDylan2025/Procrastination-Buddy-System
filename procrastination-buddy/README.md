# Procrastination-Buddy-System

Instructions on how to setup and run app

## Project Setup
### Step 1: Clone the Repository
Clone the repository to your local machine
```
git clone https://github.com/chaoDylan2025/Procrastination-Buddy-System.git
```

### Step 2: Install dependencies
Install the required JavaScript packages
```sh
npm install
```

### Step 3: Create Firebase Project
- Open the [Firebase Page](https://firebase.google.com/?gclsrc=aw.ds&gad_source=1&gad_campaignid=12211052842&gbraid=0AAAAADpUDOhWX4p8jFhflgnZGjA7KiKfX&gclid=EAIaIQobChMIxu3ngNPdjwMVUXR_AB1TTykgEAAYASAAEgJ7G_D_BwE)
- Go to Console
  - Select the option to **Create a new Firebase project**
- Open new Firebase project
  - Under *Product categories*, open the **Build** tab and click on **Firestore Database**
  - Click on **Create database**
    - Select **standard edition**
    - Select **any location**
    - Select **Start in test mode**
   
### Step 4: Setup an .env file
Click on **Project Overview** gear icon and select **Project settings**
  - Under **Your apps**, select the **Web** platform
  - Come up with a nickname
  - Select **Use npm**
  - Copy the Firebase configuration
  ```
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain,
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id",
    appId: "your_app_id"
  };
  ```
Open the project and navigate to procrastination-buddy
```
cd procrastination-buddy
```

Create a file called .env and add your Firebase configuration
```
FIREBASE_API_KEY= 'your_api_key'
FIREBASE_AUTH_DOMAIN= 'your_auth_domain'
FIREBASE_PROJECT_ID= 'your_project_id'
FIREBASE_STORAGE_BUCKET= 'your_storage_bucket'
FIREBASE_MESSAGING_SENDER_ID= 'your_messaging_sender_id'
FIREBASE_APP_ID= 'your_app_id'
FIREBASE_MEASUREMENT_ID= 'your_measurement_id'
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
