# achievibit
github hook system to integrate achievements for repositories

## how to use

## how to clone your own server

## how to create new achievements


`achievibit` listens to changes in pull requests and logs some things.
`achievibit` notifies achievements only when pull requests are being merged, and passes the logged data.
If a pull request got closed, achievements won't be rewarded (think of it as quitting the game)

here is a general structure of the data collected about a pull request:
```json
{
  "number": 212,
  "title": "[TESTING WEB HOOK] ignore this PR",
  "description": "testing some status changes events in `github`'s **webhooks**.",
  "creator": {
    "username": "Thatkookooguy",
    "url": "https://api.github.com/users/Thatkookooguy"
  },
  "createdOn": "2016-10-02T08:09:33Z",
  "milestone": "01. Create a kickass **code editor** for remote programming",
  "labels": [
    "dependencies",
    "build feature",
    "in progress"
  ],
  "history": {
    "labels": {
      "added": 1,
      "removed": 0
    }
  },
  "reviewers": [
    {
      "username": "ortichon",
      "url": "https://api.github.com/users/ortichon"
    },
    {
      "username": "dunaevsky",
      "url": "https://api.github.com/users/dunaevsky"
    }
  ]
}
```

history saves all the changed data. for **labels**, it's just if they changed or not and how many times.

## USER achievements

even achievements that span over multiple PRs are rewarded when a PR is merged. for example, the achievement for creating more than 10 PR can check the data on the user object
the user object keeps very minimal data about cross PR data. that data is already updated with the newly merged PR.

so, if a user had 5 PR opened and merged while achievibit was collecting data, his data will look like so:

```json
// USER
{
  "username": "thatkookooguy",
  "url": "https://api.github.com/users/Thatkookooguy",
  "mergedPullRequests": 5,
  "abandonedPullRequests": 3,
  "reviewedPullRequests": 2,
  "achievements": [
    "blah": "<obj>",
    "blah2": "<obj2>",
  ]
}
```

when the user creates a new PR, and merges is, the achievement function will get the following data:

```javascript
function challenge(pullRequestData, creator, reviewers) {
  console.log(creator.mergedPullRequests); // 6 (since this pull request is already included)
}
```

this way, achievements that only try to look at those numbers, don't even need to go through the pull request data;

some achievements examples:
```javascript
function activeReviewer(pullRequestData, creator, reviewers) {
  _.forEach(reviewers, function(reviewer) {
    if (reviewer.reviewedPullRequests === 50) {
      reviewer.reward({
        name: 'nitpicker',
        short: 'It\'s not personal, Sonny. It's strictly business',
        description: 'you reviewed 50 merged pull requests!'
        avatar:
      });
    } else if (reviewer.reviewedPullRequests === 100) {
      reviewer.reward({
        name: 'niggler',
        short: 'A person who bitches about stupid details (and a way to get away with saying nigger)',
        description: 'you reviewed 100 merged pull requests!'
      });
    }
  });
}
```