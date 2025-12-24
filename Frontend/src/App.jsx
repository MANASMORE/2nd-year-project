import React, { useState, useEffect, useRef, useMemo } from 'react';


const HomeIcon = ({ isActive }) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill={isActive ? "white" : "#747877"} />
    </svg>
);

const ProfileIcon = ({ isActive }) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z" fill={isActive ? "white" : "#747877"}/>
    </svg>
);

const LocationIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="black"/>
    </svg>
);

const CarIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.85 7H17.14L18.5 11H5.5L6.85 7ZM19 17H5V13H19V17Z" fill="black"/>
        <circle cx="7.5" cy="15.5" r="1.5" fill="black"/>
        <circle cx="16.5" cy="15.5" r="1.5" fill="black"/>
    </svg>
);

const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20ZM19 7H5V6H19V7Z" fill="black"/>
    </svg>
);

const BackArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" fill="white"/>
    </svg>
);

const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="white"/>
    </svg>
);

const CarSpotIcon = ({ isBooked, isSelected, onClick }) => (
    <div
        className={`relative w-24 h-16 filter drop-shadow-lg cursor-pointer ${isBooked ? 'opacity-40' : ''}`}
        onClick={onClick} 
    >
        <div className={`w-full h-12 rounded-lg ${isSelected ? 'bg-green-500' : 'bg-black'} absolute top-1`}></div>
        <div className={`w-6 h-3 bg-black rounded-t-lg absolute top-0 left-3`}></div>
        <div className={`w-6 h-3 bg-black rounded-t-lg absolute top-0 right-3`}></div>
        <div className={`w-6 h-3 bg-black rounded-b-lg absolute bottom-0 left-3`}></div>
        <div className={`w-6 h-3 bg-black rounded-b-lg absolute bottom-0 right-3`}></div>
    </div>
);

const AddIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="white"/>
    </svg>
);

const ArrowUpIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="black"/>
    </svg>
);

const ArrowDownIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" fill="black"/>
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="black" />
    </svg>
);


const QRIcon = () => (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M4 4h6v6H4V4zm2 2h2v2H6V6zM4 14h6v6H4v-6zm2 2h2v2H6v-2zm10-10h6v6h-6V4zm2 2h2v2h-2V6zM14.5 14h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2-6h1v1h-1v-1zm0 2h1v1h-1v-1zm-4 2h1v1h-1v-1zm2 0h1v1h-1v-1zm0 2h1v1h-1v-1zm2-4h1v1h-1v-1zm0-2h1v1h-1v-1zm0 4h1v1h-1v-1zm2 0h1v1h-1v-1z" fill="black"/>
    </svg>
);

// GPay Icon (Official Logo)
const GPayIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.38 8.31C19.38 7.96 19.32 7.61 19.22 7.28C19.12 6.95 18.98 6.64 18.8 6.36C18.42 5.79 17.92 5.3 17.3 4.92C16.68 4.54 15.98 4.28 15.22 4.16C14.45 4.04 13.68 4 12.88 4C11.5 4 10.2 4.31 9.02 4.9C7.83 5.5 6.88 6.36 6.18 7.48C5.48 8.6 5.12 9.88 5.12 11.32C5.12 12.33 5.3 13.25 5.65 14.09C6 14.93 6.52 15.65 7.18 16.26C7.36 16.44 7.52 16.6 7.68 16.74C7.82 16.86 7.98 16.99 8.14 17.12L8.14 17.13C8.42 17.35 8.64 17.52 8.79 17.64C9.11 17.88 9.32 18.06 9.42 18.16C10.26 18.9 11.28 19.38 12.48 19.6C12.72 19.64 12.98 19.68 13.24 19.72C13.52 19.76 13.78 19.78 14.04 19.8C14.47 19.84 14.9 19.86 15.34 19.86C16.3 19.86 17.18 19.7 17.98 19.38C18.78 19.06 19.48 18.58 20.06 17.96C20.64 17.34 21.06 16.6 21.28 15.76C21.46 15.1 21.54 14.4 21.54 13.66C21.54 12.3 21.1 11.12 20.24 10.12C19.88 9.68 19.5 9.16 19.38 8.31ZM14.04 17.98C13.68 17.96 13.34 17.94 13.02 17.88C12.16 17.72 11.4 17.32 10.74 16.68C10.08 16.04 9.6 15.22 9.3 14.22C9 13.22 8.84 12.18 8.84 11.1C8.84 9.9 9.06 8.8 9.5 7.82C9.94 6.84 10.58 6.04 11.4 5.42C12.22 4.8 13.16 4.4 14.22 4.22C14.72 4.14 15.2 4.1 15.66 4.1C16.12 4.1 16.56 4.14 16.98 4.2C17.4 4.28 17.78 4.38 18.12 4.52C18.46 4.66 18.76 4.82 19.02 5.02L12.52 11.52L12.52 11.54L10.9 13.16L10.88 13.18L8.68 15.38C8.5 15.16 8.36 14.96 8.24 14.78C8.12 14.6 8.02 14.42 7.94 14.22C7.72 13.7 7.6 13.12 7.6 12.5C7.6 11.48 7.82 10.56 8.26 9.76C8.7 8.96 9.3 8.3 10.06 7.78C10.82 7.26 11.68 6.9 12.64 6.7C13.1 6.6 13.56 6.56 14.02 6.56C14.48 6.56 14.94 6.6 15.38 6.7C16.32 6.88 17.16 7.24 17.9 7.76C18.64 8.28 19.2 9.02 19.58 9.98C19.78 10.48 19.88 11 19.88 11.56C19.88 12.12 19.78 12.66 19.58 13.18C19.38 13.7 19.12 14.18 18.8 14.6C18.48 15.02 18.1 15.38 17.66 15.68C17.22 15.98 16.74 16.2 16.22 16.36C15.7 16.52 15.16 16.6 14.6 16.6C14.32 16.6 14.04 16.58 13.76 16.56L15.38 14.94L18.06 12.26L18.08 12.24L19.08 11.24C19.18 11.66 19.24 12.1 19.24 12.56C19.24 13.02 19.18 13.46 19.06 13.88C18.94 14.3 18.78 14.7 18.58 15.08C18.38 15.46 18.12 15.78 17.82 16.06C17.52 16.34 17.18 16.58 16.8 16.78C15.82 17.3 14.76 17.62 13.62 17.78L14.04 17.98Z" fill="black"/>
    </svg>
);

