var express = require('express');
var router = express.Router();
var Chart = require('chart.js');
var Promise = require('promise')

/** IMPORT MODELS */
const Party = require('../models/party')


/**  GET ALL DATA FROM DB */
async function getAllData() {
  const party = new Party();
  const partyDetails = await party.collection.find().toArray();
  return partyDetails;
}


/**  PARTY   */
router.get('/', async function (req, res, next) {
  res.render('index', {title: "Party", items : await getAllData()})
});

/***         L I S T      A L L          */
router.get('/listall', async function (req, res, next) {
  res.render('listall', {title: "Party", items : await getAllData()})
});

/**   C R E A T E    P A R T Y   T A B  */
router.get('/createparty', (req, res) => {
  res.render('createparty', { title: "Create Party" })
})

/**    S E A R C H    P A G E   T A B  */
router.get('/search', async (req, res) => {
  res.render('search', {title: "Search", items : await getAllData()})
})

/**   A D D   P A R T Y   T A B  */
router.get('/add', async (req, res) => {
  console.log("Add party tab called()")
  res.render('add', {title: "Add", items : await getAllData()})
})

/**   D E L E T E    P A R T Y    T A B    */
router.get('/deletetab', async (req, res) => {
  res.render('deletetab', {title: "Delete Tab", items : await getAllData()})
})



/**  NEW CREAT POST PARTY insert*/
router.post('/createParty', (req, res) => {
  console.log("req.body : ", req.body)
  const party = new Party();

  party.name = req.body.name;
  party.party = req.body.party;

  //console.log("carmaxx : ", carmaxx)

  party.save().then((doc) => {
    console.log('doc  : ', doc)
    //res.status(200);
    //res.send("Added New Data")
  }, (e) => {
    console.log("error occured")
    res.status(501).json({
      //success: false,
      //message: "Couldn't add new job"
    });
  })
});

/**  SEARCH PARTY */
router.get('/searchparty', (req, res) => {
  console.log("req.body : ", req.query.name)
  const party = new Party();
  searchQuery = { name: req.query.name };
  party.collection.findOne(searchQuery, function (err, result) {
    if (err) throw err;
    //console.log("Result : ", result);
    //res.send("OK");
    res.render('searchparty', { title: "Search Party", result: result })
  });

});


/**  ADD PARTY */
router.get('/addparty', (req, res) => {
  console.log("req.body : ", req.query.name)
  const party = new Party();

  party.party = req.query.partyName;
  console.log(req.query.partyName)
  party.collection.update(
    { name: req.query.name },
    { $push: { party: req.query.partyName } }
    , function (err, result) {
      if (err) throw err;
      console.log("Updated : ", result);
      res.send("Updates");
    })

});


/**  DELETE PARTY **/
router.get('/delete', (req, res) => {
  console.log("req.body : ", req.query.name)
  const party = new Party();
  searchQuery = { name: req.query.name };
  party.collection.deleteOne(searchQuery, function (err, result) {
    if (err) throw err;
    //console.log("Result : ", result);
    //res.send("OK");
    //res.render("", {title : "Party"})
    res.redirect("/")
  });

});

/** DISTINCT PARTY */
router.get('/distinct', (req, res) => {
  const party = new Party();
  party.collection.distinct("party", function (err, result) {
    if (err) throw err;
    //console.log("Result : ", result);
    //res.send("OK");
    res.render("distinct", { result: result })
  });

});

router.get('/sortlimit', (req, res) => {
  const party = new Party();
  party.collection.find().sort({ name: 1 }).limit(5).skip(2).toArray(function (err, result) {
    if (err) throw err;
    res.render("sortlimit", { result: result })
    console.log(result)
  })
});

module.exports = router;
