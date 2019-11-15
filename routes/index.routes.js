var express = require('express');
var router = express.Router();
var Chart = require('chart.js');
var Promise = require('promise')

/** IMPORT MODELS */
const Party = require('../models/party')


/**  GET ALL DATA FROM DB */
async function getAllData() {
  const party = new Party();
  var partyDetails = await party.collection.find().toArray();
  return partyDetails;
}


/**  PARTY   */
router.get('/', async function (req, res, next) {
  res.render('index', { title: "Party", items: await getAllData() })
});


/***         L I S T      A L L          */         /***            P A G I N A T I O N          */
router.get('/listall/:pageNumber', async function (req, res, next) {
  const party = new Party();
  const nPerPage = 3;
  const pageNumber = req.params.pageNumber
  console.log("Print STR", pageNumber)

  async function partyPage(pageNumber, nPerPage) {

    var partyDetails = await party.collection.find()
      .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
      .limit(nPerPage)
      .toArray();
    return partyDetails;
  }
  var countTill = await party.collection.find().count();
  // console.log("COUNTILL : ", countTill)
  // console.log(" C O U N T  :  ", Math.ceil(countTill/nPerPage))
  res.render('listall', { title: "Party", items: await partyPage(pageNumber, nPerPage), count: Math.ceil(countTill / nPerPage) })
});

/**   C R E A T E    P A R T Y   T A B  */
router.get('/createparty', (req, res) => {
  res.render('createparty', { title: "Create Party" })
})

/**    S E A R C H    P A G E   T A B  */
router.get('/search', async (req, res) => {
  res.render('search', { title: "Search", items: await getAllData() })
})

/**   A D D   P A R T Y   T A B  */
router.get('/add', async (req, res) => {
  console.log("Add party tab called()")
  res.render('add', { title: "Add", items: await getAllData() })
})

/**   D E L E T E    P A R T Y    T A B    */
router.get('/deletetab', async (req, res) => {
  res.render('deletetab', { title: "Delete Tab", items: await getAllData() })
})



/**  NEW CREAT POST PARTY insert*/
router.post('/createParty', async (req, res) => {
  console.log("req.body : ", req.body)
  const party = new Party();

  party.name = req.body.name;
  party.party = req.body.party;

  //console.log("carmaxx : ", carmaxx)

  party.save().then(async (doc) => {
    //console.log('doc  : ', doc)
    // return res.status(200).json({
    //   success : true,
    //   message : "Saved Sucessfully",
    // })
    //res.render('index', { title: "Party", items: await getAllData() })
    res.redirect("/")
  }, (e) => {
    console.log("error occured")
    res.status(501).json({
      //success: false,
      //message: "Couldn't add new job"
    });
  })
  //res.redirect('/');
  // res.render('index', { title: "Party", items: await getAllData() })
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
    , async function (err, result) {
      if (err) throw err;
      //console.log("Updated : ", result);
      res.render('index', { title: "Party", items: await getAllData() });
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

/**  DELETE ONE PARTY */
router.post('/deleteone', (req, res) => {
  console.log("DELETE ONE PARTY CALLED")
  const party = new Party();

  //party.party = req.query.partyName;
  console.log(" P A R T Y    V A L U E : ", req.body.party)
  party.collection.updateOne(
    { name: req.body.name },
    { $pull: { party: { $in: [req.body.party] } } }
    , async function (err, result) {
      if (err) throw err;
      //console.log("Updated : ", result);
      res.render('index', { title: "Party", items: await getAllData() });
    })

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

/**  XXXXXXXXXXXXX */
router.get('/x', async (req, res) => {
  //const party =new Party();
  var partyItems = Party.collection.find().toArray();
  console.log("BEFORE DATA", partyItems)
  var partyDetails = Party.find({})
  //console.log(Party.find({name: "Romesh"}))
  //console.log(partyDetails)
  res.render('x', { title: 'XXX', items: partyDetails })
});

router.post('/x', (req, res) => {
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
})

/**  S E A R C H P A G E     */
router.get('/searchpage', (req, res) => {
  res.render('searchpage', { title: "Search Page " })
});


/**  S E A R C H P A G E    R E S U L T    */
router.get('/searchpageRes', async (req, res) => {
  const party = new Party();
  console.log("req : ", req.query.name)
  var searchQuery = { "name":  req.query.name};
  await party.collection.find(searchQuery).toArray()
    .then((result) => {
      console.log(result)
      if (result.length > 0) {
        res.render('searchpageRes', {title : "Result", result:result})
      } else {
        res.send("ERROR")
      }
    })
});


module.exports = router;
