//fetch(url,{
//headers:{
//......
//...(localStorage.authToken ? {Authorization: `Bearer ${localStorage.authToken}`} : {})
//}
//......
//})

function promiseReducer(state = {}, { type, name, status, payload, error }) {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: { status, payload, error },
    };
  }
  return state;
}

function createStore(reducer) {
  let state = reducer(undefined, {}); //стартовая инициализация состояния, запуск редьюсера со state === undefined
  let cbs = []; //массив подписчиков

  const getState = () => state; //функция, возвращающая переменную из замыкания
  const subscribe = (cb) => (
    cbs.push(cb), //запоминаем подписчиков в массиве
    () => (cbs = cbs.filter((c) => c !== cb))
  ); //возвращаем функцию unsubscribe, которая удаляет подписчика из списка

  const dispatch = (action) => {
    if (typeof action === "function") {
      //если action - не объект, а функция
      return action(dispatch, getState); //запускаем эту функцию и даем ей dispatch и getState для работы
    }
    const newState = reducer(state, action); //пробуем запустить редьюсер
    if (newState !== state) {
      //проверяем, смог ли редьюсер обработать action
      state = newState; //если смог, то обновляем state
      for (let cb of cbs) cb(); //и запускаем подписчиков
    }
  };

  return {
    getState, //добавление функции getState в результирующий объект
    dispatch,
    subscribe, //добавление subscribe в объект
  };
}
const store = createStore(promiseReducer);
store.subscribe(() => console.log(store.getState()));

const actionPending = (name) => ({ type: "PROMISE", name, status: "PENDING" });
const actionFulfilled = (name, payload) => ({
  type: "PROMISE",
  name,
  status: "FULFILLED",
  payload,
});
const actionRejected = (name, error) => ({
  type: "PROMISE",
  name,
  status: "REJECTED",
  error,
});

const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name));
  try {
    let payload = await promise;
    dispatch(actionFulfilled(name, payload));
    return payload;
  } catch (error) {
    dispatch(actionRejected(name, error));
  }
};
// store.dispatch(actionPromise('delay1000', delay(1000)))
// store.dispatch(actionPromise('delay2000', delay(2000)))

//const actionLuke = () => actionPromise('luke', fetch('https://swapi.dev/api/people/1').then(res => res.json()))

//store.dispatch(actionLuke())
const getGQL = (url) => (query, variables) =>
  fetch(url, {
    //метод
    method: "POST",
    headers: {
      //заголовок content-type
      "Content-Type": "application/json",
      ...(localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
    //body с ключами query и variables
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        return Object.values(data.data)[0];
      } else throw new Error(JSON.stringify(data.errors));
    });

//const gql = getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql');
const backendURL = "http://shop-roles.asmer.fs.a-level.com.ua";

const gql = getGQL(backendURL + "/graphql");

const actionRegister = (login, password) =>
  actionPromise("register",gql(
      `mutation register($login: String, $password: String) {
        UserUpsert(user: {login: $login, password: $password, nick: $login}) {
          _id login
        }
      }`,
      { login: login, password: password }
    ).then((res) => console.log("login:", res))
  );
//store.dispatch(actionRegister('anon10', '123123'))

const actionLogin = (login, password) =>
  actionPromise("signIn",gql(
      `query login($login:String, $password:String){
    login(login:$login, password:$password)
} `,
      { login: login, password: password }
    ).then((res) => console.log("login:", res))
  );

const actionCatById = (_id) => 
//добавить подкатегории
  actionPromise("catById",gql(
      `query catById($q: String){
        CategoryFindOne(query: $q){
            _id name goods {
                _id name price images {
                    url
                }
              }
        subCategories {
        _id name
        }
        parent {
         _id name
        }
    }
    }`,
      { q: JSON.stringify([{ _id }]) }
    )
  );

const actionRootCats = () =>
  actionPromise("rootCats", gql(`query {
        CategoryFind(query: "[{\\"parent\\":null}]"){
            _id name
        }
    }`)
  );

store.dispatch(actionRootCats());
const actionGoodById = (_id) =>
  actionPromise("goodById",gql(
      `query goodById($good: String){
        GoodFindOne(query: $good){
            _id name description price categories{_id name owner{_id login nick}}images{url}
  }
}`,
      { good: JSON.stringify([{ _id }]) }
    )
  );

store.subscribe(() => {
  const { rootCats } = store.getState();
  if (rootCats?.payload) {
    aside.innerHTML = "";
    for (const { _id, name } of rootCats?.payload) {
      const link = document.createElement("a");
      link.href = `#/category/${_id}`;
      link.innerText = name;
      aside.append(link);
    }
  }
});

store.subscribe(() => {
  const { catById } = store.getState();
  const [, route, _id] = location.hash.split("/");

  //проверка на наличие 'category' в адресной строке
  if (catById?.payload && route === "category") {
    //достаем имя
    const { name } = catById.payload;
    main.innerHTML = `<h1>${name}</h1>`;
    if (catById.payload?.subCategories) {
      for (const { _id, name } of catById.payload?.subCategories) {
        const link = document.createElement("a");
        link.href = `#/category/${_id}`;
        link.innerText = name;
        main.append(link);
      }
    }

    for (const { _id, name, price, images } of catById.payload.goods) {
      const card = document.createElement("div");
      card.innerHTML = `<h2>${name}</h2>
                              <img src="${backendURL}/${images[0].url}" />
                              <strong> Цена ${price}</strong>
                              <br>
                              <a href ="#/good/${_id}">${name} </a> `;
      //   ТУТ ДОЛЖНА БЫТЬ ССЫЛКА НА СТРАНИЦУ ТОВАРА
      //   ВИДА #/good/АЙДИ

      main.append(card);
    }

    if (catById.payload?.parent && catById.payload.parent != null) {
      const { _id, name } = catById.payload.parent;
      const linkParent = document.createElement("a");
      linkParent.href = `#/category/${_id}`;
      console.log(_id, name);
      linkParent.innerText = ` Вернуться к категории ` + name;
      main.append(linkParent);
    }
  }
});

store.subscribe(() => {
  //ТУТ ДОЛЖНА БЫТЬ ПРОВЕРКА НА НАЛИЧИЕ goodById в редакс
  //и проверка на то, что сейчас в адресной строке адрес ВИДА #/good/АЙДИ
  //в таком случае очищаем main и рисуем информацию про товар с подробностями

  const { goodById } = store.getState();
  const [, route, _id] = location.hash.split("/");
  if (goodById?.payload && route === "good") {
    main.innerHTML = "";
    //достаем имя
    const { _id, name, description, price, images } = goodById.payload;
    main.innerHTML = `<h1>${name}</h1>
                  <img src="${backendURL}/${images[0].url}" />
                  <h3>${description} </h3>
                  <br>
                  <strong> Цена ${price}</strong>`;

    if (goodById.payload?.categories) {
      for (const { _id, name } of goodById.payload.categories) {
        const link = document.createElement("a");
        link.href = `#/category/${_id}`;
        link.innerText = name;
        main.append(link);
      }
    }
  }
});
window.onhashchange = () => {
  const [, route, _id] = location.hash.split("/");

  const routes = {
    category() {
      store.dispatch(actionCatById(_id));
    },
    good() {
      //задиспатчить actionGoodById
      // console.log('ТОВАРОСТРАНИЦА')
      store.dispatch(actionGoodById(_id));
    }
  };
  if (route in routes) routes[route]();
};
window.onhashchange();