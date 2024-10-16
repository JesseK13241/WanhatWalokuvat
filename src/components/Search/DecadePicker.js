export default function DecadePicker({ value, onChange }) {
  return (
    <div>
      <label>Select decade</label>
      <select 
        value={value} // Selected value
        onChange={e => onChange(e.target.value)} // New value is passed to onChange
      >
        <option value="1880-1889">1880s</option>
        <option value="1890-1899">1890s</option>
        <option value="1900-1909">1900s</option>
        <option value="1910-1919">1910s</option>
        <option value="1920-1929">1920s</option>
        <option value="1930-1939">1930s</option>
        <option value="1940-1949">1940s</option>
        <option value="1950-1959">1950s</option>
        <option value="1960-1969">1960s</option>
        <option value="1970-1979">1970s</option>
        <option value="1980-1989">1980s</option>
        <option value="1990-1999">1990s</option>
        <option value="2000-2009">2000s</option>
        <option value="2010-2019">2010s</option>
        <option value="2020-2029">2020s</option>
      </select>
    </div>
  );
}
