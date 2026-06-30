import React, { useRef, useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";

import "./Tab1.css";
import { pencil, trash } from "ionicons/icons";
import { deleteRepository, fetchRepositories, updateRepository } from "../../services/GithubService";
import type { Repository } from "../interfaces/Repository";
import LoginSpinner from "../components/LoginSpinner";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [repoToDelete, setRepoToDelete] = useState<Repository | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const [repoToEdit, setRepoToEdit] = useState<Repository | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<{ name: string; description: string }>({ name: "", description: "" });
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [editError, setEditError] = useState<string>("");

  const listRef = useRef<HTMLIonListElement>(null);
  const [presentToast] = useIonToast();

  const fetchRepos = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const repos = await fetchRepositories();
      setRepositoryList(repos);
    } catch (error) {
      setErrorMsg("Error obteniendo repositorios: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  const openDeleteAlert = (repo: Repository) => {
    listRef.current?.closeSlidingItems();
    setRepoToDelete(repo);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = async () => {
    if (!repoToDelete) return;
    try {
      await deleteRepository(repoToDelete.owner.login, repoToDelete.name);
      setRepositoryList((prev) => prev.filter((r) => r.id !== repoToDelete.id));
      presentToast({ message: `Repositorio "${repoToDelete.name}" eliminado`, duration: 2000, color: "success" });
    } catch (error) {
      presentToast({ message: "Error al eliminar: " + (error as Error).message, duration: 3000, color: "danger" });
    } finally {
      setRepoToDelete(null);
    }
  };

  const openEditModal = (repo: Repository) => {
    listRef.current?.closeSlidingItems();
    setRepoToEdit(repo);
    setEditData({ name: repo.name, description: repo.description ?? "" });
    setEditError("");
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    if (!repoToEdit) return;
    if (editData.name.trim() === "") {
      setEditError("El nombre del repositorio es requerido");
      return;
    }
    setEditLoading(true);
    setEditError("");
    try {
      const updated = await updateRepository(repoToEdit.owner.login, repoToEdit.name, {
        name: editData.name.trim(),
        description: editData.description,
      });
      setRepositoryList((prev) => prev.map((r) => (r.id === repoToEdit.id ? updated : r)));
      setShowEditModal(false);
      presentToast({ message: `Repositorio actualizado correctamente`, duration: 2000, color: "success" });
    } catch (error) {
      setEditError("Error al actualizar: " + (error as Error).message);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {loading ? (
          <LoginSpinner />
        ) : errorMsg ? (
          <p style={{ color: "red", padding: "1rem" }}>{errorMsg}</p>
        ) : (
          <IonList ref={listRef}>
            {repositoryList.map((repo) => (
              <IonItemSliding key={repo.id}>
                <IonItem>
                  <IonThumbnail slot="start">
                    <img src={repo.owner.avatar_url} alt="Avatar" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>{repo.name}</h2>
                    <p>{repo.description}</p>
                    <p>
                      <strong>Lenguaje:</strong> {repo.language}
                    </p>
                  </IonLabel>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption onClick={() => openEditModal(repo)}>
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonItemOption>
                  <IonItemOption color="danger" onClick={() => openDeleteAlert(repo)}>
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>

      <IonAlert
        isOpen={showDeleteAlert}
        header="Eliminar repositorio"
        message={`¿Estás seguro que deseas eliminar "${repoToDelete?.name}"? Esta acción no se puede deshacer.`}
        buttons={[
          { text: "Cancelar", role: "cancel", handler: () => setRepoToDelete(null) },
          { text: "Eliminar", role: "destructive", handler: handleDeleteConfirm },
        ]}
        onDidDismiss={() => setShowDeleteAlert(false)}
      />

      <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar Repositorio</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowEditModal(false)}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="form-container">
            <IonInput
              className="form-field"
              label="Nombre del repositorio"
              labelPlacement="floating"
              value={editData.name}
              onIonChange={(e) => setEditData({ ...editData, name: e.detail.value! })}
            />
            <IonTextarea
              className="form-field"
              label="Descripción del repositorio"
              labelPlacement="floating"
              value={editData.description}
              onIonChange={(e) => setEditData({ ...editData, description: e.detail.value! })}
              rows={4}
            />
            {editError && <IonText color="danger"><p>{editError}</p></IonText>}
            <IonButton
              className="submit-button"
              expand="block"
              fill="solid"
              disabled={editLoading}
              onClick={handleEditSave}
            >
              {editLoading ? "Guardando..." : "Guardar cambios"}
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Tab1;
