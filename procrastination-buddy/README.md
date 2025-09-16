# Procrastination-Buddy-System

Instructions on how to setup and run the app

## Project Setup
### Step 1: Clone the Repository
Clone the repository to your local machine
```
git clone https://github.com/chaoDylan2025/Procrastination-Buddy-System.git
```

### Step 2: Install dependencies
Install the required JavaScript packages
```
cd procrastination-buddy
cd src
npm install
cd ../back-end
npm install
```

### Step 3: Create Firebase Project
- Open the [Firebase Page](https://firebase.google.com/?gclsrc=aw.ds&gad_source=1&gad_campaignid=12211052842&gbraid=0AAAAADpUDOhWX4p8jFhflgnZGjA7KiKfX&gclid=EAIaIQobChMIxu3ngNPdjwMVUXR_AB1TTykgEAAYASAAEgJ7G_D_BwE)
- Go to Console
  - Select the option to **Create a new Firebase project**
    - Enable Google Analytics for this project
    - For your Google Analytics account, select **Default Account for Firebase**   
- Open recently created Firebase project
  - Under *Product categories*, open the **Build** tab and click on **Firestore Database**
  - Click on **Create database**
    - Select **standard edition**
    - Select **any location**
    - Select **Start in test mode**
  - Open the **Build** tab again and click on **Authentication**
    - Click on **Get Started**
    - Under *Native providers*, select **Email/Password**
    - Enable **only Email/Password**
   
### Step 4: Setup an .env file
Create a file called .env in the back-end directory and add your Firebase configuration values
```
FIREBASE_API_KEY = your_api_key
FIREBASE_AUTH_DOMAIN = your_auth_domain
FIREBASE_PROJECT_ID = your_project_id
FIREBASE_STORAGE_BUCKET = your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID = your_messaging_sender_id
FIREBASE_APP_ID = your_app_id
FIREBASE_MEASUREMENT_ID = your_measurement_id
```

To get these values:
  - In your Firebase project, click on the **gear icon** next to **Project Overview** and select **Project settings**
  - Under **Your apps**, select the **Web** platform
  - Enter a nickname and select **Use npm**
  - Copy the values from the **firebaseConfig** object and paste each into the corresponding variable in your **.env** file
  ```
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id",
    appId: "your_app_id",
    measurementId: "your_measurement_id"
  };
  ```

### Step 5: Run local development and Express.js servers

Start the Express.js server:
```
cd back-end
npm run devStart
```

Start the front-end development server:
```
cd src
npm run dev
```
