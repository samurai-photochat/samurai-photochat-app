export const mockUsers = [
  {
    id: 1,
    userName: "testuser1",
    firstName: "Иван",
    lastName: "Иванов",
    city: "Москва",
    dateOfBirth: "1990-01-01",
    aboutMe: "Тестовый пользователь 1",
    avatars: [
      {
        url: "https://example.com/avatar1.jpg",
        width: 200,
        height: 200,
      },
    ],
  },
  {
    id: 2,
    userName: "testuser2",
    firstName: "Петр",
    lastName: "Петров",
    city: "Санкт-Петербург",
    dateOfBirth: "1992-05-15",
    aboutMe: "Тестовый пользователь 2",
    avatars: [
      {
        url: "https://example.com/avatar2.jpg",
        width: 200,
        height: 200,
      },
    ],
  },
  {
    id: 3,
    userName: "testuser3",
    firstName: "Мария",
    lastName: "Сидорова",
    city: "Казань",
    dateOfBirth: "1995-08-20",
    aboutMe: "Тестовый пользователь 3",
    avatars: [
      {
        url: "https://example.com/avatar3.jpg",
        width: 200,
        height: 200,
      },
    ],
  },
]

export const getTotalUsersCount = () => mockUsers.length
