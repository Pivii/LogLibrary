/**
 * Initialise le système de journalisation.
 * @param {string} fileId - L'ID du fichier Google Doc à utiliser comme journal.
 * @return {string} - 'OK' si le fichier est trouvé, ou un message d'erreur.
 */
function InitializeLogging(fileId) {
    PropertiesService.getScriptProperties().deleteAllProperties(); // Réinitialise les propriétés
    
    try {
      // Vérifie si le fichier existe
      var fileFound = DriveApp.getFileById(fileId);
      if (!fileFound) {
        throw 'Fichier introuvable avec l\'ID : ' + fileId;
      }
  
      // Enregistre l'ID du fichier dans les propriétés
      PropertiesService.getScriptProperties().setProperty('LogFileID', fileId);
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
  