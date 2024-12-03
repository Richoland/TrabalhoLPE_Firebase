import { auth, db } from "../../firebaseConfig";
import {
  doc,
  addDoc,
  collection,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

export const getTasksFirebase = async (setListaObjetos) => {
  try {
    const q = query(collection(db, "tasks"));
    onSnapshot(q, (querySnapshot) => {
      setListaObjetos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          titulo: doc.data().titulo,
          texto: doc.data().texto,
          uid: doc.data().uid,
          usuario: doc.data().usuario,
          prazo: doc.data().prazo,
        }))
      );
    });
  } catch (err) {
    throw err;
  }
};

export const getTasksUIDFirebase = async (uid, setListaObjetos) => {
  try {
    const colRef = collection(db, "tasks");
    const q = query(colRef, where("uid", "==", uid));
    onSnapshot(q, (querySnapshot) => {
      setListaObjetos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          titulo: doc.data().titulo,
          texto: doc.data().texto,
          uid: doc.data().uid,
          usuario: doc.data().usuario,
          prazo: doc.data().prazo,
        }))
      );
    });
  } catch (err) {
    throw err;
  }
};

export const deleteTaskFirebase = async (objeto) => {
  try {
    const taskDocRef = doc(db, "tasks", objeto.id);
    await deleteDoc(taskDocRef);
  } catch (err) {
    throw err;
  }
};

export const addTaskFirebase = async (objeto) => {
  try {
    let ret = await addDoc(collection(db, "tasks"), {
      titulo: objeto.titulo,
      texto: objeto.texto,
      uid: objeto.uid,
      usuario: objeto.usuario,
      prazo: objeto.prazo,
    }).then(function (docRef) {
      objeto = { ...objeto, id: docRef.id };
      return objeto;
    });
    return ret;
  } catch (err) {
    throw err;
  }
};

export const updateTaskFirebase = async (objeto) => {
  try {
    const taskDocRef = doc(db, "tasks", objeto.id);
    await updateDoc(taskDocRef, {
      titulo: objeto.titulo,
      texto: objeto.texto,
      uid: objeto.uid,
      usuario: objeto.usuario,
      prazo: objeto.prazo,
    });
  } catch (err) {
    throw err;
  }
};
