export interface SubtitleBeat {
  id: string;
  text: string;
  startSec: number;
  durationSec: number;
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  period: string;
  subtitle: string;
  summary: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  durationSec: number;
  narrationText: string;
  subtitles: SubtitleBeat[];
  keyFacts: { label: string; value: string }[];
  quote?: { text: string; author: string; context: string };
  historicalSignificance: string;
}

export const BIOGRAPHY_CHAPTERS: Chapter[] = [
  {
    id: 1,
    slug: "el-presidente-caballero",
    title: "El Presidente Caballero",
    period: "1897 – 1955",
    subtitle: "El líder moderado que unificó a un México polarizado",
    summary:
      "Manuel Ávila Camacho gobernó México de 1940 a 1946. Su estilo prudente, conciliador y cortés le valió el sobrenombre histórico de «El Presidente Caballero», marcando el paso de las armas a la institucionalidad moderna.",
    image: "/src/assets/images/avila_camacho_portrait_1794284238348.jpg",
    imageAlt: "Retrato oficial del General Manuel Ávila Camacho con la banda presidencial",
    imageCaption: "General Manuel Ávila Camacho con la banda tricolor presidencial en su despacho oficial de Palacio Nacional.",
    durationSec: 52,
    narrationText:
      "Manuel Ávila Camacho nació en Teziutlán, Puebla, en 1897. Conocido como «El Presidente Caballero», su gobierno entre 1940 y 1946 representó uno de los periodos de mayor transformación en la historia contemporánea de México. En medio de un mundo desgarrado por la Segunda Guerra Mundial, su serenidad forjó la Unidad Nacional, inauguró la seguridad social y puso fin a la época de los caudillos militares en el poder.",
    subtitles: [
      { id: "1-1", text: "Manuel Ávila Camacho nació en Teziutlán, Puebla, en 1897.", startSec: 0, durationSec: 8 },
      { id: "1-2", text: "Conocido en la historia como «El Presidente Caballero» por su cortesía y moderación,", startSec: 8, durationSec: 10 },
      { id: "1-3", text: "su mandato de 1940 a 1946 transformó radicalmente las instituciones de México.", startSec: 18, durationSec: 10 },
      { id: "1-4", text: "Frente al cataclismo de la Segunda Guerra Mundial y la polarización posrevolucionaria,", startSec: 28, durationSec: 11 },
      { id: "1-5", text: "Ávila Camacho forjó la Unidad Nacional y sentó las bases del Milagro Mexicano.", startSec: 39, durationSec: 13 },
    ],
    keyFacts: [
      { label: "Nacimiento", value: "24 de abril de 1897 en Teziutlán, Puebla" },
      { label: "Mandato Presidencial", value: "1 de diciembre de 1940 – 30 de noviembre de 1946" },
      { label: "Sobrenombre", value: "El Presidente Caballero" },
      { label: "Rango Militar", value: "General de División" },
    ],
    quote: {
      text: "El pueblo mexicano no quiere caudillos de hierro; anhela gobernantes serenos, ecuánimes y constructores de concordia.",
      author: "Manuel Ávila Camacho",
      context: "Mensaje inaugural a la Nación, 1 de diciembre de 1940"
    },
    historicalSignificance:
      "Fue el último presidente militar en la historia moderna de México. Su templanza evitó una nueva guerra civil y preparó la entrega pacífica del poder a los gobernantes civiles."
  },
  {
    id: 2,
    slug: "juventud-y-revolucion",
    title: "Juventud y Revolución",
    period: "1914 – 1935",
    subtitle: "De la sierra poblana al Estado Mayor Constitucionalista",
    summary:
      "Hijo de Manuel Ávila Castillo y Eufrosina Camacho. A los 17 años se incorporó a las fuerzas constitucionalistas en la caballería, destacando por su habilidad táctica y talento natural para la mediación pacífica.",
    image: "/src/assets/images/mexican_revolution_cavalry_1794284258545.jpg",
    imageAlt: "Oficiales de caballería de la Revolución Mexicana en terreno escarpado",
    imageCaption: "Tropas de caballería constitucionalista en la década de 1920, cuerpo en el que Ávila Camacho forjó su carrera castrense.",
    durationSec: 54,
    narrationText:
      "A diferencia de su impetuoso hermano Maximino Ávila Camacho, futuro cacique de Puebla, Manuel se distinguió por una serenidad inquebrantable. Se unió al ejército constitucionalista en 1914 como subteniente de caballería. Durante las campañas contra rebeldes villistas y delahuertistas, Ávila Camacho se ganó el respeto de sus superiores por convencer a los insurrectos de deponer las armas mediante el diálogo antes que el exterminio.",
    subtitles: [
      { id: "2-1", text: "En 1914, con apenas diecisiete años, se unió a las fuerzas constitucionalistas de Venustiano Carranza.", startSec: 0, durationSec: 10 },
      { id: "2-2", text: "Sirvió en la caballería y ascendió por méritos tácticos y una inusual disciplina.", startSec: 10, durationSec: 10 },
      { id: "2-3", text: "A diferencia de su temido hermano Maximino, Manuel prefería el diálogo al fuego.", startSec: 20, durationSec: 11 },
      { id: "2-4", text: "Durante la rebelión delahuertista y la Cristiada, logró pacificar plazas sin derramamiento inútil de sangre.", startSec: 31, durationSec: 12 },
      { id: "2-5", text: "Su lealtad institucional lo condujo a la jefatura del Estado Mayor y al círculo íntimo de Lázaro Cárdenas.", startSec: 43, durationSec: 11 },
    ],
    keyFacts: [
      { label: "Ingreso militar", value: "1914 (Fuerzas de Venustiano Carranza)" },
      { label: "Arma", value: "Caballería del Ejército Nacional" },
      { label: "Campaña destacada", value: "Pacificación de Michoacán y Colima (1926-1929)" },
      { label: "Ascenso a General", value: "General de Brigada en 1929" },
    ],
    quote: {
      text: "La valentía de un oficial no se mide por las balas que dispara, sino por las vidas que es capaz de salvar mediante la serenidad.",
      author: "Manuel Ávila Camacho",
      context: "Instrucciones de pacificación militar, 1928"
    },
    historicalSignificance:
      "Su trayectoria en el ejército lo acreditó como un militar institucional, no como un señor de la guerra caudillista, lo que resultaría decisivo para su posterior ascenso."
  },
  {
    id: 3,
    slug: "consenso-y-eleccion-1940",
    title: "El Candidato del Consenso",
    period: "1936 – 1940",
    subtitle: "Secretaría de la Defensa y la difícil elección de 1940",
    summary:
      "Nombrado Secretario de la Defensa por Lázaro Cárdenas. Al concluir el sexenio, Cárdenas eligió a Ávila Camacho por encima del radical Francisco J. Múgica, buscando calmar los ánimos y evitar una sangrienta fractura militar.",
    image: "/src/assets/images/reconciliation_presidents_1942_1794284237904.jpg",
    imageAlt: "Líderes políticos y militares en la transición de 1940",
    imageCaption: "Encuentro de liderazgos republicanos durante el periodo de relevo del generalato revolucionario.",
    durationSec: 56,
    narrationText:
      "Hacia 1939, México se hallaba sumamente tenso por la expropiación petrolera y el reparto agrario cardenista. Muchos esperaban que Cárdenas eligiera a su amigo radical Francisco J. Múgica. Sin embargo, con visión estratégica, el presidente optó por Manuel Ávila Camacho. Ávila Camacho representaba la mesura capaz de unir a las clases medias, a los empresarios y al ejército, venciendo en las reñidas elecciones de 1940 frente al general Juan Andreu Almazán.",
    subtitles: [
      { id: "3-1", text: "Hacia finales de los años treinta, el país vivía un ambiente de profunda polarización social.", startSec: 0, durationSec: 10 },
      { id: "3-2", text: "La expropiación petrolera y las reformas de Cárdenas habían alarmado a inversionistas y clases medias.", startSec: 10, durationSec: 11 },
      { id: "3-3", text: "Cárdenas prefirió a Ávila Camacho sobre el radical Francisco J. Múgica para evitar una ruptura nacional.", startSec: 21, durationSec: 12 },
      { id: "3-4", text: "En los comicios de 1940, Ávila Camacho compitió contra el carismático general Juan Andreu Almazán.", startSec: 33, durationSec: 11 },
      { id: "3-5", text: "Superada la crisis postelectoral, asumió el poder bajo el lema rector de la Unidad Nacional.", startSec: 44, durationSec: 12 },
    ],
    keyFacts: [
      { label: "Cargo previo", value: "Secretario de la Defensa Nacional (1937–1939)" },
      { label: "Rival electoral", value: "General Juan Andreu Almazán (PRUN)" },
      { label: "Partido postulante", value: "Partido de la Revolución Mexicana (PRM)" },
      { label: "Toma de posesión", value: "1 de diciembre de 1940" },
    ],
    quote: {
      text: "La patria reclama de todos el sacrificio de viejos rencores para levantar un México justo y solidario.",
      author: "Manuel Ávila Camacho",
      context: "Discurso electoral en Puebla, 1940"
    },
    historicalSignificance:
      "La postulación de Ávila Camacho desactivó la amenaza de un golpe militar derechista y garantizó una transición institucional sin violencia fratricida."
  },
  {
    id: 4,
    slug: "reconciliacion-y-unidad-nacional",
    title: "La Unidad Nacional y «Soy Creyente»",
    period: "1940 – 1942",
    subtitle: "Paz religiosa, reforma educativa y el mítico balcón presidencial",
    summary:
      "Con la célebre frase «Soy creyente», Ávila Camacho sanó las heridas de la Guerra Cristera. Reformó el Artículo 3° constitucional y logró la hazaña de reunir a todos los expresidentes vivos en el Zócalo capitalino.",
    image: "/src/assets/images/reconciliation_presidents_1942_1794284237904.jpg",
    imageAlt: "Reunión de expresidentes mexicanos en el balcón del Palacio Nacional en 1942",
    imageCaption: "15 de septiembre de 1942: Ávila Camacho congrega a los expresidentes Cárdenas, Calles, Portes Gil, Ortiz Rubio, Rodríguez y De la Huerta.",
    durationSec: 58,
    narrationText:
      "Poco antes de tomar posesión, un periodista le preguntó si era católico. Ávila Camacho respondió con naturalidad: «Soy creyente». Aquella frase relajó al clero y cerró las amargas disputas anticlericales. Modificó el Artículo Tercero constitucional para sustituir la polémica educación socialista por una educación democrática, laica y armónica. En septiembre de 1942, logró el milagro político de reunir en un mismo balcón a enemigos irreconciliables: Cárdenas y Calles, simbolizando que México marchaba unido frente a los peligros mundiales.",
    subtitles: [
      { id: "4-1", text: "«Soy creyente», declaró Ávila Camacho al ser cuestionado sobre su fe religiosa.", startSec: 0, durationSec: 10 },
      { id: "4-2", text: "Aquellas dos palabras desarmaron quince años de conflicto entre el Estado y la Iglesia Católica.", startSec: 10, durationSec: 11 },
      { id: "4-3", text: "Reformó el Artículo 3° para erradicar el concepto de 'educación socialista', fomentando la concordia.", startSec: 21, durationSec: 12 },
      { id: "4-4", text: "El 15 de septiembre de 1942 convocó al Balcón Central de Palacio Nacional a todos los expresidentes vivos.", startSec: 33, durationSec: 12 },
      { id: "4-5", text: "Ver juntos a rivales jurados como Calles y Cárdenas selló el pacto indestructible de la Unidad Nacional.", startSec: 45, durationSec: 13 },
    ],
    keyFacts: [
      { label: "Frase histórica", value: "«Soy creyente» (septiembre de 1940)" },
      { label: "Reforma constitucional", value: "Reforma al Artículo 3° (educación laica, nacional y democrática)" },
      { label: "Acto de Unidad", value: "Asamblea de Expresidentes (15 de septiembre de 1942)" },
      { label: "Asistentes ilustres", value: "Lázaro Cárdenas, Plutarco Elías Calles, Emilio Portes Gil, entre otros" },
    ],
    quote: {
      text: "La concordia espiritual de los mexicanos es la primera línea de defensa de nuestra soberanía.",
      author: "Manuel Ávila Camacho",
      context: "Mensaje ante el Congreso de la Unión, 1942"
    },
    historicalSignificance:
      "Estableció una pax cívica duradera. Los católicos y los sectores conservadores aceptaron la legitimidad del régimen revolucionario a cambio de respeto a sus libertades religiosas."
  },
  {
    id: 5,
    slug: "mexico-segunda-guerra-mundial",
    title: "México en la Segunda Guerra Mundial",
    period: "1942 – 1945",
    subtitle: "El ataque a los petroleros y el heroísmo del Escuadrón 201",
    summary:
      "Tras el torpedeo nazi de los buques petroleros Potrero del Llano y Faja de Oro en mayo de 1942, Ávila Camacho declaró el estado de guerra contra las potencias del Eje, enviando a combatir a las «Águilas Aztecas» del Escuadrón 201.",
    image: "/src/assets/images/escuadron_201_ww2_1794284237950.jpg",
    imageAlt: "Cazas P-47 Thunderbolt del Escuadrón 201 con la insignia tricolor mexicana volando en formación",
    imageCaption: "Aviones P-47D de la Fuerza Aérea Expedicionaria Mexicana (Escuadrón 201) sobrevolando el Océano Pacífico en 1945.",
    durationSec: 62,
    narrationText:
      "En mayo de 1942, submarinos alemanes hundieron los barcos petroleros mexicanos Potrero del Llano y Faja de Oro en el Golfo de México. Manuel Ávila Camacho envió una nota diplomática exigiendo explicaciones y desagravio. Al ser desairado por Adolf Hitler, el 28 de mayo de 1942 el presidente solicitó al Congreso la declaración de estado de guerra contra Alemania, Italia y Japón. México no solo defendió sus costas: preparó la Fuerza Aérea Expedicionaria Mexicana con el heroico Escuadrón 201, que combatió valerosamente en la liberación de Filipinas.",
    subtitles: [
      { id: "5-1", text: "En mayo de 1942, submarinos nazis torpedearon en el Golfo los buques petroleros Potrero del Llano y Faja de Oro.", startSec: 0, durationSec: 12 },
      { id: "5-2", text: "Ávila Camacho exigió una indemnización formal; la respuesta de Berlín fue el silencio y nuevos ataques.", startSec: 12, durationSec: 11 },
      { id: "5-3", text: "El 28 de mayo de 1942, el presidente acudió al Congreso para declarar a México en estado de guerra contra el Eje.", startSec: 23, durationSec: 12 },
      { id: "5-4", text: "Se creó el Servicio Militar Nacional obligatorio y se organizó la defensa civil en todo el territorio.", startSec: 35, durationSec: 11 },
      { id: "5-5", text: "En 1945, el célebre Escuadrón 201 «Águilas Aztecas» entró en combate directo en el frente del Pacífico en Luzón.", startSec: 46, durationSec: 16 },
    ],
    keyFacts: [
      { label: "Buques hundidos", value: "Potrero del Llano (13 de mayo) y Faja de Oro (20 de mayo de 1942)" },
      { label: "Declaración de guerra", value: "28 de mayo de 1942 (aprobada el 1 de junio)" },
      { label: "Fuerza expedicionaria", value: "Escuadrón 201 (FAEM) con cazas P-47 Thunderbolt" },
      { label: "Teatro de operaciones", value: "Isla de Luzón, Filipinas y Formosa (1945)" },
    ],
    quote: {
      text: "Un pueblo como el nuestro no puede tolerar que buques mercantes indefensos sean atacados vilmente sin que el honor nacional responda con altivez.",
      author: "Manuel Ávila Camacho",
      context: "Discurso ante el Congreso declarando el estado de guerra, 28 de mayo de 1942"
    },
    historicalSignificance:
      "Convirtió a México en actor beligerante del bando aliado, ganando prestigio internacional y un asiento fundador en la Organización de las Naciones Unidas (ONU)."
  },
  {
    id: 6,
    slug: "alianza-roosevelt-y-braceros",
    title: "La Cumbre con Roosevelt y el Programa Bracero",
    period: "1942 – 1944",
    subtitle: "La histórica visita de 1943 a Monterrey y el esfuerzo binacional",
    summary:
      "En abril de 1943, Franklin D. Roosevelt visitó Monterrey: fue la primera visita oficial de un presidente de EE.UU. a territorio mexicano. Ambos líderes consolidaron el Programa Bracero y suministros estratégicos para derrotar al fascismo.",
    image: "/src/assets/images/roosevelt_avila_camacho_1943_1794284257126.jpg",
    imageAlt: "Manuel Ávila Camacho y Franklin D. Roosevelt desfilando juntos en Monterrey en 1943",
    imageCaption: "Abril de 1943: Cumbre presidencial de Monterrey entre Manuel Ávila Camacho y Franklin D. Roosevelt.",
    durationSec: 56,
    narrationText:
      "La guerra transformó la relación histórica entre México y Estados Unidos. En abril de 1943, Franklin Delano Roosevelt llegó a Monterrey en la primera visita de un mandatario estadounidense a suelo mexicano. Ambos presidentes sellaron una alianza de respeto mutuo. A través del Programa Bracero, iniciado en 1942, más de trescientos mil trabajadores agrícolas y ferrocarrileros mexicanos viajaron a Estados Unidos para sostener los campos y el transporte, mientras los jóvenes norteamericanos combatían en Europa y el Pacífico.",
    subtitles: [
      { id: "6-1", text: "En abril de 1943, Franklin D. Roosevelt cruzó la frontera para reunirse con Ávila Camacho en Monterrey.", startSec: 0, durationSec: 11 },
      { id: "6-2", text: "Fue la primera vez en la historia que un mandatario en funciones de EE.UU. pisó territorio mexicano.", startSec: 11, durationSec: 11 },
      { id: "6-3", text: "La cumbre consolidó el Programa Bracero, firmado mediante convenio bilateral en agosto de 1942.", startSec: 22, durationSec: 11 },
      { id: "6-4", text: "Cientos de miles de campesinos mexicanos viajaron al norte para cosechar y operar ferrocarriles en guerra.", startSec: 33, durationSec: 11 },
      { id: "6-5", text: "México aportó también minerales, petróleo y fibras esenciales para la victoria de las democracias aliadas.", startSec: 44, durationSec: 12 },
    ],
    keyFacts: [
      { label: "Fecha de la Cumbre", value: "20 de abril de 1943 en Monterrey, Nuevo León" },
      { label: "Hito diplomático", value: "Primera visita de un presidente de EE.UU. a México" },
      { label: "Tratado Bracero", value: "Acuerdo bilateral de trabajadores agrícolas temporales (1942)" },
      { label: "Braceros movilizados", value: "Más de 300,000 en el primer lustro" },
    ],
    quote: {
      text: "La buena vecindad no se reduce a la cordialidad verbal; es la colaboración leal entre pueblos soberanos y libres.",
      author: "Manuel Ávila Camacho",
      context: "Brindis oficial ante el presidente Franklin D. Roosevelt en Monterrey, 1943"
    },
    historicalSignificance:
      "Liquidó las indemnizaciones petroleras pendientes con EE.UU. y abrió un periodo de cooperación económica sin precedentes entre ambas naciones."
  },
  {
    id: 7,
    slug: "imss-y-alfabetizacion-nacional",
    title: "La Creación del IMSS y la Gran Alfabetización",
    period: "1943 – 1944",
    subtitle: "Justicia social, salud pública y la cruzada contra el analfabetismo",
    summary:
      "El 19 de enero de 1943 nació el Instituto Mexicano del Seguro Social (IMSS). Simultáneamente, con el ilustre Jaime Torres Bodet en Educación, emprendió una épica campaña nacional donde cada mexicano que sabía leer debía enseñar a otro.",
    image: "/src/assets/images/imss_foundation_1943_1794284241126.jpg",
    imageAlt: "Afiliación de familias trabajadoras al Instituto Mexicano del Seguro Social en 1943",
    imageCaption: "Primeras jornadas de atención médica y afiliación del Seguro Social para la clase trabajadora en 1943.",
    durationSec: 58,
    narrationText:
      "En el ámbito interno, el sexenio de Ávila Camacho legó instituciones fundamentales para el bienestar del pueblo mexicano. El 19 de enero de 1943 promulgó la Ley del Seguro Social, creando el IMSS para salvaguardar la salud y pensiones de los obreros. En la educación pública, designó al brillante intelectual Jaime Torres Bodet, quien lanzó la Campaña Nacional contra el Analfabetismo bajo el lema «Saber para Vivir». Millones de cartillas fueron distribuidas en pueblos y rancherías, enseñando a leer a más de setecientos mil mexicanos.",
    subtitles: [
      { id: "7-1", text: "El 19 de enero de 1943 se promulgó la histórica Ley del Seguro Social que dio nacimiento al IMSS.", startSec: 0, durationSec: 11 },
      { id: "7-2", text: "Por vez primera, la clase trabajadora contó con médicos, hospitales, maternidad y pensiones garantizadas.", startSec: 11, durationSec: 12 },
      { id: "7-3", text: "En educación, el poeta y diplomático Jaime Torres Bodet encabezó una cruzada civil sin precedentes.", startSec: 23, durationSec: 11 },
      { id: "7-4", text: "La Campaña Nacional contra el Analfabetismo de 1944 obligó cívicamente: cada letrado debía enseñar a otro.", startSec: 34, durationSec: 12 },
      { id: "7-5", text: "Se crearon también el Sindicato Nacional de Trabajadores de la Educación (SNTE) y El Colegio Nacional.", startSec: 46, durationSec: 12 },
    ],
    keyFacts: [
      { label: "Fundación del IMSS", value: "19 de enero de 1943 (primer director: Vicente Santos Guajardo)" },
      { label: "Campaña de Alfabetización", value: "Agosto de 1944, encabezada por Jaime Torres Bodet" },
      { label: "Impacto educativo", value: "Más de 700,000 adultos alfabetizados en dos años" },
      { label: "Creación cultural", value: "Fundación de El Colegio Nacional y el Instituto Nacional de Cardiología" },
    ],
    quote: {
      text: "El Seguro Social no es un privilegio caritativo, es el derecho sagrado del obrero a la salud y a un porvenir sin angustias.",
      author: "Manuel Ávila Camacho",
      context: "Promulgación de la Ley del Seguro Social, 1943"
    },
    historicalSignificance:
      "Sentó la columna vertebral del Estado de bienestar mexicano del siglo XX, protegiendo a los obreros durante la rápida industrialización del país."
  },
  {
    id: 8,
    slug: "fin-militares-y-legado",
    title: "El Fin de los Militares y el Legado",
    period: "1946 – 1955",
    subtitle: "El nacimiento del PRI civil y el retiro sereno a La Herradura",
    summary:
      "En 1946 transformó el PRM en el Partido Revolucionario Institucional (PRI), eliminando el sector militar. Entregó la presidencia al primer civil universitario, Miguel Alemán Valdés, cerrando la era de las espadas revolucionarias.",
    image: "/src/assets/images/bracero_program_station_1794284239990.jpg",
    imageAlt: "Época del Milagro Mexicano y modernización de infraestructuras en los años 40",
    imageCaption: "Modernización de comunicaciones y ferrocarriles que catalizó el inicio del Milagro Económico Mexicano.",
    durationSec: 54,
    narrationText:
      "Al concluir su mandato en 1946, Manuel Ávila Camacho dio el paso más trascendental para la vida civil de México: transformó el partido oficial en el PRI y eliminó formalmente el sector militar de sus estatutos. Apoyó la candidatura de Miguel Alemán Valdés, el primer civil graduado universitario en alcanzar la presidencia. Ávila Camacho se retiró con dignidad a su rancho «La Herradura» en Huixquilucan, donde falleció el 13 de octubre de 1955, recordado por siempre como el mandatario que cambió las balas por las instituciones.",
    subtitles: [
      { id: "8-1", text: "En enero de 1946, el Partido de la Revolución Mexicana se transformó en el PRI.", startSec: 0, durationSec: 10 },
      { id: "8-2", text: "Ávila Camacho suprimió definitivamente el sector militar dentro de la estructura partidaria.", startSec: 10, durationSec: 11 },
      { id: "8-3", text: "Entregó el poder a Miguel Alemán Valdés: el primer presidente civil egresado de las aulas universitarias.", startSec: 21, durationSec: 11 },
      { id: "8-4", text: "Se retiró por completo de la vida pública a su rancho 'La Herradura' en el Estado de México.", startSec: 32, durationSec: 11 },
      { id: "8-5", text: "Falleció el 13 de octubre de 1955, dejando tras de sí un país pacificado, industrializado e institucional.", startSec: 43, durationSec: 11 },
    ],
    keyFacts: [
      { label: "Fundación del PRI", value: "18 de enero de 1946 (disolución del PRM)" },
      { label: "Sucesión civil", value: "Entrega del mando a Miguel Alemán Valdés el 1 de diciembre de 1946" },
      { label: "Fallecimiento", value: "13 de octubre de 1955 (a los 58 años en Huixquilucan, Edomex)" },
      { label: "Sepulcro", value: "Panteón Francés de San Joaquín, Ciudad de México" },
    ],
    quote: {
      text: "La mayor victoria de la Revolución consistirá en que los generales seamos los últimos en gobernar, para que las leyes gobiernen a todos.",
      author: "Manuel Ávila Camacho",
      context: "Discurso de despedida ante las Fuerzas Armadas, noviembre de 1946"
    },
    historicalSignificance:
      "Marcó la desmilitarización definitiva de la presidencia de México, garantizando 80 años de alternancia civil y estabilidad constitucional ininterrumpida."
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const BIOGRAPHY_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Por qué sobrenombre histórico es recordado popularmente Manuel Ávila Camacho?",
    options: [
      "El Caudillo del Sur",
      "El Presidente Caballero",
      "El Manco de Celaya",
      "El Centauro del Norte"
    ],
    correctIndex: 1,
    explanation: "Se le apodó «El Presidente Caballero» por su trato cortés, su espíritu moderado y su inclinación permanente al diálogo y la conciliación en vez de la confrontación bélica."
  },
  {
    id: 2,
    question: "¿Qué hecho detonó que México declarara el estado de guerra contra las potencias del Eje en mayo de 1942?",
    options: [
      "La invasión de Polonia",
      "El ataque a Pearl Harbor",
      "El hundimiento de los buques petroleros Potrero del Llano y Faja de Oro",
      "La firma del pacto Tripartito"
    ],
    correctIndex: 2,
    explanation: "Submarinos alemanes torpedearon y hundieron los buques petroleros mercantes mexicanos Potrero del Llano y Faja de Oro en el Golfo de México, lo que llevó a Ávila Camacho a declarar la guerra el 28 de mayo de 1942."
  },
  {
    id: 3,
    question: "¿Qué célebre unidad militar aérea mexicana combatió en el frente del Pacífico en la Segunda Guerra Mundial?",
    options: [
      "Los Dragones de Puebla",
      "El Escuadrón 201 (Águilas Aztecas)",
      "El Regimiento Galeana",
      "Los Batallones Rojos"
    ],
    correctIndex: 1,
    explanation: "El Escuadrón 201, conocido como las «Águilas Aztecas», formó parte de la Fuerza Aérea Expedicionaria Mexicana y combatió con aviones P-47 Thunderbolt en la liberación de Luzón, Filipinas en 1945."
  },
  {
    id: 4,
    question: "¿Cuál trascendental institución de seguridad social y salud pública fue fundada por Ávila Camacho el 19 de enero de 1943?",
    options: [
      "El ISSSTE",
      "El Instituto Mexicano del Seguro Social (IMSS)",
      "La Cruz Roja Mexicana",
      "El DIF Nacional"
    ],
    correctIndex: 1,
    explanation: "El 19 de enero de 1943 promulgó la Ley del Seguro Social, creando el IMSS para brindar atención médica, pensiones y seguridad social integral a los trabajadores mexicanos."
  },
  {
    id: 5,
    question: "¿Qué frase pronunciada por Ávila Camacho antes de asumir la presidencia apaciguó las tensiones religiosas del país?",
    options: [
      "«La religión es el opio del pueblo»",
      "«Soy creyente»",
      "«Ninguna Iglesia sobre el Estado»",
      "«Viva Cristo Rey»"
    ],
    correctIndex: 1,
    explanation: "Al declarar con serenidad «Soy creyente» en 1940, Ávila Camacho cerró una era de persecuciones y desconfianza entre el Estado y los católicos, pacificando las secuelas de la Guerra Cristera."
  },
  {
    id: 6,
    question: "¿Qué mandatario estadounidense protagonizó junto a Ávila Camacho la primera reunión de presidentes en suelo mexicano en Monterrey (1943)?",
    options: [
      "Harry S. Truman",
      "Dwight D. Eisenhower",
      "Franklin D. Roosevelt",
      "Herbert Hoover"
    ],
    correctIndex: 2,
    explanation: "Franklin Delano Roosevelt visitó Monterrey el 20 de abril de 1943, siendo la primera visita de un presidente de EE.UU. a territorio mexicano, donde acordaron el Programa Bracero y la cooperación bélica."
  }
];

