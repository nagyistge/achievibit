var Q = require('q');
var _ =  require('lodash');
var ObjectID = require('bson-objectid');
var jsonfile = require('jsonfile');
var file = 'testDB.json';
jsonfile.spaces = 2;

var db = {};

jsonfile.writeFileSync(file, db);

function manager(uri, options, callback) {
  console.log('connected to fake DB');
  return {
    close: close,
    create: create,
    get: get
  };
}

function close() {
  return;
}

function create(name) {
  return get(name);
}

function get(name) {
  if (!name) {
    return;
  }

  if (!db[name]) {
    db[name] = [];

    jsonfile.writeFileSync(file, db);
  }

  return collection(db[name]);
}

function collection(collection) {
  var find = function(query) {
    var deferred = Q.defer();
    var results = _.filter(collection, query);
    deferred.resolve(results);

    return deferred.promise;
  };

  var index = function(filedsOrSpecs, options) {
    if (_.isNil(options) ||
      (!_.isString(filedsOrSpecs) && !_.isObject(filedsOrSpecs))) {
      return;
    }
    if (_.isString(filedsOrSpecs)) {
      var attribute = filedsOrSpecs;
      filedsOrSpecs = {};
      var parsedOptions = _.pick(options, ['unique', 'sparse']);
      filedsOrSpecs[attribute] = parsedOptions;

      if (_.isNil(collection._headers)) {
        collection._headers = {};
      }

      _.forEach(filedsOrSpecs, function(value, indexField) {
        var result = {};
        result[indexField] = _.pick(options, ['unique', 'sparse']);
        // add indexes to headers of collection
        _.assign(collection._headers, result);
      });
    }

    _.forEach(filedsOrSpecs);
  };

  var findOne = function(query) {
    var deferred = Q.defer();
    var results = _.find(collection, query);
    deferred.resolve(results);

    return deferred.promise;
  };

  var insert = function(docs) {
    var deferred = Q.defer();

    docs = _.isObject(docs) ? [ docs ] : docs;

    if (!_.isEmpty(collection._headers)) {
      var allSparseFields =
        _.pickBy(_.mapValues(collection._headers, 'sparse'), _.identity);

      var isDocsSparseCorrectly =
        _.every(docs, function(doc) {
          return checkObjectSparseValidity(doc, allSparseFields);
        });

      if (!isDocsSparseCorrectly) {
        deferred.reject('new docs require error');
        return deferred.promise;
      }

      var allUniqueFields =
        _.pickBy(_.mapValues(collection._headers, 'unique'), _.identity);

      console.log(allUniqueFields);

      var isDocsUniqueValid = _.isEmpty(collection) ? true :
        _.every(docs, function(doc) {
          return checkUniqueValidity(doc, collection, allUniqueFields);
        });

      if (!isDocsUniqueValid) {
        deferred.reject('new docs unique error');
        return deferred.promise;
      }
    }

    _.forEach(docs, function(doc) {
      doc.id = ObjectID();
      collection.push(doc);
    });

    jsonfile.writeFileSync(file, db);

    deferred.resolve();

    return deferred.promise;
  };

  var update = function(query, update) {
    var deferred = Q.defer();

    console.log('update', query, update);

    var split = _.partition(collection, query);

    _.forEach(split[0], function(item) {
      console.log(item);
    });

    jsonfile.writeFileSync(file, db);
    deferred.resolve();

    return deferred.promise;
  };

  return {
    find: find,
    findOne: findOne,
    insert: insert,
    update: update,
    index: index
  };
}

function checkObjectSparseValidity(object, allSparseFields) {
  return _.every(_.keys(allSparseFields), _.partial(_.has, object));
}

function checkUniqueValidity(object, collection, allUniqueFields) {
  console.log('- checking unique for', object);
  console.log('- allUniqueFiles', _.keys(allUniqueFields));
  var foundItems = false;
  _.forEach(_.keys(allUniqueFields), function (field) {
    var searchObj = {};
    searchObj[field] = object[field];
    console.log('-- collection', collection);
    console.log('-- searchObj', searchObj);
    var match = _.find(collection, searchObj);
    console.log('-- matched object', match);
    if (match) {
      foundItems = true;
      // break out of the loop
      return false;
    }
  });

  console.log('- item validity', object, foundItems);

  return foundItems;
}

var monk = manager('lalala');
var users = monk.get('users');
console.log('initial collection', db.users);
users.index('hello', { unique: true, sparse: true });
users.insert({ hello: 'world', pizza: true }).then(function() {
  console.log('success adding first world');
}, function(err) {
  console.error(err);
});
users.insert({ hello: 'world', pizza: false }).then(function() {
  console.log('success adding second world');
}, function(err) {
  console.error(err);
});
users.insert({ hello: 'tits', ass: false }).then(function() {
  console.log('success adding tits');
}, function(err) {
  console.error(err);
});
users.find({ hello: 'world' }).then(function(user) {
  console.log('found our user! yayyy!', user);
});
