let API_URL = "https://api.green-api.com";

class GreenApi {
  #idInstance = "";
  #idTokenInstance = "";
  #baseUrl = API_URL;
  #buildUrl(path) {
    return `${this.#baseUrl}/waInstance${this.#idInstance}/${path}/${this.#idTokenInstance}`;
  }
  setCredentials(idInstance, idTokenInstance) {
    this.#idInstance = idInstance;
    this.#idTokenInstance = idTokenInstance;
  }
  async checkAccount(phoneNumber) {
    const url = this.#buildUrl("checkAccount");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: Number(phoneNumber) }),
    });
    if (!response.ok) {
      throw new Error("Что-то пошло не так");
    }
    return await response.json();
  }
  async getStateInstance() {
    const url = this.#buildUrl("getStateInstance");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Что-то пошло не так");
    }
    return await response.json();
  }
  async getChatHistory() {
    const url = this.#buildUrl("getChatHistory");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Что-то пошло не так");
    }
    return await response.json();
  }
  async sendMessage(chatId, message) {
    const url = this.#buildUrl("sendMessage");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        message,
      }),
    });
    if (!response.ok) {
      throw new Error("Не удалось отправить сообщение");
    }
    return await response.json();
  }
  async receiveNotification() {
    let url = this.#buildUrl("receiveNotification");
    url = url + "?receiveTimeout=50";
    const response = await fetch(url);

    if (!response.ok) throw new Error("Ошибка получения уведомления");

    return await response.json(); // null если пустая
  }
  async deleteNotification(receiptId) {
    const url = `${this.#buildUrl("deleteNotification")}/${receiptId}`;
    const response = await fetch(url, { method: "DELETE" });
    if (!response.ok) throw new Error("Ошибка удаления уведомления");
    return await response.json();
  }
  async setSettings() {
    const url = this.#buildUrl("setSettings");
    const settingsData = {
      incomingWebhook: "yes",
      incomingFileWebhook: "yes",
      webhookUrl: "",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settingsData),
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
  }
}

let greenApi = new GreenApi();

export default greenApi;