// PhonePe Icon (Official 'Pe' Logo)
const PhonePeIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" fill="black"/>
        <path d="M10.68 7.32H14.4V8.6H12.06V10.8C12.96 10.68 13.68 11.16 13.68 12.18C13.68 13.08 13.02 13.8 12.06 13.92V16.68H10.68V13.92C9.06 13.8 8.1 12.9 8.1 11.58C8.1 10.02 9.3 9.06 10.68 9.06V7.32ZM10.68 10.38V12.66C11.58 12.78 12.3 12.6 12.3 11.58C12.3 10.62 11.58 10.26 10.68 10.38Z" fill="white"/>
    </svg>
);

// Apple Pay Icon (Official Logo)
const ApplePayIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.8 15.36C16.74 16.78 17.64 18.06 18.96 18.06C18.99 18.06 19.02 18.06 19.05 18.06C18.9 18.84 18.51 19.56 17.94 20.1C17.22 20.76 16.35 21.12 15.42 21.15C14.52 21.15 13.68 20.7 13.02 20.7C12.33 20.7 11.49 21.15 10.59 21.15C9.69 21.15 8.76 20.76 8.04 20.13C7.02 19.14 6.3 17.43 6.3 15.48C6.3 13.11 7.53 11.19 9.15 11.19C10.23 11.19 11.25 11.91 11.91 11.91C12.54 11.91 13.8 10.98 15.06 11.07C16.2 11.13 17.67 11.67 18.3 13.11C18.21 13.14 18.12 13.17 18.03 13.2C16.65 13.71 15.75 14.64 15.75 15.99C15.75 15.99 15.75 16.02 15.78 16.05L16.8 15.36zM14.52 8.73C14.94 8.22 15.15 7.5 15.06 6.78C14.43 6.84 13.53 7.17 12.99 7.68C12.51 8.13 12.24 8.82 12.33 9.54C13.05 9.6 13.92 9.3 14.52 8.73z" fill="black"/>
    </svg>
);


const API_URL = 'http://localhost:8080/api';

const handleApiResponse = async (response) => {
    if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
        }
        return response.text();
    }

    let errorMessage = '';
    try {
        const errorText = await response.text();
        
        if (errorText) {
            try {

                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
            } catch (jsonError) {

                errorMessage = errorText; 
            }
        }
    } catch (e) {

    }
    
    if (!errorMessage) {
        errorMessage = `${response.status} ${response.statusText}`;
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
};


