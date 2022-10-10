import { defineAbility } from '@casl/ability'
import { User, Role, Permission, AbilityPermission } from './types'
// import router from '@/plugins/router'

const ability = defineAbility((can) => {
  // if exist user then parse it
  // const user = localStorage.getItem('user')
  // if (user) {
  //   parseUserPermissions(JSON.parse(user)).forEach((item) => can(item.permission, item.subject))
  // } else {
  //   // todo call notification plugin and add message - 'Please authenticate'
  //   // router.push({ name: 'login' })
  // }
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
