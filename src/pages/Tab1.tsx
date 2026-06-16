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
} from "@ionic/react";

import "./Tab1.css";
import { pencil, trash } from "ionicons/icons";

const repositorios = [
  {
    nombre: "React Dashboard",
    descripcion: "Panel administrativo moderno construido con React.",
    lenguaje: "TypeScript",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    nombre: "FastAPI Backend",
    descripcion: "API REST para autenticación y gestión de usuarios.",
    lenguaje: "Python",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    nombre: "Awesome Utils",
    descripcion: "Colección de utilidades para JavaScript.",
    lenguaje: "JavaScript",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    nombre: "Flutter Ecommerce",
    descripcion: "Aplicación móvil para comercio electrónico.",
    lenguaje: "Dart",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    nombre: "Rust Game Engine",
    descripcion: "Motor de videojuegos 2D enfocado en rendimiento.",
    lenguaje: "Rust",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

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

export default Tab1;