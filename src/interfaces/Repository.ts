
export interface Repository {
  id: number;
  name: string;
  description?: string;
  language?: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const repositoryList: Repository[] = [
  {
    id: 1,
    name: "react-dashboard",
    owner: {
      login: "demo-user",
      avatar_url: "https://avatars.githubusercontent.com/u/48026030?v=4",
    },
    description:
      "Un panel de control de administración moderno construido con React y Tailwind.",
    language: "TypeScript",
  },
  {
    id: 2,
    name: "fastapi-backend",
    owner: {
      login: "demo-user",
      avatar_url: "https://avatars.githubusercontent.com/u/48026030?v=4",
    },
    description:
      "API REST de alto rendimiento para el manejo de usuarios y autenticación.",
    language: "Python",
  },
  {
    id: 3,
    name: "awesome-utils",
    owner: {
      login: "demo-user",
      avatar_url: "https://avatars.githubusercontent.com/u/48026030?v=4",
    },
    description:
      "Colección de funciones utilitarias para el día a día en JavaScript.",
    language: "JavaScript",
  },
  {
    id: 4,
    name: "flutter-ecommerce",
    owner: {
      login: "demo-user",
      avatar_url: "https://avatars.githubusercontent.com/u/48026030?v=4",
    },
    description:
      "Aplicación móvil de comercio electrónico con soporte para iOS y Android.",
    language: "Dart",
  },
  {
    id: 5,
    name: "rust-game-engine",
    owner: {
      login: "demo-user",
      avatar_url: "https://avatars.githubusercontent.com/u/16384?v=4",
    },
    description:
      "Motor de videojuegos 2D enfocado en rendimiento y seguridad.",
    language: "Rust",
  },
];
