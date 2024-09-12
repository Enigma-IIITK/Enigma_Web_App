// db.js or firebase.js (depending on your project structure)
import firebase_app from "../firebase/config";
import { getFirestore, doc,orderBy ,setDoc, getDoc, getDocs, updateDoc, query, where,collection,addDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const db = getFirestore(firebase_app);
const storage = getStorage(firebase_app);

export default async function addData(collection_name, id, data, check = false) {
    let result = null;
    let error = null;

    if (check) {
        try {
            
            const q =  query(collection(db, "members"), where("email", "==", data.email));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            if (!querySnapshot.empty) {
                data.member = true;
            } else {
                data.member = false;
            }
        } catch (e) {
            error = e;
            //return { result, error };
            data.member = false;
        }
        data.admin = false;
    }

    try {
        result = await setDoc(doc(db, collection_name, id), data, {
            merge: true,
        });
    } catch (e) {
        console.log(e)
        error = e;
    }

    return { result, error,data };
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

export const editTeamData = async (itemId, data) => {
    try {
        await updateDoc(doc(db, "team", itemId), data);
        return { result: { id: itemId }, error: null };
    } catch (error) {
        return { result: null, error };
    }
};

export const addBlog = async (blog) => {
    try {
      const docRef = await addDoc(collection(db, "Blogs"), blog);
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  };


export const getBlog = async (title) =>{
    const result = [];
    let error = null;
    try{
        const q = query(collection(db, "Blogs"), where("title", "==", title));
        console.log(q)
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        console.log(result)
    }
    catch (e) {
        console.error("Error getting documents: ", e);
        error = e;
    }

    return { result, error };
}

export const topBlogs = async () => {
    const result = [];
    let error = null;
    try {
      // Query Firestore for the top 10 blogs based on creation date
      const q = query(
        collection(db, "Blogs") // Changed limit to 10
      );
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.error("Error getting top blogs: ", err);
      return { result, err };
    }
  
    return { result, error };
  };
  