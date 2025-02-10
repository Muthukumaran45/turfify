import ProfileScreen from "../Screens/ProfileScreen"
import BookingScreen from "../Screens/BookingScreen"
import GamesScreen from "../Screens/GamesScreen"

// Bottom Bar
import { CustomBottomTabs } from "./BottomNavigation"

// Initial Screens
import LoginScreen from "../Screens/InitialScreens/LoginScreen"
import OtpScreen from "../Screens/InitialScreens/OtpScreen"


// sports screen
import CricketScreen from "../Screens/SportsScreens/CricketScreen"
import BadmintonScreen from "../Screens/SportsScreens/BadmintonScreen"
import FootballScreen from "../Screens/SportsScreens/FootballScreen"
import SwimmingScreen from "../Screens/SportsScreens/SwimmingScreen"

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
    {
        name: "LoginScreen",
        component: LoginScreen,
    },
    {
        name: "OtpScreen",
        component: OtpScreen,
    },
    {
        name: "CricketScreen",
        component: CricketScreen,
    },
    {
        name: "BadmintonScreen",
        component: BadmintonScreen,
    },
    {
        name: "FootballScreen",
        component: FootballScreen,
    },
    {
        name: "SwimmingScreen",
        component: SwimmingScreen,
    },
]