module.exports = {
  name: 'gitlab',
  eventHeader: 'X-Gitlab-Event',
  events: {
    'ping': function() {
      return false;
    },
    'pr-opened': function(header, eventData) {
      return _.isEqual(header, 'Merge Request Hook') &&
            _.isEqual(eventData.object_kind, 'merge_request');
    },
    'pr-merged': function() {
      return false;
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
    'pr-edited': function() {
      return false;
    },
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
