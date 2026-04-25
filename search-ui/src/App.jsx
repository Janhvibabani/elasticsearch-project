import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  const [pgData, setPgData] = useState(null);
  const [esData, setEsData] = useState(null);

  const [pgTime, setPgTime] = useState(null);
  const [esTime, setEsTime] = useState(null);

  const [pgLoading, setPgLoading] = useState(false);
  const [esLoading, setEsLoading] = useState(false);

  const search = () => {
    setPgData(null);
    setEsData(null);
    setPgTime(null);
    setEsTime(null);

    setPgLoading(true);
    setEsLoading(true);

    const startPg = Date.now();
    const startEs = Date.now();

    // PostgreSQL request
    fetch(`https://elasticsearch-app-s11z.onrender.com/search/postgres?q=${query}`)
      .then(res => res.json())
      .then(data => {
        setPgData(data);
        setPgTime(Date.now() - startPg);
        setPgLoading(false);
      });

    // Elasticsearch request
    fetch(`https://elasticsearch-app-s11z.onrender.com/search/es?q=${query}`)
      .then(res => res.json())
      .then(data => {
        setEsData(data);
        setEsTime(Date.now() - startEs);
        setEsLoading(false);
      });
  };

  const winner =
    pgTime && esTime
      ? pgTime < esTime
        ? "postgres"
        : "elastic"
      : null;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Database Search Comparison</h1>

      <div style={styles.searchBar}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          style={styles.input}
        />
        <button onClick={search} style={styles.button}>
          Search
        </button>
      </div>

      <div style={styles.columns}>
        
        {/* PostgreSQL */}
        <div style={styles.card}>
          <h3>
            PostgreSQL {winner === "postgres" && "⚡"}
          </h3>

          {pgLoading && <p>Searching...</p>}
          {pgTime && <p>{pgTime} ms</p>}

          {pgData &&
            pgData.slice(0, 5).map((m, i) => (
              <div key={i} style={styles.item}>
                <strong>{m.title}</strong>
                <p>{m.overview}</p>
              </div>
            ))}
        </div>

        {/* Elasticsearch */}
        <div style={styles.card}>
          <h3>
            Elasticsearch {winner === "elastic"}
          </h3>

          {esLoading && <p>Searching...</p>}
          {esTime && <p>{esTime} ms</p>}

          {esData &&
            esData.slice(0, 5).map((m, i) => (
              <div key={i} style={styles.item}>
                <strong>{m.title}</strong>
                <p>{m.overview}</p>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "monospace",
    padding: "40px",
    background: "#fff",
    color: "#000",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  searchBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    border: "1px solid black",
    width: "300px",
  },
  button: {
    padding: "10px",
    background: "black",
    color: "white",
    border: "1px solid black",
    cursor: "pointer",
  },
  columns: {
    display: "flex",
    gap: "20px",
  },
  card: {
    width: "50%",
    border: "1px solid black",
    padding: "15px",
  },
  item: {
    borderTop: "1px solid #ccc",
    marginTop: "10px",
    paddingTop: "10px",
  },
};

export default App;