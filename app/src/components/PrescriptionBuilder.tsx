import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Plus, Printer, Trash2, Pill, User, Bot, Loader2, ShieldCheck } from "lucide-react";
import { drugDatabase, type Drug } from "@/data/drugs";
import { cn } from "@/lib/utils";
import type { DoctorInfo } from "@/App";

interface MedicationEntry {
  drug: Drug;
  dose: string;
  unit: string;
  route: string;
  frequency: string;
  duration: string;
  quantity: string;
  instructions: string;
}

interface CurrentMed {
  id: string;
  name: string;
}

export function PrescriptionBuilder({ doctor, onPrint }: { doctor: DoctorInfo; onPrint: (data: any) => void }) {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientId, setPatientId] = useState("PT-" + Math.floor(1000 + Math.random() * 9000));
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [diagnosis, setDiagnosis] = useState("");
  
  const [currentMeds, setCurrentMeds] = useState<CurrentMed[]>([]);
  const [currentMedInput, setCurrentMedInput] = useState("");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrugId, setSelectedDrugId] = useState<string>("");
  const [medications, setMedications] = useState<MedicationEntry[]>([]);

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredDrugs = searchTerm 
    ? drugDatabase.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.nameAr.includes(searchTerm) ||
        d.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : drugDatabase;

  const addCurrentMed = () => {
    if (!currentMedInput.trim()) return;
    setCurrentMeds([...currentMeds, { id: Date.now().toString(), name: currentMedInput.trim() }]);
    setCurrentMedInput("");
  };

  const handleAddMedication = () => {
    const drug = drugDatabase.find(d => d.id === selectedDrugId);
    if (!drug) return;
    
    setMedications([...medications, {
      drug,
      dose: "",
      unit: drug.form === "Tablet" ? "mg" : "mL",
      route: drug.route,
      frequency: "مرة واحدة يومياً",
      duration: "7 أيام",
      quantity: "30",
      instructions: ""
    }]);
    setSelectedDrugId("");
    setSearchTerm("");
  };

  const updateMedication = (index: number, field: keyof MedicationEntry, value: string) => {
    const updated = [...medications];
    (updated[index] as any)[field] = value;
    setMedications(updated);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const runAiAnalysis = () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    
    setTimeout(() => {
      let analysis = "تحليل التفاعلات الدوائية بالذكاء الاصطناعي:\n\n";
      
      if (currentMeds.length === 0 && medications.length === 0) {
        analysis += "لم يتم إدخال أدوية حالية أو جديدة للتحليل.";
      } else {
        if (currentMeds.length > 0) {
          analysis += "الأدوية الحالية للمريض:\n";
          currentMeds.forEach(m => analysis += `- ${m.name}\n`);
          analysis += "\n";
        }
        
        if (medications.length > 0) {
          analysis += "الأدوية الموصوفة الجديدة:\n";
          medications.forEach(m => analysis += `- ${m.drug.name} (${m.drug.ingredients.join("، ")})\n`);
          analysis += "\n";
          
          analysis += "نتائج فحص التفاعلات:\n";
          medications.forEach(med => {
            med.drug.contraindications.split(",").forEach(c => {
              if (diagnosis && c.toLowerCase().includes(diagnosis.toLowerCase().split(" ")[0])) {
                analysis += `⚠️ تحذير: ${med.drug.name} قد يكون ممنوعاً بناءً على التشخيص (${diagnosis}).\n`;
              }
            });
          });
          
          analysis += "\nملاحظات سريرية:\n";
          analysis += "- راجع وظائف الكلى والكبد قبل صرف الأدوية التي تتطلب تعديل الجرعة.\n";
          analysis += "- تأكد من عدم وجود حساسية تجاه المكونات النشطة.\n";
          analysis += "- هذا التحليل مدعوم بالذكاء الاصطناعي ويجب مراجعته من قبل الطبيب المختص.\n";
        }
      }
      
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handlePrint = () => {
    onPrint({
      patientName,
      patientAge,
      patientId,
      date,
      diagnosis,
      currentMeds: currentMeds.map(m => m.name),
      medications
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-teal-900">وصفة طبية جديدة</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">إنشاء وصفة طبية مع فحص التفاعلات بالذكاء الاصطناعي</p>
        </div>
        <Button 
          size="lg" 
          className="bg-teal-700 hover:bg-teal-800 w-full sm:w-auto"
          onClick={handlePrint}
          disabled={medications.length === 0 || !patientName}
        >
          <Printer className="w-4 h-4 ml-2" /> معاينة وطباعة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md border-slate-200">
            <CardHeader className="bg-teal-50 border-b border-teal-100">
              <CardTitle className="text-teal-900 flex items-center gap-2 text-lg">
                <User className="w-5 h-5" /> معلومات المريض
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pName">اسم المريض</Label>
                <Input id="pName" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="اكتب الاسم" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pAge">العمر</Label>
                  <Input id="pAge" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="45" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pId">رقم المريض</Label>
                  <Input id="pId" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">التاريخ</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diag">التشخيص</Label>
                <Textarea id="diag" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="التشخيص الرئيسي..." />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-amber-200">
            <CardHeader className="bg-amber-50 border-b border-amber-100">
              <CardTitle className="text-amber-900 flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5" /> الأدوية الحالية
              </CardTitle>
              <CardDescription>أدوية المريض الحالية للمقارنة والتحقق من التفاعلات</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={currentMedInput} 
                  onChange={(e) => setCurrentMedInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCurrentMed()}
                  placeholder="أضف دواءً حالياً..." 
                />
                <Button onClick={addCurrentMed} className="bg-amber-600 hover:bg-amber-700 px-3">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {currentMeds.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">لا توجد أدوية حالية</p>
                ) : (
                  currentMeds.map(med => (
                    <div key={med.id} className="flex justify-between items-center bg-amber-50 border border-amber-200 rounded-lg p-2 px-3">
                      <span className="text-sm font-medium text-amber-900">{med.name}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => setCurrentMeds(currentMeds.filter(m => m.id !== med.id))}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-md border-slate-200 mb-6">
            <CardHeader className="bg-teal-50 border-b border-teal-100">
              <CardTitle className="text-teal-900 flex items-center gap-2 text-lg">
                <Pill className="w-5 h-5" /> إضافة دواء جديد
              </CardTitle>
              <CardDescription>البحث في قاعدة بيانات الأدوية المحلية</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="search">بحث عن دواء</Label>
                  <Input 
                    id="search" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث بالاسم أو المكون الفعال..." 
                  />
                  {searchTerm && (
                    <div className="mt-2 border border-slate-200 rounded-lg max-h-48 overflow-y-auto bg-white">
                      {filteredDrugs.map(drug => (
                        <button
                          key={drug.id}
                          onClick={() => setSelectedDrugId(drug.id)}
                          className={cn(
                            "w-full text-right px-4 py-2 hover:bg-teal-50 border-b border-slate-100 last:border-0",
                            selectedDrugId === drug.id && "bg-teal-100"
                          )}
                        >
                          <p className="font-medium text-slate-800">{drug.name} <span className="text-xs text-slate-500">({drug.form})</span></p>
                          <p className="text-xs text-slate-500">{drug.ingredients.join("، ")}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddMedication} disabled={!selectedDrugId} className="bg-teal-700 hover:bg-teal-800 w-full sm:w-auto">
                    <Plus className="w-4 h-4 ml-2" /> إضافة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {medications.length > 0 && (
            <div className="space-y-4 mb-6">
              {medications.map((med, index) => (
                <Card key={index} className="shadow-sm border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-slate-800">{med.drug.name}</CardTitle>
                        <CardDescription>{med.drug.ingredients.join("، ")}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeMedication(index)} className="text-red-500 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs">الجرعة</Label>
                      <Input value={med.dose} onChange={(e) => updateMedication(index, "dose", e.target.value)} placeholder="500" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">الوحدة</Label>
                      <Input value={med.unit} onChange={(e) => updateMedication(index, "unit", e.target.value)} placeholder="mg" dir="ltr" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">طريقة الإعطاء</Label>
                      <Input value={med.route} onChange={(e) => updateMedication(index, "route", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">التكرار</Label>
                      <Input value={med.frequency} onChange={(e) => updateMedication(index, "frequency", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">المدة</Label>
                      <Input value={med.duration} onChange={(e) => updateMedication(index, "duration", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">الكمية</Label>
                      <Input value={med.quantity} onChange={(e) => updateMedication(index, "quantity", e.target.value)} />
                    </div>
                    <div className="col-span-2 md:col-span-3 space-y-1">
                      <Label className="text-xs">التعليمات</Label>
                      <Textarea value={med.instructions} onChange={(e) => updateMedication(index, "instructions", e.target.value)} placeholder="يؤخذ مع الطعام..." />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card className="shadow-md border-indigo-200 bg-indigo-50/50">
            <CardHeader className="bg-indigo-100 border-b border-indigo-200">
              <CardTitle className="text-indigo-900 flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5" /> المساعد السريري بالذكاء الاصطناعي
              </CardTitle>
              <CardDescription>تحليل التفاعلات بين الأدوية الحالية والموصوفة</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <Button 
                onClick={runAiAnalysis} 
                disabled={isAnalyzing || (medications.length === 0 && currentMeds.length === 0)}
                className="w-full bg-indigo-700 hover:bg-indigo-800"
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-4 h-4 ml-2 animate-spin" /> جاري التحليل...</>
                ) : (
                  <><ShieldCheck className="w-4 h-4 ml-2" /> فحص التفاعلات الدوائية</>
                )}
              </Button>
              
              {aiAnalysis && (
                <div className="mt-4 bg-white border border-indigo-200 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {aiAnalysis}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}