export default function App() {

    const [screen, setScreen] = useState(() => {
        return localStorage.getItem('userToken') ? 'dashboard' : 'login';
    });
    const [activeTab, setActiveTab] = useState('home');
    const [reservationDetails, setReservationDetails] = useState({});

    const [userCars, setUserCars] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [parkingLots, setParkingLots] = useState([]);
    
    const [token, setToken] = useState(() => {
        return localStorage.getItem('userToken') || null;
    });
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem('userToken');
    });

    const stompClient = useRef(null);


    const updateParkingLotSummary = (lotSummary) => {
        setParkingLots(currentLots => {
            return currentLots.map(lot =>
                lot.name === lotSummary.name
                    ? { ...lot, availableSpaces: lotSummary.availableSpaces }
                    : lot
            );
        });
    };

    const handleLogout = () => {
        console.warn("Session expired or unauthorized. Logging out.");
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');

        if (stompClient.current) {
            stompClient.current.disconnect();
            stompClient.current = null;
        }

        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setUserCars([]);
        setReservations([]);
        setParkingLots([]);
        setReservationDetails({});
        setActiveTab('home');

        setScreen('login');
    };

    const api = useMemo(() => {
        const callApi = async (apiFunction) => {
            try {
                const response = await apiFunction();
                return response;
            } catch (error) {
                if (error.status === 401) {
                    handleLogout();
                }
                throw error;
            }
        };

        return {
            login: async (username, password) => {
                const response = await fetch(`${API_URL}/auth/signin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                return handleApiResponse(response);
            },
            register: async (username, email, password, phone_number) => {
                const response = await fetch(`${API_URL}/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password, phone_number }),
                });
                return handleApiResponse(response);
            },
            getCars: () => callApi(async () => {
                const response = await fetch(`${API_URL}/cars`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                return handleApiResponse(response);
            }),
            addCar: (carData) => callApi(async () => {
                const response = await fetch(`${API_URL}/cars`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(carData)
                });
                return handleApiResponse(response);
            }),
            createReservation: (reservationData) => callApi(async () => {
                const response = await fetch(`${API_URL}/reservations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(reservationData)
                });
                return handleApiResponse(response);
            }),
            getReservations: () => callApi(async () => {
                const response = await fetch(`${API_URL}/reservations`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                return handleApiResponse(response);
            }),
            getParkingLots: () => callApi(async () => {
                const response = await fetch(`${API_URL}/parking-lots`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                return handleApiResponse(response);
            }),
            getParkingSpacesByLotName: (lotName) => callApi(async () => {
                const response = await fetch(`${API_URL}/parking-spaces/lot/${encodeURIComponent(lotName)}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                return handleApiResponse(response);
            }),
            updateReservation: (reservationId, updateData) => callApi(async () => {
                const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updateData)
                });
                return handleApiResponse(response);
            }),
            cancelReservation: (reservationId) => callApi(async () => {
                const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                return handleApiResponse(response);
            }),
        };
    }, [token]);

    const fetchUserCars = async () => {
        if (!token) return;
        try {
            const cars = await api.getCars();
            setUserCars(cars);
        } catch (error) {
            if (error.status !== 401) { 
                console.error("Failed to fetch cars:", error.message);
            }
        }
    };

    const fetchReservations = async () => {
        if (!token) return;
        try {
            const userReservations = await api.getReservations();
            console.log('📦 Fetched reservations:', userReservations);
            
            const reservationsByLot = {};
            userReservations.forEach(res => {
                const lotName = res.parkingLotName || res.parkingSpace?.parkingLot?.name;
                if (lotName) {
                    reservationsByLot[lotName] = (reservationsByLot[lotName] || 0) + 1;
                }
            });
            console.log('📊 Reservations by lot:', reservationsByLot);
            
            setReservations(userReservations);
        } catch (error) {
            if (error.status !== 401) {
                console.error("Failed to fetch reservations:", error.message);
                setReservations([]);
            }
        }
    };

    const fetchParkingLots = async () => {
        if (!token) return;
        console.log("🅿️ Attempting to fetch parking lots with token:", token ? "Available" : "Missing (no auth)");
        try {
            const lots = await api.getParkingLots(); 
            setParkingLots(lots);
            console.log("✅ Successfully fetched parking lots:", lots);
            lots.forEach(lot => {
                const reserved = lot.totalSpaces - lot.availableSpaces;
                console.log(`  📍 ${lot.name}: ${lot.availableSpaces}/${lot.totalSpaces} available (${reserved} reserved)`);
            });
            return lots;
        } catch (error) {
            if (error.status !== 401) {
                console.error("❌ Failed to fetch parking lots:", error.message);
            }
        }
    };

    // Redirect to login page on every refresh
    useEffect(() => {
        handleLogout();
    }, []);

    useEffect(() => {
        if (isAuthenticated) { 
            fetchUserCars(api);
            fetchReservations(api);
            fetchParkingLots(api);

            if (token) {
                const connectWebSocket = () => {
                    if (!window.SockJS || !window.Stomp) {
                        console.warn("WebSocket libraries not loaded yet.");
                        return;
                    }
                    if (stompClient.current) return;

                    const socket = new window.SockJS('http://localhost:8080/ws');
                    stompClient.current = window.Stomp.over(socket);
                    stompClient.current.debug = null; 

                    const connectHeaders = {
                        'Authorization': 'Bearer ' + token
                    };

                    stompClient.current.connect(connectHeaders, (frame) => {
                        console.log('✅ Main WebSocket Connected!', frame);
                        
                        stompClient.current.subscribe('/topic/lots-summary', (message) => { 
                            try {
                                const lotSummary = JSON.parse(message.body);
                                console.log('📬 Received lot summary update:', lotSummary);
                                updateParkingLotSummary(lotSummary);
                            } catch (e) {
                                console.error("Failed to parse lot summary", e);
                            }
                        });

                    }, (error) => {
                        console.error('❌ Main WebSocket Connection Error:', error);
                        if (error.includes('401') || error.includes('Unauthorized')) {
                            handleLogout();
                        }
                        stompClient.current = null; 
                    });
                };
                
                const intervalId = setInterval(() => {
                    if (window.SockJS && window.Stomp) {
                        clearInterval(intervalId);
                        connectWebSocket();
                    }
                }, 100);

                return () => {
                    clearInterval(intervalId);
                    if (stompClient.current) {
                        stompClient.current.disconnect();
                        stompClient.current = null;
                        console.log("Main WebSocket Disconnected");
                    }
                };
            }
        }
    }, [isAuthenticated, token, api]); 


    const navigate = (screenName) => {
        setScreen(screenName);
    };

    const handleLoginSuccess = (data, enteredUsername) => {
        const userName = data.username || data.name || enteredUsername || 'User';
        const userPayload = { name: userName, email: data.email };
        const tokenPayload = data.accessToken;

        localStorage.setItem('userToken', tokenPayload);
        localStorage.setItem('user', JSON.stringify(userPayload));

        setUser(userPayload);
        setToken(tokenPayload);
        setIsAuthenticated(true);
        
        navigate('dashboard');
    };

    const handleSelectSpot = (spotId) => {
        setReservationDetails({ ...reservationDetails, spot: spotId });
        navigate('selectVehicle');
    };

    const handleSelectVehicle = (vehicle) => {
        setReservationDetails({ ...reservationDetails, vehicle });
        navigate('payment');
    };

    const handlePayment = (method) => {
        setReservationDetails({ ...reservationDetails, paymentMethod: method });
        navigate('ticket');
    }

    const resetAndGoHome = (newReservation) => {
        if (newReservation) {
            setReservations(prevReservations => [newReservation, ...prevReservations]);
            setTimeout(() => {
                console.log('🔄 Refreshing parking lots after reservation...');
                fetchParkingLots();
            }, 500);
        } else {
            fetchReservations(api);
        }
        setReservationDetails({});
        setActiveTab('home');
        navigate('dashboard');
    }

    const handleCancelReservation = async (reservationId) => {
        if (!window.confirm('Are you sure you want to cancel this reservation?')) {
            return;
        }
        
        try {
            await api.cancelReservation(reservationId);
            setReservations(prevReservations => 
                prevReservations.filter(res => res.id !== reservationId)
            );
            // Refresh parking lots to update available spaces
            setTimeout(() => {
                console.log('🔄 Refreshing parking lots after cancellation...');
                fetchParkingLots();
            }, 500);
            alert('Reservation cancelled successfully!');
        } catch (error) {
            console.error('Failed to cancel reservation:', error.message);
            alert(`Failed to cancel reservation: ${error.message}`);
        }
    };

    const renderScreen = () => {
        if (!isAuthenticated) {
            switch(screen) {
                case 'login':
                    return <LoginScreen navigate={navigate} onLoginSuccess={handleLoginSuccess} api={api} />;
                case 'register':
                    return <RegisterScreen navigate={navigate} api={api} />;
                default:
                    return <LoginScreen navigate={navigate} onLoginSuccess={handleLoginSuccess} api={api} />;
            }
        }

        switch (screen) {
            case 'dashboard':
                return <DashboardScreen navigate={navigate} user={user} reservations={reservations} />;
            case 'find':
                return <FindParkingScreen navigate={navigate} setReservationDetails={setReservationDetails} parkingLots={parkingLots} />; 
            case 'selectSpot':
                return <SelectSpotScreen 
                            navigate={navigate} 
                            onSelectSpot={handleSelectSpot} 
                            details={reservationDetails} 
                            token={token}
                            stompClient={stompClient.current} 
                            api={api}
                        />;
            case 'selectVehicle':
                return <SelectVehicleScreen navigate={navigate} onSelectVehicle={handleSelectVehicle} userCars={userCars} />;
            case 'myCars':
                return <MyCarsScreen navigate={navigate} userCars={userCars} />;
            case 'addCar':
                return <AddCarScreen navigate={navigate} onCarAdded={() => fetchUserCars(api)} api={api} />
            case 'reservations':
                return <MyReservationsScreen navigate={navigate} reservations={reservations} onCancelReservation={handleCancelReservation} />;
            case 'payment':
                return <PaymentScreen navigate={navigate} onPaymentSelect={handlePayment} />;
            case 'ticket':
                return <TicketScreen 
                            onDone={resetAndGoHome}
                            onBack={() => navigate('payment')}
                            details={reservationDetails} 
                            user={user} 
                            api={api}
                        />;
            default:
                return <DashboardScreen navigate={navigate} user={user} reservations={reservations} />;
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800 font-sans">
            {/* --- Load libraries from CDN --- */}
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js"></script>
            {/* --- Load Firebase v8 compat libraries --- */}
            <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

            <style>{`
                /* Hide the default calendar icon on date inputs */
                input[type="date"]::-webkit-calendar-picker-indicator {
                    display: none;
                    -webkit-appearance: none;
                }
                /* Hide the default arrows on number inputs */
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>
            <div className="w-[393px] h-[852px] bg-[#F1F3F2] rounded-3xl shadow-2xl overflow-hidden relative">
                <div className="p-6 h-full overflow-y-auto pb-24">
                    {renderScreen()}
                </div>
                { isAuthenticated && (screen === 'dashboard' || screen === 'find' || screen === 'myCars' || screen === 'reservations') &&
                    <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} navigate={navigate} />
                }
            </div>
        </div>
    );
}


const LoginScreen = ({ navigate, onLoginSuccess, api }) => {
    const [username, setUsername] = useState('user');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setError(null);
        try {
            const data = await api.login(username, password);
            onLoginSuccess(data, username);
        } catch (err) {
            let displayError;
            if (err.status === 401) {
                displayError = { title: "Login Failed", details: "Invalid Username or Password." };
            } else if (err.message.toLowerCase().includes('failed to fetch')) {
                displayError = { title: "Network Error", details: "Could not connect to the server. Please ensure your Spring Boot application is running."};
            } else {
                displayError = { title: "Login Failed", details: err.message };
            }
            setError(displayError);
        }
    };

    return (
        <div className="flex flex-col h-full justify-center">
            <Header title="Welcome Back" subtitle="Log in to manage your parking." showMenu={false} />
            <div className="mt-8 space-y-4">
                {error && (
                    <div className="text-center p-4 bg-red-100 rounded-md border border-red-300">
                        <p className="font-bold text-red-700">{error.title}</p>
                        <p className="text-sm text-red-600 mt-2">{error.details}</p>
                    </div>
                )}
                <AuthInput label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <AuthInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin} className="w-full bg-black text-white py-3 rounded-full text-lg mt-4">
                    Login
                </button>
                <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <button onClick={() => navigate('register')} className="font-semibold text-black">Sign Up</button>
                </p>
            </div>
        </div>
    );
};


const RegisterScreen = ({ navigate, api }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setphone_number] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {
        setError(''); setSuccess('');
        try {
            await api.register(username, email, password, phone_number);
            setSuccess('Registration successful! Please log in.');
            setTimeout(() => navigate('login'), 2000);
        } catch (err) {
            setError(`Registration failed: ${err.message}`);
        }
    };

    return (
        <div className="flex flex-col h-full justify-center">
            <Header title="Create Account" subtitle="Get started with Smart Parking." showMenu={false} />
            <div className="mt-8 space-y-4">
                {error && <p className="text-red-500 text-center text-sm p-2 bg-red-100 rounded-md">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <AuthInput label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <AuthInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <AuthInput label="Phone Number" type="tel" value={phone_number} onChange={e => setphone_number(e.target.value)} />
                <AuthInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={handleRegister} className="w-full bg-black text-white py-3 rounded-full text-lg mt-4">
                    Register
                </button>
                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <button onClick={() => navigate('login')} className="font-semibold text-black">Log In</button>
                    </p>
            </div>
        </div>
    );
};


const DashboardScreen = ({ navigate, user, reservations }) => (
    <div>
        <Header title={`Hello ${user ? user.name : 'Guest'}!`} subtitle="Manage your parking reservations and vehicles from your dashboard." />
        <div className="space-y-4 mt-6">
            <DashboardCard title="Reserve Parking" subtitle="Find and book a parking spot" icon={<LocationIcon />} onClick={() => navigate('find')} />
            <DashboardCard title="My Cars" subtitle="Manage your vehicles" icon={<CarIcon />} onClick={() => navigate('myCars')} />
            <DashboardCard title="My Reservations" subtitle="View and manage bookings" icon={<CalendarIcon />} onClick={() => navigate('reservations')} />
        </div>
        <div className="mt-6 p-4 rounded-2xl border-2 border-gray-200 bg-white">
            <h2 className="text-xl font-medium text-black">Upcoming Reservations</h2>
            {reservations && reservations.length > 0 ? (
                <div className="mt-4 space-y-2">
                    {reservations.slice(0, 2).map(res => (
                        <ReservationCard key={res.id} reservation={res} isLive={res.status === 'LIVE'} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No upcoming reservations</p>
            )}
            <button onClick={() => navigate('find')} className="w-1/2 mx-auto mt-6 bg-black text-white py-3 rounded-full">Reserve a Spot</button>
        </div>
    </div>
);

const FindParkingScreen = ({ navigate, setReservationDetails, parkingLots }) => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    
    const locationOptions = parkingLots.map(lot => ({ 
        value: lot.name, 
        label: `${lot.name} (Available: ${lot.availableSpaces || 0})` 
    }));

    const [location, setLocation] = useState(locationOptions[0]?.value || '');
    const [date, setDate] = useState(formattedToday);
    const dateInputRef = useRef(null);
    
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    let defaultHour = currentHour;
    let defaultMinute = currentMinute < 30 ? 30 : 0;
    if (defaultMinute === 0) defaultHour += 1;
    if (defaultHour >= 24) defaultHour = 0;
    const defaultStartTime = `${String(defaultHour).padStart(2, '0')}:${String(defaultMinute).padStart(2, '0')}`;

    const [startTime, setStartTime] = useState(defaultStartTime);
    const [duration, setDuration] = useState('2');
    
    useEffect(() => {
        if(parkingLots.length > 0 && !location) {
            setLocation(parkingLots[0].name);
        }
    }, [parkingLots, location]);

    const handleSearch = () => {
        if (!location) {
            alert('Please select a parking location.');
            return;
        }

        setReservationDetails({ location, date, startTime, duration });
        navigate('selectSpot');
    }

    const handleCalendarIconClick = () => {
        if (dateInputRef.current) {
            try {
                dateInputRef.current.showPicker();
            } catch (error) {
                console.error("showPicker() is not supported by this browser.");
            }
        }
    };

    const handleDurationChange = (e) => {
        const val = e.target.value;
        if (val === '' || parseFloat(val) >= 0.5) {
            setDuration(val);
        } else if (parseFloat(val) < 0.5) {
            setDuration('0.5');
        }
    };
    
    const incrementDuration = () => {
        setDuration(prev => {
            const current = parseFloat(prev);
            return isNaN(current) ? '0.5' : String(current + 0.5);
        });
    };

    const decrementDuration = () => {
        setDuration(prev => {
            const current = parseFloat(prev);
            if (isNaN(current)) return '0.5';
            const newVal = current - 0.5;
            return String(newVal < 0.5 ? 0.5 : newVal);
        });
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hour = String(i).padStart(2, '0');
                const minute = String(j).padStart(2, '0');
                const time24 = `${hour}:${minute}`;
                const tempDate = new Date(`1970-01-01T${time24}`);
                const time12 = tempDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                options.push({ value: time24, label: time12 });
            }
        }
        return options;
    };
    const timeOptions = generateTimeOptions();

    return (
        <div>
            <Header title="Find Parking" subtitle="Search for available parking spaces." showMenu={false} onBack={() => navigate('dashboard')}/>
            <div className="mt-6 p-6 rounded-2xl border-2 border-gray-200 bg-white min-h-[480px] flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-black mb-6">Search Filters</h2>
                    <div className="space-y-4">
                        <SelectInput 
                            label="Location" 
                            value={location} 
                            onChange={e => setLocation(e.target.value)} 
                            options={locationOptions} 
                        />
                        <AuthInput
                            label="Date"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            icon={<CalendarIcon />}
                            inputRef={dateInputRef}
                            onIconClick={handleCalendarIconClick}
                        />
                        <SelectInput label="Start time" value={startTime} onChange={e => setStartTime(e.target.value)} options={timeOptions} />
                        <AuthInput 
                            label="Duration (in hours)" 
                            type="number" 
                            min="0.5" 
                            step="0.5" 
                            value={duration} 
                            onChange={handleDurationChange}
                            onIncrement={incrementDuration}
                            onDecrement={decrementDuration}
                        />
                    </div>
                </div>
                <button onClick={handleSearch} className="w-1/2 mx-auto bg-black text-white py-3 rounded-full flex items-center justify-center gap-2">
                    <SearchIcon />
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
};

const SelectSpotScreen = ({ navigate, onSelectSpot, details, token, stompClient, api }) => {
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const updateSpotStatus = (updatedSpot) => {
        setSpots(prevSpots =>
            prevSpots.map(spot =>
                spot.spotCode === updatedSpot.spotCode 
                    ? { ...spot, isAvailable: updatedSpot.isAvailable } 
                    : spot
            )
        );
    };

    useEffect(() => {
        const fetchSpaces = async () => {
            if (!details.location) {
                setError('Parking lot not specified.');
                setLoading(false);
                return;
            }
            if (!token) {
                setError('Authentication token is missing.');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError('');
                const fetchedSpots = await api.getParkingSpacesByLotName(details.location);
                console.log('🅿️ Fetched spots:', fetchedSpots);
                console.log('📊 Number of spots:', fetchedSpots ? fetchedSpots.length : 0);
                if (fetchedSpots && fetchedSpots.length > 0) {
                    console.log('📍 First spot structure:', fetchedSpots[0]);
                }
                setSpots(fetchedSpots || []);
            } catch (err) {
                if (err.status !== 401) {
                    console.error('❌ Error fetching spots:', err);
                    setError(`Failed to load parking spots: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchSpaces();

        if (stompClient && stompClient.connected) {
            const topic = `/topic/spots/${details.location}`;
            console.log(`Subscribing to topic: ${topic}`);

            const subscription = stompClient.subscribe(topic, (message) => {
                try {
                    console.log('📬 Spot update received!', message.body);
                    const updatedSpot = JSON.parse(message.body);
                    updateSpotStatus(updatedSpot);
                } catch (e) {
                    console.error("Failed to parse spot update", e);
                }
            });

            return () => {
                if (subscription) {
                    subscription.unsubscribe();
                    console.log(`Unsubscribed from ${topic}`);
                }
            };
        }

    }, [details.location, token, stompClient, api]);

    if (loading) {
        return (
            <div>
                <Header title="Select a Spot" subtitle="Loading available spots..." showMenu={false} onBack={() => navigate('find')} />
                <div className="text-center mt-20">Loading...</div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div>
                <Header title="Select a Spot" subtitle="Error" showMenu={false} onBack={() => navigate('find')} />
                <div className="text-center mt-20 text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div>
            <Header title="Select a Spot" subtitle={`Choose a spot at ${details.location}`} showMenu={false} onBack={() => navigate('find')} />
            <div className="mt-6 p-4 bg-white rounded-2xl">
                <div className="grid grid-cols-2 gap-x-16 gap-y-8 justify-items-center py-8 border-b-2 border-l-2 border-r-2 border-gray-400">
                    {spots.length > 0 ? spots.map(spot => (
                        <div key={spot.spotCode || spot.id}>
                            <CarSpotIcon
                                isBooked={!spot.isAvailable}
                                isSelected={selectedSpot === spot.spotCode}
                                onClick={() => {
                                    if (!spot.isAvailable) return;
                                    setSelectedSpot(spot.spotCode);
                                }}
                            />
                            <p className="text-center text-gray-600 mt-2">{spot.spotCode}</p>
                        </div>
                    )) : <p>No spots found for this location.</p>}
                </div>
                    <button
                        onClick={() => onSelectSpot(selectedSpot)}
                        disabled={!selectedSpot}
                        className="w-1/2 mx-auto mt-6 bg-black text-white py-3 rounded-full disabled:bg-gray-400"
                    >
                        Confirm Spot
                    </button>
            </div>
        </div>
    );
};


const SelectVehicleScreen = ({ navigate, onSelectVehicle, userCars }) => {
    const [selectedCarId, setSelectedCarId] = useState(userCars[0]?.id || null);

    if (!userCars || userCars.length === 0) {
        return (
            <div>
                <Header title="Select your vehicle" showMenu={false} onBack={() => navigate('selectSpot')} />
                <div className="text-center mt-20">
                    <p>No cars found.</p>
                    <button onClick={() => navigate('addCar')} className="w-1/2 mx-auto mt-8 bg-black text-white py-3 rounded-full block">
                        Add a Car
                    </button>
                </div>
            </div>
        )
    }

    const selectedCar = userCars.find(c => c.id === selectedCarId);

    return (
        <div>
            <Header title="Select your vehicle" showMenu={false} onBack={() => navigate('selectSpot')} />
            <div className="space-y-4 mt-8">
                {userCars.map(car => (
                    <VehicleCard
                        key={car.id}
                        car={car}
                        isSelected={selectedCarId === car.id}
                        onSelect={() => setSelectedCarId(car.id)}
                    />
                ))}
            </div>
            <button
                onClick={() => onSelectVehicle(selectedCar)}
                disabled={!selectedCar}
                className="w-1/2 mx-auto mt-8 bg-black text-white py-3 rounded-full block disabled:bg-gray-400"
            >
                Continue
            </button>
        </div>
    );
};

const AddCarScreen = ({ navigate, onCarAdded, api }) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [error, setError] = useState('');

    const handleAddCar = async () => {
        setError('');
        try {
            await api.addCar({ make, model, licensePlate });
            await onCarAdded();
            navigate('myCars');
        } catch(err) {
            if (err.status !== 401) {
                setError(`Error adding car: ${err.message}`);
            }
        }
    }

    return (
        <div>
            <Header title="Add New Car" showMenu={false} onBack={() => navigate('myCars')} />
            <div className="mt-8 space-y-4">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <AuthInput label="Make (e.g., Toyota)" type="text" value={make} onChange={e => setMake(e.target.value)} />
                <AuthInput label="Model (e.g., Corolla)" type="text" value={model} onChange={e => setModel(e.target.value)} />
                <AuthInput label="License Plate" type="text" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} />
                <button onClick={handleAddCar} className="w-full mx-auto mt-4 bg-black text-white py-3 rounded-full text-lg">
                    Save Car
                </button>
            </div>
        </div>
    )
}

