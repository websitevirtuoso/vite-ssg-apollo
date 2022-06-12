import { defineAbility } from '@casl/ability'
import { User, Role, Permission, AbilityPermission } from './types'

const ability = defineAbility((can) => {
  // if exist user then parse it
  const user = localStorage.getItem('user')
  if (user) {
    parseUserPermissions(JSON.parse(user)).forEach((item) => can(item.permission, item.subject))
  } else {
    throw new Error("LocalStorage doesn't have value for user")
  }
})

/**
 * Define permission to system
 * @param permissions array ex ['user.view', 'role.view']
 */
// todo this update may not work properly
export function setPermissions(permissions: AbilityPermission[]) {
  ability.can(permissions)
}

export function parseUserPermissions(user: User) {
  const permissions: AbilityPermission[] = []
  user.roles.forEach((role: Role) =>
    role.permissions.forEach((permission: Permission) => {
      const [subject, perm] = permission.name.split('.')
      permissions.push({ subject, permission: perm })
    })
  )
  return permissions
}

export default ability
