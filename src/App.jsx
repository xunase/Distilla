import { useState } from "react";

const COLORS = {
  bg: "#0f0e17",
  card: "#1a1928",
  cardBorder: "#2a2840",
  italiano: "#e8a87c",
  storia: "#7ec8e3",
  scienze: "#a8d8a8",
  tecnica: "#c9a7e8",
  geografia: "#f7c948",
  accent: "#f5c518",
  text: "#fffffe",
  muted: "#a7a9be",
};

const MATERIE = {
  Italiano: { color: COLORS.italiano, emoji: "📖" },
  Storia: { color: COLORS.storia, emoji: "🏛️" },
  Scienze: { color: COLORS.scienze, emoji: "🔬" },
  Tecnica: { color: COLORS.tecnica, emoji: "⚙️" },
  Geografia: { color: COLORS.geografia, emoji: "🌍" },
};

const RIASSUNTI_INIZIALI = [
  {
    id: 1,
    materia: "Italiano",
    titolo: "La Divina Commedia – Inferno",
    testo: "La Divina Commedia è il capolavoro di Dante Alighieri, scritto tra il 1306 e il 1321. L'Inferno è la prima delle tre cantiche e narra il viaggio di Dante attraverso i nove cerchi dell'Inferno, guidato dal poeta latino Virgilio. Ogni cerchio ospita i dannati in base al tipo di peccato commesso, secondo il principio del contrappasso: la pena rispecchia il peccato. Il viaggio inizia nella 'selva oscura' e si conclude al centro della terra, dove è imprigionato Lucifero.",
  },
  {
    id: 2,
    materia: "Italiano",
    titolo: "I Promessi Sposi – Manzoni",
    testo: "I Promessi Sposi di Alessandro Manzoni è il romanzo storico più importante della letteratura italiana, pubblicato nella versione definitiva nel 1840. La storia è ambientata nella Lombardia del XVII secolo durante la dominazione spagnola. I protagonisti sono Renzo e Lucia, due giovani fidanzati che vogliono sposarsi ma vengono ostacolati dal nobile Don Rodrigo. Il romanzo affronta temi come la giustizia, la fede, la Provvidenza e la condizione del popolo sotto oppressori potenti.",
  },
  {
    id: 3,
    materia: "Italiano",
    titolo: "L'Orlando Furioso – Ariosto",
    testo: "L'Orlando Furioso è il capolavoro di Ludovico Ariosto, pubblicato nella versione definitiva nel 1532. È un poema epico-cavalleresco in ottave che continua il poema incompiuto di Boiardo, l'Orlando Innamorato. La trama principale segue la follia di Orlando, paladino di Carlo Magno, innamorato della pagana Angelica che però ama un altro. Il poema intreccia numerose storie parallele ambientate durante le guerre tra cristiani e saraceni. I temi principali sono l'amore, la guerra, la magia e la pazzia. Il tono è ironico e distaccato, lontano dalla serietà epica classica.",
  },
  {
    id: 4,
    materia: "Storia",
    titolo: "La Prima Guerra Mondiale",
    testo: "La Prima Guerra Mondiale (1914–1918) fu un conflitto globale che coinvolse le principali potenze europee. Scoppiò dopo l'assassinio dell'arciduca Francesco Ferdinando d'Austria a Sarajevo il 28 giugno 1914. Le cause profonde includevano il nazionalismo, l'imperialismo, la corsa agli armamenti e il sistema di alleanze. Si fronteggiarono la Triplice Intesa (Francia, Russia, Gran Bretagna) e gli Imperi Centrali (Germania, Austria-Ungheria). L'Italia entrò in guerra nel 1915 a fianco dell'Intesa. Il conflitto si concluse con l'armistizio dell'11 novembre 1918 e il Trattato di Versailles.",
  },
  {
    id: 5,
    materia: "Storia",
    titolo: "La Rivoluzione Francese",
    testo: "La Rivoluzione Francese (1789–1799) fu uno dei più importanti eventi della storia moderna. Scoppiò a causa di una grave crisi economica, della diseguaglianza sociale tra i tre stati (clero, nobiltà e terzo stato) e delle idee illuministe. Il 14 luglio 1789 la presa della Bastiglia segnò l'inizio della rivoluzione. Venne abolita la monarchia assoluta, proclamata la Repubblica e giustiziato il re Luigi XVI. La Rivoluzione si concluse con il colpo di stato di Napoleone Bonaparte nel 1799.",
  },
  {
    id: 6,
    materia: "Storia",
    titolo: "L'Antica Roma – Repubblica e Impero",
    testo: "Roma nacque come piccolo villaggio sul Tevere nell'VIII secolo a.C. Dopo la fase monarchica, nel 509 a.C. venne fondata la Repubblica, governata da due consoli eletti annualmente e dal Senato. Con le guerre puniche contro Cartagine (264–146 a.C.), Roma conquistò il dominio sul Mediterraneo. Le tensioni sociali e le guerre civili portarono alla fine della Repubblica: Giulio Cesare fu assassinato nel 44 a.C. e Ottaviano Augusto divenne il primo imperatore nel 27 a.C. L'Impero raggiunse la massima estensione nel II secolo d.C., per poi declinare fino alla caduta dell'Impero d'Occidente nel 476 d.C.",
  },
  {
    id: 7,
    materia: "Scienze",
    titolo: "La Cellula",
    testo: "La cellula è l'unità fondamentale della vita. Esistono due tipi principali: la cellula procariotica (senza nucleo definito, tipica dei batteri) e la cellula eucariotica (con nucleo ben definito, tipica di piante, animali e funghi). La cellula animale è delimitata dalla membrana plasmatica e contiene organuli come il nucleo (che contiene il DNA), i mitocondri (produzione di energia), il reticolo endoplasmatico e i ribosomi. La cellula vegetale ha in aggiunta la parete cellulare, i cloroplasti e i vacuoli.",
  },
  {
    id: 8,
    materia: "Scienze",
    titolo: "Il Sistema Solare",
    testo: "Il Sistema Solare è composto dal Sole e da tutti i corpi celesti che orbitano intorno ad esso. I pianeti, in ordine di distanza dal Sole, sono: Mercurio, Venere, Terra, Marte (pianeti rocciosi interni), Giove, Saturno, Urano e Nettuno (pianeti gassosi esterni). Tra Marte e Giove si trova la fascia degli asteroidi. La Terra è il terzo pianeta e l'unico noto ad ospitare la vita. Il Sole è una stella di tipo nana gialla e contiene il 99,8% della massa del Sistema Solare.",
  },
  {
    id: 9,
    materia: "Scienze",
    titolo: "La Fotosintesi Clorofilliana",
    testo: "La fotosintesi clorofilliana è il processo attraverso cui le piante producono energia chimica utilizzando la luce solare. Avviene nei cloroplasti, organuli che contengono la clorofilla, il pigmento verde che cattura la luce. La reazione complessiva trasforma acqua e anidride carbonica in glucosio e ossigeno. Si divide in due fasi: la fase luminosa (nei tilacoidi, richiede luce) e il ciclo di Calvin (nello stroma, non richiede luce direttamente). La fotosintesi è fondamentale per la vita sulla Terra perché produce ossigeno e costituisce la base della catena alimentare.",
  },
  {
    id: 10,
    materia: "Tecnica",
    titolo: "I Materiali: Metalli e Leghe",
    testo: "I metalli sono materiali caratterizzati da buona conduttività elettrica e termica, lucentezza e duttilità. I più utilizzati in tecnologia sono il ferro, l'alluminio, il rame e il titanio. Le leghe sono miscele di due o più metalli che combinano le proprietà dei componenti: l'acciaio, ad esempio, è una lega di ferro e carbonio più resistente del ferro puro. L'alluminio è leggero e resistente alla corrosione, per questo è usato in aeronautica e nell'industria alimentare. I metalli si ottengono dai minerali attraverso processi di estrazione e raffinazione come la fusione e l'elettrolisi.",
  },
  {
    id: 11,
    materia: "Tecnica",
    titolo: "Le Energie Rinnovabili",
    testo: "Le energie rinnovabili sono fonti energetiche naturali che si rigenerano continuamente e non si esauriscono, a differenza dei combustibili fossili. Le principali sono: l'energia solare (pannelli fotovoltaici o termici), l'energia eolica (turbine a vento), l'energia idroelettrica (movimento dell'acqua), la geotermia (calore interno della Terra) e le biomasse (materiale organico). Queste fonti producono poche o nessuna emissione di CO₂, contribuendo alla riduzione dell'effetto serra. Lo svantaggio principale è che alcune (solare, eolica) dipendono dalle condizioni atmosferiche e non garantiscono una produzione costante.",
  },
  {
    id: 12,
    materia: "Tecnica",
    titolo: "Internet e le Reti Informatiche",
    testo: "Internet è una rete globale di computer collegati tra loro che permette la comunicazione e lo scambio di informazioni. Funziona grazie al protocollo TCP/IP, che stabilisce le regole per la trasmissione dei dati. La struttura di Internet è basata su server (che forniscono servizi) e client (che li richiedono). Il World Wide Web (WWW) è uno dei servizi di Internet e permette di navigare tra pagine web tramite browser. Le reti locali (LAN) collegano computer in aree limitate (casa, scuola), mentre le reti geografiche (WAN) coprono distanze maggiori. La sicurezza informatica protegge i dati da accessi non autorizzati.",
  },
  {
    id: 13,
    materia: "Geografia",
    titolo: "I Climi della Terra",
    testo: "Il clima è l'insieme delle condizioni atmosferiche tipiche di una zona geografica nel lungo periodo. Si distingue dal tempo meteorologico, che indica le condizioni istantanee. Le principali fasce climatiche sono: la fascia equatoriale (calda e umida, con foreste pluviali), la fascia tropicale (stagioni secche e umide), la fascia temperata (quattro stagioni ben definite, tipica dell'Europa), la fascia polare (temperature molto basse, ghiacci perenni) e la fascia arida (deserti caldi e freddi). Il clima dipende da latitudine, altitudine, distanza dal mare e correnti oceaniche.",
  },
  {
    id: 14,
    materia: "Geografia",
    titolo: "L'Unione Europea",
    testo: "L'Unione Europea (UE) è un'organizzazione politica ed economica che riunisce 27 paesi europei. Nacque dal processo di integrazione avviato dopo la Seconda Guerra Mondiale per garantire pace e cooperazione. Il Trattato di Maastricht del 1992 la istituì ufficialmente. Le sue istituzioni principali sono: il Parlamento Europeo (eletto dai cittadini), il Consiglio dell'UE, la Commissione Europea e la Corte di Giustizia. La moneta comune, l'euro, è adottata da 20 paesi. L'UE garantisce la libera circolazione di persone, merci, servizi e capitali tra gli Stati membri.",
  },
];

