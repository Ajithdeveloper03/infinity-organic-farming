import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text, View } from "react-native";
import { Globe } from "lucide-react-native";
import { setGlobalFontLanguage } from "../utils/fontSetup";

export type AppLanguage = "en" | "ta";

// Simple, everyday words for both English and Tamil
export const translations: Record<AppLanguage, Record<string, string>> = {
  en: {
    // Top & Brand
    appName: "Infinity Organics",
    tagline: "Way to Smart Farming",
    manifesto1: "Empowering farmers.",
    manifesto2: "Enriching soil.",
    manifesto3: "Building a sustainable tomorrow.",
    
    // Auth & Roles
    login: "Login",
    register: "Register",
    logout: "Logout",
    continue: "Continue",
    chooseRole: "Choose Your Role",
    farmer: "Farmer",
    fieldOfficer: "Field Officer",
    fieldOfficerRole: "Field Officer • Delta Zone",
    farmerRole: "Farmer / Landholder",
    employeeId: "Officer ID",
    farmerId: "Farmer ID",

    // Navigation & Headers
    home: "Home",
    dashboard: "Dashboard",
    visits: "Visits",
    reports: "Reports",
    profile: "Profile",
    farm: "My Farm",
    orders: "My Orders",
    support: "Support",
    history: "History",
    notifications: "Notifications",
    directory: "Directory",
    back: "Back",
    viewAll: "View All",
    viewDetails: "View Details",
    viewDossier: "View Dossier",
    viewReport: "View Full Report",
    viewProtocol: "View Protocol",

    // Farmer & Client Types (Mingle)
    dualClient: "Dual Client (Crop + Fert)",
    cropCultivator: "Crop Cultivator",
    fertilizerCustomer: "Fertilizer Buyer",
    bioInputClient: "Bio-Input Client",
    assignedFarmers: "Farmers & Input Clients",
    mingleSubtext: "Mingle of Contract Crop Growers & Bio-Fertilizer Buyers",

    // Statuses
    all: "All",
    status: "Status",
    completed: "Completed",
    pending: "Pending",
    scheduled: "Scheduled",
    active: "Active",
    optimal: "Optimal",
    processing: "Processing",
    delivered: "Delivered",
    dispatched: "Dispatched",

    // Farm & Soil Metrics
    soilHealth: "Soil Health",
    soilPh: "Soil pH",
    moisture: "Moisture",
    rootDepth: "Root Depth",
    acres: "Acres",
    cropType: "Crop Type",
    primaryCrop: "Primary Crop",
    irrigation: "Irrigation",
    dripIrrigation: "Drip Irrigation",
    organicCertified: "Organic Certified",

    // Common Crops & Inputs
    vetiver: "Vetiver",
    turmeric: "Turmeric",
    pepper: "Pepper",
    paddy: "Organic Paddy",
    vermicompost: "Organic Vermicompost",
    bioFertilizer: "Bio-Fertilizer",
    neemCake: "Neem Cake",
    panchagavya: "Panchagavya",

    // Actions & Tools
    search: "Search...",
    clockIn: "Clock In",
    clockOut: "Clock Out",
    startVisit: "Start Visit",
    logVisit: "Log Field Visit",
    checkIn: "Check-in",
    rateOfficer: "Rate Field Officer",
    submitRating: "Submit Rating & Review",
    howWasExperience: "How was your experience?",
    callFarmer: "Call Farmer",
    whatsapp: "WhatsApp",
    downloadPdf: "Download PDF",
    addNote: "Add Note",

    // Quick Advisory Card
    activeAdvisory: "Advisory • Active Growth Stage",
    dueIn3Days: "Due in 3 Days",
    bioFertilizerTitle: "Bio-Fertilizer & Soil Nutrition",
    bioFertilizerDesc: "Apply 50kg Organic Vermicompost & Neem Cake blend along root irrigation drip lines for maximum rhizosphere elongation.",

    // Menu & Sub-screens
    menu: "Menu",
    workflow: "Workflow",
    attendance: "Attendance",
    myVisits: "My Visits",
    accountPreferences: "Account & Preferences",
    myProfile: "My Profile",
    appSettings: "App Settings",
    systemSupport: "System & Support",
    offlineData: "Offline Data",
    storageUsage: "Storage Usage",
    emergencyContact: "Emergency Contact",
    secureLogout: "Secure Logout",

    // Profile Screen
    fieldOfficerId: "Field Officer ID",
    verifiedOfficer: "Verified Field Officer • EMP-2026-084",
    visitsLogged: "Visits Logged",
    farmers: "Farmers",
    rating: "Rating",
    officialInfo: "Official Information",
    contactMobile: "Contact Mobile",
    corporateEmail: "Corporate Email",
    hqOffice: "HQ Assigned Office",
    attendanceHistoryTimesheets: "Attendance History & Timesheets",
    inspectionReportsSignoffs: "Inspection Reports & Sign-offs",
    signOutFieldDuty: "Sign Out of Field Duty",

    // Attendance Screen
    dutyAttendance: "Duty & Attendance",
    dailyTimeTracker: "Daily Time Tracker",
    onDuty: "● On Duty",
    clockedOut: "○ Clocked Out",
    todaysShiftHours: "Today's Shift Hours",
    shiftDuration: "Shift Duration",
    geofence: "Geofence",
    verified: "Verified",
    recentAttendanceHistory: "Recent Attendance History",
    today: "Today",
    yesterday: "Yesterday",
    present: "Present",
    activeShift: "Active",
    time: "Time",
    hours: "Hours",

    // Dashboard & Actions
    nextScheduledVisit: "Next Up For You",
    priorityFieldVisit: "Priority Field Visit",
    quickActions: "Quick Actions",
    dutyLogs: "Duty Logs",
    fieldReports: "Field Reports",
    gpsLive: "GPS Live",
    more: "More",
    todayFieldRoute: "Today's Field Route",
    startInspection: "Start Inspection",
    upcomingVisit: "Upcoming Visit",
    todaysVisits: "Today's Field Visits",
  },

  ta: {
    // Top & Brand
    appName: "இன்பினிட்டி ஆர்கானிக்ஸ்",
    tagline: "சீர்மிகு விவசாயத்திற்கான வழி",
    manifesto1: "விவசாயிகளை மேம்படுத்துதல்.",
    manifesto2: "மண் வளத்தை பெருக்குதல்.",
    manifesto3: "நிலையான எதிர்காலத்தை உருவாக்குதல்.",
    
    // Auth & Roles
    login: "உள்நுழைக",
    register: "பதிவு செய்க",
    logout: "வெளியேறு",
    continue: "தொடர்க",
    chooseRole: "உங்கள் பங்கை தேர்வு செய்க",
    farmer: "விவசாயி",
    fieldOfficer: "கள அலுவலர்",
    fieldOfficerRole: "கள அலுவலர் • டெல்டா மண்டலம்",
    farmerRole: "விவசாயி / நில உரிமையாளர்",
    employeeId: "அலுவலர் எண்",
    farmerId: "விவசாயி எண்",

    // Navigation & Headers
    home: "முகப்பு",
    dashboard: "முகப்பு பலகை",
    visits: "வருகைகள்",
    reports: "அறிக்கைகள்",
    profile: "சுயவிவரம்",
    farm: "என் பண்ணை",
    orders: "என் ஆர்டர்கள்",
    support: "உதவி மையம்",
    history: "வரலாறு",
    notifications: "அறிவிப்புகள்",
    directory: "விவசாயிகள் பட்டியல்",
    back: "பின்செல்",
    viewAll: "அனைத்தும் காண்க",
    viewDetails: "விவரங்களை காண்க",
    viewDossier: "ஆவணத்தை காண்க",
    viewReport: "முழு அறிக்கை காண்க",
    viewProtocol: "வழிமுறையை காண்க",

    // Farmer & Client Types (Mingle)
    dualClient: "இருவழி உறுப்பினர் (பயிர் + உரம்)",
    cropCultivator: "பயிர் சாகுபடியாளர்",
    fertilizerCustomer: "உரம் வாங்குபவர்",
    bioInputClient: "இயற்கை உரம் வாடிக்கையாளர்",
    assignedFarmers: "விவசாயிகள் மற்றும் வாடிக்கையாளர்கள்",
    mingleSubtext: "ஒப்பந்த பயிர் வளர்ப்பாளர்கள் மற்றும் இயற்கை உரம் வாங்குபவர்கள்",

    // Statuses
    all: "அனைத்தும்",
    status: "நிலை",
    completed: "முடிந்தது",
    pending: "நிலுவையில்",
    scheduled: "திட்டமிடப்பட்டது",
    active: "செயலில்",
    optimal: "சிறந்தது",
    processing: "செயல்பாட்டில்",
    delivered: "டெலிவரி செய்யப்பட்டது",
    dispatched: "அனுப்பப்பட்டது",

    // Farm & Soil Metrics
    soilHealth: "மண் வளம்",
    soilPh: "மண் pH",
    moisture: "ஈரப்பதம்",
    rootDepth: "வேர் ஆழம்",
    acres: "ஏக்கர்",
    cropType: "பயிர் வகை",
    primaryCrop: "முக்கிய பயிர்",
    irrigation: "பாசனம்",
    dripIrrigation: "சொட்டு நீர் பாசனம்",
    organicCertified: "இயற்கை சான்றளிக்கப்பட்டது",

    // Common Crops & Inputs
    vetiver: "வெட்டிவேர்",
    turmeric: "மஞ்சள்",
    pepper: "மிளகு",
    paddy: "பாரம்பரிய இயற்கை நெல்",
    vermicompost: "மண்புழு உரம்",
    bioFertilizer: "உயிர் உரம்",
    neemCake: "வேப்பம் பிண்ணாக்கு",
    panchagavya: "பஞ்சகாவ்யா",

    // Actions & Tools
    search: "தேடுக...",
    clockIn: "தொடக்க நேரம்",
    clockOut: "முடிவு நேரம்",
    startVisit: "வருகையை தொடங்கு",
    logVisit: "வருகை பதிவு செய்",
    checkIn: "வருகை பதிவு",
    rateOfficer: "அலுவலரை மதிப்பிடுக",
    submitRating: "மதிப்பீட்டை சமர்ப்பிக்க",
    howWasExperience: "உங்கள் அனுபவம் எப்படி இருந்தது?",
    callFarmer: "அழைக்க",
    whatsapp: "வாட்ஸ்அப்",
    downloadPdf: "PDF பதிவிறக்கு",
    addNote: "குறிப்பு சேர்க்க",

    // Quick Advisory Card
    activeAdvisory: "ஆலோசனை • தீவிர வளர்ச்சி நிலை",
    dueIn3Days: "3 நாட்களில் தேவை",
    bioFertilizerTitle: "இயற்கை உரம் & மண் ஊட்டச்சத்து",
    bioFertilizerDesc: "வேர் வளர்ச்சிக்கு 50 கிலோ மண்புழு உரம் மற்றும் வேப்பம் பிண்ணாக்கு கலவையை சொட்டு நீர் பாசன வழியில் இடவும்.",

    // Menu & Sub-screens
    menu: "பட்டி",
    workflow: "பணிப்பாய்வு",
    attendance: "வருகைப்பதிவு",
    myVisits: "என் வருகைகள்",
    accountPreferences: "கணக்கு & விருப்பங்கள்",
    myProfile: "என் சுயவிவரம்",
    appSettings: "செயலி அமைப்புகள்",
    systemSupport: "கணினி & ஆதரவு",
    offlineData: "ஆஃப்லைன் தரவு",
    storageUsage: "சேமிப்பு பயன்பாடு",
    emergencyContact: "அவசர தொடர்பு",
    secureLogout: "பாதுகாப்பாக வெளியேறு",

    // Profile Screen
    fieldOfficerId: "கள அலுவலர் அடையாள அட்டை",
    verifiedOfficer: "சான்றளிக்கப்பட்ட கள அலுவலர் • EMP-2026-084",
    visitsLogged: "பதிவான வருகைகள்",
    farmers: "விவசாயிகள்",
    rating: "மதிப்பீடு",
    officialInfo: "அலுவலகத் தகவல்கள்",
    contactMobile: "தொடர்பு அலைபேசி",
    corporateEmail: "நிறுவன மின்னஞ்சல்",
    hqOffice: "தலைமையக மண்டலம்",
    attendanceHistoryTimesheets: "வருகை வரலாறு & பணி அட்டவணை",
    inspectionReportsSignoffs: "ஆய்வு அறிக்கைகள் & ஒப்புதல்கள்",
    signOutFieldDuty: "களப் பணியிலிருந்து வெளியேறு",

    // Attendance Screen
    dutyAttendance: "பணி & வருகைப்பதிவு",
    dailyTimeTracker: "தினசரி பணி கண்காணிப்பாளர்",
    onDuty: "● பணியில் உள்ளீர்",
    clockedOut: "○ பணி முடிந்தது",
    todaysShiftHours: "இன்றைய பணி நேரம்",
    shiftDuration: "பணி காலம்",
    geofence: "புவி வரம்பு",
    verified: "சரிபார்க்கப்பட்டது",
    recentAttendanceHistory: "சமீபத்திய வருகை வரலாறு",
    today: "இன்று",
    yesterday: "நேற்று",
    present: "வருகை",
    activeShift: "செயலில்",
    time: "நேரம்",
    hours: "மணி நேரம்",

    // Dashboard & Actions
    nextScheduledVisit: "அடுத்த முக்கிய வருகை",
    priorityFieldVisit: "முக்கிய கள வருகை",
    quickActions: "விரைவுச் செயல்கள்",
    dutyLogs: "பணிப் பதிவு",
    fieldReports: "கள அறிக்கை",
    gpsLive: "நேரலை",
    more: "மேலும்",
    todayFieldRoute: "இன்றைய களப் பாதை",
    startInspection: "ஆய்வைத் தொடங்கு",
    upcomingVisit: "வரவிருக்கும் வருகை",
    todaysVisits: "இன்றைய கள வருகைகள்",
  },
};

