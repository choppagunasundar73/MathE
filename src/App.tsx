import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { signOutUser } from './firebase/auth';
import Header from './components/Header';
import WorkshopEntrance from './components/WorkshopEntrance';
import WorkshopHero from './components/WorkshopHero';
import TrophyRoom from './components/TrophyRoom';
import ToolRack from './components/ToolRack';
import FirstPuzzle from './components/FirstPuzzle';
import SkillConstellation from './components/SkillConstellation';
import ToolkitPricing from './components/ToolkitPricing';
import ChallengeHub from './components/ChallengeHub';
import Footer from './components/Footer';

function App() {
  const [hasEnteredWorkshop, setHasEnteredWorkshop] = useState(false);
  const [userName, setUserName] = useState('');
  const { currentUser } = useAuth();
  
  // If user is already authenticated, use their display name
  useEffect(() => {
    if (currentUser && !hasEnteredWorkshop) {
      const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || 'User';
      setUserName(displayName);
      setHasEnteredWorkshop(true);
    }
  }, [currentUser, hasEnteredWorkshop]);

  const handleEnterWorkshop = (name: string) => {
    setUserName(name);
    setHasEnteredWorkshop(true);
  };

  if (!hasEnteredWorkshop) {
    return <WorkshopEntrance onEnterWorkshop={handleEnterWorkshop} />;
  }

  const handleSignOut = async () => {
    await signOutUser();
    setHasEnteredWorkshop(false);
    setUserName('');
  };

  return (
    <div className="font-['Poppins',sans-serif] min-h-screen">
      <Header currentUser={currentUser} onSignOut={handleSignOut} />
      <WorkshopHero userName={userName} />
      <ChallengeHub />
      <TrophyRoom />
      <ToolRack />
      <FirstPuzzle userName={userName} />
      <SkillConstellation />
      <ToolkitPricing />
      <Footer />
    </div>
  );
}

export default App;