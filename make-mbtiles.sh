rsync -avz --delete --progress grunnkart@hydra:~/tilesdata/Administrativ_grense .   
cd Administrativ_grense
find -name "*.4326.geojson" -type f -exec ../mbtiles.sh {} \;
rsync -avz ./ --progress grunnkart@hydra:~/tilesdata/Administrativ_grense/ 

