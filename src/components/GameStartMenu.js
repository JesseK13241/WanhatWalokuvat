/**
 * Komponentti pelin aloitusnäkymälle.
 * Komponentti näyttää pelin nimen, kuvauksen ja napin pelin aloittamiseen.
 * Näiden lisäksi komponentin sisälle (lapseksi) voi laittaa muita komponentteja
 * eri asetusten vaihtamista varten.
 *
 * Params:
 * name         = Pelin nimi
 * description  = Pelin kuvaus/ohjeet
 * handleSubmit = Funktio, jota kutsutaan kun "Aloita"-nappia painetaan.
 *
 * children = JSX-muotoiset elementit / komponentit, jotka laitetaan tämän komponentin lapsiksi.
 * esim. <GameStartMenu name={} description={} handleSubmit={} />
 *         <RoundsSelector />
 *         <GrayscaleToggle />
 *       </GameStartMenu>
 * Ei siis aseteta GameStartMenu-komponentin propertynä.
 */
export default function GameStartMenu({
  name,
  description,
  children,
  handleSubmit,
}) {
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="m-4 flex w-96 flex-col items-center space-y-4 rounded-md bg-secondary p-4 text-center shadow-lg"
      >
        <h1 className="font-bold">{name}</h1>
        <p className="rounded-md border bg-primary p-2 shadow-md">
          {description}
        </p>

        {children}

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
