const data = {};

data.users = [
    {
        uuid: "a1",
        username: "JakeIkola",
        email: "jake@test.com",
        password: "test",
        idCode: 34567,
        preferredColor: 'blue'
    },
    {
        uuid: "a2",
        username: 'NatalieHammond',
        email: "natalie@test.com",
        password: "test",
        idCode: 11301,
        preferredColor: 'yellow'
    },
    {
        uuid: "a3",
        username: "LandoneValley",
        email: "landon@test.com",
        password: "test",
        idCode: 34123,
        preferredColor: 'green'
    },
    {
        uuid: "a4",
        username: "KimJason",
        email: "kim@test.com",
        password: "test",
        idCode: 11301,
        preferredColor: 'pink'
    },
    {
        uuid: "a5",
        username: "IsaacWeir",
        email: "isaactest@test.com",
        password: "test",
        idCode: 98234,
        preferredColor: 'purple'
    },
    {
        uuid: "a6",
        username: "SaraFrazier",
        email: "saratest@test.com",
        password: "test",
        idCode: 11301,
        preferredColor: 'red'
    },
];

data.friendsOfJake = [
    {
        uuid: "a2",
        username: 'NatalieHammond',
        email: "natalie@test.com",
        password: "test",
        idCode: 11301,
        preferredColor: 'yellow'
    },
    {
        uuid: "a3",
        username: "LandoneValley",
        email: "landon@test.com",
        password: "test",
        idCode: 34123,
        preferredColor: 'green'
    },
    {
        uuid: "a4",
        username: "KimJason",
        email: "kim@test.com",
        password: "test",
        idCode: 11301,
        preferredColor: 'pink'
    },
    {
        uuid: "a5",
        username: "IsaacWeir",
        email: "isaactest@test.com",
        password: "test",
        idCode: 98234,
        preferredColor: 'purple'
    },
    {
        uuid: "a6",
        username: "SaraFrazier",
        email: "saratest@test.com",
        password: "test",
        idCode: 11301,
        preferredColor: 'red'
    }
]

data.friendRequests = [
    // From sara to Jake
    {
        uuid: "d1",
        userFrom: {
            uuid: "a6",
            username: "SaraFrazier",
            email: "saratest@test.com",
            password: "test",
            idCode: 11301,
            preferredColor: 'red'
        },
        userTo: {
            uuid: "a1",
            username: "JakeIkola",
            email: "jake@test.com",
            password: "test",
            idCode: 34567,
            preferredColor: 'blue'
        }
    },
    // From Isaac to Jake
    {
        uuid: "d2",
        userFrom: {
            uuid: "a5",
            username: "IsaacWeir",
            email: "isaactest@test.com",
            password: "test",
            idCode: 98234,
            preferredColor: 'purple'
        },
        userTo: {
            uuid: "a1",
            username: "JakeIkola",
            email: "jake@test.com",
            password: "test",
            idCode: 34567,
            preferredColor: 'blue'
        }
    },
    // From Jake to Natalie
    {
        uuid: "d3",
        userFrom: {
            uuid: "a1",
            username: "JakeIkola",
            email: "jake@test.com",
            password: "test",
            idCode: 34567,
            preferredColor: 'blue'
        },
        userTo: {
            uuid: "a2",
            username: 'NatalieHammond',
            email: "natalie@test.com",
            password: "test",
            idCode: 11301,
            preferredColor: 'yellow'
        }
    }
]

