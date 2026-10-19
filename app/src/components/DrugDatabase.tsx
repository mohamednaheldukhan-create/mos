import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Pill, AlertTriangle } from "lucide-react";
import { drugDatabase, interactions } from "@/data/drugs";

export function DrugDatabase() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = drugDatabase.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.nameAr.includes(search) ||
    d.ingredients.some(i => i.toLowerCase().includes(search.toLowerCase()))
  );

  const selected = drugDatabase.find(d => d.id === selectedId);
  const relatedInteractions = selected 
    ? interactions.filter(i => 
        selected.ingredients.some(ing => i.ingredientA.toLowerCase() === ing.toLowerCase()) ||
        selected.ingredients.some(ing => i.ingredientB.toLowerCase() === ing.toLowerCase())
      )
    : [];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-teal-900">قاعدة بيانات الأدوية</h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">تصفح سجلات الأدوية والتفاعلات المحلية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
            <Input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن دواء..." 
              className="pr-10"
            />
          </div>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {filtered.map(drug => (
              <Card 
                key={drug.id} 
                onClick={() => setSelectedId(drug.id)}
                className={`cursor-pointer transition-all border-slate-200 hover:shadow-md ${
                  selectedId === drug.id ? "ring-2 ring-teal-500 border-teal-500" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Pill className="w-4 h-4 text-teal-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{drug.name}</p>
                      <p className="text-xs text-slate-500">{drug.ingredients.join("، ")}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">{drug.form}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <Card className="shadow-md border-slate-200">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <CardTitle className="text-teal-900">{selected.name} ({selected.nameAr})</CardTitle>
                <p className="text-sm text-slate-600">{selected.therapeuticClass}</p>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">المكونات الفعالة</p>
                    <p className="text-slate-800">{selected.ingredients.join("، ")}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">الشكل وطريقة الإعطاء</p>
                    <p className="text-slate-800">{selected.form} • {selected.route}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">الدواعي</p>
                    <p className="text-slate-800">{selected.indications}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">المصدر</p>
                    <p className="text-slate-800">{selected.source}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">الآثار الجانبية الشائعة</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.adverseEffects.map((eff, i) => (
                      <Badge key={i} variant="outline" className="bg-amber-50 border-amber-200 text-amber-800">
                        {eff}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">موانع الاستعمال</p>
                  <p className="text-sm text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100">
                    {selected.contraindications}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" /> التفاعلات المعروفة
                  </h3>
                  {relatedInteractions.length > 0 ? (
                    <div className="space-y-3">
                      {relatedInteractions.map((inter, i) => (
                        <div key={i} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                            <p className="font-medium text-slate-800">
                              {inter.ingredientA} + {inter.ingredientB}
                            </p>
                            <Badge className={
                              inter.severity === "Critical" ? "bg-red-600" :
                              inter.severity === "High" ? "bg-orange-500" :
                              inter.severity === "Moderate" ? "bg-amber-500" :
                              "bg-slate-400"
                            }>
                              {inter.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-1"><span className="font-medium">التأثير:</span> {inter.clinicalEffect}</p>
                          <p className="text-sm text-slate-600"><span className="font-medium">الإدارة:</span> {inter.management}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 italic bg-slate-50 p-3 rounded-lg">
                      معلومات التفاعل غير متوفرة في قاعدة البيانات المحلية.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-md border-slate-200 h-full flex items-center justify-center">
              <CardContent className="p-12 text-center">
                <Pill className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">اختر دواءً لعرض التفاصيل</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}