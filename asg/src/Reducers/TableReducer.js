import {TABLE_ACTION} from '../Action'

const initialState=[
    {
        id:1,
        Name:'Tanu',
        ScreenName:"Linkedin",
        FollowersCount:234,
        FollowingCount:34,
        Location:"Mandya",
        Verified:true

    },
    {
        id:2,
        Name:'Manu',
        ScreenName:"Linkedin",
        FollowersCount:434,
        FollowingCount:367,
        Location:"Ballari",
        Verified:true

    },
    {
        id :3,
        Name:'Nalina',
        ScreenName:"Github",
        FollowersCount:23,
        FollowingCount:3,
        Location:"Bangalore",
        Verified:true

    },
    {
        id:4,
        Name:'Lalli',
        ScreenName:"Link",
        FollowersCount:204,
        FollowingCount:340,
        Location:"Mysore",
        Verified:true

    },
    {
        id:5,
        Name:'Sahana',
        ScreenName:"Whatsapp",
        FollowersCount:404,
        FollowingCount:360,
        Location:"Bangalore",
        Verified:true

    },
    {
        id :6,
        Name:'Kusuma',
        ScreenName:"Github",
        FollowersCount:230,
        FollowingCount:35,
        Location:"Bannergatta",
        Verified:true

    }
]



export default function tablereducer (state={initialState},action){
    switch(action.type){
        case TABLE_ACTION.DATA:
            return{...state,alldata:state};
        default:
            return state
    }
}