export const servicesList = [
	{
		_id: '63f3c5e2050417920192d107',
		typeId: '1',
		name: 'Makeup',
	},
	{
		_id: '63f3c63b050417920192d10b',
		typeId: '2',
		name: 'Hair',
	},
	{
		_id: '63f52112c35b42795e16ea08',
		typeId: '3',
		name: 'Brows',
	},
	{
		_id: '63f5211dc35b42795e16ea0b',
		typeId: '4',
		name: 'Nails',
	},
	{
		_id: '63f52129c35b42795e16ea0e',
		typeId: '5',
		name: 'Cosmetology',
	},
	{
		_id: '63f52133c35b42795e16ea11',
		typeId: '6',
		name: 'Massage',
	},
];

// export const masters = [];

export const masters = [
	{
		"location": {
		  "type": "Point",
		  "coordinates": [
			30.25591805223099,
			50.39864236259345
		  ]
		},
		"_id": "63ed2779b3b49a25009ec932",
		"username": "Lara",
		"email": "lara@email.com",
		"password": "$2b$10$fbyuwolcpdUNdVbk/q7knubGh5cyyMqKKtKlGg2c/qJrFg3uPSy9q",
		"role": "MASTER",
		"address": "Location of Lara",
		"services": [
		  "1",
		  "3",
		  "4"
		]
	  },
	  {
		"location": {
		  "type": "Point",
		  "coordinates": [
			30.38109429985,
			50.42265589985
		  ]
		},
		"_id": "63ed2ef713dc5aa5d4f05d85",
		"username": "Martha",
		"email": "martha@email.com",
		"password": "$2b$10$k.tlkVMAIjMcynAS88YSZeVewurL9X3kHVjq7cgI/9Wp0H32/uufq",
		"role": "MASTER",
		"__v": 0,
		"address": "Location of Martha",
		"profileImage": "profile-marthace7d3cb1-f87b-4e5e-a79a-1219b6d1aa2d.jpg",
		"services": [
		  "4",
		  "5",
		  "3"
		]
	  },
	  {
		"location": {
		  "type": "Point",
		  "coordinates": [
			30.355796028198206,
			50.42155556100488
		  ]
		},
		"_id": "63ed265cd1819b633bd20595",
		"username": "Rosie",
		"email": "rosie@email.com",
		"password": "$2b$10$sbDhNqEBiArwOMcDN0k3lunUd7trN/D/LsDXBtrkoZypPG9hbiKQC",
		"role": "MASTER",
		"address": "Location of Rosie",
		"profileImage": "profile-rosie02c12039-1039-4cb0-bb98-df0d315da381.jpeg",
		"services": [
		  "2",
		  "4"
		]
	  },
	  {
		// "location": {
		//   "type": "Point",
		//   "coordinates": [
		// 	31.355796028198206,
		// 	50.42155556100488
		//   ]
		// },
		"_id": "648761eea64d863af28cd61b",
		"username": "Joe",
		"email": "joe@email.com",
		"password": "$2b$10$VyoKYucOsjbKVr9DyEXhuen51wlgBrg2uVtZt4SwO3CQ1EdW44hyW",
		"role": "MASTER",
		"services": [],
	  },
]