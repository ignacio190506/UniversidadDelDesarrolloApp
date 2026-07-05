import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { ParkingScreen } from './components/ParkingScreen';
import { FindCarScreen } from './components/FindCarScreen';
import { AvailableSpotsScreen } from './components/AvailableSpotsScreen';
import { ReserveSpotScreen } from './components/ReserveSpotScreen';

export interface ReservationData {
  spotId: string;
  sectorLabel: string;
  date: string;
  time: string;
}

type Screen = 'login' | 'home' | 'parking' | 'findCar' | 'availableSpots' | 'reserveSpot';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');
  const [reservations, setReservations] = useState<ReservationData[]>([]);

  const handleLogin = (email: string) => {
    const raw = email.split('@')[0];
    const name = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    setUserName(name);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUserName('');
    setReservations([]);
    setCurrentScreen('login');
  };

  const handleReserve = (data: ReservationData) => {
    setReservations(prev => {
      const filtered = prev.filter(r => r.date !== data.date);
      return [...filtered, data].sort((a, b) => a.date.localeCompare(b.date));
    });
    setCurrentScreen('parking');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return (
          <HomeScreen
            userName={userName}
            reservations={reservations}
            onNavigateToParking={() => setCurrentScreen('parking')}
            onLogout={handleLogout}
          />
        );
      case 'parking':
        return (
          <ParkingScreen
            onBack={() => setCurrentScreen('home')}
            onFindCar={() => setCurrentScreen('findCar')}
            onAvailableSpots={() => setCurrentScreen('availableSpots')}
            onReserveSpot={() => setCurrentScreen('reserveSpot')}
          />
        );
      case 'findCar':
        return (
          <FindCarScreen
            onBack={() => setCurrentScreen('parking')}
            reservations={reservations}
          />
        );
      case 'availableSpots':
        return (
          <AvailableSpotsScreen
            onBack={() => setCurrentScreen('parking')}
            reservations={reservations}
          />
        );
      case 'reserveSpot':
        return (
          <ReserveSpotScreen
            onBack={() => setCurrentScreen('parking')}
            reservations={reservations}
            onReserve={handleReserve}
          />
        );
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="size-full">
      {renderScreen()}
    </div>
  );
}
