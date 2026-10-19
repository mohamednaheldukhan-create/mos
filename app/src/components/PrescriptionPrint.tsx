import { Button } from "@/components/ui/button";
import { Printer, ArrowRight } from "lucide-react";
import type { DoctorInfo } from "@/App";

interface PrescriptionPrintProps {
  data: any;
  doctor: DoctorInfo;
  onBack: () => void;
}

export function PrescriptionPrint({ data, doctor, onBack }: PrescriptionPrintProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 no-print">
        <Button variant="outline" onClick={onBack} className="w-full sm:w-auto">
          <ArrowRight className="w-4 h-4 ml-2" /> العودة للمحرر
        </Button>
        <Button onClick={handlePrint} className="bg-teal-700 hover:bg-teal-800 w-full sm:w-auto">
          <Printer className="w-4 h-4 ml-2" /> طباعة / حفظ PDF
        </Button>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 shadow-xl border border-slate-200 rounded-lg print:shadow-none print:border-0 print:rounded-none" id="prescription-paper">
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-teal-700 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-teal-900">{doctor.clinicAr}</h1>
            <h2 className="text-lg md:text-xl font-serif text-slate-700" dir="ltr">{doctor.clinic}</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2">{doctor.addressAr}</p>
            <p className="text-xs md:text-sm text-slate-500" dir="ltr">{doctor.address}</p>
            <p className="text-xs md:text-sm text-slate-500 mt-1">هاتف: {doctor.phone} • {doctor.email}</p>
          </div>
          <div className="text-left">
            <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center text-white text-2xl font-serif">
              ℞
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
          <div>
            <p className="text-sm text-slate-500">اسم المريض:</p>
            <p className="text-lg font-semibold text-slate-800">{data.patientName}</p>
          </div>
          <div className="text-left space-y-1">
            <p className="text-sm text-slate-500">التاريخ: <span className="font-medium text-slate-800">{data.date}</span></p>
            <p className="text-sm text-slate-500">رقم المريض: <span className="font-medium text-slate-800">{data.patientId}</span></p>
            <p className="text-sm text-slate-500">العمر: <span className="font-medium text-slate-800">{data.patientAge}</span></p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">التشخيص:</p>
          <p className="text-sm text-slate-600">{data.diagnosis || "غير محدد"}</p>
        </div>

        {data.currentMeds && data.currentMeds.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm font-semibold text-amber-800">الأدوية الحالية:</p>
            <p className="text-sm text-amber-700">{data.currentMeds.join("، ")}</p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-serif font-semibold text-teal-900 mb-4 border-b border-slate-200 pb-2">الأدوية الموصوفة</h3>
          <div className="space-y-4">
            {data.medications.map((med: any, index: number) => (
              <div key={index} className="border-r-4 border-teal-600 pr-4 py-2">
                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
                  <p className="text-lg font-bold text-slate-800">
                    {index + 1}. {med.drug.name} {med.dose}{med.unit}
                  </p>
                  <p className="text-sm text-slate-500">{med.drug.form}</p>
                </div>
                <p className="text-sm text-slate-600 italic">{med.drug.ingredients.join("، ")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm text-slate-700">
                  <p><span className="font-medium">طريقة الإعطاء:</span> {med.route}</p>
                  <p><span className="font-medium">التكرار:</span> {med.frequency}</p>
                  <p><span className="font-medium">المدة:</span> {med.duration}</p>
                  <p><span className="font-medium">الكمية:</span> {med.quantity}</p>
                </div>
                {med.instructions && (
                  <p className="text-sm text-slate-600 mt-2 bg-amber-50 p-2 rounded">
                    <span className="font-medium">التعليمات:</span> {med.instructions}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row justify-between items-end gap-6">
          <div className="text-xs text-slate-400 max-w-xs">
            <p>هذه الوصفة صادرة آلياً وتعتبر صالحة فقط بتوقيع الطبيب.</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-slate-400 w-64 pt-2">
              <p className="font-serif font-bold text-slate-800">{doctor.nameAr}</p>
              <p className="text-sm text-slate-600" dir="ltr">{doctor.credentials}</p>
              <p className="text-sm text-slate-600" dir="ltr">{doctor.name}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}