const MyCarsScreen = ({ navigate, userCars }) => (
    <div>
        <Header title="My Cars" subtitle="Manage your registered vehicles." showMenu={false} onBack={() => navigate('dashboard')} />
        <button onClick={() => navigate('addCar')} className="w-1/2 mx-auto my-6 bg-black text-white py-3 rounded-full flex items-center justify-center gap-2">
            <AddIcon />
            <span>Add New Car</span>
        </button>
        <div className="space-y-4">
            {userCars && userCars.length > 0 ? userCars.map(car => (
                <InfoCard key={car.id} icon={<CarIcon />} title={`${car.make} ${car.model}`} subtitle={car.licensePlate} />
            )) : <p className="text-center text-gray-500">No cars added yet.</p>}
        </div>
    </div>
);

const MyReservationsScreen = ({ navigate, reservations, onCancelReservation }) => {
    // Filter only LIVE reservations
    const liveReservations = reservations && reservations.filter(res => res.status === 'LIVE');
    
    return (
        <div>
            <Header title="My Reservations" subtitle="View your active bookings." showMenu={false} onBack={() => navigate('dashboard')} />
                <div className="space-y-4 mt-8">
                    {liveReservations && liveReservations.length > 0 ? liveReservations.map(res => (
                        <ReservationCard 
                            key={res.id} 
                            reservation={res} 
                            isLive={true}
                            onCancel={() => onCancelReservation(res.id)}
                        />
                    )) : <p className="text-center text-gray-500">No active reservations.</p>}
                </div>
        </div>
    );
};

