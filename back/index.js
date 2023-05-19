//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
// !para la base online
// conn
//   .sync({ alter: true })
//   .then(() => {
//     server.listen(5432, () => {
//       console.log("Server listening on port 5432"); // eslint-disable-line no-console
//     });
//   })
//   .catch((error) => {
//     console.error("Error syncing models:", error);
//   });
// //!para el local host
conn
  .sync({ alter: true })
  .then(() => {
    server.listen(3001, () => {
      console.log("Server listening on port 3001"); // eslint-disable-line no-console
    });
  })
  .catch((error) => {
    console.error("Error syncing models:", error);
  });