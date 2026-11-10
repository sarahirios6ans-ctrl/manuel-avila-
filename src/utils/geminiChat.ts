import { GoogleGenAI } from '@google/genai';

const HISTORICAL_SYSTEM_PROMPT = `Eres un historiador especialista en la historia de México del siglo XX y la biografía del General Manuel Ávila Camacho (Presidente de México de 1940 a 1946).
Responde con tono culto, riguroso, pedagógico, imparcial y elegante en español.
Conoces a detalle:
- Sus orígenes en Teziutlán, Puebla, y su familia (sus hermanos Maximino Ávila Camacho y Rafael).
- Su trayectoria en la caballería constitucionalista y con Lázaro Cárdenas como Secretario de la Defensa Nacional.
- La reñida elección de 1940 contra Juan Andreu Almazán y la reconciliación de la Unidad Nacional.
- Su famosa declaración «Soy creyente» y la reforma al Artículo 3° Constitucional.
- La Segunda Guerra Mundial: hundimiento del Potrero del Llano y Faja de Oro, declaración de estado de guerra en 1942, y el despliegue del Escuadrón 201 en Filipinas.
- La cumbre de 1943 en Monterrey con Franklin D. Roosevelt y el Programa Bracero.
- La fundación del IMSS (1943), la campaña de alfabetización con Jaime Torres Bodet, el SNTE, y el inicio del Modelo de Sustitución de Importaciones (Milagro Mexicano).
- La transformación del PRM en PRI en 1946, el retiro de los militares y la entrega a Miguel Alemán Valdés.

Estructura tus respuestas con claridad, subtítulos sobrios o puntos clave cuando sea conveniente, sin adornos vacíos.`;