const PaymentScreen = ({ navigate, onPaymentSelect }) => {
    const [selectedMethod, setSelectedMethod] = useState('GPay');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const paymentMethods = [
        { name: 'GPay', icon: <GPayIcon /> },
        { name: 'PhonePe', icon: <PhonePeIcon /> },
        { name: 'Apple Pay', icon: <ApplePayIcon /> },
    ];

    const handlePay = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        onPaymentSelect(selectedMethod);
    };

    return (
        <div>
            <Header title="Payment" subtitle="Choose your preferred payment method." showMenu={false} onBack={() => navigate('selectVehicle')} />
            <div className="space-y-4 mt-8">
                {paymentMethods.map(method => (
                    <PaymentCard
                        key={method.name}
                        method={method}
                        isSelected={selectedMethod === method.name}
                        onSelect={() => setSelectedMethod(method.name)}
                    />
                ))}
            </div>
                <button
                    onClick={handlePay}
                    disabled={isSubmitting}
                    className="w-1/2 mx-auto mt-8 bg-black text-white py-3 rounded-full block disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Processing...' : 'Pay & Confirm'}
                </button>
        </div>
    );
}

const TicketScreen = ({ onDone, onBack, details, user, isMockMode, api }) => {
    const [status, setStatus] = useState('Confirming reservation...');
    const [confirmedReservation, setConfirmedReservation] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasBooked = useRef(false);

    useEffect(() => {
        const createReservation = async () => {
            if (isSubmitting || hasBooked.current || confirmedReservation) return; 
            
            setIsSubmitting(true);
            hasBooked.current = true; 

            try {
                console.log('🔐 Creating reservation with details:', details);
                console.log('📅 Date:', details.date);
                console.log('⏰ StartTime (24h format):', details.startTime);
                
                const [year, month, day] = details.date.split('-');
                const [hours, minutes] = details.startTime.split(':');
                const startTimeISO = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
                console.log('📍 StartTime ISO (with Z):', startTimeISO);
                
                const startTimeLocal = `${details.date}T${details.startTime}:00`;
                console.log('📍 StartTime Local (no Z):', startTimeLocal);

                const payload = {
                    carId: details.vehicle.id,
                    parkingLotName: details.location,
                    spotCode: details.spot,
                    startTime: startTimeISO,
                    durationHours: parseFloat(details.duration),
                };
                console.log('📦 Payload being sent:', payload);

                const newReservation = await api.createReservation(payload);
                console.log('✅ Reservation response received:', newReservation);
                console.log('📍 parkingLotName:', newReservation?.parkingLotName);
                console.log('🅿️ spotCode:', newReservation?.spotCode);
                console.log('⏰ startTime:', newReservation?.startTime);
                console.log('⏰ endTime:', newReservation?.endTime);
                setStatus('Reservation Confirmed!');
                setConfirmedReservation(newReservation);
                
            } catch (error) {
                console.error('❌ Reservation creation failed:', error.message);
                if (error.status === 401) {
                    setStatus('Session expired. Please log in again.');
                } else if (error.status === 409) {
                    setStatus(`Failed: ${error.message}`); 
                } else {
                    setStatus(`Failed: ${error.message}`);
                }
                
                hasBooked.current = false; 
            } finally {
                setIsSubmitting(false);
            }
        };

        createReservation();
    
    }, []);

    const displayLocation = confirmedReservation?.parkingLotName || details.location;
    const displaySpot = confirmedReservation?.spotCode || details.spot;

    const getDisplayTime = () => {
        if (confirmedReservation && confirmedReservation.startTime && confirmedReservation.endTime) {
            console.log('🕐 Parsing times - startTime raw:', confirmedReservation.startTime, 'endTime raw:', confirmedReservation.endTime);
            const startTime = new Date(confirmedReservation.startTime);
            const endTime = new Date(confirmedReservation.endTime);
            console.log('🕐 Parsed startTime:', startTime, 'endTime:', endTime);
            const displayTime = `${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
            console.log('🕐 Display time:', displayTime);
            return displayTime;
        }
        console.log('⚠️ Using fallback time - details.startTime:', details.startTime, 'details.duration:', details.duration);
        return `${details.startTime} for ${details.duration} hrs`;
    };

    return (
    <div>
        <Header title="Parking Ticket" showMenu={false} onBack={onBack} />
        <div className="mt-6 p-4 rounded-2xl border-2 border-gray-200 bg-white relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#F1F3F2] rounded-full border-2 border-gray-200"></div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#F1F3F2] rounded-full border-2 border-gray-200"></div>

            <p className="text-center text-gray-500 text-sm mt-4">Scan this QR code at the entry gate</p>
            <div className="flex justify-center my-6">
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg border-2 border-gray-200">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(confirmedReservation?.id || 'parking-ticket')}`}
                        alt="QR Code"
                        className="w-40 h-40 rounded-xl shadow-md"
                    />
                </div>
            </div>

            <p className="text-center font-semibold my-4 text-xl">{status}</p>

            <div className="border-t-2 border-dashed border-gray-300 my-8"></div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 px-2">
                <TicketDetail label="Name" value={user ? user.name : 'Loading...'} />
                <TicketDetail label="Vehicle" value={`${details.vehicle?.make} ${details.vehicle?.model}` || 'N/A'} />
                <TicketDetail label="Parking Area" value={displayLocation} />
                <TicketDetail label="Parking Spot" value={displaySpot} />
                <TicketDetail label="Time Slot" value={getDisplayTime()} />
                <TicketDetail label="License Plate" value={details.vehicle?.licensePlate || 'N/A'} />
            </div>

            <button
                onClick={() => onDone(confirmedReservation)}
                disabled={isSubmitting || !confirmedReservation}
                className="w-1/2 mx-auto my-8 bg-black text-white py-3 rounded-full block disabled:bg-gray-400"
            >
                {isSubmitting ? 'Confirming...' : 'Done'}
            </button>
        </div>
    </div>
    );
};

