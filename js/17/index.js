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

function promiseReducer(state = {}, { type, name, status, payload, error }) {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: { status, payload, error },
    };
  }
  return state;
}

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

const getGQL = (url) => (query, variables) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        return Object.values(data.data)[0];
      } else throw new Error(JSON.stringify(data.errors));
    });

const backendURL = "http://shop-roles.asmer.fs.a-level.com.ua";

const gql = getGQL(backendURL + "/graphql");
const actionRootCats = () =>
  actionPromise(
    "rootCats",
    gql(`query {
        CategoryFind(query: "[{\\"parent\\":null}]"){
            _id name
        }
    }`)
  );

const actionCatById = (_id) =>
  actionPromise(
    "catById",
    gql(
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
const actionGoodById = (_id) =>
  actionPromise(
    "goodById",
    gql(
      `query goodById($good: String){
          GoodFindOne(query: $good){
              _id name description price categories{_id name owner{_id login nick}}images{url}
    }
  }`,
      { good: JSON.stringify([{ _id }]) }
    )
  );

const actionOrders = () =>
  actionPromise(
    "orders",
    gql(`
  query orders {
    OrderFind(query: "[{}]") {
      _id
      total
      createdAt
      orderGoods {
        price
        count
        total
        good {
          name images {
            url
        }
          categories {
            name
          }
        }
      }
    }
  }`)
  );

const jwtDecode = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    //  серединка, atob, JSON.parse
    return payload;
  } catch (e) {
    console.log(e);
  }
};
function authReducer(state, { type, token }) {
  if (state === undefined && localStorage.authToken) {
    token = localStorage.authToken;
    type = "AUTH_LOGIN";
  }
  if (type === "AUTH_LOGIN") {
    let decodeToken = jwtDecode(token);
    if (decodeToken) {
      localStorage.authToken = token;
      return {
        token,
        payload: decodeToken,
      };
    }
  }
  if (type === "AUTH_LOGOUT") {
    localStorage.authToken = "";
    //чистим localStorage.authToken
    return {};
  }
  return state || {};
}
//написать к этому пару экшонов
const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

function cartReducer(state = {}, { type, good = {}, count = 1 }) {
  //каков state:
  //{
  //  _id1: {count:1, good: {_id1, name, price, images}}
  //  _id2: {count:1, good: {_id2, name, price, images}}
  //}
  //каковы действия по изменению state
  if (type === "CART_ADD") {
    count = +count;
    if (!count) return state;
    else
      return {
        ...state,
        [good._id]: { good, count: count + (state[good._id]?.count || 0) },
      };
  }
  if (type === "CART_CHANGE") {
    count = +count;
    if (!count) return state;

    return {
      ...state,
      [good._id]: { good, count },
    };
  }
  if (type === "CART_DELETE") {
    const { [good._id]: removedProperty, ...someGoods } = state;
    return someGoods;
  }

  if (type === "CART_CLEAR") {
    return {};
  }
  return state;
}
const actionCartAdd = (good, count = 1) => ({ type: "CART_ADD", good, count });
const actionCartChange = (good, count = 1) => ({
  type: "CART_CHANGE",
  good,
  count,
});
const actionCartDelete = (good) => ({ type: "CART_DELETE", good });
const actionCartClear = () => ({ type: "CART_CLEAR" });

const actionOrder = () => async (dispatch, getState) => {
  let { cart } = getState();
  const orderGoods = Object.entries(cart).map(([_id, { count }]) => ({
    good: { _id },
    count,
  }));
  let result = await dispatch(
    actionPromise(
      "order",
      gql(
        `
                    mutation newOrder($order:OrderInput){
                      OrderUpsert(order:$order)
                        { _id total }
                    }
            `,
        { order: { orderGoods: orderGoods } }
      )
    )
  );
  if (result?._id) {
    dispatch(actionCartClear());
  }
};

const combineReducers =
  (reducers) =>
  (state = {}, action) => {
    const newState = {};
    for (const [reducerName, reducer] of Object.entries(reducers)) {
      let newSubState = reducer(state[reducerName], action);
      // console.log(newSubState)
      if (newSubState !== state[reducerName]) {
        newState[reducerName] = newSubState;
        // console.log(newState[reducerName])
      }
    }
    if (Object.keys(newState).length !== 0) return { ...state, ...newState };
    else return state;
  };
const store = createStore(
  combineReducers({
    promise: promiseReducer,
    auth: authReducer,
    cart: cartReducer,
  })
);

