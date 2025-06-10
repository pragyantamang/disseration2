import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2, X } from 'lucide-react';
import { Message, Appointment } from '../types';
import { ChatMessage } from './ChatMessage';
import { doctors } from './DoctorsList';

const INITIAL_MESSAGE: Message = {
  id: '1',
  content: 'Hello! 👋 I\'m your Healthcare Assistant. How can I help you today?\n\nI can assist with:\n1. Diet recommendations\n2. Doctor appointments\n3. Hospital information\n4. Health tips\n\nJust type your question or select an option.',
  sender: 'bot',
  timestamp: new Date(),
};

const DIET_PLANS = {
  kidney: {
    title: "Kidney Disease Diet Plan",
    description: "Managing kidney disease requires careful attention to your diet. Here's what you should know:",
    doEat: [
      "Fresh fruits (apples, berries, grapes) in moderation",
      "Low-potassium vegetables (green beans, carrots, cabbage)",
      "Egg whites for protein",
      "White rice and bread",
      "Unsalted herbs and spices",
      "Olive oil for cooking"
    ],
    dontEat: [
      "High-sodium foods (processed foods, canned soups)",
      "High-potassium foods (bananas, oranges, potatoes, tomatoes)",
      "High-phosphorus foods (dairy, nuts, beans, chocolate)",
      "Processed meats",
      "Dark sodas and colas",
      "Alcohol"
    ],
    tips: [
      "Work with a renal dietitian for personalized advice",
      "Read food labels carefully for sodium, potassium and phosphorus",
      "Cook from scratch to control ingredients",
      "Use fresh herbs instead of salt for flavoring",
      "Stay hydrated but follow your doctor's fluid intake recommendations"
    ]
  },
  
  cancer: {
    title: "Cancer Support Diet Plan",
    description: "Nutrition is crucial during cancer treatment. Here's what can help:",
    doEat: [
      "Colorful fruits and vegetables (berries, leafy greens)",
      "Lean proteins (fish, chicken, tofu)",
      "Whole grains (brown rice, quinoa, oats)",
      "Healthy fats (avocados, olive oil, nuts)",
      "Probiotic foods (yogurt, kefir, sauerkraut)",
      "Antioxidant-rich foods (berries, dark chocolate)"
    ],
    dontEat: [
      "Processed meats (bacon, sausage, hot dogs)",
      "Excessive red meat",
      "Highly processed foods",
      "Sugary drinks and excessive sweets",
      "Excessive alcohol",
      "Charred or burnt foods"
    ],
    tips: [
      "Eat small, frequent meals if experiencing nausea",
      "Stay well-hydrated throughout the day",
      "Keep easy-to-eat snacks on hand",
      "Consider smoothies if solid foods are difficult",
      "Consult with an oncology nutritionist for personalized advice"
    ]
  },
  
  heart: {
    title: "Heart Disease Diet Plan",
    description: "A heart-healthy diet can help manage and prevent heart disease:",
    doEat: [
      "Fatty fish (salmon, mackerel, sardines)",
      "Whole grains (oats, brown rice, whole wheat)",
      "Colorful fruits and vegetables",
      "Legumes (beans, lentils, chickpeas)",
      "Nuts and seeds (walnuts, flaxseeds, chia seeds)",
      "Olive oil and avocados"
    ],
    dontEat: [
      "Foods high in saturated fats (fatty meats, full-fat dairy)",
      "Trans fats (fried foods, baked goods)",
      "High-sodium foods (processed foods, canned soups)",
      "Added sugars (sodas, desserts, candy)",
      "Excessive alcohol",
      "Refined carbohydrates (white bread, pastries)"
    ],
    tips: [
      "Follow a Mediterranean or DASH diet approach",
      "Aim for less than 2,300mg of sodium daily",
      "Read food labels for hidden sodium and trans fats",
      "Cook at home to control ingredients",
      "Practice portion control even with healthy foods"
    ]
  },
  
  diabetes: {
    title: "Diabetes Management Diet Plan",
    description: "Managing blood sugar through diet is essential for diabetes control:",
    doEat: [
      "Non-starchy vegetables (leafy greens, broccoli, peppers)",
      "Whole grains (brown rice, quinoa, whole wheat bread)",
      "Lean proteins (chicken, fish, tofu, eggs)",
      "Healthy fats (avocados, nuts, olive oil)",
      "Low-glycemic fruits (berries, apples, pears)",
      "Legumes (beans, lentils, chickpeas)"
    ],
    dontEat: [
      "Sugary drinks (soda, fruit juice, sweetened tea)",
      "Refined carbohydrates (white bread, white rice, pastries)",
      "Processed snack foods (chips, crackers)",
      "Sweetened breakfast cereals",
      "Candy, desserts, and other sweets",
      "Fried foods and foods high in saturated fat"
    ],
    tips: [
      "Maintain consistent meal timing and portion sizes",
      "Monitor carbohydrate intake and choose complex carbs",
      "Pair carbohydrates with protein to slow glucose absorption",
      "Stay well-hydrated with water",
      "Work with a diabetes educator for personalized meal planning",
      "Check blood sugar regularly to understand how foods affect you"
    ]
  },
  
  respiratory: {
    title: "Respiratory Disease Diet Plan",
    description: "Proper nutrition can help manage respiratory conditions:",
    doEat: [
      "Fatty fish rich in omega-3s (salmon, mackerel)",
      "Colorful fruits and vegetables (berries, leafy greens)",
      "Nuts and seeds (walnuts, flaxseeds)",
      "Whole grains (oats, brown rice)",
      "Garlic and onions (natural anti-inflammatories)",
      "Green tea and other antioxidant-rich beverages"
    ],
    dontEat: [
      "Excessive dairy (can increase mucus production)",
      "Processed foods high in preservatives",
      "Sulfite-containing foods (wine, dried fruits, preserved foods)",
      "Cold drinks (can trigger bronchospasm)",
      "Salt-rich foods (can lead to fluid retention)",
      "Foods that cause individual sensitivities or allergies"
    ],
    tips: [
      "Stay well-hydrated to keep airways moist",
      "Maintain a healthy weight to reduce breathing difficulty",
      "Eat smaller, more frequent meals if breathing during eating is difficult",
      "Consider eating foods at room temperature rather than very hot or cold",
      "Sit upright while eating to reduce pressure on the lungs",
      "Consult with a pulmonary dietitian for personalized advice"
    ]
  },
  
  neurological: {
    title: "Neurological Disorder Diet Plan",
    description: "Nutrition can play a role in managing neurological conditions:",
    doEat: [
      "Fatty fish rich in omega-3s (salmon, sardines)",
      "Berries and other antioxidant-rich fruits",
      "Leafy green vegetables (spinach, kale)",
      "Nuts and seeds (walnuts, flaxseeds)",
      "Turmeric and other anti-inflammatory spices",
      "Whole grains and legumes"
    ],
    dontEat: [
      "Highly processed foods",
      "Foods high in added sugars",
      "Excessive alcohol",
      "Foods with artificial additives and preservatives",
      "Excessive caffeine",
      "Foods that trigger individual symptoms"
    ],
    tips: [
      "Stay well-hydrated throughout the day",
      "Consider a Mediterranean diet approach",
      "Maintain regular meal times",
      "Choose foods that are easy to chew and swallow if needed",
      "Consider supplements like vitamin D and B vitamins (consult doctor first)",
      "Work with a neurological dietitian for condition-specific advice"
    ]
  }
};