// --- Reusable Compnents ---

const Header = ({ title, subtitle, showMenu = true, onBack = null }) => (
    <div className="flex justify-between items-start">
        <div>
            <h1 className="text-4xl font-semibold text-gray-600">{title}</h1>
            {subtitle && <p className="text-lg text-black mt-4 max-w-[300px]">{subtitle}</p>}
        </div>
        <button onClick={onBack} className={`w-16 h-16 rounded-full flex items-center justify-center ${onBack ? 'bg-black' : 'bg-transparent'}`}>
            {onBack && <BackArrowIcon />}
        </button>
    </div>
);

const AuthInput = ({ label, type, value, onChange, icon, inputRef, onIconClick, onIncrement, onDecrement, ...props }) => (
    <div>
        <label className="text-base font-medium text-black">{label}</label>
        <div className="relative mt-2">
            <input
                ref={inputRef}
                type={type === 'number' ? 'text' : type}
                inputMode={type === 'number' ? 'decimal' : undefined}
                value={value}
                onChange={onChange}
                className="w-full h-12 bg-gray-200 rounded-full pl-4 pr-12 text-lg"
                {...props}
            />
            {icon && (
                <div 
                    onClick={onIconClick}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                >
                    {icon}
                </div>
            )}
            {onIncrement && onDecrement && (
                    <div className="absolute inset-y-0 right-0 flex flex-col justify-center pr-3">
                        <button onClick={onIncrement} className="h-1/2 flex items-center rounded-tr-full"><ArrowUpIcon /></button>
                        <button onClick={onDecrement} className="h-1/2 flex items-center rounded-br-full"><ArrowDownIcon /></button>
                    </div>
            )}
        </div>
    </div>
);

