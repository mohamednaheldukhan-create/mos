import { LayoutDashboard, FilePlus2, Database, Settings, Stethoscope, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { View } from "@/App";

interface SidebarProps {
  view: View;
  setView: (view: View) => void;
}

export function Sidebar({ view, setView }: SidebarProps) {
  const navItems = [
    { id: "dashboard" as View, label: "لوحة التحكم", icon: LayoutDashboard },
    { id: "prescription" as View, label: "وصفة جديدة", icon: FilePlus2 },
    { id: "clinic" as View, label: "إدارة العيادة", icon: CalendarClock },
    { id: "database" as View, label: "قاعدة الأدوية", icon: Database },
    { id: "settings" as View, label: "الإعدادات", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-teal-900 to-slate-900 text-white flex flex-col h-full shadow-xl">
      <div className="p-6 border-b border-teal-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg leading-tight">المساعد الطبي</h1>
            <p className="text-xs text-teal-300">PrescriptAI</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-teal-600 text-white shadow-md" 
                  : "text-teal-100 hover:bg-teal-800/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-teal-800/50">
        <div className="bg-teal-950/50 rounded-xl p-4 text-xs text-teal-200">
          <p className="font-semibold text-teal-100 mb-1">أداة دعم القرار السريري</p>
          <p>للأطباء المرخصين. ليست بديلاً عن الحكم السريري.</p>
        </div>
      </div>
    </aside>
  );
}