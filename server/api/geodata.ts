interface District {
  number: string;
  name: string;
}

interface State {
  abbr: string;
  name: string;
}

interface Response {
  cd: District;
  state: State;
}

export default defineEventHandler(async (event): Promise<Response> => {
  const query = getQuery(event)
  const address = typeof query.address === 'string' && encodeURIComponent(query.address)

  try {
    const data = await $fetch(
      `https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=${address}&benchmark=Public_AR_Current&vintage=Current_Current&format=json`
    )

    const district = data.result.addressMatches[0].geographies['118th Congressional Districts'][0]
    const state = data.result.addressMatches[0].geographies.States[0]

    return {
      cd: {
        number: district.CD118,
        name: district.NAME,
      },
      state: {
        abbr: state.STUSAB,
        name: state.NAME,
      }
    }
  } catch (_error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Address not found'
    })
  }
})
