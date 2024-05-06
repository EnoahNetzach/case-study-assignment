import { components as Components } from '../api.gen'
import { randomUUID } from 'node:crypto'

type User = Components['schemas']['User']

export const db: User[] = [
  {
    id: randomUUID(),
    username: 'theUser',
    firstName: 'John',
    lastName: 'James',
    email: 'john@email.com',
    profile: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
  },
]

export async function getMe() {
  return db[0]
}
