import JSONAPISerializer from 'ember-data/serializers/json-api';
import EmbeddedRecordsMixin from 'ember-data';

export default JSONAPISerializer.extend(EmbeddedRecordsMixin,{
  attrs: {
    comment: { embedded: 'always' },
    eventDate: { embedded: 'always' },
    participant: { embedded: 'always' }
  }
});
