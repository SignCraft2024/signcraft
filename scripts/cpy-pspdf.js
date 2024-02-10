import fs from 'fs';
import ncp from 'ncp';

// Chemin source et destination
const sourceDir = './node_modules/pspdfkit/dist/pspdfkit-lib';
const destDir = './public/pspdfkit-lib';

// Vérifier si le répertoire source existe
if (!fs.existsSync(sourceDir)) {
	console.error(`Le répertoire source '${sourceDir}' n'existe pas.`);
}

// Créer le répertoire de destination s'il n'existe pas
if (!fs.existsSync(destDir)) {
	fs.mkdirSync(destDir, { recursive: true });
}

// Copie du répertoire
ncp(sourceDir, destDir, function (err) {
	if (err) {
		console.error('Erreur lors de la copie :', err);
	}
	console.log('Le répertoire a été copié avec succès.');
});
