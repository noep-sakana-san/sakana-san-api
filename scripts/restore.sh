#!/bin/bash

# Chargement des variables d'environnement depuis le fichier .env
set -o allexport
source .env
set +o allexport

# Variables
backup_dir="backup"
db_container="sakana-san-db"
media_dev_path="public/files" # Chemin des médias dans l'environnement de développement
media_prod_path="app/public/files" # Chemin des médias dans l'environnement de production

# Récupération du dernier fichier de sauvegarde
backup_file=$(ls -t ${backup_dir} | head -n1)

# Vérification de l'existence du fichier de sauvegarde
if [ -z "${backup_file}" ]; then
  echo "No backup file found in ${backup_dir}."
  exit 1
fi

# Création d'un répertoire temporaire pour l'extraction
temp_dir=$(mktemp -d)
echo "Created temporary directory ${temp_dir} for extraction."

# Extraction du fichier de sauvegarde
echo "Extracting backup file ${backup_file}..."
tar -xzf ${backup_dir}/${backup_file} -C ${temp_dir}
echo "Extraction completed."

# Restauration des fichiers médias
echo "Copying media files..."
if [ ${NODE_ENV} = "development" ]; then
  cp -r ${temp_dir}/media/. ${media_dev_path}
else
  docker cp ${temp_dir}/media/. sakana-san-api:${media_prod_path}
fi
echo "Media files copy completed."

# Restauration de la base de données
echo "Restoring database..."
cat ${temp_dir}/sakana_san.sql | docker exec -i ${db_container} psql -U ${TYPEORM_USERNAME} -d ${TYPEORM_DATABASE}
echo "Database restoration completed."

# Nettoyage du répertoire temporaire
echo "Cleaning up temporary files..."
rm -rf ${temp_dir}
echo "Cleanup completed."

echo "Full restore completed."
