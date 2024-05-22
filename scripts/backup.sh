#!/bin/bash

# Chargement des variables d'environnement depuis le fichier .env
set -o allexport
source .env
set +o allexport

# Variables
export_dir="backup"
timestamp=$(date +'%Y%m%d')
db_container="sakana-san-db"
media_dev_path="public/files" # Chemin des médias dans l'environnement de développement
media_prod_path="app/public/files" # Chemin des médias dans l'environnement de production

# Création du répertoire de sauvegarde
echo "Creating backup directory..."
mkdir -p ${export_dir}
echo "Backup directory created."

# Export de la base de données
echo "Exporting database..."
docker exec -i ${db_container} pg_dump -U ${TYPEORM_USERNAME} ${TYPEORM_DATABASE} > ${export_dir}/sakana_san.sql
echo "Database export completed."

# Création du répertoire pour les médias
echo "Creating media directory..."
mkdir -p ${export_dir}/media
echo "Media directory created."

# Détection de l'environnement et copie des fichiers médias
if [ ${NODE_ENV} = "development" ]; then
    echo "Copying media files from development environment..."
    find ${media_dev_path} -type f \( -iname \*.jpg -o -iname \*.jpeg -o -iname \*.png -o -iname \*.gif -o -iname \*.webp \) -exec cp {} ${export_dir}/media/ \;
else
    echo "Copying media files from production environment..."
    docker cp sakana-san-api:${media_prod_path}/. ${export_dir}/media
fi

echo "Media files copy completed."

# Création de l'archive compressée
echo "Creating compressed backup..."
tar czf ${export_dir}/backup_${timestamp}.tar.gz -C ${export_dir} sakana_san.sql media
echo "Compressed backup created at ${export_dir}/backup_${timestamp}.tar.gz."

# Nettoyage des fichiers intermédiaires
echo "Cleaning up intermediate files..."
rm ${export_dir}/sakana_san.sql
rm -rf ${export_dir}/media
echo "Cleanup completed."

echo "Full backup completed."
