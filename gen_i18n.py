import json
import os

keys = [
  "This Month",
  "Tasks & Schedule Management",
  "Live Monitor",
  "Farmer Directory",
  "Filter",
  "Payments",
  "Missed",
  "Tasks & Schedule",
  "Search by officer or farmer...",
  "Main Menu",
  "Payments & Financials",
  "Daily",
  "Performance Logs",
  "General",
  "Marked Morning Attendance. GPS Started.",
  "Live Logs",
  "Date",
  "Total Farmers",
  "Travel Distance Logged: 12.4 km",
  "Figuring out stats for better choices",
  "Moderate Performance",
  "Pending Farmers",
  "System booted successfully.",
  "New Registrations",
  "Recent Activities",
  "Payment initiation form is ready.",
  "Settings",
  "Visits",
  "Weekly Activity Level",
  "Weekly",
  "Canceled",
  "Identifies high-risk areas based on AI insights",
  "/admin/farmers",
  "Good morning, Super Admin",
  "Order ID",
  "Exporting ledger...",
  "Turned OFF GPS. Red Alert Triggered.",
  "Target completion",
  "Open Stream",
  "Farmers",
  "Dashboard",
  "Search",
  "Search by farmer name, phone, or location...",
  "/",
  "Routine Audits",
  "Online now",
  "Farmer Registration Wizard",
  "Activity",
  "Status",
  "Logs",
  "Low Risk / Healthy",
  "High Risk / Alert",
  "Features",
  "Real-time SVG markers for field officers via minute-by-minute API coordinates.",
  "Completed",
  "Export Report",
  "Checked in at Farm #294 (Muthusamy)",
  "Live Employee Monitor",
  "Employee Directory",
  "Total",
  "Confidence",
  "Live Map Canvas",
  "Daily target progress",
  "Employees",
  "Active Officers",
  "Pending Approvals",
  "Overview",
  "Officers",
  "Visit Audits",
  "Here is the summary of overall data",
  "New",
  "Performance",
  "Search by officer name...",
  "Risk & Performance Analytics",
  "Smart timeline schedule",
  "Officer Statistics",
  "AI Insight",
  "Visits Logged",
  "Analytics & Visits",
  "Visit Overview"
]