// Available appointment slots (simulated)
const AVAILABLE_SLOTS = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "4:00 PM", available: true }
];

// Quick reply options
const QUICK_REPLIES = {
  main: [
    "Diet recommendations",
    "Find a doctor",
    "Book appointment",
    "Hospital information"
  ],
  diet: [
    "Kidney disease diet",
    "Cancer diet",
    "Heart disease diet",
    "Diabetes diet",
    "Respiratory disease diet",
    "Neurological disorder diet"
  ],
  appointment: [
    "Book appointment",
    "Check available slots",
    "Cancel appointment"
  ],
  hospital: [
    "Government hospitals",
    "Private hospitals",
    "Hospital locations"
  ]
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>(QUICK_REPLIES.main);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentBooking, setCurrentBooking] = useState<{
    doctorId?: string;
    date?: string;
    time?: string;
    step: 'doctor' | 'date' | 'time' | 'confirm' | 'complete' | null;
  }>({ step: null });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Process booking flow if active
    if (currentBooking.step) {
      handleBookingFlow(input);
      return;
    }

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input.toLowerCase()),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Set appropriate quick replies based on the user's query
      if (input.toLowerCase().includes('diet') || input.toLowerCase().includes('food') || input.toLowerCase().includes('eat')) {
        setQuickReplies(QUICK_REPLIES.diet);
      } else if (input.toLowerCase().includes('appointment') || input.toLowerCase().includes('book') || input.toLowerCase().includes('doctor')) {
        setQuickReplies(QUICK_REPLIES.appointment);
      } else if (input.toLowerCase().includes('hospital') || input.toLowerCase().includes('clinic')) {
        setQuickReplies(QUICK_REPLIES.hospital);
      } else {
        setQuickReplies(QUICK_REPLIES.main);
      }
    }, 1000);
  };

  const handleBookingFlow = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    switch(currentBooking.step) {
      case 'doctor':
        // User is selecting a doctor
        const selectedDoctor = doctors.find(doc => 
          doc.name.toLowerCase().includes(lowerInput) || 
          doc.id === lowerInput
        );
        
        if (selectedDoctor) {
          setCurrentBooking(prev => ({ ...prev, doctorId: selectedDoctor.id, step: 'date' }));
          
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: `Great! You've selected ${selectedDoctor.name}. Please select a date for your appointment (e.g., "tomorrow", "next Monday", or a specific date like "May 15").`,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
          }, 1000);
        } else {
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: "I couldn't find that doctor. Please try again with a doctor's name or ID from our list.",
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
          }, 1000);
        }
        break;
        
      case 'date':
        // User is selecting a date
        let selectedDate = "";
        
        if (lowerInput.includes('tomorrow')) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          selectedDate = tomorrow.toLocaleDateString();
        } else if (lowerInput.includes('monday')) {
          selectedDate = getNextDayOfWeek(1).toLocaleDateString();
        } else if (lowerInput.includes('tuesday')) {
          selectedDate = getNextDayOfWeek(2).toLocaleDateString();
        } else if (lowerInput.includes('wednesday')) {
          selectedDate = getNextDayOfWeek(3).toLocaleDateString();
        } else if (lowerInput.includes('thursday')) {
          selectedDate = getNextDayOfWeek(4).toLocaleDateString();
        } else if (lowerInput.includes('friday')) {
          selectedDate = getNextDayOfWeek(5).toLocaleDateString();
        } else {
          // Try to parse the date
          try {
            const parsedDate = new Date(input);
            if (!isNaN(parsedDate.getTime())) {
              selectedDate = parsedDate.toLocaleDateString();
            }
          } catch (e) {
            // Invalid date format
          }
        }
        
        if (selectedDate) {
          setCurrentBooking(prev => ({ ...prev, date: selectedDate, step: 'time' }));
          
          // Show available time slots
          const availableSlotsMessage = AVAILABLE_SLOTS
            .filter(slot => slot.available)
            .map(slot => slot.time)
            .join(", ");
          
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: `You've selected ${selectedDate}. Please choose from these available time slots: ${availableSlotsMessage}`,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
          }, 1000);
        } else {
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: "I couldn't understand that date. Please try again with a format like 'tomorrow', 'next Monday', or 'May 15'.",
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
          }, 1000);
        }
        break;
        
      case 'time':
        // User is selecting a time
        const selectedSlot = AVAILABLE_SLOTS.find(slot => 
          slot.time.toLowerCase().includes(lowerInput) || 
          lowerInput.includes(slot.time.toLowerCase())
        );
        
        if (selectedSlot && selectedSlot.available) {
          setCurrentBooking(prev => ({ ...prev, time: selectedSlot.time, step: 'confirm' }));
          
          const selectedDoctor = doctors.find(doc => doc.id === currentBooking.doctorId);
          
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: `Please confirm your appointment:\n\nDoctor: ${selectedDoctor?.name}\nDate: ${currentBooking.date}\nTime: ${selectedSlot.time}\n\nType "confirm" to book this appointment or "cancel" to start over.`,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
          }, 1000);
        } else {
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: "That time slot is not available or invalid. Please select from the available time slots.",
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
          }, 1000);
        }
        break;
        
      case 'confirm':
        // User is confirming the appointment
        if (lowerInput.includes('confirm') || lowerInput.includes('yes') || lowerInput.includes('book')) {
          const selectedDoctor = doctors.find(doc => doc.id === currentBooking.doctorId);
          
          // Create the appointment
          const newAppointment: Appointment = {
            id: Date.now().toString(),
            doctorId: currentBooking.doctorId!,
            doctorName: selectedDoctor?.name || '',
            date: currentBooking.date!,
            time: currentBooking.time!,
            status: 'confirmed'
          };
          
          setAppointments(prev => [...prev, newAppointment]);
          setCurrentBooking({ step: 'complete' });
          
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: `Great! Your appointment with ${selectedDoctor?.name} on ${currentBooking.date} at ${currentBooking.time} has been confirmed. You'll receive a confirmation email shortly. Is there anything else I can help you with?`,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
            setQuickReplies(QUICK_REPLIES.main);
            setCurrentBooking({ step: null });
          }, 1000);
        } else if (lowerInput.includes('cancel') || lowerInput.includes('no')) {
          setCurrentBooking({ step: null });
          
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: "I've canceled this booking process. Is there anything else I can help you with?",
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
            setQuickReplies(QUICK_REPLIES.main);
          }, 1000);
        } else {
          setTimeout(() => {
            const botMessage: Message = {
              id: Date.now().toString(),
              content: 'Please type "confirm" to book this appointment or "cancel" to start over.',
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
          }, 1000);
        }
        break;
        
      default:
        // Reset the booking flow
        setCurrentBooking({ step: null });
        handleSend();
    }
  };

  // Helper function to get the next occurrence of a day of the week
  const getNextDayOfWeek = (dayOfWeek: number) => {
    const today = new Date();
    const result = new Date(today);
    result.setDate(today.getDate() + (dayOfWeek + 7 - today.getDay()) % 7);
    return result;
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    
    // If it's a booking-related quick reply, start the booking flow
    if (reply === "Book appointment") {
      startBookingFlow();
    } else {
      handleSend();
    }
  };

  const startBookingFlow = () => {
    setCurrentBooking({ step: 'doctor' });
    
    // Generate a list of doctors to choose from
    const doctorOptions = doctors.slice(0, 5).map(doc => 
      `${doc.id}: ${doc.name} (${doc.specialization})`
    ).join('\n');
    
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: `Let's book your appointment. First, please select a doctor by typing their name or ID number:\n\n${doctorOptions}\n\n(Type more to see more doctors)`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const formatDietPlan = (dietType: string) => {
    const diet = DIET_PLANS[dietType as keyof typeof DIET_PLANS];
    
    if (!diet) return "I don't have information about that specific diet.";
    
    return `**${diet.title}**\n\n${diet.description}\n\n**Foods to Eat:**\n${diet.doEat.map(item => `- ${item}`).join('\n')}\n\n**Foods to Avoid:**\n${diet.dontEat.map(item => `- ${item}`).join('\n')}\n\n**Helpful Tips:**\n${diet.tips.map(item => `- ${item}`).join('\n')}`;
  };

  const getBotResponse = (input: string): string => {
    // Login/Register responses
    if (input.includes('login') || input.includes('register') || input.includes('sign')) {
      return 'To login or register, please click the "Login" button in the top right corner. You can create a new account or sign in with your existing credentials.';
    } 
    
    // Appointment responses
    else if (input.includes('appointment') || input.includes('book')) {
      startBookingFlow();
      return "I'll help you book an appointment. Let me guide you through the process.";
    } 
    
    // Question responses
    else if (input.includes('question') || input.includes('ask')) {
      return 'You can ask questions to our doctors after logging in. Your questions will be answered by qualified medical professionals within 24 hours.';
    }
    
    // Diet plan responses
    else if (input.includes('diet') || input.includes('food') || input.includes('eat') || input.includes('nutrition')) {
      if (input.includes('kidney')) {
        return formatDietPlan('kidney');
      } else if (input.includes('cancer')) {
        return formatDietPlan('cancer');
      } else if (input.includes('heart')) {
        return formatDietPlan('heart');
      } else if (input.includes('diabetes')) {
        return formatDietPlan('diabetes');
      } else if (input.includes('respiratory') || input.includes('lung') || input.includes('breathing')) {
        return formatDietPlan('respiratory');
      } else if (input.includes('neuro') || input.includes('brain')) {
        return formatDietPlan('neurological');
      } else {
        return 'I can provide detailed diet plans for specific conditions. Which condition are you interested in?\n\n- Kidney disease\n- Cancer\n- Heart disease\n- Diabetes\n- Respiratory disease\n- Neurological disorders';
      }
    }
    
    // Doctor recommendation responses
    else if (input.includes('doctor') || input.includes('specialist')) {
      let diseaseType = '';
      
      if (input.includes('kidney')) {
        diseaseType = 'kidney disease';
        const kidneyDoctors = doctors.filter(doc => doc.diseases.includes('1')).slice(0, 3);
        return `For kidney disease, I recommend consulting with a Nephrologist. Here are some top specialists:\n\n${kidneyDoctors.map(doc => `- **${doc.name}** (${doc.specialization}): ${doc.experience} years experience at ${doc.hospital}`).join('\n\n')}`;
      } 
      else if (input.includes('cancer')) {
        diseaseType = 'cancer';
        const cancerDoctors = doctors.filter(doc => doc.diseases.includes('2')).slice(0, 3);
        return `For cancer treatment, I recommend consulting with an Oncologist. Here are some top specialists:\n\n${cancerDoctors.map(doc => `- **${doc.name}** (${doc.specialization}): ${doc.experience} years experience at ${doc.hospital}`).join('\n\n')}`;
      }
      else if (input.includes('heart')) {
        diseaseType = 'heart disease';
        const heartDoctors = doctors.filter(doc => doc.diseases.includes('3')).slice(0, 3);
        return `For heart disease, I recommend consulting with a Cardiologist. Here are some top specialists:\n\n${heartDoctors.map(doc => `- **${doc.name}** (${doc.specialization}): ${doc.experience} years experience at ${doc.hospital}`).join('\n\n')}`;
      }
      else if (input.includes('diabetes')) {
        diseaseType = 'diabetes';
        const diabetesDoctors = doctors.filter(doc => doc.diseases.includes('4')).slice(0, 3);
        return `For diabetes management, I recommend consulting with an Endocrinologist. Here are some top specialists:\n\n${diabetesDoctors.map(doc => `- **${doc.name}** (${doc.specialization}): ${doc.experience} years experience at ${doc.hospital}`).join('\n\n')}`;
      }
      else if (input.includes('respiratory') || input.includes('lung') || input.includes('breathing')) {
        diseaseType = 'respiratory disease';
        const respiratoryDoctors = doctors.filter(doc => doc.diseases.includes('5')).slice(0, 3);
        return `For respiratory conditions, I recommend consulting with a Pulmonologist. Here are some top specialists:\n\n${respiratoryDoctors.map(doc => `- **${doc.name}** (${doc.specialization}): ${doc.experience} years experience at ${doc.hospital}`).join('\n\n')}`;
      }
      else if (input.includes('neuro') || input.includes('brain')) {
        diseaseType = 'neurological disorder';
        const neuroDoctors = doctors.filter(doc => doc.diseases.includes('6')).slice(0, 3);
        return `For neurological disorders, I recommend consulting with a Neurologist. Here are some top specialists:\n\n${neuroDoctors.map(doc => `- **${doc.name}** (${doc.specialization}): ${doc.experience} years experience at ${doc.hospital}`).join('\n\n')}`;
      }
      else {
        return 'I can recommend doctors for specific conditions. Please specify which condition you need a doctor for (kidney disease, cancer, heart disease, diabetes, respiratory disease, or neurological disorders).';
      }
    }
    
    // Hospital information responses
    else if (input.includes('hospital') || input.includes('clinic') || input.includes('center')) {
      if (input.includes('government') || input.includes('public')) {
        return `**Government Hospitals Information**:

1. City General Hospital
   - Specialties: Nephrology, Cardiology, Oncology
   - Services: 24/7 Emergency, Dialysis, Surgery
   - Address: 123 Main Street, Downtown

2. State Medical Center
   - Specialties: Nephrology, Neurology, Pulmonology
   - Services: Specialized treatments, Research programs
   - Address: 456 Health Avenue, Midtown

3. National Cancer Center
   - Specialties: Oncology, Radiation therapy
   - Services: Cancer screening, Chemotherapy, Clinical trials
   - Address: 789 Research Boulevard, Uptown

4. Heart Institute
   - Specialties: Cardiology, Cardiac Surgery
   - Services: Cardiac rehabilitation, Interventional procedures
   - Address: 321 Cardiac Lane, North District

Government hospitals typically offer subsidized care and accept most insurance plans. Many have sliding scale payment options for those without insurance.`;
      } 
      else if (input.includes('private')) {
        return `**Private Hospitals Information**:

1. Advanced Kidney Care Center
   - Specialties: Nephrology, Transplant services
   - Services: Premium dialysis, Personalized care plans
   - Address: 555 Wellness Drive, East Side

2. Premium Cancer Institute
   - Specialties: Oncology, Precision medicine
   - Services: Advanced diagnostics, Targeted therapies
   - Address: 777 Innovation Park, West End

3. Cardiac Care Center
   - Specialties: Interventional Cardiology, Electrophysiology
   - Services: Minimally invasive procedures, Advanced imaging
   - Address: 999 Excellence Way, South District

4. Metabolic Institute
   - Specialties: Endocrinology, Diabetes management
   - Services: Continuous glucose monitoring, Nutrition counseling
   - Address: 444 Precision Boulevard, Lakeside

Private hospitals typically offer shorter wait times, private rooms, and more personalized care. They accept most private insurance plans and often have payment plans available.`;
      }
      else {
        return `I can provide information about both government and private hospitals in our network. 

Government hospitals typically offer more affordable care and have a wide range of specialties, while private hospitals often provide more personalized care with shorter wait times.

Would you like information about government hospitals or private hospitals?`;
      }
    }
    
    // Default response
    return 'I can help you with diet plans, doctor appointments, hospital information, and health tips. What would you like to know more about?';
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center justify-center" onClick={() => setIsMinimized(false)}>
        <Maximize2 className="w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col z-50">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-semibold">Healthcare Assistant</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-blue-500 rounded"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setMessages([INITIAL_MESSAGE]);
              setCurrentBooking({ step: null });
              setQuickReplies(QUICK_REPLIES.main);
            }}
            className="p-1 hover:bg-blue-500 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      <div className="px-4 py-2 flex flex-wrap gap-2">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => handleQuickReply(reply)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            {reply}
          </button>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}