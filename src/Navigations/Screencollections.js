import ProfileScreen from "../Screens/ProfileScreen"
import BookingScreen from "../Screens/BookingScreen"
import GamesScreen from "../Screens/GamesScreen"

// BottomBar
import { CustomBottomTabs } from "./BottomNavigation"

export const AllScreen = [
    {
        name: "BottomNavigation",
        component: CustomBottomTabs,
    },
    {
        name: "ProfileScreen",
        component: ProfileScreen,
    },
    {
        name: "BookingScreen",
        component: BookingScreen,
    },
    {
        name: "GamesScreen",
        component: GamesScreen,
    },
]