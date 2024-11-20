import React from 'react'

export default function Tulokset({ score, totalRounds, restart, retry }) {
  return (
    <div className='flex justify-center'>
      <div className='m-4 flex w-96 flex-col items-center space-y-4 rounded-md bg-secondary p-4 text-center shadow-lg'>
        <h1 className='font-bold'>Tulokset</h1>

        <div className='m-2 flex justify-center gap-2'>
          <div className='flex size-28 items-center justify-center rounded bg-green-500 text-4xl shadow-lg'>
            {score}
          </div>
          <div className='flex size-28 items-center justify-center rounded bg-red-500 text-4xl shadow-lg'>
            {totalRounds-score}
          </div>
        </div>

        <p className='rounded border bg-primary p-2 shadow-md'>
          Vastauksistasi {((score / (totalRounds)) * 100).toFixed(1)}% prosenttia oli oikein!
          <br/>
          Pelaa uudestaan tai palaa alkuun säätääksesi asetuksia
        </p>

        <button className='btn-primary w-40 shadow-md' onClick={retry}>
          Pelaa uudestaan
        </button>
        <button className='btn-primary w-40 shadow-md' onClick={restart}>
          Palaa alkuun
        </button>
      </div>
    </div>
  )
}