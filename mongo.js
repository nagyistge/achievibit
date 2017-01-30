var ObjectID = require('bson-objectid');

module.exports = {
  "localhost:27017": {
    "databases": {
      "myproject": {
        "collections": [
          {
            "name": "system.namespaces",
            "documents": [
              {
                "name": "system.indexes"
              },
              {
                "name": "repos"
              },
              {
                "name": "users"
              }
            ]
          },
          {
            "name": "system.indexes",
            "documents": [
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "myproject.repos",
                "name": "_id_",
                "unique": true
              },
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "myproject.users",
                "name": "_id_",
                "unique": true
              }
            ]
          },
          {
            "name": "users",
            "documents": [
              {
                "username": "Thatkookooguy",
                "url": "https://github.com/Thatkookooguy",
                "avatar": "https://avatars.githubusercontent.com/u/10427304?v=3",
                "_id": ObjectID("588e8b9ffd19b0246865a058"),
                "repos": [
                  "Thatkookooguy/newRepositoryToTestDB"
                ],
                "achievements": [
                  {
                    "$each": [
                      {
                        "avatar": "images/achievements/useGithubBot.achievement.jpeg",
                        "name": "Why not bots?",
                        "short": "Hey sexy mama, wanna kill all humans?",
                        "description": "used github to create a pull request, using the web-flow bot",
                        "relatedPullRequest": "Thatkookooguy/newRepositoryToTestDB/pull/12",
                        "grantedOn": 1485736864048
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "name": "repos",
            "documents": [
              {
                "name": "newRepositoryToTestDB",
                "fullname": "Thatkookooguy/newRepositoryToTestDB",
                "url": "https://github.com/Thatkookooguy/newRepositoryToTestDB",
                "_id": ObjectID("588e8b9ffd19b0246865a057")
              }
            ]
          }
        ]
      }
    }
  }
}