export const mockPosts = [
  {
    id: 1,
    description: "Красивый закат в Москве",
    location: "Москва",
    images: [
      {
        url: "https://example.com/post1.jpg",
        width: 1200,
        height: 800,
      },
    ],
    owner: {
      id: 1,
      firstName: "Иван",
      lastName: "Иванов",
      userName: "testuser1",
    },
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: 2,
    description: "Прогулка по Невскому проспекту",
    location: "Санкт-Петербург",
    images: [
      {
        url: "https://example.com/post2.jpg",
        width: 1200,
        height: 800,
      },
    ],
    owner: {
      id: 2,
      firstName: "Петр",
      lastName: "Петров",
      userName: "testuser2",
    },
    createdAt: "2024-01-16T12:30:00.000Z",
    updatedAt: "2024-01-16T12:30:00.000Z",
  },
  {
    id: 3,
    description: "Кремль в Казани",
    location: "Казань",
    images: [
      {
        url: "https://example.com/post3.jpg",
        width: 1200,
        height: 800,
      },
    ],
    owner: {
      id: 3,
      firstName: "Мария",
      lastName: "Сидорова",
      userName: "testuser3",
    },
    createdAt: "2024-01-17T15:45:00.000Z",
    updatedAt: "2024-01-17T15:45:00.000Z",
  },
  {
    id: 4,
    description: "Вечерняя Москва",
    location: "Москва",
    images: [
      {
        url: "https://example.com/post4.jpg",
        width: 1200,
        height: 800,
      },
    ],
    owner: {
      id: 1,
      firstName: "Иван",
      lastName: "Иванов",
      userName: "testuser1",
    },
    createdAt: "2024-01-18T18:00:00.000Z",
    updatedAt: "2024-01-18T18:00:00.000Z",
  },
]

export const getLatestPosts = (pageSize: number = 4) => {
  return mockPosts.slice(0, pageSize)
}
