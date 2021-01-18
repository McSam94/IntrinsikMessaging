// import { post } from './base';
import { API_DELAY } from 'Utils/constants';

const fakeGroupConversation = {
	title: 'Happy Family',
	avatar: 'https://picsum.photos/id/237/200/300',
	isGroup: true,
	messages: [
		{
			id: 'n0s5z',
			isRead: false,
			message:
				'fact dead class bottom paint quia did note ten page phrase adipisci spring neck delectus hard color offer suggest labore slow door heavy dolor',
			timestamp: '16:12:08',
			user: 'McSam',
		},
		{
			id: 'dgj2n',
			isRead: true,
			message:
				'safe opposite bread field perhaps prepare range market deal hear try while good read lay made else thus omnis hot voluptas law qui',
			timestamp: '07:22:00',
			user: 'Giuseppe Harris',
		},
		{
			id: '5xhap',
			isRead: true,
			message:
				'block late voice finish atom full perspiciatis fuga light box thank ea view molestiae him occaecati certain had question stream culpa were where gray difficult oil cow too three exercitationem hurry see make white her by molecule',
			timestamp: '07:45:43',
			user: 'Gabriella Brakus',
		},
		{
			id: 'e2tab',
			isRead: true,
			message:
				'cost est right fit verb ab capital push happy score month close necessary planet four people least distinctio nam a corrupti in small chief chair quae twenty call interest debitis quick city might egg multiply out neque',
			timestamp: '14:30:42',
			user: 'McSam',
		},
		{
			id: '6hspw',
			isRead: true,
			message:
				'length asperiores dad stood lie form has sit level wish vitae low unde famous glad separate paper be enim lift look possimus think mass place same soluta error since general arrive heard',
			timestamp: '19:37:46',
			user: 'McSam',
		},
		{
			id: 'u84ns',
			isRead: true,
			message: 'much collect stay accusamus sight swim seem feet aut',
			timestamp: '07:16:13',
			user: 'Gabriella Brakus',
		},
		{
			id: '98snv',
			isRead: true,
			message:
				'fill qui west dream wing their roll hat down voluptatem should teach carry written buy illum moon meat design especially excite few ratione east write enim took wire trip facere blanditiis cupiditate require any show proper pretty',
			timestamp: '00:35:38',
			user: 'McSam',
		},
		{
			id: '0djvf',
			isRead: true,
			message:
				'cover velit my ea art pick top boat wife quia before bright eius praesentium window gold minus tiny plain sat week young was old nostrum quisquam tenetur saw receive yard middle animal rather voluptatem grew sand describe',
			timestamp: '14:51:39',
			user: 'Gabriella Brakus',
		},
		{
			id: '39fgn',
			isRead: true,
			message:
				'poor air probable big fresh ease represent wood division early why bone shine water common support stead wild what great tempore take sign root melody quod similar afraid iste except quis atque finger ship quiet equate ex',
			timestamp: '09:01:39',
			user: 'Gabriella Brakus',
		},
		{
			id: 'jglm9',
			isRead: true,
			message:
				'corn cloud quidem up protect claim floor bell death save rule example for brown cool heat island blow half similique circle rerum clean dark they pass burn stop rerum run ut must molestias speak grow hope order',
			timestamp: '05:19:50',
			user: 'Giuseppe Harris',
		},
	],
};

