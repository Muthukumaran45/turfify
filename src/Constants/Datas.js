import { LaptopMinimalCheckIcon, UserRoundIcon, HouseIcon, Gamepad2Icon } from "lucide-react-native";
import { Volleyball, Footprints, Aperture } from 'lucide-react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// onboarding data
export const onboardingData = [
    { id: 1, image: require("../Assets/onboardingImg/img1.jpg") },
    { id: 2, image: require("../Assets/onboardingImg/img3.jpg") },
    { id: 3, image: require("../Assets/onboardingImg/img1.jpg") },
];

// data for fadeIn slides
export const slides = [
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg",
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg",
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg",
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg",
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg",
];

export const bottomSlides = [
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg",
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg",
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg",
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg",
    "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg",
];

// data for nearby turf
export const data = [
    { id: '1', title: 'Game On 2.0', location: 'Thoraipakkam, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg' },
    { id: '2', title: 'Spark Academy', location: 'Sholinganallur, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg' },
    { id: '3', title: 'Beyond Arena', location: 'Velachery, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg' },
    { id: '4', title: 'Elite Sports', location: 'Anna Nagar, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg' },
    { id: '5', title: 'Urban Turf', location: 'OMR, Chennai', price: '₹350 ONWARDS', rating: '4.8', image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174876/img3_tt3uu5.jpg' },
];


// turf price data
export const priceData = {
    weekend: {
      title: 'SAT, SUN',
      slots: [
        { time: '06:00 AM - 06:00 PM', price: 1000 },
        { time: '06:00 AM - 06:00 PM', price: 1000 },
        { time: '06:00 AM - 06:00 PM', price: 1000 },
      ]
    },
    weekday: {
      title: 'MON, TUE, WED, THU, FRI',
      slots: [
        { time: '06:00 AM - 06:00 PM', price: 1000 },
        { time: '06:00 AM - 06:00 PM', price: 1000 },
        { time: '06:00 AM - 06:00 PM', price: 1000 },
      ]
    },
    wednesday: {
      title: 'WED',
      slots: [
        { time: '06:00 AM - 06:00 PM', price: 1000 },
        { time: '06:00 AM - 06:00 PM', price: 1000 },
      ]
    }
  };

// Reward data
export const rewardData = [
    {
        id: '1',
        title: 'Game On 2.0',
        location: 'Thoraipakkam, Chennai',
        price: '₹350 ONWARDS',
        rating: '4.8',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174874/img5_nxxq8e.jpg',
        bookingsRequired: 20,
        currentBookings: 16,
    },
    {
        id: '2',
        title: 'Spark Academy',
        location: 'Sholinganallur, Chennai',
        price: '₹350 ONWARDS',
        rating: '4.8',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img1_zc1qkv.jpg',
        bookingsRequired: 20,
        currentBookings: 20,
    },
    {
        id: '3',
        title: 'Beyond Arena',
        location: 'Velachery, Chennai',
        price: '₹350 ONWARDS',
        rating: '4.8',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg',
        bookingsRequired: 20,
        currentBookings: 6,
    },
    {
        id: '4',
        title: 'Elite Sports',
        location: 'Anna Nagar, Chennai',
        price: '₹350 ONWARDS',
        rating: '4.8',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg',
        bookingsRequired: 20,
        currentBookings: 8,
    },
    {
        id: '5',
        title: 'Urban Turf',
        location: 'OMR, Chennai',
        price: '₹350 ONWARDS',
        rating: '4.8',
        image: 'https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174876/img3_tt3uu5.jpg',
        bookingsRequired: 20,
        currentBookings: 20,
    },
];




// upcoming booing data
export const bookingData = {
    date: 'Jan - 13th',
    title: 'Spark Academy',
    venue: 'Strikers, Purasaiwakkam, Chennai',
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
    { id: "1", name: "Cricket", icon: { name: "sports-cricket", library: MaterialIcons }, screen: "CricketScreen" },
    { id: "2", name: "Badminton", icon: { name: "sports-tennis", library: MaterialIcons }, screen: "CricketScreen" },
    { id: "3", name: "Football", icon: { name: "soccer-ball-o", library: FontAwesome }, screen: "CricketScreen" },
    { id: "4", name: "Golf", icon: { name: "sports-golf", library: MaterialIcons }, screen: "CricketScreen" },
    { id: "5", name: "Basketball", icon: { name: "sports-basketball", library: MaterialIcons }, screen: "CricketScreen" },
    { id: "6", name: "Hockey", icon: { name: "sports-hockey", library: MaterialIcons }, screen: "CricketScreen" },
    { id: "7", name: "Volleyball", icon: { name: "sports-volleyball", library: MaterialIcons }, screen: "CricketScreen" },
    { id: "8", name: "Kabaddi", icon: { name: "sports-kabaddi", library: MaterialIcons }, screen: "CricketScreen" },
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

export const tournamentDatas = [
    {
        "_id": "67b33a3b93df5da674a987b7",
        "category": "Football",
        "turfName": "Green Arena",
        "venue": "Green Arena Sports ",
        "location": {
            "type": "Point",
            "coordinates": [
                80.2510542,
                12.9706288
            ]
        },
        "banner": "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg",
        "teamSize": 7,
        "date": "2025-03-15",
        "organizerName": "John Doe",
        "organizerNumber": "+1234567890",
        "title": "Spring Football Championship",
        "rules": "All players must wear proper football gear. No rough tackles allowed.",
        "status": "pending",
        "vendorId": "67ab98a2faa9d788d49fb5f9",
        "__v": 0,
        "createdAt": "2025-02-17T13:31:39.351Z",
        "updatedAt": "2025-02-17T13:31:39.351Z",
        "distance": 0
    },
    {
        "_id": "67b33a3b93df5da674a987b7",
        "category": "Football",
        "turfName": "Green Arena",
        "venue": "Green Arena Sports ",
        "location": {
            "type": "Point",
            "coordinates": [
                80.2510542,
                12.9706288
            ]
        },
        "banner": "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174884/img2_pgsber.jpg",
        "teamSize": 7,
        "date": "2025-03-15",
        "organizerName": "John Doe",
        "organizerNumber": "+1234567890",
        "title": "Spring Football Championship",
        "rules": "All players must wear proper football gear. No rough tackles allowed.",
        "status": "pending",
        "vendorId": "67ab98a2faa9d788d49fb5f9",
        "__v": 0,
        "createdAt": "2025-02-17T13:31:39.351Z",
        "updatedAt": "2025-02-17T13:31:39.351Z",
        "distance": 0
    }

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
            date: "13th",
            venue: "Strikers Academy, Purasaiwakkam, Chennai",
            time: "10 AM - 11:30 AM",
            image: "https://res.cloudinary.com/ddjgg4ecg/image/upload/v1739174881/img4_qt8b36.jpg",
            month: "Jan"
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
