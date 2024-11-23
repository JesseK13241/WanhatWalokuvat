import localPhoto from "@/public/images/initialPhoto.jpg"
import Image from "next/image"

export const getInitialPhoto = () => {
  // Hakee ensimmäisen kuvan staattisesti
  // Kuvaa vaihtaessa muista päivittää metadata manuaalisesti

  const initialPhoto = {
    element: (
      <Image
        src={localPhoto}
        alt="Some text"
        fill={true}
        className="object-contain"
      />
    ),
    year: 1890,
    title: "Miesseurue Kauppatorilla, toinen oikealta on tohtori Wilh.",
    author: "Helsingin kaupunginmuseo",
    local: true,
  }
  return initialPhoto
}

const prepareRequest = ({ decade, location, randomIndex }) => {
  // Muodostaa API-hakuosoitteen parametrien perusteella

  //console.log("Preparing request with:", { decade, location, randomIndex })

  let urlToFetch = "https://api.finna.fi/v1/search?"

  // 'B+BY': Vapaat, lähde nimettävä, 'A+FREE': Täysin vapaat
  const defaultFilters = [
    'online_boolean:"1"',
    'format:"1/Image/Photo/"',
    '~usage_rights_ext_str_mv:"0/B+BY/"',
    '~usage_rights_ext_str_mv:"0/A+Free/"',
  ]

  if (decade) {
    //console.log("Decade specified:", decade)
    const [start, end] = decade.split("-")
    defaultFilters.push(
      `search_daterange_mv:"[${start} TO ${end}]"&search_daterange_mv_type=within`
    )
  }

  const params = {
    filter: defaultFilters,
    field: [
      "authors",
      "title",
      "images",
      "id",
      "year",
      "location",
      "recordPage",
      "buildings",
    ],
    limit: 1,
    page: randomIndex,
  }

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const i of value) {
        urlToFetch += `&${key}[]=${i}`
      }
    } else {
      urlToFetch += `&${key}=${value}`
    }
  }

  if (location) {
    urlToFetch += `&filter[]={!geofilt+sfield=location_geo+pt=${location.lat},${location.lon}+d=${location.r}}`
  }

  //console.log("Request URL:", urlToFetch)

  return urlToFetch
}

export const getResultCount = async ({ location, decade }) => {
  // Palauttaa kuvien lukumäärän parametrien perusteella
  // Kokonaislukumäärällä arvotaan satunnaisen kuvan indeksin yläraja

  //console.log("Fetching result count by:", { location, decade })
  const urlToFetch = prepareRequest({ location, decade })
  try {
    const response = await fetch(urlToFetch)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    return data.resultCount
  } catch (error) {
    console.error("Error fetching photos:", error)
    throw error
  }
}

export const getRandomPhoto = async ({ location, decade }) => {
  // Palauttaa satunnaisen kuvan parametrien perusteella

  console.log("Fetching a random photo by:", { location, decade })

  var resultCount = await getResultCount({ location, decade })
  if (resultCount > 100000) resultCount = 100000
  const randomIndex = Math.floor(Math.random() * resultCount)
  console.log("Page number: ", randomIndex)

  const urlToFetch = prepareRequest({ location, decade, randomIndex })

  try {
    const response = await fetch(urlToFetch)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    const photo = data.records[0]

    console.log(photo)

    // Siivotaan kuvan metadataa
    photo.author = Object.keys(photo.authors.primary)[0]
    photo.building = photo.buildings[0].translated

    // Lisätään objektiin hakutulosten lukumäärä ja satunnaisen kuvan indeksi
    data.resultCount = resultCount
    data.randomIndex = randomIndex
    return data
  } catch (error) {
    console.error("Error fetching photos:", error)
    throw error
  }
}

export default getRandomPhoto
