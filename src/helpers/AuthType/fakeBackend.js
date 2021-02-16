import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import accessToken from "../jwt-token-access/accessToken";

let users = [
  { uid: 1, username: 'admin', role : 'admin', password: 'asdqwe123', email: 'admin@goodproject.com' }
];
  
const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(axios);

  mock.onPost('/post-fake-register').reply(function (config) {

    const user = JSON.parse(config['data']);
    users.push(user);

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve([200, user]);
      });
    });
  });

  mock.onPost('' +
      '/post-fake-login').reply(function (config) {

    const user = JSON.parse(config['data']);
    const validUser = users.filter(usr => usr.email === user.email && usr.password === user.password);
    
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (validUser['length'] === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject([400, "Username and password are invalid. Please enter correct username and password"]);
        }
      });
    });
  });

  mock.onPost('/fake-forget-pwd').reply(function (config) {
   // User needs to check that user is eXist or not and send mail for Reset New password

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve([200, "Check you mail and reset your password."]);
    });
  });
 
  });



  mock.onPost('/post-jwt-register').reply(function (config) {

    const user = JSON.parse(config['data']);
    users.push(user);

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve([200, user]);
      });
    });
  });

  mock.onPost('/post-jwt-login').reply(function (config) {

    const user = JSON.parse(config['data']);
    const validUser = users.filter(usr => usr.email === user.email && usr.password === user.password);
    
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (validUser['length'] === 1) {
          
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          var token = accessToken;

              // JWT AccessToken
              const tokenObj = { accessToken : token };    // Token Obj
              const validUserObj = { ...validUser[0], ...tokenObj };    // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([400, "Username and password are invalid. Please enter correct username and password"]);
        }
      });
    });
  });


mock.onPost('/post-jwt-profile').reply(function (config) {

    const user = JSON.parse(config['data']);
    
    const one  = config.headers;

    let  finalToken = one.Authorization;

    const validUser = users.filter(usr => usr.uid === user.idx);

    return new Promise(function (resolve, reject) {
    
    setTimeout(function () {

        // Verify Jwt token from header.Authorization 
    if(finalToken === accessToken)
    {
       if (validUser['length'] === 1) {

              let objIndex;

          //Find index of specific object using findIndex method.    
          objIndex = users.findIndex((obj => obj.uid === user.idx));

          //Update object's name property.
          users[objIndex].username = user.username;

          // Assign a value to locastorage
           localStorage.removeItem("authUser");
           localStorage.setItem("authUser", JSON.stringify(users[objIndex]));
                    
          resolve([200, "Profile Editted successfully"]);

        } else {
          reject([400, "Something wrong for edit profile"]);
        }
    }
    else
    {
     reject([400, "Invalid Token !!"]);  
    }
      });
    });
  });



mock.onPost('/post-fake-profile').reply(function (config) {

    const user = JSON.parse(config['data']);

    const validUser = users.filter(usr => usr.uid === user.idx);
  
    return new Promise(function (resolve, reject) {
      setTimeout(function () {

        if (validUser['length'] === 1) {

    
          let objIndex;

          //Find index of specific object using findIndex method.    
          objIndex = users.findIndex((obj => obj.uid === user.idx));

          //Update object's name property.
          users[objIndex].username = user.username;

          // Assign a value to locastorage
           localStorage.removeItem("authUser");
           localStorage.setItem("authUser", JSON.stringify(users[objIndex]));
                    
          console.log(localStorage.getItem("authUser"));

          resolve([200, "Profile Editted successfully"]);

        } else {
          reject([400, "Something wrong for edit profile"]);
        }
        
      });
    });
  });


  mock.onPost('/jwt-forget-pwd').reply(function (config) {
   // User needs to check that user is eXist or not and send mail for Reset New password

   return new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve([200, "Check you mail and reset your password."]);
    });
  });
 
  });

  mock.onGet('/get-list-users').reply(function (config) {

      let users = [
          {
              "userID": 1,
              "userName": "Admin",
              "userAddress" : "Jalan Pelita 1",
              "userEmail": "admin@goodproject.com",
              "userRole": "admin",
              "userPhone": "081999121212",
              "userPIC": "PT.Textil"
          },
          {
              "userID": 2,
              "userName": "Operator",
              "userAddress" : "Jalan Pelita 2",
              "userEmail": "operator@goodproject.com",
              "userRole": "operator",
              "userPhone": "081999121212",
              "userPIC": "PT.Textil"
          },
          {
              "userID": 3,
              "userName": "Operator",
              "userAddress" : "Jalan Pelita 3",
              "userEmail": "operator@goodproject.com",
              "userRole": "operator",
              "userPhone": "081999121212",
              "userPIC": "PT.Textil"
          }
      ]

      return new Promise(function (resolve, reject) {
          setTimeout(function () {
              if (Object.keys(users).length >=  1) {
                  resolve([200, users]);
              } else {
                  reject([400, "Username and password are invalid. Please enter correct username and password"]);
              }
          });
      });
  });

  mock.onPost('/delete-user').reply(function (config) {
    let users = [
        {
            "userID": 1,
            "userName": "Admin",
            "userEmail": "admin@goodproject.com",
            "userRole": "admin"
        },
        {
            "userID": 2,
            "userName": "Operator",
            "userEmail": "operator@goodproject.com",
            "userRole": "operator"
        }
    ]

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (Object.keys(users).length >=  1) {
                resolve([200, "Errrrrr"]);
            } else {
                reject([400, "Username and password are invalid. Please enter correct username and password"]);
            }
        });
    });
  });


    mock.onPost('/edit-user').reply(function (config) {
        let users = [
            {
                "userID": 1,
                "userName": "Admin",
                "userEmail": "admin@goodproject.com",
                "userRole": "admin"
            },
            {
                "userID": 2,
                "userName": "Operator",
                "userEmail": "operator@goodproject.com",
                "userRole": "operator"
            }
        ]

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (Object.keys(users).length >=  1) {
                    resolve([200]);
                } else {
                    reject([400, "Username and password are invalid. Please enter correct username and password"]);
                }
            });
        });
    });


    mock.onPost('/add-user').reply(function (config) {
        let users = [
            {
                "userID": 1,
                "userName": "Admin",
                "userAddress" : "Komplek API",
                "userEmail": "admin@goodproject.com",
                "userRole": "admin",
                "userPhone": "081999121212"
            },
            {
                "userID": 2,
                "userName": "Operator",
                "userAddress" : "Komplek API",
                "userEmail": "operator@goodproject.com",
                "userRole": "operator",
                "userPhone": "081999121212"
            }
        ]

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (Object.keys(users).length >=  1) {
                    resolve([200]);
                } else {
                    reject([400, "Username and password are invalid. Please enter correct username and password"]);
                }
            });
        });
    });

}

export default fakeBackend;