const getPhotos = async (location = null, decade = null, count = 1) => {
  const baseUrl = "https://api.finna.fi/v1/search?";

  console.log("Fetching by params:", { location, decade, count });

  // 'B+BY': Vapaat, lähde nimettävä, 'A+FREE': Täysin vapaat
  var filters = [
    'online_boolean:"1"',
    'format:"1/Image/Image/"',
    '~usage_rights_ext_str_mv:"0/B+BY/"',
    '~usage_rights_ext_str_mv:"0/A+Free/"'
  ];

  if (decade) {
    const [start, end] = decade.split("-");
    filters.push(`search_daterange_mv:"[${start} TO ${end}]"`);
  }

  if (location) {
    // TODO location based searching
  }

  const params = {
    filter: filters,
    field: ["authors", "title", "images", "id", "recordPage"],
    limit: count
  };

  var fullUrl = baseUrl;

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const i of value) {
        fullUrl += `&${key}[]=${i}`;
      }
    } else {
      fullUrl += `&${key}=${value}`;
    }
  }

  // const apiUrl = "https://api.finna.fi/v1/search?filter[]=format:0/Image/&limit=50&page=3&field[]=title&field[]=images&field[]=id"

  try {
    const response = await fetch(fullUrl);
    console.log("Fetching by url", fullUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("data.records:,", data.records);
    return data.records;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

export default getPhotos;
