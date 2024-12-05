// Komponentti, joka vastaa vuosikymmenen valinnasta.
export default function DecadePicker({ value, onChange }) {
  const startYear = 1880
  const currentYear = new Date().getFullYear()
  const endYear = currentYear - (currentYear % 10)

  const decades = []
  // Lisätään taulukkoon kaikki vuosikymmenet vuodesta startYear aina nykyiseen vuosikymmeneen
  for (let year = startYear; year <= endYear; year += 10) {
    decades.push({ label: `${year}s`, value: `${year}-${year + 9}` })
  }
  return (
    <select
      className="cursor-pointer rounded bg-secondary p-2 shadow-md hover:saturate-200"
      value={value}
      onChange={(e) => {
        const selectedDecade = e.target.value
        onChange(selectedDecade === "" ? null : selectedDecade)
      }}
    >
      <option value="">Vuosi</option>
      {decades.map((decade, index) => (
        <option key={index} value={decade.value}>
          {decade.label}
        </option>
      ))}
    </select>
  )
}