translations_ta = {
  "This Month": "இந்த மாதம்",
  "Tasks & Schedule Management": "பணிகள் மற்றும் அட்டவணை மேலாண்மை",
  "Live Monitor": "நேரடி கண்காணிப்பு",
  "Farmer Directory": "விவசாயி பட்டியல்",
  "Filter": "வடிகட்டி",
  "Payments": "பணப்பரிமாற்றங்கள்",
  "Missed": "தவறவிட்டவை",
  "Tasks & Schedule": "பணிகள் மற்றும் அட்டவணை",
  "Search by officer or farmer...": "அலுவலர் அல்லது விவசாயியைத் தேடுக...",
  "Main Menu": "முதன்மை மெனு",
  "Payments & Financials": "கொடுப்பனவுகள் மற்றும் நிதி",
  "Daily": "தினசரி",
  "Performance Logs": "செயல்திறன் பதிவுகள்",
  "General": "பொதுவானவை",
  "Marked Morning Attendance. GPS Started.": "காலை வருகை பதிவு செய்யப்பட்டது. ஜிபிஎஸ் தொடங்கப்பட்டது.",
  "Live Logs": "நேரடி பதிவுகள்",
  "Date": "தேதி",
  "Total Farmers": "மொத்த விவசாயிகள்",
  "Travel Distance Logged: 12.4 km": "பயண தூரம் பதிவு: 12.4 கி.மீ",
  "Figuring out stats for better choices": "சிறந்த முடிவுகளுக்கான புள்ளிவிவரங்கள்",
  "Moderate Performance": "மிதமான செயல்திறன்",
  "Pending Farmers": "நிலுவையிலுள்ள விவசாயிகள்",
  "System booted successfully.": "கணினி வெற்றிகரமாக தொடங்கப்பட்டது.",
  "New Registrations": "புதிய பதிவுகள்",
  "Recent Activities": "சமீபத்திய செயல்பாடுகள்",
  "Payment initiation form is ready.": "பணம் செலுத்தும் படிவம் தயாராக உள்ளது.",
  "Settings": "அமைப்புகள்",
  "Visits": "பார்வைகள்",
  "Weekly Activity Level": "வாராந்திர செயல்பாடு",
  "Weekly": "வாராந்திரம்",
  "Canceled": "ரத்து செய்யப்பட்டது",
  "Identifies high-risk areas based on AI insights": "AI அடிப்படையில் அதிக ஆபத்துள்ள பகுதிகளை அடையாளம் காண்கிறது",
  "/admin/farmers": "/admin/farmers",
  "Good morning, Super Admin": "காலை வணக்கம், தலைமை நிர்வாகி",
  "Order ID": "ஆர்டர் ஐடி",
  "Exporting ledger...": "பேரேட்டை ஏற்றுமதி செய்கிறது...",
  "Turned OFF GPS. Red Alert Triggered.": "ஜிபிஎஸ் அணைக்கப்பட்டது. சிவப்பு எச்சரிக்கை.",
  "Target completion": "இலக்கு நிறைவு",
  "Open Stream": "பதிவுகளைத் திற",
  "Farmers": "விவசாயிகள்",
  "Dashboard": "கட்டுப்பாட்டு அறை",
  "Search": "தேடு",
  "Search by farmer name, phone, or location...": "விவசாயி பெயர், தொலைபேசி அல்லது இடத்தை தேடுக...",
  "/": "/",
  "Routine Audits": "வழக்கமான ஆய்வுகள்",
  "Online now": "தற்போது ஆன்லைனில்",
  "Farmer Registration Wizard": "விவசாயி பதிவு",
  "Activity": "செயல்பாடு",
  "Status": "நிலை",
  "Logs": "பதிவுகள்",
  "Low Risk / Healthy": "குறைந்த ஆபத்து / ஆரோக்கியம்",
  "High Risk / Alert": "அதிக ஆபத்து / எச்சரிக்கை",
  "Features": "அம்சங்கள்",
  "Real-time SVG markers for field officers via minute-by-minute API coordinates.": "கள அலுவலர்களின் நிகழ்நேர இருப்பிடத்தைக் காட்டுகிறது.",
  "Completed": "முடிந்தது",
  "Export Report": "அறிக்கையை ஏற்றுமதி செய்",
  "Checked in at Farm #294 (Muthusamy)": "பண்ணை #294 இல் பதிவு செய்யப்பட்டது (முத்துசாமி)",
  "Live Employee Monitor": "நேரடி பணியாளர் கண்காணிப்பு",
  "Employee Directory": "பணியாளர் பட்டியல்",
  "Total": "மொத்தம்",
  "Confidence": "நம்பிக்கை",
  "Live Map Canvas": "நேரடி வரைபடம்",
  "Daily target progress": "தினசரி இலக்கு முன்னேற்றம்",
  "Employees": "பணியாளர்கள்",
  "Active Officers": "செயலிலுள்ள அலுவலர்கள்",
  "Pending Approvals": "நிலுவையிலுள்ள ஒப்புதல்கள்",
  "Overview": "கண்ணோட்டம்",
  "Officers": "அலுவலர்கள்",
  "Visit Audits": "கள ஆய்வு பதிவுகள்",
  "Here is the summary of overall data": "ஒட்டுமொத்த தரவின் சுருக்கம்",
  "New": "புதிய",
  "Performance": "செயல்திறன்",
  "Search by officer name...": "அலுவலர் பெயரை தேடுக...",
  "Risk & Performance Analytics": "ஆபத்து மற்றும் செயல்திறன் பகுப்பாய்வு",
  "Smart timeline schedule": "ஸ்மார்ட் காலவரிசை அட்டவணை",
  "Officer Statistics": "அலுவலர் புள்ளிவிவரங்கள்",
  "AI Insight": "AI பகுப்பாய்வு",
  "Visits Logged": "பதிவுசெய்யப்பட்ட பார்வைகள்",
  "Analytics & Visits": "பகுப்பாய்வு மற்றும் பார்வைகள்",
  "Visit Overview": "கள ஆய்வு கண்ணோட்டம்"
}

