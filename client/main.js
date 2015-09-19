/**
 * Created by moshemal.
 */

define(['jquery', 'modules/Login/Login', 'modules/Register/Register', 'core/request', 'core/layout'],
  function($, Login, Register, request, layout){
  'use strict';

  function startLoggin(){
    function loginSuccess(){
      console.log("login success moving to application");
      startApp();
      login.destroy();
    }

    function loginFail(){
      console.log("login fail trying again");
      login.resetDeferred();
      login.getPromise().then(loginSuccess, loginFail);
    }

    var login = new Login();
    login.appendTo("#container");
    login.getPromise().then(loginSuccess, loginFail);

      $("#container").on("click","#register",function(){
          login.destroy();
          startRegister();
          return false;
      })
  }

  function startRegister(){
      function registerSuccess(){
          console.log("register success moving to login");
          startLoggin();
          register.destroy();
      }

      function registerFail(){
          console.log("register fail trying again");
		  //window.alert("try again");
          register.resetDeferred();
          register.getPromise().then(registerSuccess, registerFail);
      }

      var register = new Register();
      register.appendTo("#container");
      register.getPromise().then(registerSuccess, registerFail);
  }

  function startApp(){
      layout.createLayout("3W", "#container");
  }

  request.isLoggedIn().then(function() {startApp();},function(){startLoggin();});
});

