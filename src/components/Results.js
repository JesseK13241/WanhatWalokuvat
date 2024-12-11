/**
 * Komponentti, jolla näytetään pelin tulokset kierrosten loputtua.
 *
 * score       = Oikeiden vastausten määrä.
 * totalRounds = Kaikkien kierrosten/vastausten määrä. (Käytetään onnistumisprosentin laskemisessa).
 * restart     = Funktio, jota kutsutaan, jos pelaaja haluaa aloittaa
 *               pelin kokonaan alusta (mahdollisesti eri asetuksilla).
 * retry       = Funktio, jota kutsutaan, jos pelaaja haluaa yrittää peliä uudestaan (samoilla asetuksilla)
 *
 * Käyttö: <Tulokset score={pisteet} totalRounds={kierrostenMaara} restart={takaisinValikkoon} retry={uudestaan} />
 */
export default function Tulokset({ score, totalRounds, restart, retry }) {
  return (
    <div className="flex justify-center">
      <div className="m-4 flex w-96 flex-col items-center space-y-4 rounded-md bg-secondary p-4 text-center shadow-lg">
        <h1 className="font-bold">Tulokset</h1>

        <div className="m-2 flex justify-center gap-2">
          <div className="flex size-28 items-center justify-center rounded bg-green-500 text-4xl shadow-lg">
            {score}
          </div>
          <div className="flex size-28 items-center justify-center rounded bg-red-500 text-4xl shadow-lg">
            {totalRounds - score}
          </div>
        </div>

        <p className="rounded-xl border bg-primary px-5 py-10 font-bold shadow-md">
          Vastauksistasi {((score / totalRounds) * 100).toFixed(1)}% oli oikein!
        </p>

        <button className="btn-primary w-full shadow-md" onClick={retry}>
          Pelaa uudestaan
        </button>
        <button className="btn-primary w-full shadow-md" onClick={restart}>
          Palaa alkuun
        </button>
      </div>
    </div>
  )
}