// для корневых категорий
store.dispatch(actionRootCats());
store.subscribe(() => console.log(store.getState()));
const actionFullLogin = (login, password) => async (dispatch) => {
  let token = await dispatch(
    actionPromise(
      "auth",
      gql(
        ` query login($login:String, $password:String){
    login(login:$login, password:$password)} `,
        { login, password }
      )
    )
  );
  if (token) {
    dispatch(actionAuthLogin(token));
  }
};
const actionRegister = (login, password) =>
  actionPromise(
    "register",
    gql(
      `mutation register($login: String, $password: String) {
        UserUpsert(user: {login: $login, password: $password, nick: $login}) {
          _id login
        }
      }`,
      { login: login, password: password }
    )
  );

const actionFullRegister = (login, password) => async (dispatch) => {
  let tokenCheck = await dispatch(actionRegister(login, password));

  if (tokenCheck?.login === login) {
    dispatch(actionFullLogin(login, password));
  }
};

store.subscribe(() => {
  const { rootCats } = store.getState().promise;
  if (rootCats?.payload) {
    aside.innerHTML = "";
    for (const { _id, name } of rootCats.payload) {
      const link = document.createElement("a");
      link.href = `#/category/${_id}`;
      link.innerText = name;
      aside.append(link);
    }
  }
});

store.subscribe(() => {
  const { catById } = store.getState().promise;
  const { cart } = store.getState();

  const [, route, _id] = location.hash.split("/");
  //проверка на наличие 'category' в адресной строке
  if (catById?.payload && route === "category") {
    //достаем имя
    const { name } = catById.payload;
    main.innerHTML = `<h1>${name}</h1>`;
    if (catById?.payload?.subCategories) {
      for (const { _id, name } of catById.payload?.subCategories) {
        const link = document.createElement("a");
        link.href = `#/category/${_id}`;
        link.innerText = name;
        main.append(link);
      }
    }

    for (const myGood of catById.payload.goods) {
      const { _id, name, price, images } = myGood;
      const card = document.createElement("div");
      card.innerHTML = `<h2>${name}</h2>
                   <img src="${backendURL}/${images[0].url}" />
                   <br>
                   <strong> Цена ${price} грн</strong>
                   <br>
                    <a href ="#/good/${_id}">Перейти на товар ${name} </a>`;
      let btnAdd = document.createElement("button");
      btnAdd.innerText = "Добавить в корзину";
      card.append(btnAdd);

      let btnDelete = document.createElement("button");
      btnDelete.innerText = "Удалить из корзины";
      btnDelete.classList.add("deleteBtn");
      card.append(btnDelete);

      let p = document.createElement("p");
      if (cart[myGood._id]?.count != undefined)
        p.innerHTML = `Выбранное количество: ${cart[myGood._id]?.count}`;
      else p.innerHTML = `Выбранное количество: 0`;
      card.append(p);

      // console.log(cart[myGood._id]?.count)
      //console.log(count)
      btnAdd.onclick = () => {
        store.dispatch(actionCartAdd(myGood));
      };

      btnDelete.onclick = () => {
        store.dispatch(actionCartDelete(myGood));
      };

      main.append(card);
    }

    if (catById.payload?.parent && catById.payload?.parent != null) {
      const { _id, name } = catById.payload.parent;
      const linkParent = document.createElement("a");
      linkParent.href = `#/category/${_id}`;
      //console.log(_id, name);
      linkParent.innerText = ` Вернуться к категории ` + name;
      main.append(linkParent);
    }
  }
});

store.subscribe(() => {
  const { goodById } = store.getState().promise;
  const { cart } = store.getState();
  const [, route, _id] = location.hash.split("/");

  //проверка на наличие 'good' в адресной строке
  if (goodById?.payload && route === "good") {
    main.innerHTML = "";
    //достаем имя
    const { _id, name, description, price, images } = goodById.payload;
    main.innerHTML = `<h1>${name}</h1>
       <img src="${backendURL}/${images[0].url}" />
       <h3>${description} </h3>
       <br>
       <strong> Цена ${price} грн </strong>`;

    let btnAdd = document.createElement("button");
    btnAdd.innerText = "Добавить в корзину";

    btnAdd.onclick = () => store.dispatch(actionCartAdd(goodById.payload));
    main.append(btnAdd);
    let p = document.createElement("p");
    //console.log(goodById.payload._id);
    if (cart[goodById.payload._id]?.count != undefined)
      p.innerHTML = `Выбранное количество: ${
        cart[goodById.payload._id]?.count
      }`;
    else p.innerHTML = `Выбранное количество: 0`;
    main.append(p);

    if (goodById.payload?.categories) {
      for (const { _id, name } of goodById.payload.categories) {
        const link = document.createElement("a");
        link.href = `#/category/${_id}`;
        link.innerText = `Вернуться к категории ${name}`;
        main.append(link);
      }
    }
  }
});
let pMess = document.createElement("p");
store.subscribe(() => {
  const { auth } = store.getState();
  if (Object.keys(auth).length !== 0) {
    btnSignIn.innerHTML = `${auth.payload.sub.login}`;
  }
  const [, route, _id] = location.hash.split("/");
  if (route === "login") {
    pMess.innerHTML = "";

    if (Object.keys(auth).length !== 0) {
      if (
        actionFulfilled(auth, auth.payload != null) &&
        actionAuthLogin(auth)
      ) {
        pMess.innerHTML =
          "Вы авторизировались! Добро пожаловать, " +
          `${auth.payload.sub.login}, в наш магазин!`;
        pMess.style.backgroundColor = "#98FB98";
        pMess.style.color = "#006400";
        main.prepend(pMess);
      }
    } else {
      btnSignIn.innerHTML = "Sign In";
      pMess.innerHTML = "Имя пользователя или пароль неверны.";
      pMess.style.backgroundColor = "#FA8072";
      pMess.style.color = "#8B0000";
      main.prepend(pMess);
    }
  }
});

