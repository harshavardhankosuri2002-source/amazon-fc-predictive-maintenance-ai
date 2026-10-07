import React from 'react';
import { useFleet } from '../context/FleetContext';
import {
  LayoutDashboard,
  MapPin,
  Cpu,
  AlertTriangle,
  TrendingDown,
  Wrench,
  Droplet,
  Package,
  Users,
  Sliders,
  Scale,
  Bot,
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export function Sidebar() {
  const { activeTab, setActiveTab, kpis, workOrders, machines } = useFleet();

  const criticalCount = kpis.criticalMachines;
  const warningCount = kpis.warningMachines;
  const openWorkOrders = workOrders.filter(wo => wo.status !== 'Resolved' && wo.status !== 'Verified').length;
  const overdueLubrication = machines.filter(m => m.delayedLubricationCount > 0).length;

  const navItems = [
    { id: 'command_center', label: 'Command Center', icon: LayoutDashboard, badge: null },
    { id: 'heatmap', label: 'Facility Heatmap', icon: MapPin, badge: 'Interactive' },
    { id: 'machines', label: 'Machine Health Fleet', icon: Cpu, badge: `${machines.length}` },
    { id: 'alerts', label: 'Predictive Alerts', icon: AlertTriangle, badge: `${criticalCount + warningCount}`, badgeColor: 'bg-rose-100 text-rose-700' },
    { id: 'failures', label: 'Failure Analytics & Wear', icon: TrendingDown, badge: null },
    { id: 'maintenance', label: 'Work Orders & Scheduling', icon: Wrench, badge: `${openWorkOrders}`, badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'lubrication', label: 'Lubrication Intelligence', icon: Droplet, badge: `${overdueLubrication} Due`, badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'spare_parts', label: 'Spare Parts Forecast', icon: Package, badge: '30-Day' },
    { id: 'technicians', label: 'Technician Workload', icon: Users, badge: null },
    { id: 'what_if', label: 'What-If Simulation', icon: Sliders, badge: 'AI Model' },
    { id: 'compare', label: 'Compare Machines', icon: Scale, badge: null },
    { id: 'copilot', label: 'AI Maintenance Copilot', icon: Bot, badge: 'Agent', badgeColor: 'bg-indigo-100 text-indigo-700' },
    { id: 'reports', label: 'Executive Reports', icon: FileText, badge: 'PDF' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-53px)] select-none">
      
      {/* Navigation Links */}
      <div className="py-3 px-2 space-y-0.5">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Operations & Intelligence
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-sky-50 text-sky-900 font-semibold border-l-4 border-sky-600 rounded-l-none pl-2.5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-mono ${
                  item.badgeColor || 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Operational Assurance Card in Bottom Sidebar */}
      <div className="p-3 m-2 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-center gap-2 text-slate-700 font-semibold text-[11px] mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Fulfillment Reliability Index</span>
        </div>
        <p className="text-[10.5px] text-slate-500 leading-tight">
          Machine Availability: <strong className="text-slate-800 font-mono">96.8%</strong> | OEE: <strong className="text-slate-800 font-mono">89.4%</strong>
        </p>
        <div className="mt-2 text-[10px] text-slate-400 italic">
          Amazon FC BLR-04 • Production Aware
        </div>
      </div>

    </aside>
  );
}
