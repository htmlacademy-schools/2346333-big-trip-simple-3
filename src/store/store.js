/**
 * Удаленное хранилище элементов в формате JSON
 * @template Item
 */
export default class Store {
  #baseUrl;
  #auth;

  /**
       * @param {string} baseUrl Базовый адрес хранилища
       * @param {string} auth Учетные данные в формате `Basic <случайная_строка>`
       */
  constructor(baseUrl, auth) {
    this.#baseUrl = baseUrl;
    this.#auth = auth;
  }

  /**
       * Вернет все элементы, которые есть в хранилище
       * @return {Promise<Item[]>}
       */
  list() {
    return this.request('/', {
      method: 'get'
    });
  }

  /**
       * Добавит элемент в хранилище
       * @param {Item} item
       * @return {Promise<Item>} Объект с присвоенным идентификатором
       */
  add(item) {
    return this.request('/', {
      method: 'post',
      body: JSON.stringify(item)
    });
  }

  /**
       * Обновит свойства элемента
       * @param {string} id
       * @param {Item} item
       * @return {Promise<Item>}
       */
  update(id, item) {
    return this.request(`/${id}`, {
      method: 'put',
      body: JSON.stringify(item)
    });
  }

  /**
       * Удалит элемент из хранилища
       * @param {string} id
       * @return {Promise<string>} Текст `ОК`
       */
  remove(id) {
    return this.request(`/${id}`, {
      method: 'delete'
    });
  }

  /**
       * Отправит http-запрос (служебный метод)
       * @param {string} path
       * @param {RequestInit} options
       */
  async request(path, options = {}) {
    const url = this.#baseUrl + path;

    const headers = {
      'authorization': this.#auth,
      'content-type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, {...options, headers});

    const {assert, parse} = /** @type {typeof Store} */(this.constructor);

    await assert(response);

    return parse(response);
  }

  /**
       * @param {Response} response
       */
  static async assert(response) {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }

  s;

  /**
       * @param {Response} response
       */
  static parse(response) {
    if (response.headers.get('content-type').startsWith('application/json')) {
      return response.json();
    }

    return response.text();
  }
}
