const precios = {
  comunYUTCGR: [
    { material: "SERIE 1", precio: "798" },
    { material: "SERIE 2", precio: "833" },
    { material: "SERIE 3", precio: "869" },
    { material: "SERIE 4", precio: "904" },
    { material: "SERIE 5", precio: "956" },
    { material: "SERIE 6", precio: "1,010" },
    { material: "SERIE 7", precio: "1,080" },
    { material: "PROMO", precio: "1,205" },
    { material: "PIEL A", precio: "1,277" },
    { material: "PIEL B", precio: "1,378" },
    { material: "PIEL C", precio: "1,552" },
    { material: "PIEL D", precio: "1,753" },
  ],
  comunYUTCMA: [
    { material: "SERIE 1", precio: "827" },
    { material: "SERIE 2", precio: "862" },
    { material: "SERIE 3", precio: "898" },
    { material: "SERIE 4", precio: "935" },
    { material: "SERIE 5", precio: "990" },
    { material: "SERIE 6", precio: "1044" },
    { material: "SERIE 7", precio: "1,116" },
    { material: "PROMO", precio: "1,114" },
    { material: "PIEL A", precio: "1,181" },
    { material: "PIEL B", precio: "1,275" },
    { material: "PIEL C", precio: "1,436" },
    { material: "PIEL D", precio: "1,625" },
  ],
  comunYUTCME: [
    { material: "SERIE 1", precio: "877" },
    { material: "SERIE 2", precio: "915" },
    { material: "SERIE 3", precio: "955" },
    { material: "SERIE 4", precio: "955" },
    { material: "SERIE 5", precio: "1,055" },
    { material: "SERIE 6", precio: "1,114" },
    { material: "SERIE 7", precio: "1,194" },
    { material: "PROMO", precio: "1,363" },
    { material: "PIEL A", precio: "1,450" },
    { material: "PIEL B", precio: "1,572" },
    { material: "PIEL C", precio: "1,781" },
    { material: "PIEL D", precio: "2,024" },
  ],
  comunYUTMGR: [
    { material: "SERIE 1", precio: "823" },
    { material: "SERIE 2", precio: "852" },
    { material: "SERIE 3", precio: "881" },
    { material: "SERIE 4", precio: "910" },
    { material: "SERIE 5", precio: "954" },
    { material: "SERIE 6", precio: "998" },
    { material: "SERIE 7", precio: "998" },
    { material: "PROMO", precio: "1,066" },
    { material: "PIEL A", precio: "1,117" },
    { material: "PIEL B", precio: "1,190" },
    { material: "PIEL C", precio: "1,313" },
    { material: "PIEL D", precio: "1,457" },
  ],
  comunYUTMGRDI: [
    { material: "SERIE 1", precio: "921" },
    { material: "SERIE 2", precio: "954" },
    { material: "SERIE 3", precio: "986" },
    { material: "SERIE 4", precio: "1,019" },
    { material: "SERIE 5", precio: "1,067" },
    { material: "SERIE 6", precio: "1,116" },
    { material: "SERIE 7", precio: "1,181" },
    { material: "PROMO", precio: "1,302" },
    { material: "PIEL A", precio: "1,375" },
    { material: "PIEL B", precio: "1,477" },
    { material: "PIEL C", precio: "1,654" },
    { material: "PIEL D", precio: "1,859" },
  ],
  comunYUTMMADI: [
    { material: "SERIE 1", precio: "967" },
    { material: "SERIE 2", precio: "1,000" },
    { material: "SERIE 3", precio: "1,033" },
    { material: "SERIE 4", precio: "1,067" },
    { material: "SERIE 5", precio: "1,117" },
    { material: "SERIE 6", precio: "1,167" },
    { material: "SERIE 7", precio: "1,235" },
    { material: "PROMO", precio: "1,344" },
    { material: "PIEL A", precio: "1,418" },
    { material: "PIEL B", precio: "1,521" },
    { material: "PIEL C", precio: "1,696" },
    { material: "PIEL D", precio: "1,902" },
  ],
  comunYUTMME: [
    { material: "SERIE 1", precio: "909" },
    { material: "SERIE 2", precio: "939" },
    { material: "SERIE 3", precio: "969" },
    { material: "SERIE 4", precio: "1,000" },
    { material: "SERIE 5", precio: "1,044" },
    { material: "SERIE 6", precio: "1,090" },
    { material: "SERIE 7", precio: "1,150" },
    { material: "PROMO", precio: "1,232" },
    { material: "PIEL A", precio: "1,296" },
    { material: "PIEL B", precio: "1,387" },
    { material: "PIEL C", precio: "1,542" },
    { material: "PIEL D", precio: "1,725" },
  ],
  comunYUTMMEDI: [
    { material: "SERIE 1", precio: "1,003" },
    { material: "SERIE 2", precio: "1,039" },
    { material: "SERIE 3", precio: "1,074" },
    { material: "SERIE 4", precio: "1,109" },
    { material: "SERIE 5", precio: "1,162" },
    { material: "SERIE 6", precio: "1,214" },
    { material: "SERIE 7", precio: "1,285" },
    { material: "PROMO", precio: "1,411" },
    { material: "PIEL A", precio: "1,491" },
    { material: "PIEL B", precio: "1,602" },
    { material: "PIEL C", precio: "1,793" },
    { material: "PIEL D", precio: "2,016" },
  ],
};
const piezas = [
  {
    id: "None",
    title: "---Sin pieza seleccionada--",
    imageUrl: "..",
  },
  {
    id: "YUTCGRD",
    title: "YUTCGRD Chaise longue grande (104 cm) dcho.",
    imageUrl: "../assets/CH_80_DER.png",
    price: precios.comunYUTCGR,
    medida: 104,
  },
  {
    id: "YUTCGRI",
    title: "YUTCGRI Chaise longue grande (104 cm) izqdo.",
    imageUrl: "../assets/CH_80_IZQ.png",
    price: precios.comunYUTCGR,
    medida: 104,
  },
  {
    id: "YUTCMAD",
    title: "YUTCMAD Chaise longue maxi (114 cm) dcho.",
    imageUrl: "../assets/CH_90_DER.png",
    price: precios.comunYUTCMA,
    medida: 114,
  },
  {
    id: "YUTCMAI",
    title: "YUTCMAI Chaise longue maxi (114 cm) izqdo.",
    imageUrl: "../assets/CH_90_IZQ.png",
    price: precios.comunYUTCMA,
    medida: 114,
  },
  {
    id: "YUTCMED",
    title: "YUTCMED Chaise longue mega (124 cm) dcho.",
    imageUrl: "../assets/CH_100_DER.png",
    price: precios.comunYUTCME,
  },
  {
    id: "YUTCMEI",
    title: "YUTCMEI Chaise longue mega (124 cm) izqdo.",
    imageUrl: "../assets/CH_100_IZQ.png",
    price: precios.comunYUTCME,
  },
  {
    id: "YUTMGR",
    title: "YUTMGR Módulo grande (80 cm) sin brazo",
    imageUrl: "../assets/M80_SB.png",
    price: precios.comunYUTMGR,
  },
  {
    id: "YUTMGRD",
    title: "YUTMGRD Módulo grande (104 cm) brazo dcho.",
    imageUrl: "../assets/M80_DER.png",
    price: precios.comunYUTMGRDI,
  },
  {
    id: "YUTMGRI",
    title: "YUTMGRI Módulo grande (104 cm) brazo izqdo.",
    imageUrl: "../assets/M80_IZQ.png",
    price: precios.comunYUTMGRDI,
  },
  {
    id: "YUTMMAD",
    title: "YUTMMAD Módulo maxi (114 cm) brazo dcho.",
    imageUrl: "../assets/M90_DER.png",
    price: precios.comunYUTMMADI,
  },
  {
    id: "YUTMMAI",
    title: "YUTMMAI Módulo maxi (114 cm) brazo izqdo.",
    imageUrl: "../assets/M90_IZQ.png",
    price: precios.comunYUTMMADI,
  },
  {
    id: "YUTMME",
    title: "YUTMME Módulo mega (100 cm) sin brazo",
    imageUrl: "../assets/M100_SB.png",
    price: precios.comunYUTMME,
  },
  {
    id: "YUTMMED",
    title: "YUTMMED Módulo mega (124 cm) brazo dcho.",
    imageUrl: "../assets/M100_DER.png",
    price: precios.comunYUTMMEDI,
  },
  {
    id: "YUTMMEI",
    title: "YUTMMEI Módulo mega (124 cm) brazo izqdo.",
    imageUrl: "../assets/M100_IZQ.png",
    price: precios.comunYUTMMEDI,
  },
  {
    id: "YUTMXL",
    title: "YUTMXL Módulo XL (110 cm) sin brazo",
    imageUrl: "../assets/M110_SB.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTMXLD",
    title: "YUTMXLD Módulo XL (134 cm) brazo dcho.",
    imageUrl: "../assets/M110_DER.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTMXLI",
    title: "YUTMXLI Módulo XL (134 cm) brazo izqdo.",
    imageUrl: "../assets/M110_IZQ.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTRA",
    title: "YUTRA Rincón abierto (113 x 113 cm)",
    imageUrl: "../assets/RA.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTRTD",
    title: "YUTRTD Rincón terminal derecho (108 x 205 cm)",
    imageUrl: "../assets/RT_DER.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTRTI",
    title: "YUTRTI Rincón terminal izquierdo (108 x 205 cm)",
    imageUrl: "../assets/RT_IZQ.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTTGRD",
    title: "YUTTGRD Terminal grande (123 cm) dcho.",
    imageUrl: "../assets/TER_80_DER.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTTGRI",
    title: "YUTTGRI Terminal grande (123 cm) izqdo.",
    imageUrl: "../assets/TER_80_IZQ.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTTMAD",
    title: "YUTTMAD Terminal maxi (133 cm) dcho.",
    imageUrl: "../assets/TER_90_DER.png",
    price: 0 /*PRECIO BASE*/,
  },
  {
    id: "YUTTMAI",
    title: "YUTTMAI Terminal maxi (133 cm) izqdo.",
    imageUrl: "../assets/TER_90_IZQ.png",
    price: 0 /*PRECIO BASE*/,
  },
];
