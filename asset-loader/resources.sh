#!/usr/bin/env sh
# File: resources.sh
# Author: Breno Leonhardt Pacheco
# Email: brenoleonhardt@gmail.com
# Last Modified: February 24, 2021
# Description: pulls data files from http://dados.cvm.gov.br
# after downloading zips, extract relevant csv files

# exit when any command fails
# keep track of the last executed command
# echo an error message before exiting
set -e
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT

echo ">START"
ZIP_DIR="./zips"
CSV_DIR="./csv"
BASE_URL="http://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/ITR/DADOS/"
FILES=$(curl $BASE_URL 2>/dev/null | sed -n 's/.*\(itr_.*\.zip\).*/\1/p')

echo ">>Available files:"
echo "$FILES"
test -d "$ZIP_DIR" || mkdir -p $ZIP_DIR
test -d "$CSV_DIR" || mkdir -p $CSV_DIR

echo ">Pulling zip files and  extracting"
for file in $FILES ; do
    ZIP="$ZIP_DIR/$file"
    test -f "$ZIP" || wget "$BASE_URL$file" -O "$ZIP"
    YEAR=$(echo "$file" | sed 's/.*\([0-9]\{4\}\).*/\1/')
    unzip -n "$ZIP" itr_cia_aberta_BPA_con_${YEAR}.csv    -d "$CSV_DIR"
    unzip -n "$ZIP" itr_cia_aberta_BPP_con_${YEAR}.csv    -d "$CSV_DIR"
    unzip -n "$ZIP" itr_cia_aberta_DFC_MI_con_${YEAR}.csv -d "$CSV_DIR"
    unzip -n "$ZIP" itr_cia_aberta_DRE_con_${YEAR}.csv    -d "$CSV_DIR"
done

echo ">DONE"
exit 0
