import React from 'react';
import { motion } from 'framer-motion';
import Topbar from '../components/Topbar';
import { useTheme } from '../hooks/useTheme';
import {
  PersonalInfoCard,
  CompanyInfoCard,
  ThemeSettingsCard,
  ActiveContractCard,
} from '../components/profile/ProfileCards';

export const Profile = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Topbar />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Profilo</h1>
            <p className="text-foreground-muted">
              Gestisci le tue informazioni personali e aziendali
            </p>
          </motion.div>

          <PersonalInfoCard />
          <CompanyInfoCard />
          <ThemeSettingsCard theme={theme} setTheme={setTheme} />
          <ActiveContractCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