store.subscribe(() => {
  const { auth } = store.getState();
  const [, route, _id] = location.hash.split("/");
  if (route === "register") {
    pMess.innerHTML = "";
    if (Object.keys(auth).length !== 0) {
      if (
        actionFulfilled(auth, auth.payload != null) &&
        actionAuthLogin(auth)
      ) {
        pMess.innerHTML = `Вы успешно зарегистрированы!Добро пожаловать, ${auth.payload.sub.login}, в наш магазин!`;
        pMess.style.backgroundColor = "#98FB98";
        pMess.style.color = "#006400";
        btnSignIn.innerHTML = `${auth.payload.sub.login}`;
        main.prepend(pMess);
      }
    } else {
      btnSignIn.innerHTML = "Sign In";
      pMess.innerHTML =
        "Такое имя пользователя уже существует, придумайте другое!";
      pMess.style.backgroundColor = "#FA8072";
      pMess.style.color = "#8B0000";
      main.prepend(pMess);
    }
  }
});

store.subscribe(() => {
  const { orders } = store.getState().promise;
  const [, route, _id] = location.hash.split("/");
  if (route === "dashboard") {
    main.innerHTML = "";
    let h2 = document.createElement("h2");
    if (orders != undefined && orders?.payload?.length != 0) {
      //console.log(orders);

      h2.innerHTML = "Ваши заказы: ";
      main.append(h2);
      for (let elem in orders?.payload) {
        const card = document.createElement("div");
        card.classList.add("cart");
        let num = document.createElement("p");
        num.innerHTML = `<h1>№${elem} заказа
                        <br>
                        Ваши товары:
                        </h1>`;
        card.append(num);
        //console.log(orders?.payload[elem].total)
        for (let elem2 in orders?.payload[elem]?.orderGoods) {
          card.innerHTML += `<h2> * ${orders?.payload[elem]?.orderGoods[elem2].good?.name}</h2>  
                              <h3> Цена: ${orders?.payload[elem]?.orderGoods[elem2]?.price} </h3>  
                              <h3> Количество: ${orders?.payload[elem]?.orderGoods[elem2]?.count} </h3>
                             <img src="${backendURL}/${orders?.payload[elem]?.orderGoods[elem2]?.good?.images[0]?.url}" alt="тут должна быть фотка товара заказа" />
                               `;
        } 
        main.append(card);
        let num2 = document.createElement("p");
        num2.innerHTML = `<span> Общая сумма заказа: ${orders?.payload[elem].total} </span>`;
        card.append(num2);
      }
    } else {
      h2.innerHTML = "У вас нету еще оформленных заказов! :( ";
      main.append(h2);
    }
  }
});

