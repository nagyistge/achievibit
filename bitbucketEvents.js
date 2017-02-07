module.exports = {
  name: 'bitbucket',
  eventHeader: 'X-Event-Key',
  events: {
    'ping': function(header) {
      return _.isEqual(header, 'ping');
    },
    'pr-opened': function(header) {
      return _.isEqual(header, 'pullrequest:created');
    },
    'pr-merged': function(header) {
      return _.isEqual(header, 'pullrequest:fulfilled');
    },
    'pr-labeled-on-creation': function() {
      return false;
    },
    'pr-labeled': function() {
      return false;
    },
    'pr-unlabeled': function() {
      return false;
    },
    'pr-edited': function(header) {
      return _.isEqual(header, 'pullrequest:updated');
    },
  ///////
    'pr-reviewer-requested': function() {
      return false;
    },
    'pr-reviewer-removed': function() {
      return false;
    },
    'pr-review-created-comment': function() {
      return false;
    },
    'pr-review-deleted-comment': function() {
      return false;
    },
    'pr-review-edited-comment': function() {
      return false;
    },
    'pr-review-submitted': function() {
      return false;
    }
  }
};
