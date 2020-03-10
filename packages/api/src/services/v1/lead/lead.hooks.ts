import { disallow } from 'feathers-hooks-common';

const hooks = {
  before: {
    all: [],
    create: [],
    find: [disallow()],
    get: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
    update: [disallow()]
  },

  after: {
    all: [],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  },

  error: {
    all: [],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  }
};

export { hooks };
