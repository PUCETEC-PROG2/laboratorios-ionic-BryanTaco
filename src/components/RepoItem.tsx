import {
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonThumbnail,
    IonLabel,
    IonIcon,
  } from '@ionic/react';
  
  import { pencil, trash } from 'ionicons/icons';
  
  interface Repository {
    name: string;
    description: string;
    language: string;
    avatarUrl: string;
  }
  
  const RepoItem: React.FC<Repository> = (repository) => {
    return (
      <IonItemSliding>
        <IonItem>
          <IonThumbnail slot="start">
            <img
              src={repository.avatarUrl}
              alt="Avatar"
            />
          </IonThumbnail>
  
          <IonLabel>
            <h3>{repository.name}</h3>
            <p>{repository.description}</p>
            <strong>Lenguaje:</strong> {repository.language}
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
    );
  };
  
  export default RepoItem;