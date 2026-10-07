import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  FACILITY_INFO,
  TOP_LEVEL_KPIS,
  MACHINE_MODELS,
  TECHNICIANS,
  PRODUCTION_SCHEDULE_24H,
  SPARE_PARTS_CATALOG,
  INITIAL_WORK_ORDERS,
  generateFleetData,
  generateMaintenanceRecords,
  generateFailureRecords,
} from '../data/fleetData';

const FleetContext = createContext(null);

export function FleetProvider({ children }) {
  // Master Datasets
  const [machines, setMachines] = useState(() => generateFleetData());
  const [maintenanceRecords, setMaintenanceRecords] = useState(() => generateMaintenanceRecords(machines));
  const [failureRecords, setFailureRecords] = useState(() => generateFailureRecords(machines));
  const [spareParts, setSpareParts] = useState(SPARE_PARTS_CATALOG);
  const [workOrders, setWorkOrders] = useState(INITIAL_WORK_ORDERS);
  const [technicians, setTechnicians] = useState(TECHNICIANS);
  
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('command_center');
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [whyMachineId, setWhyMachineId] = useState(null);
  const [actionSheetMachineId, setActionSheetMachineId] = useState(null);
  const [compareIds, setCompareIds] = useState(['CV-1042', 'SORT-082', 'ROB-221']);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedWearClass, setSelectedWearClass] = useState('All');
  
  // Simulation Controls
  const [isSimulating, setIsSimulating] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date().toLocaleTimeString());
  const [activeScenario, setActiveScenario] = useState('normal');

  // Guided Demo Flow Controller (Prompt Section 59: 16-step demo)
  const [guidedDemoStep, setGuidedDemoStep] = useState(0); // 0 = inactive, 1..16 = active demo step
  const [demoBannerOpen, setDemoBannerOpen] = useState(false);

  // Notifications / Alert toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, message, type = 'info') => {
    setToastMessage({ title, message, type, id: Date.now() });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Live Telemetry Simulation Loop
  useEffect(() => {
    if (!isSimulating) return;

    const intervalMs = Math.max(1000, Math.floor(3000 / simulationSpeed));
    const timer = setInterval(() => {
      setLastUpdatedTime(new Date().toLocaleTimeString());

      setMachines(prevMachines => {
        return prevMachines.map(m => {
          // If machine is CV-1042 and scenario is active or guided demo
          const isTargetHero = m.id === 'CV-1042' && (activeScenario === 'bearing_degradation' || guidedDemoStep >= 3);
          
          const noiseVib = (Math.random() - 0.5) * 0.15;
          const noiseTemp = (Math.random() - 0.5) * 0.25;
          const noiseCur = (Math.random() - 0.5) * 0.3;

          let newVib = Math.max(0.8, Number((m.currentTelemetry.vibration + noiseVib).toFixed(2)));
          let newTemp = Math.max(30, Number((m.currentTelemetry.temperature + noiseTemp).toFixed(1)));
          let newCur = Math.max(10, Number((m.currentTelemetry.motorCurrent + noiseCur).toFixed(1)));

          if (isTargetHero) {
            // Keep elevated or drift up slightly
            newVib = Number((5.8 + Math.random() * 0.3).toFixed(2));
            newTemp = Number((68.4 + Math.random() * 0.6).toFixed(1));
            newCur = Number((28.6 + Math.random() * 0.5).toFixed(1));
          }

          return {
            ...m,
            currentTelemetry: {
              ...m.currentTelemetry,
              vibration: newVib,
              temperature: newTemp,
              motorCurrent: newCur,
            }
          };
        });
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSimulating, simulationSpeed, activeScenario, guidedDemoStep]);

  // Derived Dynamic Top-Level KPIs
  const currentKPIs = useMemo(() => {
    const total = machines.length;
    const healthy = machines.filter(m => m.status === 'Healthy').length;
    const warning = machines.filter(m => m.status === 'Warning').length;
    const critical = machines.filter(m => m.status === 'Critical').length;
    const atRisk = machines.filter(m => m.failureRisk > 40).length;
    const predictedFailures = machines.filter(m => m.failureRisk > 60).length;
    const dueLubrication = machines.filter(m => m.delayedLubricationCount > 0).length;

    return {
      ...TOP_LEVEL_KPIS,
      sampleTotal: total,
      healthyMachines: healthy,
      warningMachines: warning,
      criticalMachines: critical,
      machinesAtRisk: atRisk,
      predictedFailures: predictedFailures,
      preventiveMaintenanceDue: dueLubrication + 14,
    };
  }, [machines]);

  // Selected Machine Entity
  const selectedMachine = useMemo(() => {
    return machines.find(m => m.id === selectedMachineId) || machines[0];
  }, [machines, selectedMachineId]);

  const whyMachine = useMemo(() => {
    return machines.find(m => m.id === whyMachineId) || null;
  }, [machines, whyMachineId]);

  const actionSheetMachine = useMemo(() => {
    return machines.find(m => m.id === actionSheetMachineId) || null;
  }, [machines, actionSheetMachineId]);

  // Filtered Machines for Tables/Heatmap/Grid
  const filteredMachines = useMemo(() => {
    return machines.filter(m => {
      const matchSearch = searchQuery.trim() === '' ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.aiDiagnosis.primaryCause.toLowerCase().includes(searchQuery.toLowerCase());

      const matchZone = selectedZone === 'All' || m.zone === selectedZone;
      const matchCategory = selectedCategory === 'All' || m.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || m.status === selectedStatus;
      const matchWear = selectedWearClass === 'All' || m.wearClass === selectedWearClass;

      return matchSearch && matchZone && matchCategory && matchStatus && matchWear;
    });
  }, [machines, searchQuery, selectedZone, selectedCategory, selectedStatus, selectedWearClass]);

  // Human-in-the-Loop: Approve AI Recommendation
  const approveRecommendation = (machineId) => {
    const machine = machines.find(m => m.id === machineId);
    if (!machine) return;

    // Check if order already exists
    const existing = workOrders.find(wo => wo.machineId === machineId && wo.status !== 'Resolved' && wo.status !== 'Verified');
    if (existing) {
      showToast('Work Order Exists', `Work Order ${existing.id} is already active for ${machineId}.`, 'warning');
      setActiveTab('maintenance');
      return;
    }

    // Auto-assign suitable technician based on skill
    const suitableTech = technicians.find(t => t.available && (t.skill.includes('Bearings') || t.skill.includes('Mechanical'))) || technicians[0];

    const newOrder = {
      id: `WO-${Math.floor(8500 + Math.random() * 500)}`,
      machineId: machine.id,
      machineName: machine.name,
      priority: machine.status === 'Critical' ? 'Critical' : 'High',
      status: 'Assigned',
      technicianId: suitableTech.id,
      technicianName: suitableTech.name,
      scheduledWindow: machine.aiDiagnosis.recommendedWindow,
      action: machine.aiDiagnosis.recommendedAction,
      partsRequired: machine.aiDiagnosis.partsNeeded,
      estimatedDowntime: machine.aiDiagnosis.estimatedDowntime,
      estimatedCost: machine.aiDiagnosis.estimatedCost,
      riskIfIgnored: machine.aiDiagnosis.riskIfIgnored,
      createdDate: new Date().toLocaleString(),
      tradeoffSummary: `Approved from AI Agent. Scheduled in low-impact window to protect production.`,
      source: 'Human Manager Approval (AI Recommended)'
    };

    setWorkOrders(prev => [newOrder, ...prev]);

    // Update technician workload
    setTechnicians(prev => prev.map(t => t.id === suitableTech.id ? { ...t, activeJobs: t.activeJobs + 1, available: false } : t));

    // Show success toast
    showToast('Work Order Created', `Approved! Work Order ${newOrder.id} dispatched to ${suitableTech.name}.`, 'success');

    // If guided demo is running and at step 13
    if (guidedDemoStep === 13) {
      setGuidedDemoStep(14);
    }
  };

  // Reject / Dismiss Recommendation
  const rejectRecommendation = (machineId, reason = 'Operator deferred to next scheduled downtime') => {
    showToast('Recommendation Deferred', `Action deferred for ${machineId}: ${reason}`, 'info');
  };

  // Update Work Order Status
  const updateWorkOrderStatus = (orderId, newStatus) => {
    setWorkOrders(prev => prev.map(wo => {
      if (wo.id === orderId) {
        return { ...wo, status: newStatus };
      }
      return wo;
    }));
    showToast('Work Order Updated', `Order ${orderId} moved to "${newStatus}"`, 'info');
  };

  // Scenario Injection Engine (Section 46)
  const triggerScenario = (scenarioKey) => {
    setActiveScenario(scenarioKey);

    if (scenarioKey === 'bearing_degradation') {
      setMachines(prev => prev.map(m => {
        if (m.id === 'CV-1042') {
          return {
            ...m,
            healthScore: 67,
            failureRisk: 68,
            status: 'Warning',
            currentTelemetry: {
              ...m.currentTelemetry,
              vibration: 5.8,
              temperature: 68.4,
              motorCurrent: 28.6,
            }
          };
        }
        return m;
      }));
      setSelectedMachineId('CV-1042');
      showToast('Scenario Triggered: Bearing Degradation', 'Machine CV-1042 vibration rose to 5.8 mm/s (+71%). Health score dropped to 67.', 'warning');
    } else if (scenarioKey === 'lubrication_failure') {
      setMachines(prev => prev.map(m => {
        if (m.id === 'SORT-082') {
          return {
            ...m,
            healthScore: 48,
            failureRisk: 73,
            status: 'Critical',
            delayedLubricationCount: 7,
            currentTelemetry: {
              ...m.currentTelemetry,
              vibration: 6.9,
              temperature: 74.2,
            }
          };
        }
        return m;
      }));
      setSelectedMachineId('SORT-082');
      showToast('Scenario Triggered: Lubrication Starvation', 'Sorter SORT-082 lubrication overdue. Frictional heat and vibration elevated to critical.', 'error');
    } else if (scenarioKey === 'motor_overload') {
      setMachines(prev => prev.map(m => {
        if (m.id === 'PACK-304') {
          return {
            ...m,
            healthScore: 56,
            failureRisk: 52,
            status: 'Warning',
            currentTelemetry: {
              ...m.currentTelemetry,
              motorCurrent: 26.8,
              temperature: 64.5,
              load: 94
            }
          };
        }
        return m;
      }));
      setSelectedMachineId('PACK-304');
      showToast('Scenario Triggered: Motor Overload', 'Pack Line 04 Case Sealer drawing 26.8 A. Overheating predicted.', 'warning');
    } else if (scenarioKey === 'reset_normal') {
      setMachines(generateFleetData());
      showToast('Fleet Reset', 'All machine telemetries and health scores restored to standard baseline.', 'info');
    }
  };

  // Guided Demo Step Advance (Section 59)
  const startGuidedDemo = () => {
    setDemoBannerOpen(true);
    setGuidedDemoStep(1);
    setActiveTab('command_center');
  };

  const nextDemoStep = () => {
    const next = Math.min(16, guidedDemoStep + 1);
    setGuidedDemoStep(next);

    // Contextual navigation per demo step
    if (next === 2) {
      setActiveTab('machines');
    } else if (next === 3 || next === 4 || next === 5 || next === 6) {
      triggerScenario('bearing_degradation');
      setSelectedMachineId('CV-1042');
      setActiveTab('machines');
    } else if (next === 7 || next === 8 || next === 9 || next === 10 || next === 11) {
      setSelectedMachineId('CV-1042');
    } else if (next === 13) {
      setActionSheetMachineId('CV-1042');
    } else if (next === 14) {
      approveRecommendation('CV-1042');
      setActiveTab('maintenance');
    } else if (next === 15) {
      setSelectedMachineId('CV-1042');
    }
  };

  const prevDemoStep = () => {
    setGuidedDemoStep(prev => Math.max(1, prev - 1));
  };

  const exitGuidedDemo = () => {
    setGuidedDemoStep(0);
    setDemoBannerOpen(false);
  };

  return (
    <FleetContext.Provider
      value={{
        facilityInfo: FACILITY_INFO,
        kpis: currentKPIs,
        machineModels: MACHINE_MODELS,
        technicians,
        productionSchedule: PRODUCTION_SCHEDULE_24H,
        spareParts,
        workOrders,
        machines,
        filteredMachines,
        maintenanceRecords,
        failureRecords,
        activeTab,
        setActiveTab,
        selectedMachineId,
        setSelectedMachineId,
        selectedMachine,
        whyMachineId,
        setWhyMachineId,
        whyMachine,
        actionSheetMachineId,
        setActionSheetMachineId,
        actionSheetMachine,
        compareIds,
        setCompareIds,
        searchQuery,
        setSearchQuery,
        selectedZone,
        setSelectedZone,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        selectedWearClass,
        setSelectedWearClass,
        isSimulating,
        setIsSimulating,
        simulationSpeed,
        setSimulationSpeed,
        lastUpdatedTime,
        activeScenario,
        triggerScenario,
        approveRecommendation,
        rejectRecommendation,
        updateWorkOrderStatus,
        toastMessage,
        showToast,
        guidedDemoStep,
        demoBannerOpen,
        startGuidedDemo,
        nextDemoStep,
        prevDemoStep,
        exitGuidedDemo,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
}

export function useFleet() {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error('useFleet must be used within a FleetProvider');
  }
  return context;
}
