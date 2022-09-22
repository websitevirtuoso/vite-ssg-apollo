import i18n from '@/plugins/i18n'
import {
  mdiViewDashboard,
  mdiEye,
  mdiHomeCity,
  mdiCalendarClock,
  mdiLock,
  mdiHome,
  mdiContacts,
  mdiBullhorn,
  mdiCompassRose,
  mdiEarth,
  mdiCityVariant,
  mdiCity,
  mdiWeb,
  mdiFolderMultipleImage,
  mdiFolderOpenOutline,
  mdiBookOpenPageVariant,
} from '@mdi/js'

export interface MenuStruct {
  name: string
  icon: string
  route: string | null
  permission?: string
  children?: MenuStruct[]
}

export const menuItems: MenuStruct[] = [
  { route: 'home', name: i18n.global.t('messages.home'), icon: mdiViewDashboard, permission: 'user.view' },
  { route: 'roles', name: i18n.global.t('messages.role', 2), icon: mdiEye, permission: 'role.view' },
  {
    route: 'listing-types',
    name: i18n.global.t('messages.listing_type', 2),
    permission: 'listing_type.view',
    icon: mdiHomeCity,
  },
  {
    route: 'listing-terms',
    name: i18n.global.t('messages.listing_term', 2),
    permission: 'listing_term.view',
    icon: mdiCalendarClock,
  },
  {
    route: 'permissions',
    name: i18n.global.t('messages.permission', 2),
    icon: mdiLock,
    permission: 'permission.view',
  },
  { route: 'listings', name: i18n.global.t('messages.listing', 2), permission: 'listing.view', icon: mdiHome },
  { route: 'users', name: i18n.global.t('messages.user', 2), permission: 'user.view', icon: mdiContacts },
  { route: 'promos', name: i18n.global.t('messages.promo', 2), icon: mdiBullhorn, permission: 'promo.view' },
  {
    route: null,
    name: i18n.global.t('messages.region'),
    icon: mdiWeb,
    children: [
      { route: 'countries', name: i18n.global.t('messages.country', 2), permission: 'country.view', icon: mdiEarth },
      { route: 'states', name: i18n.global.t('messages.state', 2), permission: 'state.view', icon: mdiCompassRose },
      { route: 'cities', name: i18n.global.t('messages.city', 2), permission: 'city.view', icon: mdiCityVariant },
      {
        route: 'city-aliases',
        name: i18n.global.t('messages.city_alias', 2),
        permission: 'city_alias.view',
        icon: mdiCity,
      },
    ],
  },
  {
    route: null,
    name: i18n.global.t('messages.content'),
    icon: mdiFolderMultipleImage,
    children: [
      {
        route: 'categories',
        name: i18n.global.t('messages.category', 2),
        permission: 'category.view',
        icon: mdiFolderOpenOutline,
      },
      {
        route: 'posts',
        name: i18n.global.t('messages.post', 2),
        permission: 'post.view',
        icon: mdiBookOpenPageVariant,
      },
    ],
  },
]