export interface HistoricDocument {
  id: string;
  title: string;
  date: string;
  type: string;
  excerpt: string;
  fullText: string;
  context: string;
}

export const HISTORIC_DOCUMENTS: HistoricDocument[] = [
  {
    id: "declaracion-guerra-1942",
    title: "Declaración de Estado de Guerra ante el Congreso de la Unión",
    date: "28 de mayo de 1942",
    type: "Discurso Solemne / Mensaje Presidencial",
    excerpt: "Venimos a cumplir un deber ineludible. Submarinos del Eje han torpedeado buques mercantes indefensos que navegaban en aguas libres...",
    context: "Pronunciado en el recinto de la Cámara de Diputados en Donceles, tras el torpedeo nazi a los buques 'Potrero del Llano' y 'Faja de Oro'.",
    fullText: `Señores Diputados y Senadores:

Venimos a cumplir con el mandato más doloroso y solemne que puede afrontar un Jefe de Estado. La soberanía de nuestra patria ha sido ultrajada y la vida de trabajadores pacíficos arrebatada a traición en aguas libres del Golfo de México por proyectiles submarinos de las potencias totalitarias del Eje.

Nuestra diplomacia agotó todos los conductos civilizados. Exigimos formalmente el desagravio y la indemnización debida; la contestación del Reich y sus aliados fue la arrogancia, el desdén y un segundo ataque contra el buque nacional 'Faja de Oro'.

Ante este agravio, la nación mexicana no puede permanecer indiferente ni cobarde. No somos un pueblo conquistador ni animado por ambiciones hegemónicas; amamos la paz y la concordia, pero cuando la dignidad de la patria es conculcada, la respuesta debe ser firme, unida e inflexible.

Por tanto, vengo a pedir de vuestra soberanía la declaración de que, a partir del veintidós de mayo de mil novecientos cuarenta y dos, existe un estado de guerra entre los Estados Unidos Mexicanos y los gobiernos de Alemania, Italia y Japón.`
  },
  {
    id: "decreto-imss-1943",
    title: "Decreto de Promulgación de la Ley del Seguro Social (Creación del IMSS)",
    date: "19 de enero de 1943",
    type: "Decreto Presidencial",
    excerpt: "Se establece el Seguro Social obligatorio que cubrirá los accidentes de trabajo, las enfermedades no profesionales, la maternidad, la invalidez y la vejez...",
    context: "Publicado en el Diario Oficial de la Federación, consagrando las garantías del Artículo 123 constitucional en una institución permanente.",
    fullText: `MANUEL ÁVILA CAMACHO, Presidente Constitucional de los Estados Unidos Mexicanos, a sus habitantes, sabed:

Que el H. Congreso de la Unión se ha servido dirigirme el siguiente Decreto:

Artículo 1°.- El Seguro Social es un servicio público de carácter nacional, obligatorio en los términos de esta ley y de sus reglamentos.

Artículo 2°.- La seguridad social tiene por finalidad garantizar el derecho humano a la salud, la asistencia médica, la protección de los medios de subsistencia y los servicios sociales necesarios para el bienestar individual y colectivo.

Artículo 3°.- Se crea el Instituto Mexicano del Seguro Social, organismo descentralizado con personalidad jurídica y patrimonio propio, encargado de organizar y administrar las ramas del Seguro de Accidentes de Trabajo y Enfermedades Profesionales, Enfermedades no Profesionales y Maternidad, Invalidez, Vejez y Muerte.`
  },
  {
    id: "discurso-roosevelt-1943",
    title: "Discurso en el Banquete de Honor con Franklin D. Roosevelt",
    date: "20 de abril de 1943",
    type: "Discurso Diplomático Bilateral",
    excerpt: "Vuestra presencia en Monterrey confirma que la política de Buena Vecindad ha dejado de ser una fórmula retórica para transformarse en una realidad viva...",
    context: "Primera reunión en suelo mexicano entre presidentes en funciones de México y Estados Unidos, marcando el compromiso con el Programa Bracero y la derrota del Eje.",
    fullText: `Señor Presidente Franklin D. Roosevelt:

Es para el pueblo mexicano y para mí un motivo de profunda complacencia daros la más cordial bienvenida a esta noble ciudad de Monterrey.

Vuestra presencia en nuestro suelo tiene un significado que rebasa las ceremonias protocolarias. Es la ratificación de que la política de buena vecindad inaugurada por vuestro gobierno ha encontrado en el corazón y en la convicción de México una correspondencia sincera y fecunda.

Nuestras dos naciones han conocido en el pasado incomprensiones y desacuerdos. Mas hoy, ante la amenaza que gravita sobre las libertades esenciales del hombre, nos encontramos estrechamente unidos en la defensa de la justicia, del derecho internacional y del porvenir de las democracias de este hemisferio.

Los millares de trabajadores mexicanos que hoy colaboran en vuestros campos y talleres dan testimonio de nuestro esfuerzo compartido por la victoria común.`
  }
];
