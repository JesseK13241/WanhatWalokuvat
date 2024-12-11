import { API_RECORD_URL, API_SEARCH_URL } from "@/app/constants"

export const getInitialPhoto = async () => {
  const initialID = "kouvolanmuseo.KMV85:1580"
  const initialPhoto = await getPhotoById(initialID)
  return { ...initialPhoto, recordPage: `/Record/${initialID}` }
}

// Siistii kuvan metadatan esitettävään muotoon
const simplifyPhotoMetadata = (photo) => {
  photo.author = Object.keys(photo.authors.primary)[0]

  photo.building = photo.buildings[0].translated
  for (let i = 1; i < photo.buildings.length; i++) {
    let newBuilding = photo.buildings[i].translated
    if (newBuilding) photo.building = photo.building + ", " + newBuilding
  }
}

const prepareRequest = ({ decade, location, index }) => {
  // Muodostaa API-hakuosoitteen parametrien perusteella

  let urlToFetch = API_SEARCH_URL

  // 'B+BY': Vapaat, lähde nimettävä, 'A+FREE': Täysin vapaat
  const defaultFilters = [
    'online_boolean:"1"',
    'format:"1/Image/Photo/"',
    '~usage_rights_ext_str_mv:"0/B+BY/"',
    '~usage_rights_ext_str_mv:"0/A+Free/"',
  ]

  if (decade && decade !== "vuosi") {
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
      "subjects",
    ],
    limit: 1,
    page: index,
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

  // console.log("Request URL:", urlToFetch)

  return urlToFetch
}
// Palauttaa kuvien lukumäärän parametrien perusteella
// Kokonaislukumäärällä arvotaan satunnaisen kuvan indeksin yläraja

export const getResultCount = async ({ location, decade }) => {
  console.log("Fetching result count by:", { location, decade })

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

export const getPhotoById = async (photoID) => {
  const fields =
    "&field[]=authors&field[]=title&field[]=images&field[]=id&field[]=year&field[]=location&field[]=recordPage&field[]=buildings&field[]=subjects"
  const urlToFetch = API_RECORD_URL + photoID + fields
  const response = await fetch(urlToFetch)

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const data = await response.json()

  if (!data?.records?.length) {
    throw new Error("No results found")
  }

  const photo = data.records[0]

  simplifyPhotoMetadata(photo)

  return photo
}

export const getRandomPhoto = async ({
  location,
  decade,
  resultCountParam = null,
}) => {
  // Palauttaa satunnaisen kuvan parametrien perusteella

  console.warn("Deprecated function, use getPhotoByIndex instead")

  console.log("Fetching a random photo by:", { location, decade })

  // Haetaan resultCount vaan jos sitä ei ole annettu parametrina
  let resultCount
  if (resultCountParam != null) {
    resultCount = resultCountParam
  } else {
    resultCount = await getResultCount({ location, decade })
  }

  const randomIndex = Math.ceil(Math.random() * Math.min(resultCount, 100000))

  const urlToFetch = prepareRequest({ location, decade, randomIndex })

  try {
    const response = await fetch(urlToFetch)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    if (!data?.records?.length) {
      console.warn("No results found")
      return { noPhotos: true } // Palauttaa objektin, jolla on attribuutti noPhotos. Tämä tunnistetaan Photocontainerissa
    }

    const photo = data.records[0]

    simplifyPhotoMetadata(photo)
    
    return {
      ...photo,
      resultCount,
      randomIndex,
    }
  } catch (error) {
    console.error("Error fetching photos:", error)
    throw error
  }
}

export const getPhotoByIndex = async ({ location, decade, index }) => {
  console.log("Fetching a photo with:", { location, decade, index })
  const urlToFetch = prepareRequest({ location, decade, index })
  console.log("URL:", urlToFetch)

  try {
    const response = await fetch(urlToFetch)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()

    if (!data?.records?.length) {
      console.warn("No results found")
      return { noPhotos: true } // Palauttaa objektin, joka voidaan erottaa null-arvosta
    }

    const photo = data.records[0]

    simplifyPhotoMetadata(photo)

    return photo
  } catch (error) {
    console.error("Error fetching photos:", error)
    throw error
  }
}

export default getPhotoByIndex
