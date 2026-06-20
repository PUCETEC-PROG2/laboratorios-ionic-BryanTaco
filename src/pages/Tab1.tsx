import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import "./Tab1.css";
import { pencil, trash } from "ionicons/icons";

const Tab1: React.FC = () => {
  const [repositorylist, setRepositoryList] = React.useState<Repository[]>([]);

  const fetchRepos = async () => {
    try {
      const repos = await fetchRepositories();
       setRepositoryList(repos);
    } catch (error) {
      console.error("Error obteniendo repositorios", error);
    }
  };

  useIonViewWillEnter (() => {
    fetchRepos();
  });

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {repositorios.map((repo, index) => (
            <IonItemSliding key={index}>
              <IonItem>
                <IonThumbnail slot="start">
                  <img src={repo.avatar} alt="Avatar" />
                </IonThumbnail>

                <IonLabel>
                  <h2>{repo.nombre}</h2>
                  <p>{repo.descripcion}</p>
                  <p>
                    <strong>Lenguaje:</strong> {repo.lenguaje}
                  </p>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption>
                  <IonIcon icon={pencil} slot="icon-only" />
                </IonItemOption>

                <IonItemOption color="danger">
                  <IonIcon icon={trash} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

type Repository = {
  nombre: string;
  descripcion: string;
  lenguaje: string;
  avatar: string;
};

async function fetchRepositories(): Promise<Repository[]> {
  const apiUrl = "https://api.example.com/repositories";

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data.map((repo: any) => ({
    nombre: repo.name,
    descripcion: repo.description,
    lenguaje: repo.language,
    avatar: repo.owner.avatar_url,
  }));
}

export default Tab1;