const getPhotos = async () => {
  const apiUrl = "https://api.finna.fi/v1/search?filter[]=format:0/Image/&limit=50&page=3&field[]=title&field[]=images&field[]=id"
    try { 
        const response = await fetch(apiUrl)
        console.log("Fetching by url", apiUrl)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log("data.records:,", data.records)
        return data.records
    } catch (error) {
        console.error('Error fetching photos:', error)
        return []
    }
}

export default getPhotos