const fakeConversation = {
	title: 'John Wicked',
	avatar: 'https://picsum.photos/id/237/200/300',
	isGroup: false,
	messages: [
		{
			id: 'n0s5z',
			isRead: false,
			message:
				'did note ten page phrase adipisci spring neck delectus hard color offer suggest labore slow door heavy dolor',
			timestamp: '16:12:08',
			user: 'Giuseppe Harris',
		},
		{
			id: 'dgj2n',
			isRead: false,
			message:
				'safe town deal hear try while good read lay made else thus omnis hot voluptas law qui',
			timestamp: '07:22:00',
			user: 'McSam',
		},
		{
			id: '5xhap',
			isRead: true,
			message:
				'block late voice finish atom full perspiciatis fuga light box thank ea view molestiae him occaecati certain had question stream culpa were where gray difficult oil cow too three exercitationem hurry see make white her by molecule',
			timestamp: '07:45:43',
			user: 'Giuseppe Harris',
		},
		{
			id: 'e2tab',
			isRead: true,
			message:
				'cost est right fit verb ab capital push happy score month close necessary planet four people least distinctio nam a corrupti in small chief chair quae twenty call interest debitis quick city might egg multiply out neque',
			timestamp: '14:30:42',
			user: 'McSam',
		},
		{
			id: '6hspw',
			isRead: true,
			message:
				'length low unde famous glad separate paper be enim lift look possimus think mass place same soluta error since general arrive heard',
			timestamp: '19:37:46',
			user: 'McSam',
		},
		{
			id: 'u84ns',
			isRead: true,
			message:
				'inch would laugh steel paragraph state object voluptatibus sun race minima feel touch itaque sunt et esse connect power ducimus kind ut parent season sheet thousand shoulder sugar much collect stay accusamus sight swim seem feet aut',
			timestamp: '07:16:13',
			user: 'Giuseppe Harris',
		},
		{
			id: '98snv',
			isRead: true,
			message:
				'fill qui west dream wing their roll hat down voluptatem should teach carry written buy illum moon meat design especially excite few ratione east write enim took wire trip facere blanditiis cupiditate require any show proper pretty',
			timestamp: '00:35:38',
			user: 'McSam',
		},
		{
			id: '0djvf',
			isRead: true,
			message:
				'cover velit my ea art pick top boat wife quia before bright eius praesentium window gold minus tiny plain sat week young was old nostrum quisquam tenetur saw receive yard middle animal rather voluptatem grew sand describe',
			timestamp: '14:51:39',
			user: 'Giuseppe Harris',
		},
		{
			id: '39fgn',
			isRead: true,
			message:
				'poor air probable big fresh ease represent wood division early why bone shine water common support stead wild what great tempore take sign root melody quod similar afraid iste except quis atque finger ship quiet equate ex',
			timestamp: '09:01:39',
			user: 'McSam',
		},
		{
			id: 'jglm9',
			isRead: true,
			message:
				'corn cloud quidem up protect claim floor bell death save rule example for brown cool heat island blow half similique circle rerum clean dark they pass burn stop rerum run ut must molestias speak grow hope order',
			timestamp: '05:19:50',
			user: 'Giuseppe Harris',
		},
	],
};

const fakeNewConversation = [
	{
		id: 'jglm9',
		title: 'John Wicked',
		avatar: 'https://picsum.photos/200/300.jpg',
		isGroup: false,
	},
	{
		id: 'asdf8',
		title: 'Alex, Sam',
		avatar: 'https://picsum.photos/200/300.jpg',
		isGroup: true,
	},
];

const ConversationSrv = {
	getList: (conversationId, conversationPage) =>
		// post('/q', {
		// 	data: {
		// 		id: 'stringAlphaNum',
		// 		user: 'name',
		// 		isRead: 'numberBool',
		// 		timestamp: 'dateTime|ISOtime',
		// 		message: 'stringWords|1,200',
		// 		_repeat: 20,
		// 	},
		// }),
		new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					status: 200,
					data: /[8]/.test(conversationId)
						? fakeConversation
						: fakeGroupConversation,
				});
			}, API_DELAY);
		}),
	newConversation: (isGroup) =>
		// post('/q', {
		// 	data: {
		// 		isMe: 'numberBool',
		// 		isRead: 'numberBool',
		// 		timestamp: 'dateTime|ISOtime',
		// 		message: 'stringWords|1,200',
		// 		isGroup,
		// 	},
		// }),
		new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					status: 200,
					data: fakeNewConversation[isGroup ? 1 : 0],
				});
			}, API_DELAY);
		}),
	sendMessage: ({ message, file, image }) =>
		Promise.resolve({
			status: 200,
			data: {
				id: 'a89dm',
				isRead: false,
				message,
				timestamp: '06:15:31',
				image,
				file,
				user: 'McSam',
			},
		}),
};

export default ConversationSrv;
