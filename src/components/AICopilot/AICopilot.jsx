import React, { useState } from 'react';
import { useFleet } from '../../context/FleetContext';
import {
  Bot,
  Send,
  Sparkles,
  HelpCircle,
  Wrench,
  AlertTriangle,
  ArrowRight,
  User,
  Clock,
  CheckCircle,
  ShieldAlert
} from 'lucide-react';

export function AICopilot() {
  const {
    machines,
    workOrders,
    technicians,
    setSelectedMachineId,
    setActionSheetMachineId,
    approveRecommendation
  } = useFleet();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      time: '14:32',
      text: "Hello! I am your AI Machine Health & Predictive Maintenance Copilot for Amazon BLR-04 Hyper-Hub. I continuously monitor sensor streams, maintenance streaks, component fatigue, and the 24-hour fulfillment volume schedule. How can I assist your operations team today?",
      actions: null
    }
  ]);

  const quickPrompts = [
    "Which machines are most likely to fail this week?",
    "Why is CV-1042 unhealthy?",
    "Which machines need lubrication?",
    "Which component is failing most often?",
    "Show machines purchased before 2021 with high cost",
    "What should the maintenance team repair today?",
    "Generate a maintenance plan for tomorrow",
    "Compare CV-1042 with similar machines"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let aiResponseText = '';
      let targetMachineId = null;

      const q = query.toLowerCase();

      if (q.includes('fail') && (q.includes('week') || q.includes('most') || q.includes('highest'))) {
        const topFailing = machines.filter(m => m.failureRisk > 50).slice(0, 3);
        aiResponseText = `Based on current real-time telemetry and vibration harmonic analysis, the 3 assets most likely to fail within the next 7 days are:\n\n1. **SORT-082** (Cross-Belt Sorter Deck 02): **73% failure probability** (RUL: 14 days, chronic gear wear)\n2. **CV-1042** (Induction Conveyor Line 04): **68% failure probability** (RUL: 38 days, bearing spalling)\n3. **ROB-221** (Palletizing Robot Arm 02): **67% failure probability** (RUL: 8 days, Joint 3 backlash)\n\nRecommended Action: Prioritize CV-1042 and SORT-082 during the 02:00 AM – 04:00 AM low-volume maintenance window.`;
        targetMachineId = 'CV-1042';
      } else if (q.includes('cv-1042') || q.includes('1042')) {
        aiResponseText = `**CV-1042 Diagnostic Summary:**\n• **Current Health Score:** 67 / 100 (decreased 14 points over last 30 days)\n• **Vibration RMS:** 5.8 mm/s vs baseline 2.1–3.4 mm/s (+71% deviation)\n• **Operating Temperature:** 68.4°C (+11.2°C above normal)\n• **Root Cause:** Progressive bearing raceway micro-spalling triggered by a 5-day lubrication delay.\n• **Recommended Window:** 02:00 AM – 04:00 AM (lowest parcel volume: 6,200 pkg/hr).\n• **Financial ROI:** Planned repair costs ₹16,500; prevents ₹85,000 in unscheduled line stoppage losses.`;
        targetMachineId = 'CV-1042';
      } else if (q.includes('lubricat') || q.includes('oil')) {
        const overdue = machines.filter(m => m.delayedLubricationCount > 0);
        aiResponseText = `Currently, **${overdue.length} machines** have exceeded their recommended lubrication intervals. Top critical assets requiring oiling:\n• **SORT-082** (Delayed 7 cycles)\n• **CV-1042** (Delayed 4 cycles)\n• **ROB-221** (Delayed 2 cycles)\n\nRecommendation: Dispatch Technician 12 (Priya Patel, Lubrication Specialist) during the overnight shift.`;
      } else if (q.includes('component') || q.includes('part') || q.includes('failing most')) {
        aiResponseText = `Historical analysis across 500+ failure logs confirms that **Spherical Roller Bearings** are the #1 failing component across Amazon BLR-04 (142 historical events, avg lifespan: 14 months, avg unit cost: ₹4,850). Modular conveyor belts (98 events) and 5.5kW induction motors (64 events) follow closely behind.`;
      } else if (q.includes('plan') || q.includes('tomorrow') || q.includes('repair today')) {
        aiResponseText = `**Automated 24-Hour Maintenance Plan for Shift C (08 October 2026):**\n\n• **02:00 AM – 03:00 AM (Priority 1):** CV-1042 (Zone B / Line 04) - Inspect bearing, flush lubricate with Mobil SHC 630. Assigned to Tech 08 (Rajesh Sharma).\n• **03:00 AM – 04:30 AM (Priority 2):** SORT-082 (Zone D / Deck 02) - Carrier gearbox overhaul. Assigned to Tech 21 & Tech 08.\n• **04:30 AM – 05:00 AM:** Verification test runs before Morning Shift A induction ramp-up.\n\nEstimated downtime: 2.5 hours total (executed in buffer period). Total cost avoided: **₹225,000**.`;
        targetMachineId = 'CV-1042';
      } else {
        aiResponseText = `Query analyzed across 320 monitored assets in BLR-04. Fleet overall availability is currently **96.8%**. There are 83 assets in Critical state and 238 in Warning state. All high-urgency preventive work orders are mapped to the 02:00 AM – 04:00 AM low-volume window to guarantee uninterrupted Prime deliveries.`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: aiResponseText,
        machineId: targetMachineId
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="p-6 space-y-5 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-600" />
              <span>AI Maintenance Copilot & Natural Language Agent</span>
            </h1>
            <span className="badge badge-blue text-xs font-mono">
              Autonomous Analyst Mode
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Trained on machine sensor history, failure modes, component lifecycles, and Amazon fulfillment operational schedules.
          </p>
        </div>
      </div>

      {/* Quick Prompts Bar (Prompt Section 26) */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Quick Operational Queries (Click to Ask):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-xs bg-white hover:bg-slate-50 text-slate-700 py-1 px-2.5 rounded-lg border border-slate-200 shadow-2xs transition-all hover:border-sky-400"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="enterprise-card p-4 min-h-[440px] max-h-[560px] overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl p-4 rounded-xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1 text-[10px] text-slate-400 font-mono">
                <span>{msg.sender === 'user' ? 'Operations Manager' : 'PredictiveOps AI Agent'}</span>
                <span>{msg.time}</span>
              </div>

              <div className="whitespace-pre-line">
                {msg.text}
              </div>

              {msg.machineId && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedMachineId(msg.machineId)}
                    className="btn-secondary text-[11px] py-1 px-2.5 flex items-center gap-1"
                  >
                    <span>Inspect {msg.machineId} Twin</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => setActionSheetMachineId(msg.machineId)}
                    className="btn-primary text-[11px] py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
                  >
                    <span>View Prescriptive Action</span>
                  </button>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask anything about machine health, predictions, failure causes, technicians, or maintenance windows..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
        />
        <button
          onClick={() => handleSend()}
          className="btn-primary text-xs px-4 py-2.5 flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