interface LanguageContextProps {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<AppLanguage>("en");

  useEffect(() => {
    (async () => {
      try {
        const savedLang = await AsyncStorage.getItem("app_language");
        if (savedLang === "en" || savedLang === "ta") {
          setLanguageState(savedLang as AppLanguage);
          setGlobalFontLanguage(savedLang as AppLanguage);
        } else {
          setGlobalFontLanguage("en");
        }
      } catch (e) {
        console.log("Language load error:", e);
      }
    })();
  }, []);

  const setLanguage = async (lang: AppLanguage) => {
    setLanguageState(lang);
    setGlobalFontLanguage(lang);
    try {
      await AsyncStorage.setItem("app_language", lang);
    } catch (e) {
      console.log("Language save error:", e);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ta" : "en";
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language] || translations.en;
    if (dict[key]) {
      return dict[key];
    }
    const enDict = translations.en;
    if (enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// Pre-built Language Toggle Pill Component
export const LanguageTogglePill: React.FC<{
  dark?: boolean;
  className?: string;
}> = ({ dark = false, className = "" }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleLanguage}
      className={`flex-row items-center px-3 py-1.5 rounded-full border shadow-xs ${
        dark
          ? "bg-slate-900/80 border-slate-700/80"
          : "bg-white/95 border-slate-200"
      } ${className}`}
    >
      <Globe size={14} color={dark ? "#34d399" : "#059669"} className="mr-1.5" />
      <Text
        className={`font-gotham-bold text-xs ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {language === "en" ? "EN" : "தமிழ்"}
      </Text>
      <Text
        className={`text-[10px] font-gotham-medium ml-1 ${
          dark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {language === "en" ? "தமிழ்" : "EN"}
      </Text>
    </TouchableOpacity>
  );
};
