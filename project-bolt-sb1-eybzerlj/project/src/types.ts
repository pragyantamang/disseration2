export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  status?: 'active' | 'inactive' | 'suspended';
  createdAt?: Date;
  lastLogin?: Date;
};

export type Disease = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  education: string[];
  hospital: string;
  hospitalType: 'government' | 'private';
  experience: number;
  imageUrl: string;
  diseases: string[];
  status?: 'active' | 'inactive' | 'pending';
  rating?: number;
  consultationFee?: number;
  availableSlots?: string[];
};

export type ChatState = {
  messages: Message[];
  user: User | null;
  isTyping: boolean;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'patient' | 'doctor';
};

export type Appointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  notes?: string;
  createdAt: Date;
};

export type Hospital = {
  id: string;
  name: string;
  type: 'government' | 'private';
  address: string;
  phone: string;
  email: string;
  specialties: string[];
  status: 'active' | 'inactive';
  rating: number;
  totalBeds: number;
  availableBeds: number;
};

export type AdminStats = {
  totalUsers: number;
  totalDoctors: number;
  totalAppointments: number;
  totalHospitals: number;
  activeUsers: number;
  pendingAppointments: number;
  completedAppointments: number;
  canceledAppointments: number;
};