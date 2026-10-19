import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PrescriptionBuilder } from "@/components/PrescriptionBuilder";
import { DrugDatabase } from "@/components/DrugDatabase";
import { PrescriptionPrint } from "@/components/PrescriptionPrint";
import { ClinicManagement } from "@/components/ClinicManagement";
import { SettingsView } from "@/components/SettingsView";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Stethoscope, Save } from "lucide-react";

export type View = "dashboard" | "prescription" | "database" | "settings" | "clinic" | "print";

export interface DoctorInfo {
  name: string;
  nameAr: string;
  credentials: string;
  clinic: string;
  clinicAr: string;
  phone: string;
  email: string;
  address: string;
  addressAr: string;
}

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [doctor, setDoctor] = useState<DoctorInfo>({
    name: "Dr. Sarah Mitchell",
    nameAr: "د. سارة ميتشل",
    credentials: "MD, Internal Medicine",
    clinic: "Riverside Medical Center",
    clinicAr: "مركز ريفيرسايد الطبي",
    phone: "+971 4 555 1234",
    email: "contact@riverside.ae",
    address: "123 Healthcare St, Dubai, UAE",
    addressAr: "١٢٣ شارع الرعاية الصحية، دبي، الإمارات",
  });

  const [prescriptionData, setPrescriptionData] = useState<any>(null);

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden" dir="rtl">
      <Sidebar view={view} setView={setView} />
      <main className="flex-1 overflow-y-auto">
        {view === "dashboard" && <Dashboard setView={setView} doctor={doctor} />}
        {view === "prescription" && (
          <PrescriptionBuilder 
            doctor={doctor} 
            onPrint={(data) => {
              setPrescriptionData(data);
              setView("print");
            }} 
          />
        )}
        {view === "database" && <DrugDatabase />}
        {view === "clinic" && <ClinicManagement />}
        {view === "print" && prescriptionData && (
          <PrescriptionPrint 
            data={prescriptionData} 
            doctor={doctor} 
            onBack={() => setView("prescription")} 
          />
        )}
        {view === "settings" && <SettingsView doctor={doctor} setDoctor={setDoctor} />}
      </main>
    </div>
  );
}