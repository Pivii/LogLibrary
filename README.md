# Google Apps Script Logging Library

This library provides a simple and modernized way to manage logs in Google Apps Script projects. It saves log messages to a specified Google Document in a given folder on Google Drive. This library is an updated version of the code originally developed by [Steve Whisenhant](https://stevewhisenhant.wordpress.com/2013/03/25/google-apps-script-logging-library/). The functionality has been retained, but it uses updated APIs for better compatibility with the current Apps Script ecosystem.

---

## Features
- Initialize a logging system with a target Google Document.
- Save log messages to the document, appending new entries at the top.
- Supports nested folder paths for better organization.
- Uses modern Google Apps Script APIs (`DriveApp` and `PropertiesService`).

---

## Installation
1. Open your Google Apps Script project.
2. Copy the library code into a new file in your script editor.
3. Save and deploy your project.

---

## How to Use

### 1. Initialize the Logging System
Call the `InitializeLogging` function to set up the logging system. Specify the path to the folder and the name of the log file.

```javascript
InitializeLogging('path/to/folder', 'LogFileName');
```
- **`path/to/folder`**: The folder structure where the log file is located. Use `/` to separate nested folders.
- **`LogFileName`**: The name of the Google Document to use as the log file.

If the specified log file is not found in the given folder, an error will be returned.

### 2. Add Log Messages
Use the `Logger.log` method to add messages to the log.

```javascript
Logger.log('This is a log message.');
Logger.log('Another message to track.');
```

### 3. Save Logs to the Document
Call the `fnSaveLog` function to save the accumulated log messages to the specified Google Document. New messages will be added at the top of the document.

```javascript
fnSaveLog();
```

### Example Workflow
```javascript
function testLogging() {
  // Step 1: Initialize the logging system
  var initStatus = InitializeLogging('path/to/folder', 'LogFileName');
  if (initStatus !== 'OK') {
    Logger.log('Initialization failed: ' + initStatus);
    return;
  }

  // Step 2: Add some logs
  Logger.log('This is the first log entry.');
  Logger.log('This is the second log entry.');

  // Step 3: Save logs to the document
  fnSaveLog();
}
```

---

## Key Functions

### InitializeLogging(path, filename)
- **Description**: Configures the logging system by associating a Google Document as the log file.
- **Parameters**:
  - `path` (string): Folder path where the log file is located.
  - `filename` (string): Name of the log file.
- **Returns**: `'OK'` if successful, or an error message if the file/folder is not found.

### fnSaveLog()
- **Description**: Saves the accumulated log messages to the specified Google Document. New logs are added at the top of the document.
- **Parameters**: None.
- **Returns**: None.

### trim_(stringToTrim)
- **Description**: Utility function to remove leading and trailing spaces from a string.
- **Parameters**:
  - `stringToTrim` (string): The string to clean.
- **Returns**: The cleaned string.

### getFolderByPath(path)
- **Description**: Utility function to navigate Google Drive folders based on a given path.
- **Parameters**:
  - `path` (string): Folder path, separated by `/`.
- **Returns**: The folder object, or `null` if the path is invalid.

---

## Notes
- The library assumes that the log file exists in the specified folder. It does not create new files.
- Ensure the script has appropriate permissions to access Google Drive and Google Documents.
- Clear the log messages in Apps Script after saving them to avoid duplication in subsequent saves.

---

## Acknowledgments
This library is based on the original work by [Steve Whisenhant](https://stevewhisenhant.wordpress.com/2013/03/25/google-apps-script-logging-library/). The code has been updated to work with modern Google Apps Script APIs and to ensure compatibility with current projects.

---

## License
This project is open-source and can be used or modified freely. Please attribute the original author, Steve Whisenhant, when using or sharing this library.