data.conversationList = [
    {
        uuid: 'b1',
        type: 'group',
        name: 'Calc Study Group',
        preferredColor: 'red',
        users: [
            {
                uuid: "a5",
                username: "IsaacWeir",
                email: "isaactest@test.com",
                password: "test",
                idCode: 98234,
                preferredColor: 'purple'
            },
            {
                uuid: "a3",
                username: "LandonValley",
                email: "landon@test.com",
                password: "test",
                idCode: 34123,
                preferredColor: 'green'
            },
            {
                uuid: "a1",
                username: "JakeIkola",
                email: "jake@test.com",
                password: "test",
                idCode: 34567,
                preferredColor: 'blue'
            }
        ],
        messages: [
            {
                uuid: 'c1',
                date: 'November 10, 2021',
                author: {
                    uuid: "a5",
                    username: "IsaacWeir",
                    email: "isaactest@test.com",
                    password: "test",
                    idCode: 98234,
                    preferredColor: 'purple'
                },
                hidden: false,
                edited: false,
                content: 'Hey, do tou guys have any interest in studying some Calc later?',
                createdAt: '4:32pm'
            },
            {
                uuid: 'c2',
                date: 'November 10, 2021',
                author: {
                    uuid: "a3",
                    username: "LandonValley",
                    email: "landon@test.com",
                    password: "test",
                    idCode: 34123,
                    preferredColor: 'green'
                },
                hidden: false,
                edited: false,
                content: "For sure, it is probs for the best since there's that test coming up...",
                createdAt: '4:32pm'
            },
            {
                uuid: 'c3',
                date: 'November 10, 2021',
                author: {
                    uuid: "a1",
                    username: "JakeIkola",
                    email: "jake@test.com",
                    password: "test",
                    idCode: 34567,
                    preferredColor: 'blue'
                },
                hidden: false,
                edited: false,
                content: "Totally, I'll see you guys at the library in like 30mins!",
                createdAt: '4:32pm'
            },
            {
                uuid: 'c1',
                date: 'November 10, 2021',
                author: {
                    uuid: "a5",
                    username: "IsaacWeir",
                    email: "isaactest@test.com",
                    password: "test",
                    idCode: 98234,
                    preferredColor: 'purple'
                },
                hidden: false,
                edited: false,
                content: 'Hey, do tou guys have any interest in studying some Calc later?',
                createdAt: '4:32pm'
            },
            {
                uuid: 'c2',
                date: 'November 10, 2021',
                author: {
                    uuid: "a3",
                    username: "LandonValley",
                    email: "landon@test.com",
                    password: "test",
                    idCode: 34123,
                    preferredColor: 'green'
                },
                hidden: false,
                edited: false,
                content: "For sure, it is probs for the best since there's that test coming up...",
                createdAt: '4:32pm'
            },
            {
                uuid: 'c3',
                date: 'November 10, 2021',
                author: {
                    uuid: "a1",
                    username: "JakeIkola",
                    email: "jake@test.com",
                    password: "test",
                    idCode: 34567,
                    preferredColor: 'blue'
                },
                hidden: false,
                edited: false,
                content: "Totally, I'll see you guys at the library in like 30mins!",
                createdAt: '4:32pm'
            },
            {
                uuid: 'c1',
                date: 'November 10, 2021',
                author: {
                    uuid: "a5",
                    username: "IsaacWeir",
                    email: "isaactest@test.com",
                    password: "test",
                    idCode: 98234,
                    preferredColor: 'purple'
                },
                hidden: false,
                edited: false,
                content: 'Hey, do tou guys have any interest in studying some Calc later?',
                createdAt: '4:32pm'
            },
            {
                uuid: 'c2',
                date: 'November 10, 2021',
                author: {
                    uuid: "a3",
                    username: "LandonValley",
                    email: "landon@test.com",
                    password: "test",
                    idCode: 34123,
                    preferredColor: 'green'
                },
                hidden: false,
                edited: false,
                content: "For sure, it is probs for the best since there's that test coming up...",
                createdAt: '4:32pm'
            },
            {
                uuid: 'c3',
                date: 'November 10, 2021',
                author: {
                    uuid: "a1",
                    username: "JakeIkola",
                    email: "jake@test.com",
                    password: "test",
                    idCode: 34567,
                    preferredColor: 'blue'
                },
                hidden: false,
                edited: false,
                content: "Totally, I'll see you guys at the library in like 30mins!",
                createdAt: '4:32pm'
            }
        ]
    },
    {
        uuid: 'b2',
        type: 'single',
        name: '',
        preferredColor: 'blue',
        users: [
            {
                uuid: "a6",
                username: "SaraFrazier",
                email: "saratest@test.com",
                password: "test",
                idCode: 11301,
                preferredColor: 'red'
            },
            {
                uuid: "a1",
                username: "JakeIkola",
                email: "jake@test.com",
                password: "test",
                idCode: 34567,
                preferredColor: 'blue'
            }
        ],
        messages: [
            {
                uuid: 'c4',
                date: 'November 11, 2021',
                author: {
                    uuid: "a6",
                    username: "SaraFrazier",
                    email: "saratest@test.com",
                    password: "test",
                    idCode: 11301,
                    preferredColor: 'red'
                },
                hidden: false,
                edited: false,
                content: "What's up brother?",
                createdAt: '4:32pm'
            },
            {
                uuid: 'c5',
                date: 'November 11, 2021',
                user: {
                    uuid: "a1",
                    username: "JakeIkola",
                    email: "jake@test.com",
                    password: "test",
                    idCode: 34567,
                    preferredColor: 'blue'
                },
                hidden: false,
                edited: false,
                content: "I'm pretty busy today, but would you want to go shopping tomorrow?",
                createdAt: '4:32pm'
            },
            {
                uuid: 'c6',
                date: 'November 11, 2021',
                author: {
                    uuid: "a6",
                    username: "SaraFrazier",
                    email: "saratest@test.com",
                    password: "test",
                    idCode: 11301,
                    preferredColor: 'red'
                },
                hidden: false,
                edited: false,
                content: "What's up brother?",
                createdAt: '4:32pm'
            },
            {
                uuid: 'c7',
                date: 'November 12, 2021',
                author: {
                    uuid: "a6",
                    username: "SaraFrazier",
                    email: "saratest@test.com",
                    password: "test",
                    idCode: 11301,
                    preferredColor: 'red'
                },
                hidden: false,
                edited: false,
                content: "I'm out front whenever you're ready",
                createdAt: '4:32pm'
            },
        ]
    },
]

data.archiveList = [

]

module.exports = data;