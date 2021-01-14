import { post } from './base';

const ConversationSrv = {
  getList: () =>
    post('/q', {
      data: {
        isMe: 'numberBool',
        isRead: 'numberBool',
        timestamp: 'dateTime|ISOtime',
        message: 'stringAlphaNum|1,200',
        _repeat: 20,
      },
    }),
};

export default ConversationSrv;
