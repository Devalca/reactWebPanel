import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBt4od9EVTpQErLWYRq8Z7dihbpyQFVVoc",
    authDomain: "evote-3eb91.firebaseapp.com",
    databaseURL: "https://evote-3eb91.firebaseio.com",
    projectId: "evote-3eb91",
    storageBucket: "evote-3eb91.appspot.com",
    messagingSenderId: "101778515866",
    appId: "1:101778515866:web:8b0c6cc411063259d13c23"
};

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
		this.upload = app.storage()
	}

	getUpload() {
		const storage = app.storage();
		return storage
	}

	async login(email, password) {
		await this.auth.signInWithEmailAndPassword(email, password)
		if (!this.auth.currentUser) {
		const status = await this.db.doc(`status/${this.auth.currentUser.uid}`).get()
		if (!status) {
			return status.get('status')
		}
		return null
		} return null
	}

	logout() {
		return this.auth.signOut()
	}

	async register(nama, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: nama,
		})
	}

	addCalon(nama, nim, prodi, angkatan, nourut, detail2, visi, misi, foto, hasil) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.collection(`calon`).add({
			nama, nim, prodi, angkatan, nourut, detail2, visi, misi, foto, hasil
		})
	}

	addUser(nama, nim, prodi, email) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
			nama, nim, prodi, email
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentAdmin() {
		if(this.auth.currentUser) {
			const status = await this.db.doc(`status/${this.auth.currentUser.uid}`).get()
			return status.get('status')
			
		}
	}
}

export default new Firebase()