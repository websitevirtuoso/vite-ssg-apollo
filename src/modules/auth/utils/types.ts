export interface Permission {
  id: string
  name: string
}

export interface Role {
  id: string
  name: string
  display_name: string
  permissions: Permission[]
}

export interface User {
  id: string
  first_name: string
  last_name: string
  roles: Role[]
}

export interface AbilityPermission {
  permission: string
  subject: string
}
