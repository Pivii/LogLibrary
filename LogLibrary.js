/**
 * Initialise le système de journalisation.
 * @param {string} fileId - L'ID du fichier Google Doc à utiliser comme journal.
 * @return {string} - 'OK' si le fichier est trouvé, ou un message d'erreur.
 */
function InitializeLogging(fileId) {
    Logger.log('Starting InitializeLogging with fileId: ' + fileId);
    PropertiesService.getScriptProperties().deleteAllProperties();
    Logger.log('Properties reset completed');
    
    try {
        Logger.log('Attempting to retrieve file...');
        var fileFound = DriveApp.getFileById(fileId);
        Logger.log('File found: ' + fileFound.getName());
        
        if (!fileFound) {
            Logger.log('Error: fileFound is null or undefined');
            throw 'File not found with ID: ' + fileId;
        }
    
        Logger.log('Saving file ID in properties...');
        PropertiesService.getScriptProperties().setProperty('LogFileID', fileId);
        Logger.log('ID successfully saved');
        return 'OK';
    } catch (e) {
        Logger.log('Caught error: ' + e.toString());
        return e.toString();
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
  