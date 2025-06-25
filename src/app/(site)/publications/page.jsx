const PUBLICATIONS = {
  "2025": [
    {
      authors: "Wallen, D., Yan, L., Dunlap, C., Li, C., Hu, H. and Sun, Y.",
      title: "Unsupervised machine learning framework for non-destructive acoustic emission sensing of flow condensation.",
      journal: "AI Thermal Fluids",
      pages: "p.100010",
      link: "https://doi.org/10.1016/j.aitf.2025.100010"
    }
  ],
  "2024": [
    {
      authors: "Pandey, H., Du, X., Weems, E., Pierson, S., Al-Hmoud, A., Zhao, Y. and Hu, H.",
      title: "Two-phase immersion cooler for medium-voltage silicon carbide MOSFETs.",
      journal: "In 2024 23rd IEEE Intersociety Conference on Thermal and Thermomechanical Phenomena in Electronic Systems (ITherm)",
      pages: "pp. 1–6",
      publisher: "IEEE",
      link: "https://doi.org/10.1109/ITherm55375.2024.10709426"
    },
    {
      authors: "Dunlap, C., Li, C., Pandey, H., Le, N. and Hu, H.",
      title: "BubbleID: A deep learning framework for bubble interface dynamics analysis.",
      journal: "Journal of Applied Physics",
      volume: "136",
      issue: "1",
      link: "https://doi.org/10.1063/5.0207546"
    }
  ],
  "2021": [
    {
      authors: "Zhang, L., Soori, T., Rokoni, A., Kaminski, A. and Sun, Y.",
      title: "Air film contact modes of drop impact on lubricated surfaces under reduced pressures.",
      journal: "Physics of Fluids",
      volume: "33",
      issue: "9",
      link: "https://doi.org/10.1063/5.0065747"
    },
    {
      authors: "Zhang, L., Soori, T., Rokoni, A., Kaminski, A. and Sun, Y.",
      title: "Thin film instability driven dimple mode of air film failure during drop impact on smooth surfaces.",
      journal: "Physical Review Fluids",
      volume: "6",
      issue: "4",
      pages: "p.044002",
      link: "https://doi.org/10.1103/PhysRevFluids.6.044002"
    }
  ]
};

export default function PublicationsPage() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-white mt-32 mb-12">
      <h1 className="text-3xl font-bold mb-6">Publications</h1>
      {Object.entries(PUBLICATIONS).sort((a, b) => b[0].localeCompare(a[0])).map(([year, entries]) => (
        <section key={year} className="mb-6">
          <h2 className="text-xl font-semibold mb-3">{year}</h2>
          <ul className="space-y-4">
            {entries.map((pub, index) => {
              const citation = `${pub.authors}. ${pub.title} ${pub.journal}${pub.volume ? ", " + pub.volume : ""}${pub.issue ? `(${pub.issue})` : ""}${pub.pages ? ", " + pub.pages : ""}${pub.publisher ? ". " + pub.publisher : ""}`;
              return (
                <li key={index} className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium">{pub.authors}</p>
                  <p className="italic">{pub.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {pub.journal}{pub.volume ? `, ${pub.volume}` : ''}{pub.issue ? `(${pub.issue})` : ''}{pub.pages ? `, ${pub.pages}` : ''}{pub.publisher ? `. ${pub.publisher}` : ''}
                  </p>
                  <div className="mt-2 space-x-3">
                    {/* <div
                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                      onClick={() => copyToClipboard(citation)}
                    >
                      Copy Reference
                    </div> */}
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
                      >
                        Journal Link
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
