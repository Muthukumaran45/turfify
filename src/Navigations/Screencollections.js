import { CustomBottomTabs } from "./BottomNavigation";

// Importing screens dynamically using object grouping
const Screens = {
    BottomTab: {
        ProfileScreen: require("../Screens/BottomTabScreens/ProfileScreen").default,
        BookingScreen: require("../Screens/BottomTabScreens/BookingScreen").default,
        GamesScreen: require("../Screens/BottomTabScreens/GamesScreen").default,
    },
    Initial: {
        LoginScreen: require("../Screens/InitialScreens/LoginScreen").default,
        OtpScreen: require("../Screens/InitialScreens/OtpScreen").default,
        WelcomeScreen: require("../Screens/InitialScreens/WelcomeScreen").default,
        OnboardingScreen: require("../Screens/InitialScreens/OnBoardingScreen").default,
    },
    Sports: {
        CricketScreen: require("../Screens/SportsScreens/CricketScreen").default,
        BadmintonScreen: require("../Screens/SportsScreens/BadmintonScreen").default,
        FootballScreen: require("../Screens/SportsScreens/FootballScreen").default,
        SwimmingScreen: require("../Screens/SportsScreens/SwimmingScreen").default,
    },
    Profile: {
        EditProfileScreen: require("../Screens/ProfileScreens/EditProfileScreen").default,
        HelpScreen: require("../Screens/ProfileScreens/HelpScreen").default,
        PaymentScreen: require("../Screens/ProfileScreens/PaymentScreen").default,
        TournamentEntrollers: require("../Screens/ProfileScreens/TournamentEntrollers").default,
    },
    TurfBooking: {
        TurfDetailsScreen: require("../Screens/TurfBookingScreens/TurfDetailsScreen").default,
        BookingInfoScreen: require("../Screens/TurfBookingScreens/BookingInfoScreen").default,
        BookingDateTimeScreen: require("../Screens/TurfBookingScreens/BookingDateTimeScreen").default,
    },
    Others: {
        WishListScreen: require("../Screens/WishListScreen").default,
        TournamentDetailsScreen: require("../Screens/TournamentDetailsScreen").default,
        TournamentFormScreen: require("../Screens/TournamentFormScreen").default,
        ClaimRewardsPage: require("../Components/Cards/rewards/ClaimRewardsPage").default,
    }
};

export const AllScreen = [
    { name: "BottomNavigation", component: CustomBottomTabs },
    ...Object.entries(Screens).flatMap(([_, category]) =>
        Object.entries(category).map(([name, component]) => ({ name, component }))
    ),
];
