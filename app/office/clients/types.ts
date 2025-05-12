// app/office/clients/types.ts

// Client type definition
export interface Client {
  id: string;
  name: string;
  title: string;
  email: string;
  mobile?: string;
  createdAt: string;
  _count?: {
    campaigns: number;
  };
  campaigns?: Campaign[];
}

// Campaign type definition
export interface Campaign {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  clientId: string;
  status?: string;
}
