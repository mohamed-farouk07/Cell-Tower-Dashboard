import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      logout: "Logout",
      confirmLogout: "Are you sure you want to logout?",
      logoutDescription:
        "If you logout, you will need to log in again to access your user.",
      no: "No",
      yesLogout: "Yes, Logout",
      dashboard: "Dashboard",
      loggingOut: "Logging out...",
      cellTowerDashboard: "Cell Tower Dashboard",
      monitorManageNetwork: "Monitor and manage your cell tower network",
      totalTowers: "Total Towers",
      activeTowers: "Active Towers",
      averageSignal: "Average Signal",
      searchTowers: "Search Towers:",
      enterTowerName: "Enter tower name...",
      filterByCity: "Filter by City:",
      allCities: "All Cities",
      towersInformation: "Towers Information",
      name: "Name",
      city: "City",
      networkType: "Network Type",
      status: "Status",
      signalStrength: "Signal Strength",
      active: "Active",
      offline: "Offline",
      towersByCity: "Towers by City",
      towerStatusDistribution: "Tower Status Distribution",
      cairo: "Cairo",
      alexandria: "Alexandria",
      hurghada: "Hurghada",
      luxor: "Luxor",
    },
  },
  ar: {
    translation: {
      logout: "تسجيل الخروج",
      confirmLogout: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
      logoutDescription:
        "إذا قمت بتسجيل الخروج ، ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك.",
      no: "لا",
      yesLogout: "نعم ، تسجيل الخروج",
      dashboard: "لوحة التحكم",
      loggingOut: "جاري تسجيل الخروج...",
      cellTowerDashboard: "لوحة تحكم أبراج الاتصالات",
      monitorManageNetwork: "راقب وأدر شبكة أبراج الاتصالات الخاصة بك",
      totalTowers: "إجمالي الأبراج",
      activeTowers: "الأبراج النشطة",
      averageSignal: "متوسط الإشارة",
      searchTowers: "البحث في الأبراج:",
      enterTowerName: "أدخل اسم البرج...",
      filterByCity: "تصفية حسب المدينة:",
      allCities: "جميع المدن",
      towersInformation: "معلومات الأبراج",
      name: "الاسم",
      city: "المدينة",
      networkType: "نوع الشبكة",
      status: "الحالة",
      signalStrength: "قوة الإشارة",
      active: "نشط",
      offline: "غير متصل",
      towersByCity: "الأبراج حسب المدينة",
      towerStatusDistribution: "توزيع حالة الأبراج",
      cairo: "القاهرة",
      alexandria: "الإسكندرية",
      hurghada: "الغردقة",
      luxor: "الأقصر",
    },
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;