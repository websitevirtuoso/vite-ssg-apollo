export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date scalar type in format */
  Date: any
  /** DateTime scalar type in format */
  DateTime: any
  /** Arbitrary data encoded in JavaScript Object Notation. See https://www.json.org/. */
  Json: any
  /**
   * The `Upload` special type represents a file to be uploaded in the same HTTP request as specified by
   *  [graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec).
   */
  Upload: any
}

export type Auth = {
  __typename?: 'Auth'
  access_token: Scalars['String']
  /** Value in seconds */
  expires_in: Scalars['Int']
  token_type: Scalars['String']
  /** The type of the user */
  user: Users
}

export type Categories = {
  __typename?: 'Categories'
  created_at: Scalars['DateTime']
  id: Scalars['ID']
  title: Scalars['String']
  updated_at: Scalars['DateTime']
}

export type CategoriesPagination = {
  __typename?: 'CategoriesPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Categories>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type CategoryFilter = {
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  title?: InputMaybe<Scalars['String']>
}

export type Cities = {
  __typename?: 'Cities'
  id: Scalars['ID']
  lat: Scalars['Float']
  lng: Scalars['Float']
  name: Scalars['String']
  state: States
}

export type CitiesPagination = {
  __typename?: 'CitiesPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Cities>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type CityAliasFilter = {
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
}

export type CityAliases = {
  __typename?: 'CityAliases'
  city: Cities
  id: Scalars['ID']
  name: Scalars['String']
}

export type CityAliasesPagination = {
  __typename?: 'CityAliasesPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<CityAliases>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type CityFilter = {
  country_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
  name_exact?: InputMaybe<Scalars['String']>
  state_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  state_name?: InputMaybe<Scalars['String']>
}

export type Companies = {
  __typename?: 'Companies'
  address?: Maybe<Scalars['String']>
  banner?: Maybe<Scalars['String']>
  city: Cities
  created_at: Scalars['DateTime']
  created_by: Users
  deleted_at?: Maybe<Scalars['DateTime']>
  deleted_by?: Maybe<Users>
  description: Scalars['String']
  discount: Scalars['Int']
  email: Scalars['String']
  id: Scalars['ID']
  listing_settings: Scalars['Json']
  logo: Scalars['String']
  name: Scalars['String']
  phone?: Maybe<Array<Maybe<Scalars['String']>>>
  postal_code?: Maybe<Scalars['String']>
  status: Company_Status
  updated_at?: Maybe<Scalars['DateTime']>
  updated_by?: Maybe<Users>
  website_url?: Maybe<Scalars['String']>
}

export type CompaniesPagination = {
  __typename?: 'CompaniesPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Companies>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type CompanyFilter = {
  address?: InputMaybe<Scalars['String']>
  city_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  country_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  created_at?: InputMaybe<DateTimeRange>
  deleted_at?: InputMaybe<DateTimeRange>
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
  phone?: InputMaybe<Scalars['String']>
  postal_code?: InputMaybe<Scalars['String']>
  state_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  status?: InputMaybe<Array<InputMaybe<Company_Status>>>
  updated_at?: InputMaybe<DateTimeRange>
}

export type Countries = {
  __typename?: 'Countries'
  code: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
}

export type CountriesPagination = {
  __typename?: 'CountriesPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Countries>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type CountryFilter = {
  code?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
}

export type DateTimeRange = {
  /** empty */
  empty?: InputMaybe<Scalars['Boolean']>
  /** Greater than */
  gt?: InputMaybe<Scalars['DateTime']>
  /** Greater than or equal */
  gte?: InputMaybe<Scalars['DateTime']>
  /** Less than */
  lt?: InputMaybe<Scalars['DateTime']>
  /** Less than or equal */
  lte?: InputMaybe<Scalars['DateTime']>
}

