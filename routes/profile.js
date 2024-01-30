'use strict';
const express = require('express');
const userModel = require('../model/user.model');
const router = express.Router();

const defaultProfile =
{
  "id": 1,
  "name": "A Martinez",
  "description": "Adolph Larrue Martinez III.",
  "mbti": "ISFJ",
  "enneagram": "9w3",
  "variant": "sp/so",
  "tritype": 725,
  "socionics": "SEE",
  "sloan": "RCOEN",
  "psyche": "FEVL",
  "image": "https://soulverse.boo.world/images/1.png",
}
  ;

module.exports = function () {

  router.use(express.json());

  router.get('/', function (req, res, next) {
    res.render('profile_template', {
      profile: defaultProfile,
    });
  });

  router.get('/:id', function (req, res, next) {
    console.log("req.params.id: ", req.params.id)

    userModel.findById(req.params.id).then(data => {
      res.render('profile_template', {
        profile: data,
      });
    }).catch(error => {
      console.log("Error when loading user information ", error)
    })
  });

  router.post('/user', function (req, res) {
    console.log(req.body)
    var userData = req.body;
    try {
      const user = new userModel({
        name: userData.name,
        description: userData.description,
        mbti: userData.mbti,
        enneagram: userData.enneagram,
        variant: userData.variant,
        tritype: userData.tritype,
        socionics: userData.socionics,
        sloan: userData.sloan,
        psyche: userData.psyche,
        image: userData.image
      });

      user.save().then((response) => {
        console.log(response);

        return res.json({ "message": "User created.", response });
      }).catch(error => {
        return res.json({ error })
      })
    }
    catch (error) {
      return res.json({ error: "Invalid Request." })
    }
  });

  return router;
}

