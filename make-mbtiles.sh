rsync -avz --progress grunnkart@hydra:~/tilesdata/Administrativ_grense/Maritim_grense .   
cd Maritim_grense
find -name "*.4326.geojson" -type f -exec ../mbtiles.sh {} \;
rsync -avz ./ --progress grunnkart@hydra:~/tilesdata/Administrativ_grense/Maritim_grense/ 