export default function App() {
  const [view, setView] = useState("home");
  const [riassunti, setRiassunti] = useState(RIASSUNTI_INIZIALI);
  const [filtroMateria, setFiltroMateria] = useState("Tutte");
  const [ricerca, setRicerca] = useState("");
  const [selezionato, setSelezionato] = useState(null);
  const [genMateria, setGenMateria] = useState("Italiano");
  const [genArgomento, setGenArgomento] = useState("");
  const [genTesto, setGenTesto] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState("");

  const riassuntiFiltrati = riassunti.filter((r) => {
    const matchMateria = filtroMateria === "Tutte" || r.materia === filtroMateria;
    const matchRicerca =
      r.titolo.toLowerCase().includes(ricerca.toLowerCase()) ||
      r.materia.toLowerCase().includes(ricerca.toLowerCase());
    return matchMateria && matchRicerca;
  });

  const generaRiassunto = async () => {
    if (!genArgomento.trim()) return;
    setGenLoading(true);
    setGenError("");
    setGenTesto("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Scrivi un riassunto scolastico chiaro e completo in italiano sull'argomento: "${genArgomento}" per la materia ${genMateria}. Il riassunto deve essere adatto a uno studente delle scuole medie o superiori, lungo circa 150-200 parole, senza titolo, solo il testo del riassunto.`,
            },
          ],
        }),
      });
      const data = await response.json();
      const testo = data.content?.map((b) => b.text || "").join("") || "";
      setGenTesto(testo);
    } catch {
      setGenError("Errore nella generazione. Riprova.");
    }
    setGenLoading(false);
  };

  const salvaGenerato = () => {
    if (!genTesto || !genArgomento) return;
    const nuovo = {
      id: Date.now(),
      materia: genMateria,
      titolo: genArgomento,
      testo: genTesto,
    };
    setRiassunti([nuovo, ...riassunti]);
    setGenArgomento("");
    setGenTesto("");
    setView("home");
  };

  const styles = {
    app: {
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
      paddingBottom: 80,
    },
    header: {
      padding: "28px 20px 16px",
      borderBottom: `1px solid ${COLORS.cardBorder}`,
    },
    logo: {
      fontSize: 22,
      fontWeight: "bold",
      letterSpacing: 1,
      color: COLORS.accent,
      fontFamily: "'Georgia', serif",
    },
    sub: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
    nav: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: "#13121f",
      borderTop: `1px solid ${COLORS.cardBorder}`,
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0 14px",
      zIndex: 100,
    },
    navBtn: (active) => ({
      background: "none",
      border: "none",
      color: active ? COLORS.accent : COLORS.muted,
      fontSize: 11,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      fontFamily: "inherit",
      transition: "color 0.2s",
    }),
    navIcon: { fontSize: 22 },
    section: { padding: "20px 16px" },
    searchBar: {
      width: "100%",
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 12,
      padding: "10px 14px",
      color: COLORS.text,
      fontSize: 14,
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box",
      marginBottom: 14,
    },
    filtri: { display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" },
    filtroBtn: (active, materia) => ({
      padding: "5px 14px",
      borderRadius: 20,
      border: `1.5px solid ${active ? (MATERIE[materia]?.color || COLORS.accent) : COLORS.cardBorder}`,
      background: active ? (MATERIE[materia]?.color || COLORS.accent) + "22" : "transparent",
      color: active ? (MATERIE[materia]?.color || COLORS.accent) : COLORS.muted,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all 0.2s",
    }),
    card: {
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 14,
      padding: "16px",
      marginBottom: 12,
      cursor: "pointer",
      transition: "transform 0.15s, border-color 0.15s",
    },
    cardMateria: (m) => ({
      fontSize: 11,
      fontWeight: "bold",
      letterSpacing: 1,
      color: MATERIE[m]?.color || COLORS.muted,
      textTransform: "uppercase",
      marginBottom: 5,
    }),
    cardTitolo: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
    cardAnteprima: { fontSize: 13, color: COLORS.muted, lineHeight: 1.5 },
    detail: { padding: "20px 16px" },
    detailBack: {
      background: "none",
      border: "none",
      color: COLORS.accent,
      fontSize: 14,
      cursor: "pointer",
      padding: 0,
      marginBottom: 20,
      fontFamily: "inherit",
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    detailMateria: (m) => ({
      fontSize: 12,
      color: MATERIE[m]?.color || COLORS.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
    }),
    detailTitolo: { fontSize: 22, fontWeight: "bold", marginBottom: 16, lineHeight: 1.3 },
    detailTesto: { fontSize: 15, lineHeight: 1.8, color: "#ddd" },
    genSection: { padding: "20px 16px" },
    label: { fontSize: 12, color: COLORS.muted, marginBottom: 6, display: "block", letterSpacing: 0.5 },
    select: {
      width: "100%",
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 10,
      padding: "10px 12px",
      color: COLORS.text,
      fontSize: 14,
      fontFamily: "inherit",
      outline: "none",
      marginBottom: 14,
      boxSizing: "border-box",
    },
    input: {
      width: "100%",
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 10,
      padding: "10px 12px",
      color: COLORS.text,
      fontSize: 14,
      fontFamily: "inherit",
      outline: "none",
      marginBottom: 14,
      boxSizing: "border-box",
    },
    btn: (disabled) => ({
      width: "100%",
      background: disabled ? "#333" : COLORS.accent,
      color: disabled ? COLORS.muted : "#0f0e17",
      border: "none",
      borderRadius: 10,
      padding: "12px",
      fontSize: 15,
      fontWeight: "bold",
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "inherit",
      marginBottom: 16,
      transition: "background 0.2s",
    }),
    genResult: {
      background: COLORS.card,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 12,
      padding: 16,
      fontSize: 14,
      lineHeight: 1.8,
      color: "#ddd",
      marginBottom: 14,
    },
    saveBtn: {
      width: "100%",
      background: COLORS.scienze,
      color: "#0f0e17",
      border: "none",
      borderRadius: 10,
      padding: "12px",
      fontSize: 15,
      fontWeight: "bold",
      cursor: "pointer",
      fontFamily: "inherit",
    },
    empty: { textAlign: "center", color: COLORS.muted, padding: "40px 0", fontSize: 14 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16, color: COLORS.text },
    badge: {
      display: "inline-block",
      background: COLORS.cardBorder,
      borderRadius: 10,
      padding: "2px 8px",
      fontSize: 11,
      color: COLORS.muted,
      marginLeft: 8,
    },
  };

  if (view === "detail" && selezionato) {
    const r = selezionato;
    return (
      <div style={styles.app}>
        <div style={styles.detail}>
          <button style={styles.detailBack} onClick={() => setView("home")}>
            ← Indietro
          </button>
          <div style={styles.detailMateria(r.materia)}>
            {MATERIE[r.materia]?.emoji} {r.materia}
          </div>
          <div style={styles.detailTitolo}>{r.titolo}</div>
          <div style={styles.detailTesto}>{r.testo}</div>
        </div>
      </div>
    );
  }

  const tutteLeMaterie = ["Tutte", ...Object.keys(MATERIE)];

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.logo}>⚗️ Distilla</div>
        <div style={styles.sub}>L'essenziale di ogni argomento</div>
      </div>

      {view === "home" && (
        <div style={styles.section}>
          <input
            style={styles.searchBar}
            placeholder="🔍 Cerca per titolo o materia…"
            value={ricerca}
            onChange={(e) => setRicerca(e.target.value)}
          />
          <div style={styles.filtri}>
            {tutteLeMaterie.map((m) => (
              <button
                key={m}
                style={styles.filtroBtn(filtroMateria === m, m)}
                onClick={() => setFiltroMateria(m)}
              >
                {m === "Tutte" ? "📚" : MATERIE[m]?.emoji} {m}
              </button>
            ))}
          </div>
          {riassuntiFiltrati.length === 0 ? (
            <div style={styles.empty}>Nessun riassunto trovato.</div>
          ) : (
            riassuntiFiltrati.map((r) => (
              <div
                key={r.id}
                style={styles.card}
                onClick={() => { setSelezionato(r); setView("detail"); }}
              >
                <div style={styles.cardMateria(r.materia)}>
                  {MATERIE[r.materia]?.emoji} {r.materia}
                </div>
                <div style={styles.cardTitolo}>{r.titolo}</div>
                <div style={styles.cardAnteprima}>
                  {r.testo.slice(0, 90)}…
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {view === "genera" && (
        <div style={styles.genSection}>
          <div style={styles.sectionTitle}>🤖 Genera con AI</div>
          <label style={styles.label}>MATERIA</label>
          <select
            style={styles.select}
            value={genMateria}
            onChange={(e) => setGenMateria(e.target.value)}
          >
            {Object.keys(MATERIE).map((m) => (
              <option key={m} value={m}>{MATERIE[m].emoji} {m}</option>
            ))}
          </select>
          <label style={styles.label}>ARGOMENTO</label>
          <input
            style={styles.input}
            placeholder="es. La fotosintesi clorofilliana"
            value={genArgomento}
            onChange={(e) => setGenArgomento(e.target.value)}
          />
          <button
            style={styles.btn(genLoading || !genArgomento.trim())}
            onClick={generaRiassunto}
            disabled={genLoading || !genArgomento.trim()}
          >
            {genLoading ? "⏳ Generando…" : "✨ Genera Riassunto"}
          </button>
          {genError && <div style={{ color: "#e07070", fontSize: 13, marginBottom: 10 }}>{genError}</div>}
          {genTesto && (
            <>
              <div style={styles.genResult}>{genTesto}</div>
              <button style={styles.saveBtn} onClick={salvaGenerato}>
                💾 Salva nei miei riassunti
              </button>
            </>
          )}
        </div>
      )}

      <div style={styles.nav}>
        {[
          { id: "home", icon: "📚", label: "Riassunti" },
          { id: "genera", icon: "🤖", label: "Genera AI" },
        ].map((n) => (
          <button key={n.id} style={styles.navBtn(view === n.id)} onClick={() => setView(n.id)}>
            <span style={styles.navIcon}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}
