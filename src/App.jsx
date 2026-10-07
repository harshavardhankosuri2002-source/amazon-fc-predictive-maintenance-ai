import React from 'react';
import { FleetProvider, useFleet } from './context/FleetContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GuidedDemoBanner } from './components/GuidedDemo/GuidedDemoBanner';
import { CommandCenter } from './components/CommandCenter/CommandCenter';
import { FacilityHeatmap } from './components/FacilityHeatmap/FacilityHeatmap';
import { MachineHealth } from './components/MachineHealth/MachineHealth';
import { PredictiveAlerts } from './components/PredictiveAlerts/PredictiveAlerts';
import { FailureAnalytics } from './components/FailureAnalytics/FailureAnalytics';
import { MaintenanceOrders } from './components/MaintenanceOrders/MaintenanceOrders';
import { LubricationTracker } from './components/LubricationTracker/LubricationTracker';
import { SparePartsView } from './components/SpareParts/SparePartsView';
import { WhatIfSimulation } from './components/WhatIfSimulation/WhatIfSimulation';
import { MachineCompare } from './components/MachineCompare/MachineCompare';
import { AICopilot } from './components/AICopilot/AICopilot';
import { ReportsView } from './components/Reports/ReportsView';

// Modals
import { DigitalTwinModal } from './components/DigitalTwin/DigitalTwinModal';
import { WhyModal } from './components/DigitalTwin/WhyModal';
import { ActionSheetModal } from './components/DigitalTwin/ActionSheetModal';

import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

function AppContent() {
  const { activeTab, toastMessage, selectedMachineId, whyMachineId, actionSheetMachineId } = useFleet();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 p-3.5 rounded-lg shadow-xl bg-slate-900 text-white text-xs border border-slate-700 animate-slide-in">
          {toastMessage.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          {toastMessage.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
          <div>
            <strong className="block font-bold">{toastMessage.title}</strong>
            <span className="text-slate-300 text-[11px]">{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* 16-Step Guided Value Chain Demo Ribbon */}
      <GuidedDemoBanner />

      {/* Main Body with Sidebar + Tab Views */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto max-h-[calc(100vh-53px)] pb-12">
          {activeTab === 'command_center' && <CommandCenter />}
          {activeTab === 'heatmap' && <FacilityHeatmap />}
          {activeTab === 'machines' && <MachineHealth />}
          {activeTab === 'alerts' && <PredictiveAlerts />}
          {activeTab === 'failures' && <FailureAnalytics />}
          {activeTab === 'maintenance' && <MaintenanceOrders />}
          {activeTab === 'lubrication' && <LubricationTracker />}
          {activeTab === 'spare_parts' && <SparePartsView />}
          {activeTab === 'technicians' && <MaintenanceOrders />}
          {activeTab === 'what_if' && <WhatIfSimulation />}
          {activeTab === 'compare' && <MachineCompare />}
          {activeTab === 'copilot' && <AICopilot />}
          {activeTab === 'reports' && <ReportsView />}
        </main>
      </div>

      {/* Global Interactive Modals */}
      {selectedMachineId && <DigitalTwinModal />}
      {whyMachineId && <WhyModal />}
      {actionSheetMachineId && <ActionSheetModal />}

    </div>
  );
}

export default function App() {
  return (
    <FleetProvider>
      <AppContent />
    </FleetProvider>
  );
}
