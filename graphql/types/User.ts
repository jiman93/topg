import { enumType, objectType } from 'nexus';
import { Link } from './Link';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
  },
});

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
});
