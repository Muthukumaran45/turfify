import BigBox from "../Components/Others/BigBox";
import ChatScreen from "../Screens/Chat";
import Home from "../Screens/Home";
import Live from "../Screens/Live";
import Login from "../Screens/Login";
import Network from "../Screens/Netwrok";
import Nofiticationtets from "../Screens/Nofiticationtets";
import Reports from "../Screens/Reports";
import Scheduled from "../Screens/Scheduled";
import TextHome from "../Screens/TextHome";



export const AllScreen=[

    {
        name:"Login",
        component:Login,
    },

    {
        name:"Network",
        component:Network
    },
    {
        name:"Home",
        component:Home
    },
    {
        name:"Scheduled",
        component:Scheduled
    },
    {
        name:"Live",
        component:Live
    },
    {
        name:"chat",
        component:ChatScreen
    },
    {
        name:"Notification",
        component:Nofiticationtets
    },
    {
        name:"TextHome",
        component:TextHome
    },
    {
        name:"BigBox",
        component:BigBox
    },
  
    {
        name:"Reports",
        component:Reports
    },
  
]