en_dict = {k: k for k in keys}
ta_dict = {k: translations_ta.get(k, k) for k in keys}

# Make sure old i18n keys are also preserved
old_i18n = {
      "Infinity Organic Farming": "Infinity Organic Farming",
      "Monitoring": "Monitoring",
      "Live Dashboard": "Live Dashboard",
      "User Accounts": "User Accounts",
      "System Online": "System Online",
      "Search minute logs, farmers, officers...": "Search minute logs, farmers, officers...",
      "Super Admin": "Super Admin",
      "HQ Operations": "HQ Operations",
      "Test Emergency": "Test Emergency",
      "Live Employee Tracking": "Live Employee Tracking",
      "Real-time GPS telemetry and minute-by-minute activity logs.": "Real-time GPS telemetry and minute-by-minute activity logs.",
      "Visits Logged Today": "Visits Logged Today",
      "System Heartbeat": "System Heartbeat",
      "GPS / Critical Alerts": "GPS / Critical Alerts",
      "Displays real-time SVG markers for field officers. Connects via minute-by-minute API coordinates.": "Displays real-time SVG markers for field officers. Connects via minute-by-minute API coordinates.",
      "Minute-by-Minute Logs": "Minute-by-Minute Logs",
      "Open Event Stream": "Open Event Stream",
      "Active": "Active",
      "Alerts": "Alerts",
      "Directories": "Directories"
}

old_ta = {
      "Infinity Organic Farming": "இன்ஃபினிட்டி இயற்கை விவசாயம்",
      "Monitoring": "கண்காணிப்பு",
      "Live Dashboard": "நேரடி கண்காணிப்பு",
      "User Accounts": "பயனர் கணக்குகள்",
      "System Online": "கணினி இயங்குகிறது",
      "Search minute logs, farmers, officers...": "பதிவுகள், விவசாயிகள், அலுவலர்களைத் தேடுக...",
      "Super Admin": "தலைமை நிர்வாகி",
      "HQ Operations": "தலைமையக செயல்பாடுகள்",
      "Test Emergency": "அவசர நிலை சோதனை",
      "Live Employee Tracking": "நேரடி பணியாளர் கண்காணிப்பு",
      "Real-time GPS telemetry and minute-by-minute activity logs.": "நிகழ்நேர ஜிபிஎஸ் தரவு மற்றும் நிமிட வாரியான செயல்பாட்டுப் பதிவுகள்.",
      "Visits Logged Today": "இன்றைய கள ஆய்வுகள்",
      "System Heartbeat": "கணினி நிலை",
      "GPS / Critical Alerts": "ஜிபிஎஸ் / அவசர எச்சரிக்கைகள்",
      "Displays real-time SVG markers for field officers. Connects via minute-by-minute API coordinates.": "கள அலுவலர்களின் நிகழ்நேர இருப்பிடத்தைக் காட்டுகிறது.",
      "Minute-by-Minute Logs": "நிமிட வாரியான பதிவுகள்",
      "Open Event Stream": "பதிவுகளைத் திற",
      "Active": "செயலில்",
      "Alerts": "எச்சரிக்கைகள்",
      "Directories": "கோப்பகங்கள்",
}

for k,v in old_i18n.items():
    en_dict[k] = v
for k,v in old_ta.items():
    ta_dict[k] = v

js_content = f"""import i18n from 'i18next';
import {{ initReactI18next }} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {{
  en: {{
    translation: {json.dumps(en_dict, indent=4)}
  }},
  ta: {{
    translation: {json.dumps(ta_dict, indent=4)}
  }}
}};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({{
    resources,
    fallbackLng: 'en',
    interpolation: {{
      escapeValue: false,
    }}
  }});

export default i18n;
"""

with open(r'c:\Users\inyma\OneDrive\Desktop\Ajith System Backup\inymart projects\Infinity Organics\infinity-backend\resources\js\i18n.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("i18n.js generated successfully")
