import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:9010/inventory";

class UserService {

    GetPeminjam(){
        return axios.get(USER_API_BASE_URL);
    }

    CreatePeminjam(peminjam){
        return axios.post(USER_API_BASE_URL, peminjam);
    }

    GetPeminjamById(peminjamId){
        return axios.get(USER_API_BASE_URL + '/' + peminjamId);
    }

    UpdatePeminjam(peminjam, peminjamId){
        return axios.put(USER_API_BASE_URL + '/' + peminjamId, peminjam);
    }

    DeletePeminjam(peminjamId){
        return axios.delete(USER_API_BASE_URL + '/' + peminjamId);
    }
}

export default new UserService()