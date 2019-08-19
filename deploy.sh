scp build/polygon_med_undertyper.4326.geojson grunnkart@hydra:~/tilesdata/Administrativ_grense/Maritim_grense/
ssh -t grunnkart@hydra "cd /home/grunnkart/tilesdata/Administrativ_grense/Maritim_grense/ ; export DEBUG=*; ~/.nvm/versions/node/v12.7.0/bin/npx geojson-subset-kart-lastejobb"

