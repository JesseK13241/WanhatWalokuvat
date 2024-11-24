export default function LocationPicker({ value, onChange }) {
  return (
    <button
      className="btn-secondary"
      onClick={(e) => {
        const coordinates = {"lat": 60, "lon": 25, "r": 10}
        console.log("Changed location to:", coordinates)
        onChange(coordinates)
      }}
    >
      Sijainti
    </button>
  )
}