let btnSignIn = document.getElementById("signIn");
let btnlogOut = document.getElementById("logOut");
window.onhashchange = () => {
  const [, route, _id] = location.hash.split("/");

  const routes = {
    category() {
      store.dispatch(actionCatById(_id));
    },
    good() {
      store.dispatch(actionGoodById(_id));
    },
    login() {
      main.innerHTML = "";
      let labelLog = document.createElement("label");
      labelLog.innerHTML = "Login";
      let inputLogin = document.createElement("input");
      let labelPass = document.createElement("label");
      labelPass.innerHTML = "Password";
      let inputPassword = document.createElement("input");
      let sign = document.createElement("button");
      sign.innerHTML = "SIGN";
      sign.setAttribute("id", "sign");
      pMess.innerHTML = "";
      main.append(labelLog);
      main.append(inputLogin);
      main.append(labelPass);
      main.append(inputPassword);
      main.append(sign);

      sign.addEventListener("click", () => {
        try {
          if (inputLogin.value != "" && inputPassword.value != "") {
            store.dispatch(
              actionFullLogin(inputLogin.value, inputPassword.value)
            );
          } else {
            pMess.innerHTML = "Введите значение!";
            pMess.style.backgroundColor = "#FA8072";
            pMess.style.color = "#8B0000";
            main.prepend(pMess);
          }
        } catch (e) {
          console.log("myError", e);
        }
      });
    },
    register() {
      main.innerHTML = "";
      let labelLog = document.createElement("label");
      labelLog.innerHTML = "Login";
      let inputLogin = document.createElement("input");
      let labelPass = document.createElement("label");
      labelPass.innerHTML = "Password";
      let inputPassword = document.createElement("input");
      let register = document.createElement("button");
      register.innerHTML = "REGISTER";
      pMess.innerHTML = "";
      main.append(pMess);
      main.append(labelLog);
      main.append(inputLogin);
      main.append(labelPass);
      main.append(inputPassword);

      register.addEventListener("click", () => {
        try {
          if (inputLogin.value != "" && inputPassword.value != "") {
            store.dispatch(
              actionFullRegister(inputLogin.value, inputPassword.value)
            );
          } else {
            pMess.innerHTML = "Введите значение!";
            pMess.style.backgroundColor = "#FA8072";
            pMess.style.color = "#8B0000";
          }
        } catch (e) {
          console.log("myError", e);
        }
      });

      main.append(register);
    },
    logout() {
      main.innerHTML = "";
      store.dispatch(actionAuthLogout());
      btnSignIn.innerHTML = "Sign In";
    },
    cart() {
      const { cart } = store.getState();
      main.innerHTML = "";
      let label = document.createElement("h2");
      label.innerHTML = "";
      main.append(label);

      if (Object.keys(cart).length !== 0) {
        label.innerHTML = "Ваши товары: ";
        for (let good in cart) {
          let {
            good: {
              _id: _id,
              name: name,
              price: price,
              images: [{ url }],
            },
            count,
          } = cart[good];
          const card = document.createElement("div");
          card.classList.add("cart");
          card.innerHTML = `         
                <img src="${backendURL}/${url}" class="forCart" />
                <h2>${name}</h2> 
                <a href ="#/good/${_id}">Перейти на товар ${name} </a>
                `;

          let inputCount = document.createElement("input");
          inputCount.setAttribute("type", "number");
          inputCount.value = `${count}`;
          inputCount.min = 1;
          let strongPrice = document.createElement("strong");
          strongPrice.innerHTML = ` Цена ${price * inputCount.value} грн `;

          inputCount.oninput = function () {
            store.dispatch(actionCartChange(cart[good].good, inputCount.value));
            strongPrice.innerHTML = ` Цена ${price * inputCount.value} грн `;
          };
          inputCount.classList.add("count");

          let btnDelete = document.createElement("button");
          btnDelete.innerHTML = "Удалить товар";
          btnDelete.classList.add("deleteBtn");
          btnDelete.addEventListener("click", () => {
            store.dispatch(actionCartDelete(cart[good].good));
            card.innerHTML = "";
          });

          inputCount.oninput = function () {
            store.dispatch(actionCartChange(cart[good].good, inputCount.value));
            strongPrice.innerHTML = ` Цена ${price * inputCount.value} грн `;
          };
          card.append(strongPrice);
          card.append(inputCount);
          card.append(btnDelete);

          main.append(card);
        }
        let btnClear = document.createElement("button");
        btnClear.innerHTML = "Очистить все товары";
        btnClear.classList.add("clear");
        let btnOrder = document.createElement("button");
        btnOrder.innerHTML = "Оформить заказ";
        btnOrder.classList.add("order");
        btnOrder.addEventListener("click", () => {
          alert("Ваш заказ оформлен! Спасибо что выбираете наш магазин!");
          main.innerHTML = "";
          label.innerHTML = "Ваша корзина пустая!";
          main.append(label);
          store.dispatch(actionOrder());
        });

        btnClear.addEventListener("click", () => {
          store.dispatch(actionCartClear());
          main.innerHTML = "";

          label.innerHTML = "Ваша корзина пустая!";
          main.append(label);
        });

        main.append(btnClear);
        main.append(btnOrder);
      } else {
        label.innerHTML = "Ваша корзина пустая!";
      }
    },

    dashboard() {
      store.dispatch(actionOrders());
    },
  };
  if (route in routes) routes[route]();
};
window.onhashchange();