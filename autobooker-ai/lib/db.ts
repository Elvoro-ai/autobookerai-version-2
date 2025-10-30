// Mock database for MVP deployment
export const db = {
  availability: {
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve({ id: 1, ...data }),
    update: (params: any) => Promise.resolve({ id: params.where.id, ...params.data }),
    delete: (params: any) => Promise.resolve({ id: params.where.id })
  },
  appointment: {
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve({ id: 1, ...data }),
    update: (params: any) => Promise.resolve({ id: params.where.id, ...params.data }),
    delete: (params: any) => Promise.resolve({ id: params.where.id })
  }
};
