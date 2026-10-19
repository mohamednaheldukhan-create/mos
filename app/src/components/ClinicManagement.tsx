import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarClock, Trash2, Plus, User } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
}

interface PatientNote {
  id: string;
  patientName: string;
  note: string;
  date: string;
}

export function ClinicManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: "1", patientName: "أحمد علي", date: "2024-05-20", time: "10:00", reason: "متابعة الضغط" },
    { id: "2", patientName: "سارة محمد", date: "2024-05-20", time: "11:30", reason: "استشارة عامة" },
  ]);
  
  const [notes, setNotes] = useState<PatientNote[]>([
    { id: "1", patientName: "أحمد علي", note: "المريض يعاني من داء السكري ويأخذ الميتفورمين.", date: "2024-05-15" },
  ]);

  const [newAppt, setNewAppt] = useState<Omit<Appointment, "id">>({ patientName: "", date: "", time: "", reason: "" });
  const [newNote, setNewNote] = useState<Omit<PatientNote, "id">>({ patientName: "", note: "", date: new Date().toISOString().split("T")[0] });

  const addAppointment = () => {
    if (!newAppt.patientName || !newAppt.date) return;
    setAppointments([...appointments, { ...newAppt, id: Date.now().toString() }]);
    setNewAppt({ patientName: "", date: "", time: "", reason: "" });
  };

  const addNote = () => {
    if (!newNote.patientName || !newNote.note) return;
    setNotes([...notes, { ...newNote, id: Date.now().toString() }]);
    setNewNote({ patientName: "", note: "", date: new Date().toISOString().split("T")[0] });
  };

  const deleteAppt = (id: string) => setAppointments(appointments.filter(a => a.id !== id));
  const deleteNote = (id: string) => setNotes(notes.filter(n => n.id !== id));

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-teal-900">إدارة العيادة</h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">إدارة المواعيد وملاحظات المرضى</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-slate-200">
          <CardHeader className="bg-teal-50 border-b border-teal-100">
            <CardTitle className="text-teal-900 flex items-center gap-2">
              <CalendarClock className="w-5 h-5" /> المواعيد
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="اسم المريض" value={newAppt.patientName} onChange={(e) => setNewAppt({...newAppt, patientName: e.target.value})} />
                <Input placeholder="السبب" value={newAppt.reason} onChange={(e) => setNewAppt({...newAppt, reason: e.target.value})} />
                <Input type="date" value={newAppt.date} onChange={(e) => setNewAppt({...newAppt, date: e.target.value})} />
                <Input type="time" value={newAppt.time} onChange={(e) => setNewAppt({...newAppt, time: e.target.value})} />
              </div>
              <Button onClick={addAppointment} className="w-full bg-teal-700 hover:bg-teal-800">
                <Plus className="w-4 h-4 ml-2" /> إضافة موعد
              </Button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {appointments.map(appt => (
                <div key={appt.id} className="flex justify-between items-start border-r-4 border-teal-500 bg-white p-3 rounded-lg shadow-sm">
                  <div>
                    <p className="font-semibold text-slate-800">{appt.patientName}</p>
                    <p className="text-sm text-slate-500">{appt.date} {appt.time && `- ${appt.time}`}</p>
                    <p className="text-sm text-slate-600 mt-1">{appt.reason}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteAppt(appt.id)} className="text-red-500 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-slate-200">
          <CardHeader className="bg-sky-50 border-b border-sky-100">
            <CardTitle className="text-sky-900 flex items-center gap-2">
              <User className="w-5 h-5" /> ملاحظات المرضى
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
              <Input placeholder="اسم المريض" value={newNote.patientName} onChange={(e) => setNewNote({...newNote, patientName: e.target.value})} />
              <Textarea placeholder="اكتب الملاحظة السريرية هنا..." value={newNote.note} onChange={(e) => setNewNote({...newNote, note: e.target.value})} />
              <Button onClick={addNote} className="w-full bg-sky-700 hover:bg-sky-800">
                <Plus className="w-4 h-4 ml-2" /> حفظ الملاحظة
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notes.map(note => (
                <div key={note.id} className="flex justify-between items-start border-r-4 border-sky-500 bg-white p-3 rounded-lg shadow-sm">
                  <div>
                    <p className="font-semibold text-slate-800">{note.patientName} <span className="text-xs text-slate-400 font-normal">({note.date})</span></p>
                    <p className="text-sm text-slate-600 mt-1">{note.note}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)} className="text-red-500 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}