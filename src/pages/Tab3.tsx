import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil del Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard className="card">
            <img src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Foto de Perfil"
              />
              <IonCardHeader>
                <IonCardTitle>Bryan Taco</IonCardTitle>
                <IonCardSubtitle>BryanTaco</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>DESARROLLADOR DE SOFTWARE</p>
                <p>Adicto a las Apuestas Deportivas y faltar a clase</p>
              </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
