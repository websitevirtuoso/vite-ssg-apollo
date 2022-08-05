// @ts-expect-error google.map is not a module
import google from '@types/google.maps'
import { nextTick, reactive } from 'vue'
import { Country, State } from '@/modules/regions/types'
import { Ref } from 'vue-demi'

export const onGetPlace = (place: google.maps.places.PlaceResult) => {
  const cityName = place.address_components[0].long_name
  const lat = place.geometry.location.lat()
  const lng = place.geometry.location.lng()
  const countryName = place.address_components.find((item: google.maps.GeocoderAddressComponent) =>
    item.types.includes('country')
  ).long_name
  const stateName = place.address_components.find((item: google.maps.GeocoderAddressComponent) =>
    item.types.includes('administrative_area_level_1')
  ).long_name

  return { cityName, lat, lng, countryName, stateName }
}

export default () => {
  const city = reactive({ name: '', country_id: '', state_id: '', lat: 49.9, lng: -119.4833 }) // default coords is kelowna

  const onDraggedPin = (event: google.maps.MapMouseEvent) => {
    city.lat = event.lat()
    city.lng = event.lng()
  }

  // reset state value when country changed
  const onCountryChange = () => (city.state_id = '')

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

    try {
      // this case need when user change state but not country
      // @ts-expect-error property country doesn't exist on type countries
      const statesItems = states.value?.states as State[]
      const matchedState = statesItems.find((stateItem: State) => stateItem.name === stateName)
      if (matchedState) {
        city.state_id = matchedState.id
      }

      // this case when user change country
      // @ts-expect-error property country doesn't exist on type states
      states.value.onResult(({ data }) => {
        // need to check that states available because function reactive
        if (data?.states) {
          const statesItems = data.states.data as State[]
          const matchedState = statesItems.find((stateItem: State) => stateItem.name === stateName)
          if (matchedState) {
            city.state_id = matchedState.id
          }
        }
      })
    } catch (e) {
      //
    }
  }

  return { city, onDraggedPin, onCountryChange, onGetPlace, setCountry, setState }
}
