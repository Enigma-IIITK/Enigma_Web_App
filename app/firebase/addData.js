// db.js or firebase.js (depending on your project structure)
import firebase_app from "../firebase/config";
import { getFirestore, doc, setDoc, getDoc, getDocs, updateDoc, query, where,collection,addDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore(firebase_app);
const storage = getStorage(firebase_app);

export default async function addData(collection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getData(collection, id) {
    let result = null;
    let error = null;

    try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            result = docSnap.data();
        } else {
            throw new Error("No such document!");
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function updateData(collection, id, data) {
    let result = null;
    let error = null;

    try {
        const docRef = doc(db, collection, id);
        result = await updateDoc(docRef, data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getTeamData(year) {
    let result = [];
    let error = null;

    try {
        const q = query(collection(db, "team"), where("year", "==", year));
        console.log(q)
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
        error = e;
    }

    return { result, error };
}

export async function updateTeamPhoto(itemId, file) {
    let error = null;

    try {
        const storageRef = ref(storage, `team/${itemId}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        
        const itemRef = doc(db, "team", itemId);
        await updateDoc(itemRef, { path: downloadURL });
    } catch (e) {
        console.error("Error uploading file: ", e);
        error = e;
    }

    return { error };
}

// db.js or firebase.js
export async function getMemberData() {
    let result = [];
    let error = null;

    try {
        const q = query(collection(db, "members")); // Ensure the query is correct
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
        error = e;
    }

    return { result, error };
}


export async function adddata(collectionName, data,id=null) {
    let result = {};
    let error = null;

    try {
        if(id==null){
            result = await setDoc(doc(collection(db, collectionName)), data);
            
        }
        else{
            result = await setDoc(doc(collection(db, collectionName),id), data)
        }
        
    } catch (e) {
        console.error("Error adding document: ", e);
        error = e;
    }

    return { result, error };
}

export  async function addTeamData(collectionName, data, id = null) {
    let result = {};
    let error = null;

    try {
        if (id === null) {
            const docRef = await addDoc(collection(db, collectionName), data);
            result = { id: docRef.id };
        } else {
            await setDoc(doc(db, collectionName, id), data);
            result = { id: id };
        }
    } catch (e) {
        console.error("Error adding document: ", e);
        error = e;
    }

    return { result, error };
}

