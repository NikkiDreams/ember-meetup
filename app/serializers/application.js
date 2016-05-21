import JSONAPISerializer from 'ember-data/serializers/json-api';
import EmbeddedRecordsMixin from 'ember-data';

export default JSONAPISerializer.extend(EmbeddedRecordsMixin,{
  attrs: {
    creator: { embedded: 'always' },
    comment: { embedded: 'always' },
    date: { embedded: 'always' },
    participant: { embedded: 'always' },
    __private: { embedded: 'always' }
  }
});
