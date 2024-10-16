const getPhotos = async (decade, count = 1) => {
    const baseUrl = 'https://api.finna.fi/v1/'
    const params = {
        filter: ['online_boolean:1', 
                'format:1/Image/Image',
                '~usage_rights_ext_str_mv:"0/B+BY/"',
                '~usage_rights_ext_str_mv:"0/A+Free/"',
                `search_daterange_mv:"[${decade} TO ${decade+9}]"`],
        limit: count,
        field: ['author', 'images', 'recordPage']
    }
}

export default getPhotos