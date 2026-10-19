export interface Drug {
  id: string;
  name: string;
  nameAr: string;
  ingredients: string[];
  form: string;
  route: string;
  therapeuticClass: string;
  indications: string;
  contraindications: string;
  adverseEffects: string[];
  source: string;
}

export interface Interaction {
  ingredientA: string;
  ingredientB: string;
  severity: "Critical" | "High" | "Moderate" | "Low";
  mechanism: string;
  clinicalEffect: string;
  management: string;
}

export const drugDatabase: Drug[] = [
  {
    id: "d1",
    name: "Lipitor",
    nameAr: "ليبيتور",
    ingredients: ["Atorvastatin"],
    form: "Tablet",
    route: "Oral",
    therapeuticClass: "Statin / Lipid-lowering",
    indications: "Hypercholesterolemia, prevention of cardiovascular disease",
    contraindications: "Active liver disease, unexplained persistent elevations of serum transaminases, pregnancy, lactation",
    adverseEffects: ["Myalgia", "Headache", "Diarrhea", "Elevated transaminases"],
    source: "DailyMed (Illustrative)"
  },
  {
    id: "d2",
    name: "Glucophage",
    nameAr: "جلوكوفاج",
    ingredients: ["Metformin"],
    form: "Tablet",
    route: "Oral",
    therapeuticClass: "Biguanide / Antidiabetic",
    indications: "Type 2 diabetes mellitus, especially in overweight patients",
    contraindications: "Severe renal impairment, acute metabolic acidosis, diabetic ketoacidosis",
    adverseEffects: ["Lactic acidosis", "Gastrointestinal upset", "Vitamin B12 deficiency"],
    source: "DailyMed (Illustrative)"
  },
  {
    id: "d3",
    name: "Coumadin",
    nameAr: "كومادين",
    ingredients: ["Warfarin"],
    form: "Tablet",
    route: "Oral",
    therapeuticClass: "Anticoagulant",
    indications: "Prophylaxis and treatment of thromboembolic disorders",
    contraindications: "Active bleeding, recent surgery, severe hypertension, pregnancy",
    adverseEffects: ["Bleeding", "Bruising", "Skin necrosis"],
    source: "DailyMed (Illustrative)"
  },
  {
    id: "d4",
    name: "Augmentin",
    nameAr: "أوجمنتين",
    ingredients: ["Amoxicillin", "Clavulanic acid"],
    form: "Tablet",
    route: "Oral",
    therapeuticClass: "Antibiotic / Beta-lactam",
    indications: "Bacterial infections including sinusitis, pneumonia, skin infections",
    contraindications: "Penicillin allergy, history of cholestatic jaundice associated with amoxicillin",
    adverseEffects: ["Diarrhea", "Nausea", "Rash", "Hepatic dysfunction"],
    source: "DailyMed (Illustrative)"
  },
  {
    id: "d5",
    name: "Lasix",
    nameAr: "لازيكس",
    ingredients: ["Furosemide"],
    form: "Tablet",
    route: "Oral",
    therapeuticClass: "Loop diuretic",
    indications: "Edema associated with heart failure, renal disease, hepatic disease",
    contraindications: "Anuria, severe electrolyte depletion, hypovolemia",
    adverseEffects: ["Hypokalemia", "Dehydration", "Hypotension", "Ototoxicity"],
    source: "DailyMed (Illustrative)"
  },
  {
    id: "d6",
    name: "Zocor",
    nameAr: "زوكور",
    ingredients: ["Simvastatin"],
    form: "Tablet",
    route: "Oral",
    therapeuticClass: "Statin / Lipid-lowering",
    indications: "Hypercholesterolemia, reducing cardiovascular risk",
    contraindications: "Active liver disease, concomitant use of strong CYP3A4 inhibitors, pregnancy",
    adverseEffects: ["Myalgia", "Headache", "Constipation"],
    source: "DailyMed (Illustrative)"
  }
];

export const interactions: Interaction[] = [
  {
    ingredientA: "Warfarin",
    ingredientB: "Atorvastatin",
    severity: "Moderate",
    mechanism: "Atorvastatin may potentiate the effect of warfarin via CYP450 interactions.",
    clinicalEffect: "Increased INR and risk of bleeding.",
    management: "Monitor INR closely and adjust warfarin dose as needed."
  },
  {
    ingredientA: "Warfarin",
    ingredientB: "Amoxicillin",
    severity: "Moderate",
    mechanism: "Reduction in gut flora that produces vitamin K.",
    clinicalEffect: "Increased anticoagulant effect and bleeding risk.",
    management: "Monitor INR, especially during prolonged antibiotic therapy."
  },
  {
    ingredientA: "Simvastatin",
    ingredientB: "Warfarin",
    severity: "Moderate",
    mechanism: "CYP3A4 interaction altering warfarin metabolism.",
    clinicalEffect: "Potential increase in INR and bleeding risk.",
    management: "Monitor INR and adjust dose if necessary."
  },
  {
    ingredientA: "Furosemide",
    ingredientB: "Warfarin",
    severity: "Low",
    mechanism: "Diuretic-induced hemoconcentration may alter warfarin levels.",
    clinicalEffect: "Possible changes in anticoagulant effect.",
    management: "Monitor fluid status and INR."
  }
];