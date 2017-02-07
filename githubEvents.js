module.exports = {
  name: 'github',
  eventHeader: 'X-GitHub-Event',
  events: {
    'ping': function(header) {
      return _.isEqual(header, 'ping');
    },
    'pr-opened': function(header, eventData) {
      return _.isEqual(header, 'pull_request') &&
            _.isEqual(eventData.action, 'opened');
    },
    'pr-merged': function(header, eventData) {
      return _.isEqual(header, 'pull_request') &&
            _.isEqual(eventData.action, 'closed') &&
            eventData.pull_request.merged;
    },
    'pr-labeled-on-creation': function(header, eventData) {
      return _.isEqual(header, 'pull_request') &&
            _.isEqual(eventData.action, 'labeled') &&
            _.isEqual(
                eventData.pull_request.updated_at,
                eventData.pull_request.created_at);
    },
    'pr-labeled': function(header, eventData) {
      return _.isEqual(header, 'pull_request') &&
            _.isEqual(eventData.action, 'labeled');
    },
    'pr-unlabeled': function(header, eventData) {
      return _.isEqual(header, 'pull_request') &&
            _.isEqual(eventData.action, 'unlabeled');
    },
    'pr-edited': function(header, eventData) {
      return _.isEqual(header, 'pull_request') &&
            _.isEqual(eventData.action, 'edited');
    },
  ///////
    'pr-reviewer-requested': function(header, eventData) {
      return _.isEqual(header, 'pull_request') &&
            _.isEqual(eventData.action, 'review_requested');
    },
    'pr-reviewer-removed': function(header, eventData) {
      return _.isEqual(header, 'pull_request') &&
            _.isEqual(eventData.action, 'review_request_removed');
    },
    'pr-review-created-comment': function(header, eventData) {
      return _.isEqual(header, 'pull_request_review_comment') &&
            _.isEqual(eventData.action, 'created');
    },
    'pr-review-deleted-comment': function(header, eventData) {
      return _.isEqual(header, 'pull_request_review_comment') &&
            _.isEqual(eventData.action, 'deleted');
    },
    'pr-review-edited-comment': function(header, eventData) {
      return _.isEqual(header, 'pull_request_review_comment') &&
            _.isEqual(eventData.action, 'edited');
    },
    'pr-review-submitted': function(header, eventData) {
      return _.isEqual(header, 'pull_request_review') &&
            _.isEqual(eventData.action, 'submitted');
    }
  }
};
