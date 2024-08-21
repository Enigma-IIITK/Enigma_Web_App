import firebase_app from "../firebase/config";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app)
export default async function getDoument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}


export const getData = async (collectionName) => {
    try{
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    }
    catch(err){
        console.log(err);
        return err;
    }
};