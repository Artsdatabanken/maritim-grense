#! /bin/bash -
file=$1
dir=$(dirname ${file%.*})
cd $dir
ogr2ogr -dsco BUFFER=0 polygon.3857.mbtiles polygon.4326.geojson
