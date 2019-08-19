const { io, json } = require("lastejobb");

const autorTilKode = {
  IndreFarvann: "TO-LIF-IF",
  Landareal: "TO-LIF-LA",
  LandIndreFarvann: "TO-LIF",
  Sjøterritorium: "TO-ST",
  Kontinentalsokkel: "KS",
  TilstøtendeSone: "KS-TS",
  Fiskevernsone: "KS-FV",
  Fiskerisone: "KS-FS",
  NorgesØkonomiskeSone: "KS-ØS",
  Territorialfarvann: "TO-ST-TF",
  Territorialområde: "TO"
};

const autor2TilKode = {
  bouvetøya: "BO",
  "jan mayen": "JM",
  svalbard: "SV",
  "landområdet som grenser til sverige, finland og russland samt kystnære øyer, holmer og skjær":
    "LO"
};

const r = {};
const geo = io.readJson("NorgesMaritimeGrenser.geojson");
geo.features.forEach(f => {
  const props = f.properties;
  const otn = props.objekttypenavn;
  if (!r[otn]) r[otn] = {};
  const t = r[otn];
  t.kode = getKode(otn);
  t.kodeautor = otn;
  accu(t, "lenke", props.DOKUMENTLINK);
  t.tittel = { nb: props.informasjon };
  // accu(t, "ingress", );

  props.kode = getKode(otn, props.informasjon);
  const barn = {
    kode: props.kode,
    tittel: { nb: props.informasjon }
  };
  if (props.DOKUMENTLINK) barn.lenke = { lovdata: props.DOKUMENTLINK };
  r[props.kode] = barn;
  f.properties = { code: props.kode };
});

function accu(t, key, value) {
  if (!value) return;
  t[key] = t[key] || {};
  t[key][value] = true;
}

function getKode(l1, l2) {
  const k = autorTilKode[l1];
  const p1 = "AO-MG-" + k;
  if (!l2) return p1;
  const l = getKode2(l1, l2); //autor2TilKode[[l2]];
  if (!l) return p1;
  const r = p1 + "-" + l;
  return r;
}

function getKode2(l1, l2) {
  l2 = l2
    .replace(l1, "")
    .trim()
    .toLowerCase();
  const l = autor2TilKode[[l2]];
  if (l2.indexOf("barentsøya") >= 0) return "SV-BA";
  if (l2.indexOf("edgeøya") >= 0) return "SV-ED";
  if (l2.indexOf("nordaustlandet") >= 0) return "SV-NA";
  if (l2.indexOf("spitsbergen") >= 0) return "SV-SN";
  if (l2.indexOf("karl") >= 0) return "SV-KK";
  if (l2.indexOf("bouvetøya") >= 0) return "BO";
  if (l2.indexOf("hopen") >= 0) return "SV-HO";
  if (l2.indexOf("bjørnøya") >= 0) return "SV-BJ";
  if (l2.indexOf("kvitøya") >= 0) return "SV-KV";
  if (l2.indexOf("jan mayen") >= 0) return "JM";
  if (l2.indexOf("fastland") >= 0) return "FL";
  if (l2.indexOf("kontinentalsokkel") >= 0) return "";
  if (l2.indexOf("indre") >= 0) return "";
  if (l2.indexOf("svalbard") >= 0) return "SV";
  if (!l) console.warn(l1 + ' "' + l2.toLowerCase() + '": "",');
  return l;
}

const typer = json.objectToArray(r);
//io.skrivBuildfil("type.json", typer);
io.skrivBuildfil("polygon_med_undertyper.4326.geojson", geo);
