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

var id = 1;

var route;




function findUser(req, res){

  var sAMAccountName = req.body.user;

  if (sAMAccountName) {
    ad.findUser(sAMAccountName, function(err, user) {
      if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
      }


      if (!user) {
        console.log('User: ' + sAMAccountName + ' not found.');
      } else {
        console.log(JSON.stringify(user));
        //route = 'approval';
        approval.push({
          id: id,
          title:user.sAMAccountName,
          nodes:[]
        });

        findManager(res, user.manager);
      }
    });
  }

}

function findManager(res, dn) {


  if (dn) {
    ad.findUser(dn, function(err, user) {
      if (err) {
        res.status(500).send({message: 'ERROR al guardar' + JSON.stringify(err)});
      }
      if (!user) {
        res.status(404).send({message: 'El usuario no existe'})
      }

      id++;
      route.nodes.push({
        id: id,
        title:user.sAMAccountName,
        nodes:[]
      });
      route.concat(nodes)

      console.log(user);
      if (user.manager) {
        if (user.sAMAccountName == 'jlopezp') {
          console.log(approval);

          res.status(200).send(approval);
          return;
        }
        findManager(res, user.manager);
      } else {
        res.status(200).send('No hay responsable');
        console.log('no hay responsable');
        return;
      }

    });

  }
}

module.exports = {
  findUser
};