export type ListingFilter = {
  address?: InputMaybe<Scalars['String']>
  available_at?: InputMaybe<DateTimeRange>
  bathrooms?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>
  bedrooms?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  city_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  country_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  /** Date creating */
  created_at?: InputMaybe<DateTimeRange>
  expire_at?: InputMaybe<DateTimeRange>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  media?: InputMaybe<Scalars['Boolean']>
  pets?: InputMaybe<Array<InputMaybe<Listing_Pets>>>
  postal_code?: InputMaybe<Scalars['String']>
  price?: InputMaybe<NumberRange>
  square_feet?: InputMaybe<NumberRange>
  state_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  status?: InputMaybe<Array<InputMaybe<Listing_Status>>>
  term_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  type_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  /** Date updating */
  updated_at?: InputMaybe<DateTimeRange>
  user_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type ListingInitiator = {
  __typename?: 'ListingInitiator'
  id: Scalars['ID']
  name: Scalars['String']
  url?: Maybe<Scalars['String']>
}

export type ListingMediaFilter = {
  created_at?: InputMaybe<DateTimeRange>
  is_local?: InputMaybe<Scalars['Boolean']>
  is_primary?: InputMaybe<Scalars['Boolean']>
  type?: InputMaybe<Listing_Media_Type>
  updated_at?: InputMaybe<DateTimeRange>
}

export type ListingMedias = {
  __typename?: 'ListingMedias'
  created_at: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  is_local: Scalars['Boolean']
  is_primary: Scalars['Boolean']
  path: Scalars['String']
  position: Scalars['Int']
  type: Listing_Media_Type
  updated_at: Scalars['DateTime']
}

export type ListingTermFilter = {
  description?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
}

export type ListingTerms = {
  __typename?: 'ListingTerms'
  description: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
}

export type ListingTermsPagination = {
  __typename?: 'ListingTermsPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<ListingTerms>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type ListingTypeFilter = {
  description?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
}

export type ListingTypes = {
  __typename?: 'ListingTypes'
  description: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
}

export type ListingTypesPagination = {
  __typename?: 'ListingTypesPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<ListingTypes>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type Listings = {
  __typename?: 'Listings'
  address: Scalars['String']
  available_at?: Maybe<Scalars['Date']>
  bathrooms: Scalars['Float']
  bedrooms: Scalars['Int']
  city: Cities
  created_at: Scalars['DateTime']
  deposit?: Maybe<Scalars['Int']>
  description: Scalars['String']
  expire_at?: Maybe<Scalars['Date']>
  features?: Maybe<Scalars['Json']>
  id: Scalars['ID']
  initiator?: Maybe<ListingInitiator>
  lat: Scalars['Float']
  lng: Scalars['Float']
  media?: Maybe<Array<Maybe<ListingMedias>>>
  pets: Array<Maybe<Listing_Pets>>
  postal_code: Scalars['String']
  price?: Maybe<Scalars['Int']>
  square_feet?: Maybe<Scalars['Int']>
  status: Listing_Status
  term?: Maybe<ListingTerms>
  type: ListingTypes
  updated_at: Scalars['DateTime']
  user: Users
}

export type ListingsMediaArgs = {
  filter?: InputMaybe<ListingMediaFilter>
  sort?: InputMaybe<Sortable>
}

export type ListingsPagination = {
  __typename?: 'ListingsPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Listings>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  categoryDelete?: Maybe<Array<Maybe<Scalars['ID']>>>
  categoryUpsert?: Maybe<Categories>
  cityAliasDelete?: Maybe<Array<Maybe<Scalars['ID']>>>
  cityAliasUpsert?: Maybe<CityAliases>
  cityDelete?: Maybe<Array<Maybe<Scalars['ID']>>>
  cityUpsert?: Maybe<Cities>
  forgotPassword?: Maybe<ForgotPassword>
  listingDelete?: Maybe<Array<Maybe<Scalars['ID']>>>
  listingTermUpdate?: Maybe<ListingTerms>
  listingTypeUpdate?: Maybe<ListingTypes>
  listingUpsert?: Maybe<Listings>
  logIn?: Maybe<Auth>
  /** Method to logout, token must be sent in header */
  logOut?: Maybe<Scalars['String']>
  postDelete?: Maybe<Array<Maybe<Scalars['ID']>>>
  postUpsert?: Maybe<Posts>
  promoDelete?: Maybe<Array<Maybe<Scalars['ID']>>>
  promoUpsert?: Maybe<Promotions>
  roleDelete?: Maybe<Array<Maybe<Scalars['ID']>>>
  roleUpsert?: Maybe<Roles>
  signUp?: Maybe<SignUp>
  stateDelete?: Maybe<Array<Maybe<Scalars['ID']>>>
  stateUpsert?: Maybe<States>
  updateForgottenPassword?: Maybe<UpdateForgottenPassword>
  userCreate?: Maybe<Users>
  userUpdate?: Maybe<Users>
  userUpdatePassword?: Maybe<Users>
}

export type MutationCategoryDeleteArgs = {
  id: Array<InputMaybe<Scalars['ID']>>
}

export type MutationCategoryUpsertArgs = {
  id?: InputMaybe<Scalars['ID']>
  title: Scalars['String']
}

export type MutationCityAliasDeleteArgs = {
  id: Array<InputMaybe<Scalars['ID']>>
}

export type MutationCityAliasUpsertArgs = {
  city_id: Scalars['ID']
  id?: InputMaybe<Scalars['ID']>
  name: Scalars['String']
}

export type MutationCityDeleteArgs = {
  id: Array<InputMaybe<Scalars['ID']>>
}

export type MutationCityUpsertArgs = {
  id?: InputMaybe<Scalars['ID']>
  lat: Scalars['Float']
  lng: Scalars['Float']
  name: Scalars['String']
  state_id: Scalars['ID']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
  route_update_password: Scalars['String']
}

export type MutationListingDeleteArgs = {
  id: Array<InputMaybe<Scalars['ID']>>
}

export type MutationListingTermUpdateArgs = {
  description: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
}

export type MutationListingTypeUpdateArgs = {
  description: Scalars['String']
  id: Scalars['ID']
  name: Scalars['String']
}

export type MutationListingUpsertArgs = {
  address: Scalars['String']
  available_at?: InputMaybe<Scalars['Date']>
  bathrooms: Scalars['Float']
  bedrooms: Scalars['Int']
  city_id: Scalars['ID']
  deposit?: InputMaybe<Scalars['Int']>
  description: Scalars['String']
  expire_at: Scalars['Date']
  features: Scalars['Json']
  id?: InputMaybe<Scalars['ID']>
  lat: Scalars['Float']
  lng: Scalars['Float']
  pets: Array<InputMaybe<Listing_Pets>>
  postal_code: Scalars['String']
  price: Scalars['Int']
  square_feet: Scalars['Int']
  status: Listing_Status
  term_id?: InputMaybe<Scalars['ID']>
  type_id: Scalars['ID']
  user_id: Scalars['ID']
}

export type MutationLogInArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationPostDeleteArgs = {
  id: Array<InputMaybe<Scalars['ID']>>
}

export type MutationPostUpsertArgs = {
  category_id: Scalars['ID']
  content: Scalars['String']
  id?: InputMaybe<Scalars['ID']>
  image?: InputMaybe<Scalars['String']>
  meta_description?: InputMaybe<Scalars['String']>
  meta_keyword?: InputMaybe<Scalars['String']>
  meta_title?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  status: Post_Status
  title: Scalars['String']
}

export type MutationPromoDeleteArgs = {
  id: Array<InputMaybe<Scalars['ID']>>
}

export type MutationPromoUpsertArgs = {
  code: Scalars['String']
  description: Scalars['String']
  discount: Scalars['Int']
  expire_at: Scalars['Date']
  id?: InputMaybe<Scalars['ID']>
  rules: PromoRulesInput
  short_description: Scalars['String']
  use: Scalars['Int']
}

export type MutationRoleDeleteArgs = {
  id: Array<InputMaybe<Scalars['ID']>>
}

export type MutationRoleUpsertArgs = {
  description: Scalars['String']
  display_name: Scalars['String']
  id?: InputMaybe<Scalars['ID']>
  name: Scalars['String']
  permission_id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type MutationSignUpArgs = {
  address?: InputMaybe<Scalars['String']>
  city_id: Scalars['ID']
  email: Scalars['String']
  first_name: Scalars['String']
  last_name: Scalars['String']
  notify: Scalars['Boolean']
  password: Scalars['String']
  phone: Array<InputMaybe<Scalars['String']>>
  postal_code?: InputMaybe<Scalars['String']>
  route_login: Scalars['String']
}

export type MutationStateDeleteArgs = {
  id: Array<InputMaybe<Scalars['ID']>>
}

export type MutationStateUpsertArgs = {
  code?: InputMaybe<Scalars['String']>
  country_id: Scalars['ID']
  id?: InputMaybe<Scalars['ID']>
  name: Scalars['String']
}

export type MutationUpdateForgottenPasswordArgs = {
  password: Scalars['String']
  token: Scalars['String']
}

export type MutationUserCreateArgs = {
  address?: InputMaybe<Scalars['String']>
  city_id: Scalars['ID']
  email: Scalars['String']
  first_name: Scalars['String']
  last_name: Scalars['String']
  notify: Scalars['Boolean']
  password: Scalars['String']
  phone?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  postal_code?: InputMaybe<Scalars['String']>
  role_id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  status: User_Status
}

export type MutationUserUpdateArgs = {
  address?: InputMaybe<Scalars['String']>
  city_id: Scalars['ID']
  email: Scalars['String']
  first_name: Scalars['String']
  id: Scalars['ID']
  last_name: Scalars['String']
  notify: Scalars['Boolean']
  phone?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  postal_code?: InputMaybe<Scalars['String']>
  role_id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  status: User_Status
}

export type MutationUserUpdatePasswordArgs = {
  id: Scalars['ID']
  password: Scalars['String']
}

export type NumberRange = {
  /** empty */
  empty?: InputMaybe<Scalars['Boolean']>
  /** Greater than or equal */
  gte?: InputMaybe<Scalars['Int']>
  /** Less than or equal */
  lte?: InputMaybe<Scalars['Int']>
}

export type Pagination = {
  /** which page do you need? */
  page?: InputMaybe<Scalars['Int']>
  /** How many items do you need? */
  take?: InputMaybe<Scalars['Int']>
}

export type PermissionFilter = {
  created_at?: InputMaybe<Scalars['DateTime']>
  description?: InputMaybe<Scalars['String']>
  display_name?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['DateTime']>
}

export type Permissions = {
  __typename?: 'Permissions'
  created_at: Scalars['DateTime']
  description: Scalars['String']
  display_name: Scalars['String']
  id: Scalars['ID']
  /** System name is using by system */
  name: Scalars['String']
  updated_at: Scalars['DateTime']
}

export type PermissionsPagination = {
  __typename?: 'PermissionsPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Permissions>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type PostFilter = {
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  slug?: InputMaybe<Scalars['String']>
  status?: InputMaybe<Post_Status>
  title?: InputMaybe<Scalars['String']>
}

export type Posts = {
  __typename?: 'Posts'
  category: Categories
  content: Scalars['String']
  created_at: Scalars['DateTime']
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  meta_description?: Maybe<Scalars['String']>
  meta_keyword?: Maybe<Scalars['String']>
  meta_title?: Maybe<Scalars['String']>
  slug: Scalars['String']
  status: Post_Status
  title: Scalars['String']
  updated_at: Scalars['DateTime']
}

export type PostsPagination = {
  __typename?: 'PostsPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Posts>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type PromoFilter = {
  code?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  /** Date creating */
  created_at?: InputMaybe<DateTimeRange>
  discount?: InputMaybe<Scalars['Int']>
  expire_at?: InputMaybe<DateTimeRange>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type PromoRulesInput = {
  user_use_once: Scalars['Boolean']
}

export type PromotionRules = {
  __typename?: 'PromotionRules'
  user_use_once: Scalars['Boolean']
}

export type Promotions = {
  __typename?: 'Promotions'
  code: Scalars['String']
  created_at: Scalars['Date']
  description: Scalars['String']
  /** param in % */
  discount: Scalars['Int']
  expire_at: Scalars['Date']
  id: Scalars['ID']
  rules?: Maybe<PromotionRules>
  /** Appears on customers receipt. */
  short_description: Scalars['String']
  /** How many times this coupon can be used */
  use: Scalars['Int']
}

export type PromotionsPagination = {
  __typename?: 'PromotionsPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Promotions>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  /** A query of categories */
  categories?: Maybe<CategoriesPagination>
  /** A query of cities */
  cities?: Maybe<CitiesPagination>
  /** A query of city aliases */
  city_aliases?: Maybe<CityAliasesPagination>
  /** A query of companies */
  companies?: Maybe<CompaniesPagination>
  /** A query of Countries */
  countries?: Maybe<CountriesPagination>
  /** A query of listing features */
  listing_features?: Maybe<Type>
  /** A query of listing terms */
  listing_terms?: Maybe<ListingTermsPagination>
  /** A query of listing types */
  listing_types?: Maybe<ListingTypesPagination>
  /** A query of listings */
  listings?: Maybe<ListingsPagination>
  /** A query of permissions */
  permissions?: Maybe<PermissionsPagination>
  /** A query of posts */
  posts?: Maybe<PostsPagination>
  /** A query of promotions */
  promotions?: Maybe<PromotionsPagination>
  /** A query of roles */
  roles?: Maybe<RolesPagination>
  /** A query of states */
  states?: Maybe<StatesPagination>
  /** A query of users */
  users?: Maybe<UsersPagination>
}

export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoryFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryCitiesArgs = {
  filter?: InputMaybe<CityFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryCity_AliasesArgs = {
  filter?: InputMaybe<CityAliasFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryCompaniesArgs = {
  filter?: InputMaybe<CompanyFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryCountriesArgs = {
  filter?: InputMaybe<CountryFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryListing_TermsArgs = {
  filter?: InputMaybe<ListingTermFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryListing_TypesArgs = {
  filter?: InputMaybe<ListingTypeFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryListingsArgs = {
  filter?: InputMaybe<ListingFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryPermissionsArgs = {
  filter?: InputMaybe<PermissionFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryPostsArgs = {
  filter?: InputMaybe<PostFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryPromotionsArgs = {
  filter?: InputMaybe<PromoFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryRolesArgs = {
  filter?: InputMaybe<RoleFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryStatesArgs = {
  filter?: InputMaybe<StateFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>
  pagination?: InputMaybe<Pagination>
  sort?: InputMaybe<Sortable>
}

export enum ResponseStatus {
  Error = 'error',
  Success = 'success',
}

export type RoleFilter = {
  created_at?: InputMaybe<Scalars['DateTime']>
  display_name?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['DateTime']>
}

export type Roles = {
  __typename?: 'Roles'
  created_at: Scalars['DateTime']
  description: Scalars['String']
  display_name: Scalars['String']
  id: Scalars['ID']
  /** System name is using by system */
  name: Scalars['String']
  /** The permission of the role */
  permissions?: Maybe<Array<Maybe<Permissions>>>
  updated_at: Scalars['DateTime']
  /** The type of the user */
  users?: Maybe<Array<Maybe<Users>>>
}

export type RolesPermissionsArgs = {
  filter?: InputMaybe<PermissionFilter>
  sort?: InputMaybe<Sortable>
}

export type RolesUsersArgs = {
  filter?: InputMaybe<UserFilter>
  sort?: InputMaybe<Sortable>
}

export type RolesPagination = {
  __typename?: 'RolesPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Roles>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Sortable = {
  /** Write one of existing field current object */
  sort_by?: InputMaybe<Scalars['String']>
  /** Choose sorting type */
  type?: InputMaybe<SortDirection>
}

export type StateFilter = {
  code?: InputMaybe<Scalars['String']>
  country_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  name?: InputMaybe<Scalars['String']>
}

export type States = {
  __typename?: 'States'
  code?: Maybe<Scalars['String']>
  country: Countries
  id: Scalars['ID']
  name: Scalars['String']
}

export type StatesPagination = {
  __typename?: 'StatesPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<States>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type Type = {
  __typename?: 'Type'
  accessibility?: Maybe<Array<Maybe<Accessibility>>>
  amenities?: Maybe<Array<Maybe<Amenities>>>
  utilities?: Maybe<Array<Maybe<Utilities>>>
}

export type UserFilter = {
  city_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  country_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  /** Date creating user */
  created_at?: InputMaybe<DateTimeRange>
  email?: InputMaybe<Scalars['String']>
  first_name?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  last_name?: InputMaybe<Scalars['String']>
  notify?: InputMaybe<Scalars['Boolean']>
  phone?: InputMaybe<Scalars['String']>
  role_names?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  state_ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  status?: InputMaybe<User_Status>
  /** Date updating user */
  updated_at?: InputMaybe<DateTimeRange>
}

export type Users = {
  __typename?: 'Users'
  address?: Maybe<Scalars['String']>
  city?: Maybe<Cities>
  created_at: Scalars['DateTime']
  email: Scalars['String']
  /** Date verified email */
  email_verified_at?: Maybe<Scalars['DateTime']>
  first_name: Scalars['String']
  id: Scalars['ID']
  last_name: Scalars['String']
  notify: Scalars['Boolean']
  phone?: Maybe<Array<Maybe<Scalars['String']>>>
  postal_code?: Maybe<Scalars['String']>
  roles?: Maybe<Array<Maybe<Roles>>>
  status: User_Status
  updated_at: Scalars['DateTime']
}

export type UsersRolesArgs = {
  filter?: InputMaybe<RoleFilter>
  sort?: InputMaybe<Sortable>
}

export type UsersPagination = {
  __typename?: 'UsersPagination'
  /** Current page of the cursor */
  current_page: Scalars['Int']
  data?: Maybe<Array<Maybe<Users>>>
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>
  /** Does it have next page */
  hasMorePages?: Maybe<Scalars['Boolean']>
  /** Does it have any page */
  hasPages?: Maybe<Scalars['Boolean']>
  /** Number of the last page returned */
  lastPage?: Maybe<Scalars['Int']>
  /** Number of items returned per page */
  per_page: Scalars['Int']
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>
  /** Number of total items selected by the query */
  total: Scalars['Int']
}

export type Accessibility = {
  __typename?: 'accessibility'
  desc?: Maybe<Scalars['String']>
}

export type Amenities = {
  __typename?: 'amenities'
  desc?: Maybe<Scalars['String']>
}

export enum Company_Status {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Inactive = 'INACTIVE',
}

export type ForgotPassword = {
  __typename?: 'forgotPassword'
  message?: Maybe<Scalars['String']>
  status: ResponseStatus
}

export enum Listing_Media_Status {
  Modified = 'MODIFIED',
  NotModified = 'NOT_MODIFIED',
}

export enum Listing_Media_Type {
  Img = 'IMG',
  Video = 'VIDEO',
}

export enum Listing_Pets {
  Cats = 'CATS',
  LargeDogs = 'LARGE_DOGS',
  NoAllowed = 'NO_ALLOWED',
  SmallDogs = 'SMALL_DOGS',
}

export enum Listing_Status {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Expired = 'EXPIRED',
  Moderating = 'MODERATING',
  PaymentPending = 'PAYMENT_PENDING',
  Rented = 'RENTED',
}

export enum Post_Status {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
}

export type SignUp = {
  __typename?: 'signUp'
  message?: Maybe<Scalars['String']>
  status: ResponseStatus
}

export type UpdateForgottenPassword = {
  __typename?: 'updateForgottenPassword'
  message?: Maybe<Scalars['String']>
  status: ResponseStatus
}

export enum User_Status {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
}

export type Utilities = {
  __typename?: 'utilities'
  desc?: Maybe<Scalars['String']>
}
