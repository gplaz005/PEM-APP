# PEM-APP
pediatric app

The Pediatric Emergency App, or PEM App, is a smartphone application designed to assist doctors, nurses, and other medical staff in the midst of pediatric emergencies. 
Its features include a vast amount of information on some of the most common pediatric emergencies*, a search area for the user to look up a specific condition, a chatroom so the user can communicate with other users, and an area where the user can keep track of their continuing medical education. These features are provided at no cost. All that is needed is an account for the chatroom and continuing medical education tracker. 
This application was made possible with React Native, Facebook’s mobile application framework. This allowed for the application to be compatible with both Android and iOS devices without having to develop for both separately. React Native is also very robust when it comes to libraries, and some were used to enable the features of this application to work at their best. Firebase was also used to manage the data that will be stored and to handle the user accounts and all their operations (account creation, signing in and out, etc).  



Installation/Maintenance Document
Prior to installing

Make sure you have an IDE available. Visual Studio Code is highly recommended, as it is free and has a built-in terminal, which we will be using. 
Make sure you have Git installed, so you can run git clone.
Make sure you have Node.js installed. Version 12 is recommended. If you don’t have it, you can find it here: https://nodejs.org/en/
Make sure you have an Android emulator available. If you don’t, the free personal edition of Genymotion is recommended. Visit www.genymotion.com/fun-zone to download the free version.
Make sure you have the Expo CLI installed. To do this, simply open your terminal and run npm install expo-cli --global. 
Getting set up and cloning the project
Open Visual Studio and press Ctrl+` (that’s the backtick key. It should be above your Tab key and to the left of your 1 key). This will open up Visual Studio Code’s built-in terminal.
Use cd <directory> to navigate to the directory where you plan to clone the project and run npm install expo-cli --global to install the expo CLI. 
Run git clone https://github.com/andmar204/PediatricEmergencyApp.git in the same directory where you ran Step 3.
Configuring Firebase (Part 1)
Setting up Firebase
Go to www.firebase.google.com and create an account if you don’t have one. Once that’s done, click “Go to console” in the upper right corner.  
Click on the large “Add project” button.
Enter a name for your project and click “continue”.
Here you’ll be able to enable or disable Google Analytics for the project. If you enable it, click “continue” and follow the steps below. If not, click “Create project” and continue to Step 5.
Open the dropdown menu and click “Default Account for Firebase”. 
Click “Create project”
You should see large text that says “Get started by adding Firebase to your app”. Under it, there are three buttons, one for iOS, one for Android, and one for Web. Click the one for Web. 
Add a nickname for your project and decide if you would like to set up Firebase Hosting for this application. 
Click “Register app”.
You should now see a large block of Javascript code. Leave this window open, you will be using it later.
Open Visual Studio Code and in it, click “File” → “Open Folder”, and then open the directory created when you completed Step 4 in the “Getting set up” section (it should be called PediatricEmergencyApp).
On the left hand side, you should see a list of directories and files. Open the one named “backend” and open “firebase.js”. 
On lines 18-24, you should see
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",   
};


Go back to the Firebase window you left open in Step 8, and copy from the line that says apiKey: "..." up to the line that says storageBucket: "...".  
Return to firebase.js in Visual Studio Code, highlight lines 19-23, and paste in what you copied. 
Optionally, press Alt+Shift+F to format. 
Save your changes and in the Firebase window from Step 8, click “Continue to console”. 
If you downloaded Genymotion (if you didn’t, go to “Running the project” section)
Open Genymotion.
You should see a large pink “+” button on the upper right. This is used to install devices. Click it. 
Click any device you’d like to install, and click “Next”.
You should see a list of settings you can change about your device. It is recommended to leave these as-is, unless you know what you’re doing.
Click “Install”.
Once installation finishes, double click the device to start it up. 
Running the project
Go to Visual Studio Code, and in the terminal, run npm install. This will ensure you have all the packages needed for the application to work. 
Once that finishes, make sure you have an Android emulator running, whether it be Genymotion or otherwise. 
Run expo start --android. This will install the Expo client on your running emulator and start the project. 

Although the application is running, you cannot create or login with an account, and clicking a subcategory under Medical, Surgical, Trauma, or Toxicology will give you a fatal error saying “Could not reach Cloud Firestore backend” and “Failed to get document because the client is offline”.  This is because Firebase Authentication and Cloud Firestore have not been set up yet. We’ll do those next. 
Configuring Firebase (Part 2)
 Setting up Firebase Authentication

After you’ve clicked “Continue to console” on Step 15 in the “Setting up Firebase” section, you were taken to the Firebase console. On the left hand side, you should see tabs that say “Authentication”, “Database”, “Storage”, and more. Click the “Authentication” tab.
Click “Set up sign-in method”. 
Click the first method. Its provider should say “Email/Password”. 
You should now see two toggle buttons that say “Enable”. Enable the upper one. Leave the one next to “Email link (passwordless sign-in)” disabled.
Click “Save”.
In your running emulator, click the “Chatroom & CME” category. 
Click “New? Create an account!”.
Type in an email and password, and click “Confirm”. You should see a box pop up that says “Success! Your account has been created”. 
Log in with your newly created account. 
You should see the CME and Chatroom subcategories, along with a button that says “Sign out” on the upper right corner. Click “Sign out”. If steps 8-10 all worked, then that means Firebase Authentication was set up correctly.  
Setting up Cloud Firestore
Back in the Firebase console, click the “Database” tab on the left hand side. 
Click “Create database” under “Cloud Firestore”. 
Click “Start in test mode” and click “Next”.
Leave the Cloud Firestore location as it is, and click “Done”. 
Click “Start collection”.
Set the Collection ID to “data” and click “Next”. 
Leave Document ID blank so Firestore will Auto-ID. Fill in the field with any value you like and leave the value blank (this document isn’t important and will be deleted later). Click “Save”. 
You should now see three columns. The middle one is labeled “data” and the rightmost one is labeled with the automatically assigned document ID that Firestore created. In the rightmost column, to the right of the ID, you should see three dots stacked on top of one another. Click it and click “Delete document”. 
Click “Start delete”. Once this is done, your collection should now be empty.
Back in the emulator, notice how if you click a subcategory under Medical, Surgical, Trauma, or Toxicology, you no longer get a fatal error. Instead, you get a screen that simply says “Loading…”. This is because although Firestore has been set up, the application is trying to pull data from the empty data collection. Let us now add data to the collection.
Adding data to your empty Cloud Firestore collection
Back in Visual Studio Code, you should see a directory named “screens” in the left hand side. Open it, and open LoginScreen.js.
Go to the end of line 15, press Enter to go to a new line, and type import {SUBCATEGORIES} from '../data/categoriesData.js'
Now open the directory named “data” in the left hand side, and open firebase_data_entry.js.
Copy lines 13-20. This should be under text that says “SNIPPET 1”.
Go back to LoginScreen.js.
Type // at the very beginning of line 82. Go to the end of line 82 and press Enter to start a new line.  
Paste the code you copied from firebase_data_entry.js.
Save your changes.
Back in the emulator, go to the “Chatroom & CME” category.
Click “Log in”.
Go back to the Cloud Firestore database. In your “data” collection, you should now see items labeled similarly to “cX-Y”, where X and Y are numbers.
Going back to your emulator, if you click a subcategory under Medical, Surgical, Trauma, or Toxicology, you should now see labels that say “Evaluation”, “Management”, “Medication”, “Symptoms”, and “References”. Under those labels, there should be text that has the title of whichever subcategory you clicked with “_evaluation”, “_management”, “_medications”, “_symptoms”, and “_references” appended after it. 
Delete import {SUBCATEGORIES} from '../data/categoriesData.js' from LoginScreen.js. 
Delete the code you pasted into the login button’s onPress.
Delete the // in front of line 82. If you don’t, users won’t be able to log in. 
Save your changes. 
Now, if you go to the chatroom, you’ll notice that you’ll either get an error, or nothing will happen when you send a message. This is because Firebase Realtime Database has rules that deny reads and writes. Let’s fix that. 
Changing Firebase Realtime Database rules
In the Firebase console, click the “Database” tab on the left hand side. 
On the top, under the large “Database” title, you should see tabs that say “Data”, “Rules”, “Backups”, and “Usage”. Click on “Rules”.
Here you should see that the rules say 
"rules": {
  ".read": false,
  ".write": false
}
Change the false values to "true" (including the quotes!).
Click “Publish” and wait a few minutes for the changes to take effect.
You must restart the application. This is because there are things that are initialized as soon as you log in. So to ensure that the changes are in effect, you should restart the app. 
Now if you log in, go into the chatroom, and send a message, you should see a blue bubble appear with the text you sent. 
Congratulations!
The Pediatric Emergency Application is all set and ready to go!
