export const getPhotos = async ({
  location = null,
  decade = null,
  limit = 5
} = {}) => {
  const BASE_API_URL = "https://api.finna.fi/v1/search?";

  console.log("Fetching by params:", { location, decade, limit });

  // 'B+BY': Vapaat, lähde nimettävä, 'A+FREE': Täysin vapaat
  var filters = [
    'online_boolean:"1"',
    'format:"1/Image/Photo/"',
    '~usage_rights_ext_str_mv:"0/B+BY/"',
    '~usage_rights_ext_str_mv:"0/A+Free/"'
  ];

  if (decade) {
    console.log("Decade specified:", decade);
    const [start, end] = decade.split("-");
    filters.push(`search_daterange_mv:"[${start} TO ${end}]"`);
  }

  if (location) {
    // TODO location based searching
    console.log("Location specified:", location);
  }

  const params = {
    filter: filters,
    field: [
      "authors",
      "title",
      "images",
      "id",
      "year",
      "location"
    ],
    limit: limit,
  };

  let urlToFetch = BASE_API_URL;

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const i of value) {
        urlToFetch += `&${key}[]=${i}`;
      }
    } else {
      urlToFetch += `&${key}=${value}`;
    }
  }

  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export default getPhotos;
