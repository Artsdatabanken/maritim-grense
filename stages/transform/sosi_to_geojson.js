const execSync = require("child_process").execSync;

const cmd = "ogr2ogr NorgesMaritimeGrenser.geojson NorgesMaritimeGrenser.sos";

execSync(cmd);
