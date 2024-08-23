Потрібно реалізувати оплату при отриманні так щоб ця оплата проходила якось через адмін акаунт і знімалася комісія за товар

Користувач замоаляє товар вибирає "Оплата при отримані" і коли користувач оплатив товар

======================

Потрібно подивитись і виправити помилку при видаленні замовленя користувачем

Видаляється не коректно через раз з такою помилкою

order.js:16 
 DELETE http://localhost:5000/api/orders/55 500 (Internal Server Error)
Promise.then		
deleteOrder	@	order.js:16
hamdlerDelete	@	DeleteOrderList.jsx:10
Show 22 more frames
DeleteOrderList.jsx:13 hamdlerDelete->error 
AxiosError {message: 'Request failed with status code 500', name: 'AxiosError', code: 'ERR_BAD_RESPONSE', config: {…}, request: XMLHttpRequest, …}

========================