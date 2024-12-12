/**
 * Initialise le système de journalisation.
 * Recherche un fichier de log spécifique dans un chemin donné.
 * @param {string} path - Chemin du dossier (exemple : 'folder1/subfolder').
 * @param {string} filename - Nom du fichier journal.
 * @return {string} - 'OK' si le fichier est trouvé, ou un message d'erreur.
 */
function InitializeLogging(path, filename) {
  PropertiesService.getScriptProperties().deleteAllProperties(); // Réinitialise les propriétés
  
  try {
    // Recherche du dossier
    var folder = getFolderByPath(path);
    if (!folder) throw 'Dossier introuvable : ' + path;

    // Recherche du fichier dans le dossier
    var files = folder.getFilesByName(filename);
    var fileFound = null;

    while (files.hasNext()) {
      var file = files.next();
      fileFound = file; // Si trouvé, enregistre le fichier
      break; // Quitte la boucle une fois trouvé
    }

    if (!fileFound) {
      throw 'Aucun fichier nommé "' + filename + '" trouvé dans le dossier : ' + path;
    }

    // Enregistre l'ID du fichier dans les propriétés
    PropertiesService.getScriptProperties().setProperty('LogFileID', fileFound.getId());
    return 'OK'; // Retourne OK si tout va bien
  } catch (e) {
    return e.toString(); // Retourne un message d'erreur
  }
}

/**
 * Enregistre les logs actuels dans le fichier journal.
 */
function fnSaveLog() {
  var logFileID = PropertiesService.getScriptProperties().getProperty('LogFileID');
  if (!logFileID) {
    Logger.log('Aucun fichier de log initialisé.');
    return;
  }

  var logContent = Logger.getLog(); // Récupère les logs actuels
  if (trim_(logContent) !== "") {
    var logDoc = DocumentApp.openById(logFileID);
    var body = logDoc.getBody();
    body.insertParagraph(0, logContent); // Ajoute les logs en haut du fichier
    logDoc.saveAndClose();
    Logger.clear(); // Vide les logs
  }
}

/**
 * Trim une chaîne de caractères (supprime les espaces en début et fin).
 * @param {string} stringToTrim - Chaîne à nettoyer.
 * @return {string} - Chaîne nettoyée.
 */
function trim_(stringToTrim) {
  if (typeof stringToTrim === 'string') {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
  }
  return stringToTrim;
}

/**
 * Récupère un dossier par son chemin (ex. 'folder1/subfolder').
 * @param {string} path - Chemin du dossier.
 * @return {Folder|null} - Le dossier trouvé ou null.
 */
function getFolderByPath(path) {
  var parts = path.split('/');
  var folder = DriveApp.getRootFolder();

  for (var i = 0; i < parts.length; i++) {
    var folders = folder.getFoldersByName(parts[i]);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      return null; // Dossier introuvable
    }
  }
  return folder;
}
