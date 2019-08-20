scp build/polygon_med_undertyper.4326.geojson grunnkart@hydra:~/tilesdata/Administrativ_grense/
ssh -t grunnkart@hydra "cd /home/grunnkart/tilesdata/Administrativ_grense/ ; export DEBUG=*; ~/.nvm/versions/node/v12.7.0/bin/npx geojson-subset-kart-lastejobb"

# npx geojson-subset-kart-lastejobb kommune.4326.geojson 2
# npx geojson-subset-kart-lastejobb fylke.4326.geojson 1

