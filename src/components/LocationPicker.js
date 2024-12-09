const LOCATIONS = {
  // FROM https://fi.wikipedia.org/wiki/Luettelo_Suomen_kuntien_koordinaateista
  Akaa: [61.167145977, 23.865888764],
  Alajärvi: [63.001273254, 23.817522812],
  Alavieska: [64.166646246, 24.307213479],
  Alavus: [62.586161997, 23.616600589],
  Asikkala: [61.172512361, 25.549142484],
  Askola: [60.530210718, 25.598880612],
  Aura: [60.646591846, 22.588991955],
  Brändö: [60.412662338, 21.04371379],
  Eckerö: [60.213612052, 19.613138657],
  Enonkoski: [62.089260323, 28.916904602],
  Enontekiö: [68.385549758, 23.635307625],
  Espoo: [60.206376371, 24.656728549],
  Eura: [61.130003763, 22.135931764],
  Eurajoki: [61.203547237, 21.73409618],
  Evijärvi: [63.36690195, 23.47395314],
  Finström: [60.232262787, 19.992383189],
  Forssa: [60.814791352, 23.6164073],
  Föglö: [60.011288651, 20.425481273],
  Geta: [60.374272036, 19.845773869],
  Haapajärvi: [63.748514012, 25.319573489],
  Haapavesi: [64.136145958, 25.364407256],
  Hailuoto: [65.008596339, 24.71112636],
  Halsua: [63.460145023, 24.171590087],
  Hamina: [60.569688146, 27.197900579],
  Hammarland: [60.218344619, 19.73979193],
  Hankasalmi: [62.390301152, 26.436191366],
  Hanko: [59.82496853, 22.966840833],
  Harjavalta: [61.313701934, 22.141199348],
  Hartola: [61.583533225, 26.019445705],
  Hattula: [61.055937939, 24.373688807],
  Hausjärvi: [60.788352094, 25.024743189],
  Heinola: [61.2052356, 26.034841245],
  Heinävesi: [62.425985285, 28.629432602],
  Helsinki: [60.166640739, 24.943536799],
  Hirvensalmi: [61.643279652, 26.77736901],
  Hollola: [60.988606497, 25.512813466],
  Honkajoki: [61.993243973, 22.263525327],
  Huittinen: [61.177545666, 22.699443932],
  Humppila: [60.922008168, 23.367072017],
  Hyrynsalmi: [64.677259967, 28.490705072],
  Hyvinkää: [60.631016885, 24.861124319],
  Hämeenkyrö: [61.640922455, 23.195714863],
  Hämeenlinna: [60.996174323, 24.464424988],
  Ii: [65.322611335, 25.374983789],
  Iisalmi: [63.559688616, 27.186983669],
  Iitti: [60.890805141, 26.33869215],
  Ikaalinen: [61.768251116, 23.074590925],
  Ilmajoki: [62.733541324, 22.577475532],
  Ilomantsi: [62.672850851, 30.92679732],
  Imatra: [61.171527381, 28.769224555],
  Inari: [68.905469786, 27.017602211],
  Inkoo: [60.044664081, 24.006574663],
  Isojoki: [62.115137142, 21.958478468],
  Isokyrö: [63.000103009, 22.318211434],
  Janakkala: [60.921846055, 24.647706584],
  Joensuu: [62.602079226, 29.759679275],
  Jokioinen: [60.805162808, 23.490085206],
  Jomala: [60.15043419, 19.95256632],
  Joroinen: [62.179506084, 27.826421809],
  Joutsa: [61.74027126, 26.110981259],
  Juuka: [63.239859772, 29.254325823],
  Juupajoki: [61.797913262, 24.369974148],
  Juva: [61.897472595, 27.857335654],
  Jyväskylä: [62.241677684, 25.749498121],
  Jämijärvi: [61.820221688, 22.691024601],
  Jämsä: [61.864256654, 25.190231473],
  Järvenpää: [60.481098394, 25.10074741],
  Kaarina: [60.407620851, 22.371004907],
  Kaavi: [62.974976715, 28.480838102],
  Kajaani: [64.226733925, 27.728046683],
  Kalajoki: [64.260430362, 23.949156078],
  Kangasala: [61.463200572, 24.067165047],
  Kangasniemi: [61.988644474, 26.642473064],
  Kankaanpää: [61.803357693, 22.39516256],
  Kannonkoski: [62.976573477, 25.263430615],
  Kannus: [63.901745411, 23.915054223],
  Karijoki: [62.308417557, 21.704898532],
  Karkkila: [60.534934578, 24.20821133],
  Karstula: [62.876603857, 24.800504818],
  Karvia: [62.138536127, 22.562560142],
  Kaskinen: [62.382871885, 21.225392339],
  Kauhajoki: [62.425088156, 22.177243878],
  Kauhava: [63.100920012, 23.065244367],
  Kauniainen: [60.210640465, 24.7277527],
  Kaustinen: [63.548090648, 23.69987851],
  Keitele: [63.179589177, 26.349949125],
  Kemi: [65.733635445, 24.56341556],
  Kemijärvi: [66.715018519, 27.430577528],
  Keminmaa: [65.798981364, 24.54262919],
  Kemiönsaari: [60.163845255, 22.728934263],
  Kempele: [64.912672171, 25.50995188],
  Kerava: [60.404868786, 25.103548718],
  Keuruu: [62.260208877, 24.706448341],
  Kihniö: [62.203176316, 23.177811003],
  Kinnula: [63.367271175, 24.9699576],
  Kirkkonummi: [60.12065796, 24.438913078],
  Kitee: [62.096690509, 30.145386285],
  Kittilä: [67.653127857, 24.911437456],
  Kiuruvesi: [63.651462106, 26.622489907],
  Kivijärvi: [63.12292486, 25.070968069],
  Kokemäki: [61.256136349, 22.350459185],
  Kokkola: [63.837583062, 23.131961664],
  Kolari: [67.331718287, 23.788974026],
  Konnevesi: [62.627334113, 26.289457254],
  Kontiolahti: [62.766465365, 29.844407795],
  Korsnäs: [62.785052299, 21.188728029],
  "Tl. Koski": [60.652981939, 23.137367393],
  Kotka: [60.465520795, 26.941152634],
  Kouvola: [60.866825214, 26.705598153],
  Kristiinankaupunki: [62.274742151, 21.37854708],
  Kruunupyy: [63.727817733, 23.033771859],
  Kuhmo: [64.125288629, 29.524367548],
  Kuhmoinen: [61.562425983, 25.175665612],
  Kumlinge: [60.259692477, 20.778313171],
  Kuopio: [62.892982923, 27.688934744],
  Kuortane: [62.807410615, 23.506393077],
  Kurikka: [62.618893949, 22.39877371],
  Kustavi: [60.546714695, 21.358881644],
  Kuusamo: [65.964424921, 29.18861606],
  Kyyjärvi: [63.043410994, 24.566437311],
  Kärkölä: [60.86837648, 25.273377105],
  Kärsämäki: [63.980587073, 25.759667454],
  Kökar: [59.920278312, 20.908372757],
  Lahti: [60.980380564, 25.654987962],
  Laihia: [62.977956713, 22.011173105],
  Laitila: [60.875860346, 21.690233379],
  Lapinjärvi: [60.624363429, 26.201405459],
  Lapinlahti: [63.364517752, 27.387415475],
  Lappajärvi: [63.217602823, 23.632849978],
  Lappeenranta: [61.058749724, 28.187689913],
  Lapua: [62.970168655, 23.007570333],
  Laukaa: [62.413528005, 25.957777304],
  Lemi: [61.061522998, 27.804960542],
  Lemland: [60.068453521, 20.099599382],
  Lempäälä: [61.312525626, 23.755748116],
  Leppävirta: [62.491829038, 27.788663006],
  Lestijärvi: [63.524801746, 24.66580332],
  Lieksa: [63.317804542, 30.028096821],
  Lieto: [60.506876265, 22.455932813],
  Liminka: [64.809794749, 25.411946267],
  Liperi: [62.534480932, 29.367861963],
  Lohja: [60.250916253, 24.065782053],
  Loimaa: [60.851362252, 23.058593858],
  Loppi: [60.717556416, 24.44356627],
  Loviisa: [60.457732981, 26.223660363],
  Luhanka: [61.796805591, 25.703825319],
  Lumijoki: [64.837617135, 25.187125981],
  Lumparland: [60.1174024, 20.258892131],
  Luoto: [63.755494342, 22.746684981],
  Luumäki: [60.92092464, 27.559740129],
  Maalahti: [62.942910055, 21.552851475],
  Maarianhamina: [60.101520836, 19.942267834],
  Marttila: [60.585411972, 22.898967272],
  Masku: [60.570991977, 22.098688118],
  Merijärvi: [64.29771802, 24.441848134],
  Merikarvia: [61.86033969, 21.505430059],
  Miehikkälä: [60.669224483, 27.696366399],
  Mikkeli: [61.687726895, 27.273224374],
  Muhos: [64.808918576, 25.990050022],
  Multia: [62.408697501, 24.794621331],
  Muonio: [67.959275326, 23.677223262],
  Mustasaari: [63.114054101, 21.680745161],
  Muurame: [62.13050888, 25.67356508],
  Mynämäki: [60.678732788, 21.987506589],
  Myrskylä: [60.670439657, 25.852102173],
  Mäntsälä: [60.63608498, 25.320204692],
  "Mänttä-Vilppula": [62.036948707, 24.553095512],
  Mäntyharju: [61.41828094, 26.875355649],
  Naantali: [60.467709253, 22.018224718],
  Nakkila: [61.366902193, 22.004075891],
  Nivala: [63.929637787, 24.953943761],
  Nokia: [61.478773769, 23.508499404],
  Nousiainen: [60.599114832, 22.082180366],
  Nurmes: [63.544266312, 29.132995571],
  Nurmijärvi: [60.460806119, 24.807369231],
  Närpiö: [62.473293481, 21.336718308],
  Orimattila: [60.80402214, 25.734288563],
  Oripää: [60.856350309, 22.697411262],
  Orivesi: [61.677407146, 24.357389414],
  Oulainen: [64.266570168, 24.816231983],
  Oulu: [65.013784817, 25.47209907],
  Outokumpu: [62.726024464, 29.015423401],
  Padasjoki: [61.351408456, 25.277610756],
  Paimio: [60.455410664, 22.691146855],
  Paltamo: [64.409447258, 27.832162935],
  Parainen: [60.299124907, 22.3023017],
  Parikkala: [61.55512963, 29.501065813],
  Parkano: [62.010623403, 23.021041049],
  "Pedersören	kunta": [63.601233473, 22.791289301],
  Pelkosenniemi: [67.109192048, 27.512878531],
  Pello: [66.775583504, 23.96347775],
  Perho: [63.215274507, 24.423163042],
  Pertunmaa: [61.503094056, 26.477987839],
  Petäjävesi: [62.256663764, 25.183606514],
  Pieksämäki: [62.298590826, 27.155481907],
  Pielavesi: [63.232348566, 26.755606074],
  Pietarsaari: [63.675221726, 22.702931738],
  Pihtipudas: [63.370334395, 25.574614233],
  Pirkkala: [61.465248956, 23.645483231],
  Polvijärvi: [62.856826994, 29.369602563],
  Pomarkku: [61.694846754, 22.010453708],
  Pori: [61.483726303, 21.795900114],
  Pornainen: [60.47689845, 25.372932372],
  Porvoo: [60.395371935, 25.666559544],
  Posio: [66.109736985, 28.173906419],
  Pudasjärvi: [65.36094712, 26.999243541],
  Pukkila: [60.645352853, 25.580407556],
  Punkalaidun: [61.113272934, 23.100542189],
  Puolanka: [64.868658767, 27.669071121],
  Puumala: [61.521855331, 28.179971761],
  Pyhtää: [60.492210487, 26.544880023],
  Pyhäjoki: [64.465163558, 24.259197182],
  Pyhäjärvi: [63.681835448, 25.985775658],
  Pyhäntä: [64.099460341, 26.329977857],
  Pyhäranta: [60.948266485, 21.440934529],
  Pälkäne: [61.336821181, 24.270409233],
  Pöytyä: [60.721369364, 22.599537679],
  Raahe: [64.687734335, 24.478273101],
  Raasepori: [59.974552922, 23.43622808],
  Raisio: [60.486079651, 22.171068833],
  Rantasalmi: [62.063413397, 28.304229966],
  Ranua: [65.927505623, 26.518416699],
  Rauma: [61.128737875, 21.511126919],
  Rautalampi: [62.621137137, 26.835420999],
  Rautavaara: [63.494210301, 28.298223078],
  Rautjärvi: [61.433471798, 29.36791525],
  Reisjärvi: [63.604386795, 24.937851054],
  Riihimäki: [60.736737225, 24.775321449],
  Ristijärvi: [64.505096191, 28.211768863],
  Rovaniemi: [66.502790259, 25.728478856],
  Ruokolahti: [61.292264125, 28.815799538],
  Ruovesi: [61.984488222, 24.068811837],
  Rusko: [60.542439512, 22.222515059],
  Rääkkylä: [62.312677024, 29.626058461],
  Saarijärvi: [62.705523683, 25.253902],
  Salla: [66.830971278, 28.669933096],
  Salo: [60.384373601, 23.126727127],
  Saltvik: [60.275214843, 20.059115249],
  Sastamala: [61.340225146, 22.906437534],
  Sauvo: [60.344506715, 22.691750338],
  Savitaipale: [61.198742149, 27.686019135],
  Savonlinna: [61.869802657, 28.87849829],
  Savukoski: [67.292004821, 28.164370823],
  Seinäjoki: [62.786662897, 22.842279603],
  Sievi: [63.906281167, 24.521156852],
  Siikainen: [61.877660372, 21.823140984],
  Siikajoki: [64.663838767, 25.103293299],
  Siikalatva: [64.27203017, 25.863775714],
  Siilinjärvi: [63.073664705, 27.659698525],
  Simo: [65.661270047, 25.062297166],
  Sipoo: [60.376856973, 25.268516114],
  Siuntio: [60.138017546, 24.224863347],
  Sodankylä: [67.414920225, 26.590673697],
  Soini: [62.87297229, 24.210173232],
  Somero: [60.628290724, 23.517691265],
  Sonkajärvi: [63.669163025, 27.523742906],
  Sotkamo: [64.13202497, 28.387689851],
  Sottunga: [60.1299875, 20.667418704],
  Sulkava: [61.789726328, 28.378042315],
  Sund: [60.250200171, 20.116293532],
  Suomussalmi: [64.883821118, 28.904794739],
  Suonenjoki: [62.623037446, 27.127576934],
  Sysmä: [61.503771936, 25.68370291],
  Säkylä: [61.048361211, 22.336785897],
  Taipalsaari: [61.161330352, 28.057579346],
  Taivalkoski: [65.576252124, 28.240598067],
  Taivassalo: [60.561807633, 21.611197663],
  Tammela: [60.808134311, 23.760277513],
  Tampere: [61.49774257, 23.761290078],
  Tervo: [62.95214524, 26.753932331],
  Tervola: [66.087024017, 24.81106439],
  Teuva: [62.484761491, 21.747190967],
  Tohmajärvi: [62.226235418, 30.333057263],
  Toholampi: [63.771687856, 24.250504148],
  Toivakka: [62.097929789, 26.082544741],
  Tornio: [65.84973018, 24.144091609],
  Turku: [60.451690351, 22.266866666],
  Tuusniemi: [62.812406598, 28.488250625],
  Tuusula: [60.402369377, 25.025142036],
  Tyrnävä: [64.763363971, 25.652633446],
  Ulvila: [61.432652934, 21.888033305],
  Urjala: [61.081131717, 23.549311266],
  Utajärvi: [64.76169558, 26.416907969],
  Utsjoki: [69.907828523, 27.026541275],
  Uurainen: [62.50080639, 25.438518873],
  Uusikaarlepyy: [63.523125804, 22.530086009],
  Uusikaupunki: [60.801207736, 21.407727115],
  Vaala: [64.560942154, 26.840673725],
  Vaasa: [63.092588875, 21.615874122],
  Valkeakoski: [61.270053249, 24.029248502],
  Valtimo: [63.680306323, 28.813705084],
  Vantaa: [60.298133721, 25.006641332],
  Varkaus: [62.313950665, 27.888587335],
  Vehmaa: [60.685902746, 21.712512133],
  Vesanto: [62.93103044, 26.412849105],
  Vesilahti: [61.305583862, 23.627636445],
  Veteli: [63.475287314, 23.78862512],
  Vieremä: [63.744069514, 27.005160452],
  Vihti: [60.416791924, 24.319858395],
  Viitasaari: [63.082792009, 25.855167908],
  Vimpeli: [63.161927977, 23.820600738],
  Virolahti: [60.582071101, 27.708871595],
  Virrat: [62.23848456, 23.773747693],
  Vårdö: [60.244351018, 20.375338092],
  Vöyri: [63.132068002, 22.252456379],
  Ylitornio: [66.323044983, 23.673012317],
  Ylivieska: [64.072284496, 24.533690188],
  Ylöjärvi: [61.55715602, 23.596580124],
  Ypäjä: [60.805227741, 23.272438379],
  Ähtäri: [62.55285929, 24.075018434],
  Äänekoski: [62.603307432, 25.72483135],
}

/**
 * Komponentti sijainnin valinnalle.
 *
 * value    = Tällä hetkellä valittu sijainti.
 * onChange = Funktio, jota kutsutaan, kun käyttäjä valitsee uuden sijainnin.
 *            Funktio saa parametrina valitun sijainnin oliona:
 *            { lat: [leveysaste], lon: [pituusaste], r: [alueen säde?], location: [sijainnin nimi] }
 */
export default function LocationPicker({ value, onChange }) {
  return (
    <div className="flex">
      <label className="p-2 text-lg">Alue: </label>
      <select
        className="cursor-pointer rounded bg-secondary p-2 shadow-md hover:saturate-200"
        value={value ? `${value.lat},${value.lon}` : ""}
        onChange={(e) => {
          const location = e.target.options[e.target.selectedIndex].textContent
          const coordinates = e.target.value
          const [lat, lon] = coordinates.split(",")
          onChange(
            location == "Mikä tahansa"
              ? null
              : { lat: lat, lon: lon, r: 10, location: location }
          )
        }}
      >
        <option value={[0, 0]} key="Mikä tahansa">
          Mikä tahansa
        </option>
        {Object.entries(LOCATIONS).map(([location, coordinates]) => (
          <option value={coordinates} key={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  )
}