export async function askHistoricalExpert(userQuestion: string): Promise<string> {
  // Check if API key is in environment
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
                 (import.meta as unknown as { env: { VITE_GEMINI_API_KEY?: string } }).env?.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userQuestion,
        config: {
          systemInstruction: HISTORICAL_SYSTEM_PROMPT,
          temperature: 0.6,
        }
      });
      if (response.text) {
        return response.text;
      }
    } catch {
      // Fallback to local curated knowledge base
    }
  }

  // Curated historical knowledge fallback for common historical inquiries
  const q = userQuestion.toLowerCase();

  if (q.includes('escuadron 201') || q.includes('escuadrón 201') || q.includes('filipinas') || q.includes('águilas aztecas')) {
    return `El **Escuadrón 201**, conocido como las *Águilas Aztecas*, fue la unidad aérea de combate de la Fuerza Aérea Expedicionaria Mexicana (FAEM) enviada por Manuel Ávila Camacho para combatir en el frente del Pacífico durante la Segunda Guerra Mundial.

• **Composición**: Integrado por cerca de 300 hombres (pilotos, mecánicos, personal de armamento y médicos) al mando del coronel Antonio Cárdenas Rodríguez y el capitán Radamés Gaxiola Andrade.
• **Aeronaves**: Cazas de combate Republic P-47D Thunderbolt suministrados por EE.UU.
• **Operaciones**: Realizó 59 misiones de combate en la liberación de la isla de Luzón (Filipinas) y bombardeos tácticos en Formosa (actual Taiwán) en 1945.
• **Trascendencia**: Murieron 5 pilotos en cumplimiento del deber. Su participación otorgó a México el estatus de nación combatiente aliada y un sitio honorífico en la fundación de la ONU.`;
  }

  if (q.includes('imss') || q.includes('seguro social') || q.includes('salud')) {
    return `La creación del **Instituto Mexicano del Seguro Social (IMSS)** el 19 de enero de 1943 fue una de las obras cumbres del gobierno de Ávila Camacho.

• **Objetivo**: Hacer realidad la garantía de seguridad social consagrada en el Artículo 123 de la Constitución de 1917, brindando tranquilidad a las familias asalariadas.
• **Cobertura**: Accidentes de trabajo, enfermedades profesionales y generales, maternidad, invalidez, vejez y fallecimiento.
• **Modelo tripartita**: Financiado por aportaciones del Estado, los patrones y los propios trabajadores.
• **Primer director**: Lic. Vicente Santos Guajardo. El IMSS se convirtió en la columna vertebral de la salud pública y la cohesión social en el México moderno.`;
  }

  if (q.includes('soy creyente') || q.includes('religion') || q.includes('iglesia') || q.includes('catol')) {
    return `La célebre frase **«Soy creyente»** fue pronunciada por Manuel Ávila Camacho en septiembre de 1940 durante una entrevista de prensa previa a asumir la presidencia.

• **Contexto**: México venía de un profundo trauma civil por la Guerra Cristera (1926–1929) y la radical política laicista y socialista de los años 30, que mantenía al país crispado y polarizado.
• **Impacto**: Ávila Camacho se convirtió en el primer presidente posrevolucionario en admitir públicamente su fe católica. La jerarquía eclesiástica y los feligreses lo recibieron con alivio.
• **Reforma constitucional**: Modificó el Artículo 3° Constitucional, eliminando la redacción que obligaba a una «educación socialista» y estableciendo una educación democrática, nacional y basada en los progresos científicos.`;
  }

  if (q.includes('bracero') || q.includes('roosevelt') || q.includes('monterrey') || q.includes('estados unidos')) {
    return `La diplomacia de Ávila Camacho forjó una alianza estratégica histórica con Estados Unidos y el presidente Franklin D. Roosevelt:

• **La Cumbre de Monterrey (abril de 1943)**: Fue la primera ocasión en que un presidente de EE.UU. visitó formalmente territorio mexicano. Ambos líderes recorrieron la ciudad y consolidaron la cooperación panamericana.
• **El Programa Bracero (agosto de 1942)**: Convenio binacional que permitió la migración regulada de más de 300,000 trabajadores agrícolas y ferrocarrileros mexicanos para suplir la mano de obra estadounidense durante la guerra.
• **Compensación y comercio**: Se resolvieron amistosamente las indemnizaciones por la expropiación petrolera de 1938 y México exportó minerales y petróleo cruciales para el arsenal aliado.`;
  }

  if (q.includes('maximino') || q.includes('hermano') || q.includes('familia')) {
    return `La relación con su hermano mayor, **Maximino Ávila Camacho**, fue una de las dinámicas familiares y políticas más intensas de su sexenio:

• **Maximino Ávila Camacho**: Gobernador de Puebla (1937–1941) y Secretario de Comunicaciones y Obras Públicas. Hombre enérgico, colérico y de métodos autoritarios, representaba el ala más dura y caciquil de la política.
• **Contraste con Manuel**: Manuel era reflexivo, prudente, educado y conciliador, lo que le valió el mote de «El Presidente Caballero».
• **Tensión sucesoria**: Maximino aspiraba abiertamente a suceder a Manuel en la presidencia en 1946; sin embargo, su repentina muerte en febrero de 1945 despejó el camino para que Manuel promoviera al civil Miguel Alemán Valdés.`;
  }

  return `Manuel Ávila Camacho (1897-1955) fue una figura bisagra de la historia mexicana. Su gestión (1940-1946) se caracterizó por:

1. **Unidad Nacional**: Reconciliación entre católicos y revolucionarios, empresarios y obreros, reuniendo en un histórico balcón a expresidentes antagónicos como Calles y Cárdenas.
2. **Segunda Guerra Mundial**: Beligerancia formal tras el ataque a los petroleros Potrero del Llano y Faja de Oro, y despliegue del Escuadrón 201 en el Pacífico.
3. **Paz Civil e Instituciones**: Creación del IMSS, Campaña Nacional contra el Analfabetismo con Jaime Torres Bodet, y transición del PRM al PRI sin sector militar, posibilitando la era de los presidentes civiles.`;
}
