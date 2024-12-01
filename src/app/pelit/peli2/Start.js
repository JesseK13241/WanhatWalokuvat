export default function Start({ initGame }) {
  const handleSubmit = () => {
    initGame()
  }

  return (
    <div className="flex items-center justify-center">
      <form className="m-4 flex w-96 flex-col items-center space-y-4 rounded-md bg-secondary p-4 text-center shadow-lg">
        <h1 className="font-bold">Peli2</h1>
        <p className="rounded border bg-primary p-2 shadow-md">
          Pelissä sinulle näytetään kaksi kuvaa kerrallaa. Pelin tavoitteena on
          valita kuva-vaihtoehdoista vanhempi. Kuvan iällä tarkoitetaan vuotta,
          jolloin kuva on otettu.
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary shadow-md"
        >
          Aloita
        </button>
      </form>
    </div>
  )
}
