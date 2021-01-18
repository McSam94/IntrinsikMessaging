// import { post } from './base';
import { API_DELAY } from 'Utils/constants';

const fakeContactList = [
	{
		avatar: 'https://robohash.org/visit.png?size=300x300',
		id: 'yiht9',
		mobile: '(809) 468-8930',
		name: 'Jayden Lynch',
	},
	{
		avatar: 'https://robohash.org/which.png?size=300x300',
		id: 'iy4g2',
		mobile: '(816) 763-0973',
		name: 'Ansley Maggio',
	},
	{
		avatar: 'https://robohash.org/share.png?size=300x300',
		id: 'pk5q0',
		mobile: '971-408-2856',
		name: 'Madelynn Heathcote',
	},
	{
		avatar: 'https://robohash.org/laborum.png?size=300x300',
		id: '6rjwr',
		mobile: '(913) 568-2501',
		name: 'Braden Sauer',
	},
	{
		avatar: 'https://robohash.org/object.png?size=300x300',
		id: 'fktcz',
		mobile: '1-138-883-6310',
		name: 'Justen Will',
	},
	{
		avatar: 'https://robohash.org/occur.png?size=300x300',
		id: '9eonu',
		mobile: '215-463-5940',
		name: 'Erik Grant',
	},
	{
		avatar: 'https://robohash.org/shop.png?size=300x300',
		id: 'wvuz6',
		mobile: '788.408.6366',
		name: 'Vilma Kiehn',
	},
	{
		avatar: 'https://robohash.org/road.png?size=300x300',
		id: '6khvn',
		mobile: '1-858-950-8603',
		name: 'Estelle Johns',
	},
	{
		avatar: 'https://robohash.org/only.png?size=300x300',
		id: '7nyxs',
		mobile: '1-548-281-2994',
		name: 'Schuyler Kessler',
	},
	{
		avatar: 'https://robohash.org/ever.png?size=300x300',
		id: '4su6z',
		mobile: '659-144-4512',
		name: 'Zackery Swift',
	},
];

const ContactSrv = {
	getList: () =>
		// post('/q', {
		// 	data: {
		// 		id: 'stringAlphaNum',
		// 		name: 'personNickname',
		// 		mobile: 'phoneMobile',
		// 		avatar: 'personAvatar',
		// 		_repeat: 35,
		// 	},
		// }),
		new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					status: 200,
					data: fakeContactList,
				});
			}, API_DELAY);
		}),
};

export default ContactSrv;
