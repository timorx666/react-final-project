import http from "./httpService";
import { apiUrl } from "../config.json";

export async function createCard(card) {
    return await http.post(`${apiUrl}/cards`, card);
}

export async function getMyCards() {
    return await http.get(`${apiUrl}/cards/my-cards`)
}

export async function getCard(cardId) {
    return await http.get(`${apiUrl}/cards/${cardId}`)
}

export async function editCard(card) {
    const cardId = card._id;
    delete card._id;
    return await http.put(`${apiUrl}/cards/${cardId}`, card);
}

export async function deleteCard(cardId) {
    return await http.delete(`${apiUrl}/cards/${cardId}`);
}

export async function getAllCards(){
    return await http.get(`${apiUrl}/cards/all-cards`);
}

export default {
    createCard,
    getMyCards,
    getCard,
    editCard,
    deleteCard,
    getAllCards,
};