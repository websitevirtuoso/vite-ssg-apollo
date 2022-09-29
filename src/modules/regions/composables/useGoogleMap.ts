// @ts-expect-error google.map is not a module
import google from '@types/google.maps'
import { nextTick, reactive, Ref } from 'vue'
import { Country, State, City } from '@/modules/regions/types'
import { useField } from 'vee-validate'

interface google_addresses {
  country_name: string
  state_name: string
  city_name: string
  postal_code: string
  street_number: string
  street_name: string
}

export const onGetPlace = (place: google.maps.places.PlaceResult) => {
  let lat = ''
  let lng = ''
  if (typeof place.geometry.location.lat === 'number') {
    lat = place.geometry.location.lat
    lng = place.geometry.location.lng
  } else {
    lat = place.geometry.location.lat()
    lng = place.geometry.location.lng()
  }
  const searchOption = [
    { search_field: 'country', var_name: 'country_name' },
    { search_field: 'administrative_area_level_1', var_name: 'state_name' },
    { search_field: 'locality', var_name: 'city_name' },
    { search_field: 'postal_code', var_name: 'postal_code' },
    { search_field: 'street_number', var_name: 'street_number' },
    { search_field: 'route', var_name: 'street_name' },
  ]
  const address: google_addresses[] = []
  searchOption.forEach((item) => {
    const tmpName = place.address_components.find((gitem: google.maps.GeocoderAddressComponent) => gitem.types.includes(item.search_field))
    if (tmpName !== undefined) {
      // @ts-expect-error need to define types
      address.push({ [item.var_name]: tmpName.long_name })
    } else {
      // @ts-expect-error need to define types
      address.push({ [item.var_name]: '' })
    }
  })
  return Object.assign({ lat, lng }, ...address)
}

const decodeLatLong = (position: GeolocationPosition): google.maps.places.PlaceResult => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GOOGLE_API_KEY}&result_type=street_address&latlng=${
      position.coords.latitude
    },${position.coords.longitude}`
  )
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error)
    })
}

export default () => {
  const { setValue: setFormCountry } = useField('country_id')
  const { setValue: setFieldState, value: valueStateID } = useField('state_id')
  const { setValue: setFieldCity } = useField('city_id')
  const { setValue: setFieldPostalCode } = useField('postal_code')
  const { setValue: setFieldAddress } = useField('address')
  const { setValue: setFieldLat } = useField('lat')
  const { setValue: setFieldLng } = useField('lng')

  const city = reactive({
    id: '',
    name: '',
    postal_code: '',
    country_name: '',
    state_name: '',
    city_name: '',
    street_address: '',
    cityNameSearch: '',
    lat: 49.9,
    lng: -119.4833,
  }) // default coords is kelowna

  const onDraggedPin = (event: google.maps.MapMouseEvent) => {
    setFieldLat(event.lat())
    setFieldLng(event.lng())
  }

  const onStateChange = () => {
    setFieldCity(null)
    city.cityNameSearch = ''
  }

  // reset state value when country changed
  const onCountryChange = () => {
    setFieldState(null)
    onStateChange()
  }

  // get countries items via ref and find this country from out list in db
  const setCountry = (countries: Ref<null>, countryName: string) => {
    try {
      // @ts-expect-error property country doesn't exist on type countries
      const countriesItems = countries.value?.country.countries as Country[]
      const matchedCountry = countriesItems.find((countryItem: Country) => countryItem.name === countryName)
      if (matchedCountry) {
        setFormCountry(matchedCountry.id)
      }
    } catch (e) {
      //
    }
  }

  // get states items via ref
  const setState = async (states: Ref<null>, stateName: string): Promise<void> => {
    await nextTick()

    const setStateID = () => {
      // @ts-expect-error property country doesn't exist on type countries
      const statesItems = states.value?.state.states as State[]
      const matchedState = statesItems.find((stateItem: State) => stateItem.name === stateName)
      if (matchedState) {
        setFieldState(matchedState.id)
      }
    }

    try {
      // this case need when user change state but not country
      setStateID()

      // this case when user change country
      // @ts-expect-error property country doesn't exist on type states
      states.value.state.onResult(({ data }) => {
        // need to check that states available because function reactive
        if (data?.states) {
          setStateID()
        }
      })
    } catch (e) {
      //
    }
  }

  // get cities items via ref
  const setCity = async (cities: Ref<null>, cityName: string): Promise<void> => {
    await nextTick()

    const setCityID = () => {
      // @ts-expect-error property cities doesn't exist on type cities
      const citiesItems = cities.value?.city.cities as City[]
      const matchedCity = citiesItems.find((cityItem: City) => cityItem.name === cityName)
      if (matchedCity) {
        setFieldCity(matchedCity.id)
      }
    }

    try {
      setCityID()

      // this case when user change state
      // @ts-expect-error property city doesn't exist on type cities
      cities.value.city.onResult(({ data }) => {
        // need to check that cities available because function reactive
        if (data?.cities) {
          setCityID()
        }
      })
    } catch (e) {
      //
    }
  }

  // This function can be used as top level function
  /**
   * Top level abstraction function.
   * @param place
   * @param countriesTempRef can be undefined
   * @param statesTempRef can be undefined
   * @param citiesTempRef can be undefined
   */
  const onSetPlace = (place: google.maps.places.PlaceResult, countriesTempRef?: Ref, statesTempRef?: Ref, citiesTempRef?: Ref) => {
    const address = onGetPlace(place)
    setFieldPostalCode(address.postal_code)
    setFieldAddress(`${address.street_number} ${address.street_name}`)
    setFieldLat(address.lat)
    setFieldLng(address.lng)
    city.country_name = address.country_name
    city.state_name = address.state_name
    city.city_name = address.city_name

    if (city.country_name && countriesTempRef !== undefined) {
      setCountry(countriesTempRef, city.country_name)
    }

    if (city.state_name && statesTempRef !== undefined) {
      setState(statesTempRef, city.state_name).then()
    }

    // need to wait when state will be set
    if (citiesTempRef !== undefined) {
      watch(
        () => valueStateID.value,
        () => {
          if (city.city_name) {
            setCity(citiesTempRef, city.city_name).then()
          }
        }
      )
    }
  }

  const setBrowserLocation = (countriesTempRef?: Ref, statesTempRef?: Ref, citiesTempRef?: Ref) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          decodeLatLong(position).then((place: google.maps.places.PlaceResult) => {
            if (place.status === 'OK') {
              onSetPlace(place.results[0], countriesTempRef, statesTempRef, citiesTempRef)
            }
          })
        },
        () => {
          /**/
        },
        {
          maximumAge: 0,
          enableHighAccuracy: true,
          timeout: 10000,
        }
      )
    }
  }

  return {
    city,
    onDraggedPin,
    onCountryChange,
    onStateChange,
    onGetPlace,
    setCountry,
    setState,
    setCity,
    onSetPlace,
    setBrowserLocation,
  }
}
