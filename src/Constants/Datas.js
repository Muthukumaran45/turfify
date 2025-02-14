import { LaptopMinimalCheckIcon, UserRoundIcon, HouseIcon, Gamepad2Icon } from "lucide-react-native";
import { Volleyball, Footprints, Aperture } from 'lucide-react-native';

// onboarding data
export const onboardingData = [
    { id: 1, image: require("../Assets/onboardingImg/img1.jpg") },
    { id: 2, image: require("../Assets/onboardingImg/img3.jpg") },
    { id: 3, image: require("../Assets/onboardingImg/img1.jpg") },
];

// data for fadeIn slides
export const slides = [
    { id: "1", image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg" },
    { id: "2", image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg" },
    { id: "3", image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg" },
    { id: "4", image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg" },
];

// data for Horizontal cards
export const data = [
    { id: '1', title: 'Game On 2.0', location: 'Thoraipakkam, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg' },
    { id: '2', title: 'Spark Academy', location: 'Sholinganallur, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg' },
    { id: '3', title: 'Beyond Arena', location: 'Velachery, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg' },
    { id: '4', title: 'Elite Sports', location: 'Anna Nagar, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg' },
    { id: '5', title: 'Urban Turf', location: 'OMR, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174876/img3_tt3uu5.jpg' },
];

// upcoming booing data
export const bookingData = {
    date: 'Jan - 13th',
    title: 'Spark Academy',
    venue: 'Strikers Academy, Purasaiwakkam, Chennai',
    time: '10 AM - 11:30 AM'
  };

export const perfectData = [
    { id: '1', title: 'Game On 2.0', location: 'Thoraipakkam, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg' },
    { id: '2', title: 'Spark Academy', location: 'Sholinganallur, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg' },
    { id: '3', title: 'Beyond Arena', location: 'Velachery, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg' },
    { id: '4', title: 'Elite Sports', location: 'Anna Nagar, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174876/img3_tt3uu5.jpg' },
    { id: '5', title: 'Urban Turf', location: 'OMR, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg' },
];

// icons
export const sportsData = [
    { id: "1", name: "Cricket", icon: LaptopMinimalCheckIcon, screen: "CricketScreen" },
    { id: "2", name: "Badminton", icon: UserRoundIcon, screen: "BadmintonScreen" },
    { id: "3", name: "Football", icon: HouseIcon, screen: "FootballScreen" },
    { id: "4", name: "Swimming", icon: Gamepad2Icon, screen: "SwimmingScreen" },
    { id: "5", name: "Badminton", icon: UserRoundIcon, screen: "BadmintonScreen" },
    { id: "6", name: "Football", icon: HouseIcon, screen: "FootballScreen" },
    { id: "7", name: "Cricket", icon: LaptopMinimalCheckIcon, screen: "CricketScreen" },
    { id: "8", name: "Badminton", icon: UserRoundIcon, screen: "BadmintonScreen" },
];

// large card data
export const CardListData = [
    {
        id: '1',
        title: 'Strikers Academy',
        location: 'Purasaiwakkam, Chennai',
        price: '800/hr',
        rating: '4.8',
        discount: '₹150 OFF',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg'
    },
    {
        id: '2',
        title: 'Strikers Academy',
        location: 'Purasaiwakkam, Chennai',
        price: '800/hr',
        rating: '4.8',
        discount: '₹100 OFF',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg'
    },
    {
        id: '3',
        title: 'Strikers Academy',
        location: 'Purasaiwakkam, Chennai',
        price: '800/hr',
        rating: '4.8',
        discount: '₹100 OFF',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg'
    },
    {
        id: '4',
        title: 'Strikers Academy',
        location: 'Purasaiwakkam, Chennai',
        price: '800/hr',
        rating: '4.8',
        discount: '₹100 OFF',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg'
    },
];

export const categoryData = [
    { id: '1', name: 'Cricket', icon: Volleyball, leftBgColor: '#FFCDD2', rightBgColor: '#4CAF50', textColor: '#FFF', iconColor: '#D32F2F' },
    { id: '2', name: 'Football', icon: Footprints, leftBgColor: '#BBDEFB', rightBgColor: '#FFFFFF', textColor: '#000', iconColor: '#1976D2' },
    { id: '3', name: 'Basketball', icon: Aperture, leftBgColor: '#FFECB3', rightBgColor: '#FF9800', textColor: '#FFF', iconColor: '#F57C00' },
];

export const tournamentData = [
    {
        id: "1",
        image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg",
        title: "Strikers Academy",
        venue: "Strikers Academy, Purasaiwakkam, Chennai",
        date: "12th & 13th Oct",
        teamSize: "7+1",
    },
    {
        id: "2",
        image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg",
        title: "Elite Cricket League",
        venue: "Elite Ground, Anna Nagar, Chennai",
        date: "20th & 21st Oct",
        teamSize: "8+2",
    },

];

// wishlist data
export const WishListData = [
    {
        id: '1',
        title: 'Strikers Academy',
        location: 'Purasaiwakkam, Chennai',
        price: '800/hr',
        rating: '4.8',
        discount: '₹150 OFF',
        images: [
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',

        ]
    },
    {
        id: '2',
        title: 'Strikers Academy',
        location: 'Purasaiwakkam, Chennai',
        price: '800/hr',
        rating: '4.8',
        discount: '₹100 OFF',
        images: [
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
            'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',


        ]
    }
];

// upcoming booking data
export const bookings = {
    upcoming: [
        {
            id: "1",
            title: "Spark Academy",
            date: "Jan - 13th",
            venue: "Strikers Academy, Purasaiwakkam, Chennai",
            time: "10 AM - 11:30 AM",
            image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg",
        },
    ],
    past: [
        {
            id: "2",
            title: "Strikers Academy",
            location: "Purasaiwakkam, Chennai",
            distance: "0.5 km",
            image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg",
        },
        {
            id: "3",
            title: "Strikers Academy",
            location: "Purasaiwakkam, Chennai",
            distance: "0.5 km",
            image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg",
        },
    ],
};

// past booking data
export const pastBookingData = [
    {
        name: 'Strikers Academy',
        location: 'Purasaiwakkam, Chennai',
        rating: 4.8,
        distance: 1.5,
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg'
    },
    {
        name: 'Elite Sports Arena',
        location: 'Anna Nagar, Chennai',
        rating: 4.6,
        distance: 2.2,
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg'
    }
];
