import { Injectable } from '@angular/core';
import { Firestore, CollectionReference, collectionData, collection, getDocs, getDoc,addDoc, doc , DocumentData, setDoc} from '@angular/fire/firestore';
import { FirebaseStorage, Storage, getStorage, ref, uploadBytes, listAll,getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseCommunicationService {

  cardCollection: CollectionReference<any>;


  constructor(private afs: Firestore, private db: Storage) {
    this.cardCollection = collection(afs, 'card')
  }

  public getCardCollectionObservable(): Observable<any[]> {
    return collectionData(this.cardCollection)
  }



  uploadCardPicture(cardId: string, image: any, type: string) {
    let path = `card/${type}/${cardId}`
    let storage = getStorage(this.db.app)
    let storateReference = ref(storage, path)
    return uploadBytes(storateReference, image)
  }
  getCardImageURL(cardId: string, size: string) {
    let path = `card/${size}/${cardId}`
    let storage = getStorage(this.db.app)
    let storateReference = ref(storage, path)
    return getDownloadURL(storateReference);
  }

  getBackgroundImageURL(orientation: string, id: string) {
    let path = `background/${orientation}/${id}`;
    let storage = getStorage(this.db.app)
    let storateReference = ref(storage, path)
    return getDownloadURL(storateReference);
  }
  listBackgroundImages() {
    let path = `background/normal`;
    let storage = getStorage(this.db.app)
    let storateReference = ref(storage, path)
    return listAll(storateReference)
  }
  listCardImages() {
    let path = `card/small`;
    let storage = getStorage(this.db.app)
    let storateReference = ref(storage, path)
    return listAll(storateReference)
  }
  listCardDocs() {
    return getDocs(this.cardCollection);
}

  addCard(cardNum: string, cardContent: DocumentData) {
    let docRef = doc(this.afs,'card',cardNum)
    setDoc(docRef,cardContent)

  }
  getCard(cardNum: string) {
    let docRef = doc(this.afs,'card',cardNum)

    return getDoc(docRef)
  }


}
