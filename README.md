# Preface
I won't be updating this, but I decided it to release it to help people understand what the code is doing.

Quizlet is constantly updating their system, which will ruin user-scripts on a very frequent basis. If you are going to be doing anything in the browser, like modifying or updating this code, you will almost certainly need to learn the basics of Javascript and HTML at the very least. You don't need much experience to read the code, but to fix or update it you need to have a basic understanding of the syntax. If you plan to just modify the script and fix the errors, it should be fairly easy unless Quizlet pull a fast 180.

# Common Issues

There are normally two things that break the functionality of the code:

## 1. Quizlet updates element identification

In order to find various types of information in the page, you have to know what you are looking for. If Quizlet updates the content and changes around certain elements, then the script will be unable to find that element, and will most likely throw an error. Annoyingly, some things will not throw error, which makes debugging the problem a lot harder. In order to fix this, you need to locate the missing element, and find a way to identify it consistently.

## 2. Quizlet changes the terms location
In order to find the answer to a question, obviously you need to know both the question and the correct answer. Luckily both of those things *should* be accessible. Normally, there is a global variable called `Quizlet` in this global variable a ton of useful information is stored. If Quizlet updates the location or name of this variable, the script will no longer be able to find need information, mainly the question answers. In the past, the question / answer information was easily accessible, but when debugging the extension today it seems as if Quizlet has completely revamped the old system. From a quick memory search, it seems like the answers are stored in `Quizlet.assistantModeData.studiableData`, but you will need to parse the question answer information together yourself.


# Code Format
All important scripts are in `/Scripts` and are named fairly helpfully. 

`/Scripts/Main.js` is the main script that loads all of the other modules, handles basic stuff and shouldn't really be an issue.

`/Scripts/Answers.js` is the main script for obtaing all the terms and information about the set. 

`/Scripts/Debug.js` is used for helping other users and for quickly obtaining basic helpful script information.

`/Scripts/Functions.js` contains some global functions that are used across all the other scripts.

`/Scripts/Module.js` is a library that provides some useful functions, should eventually merge into `Functions.js`

`/Scripts/Settings.js` handles persistant information, like the settings. This is where the settings UI is created and handled.

All the other scripts are self-explanitory - they are named after the mode they work on.


# Compiling the code
Run `index.html`, the compiled code will be generated in the textarea.
