import { post } from './base';

const fakeChatList = [
  {
    avatar: 'https://robohash.org/season.png?size=300x300',
    id: '0wkre',
    lastMessage:
      'coat walk supply officiis aperiam port captain include heart decide sing guess ex check spell et',
    name: 'Stefan Considine',
    phone: '304.706.0568',
  },
  {
    avatar: 'https://robohash.org/view.png?size=300x300',
    id: '83qlh',
    lastMessage: 'box such sell except blood',
    name: "Reed O'Kon",
    phone: '293.489.8146',
  },
  {
    avatar: 'https://robohash.org/hit.png?size=300x300',
    id: 'u4dpj',
    lastMessage:
      'temperature cool vero change joy et excepturi neck cook card autem since atque similique ground would least dollar first quart est repellendus trouble',
    name: 'Eudora Zieme',
    phone: '755.514.8193',
  },
  {
    avatar: 'https://robohash.org/illo.png?size=300x300',
    id: 'i86sl',
    lastMessage:
      'letter east write mean star too parent fire how nemo rest quis aut',
    name: 'Freda Thiel',
    phone: '1-512-566-3522',
  },
  {
    avatar: 'https://robohash.org/total.png?size=300x300',
    id: 'dvz1e',
    lastMessage:
      'if impedit each yet ipsam special reply skin rose lead pay break sugar trip again team fit mark school',
    name: 'Karl Lynch',
    phone: '1-933-596-7891',
  },
  {
    avatar: 'https://robohash.org/necessary.png?size=300x300',
    id: 'rs4rr',
    lastMessage:
      'leg crease dictionary question made power fuga down street of twenty animi earth went bank sign machine evening sleep next metal main wash rerum magni quiet discuss company accusantium settle imagine eat',
    name: 'Adeline Gulgowski',
    phone: '421.714.3154',
  },
  {
    avatar: 'https://robohash.org/wheel.png?size=300x300',
    id: 'mpeh0',
    lastMessage: 'position rail hope',
    name: 'Chesley Kunze',
    phone: '936-793-7019',
  },
  {
    avatar: 'https://robohash.org/problem.png?size=300x300',
    id: 'zpv0v',
    lastMessage:
      'whether help soft sed ut ball run air ipsum consider quibusdam nothing knew libero while direct written gray dad huge qui fell sharp sint compare vel nine deserunt et she both offer',
    name: "Dovie O'Reilly",
    phone: '457.050.2579',
  },
  {
    avatar: 'https://robohash.org/optio.png?size=300x300',
    id: 'r7exr',
    lastMessage:
      'present vitae recusandae master noun iste nose to numquam iure veniam one light afraid love spread half our flow reiciendis mother',
    name: 'Allene Schoen',
    phone: '498-951-2286',
  },
  {
    avatar: 'https://robohash.org/est.png?size=300x300',
    id: 'a68sj',
    lastMessage:
      'sint laugh ring climb strong odio smile fear rope blow eligendi sit facere end no qui finger differ product tenetur subject warm girl step fruit death left class fight caught will during',
    name: 'Jamil Parisian',
    phone: '1-545-789-8912',
  },
];

const ChatSrv = {
  getList: () =>
    // post('/q', {
    //   data: {
    //     id: 'stringAlphaNum',
    //     name: 'name',
    //     phone: 'phoneMobile',
    //     avatar: 'personAvatar',
    //     lastMessage: 'stringWords|12,50',
    //     _repeat: 25,
    //   },
    // }),
    Promise.resolve({
      status: 200,
      data: fakeChatList,
    }),
};

export default ChatSrv;
