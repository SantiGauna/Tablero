// src/services/repuestosService.js
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from '../firebaseConfig';

const repuestosCollection = collection(db, 'Repuestos'); 

export const fetchRepuestos = async () => {
  try {
    const snapshot = await getDocs(repuestosCollection);
    const repuestosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return repuestosList;
  } catch (error) {
    console.error("Error fetching repuestos:", error);
    throw error;
  }
};

export const fetchRepuesto = async (id) => {
  const repuestoDoc = await getDoc(doc(repuestosCollection, id));
  return { id: repuestoDoc.id, ...repuestoDoc.data() };
};

export const createRepuesto = async (repuesto) => {
  repuesto.Fecha_Alta = Timestamp.fromDate(new Date(repuesto.Fecha_Alta));
  const docRef = await addDoc(repuestosCollection, repuesto);
  return { id: docRef.id, ...repuesto };
};

export const updateRepuesto = async (id, repuesto) => {
  repuesto.Fecha_Alta = Timestamp.fromDate(new Date()); 
  const repuestoDoc = doc(repuestosCollection, id);
  await updateDoc(repuestoDoc, repuesto);
  return { id, ...repuesto };
};


export const deleteRepuesto = async (id) => {
  const repuestoDoc = doc(repuestosCollection, id);
  await deleteDoc(repuestoDoc);
};
