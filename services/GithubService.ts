import axios from 'axios';
import type { Repository } from '../src/interfaces/Repository';

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL as unknown as string | undefined;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN as unknown as string | undefined;

type GithubRepo = {
  id: number;
  name: string;
  description?: string | null;
  language?: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    if (!GITHUB_API_URL || !GITHUB_API_TOKEN) {
      console.error('Faltan VITE_GITHUB_API_URL o VITE_GITHUB_API_TOKEN');
      return [];
    }

    const response = await axios.get<GithubRepo[]>(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error obteniendo repositorios: ${response.statusText}`);
    }

    return (response.data ?? []).map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description ?? undefined,
      language: repo.language ?? undefined,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
      },
    }));
  } catch (error) {
    console.error('Error obteniendo repositorios:', error);
    return [];
  }
};


