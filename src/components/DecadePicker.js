// TODO refactor, dynamic decade options

export default function DecadePicker({ value, onChange }) {
  const startYear = 1880;
  const currentYear = new Date().getFullYear();
  const endYear = currentYear - (currentYear % 10);

  const decades = [];
  for (let year = startYear; year <= endYear; year += 10) {
    decades.push({ label: `${year}s`, value: `${year}-${year + 9}` });
  }
  return (
    <div>
      <label>Select decade</label>
      <select
        value={value}
        onChange={e => {
          console.log("Changed decade to:", e.target.value);
          onChange(e.target.value);
        }}>
        {decades.map((decade, index) => (
          <option
            key={index}
            value={decade.value}>
            {decade.label}
          </option>
        ))}
      </select>
    </div>
  );
}
