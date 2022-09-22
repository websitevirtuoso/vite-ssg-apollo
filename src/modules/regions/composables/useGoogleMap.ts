// @ts-expect-error google.map is not a module
import google from '@types/google.maps'
import { nextTick, reactive, Ref } from 'vue'
import { Country, State, City } from '@/modules/regions/types'

interface google_addresses {
  country_name: string
  state_name: string
  city_name: string
  postal_code: string
  street_number: string
  street_name: string
}

export const onGetPlace = (place: google.maps.places.PlaceResult) => {
  const lat = place.geometry.location.lat()
  const lng = place.geometry.location.lng()
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

export default () => {
  const city = reactive({
    id: '',
    name: '',
    postal_code: '',
    country_name: '',
    state_name: '',
    city_name: '',
    street_address: '',
    cityNameSearch: '',
    country_id: '',
    state_id: '',
    city_id: '',
    lat: 49.9,
    lng: -119.4833,
  }) // default coords is kelowna

  const onDraggedPin = (event: google.maps.MapMouseEvent) => {
    city.lat = event.lat()
    city.lng = event.lng()
  }

  const onStateChange = () => {
    city.id = ''
    city.cityNameSearch = ''
  }

  // reset state value when country changed
  const onCountryChange = () => {
    city.state_id = ''
    onStateChange
  }

  // get countries items via ref and find this country from out list in db
  const setCountry = (countries: Ref<null>, countryName: string) => {
    try {
      // @ts-expect-error property country doesn't exist on type countries
      const countriesItems = countries.value?.countries as Country[]
      const matchedCountry = countriesItems.find((countryItem: Country) => countryItem.name === countryName)
      if (matchedCountry) {
        city.country_id = matchedCountry.id
      }
    } catch (e) {
      // I want application to not crush, but don't care about the message
    }
  }

  // get states items via ref
  const setState = async (states: Ref<null>, stateName: string): Promise<void> => {
    await nextTick()

    const setStateID = () => {
      // @ts-expect-error property country doesn't exist on type countries
      const statesItems = states.value?.states as State[]
      const matchedState = statesItems.find((stateItem: State) => stateItem.name === stateName)
      if (matchedState) {
        city.state_id = matchedState.id
      }
    }

    try {
      // this case need when user change state but not country
      setStateID()

      // this case when user change country
      // @ts-expect-error property country doesn't exist on type states
      states.value.onResult(({ data }) => {
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
      const citiesItems = cities.value?.cities as City[]
      const matchedCity = citiesItems.find((cityItem: City) => cityItem.name === cityName)
      if (matchedCity) {
        city.city_id = matchedCity.id
      }
    }

    try {
      setCityID()

      // this case when user change state
      // @ts-expect-error property city doesn't exist on type cities
      cities.value.onResult(({ data }) => {
        // need to check that cities available because function reactive
        if (data?.cities) {
          setCityID()
        }
      })
    } catch (e) {
      //
    }
  }

  type setFormValueFunction = (value: string | number) => void
  const setFormWatchers = (setLat: setFormValueFunction, setLng: setFormValueFunction) => {
    watch(
      () => city.lat,
      () => {
        setLat(city.lat)
      },
      { immediate: true, deep: true }
    )
    watch(
      () => city.lng,
      () => {
        setLng(city.lng)
      },
      { immediate: true, deep: true }
    )
  }

  // This function can be used as top level function
  /**
   *
   * @param place
   * @param countriesTempRef can be undefined
   * @param statesTempRef can be undefined
   * @param citiesTempRef can be undefined
   */
  const onSetPlace = (place: google.maps.places.PlaceResult, countriesTempRef?: Ref, statesTempRef?: Ref, citiesTempRef?: Ref) => {
    const address = onGetPlace(place)
    city.postal_code = address.postal_code
    city.street_address = `${address.street_number} ${address.street_name}`
    city.lat = address.lat
    city.lng = address.lng
    city.country_name = address.country_name
    city.state_name = address.state_name
    city.city_name = address.city_name

    if (city.country_name && countriesTempRef !== undefined) {
      setCountry(countriesTempRef, city.country_name)
    }

    if (city.state_name && statesTempRef !== undefined) {
      setState(statesTempRef, city.state_name)
    }

    // need to wait when state will be set
    if (citiesTempRef !== undefined) {
      watch(
        () => city.state_id,
        () => {
          if (city.city_name) {
            setCity(citiesTempRef, city.city_name)
          }
        }
      )
    }
  }

  return { city, onDraggedPin, onCountryChange, onStateChange, onGetPlace, setCountry, setState, setCity, setFormWatchers, onSetPlace }
}