const SelectInput = ({ label, value, onChange, options }) => (
    <div>
        <label className="text-base font-medium text-black">{label}</label>
        <div className="relative mt-2">
            <select
                value={value}
                onChange={onChange}
                className="w-full h-12 bg-gray-200 rounded-full pl-4 pr-12 text-lg appearance-none"
                disabled={options.length === 0} 
            >
                {options.length === 0 ? (
                    <option value="" disabled>
                        No locations available.
                    </option>
                ) : (
                    <>
                        {value === '' && (
                            <option value="" disabled>
                                Select a parking lot...
                            </option>
                        )}
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </>
                )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <ChevronDownIcon />
            </div>
        </div>
    </div>
);

const DashboardCard = ({ title, subtitle, icon, onClick }) => (
    <div onClick={onClick} className="bg-white p-4 rounded-2xl shadow-md flex items-center cursor-pointer">
        <div className="bg-[#F1F3F2] w-16 h-16 rounded-2xl flex items-center justify-center">
            {icon}
        </div>
        <div className="ml-4">
            <h3 className="text-xl font-medium text-black">{title}</h3>
            <p className="text-gray-500">{subtitle}</p>
        </div>
    </div>
);

const InfoCard = ({ icon, title, subtitle }) => (
    <div className="bg-white p-4 rounded-2xl shadow-md flex items-center">
        <div className="bg-[#F1F3F2] w-16 h-16 rounded-2xl flex items-center justify-center">
        {icon}
        </div>
        <div className="ml-4">
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <p className="text-gray-500 text-lg">{subtitle}</p>
        </div>
    </div>
);

const VehicleCard = ({ car, isSelected, onSelect }) => (
            <div onClick={onSelect} className="bg-white p-4 rounded-2xl shadow-md flex items-center cursor-pointer">
                <div className="bg-[#F1F3F2] w-16 h-16 rounded-2xl flex items-center justify-center">
                    <CarIcon />
                </div>
                <div className="ml-4 flex-grow">
                    <h3 className="text-xl font-medium text-black">{`${car.make} ${car.model}`}</h3>
                    <p className="text-gray-500 text-lg">{car.licensePlate}</p>
                </div>
                <div className={`w-7 h-7 rounded-full border-2 ${isSelected ? 'bg-black border-black' : 'bg-gray-200 border-gray-300'} p-1`}>
                        {isSelected && <div className="w-full h-full rounded-full bg-white"></div>}
                </div>
        </div>
);

const PaymentCard = ({ method, isSelected, onSelect }) => (
            <div onClick={onSelect} className="bg-white p-4 rounded-2xl shadow-md flex items-center justify-between cursor-pointer border border-gray-200 hover:border-black transition-colors">
                <div className="flex items-center gap-4 flex-1">
                    <div className="bg-[#F1F3F2] w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <div className="flex items-center justify-center w-full h-full">
                            {method.icon}
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-black">{method.name}</h3>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ml-4 ${isSelected ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
        </div>
);

const ReservationCard = ({ reservation, isLive, onCancel }) => {
    console.log('📋 ReservationCard received:', reservation);
    
    const startTime = reservation.startTime ? new Date(reservation.startTime) : null;
    const endTime = reservation.endTime ? new Date(reservation.endTime) : null;
    const location = reservation.parkingLotName || reservation.parkingSpace?.parkingLot?.name || 'Unknown Location';
    const spot = reservation.spotCode || reservation.parkingSpace?.spotCode || 'N/A';
    console.log('📍 Location:', location, 'Spot:', spot);
    
    const date = startTime ? startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'; 
    const time = startTime && endTime
        ? `${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
        : 'N/A';

    return (
        <div className={`bg-white p-4 rounded-2xl shadow-md flex items-center justify-between border-l-4 ${isLive ? 'border-green-500' : 'border-gray-300'}`}>
            <div className="flex items-center flex-grow">
                <div className="bg-[#F1F3F2] w-16 h-16 rounded-2xl flex items-center justify-center">
                    <CalendarIcon />
                </div>
                <div className="ml-4 flex-grow">
                    <h3 className="text-xl font-medium text-black">{location}</h3>
                    <p className="text-gray-500">{`${date} - ${time}`}</p>
                    <p className="text-gray-800 font-semibold">Spot: {spot}</p>
                </div>
                {isLive && (
                    <div className="ml-4 flex flex-col items-center">
                        <span className="text-green-500 font-bold text-sm">LIVE</span>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mt-1"></div>
                    </div>
                )}
            </div>
            {onCancel && (
                <button 
                    onClick={onCancel}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

const TicketDetail = ({ label, value }) => {
    if (label === 'Time Slot') {
        console.log('🎫 TicketDetail rendering Time Slot with value:', value);
    }
    return (
        <div>
            <p className="text-base text-gray-500">{label}</p>
            <p className="text-base font-medium text-black">{value}</p>
        </div>
    );
};

const BottomNavBar = ({ activeTab, setActiveTab, navigate }) => {
    const handleNav = (tab, screen) => {
        setActiveTab(tab);
        navigate(screen);
    };

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 items-center">
            <NavButton
                icon={<HomeIcon isActive={activeTab === 'home'} />}
                isActive={activeTab === 'home'}
                onClick={() => handleNav('home', 'dashboard')}
            />
            <NavButton
                icon={<ProfileIcon isActive={activeTab === 'profile'} />}
                isActive={activeTab === 'profile'}
                onClick={() => handleNav('profile', 'myCars')}
            />
        </div>
    );
};

const NavButton = ({ icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-16 h-16 rounded-full flex items-center justify-center filter drop-shadow-lg transition-colors duration-300
            ${isActive ? 'bg-black' : 'bg-white border border-gray-200'}`}
    >
        {icon}
    </button>
);