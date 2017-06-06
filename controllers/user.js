'use strict'

var User = require('../models/user');

var ActiveDirectory = require('activedirectory');
var config = {
  url: 'ldap://urbmad0101:389',
  baseDN: 'dc=urbaser,dc=local',
  username: 'adminsite',
  password: 'urbaser@10'
  }
var ad = new ActiveDirectory(config);

var approval = [];



function findUser(req, res){
  console.log(req.body);
  var sAMAccountName = req.body;
  console.log(sAMAccountName);
  var dn;
  //var dn = 'CN=Smith\\, John,OU=Users,DC=domain,DC=com';
  //var dn = boss;


  if (sAMAccountName) {
    ad.findUser(sAMAccountName, function(err, user) {
      if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
      }

      if (! user) console.log('User: ' + sAMAccountName + ' not found.');
      else console.log(JSON.stringify(user));

      cadena(user);

    });
  }
  if (dn) {
    ad.findUser(dn, function(err, user) {
      if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
      }

      if (! user) console.log('User: ' + dn + ' not found.');
      else console.log(JSON.stringify(user));

      cadena(user);

    });
  }


  // Find user by a sAMAccountName



}

function cadena(user) {

  if (!user.manager){
    console.log("no hay jefe");
  } else {
    approval.push(user);
    findUsers(user.manager);
  }

  console.log(approval);

}



/*function findUsers(req, res) {
  var newUser = new User();
  var query = 'cn=*';


  ad.findUsers(query, function(err, users) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      return;
    }

    if ((! users) || (users.length == 0)) console.log('No users found.');
    else {
      //var findUsers = JSON.stringify(users);
      //console.log(findUsers);
      //
      //res.status(200).send('findUsers: '+JSON.stringify(users));

      //console.log(users);

      for (var i = 0; i < users.length; i++) {

        var newUser = new User();

        newUser.name = users[i].givenName;
        newUser.surname = users[i].sn;
        newUser.display = users[i].displayName;
        newUser.email = users[i].mail;
        newUser.user = users[i].sAMAccountName;
        newUser.manager = users[i].manager;

        //console.log(newUser);

        newUser.save((err, userStored) => {
          if (err) {
            //res.status(500).send({message: 'ERROR al guardar' + err});
            console.log('Error al guardar' + err);
          }else{
            if (!userStored) {
              //res.status(404).send({message: 'No se ha registrado el usuario'});
              console.log('No se ha registrado el usuario');
            }else {
              //res.status(200).send({user: userStored});
              //console.log(userStored);
              console.log("usuario " +userStored + " registrado");
            }
          }
        });




      }
    }
  });
}*/





module.exports = {
  findUser
};
