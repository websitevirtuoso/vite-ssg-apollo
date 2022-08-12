import i18n from '@/plugins/i18n'

export interface MenuStruct {
  name: string
  icon: string
  route: string | null
  permission?: string
  children?: MenuStruct[]
}

export const menuItems: MenuStruct[] = [
  { route: 'home', name: i18n.global.t('messages.home'), icon: 'mdi-view-dashboard', permission: 'user.view' },
  { route: 'roles', name: i18n.global.t('messages.role', 2), icon: 'mdi-eye', permission: 'role.view' },
  {
    route: 'listing-types',
    name: i18n.global.t('messages.listing_type', 2),
    permission: 'listing_type.view',
    icon: 'mdi-home-city',
  },
  {
    route: 'listing-terms',
    name: i18n.global.t('messages.listing_term', 2),
    permission: 'listing_term.view',
    icon: 'mdi-calendar-clock',
  },
  {
    route: 'permissions',
    name: i18n.global.t('messages.permission', 2),
    icon: 'mdi-lock',
    permission: 'permission.view',
  },
  { route: 'promos', name: i18n.global.t('messages.promo', 2), icon: 'mdi-bullhorn', permission: 'promo.view' },
  {
    route: null,
    name: i18n.global.t('messages.region'),
    icon: 'mdi-web',
    children: [
      { route: 'countries', name: i18n.global.t('messages.country', 2), permission: 'country.view', icon: 'mdi-earth' },
      { route: 'states', name: i18n.global.t('messages.state', 2), permission: 'state.view', icon: 'mdi-compass-rose' },
      { route: 'cities', name: i18n.global.t('messages.city', 2), permission: 'city.view', icon: 'mdi-city-variant' },
      {
        route: 'city-aliases',
        name: i18n.global.t('messages.city_alias', 2),
        permission: 'city_alias.view',
        icon: 'mdi-city',
      },
    ],
  },
  {
    route: null,
    name: i18n.global.t('messages.content'),
    icon: 'mdi-folder-multiple-image',
    children: [
      {
        route: 'categories',
        name: i18n.global.t('messages.category', 2),
        permission: 'category.view',
        icon: 'mdi-folder-open-outline',
      },
      {
        route: 'posts',
        name: i18n.global.t('messages.post', 2),
        permission: 'post.view',
        icon: 'mdi-book-open-page-variant',
      },
    ],
  },
]
