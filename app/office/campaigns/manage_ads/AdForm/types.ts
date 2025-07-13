export interface AdFormData {
  name: string;
  description: string;
  shortDescription: string;
  isHappyHour: boolean;
  isHot: boolean;
  isPremium: boolean;
  priority: boolean;
  status: string;
  tags: string;
  campaignId: string;
  age: string;
  country: string;
  titsSize: string;
  mobile: string;
  whatsapp: string;
  telegram: string;
  areaIds: (string | number)[];
  cityId: string | number;
  files: File[];
  defaultFileName: string;
  service_type: 'INCALL' | 'OUTCALL' | 'MIXED';
}

export interface AdFormProps {
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<AdFormData>;
  ad_id?: string;
}

export const statusOptions = [
  { value: "active", label: "פעיל" },
  { value: "draft", label: "טיוטה" },
  { value: "archived", label: "ארכיון" },
];

export const serviceTypeOptions = [
  { value: "INCALL", label: "אצלי - In Call" },
  { value: "OUTCALL", label: "אצלך - Out Call" },
  { value: "MIXED", label: "אצלי ואצלך - Mixed" },
];
