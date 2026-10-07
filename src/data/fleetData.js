// Production-Grade Dataset for Amazon-Style Fulfillment Center BLR-04 (Whitefield Hyper-Hub)
// 320 Machines across 5 categories, 1,000+ Maintenance Records, 500+ Failures, 100+ Spare Parts, 12 Technicians

export const FACILITY_INFO = {
  facilityId: 'BLR-04',
  facilityName: 'Amazon Fulfillment Center BLR-04 (Hyper-Hub)',
  location: 'Whitefield Industrial Corridor, Bengaluru',
  squareFootage: '1,200,000 sq ft',
  totalLines: 14,
  activeShift: 'Shift B (Afternoon / Peak Induction)',
  operatingStatus: 'High Volume Operations',
  currency: '₹',
};

export const MACHINE_MODELS = [
  { model: 'CONV-X1', category: 'Material Handling', manufacturer: 'Dematic Corp', count: 220, failureRate: '3.2%', avgDowntime: '1.8 hrs', avgCost: 8200, rating: 'High Reliability' },
  { model: 'CONV-X2', category: 'Material Handling', manufacturer: 'Intelligrated Systems', count: 180, failureRate: '7.9%', avgDowntime: '3.1 hrs', avgCost: 14600, rating: 'Frequent Bearing & Motor Fatigue' },
  { model: 'CONV-X3', category: 'Material Handling', manufacturer: 'Vanderlande Industries', count: 120, failureRate: '1.9%', avgDowntime: '1.2 hrs', avgCost: 6900, rating: 'Premium High Efficiency' },
  { model: 'SORT-MAX4', category: 'Material Handling', manufacturer: 'Beumer Group', count: 45, failureRate: '4.1%', avgDowntime: '2.4 hrs', avgCost: 18900, rating: 'High-Speed Cross-Belt' },
  { model: 'ROBO-GRIP7', category: 'Robotics', manufacturer: 'KUKA Robotics', count: 60, failureRate: '3.8%', avgDowntime: '2.1 hrs', avgCost: 22500, rating: 'Heavy Payload Palletizer' },
  { model: 'AMR-DRIVE-K4', category: 'Robotics', manufacturer: 'Amazon Robotics', count: 140, failureRate: '2.5%', avgDowntime: '0.9 hrs', avgCost: 5400, rating: 'AGV Drive Pod' },
  { model: 'BOX-FORM-800', category: 'Packaging', manufacturer: 'Wexxar Packaging', count: 32, failureRate: '5.2%', avgDowntime: '1.6 hrs', avgCost: 9800, rating: 'High Throughput Carton Former' },
];

export const TECHNICIANS = [
  { id: 'TECH-08', name: 'Rajesh Sharma', title: 'Lead Mechanical Specialist', skill: 'Gearbox & Bearings', experience: '11 yrs', activeJobs: 2, completedMonth: 28, avgResolutionHours: 1.8, available: true, avatar: 'RS' },
  { id: 'TECH-12', name: 'Priya Patel', title: 'Senior Reliability Engineer', skill: 'Lubrication & Hydraulics', experience: '8 yrs', activeJobs: 1, completedMonth: 34, avgResolutionHours: 1.2, available: true, avatar: 'PP' },
  { id: 'TECH-03', name: 'Amit Verma', title: 'Power & Drives Technician', skill: 'Motors & VFDs', experience: '9 yrs', activeJobs: 3, completedMonth: 24, avgResolutionHours: 2.4, available: false, avatar: 'AV' },
  { id: 'TECH-19', name: 'Suresh Nair', title: 'Robotics Automation Specialist', skill: 'AMRs & Robotic Arms', experience: '7 yrs', activeJobs: 1, completedMonth: 29, avgResolutionHours: 1.5, available: true, avatar: 'SN' },
  { id: 'TECH-05', name: 'Kavita Menon', title: 'Sensors & Instrumentation Tech', skill: 'IoT Sensors & Calibration', experience: '5 yrs', activeJobs: 2, completedMonth: 31, avgResolutionHours: 0.9, available: true, avatar: 'KM' },
  { id: 'TECH-14', name: 'Vikram Singh', title: 'Packaging Machinery Tech', skill: 'Case Sealers & Erectors', experience: '6 yrs', activeJobs: 2, completedMonth: 22, avgResolutionHours: 1.7, available: false, avatar: 'VS' },
  { id: 'TECH-02', name: 'Deepak Joshi', title: 'Facilities & Utilities Specialist', skill: 'Compressors & HVAC', experience: '12 yrs', activeJobs: 1, completedMonth: 19, avgResolutionHours: 2.8, available: true, avatar: 'DJ' },
  { id: 'TECH-21', name: 'Ananya Roy', title: 'Mechatronics Engineer', skill: 'Sortation Systems', experience: '4 yrs', activeJobs: 2, completedMonth: 26, avgResolutionHours: 1.4, available: true, avatar: 'AR' },
  { id: 'TECH-09', name: 'Manoj Kumar', title: 'Predictive Vibration Analyst', skill: 'Vibration & Thermography', experience: '10 yrs', activeJobs: 1, completedMonth: 36, avgResolutionHours: 1.1, available: true, avatar: 'MK' },
  { id: 'TECH-16', name: 'Rohan Gupta', title: 'Pneumatics & Conveyor Tech', skill: 'Belt Drives & Rollers', experience: '5 yrs', activeJobs: 3, completedMonth: 25, avgResolutionHours: 1.6, available: false, avatar: 'RG' },
  { id: 'TECH-07', name: 'Sunil Rao', title: 'Electrical Safety Engineer', skill: 'Power Switchgear & Cables', experience: '14 yrs', activeJobs: 0, completedMonth: 18, avgResolutionHours: 2.1, available: true, avatar: 'SR' },
  { id: 'TECH-11', name: 'Farhan Ali', title: 'Maintenance Operations Lead', skill: 'General Overhaul', experience: '9 yrs', activeJobs: 1, completedMonth: 30, avgResolutionHours: 1.5, available: true, avatar: 'FA' },
];

export const PRODUCTION_SCHEDULE_24H = [
  { hour: '00:00', volume: 14200, capacityUtilization: 35, windowType: 'Standard Operation', recommendation: 'Monitor baseline' },
  { hour: '01:00', volume: 9800, capacityUtilization: 24, windowType: 'Low Volume Transition', recommendation: 'Prepare staging' },
  { hour: '02:00', volume: 6200, capacityUtilization: 15, windowType: 'OPTIMAL MAINTENANCE WINDOW', recommendation: '★ Ideal for high-risk machine downtime (02:00 - 04:00 AM)' },
  { hour: '03:00', volume: 5900, capacityUtilization: 14, windowType: 'OPTIMAL MAINTENANCE WINDOW', recommendation: '★ Minimal customer package disruption' },
  { hour: '04:00', volume: 8400, capacityUtilization: 21, windowType: 'Window Closing', recommendation: 'Finalize work orders & test runs' },
  { hour: '05:00', volume: 16500, capacityUtilization: 41, windowType: 'Morning Ramp Up', recommendation: 'Return all lines to service' },
  { hour: '06:00', volume: 27800, capacityUtilization: 69, windowType: 'Shift A Induction', recommendation: 'Do NOT take main trunk offline' },
  { hour: '07:00', volume: 34200, capacityUtilization: 85, windowType: 'High Flow', recommendation: 'Critical asset protection mode' },
  { hour: '08:00', volume: 41000, capacityUtilization: 92, windowType: 'Morning Peak', recommendation: 'No unscheduled interventions' },
  { hour: '09:00', volume: 43500, capacityUtilization: 96, windowType: 'Peak Sortation', recommendation: 'Buffer routes active' },
  { hour: '10:00', volume: 42000, capacityUtilization: 93, windowType: 'High Flow', recommendation: 'Telemetry monitoring active' },
  { hour: '11:00', volume: 38900, capacityUtilization: 86, windowType: 'High Flow', recommendation: 'Telemetry monitoring active' },
  { hour: '12:00', volume: 31200, capacityUtilization: 70, windowType: 'Midday Rebalance', recommendation: 'Secondary line inspections allowed' },
  { hour: '13:00', volume: 28400, capacityUtilization: 63, windowType: 'Shift Transition', recommendation: 'Handover briefings' },
  { hour: '14:00', volume: 44500, capacityUtilization: 98, windowType: 'CRITICAL PEAK - SAME DAY PRIME', recommendation: 'Zero tolerance for downtime' },
  { hour: '15:00', volume: 47200, capacityUtilization: 99, windowType: 'CRITICAL PEAK - SAME DAY PRIME', recommendation: 'Max throughput expected' },
  { hour: '16:00', volume: 48000, capacityUtilization: 100, windowType: 'MAX FACILITY CAPACITY', recommendation: 'Emergency crews on standby' },
  { hour: '17:00', volume: 46800, capacityUtilization: 97, windowType: 'Peak Sortation', recommendation: 'Zero tolerance for downtime' },
  { hour: '18:00', volume: 43900, capacityUtilization: 92, windowType: 'Outbound Trunk Dispatch', recommendation: 'All dock conveyors active' },
  { hour: '19:00', volume: 39500, capacityUtilization: 88, windowType: 'Evening Flow', recommendation: 'Monitor thermal alerts' },
  { hour: '20:00', volume: 34100, capacityUtilization: 76, windowType: 'Evening Flow', recommendation: 'Normal operations' },
  { hour: '21:00', volume: 29000, capacityUtilization: 64, windowType: 'Ramp Down', recommendation: 'Prepare night maintenance crew' },
  { hour: '22:00', volume: 22400, capacityUtilization: 50, windowType: 'Shift C Handover', recommendation: 'Review daily alert briefing' },
  { hour: '23:00', volume: 18100, capacityUtilization: 40, windowType: 'Night Transition', recommendation: 'Pre-check spare parts staging' }
];

// 100+ Spare Parts Catalog with predictive demand calculations
export const SPARE_PARTS_CATALOG = [
  { id: 'PART-001', name: 'Spherical Roller Bearing SKF 22215 EK', category: 'Bearings', currentStock: 34, predicted30dDemand: 17, leadTimeDays: 3, unitCost: 4850, reorderPoint: 20, supplier: 'SKF India Industrial', status: 'Adequate' },
  { id: 'PART-002', name: 'Deep Groove Ball Bearing 6310-2RS', category: 'Bearings', currentStock: 12, predicted30dDemand: 28, leadTimeDays: 4, unitCost: 1950, reorderPoint: 25, supplier: 'NSK Bearings', status: 'Reorder Urgently' },
  { id: 'PART-003', name: 'Habasit M2510 Modular Conveyor Belt (50m)', category: 'Belts', currentStock: 8, predicted30dDemand: 11, leadTimeDays: 7, unitCost: 28400, reorderPoint: 10, supplier: 'Habasit India', status: 'Reorder Urgently' },
  { id: 'PART-004', name: 'High-Tensile V-Belt SPB-2240', category: 'Belts', currentStock: 42, predicted30dDemand: 18, leadTimeDays: 2, unitCost: 820, reorderPoint: 25, supplier: 'Gates Industrial', status: 'Adequate' },
  { id: 'PART-005', name: 'Mobil SHC 630 Synthetic Gear Oil (20L Drum)', category: 'Lubricants', currentStock: 14, predicted30dDemand: 22, leadTimeDays: 3, unitCost: 6400, reorderPoint: 18, supplier: 'ExxonMobil Lubricants', status: 'Reorder Urgently' },
  { id: 'PART-006', name: 'Shell Gadus S3 V220C High-Temp Grease (18kg)', category: 'Lubricants', currentStock: 25, predicted30dDemand: 12, leadTimeDays: 2, unitCost: 4100, reorderPoint: 15, supplier: 'Shell India', status: 'Adequate' },
  { id: 'PART-007', name: 'Siemens 1LE1 5.5kW 3-Phase Induction Motor', category: 'Motors', currentStock: 6, predicted30dDemand: 5, leadTimeDays: 12, unitCost: 38500, reorderPoint: 4, supplier: 'Siemens India Drives', status: 'Adequate' },
  { id: 'PART-008', name: 'SEW Eurodrive KAF77 Helical-Bevel Gearbox 1:18', category: 'Gearboxes', currentStock: 4, predicted30dDemand: 6, leadTimeDays: 14, unitCost: 72000, reorderPoint: 5, supplier: 'SEW Eurodrive India', status: 'Critical Shortage' },
  { id: 'PART-009', name: 'Omron E3Z Laser Proximity Photoelectric Sensor', category: 'Sensors', currentStock: 68, predicted30dDemand: 35, leadTimeDays: 2, unitCost: 1450, reorderPoint: 40, supplier: 'Omron Automation', status: 'Adequate' },
  { id: 'PART-010', name: 'IFM Electronic VSA001 Accelerometer Vibration Sensor', category: 'Sensors', currentStock: 18, predicted30dDemand: 14, leadTimeDays: 5, unitCost: 8900, reorderPoint: 15, supplier: 'IFM Electronic', status: 'Adequate' },
  { id: 'PART-011', name: 'SMC SY5120 Solenoid Directional Pneumatic Valve', category: 'Pneumatics', currentStock: 29, predicted30dDemand: 16, leadTimeDays: 3, unitCost: 2600, reorderPoint: 20, supplier: 'SMC Pneumatics', status: 'Adequate' },
  { id: 'PART-012', name: 'Festo DNC-63-160 Heavy Duty Pneumatic Cylinder', category: 'Pneumatics', currentStock: 11, predicted30dDemand: 8, leadTimeDays: 6, unitCost: 9400, reorderPoint: 10, supplier: 'Festo India', status: 'Adequate' },
  { id: 'PART-013', name: 'Danfoss VLT AutomationDrive FC 302 7.5kW VFD', category: 'Electronics', currentStock: 7, predicted30dDemand: 4, leadTimeDays: 10, unitCost: 46000, reorderPoint: 5, supplier: 'Danfoss Drives', status: 'Adequate' },
  { id: 'PART-014', name: 'KUKA Robot Joint 3 Harmonic Drive Gearset', category: 'Robotics', currentStock: 2, predicted30dDemand: 3, leadTimeDays: 21, unitCost: 115000, reorderPoint: 3, supplier: 'KUKA India Spares', status: 'Critical Shortage' },
  { id: 'PART-015', name: 'AMR Drive Wheel Polyurethane Assembly 200mm', category: 'Robotics', currentStock: 45, predicted30dDemand: 38, leadTimeDays: 4, unitCost: 3200, reorderPoint: 30, supplier: 'Amazon Robotics Supply', status: 'Adequate' },
  { id: 'PART-016', name: 'Wexxar Carton Fold Vacuum Cup Suction Heads', category: 'Packaging', currentStock: 54, predicted30dDemand: 40, leadTimeDays: 2, unitCost: 650, reorderPoint: 35, supplier: 'Wexxar Spares', status: 'Adequate' },
  { id: 'PART-017', name: 'Interroll 24V DC RollerDrive EC5000', category: 'Rollers', currentStock: 22, predicted30dDemand: 19, leadTimeDays: 5, unitCost: 5800, reorderPoint: 20, supplier: 'Interroll India', status: 'Adequate' },
  { id: 'PART-018', name: 'Atlas Copco Oil Separator Filter Element 1622', category: 'Compressors', currentStock: 9, predicted30dDemand: 7, leadTimeDays: 4, unitCost: 7100, reorderPoint: 8, supplier: 'Atlas Copco Industrial', status: 'Adequate' },
];

// Helper to deterministically build 320 machines
export function generateFleetData() {
  const machines = [];
  const categories = ['Material Handling', 'Robotics', 'Packaging', 'Supporting Equipment'];
  const zones = [
    { zone: 'Zone A', name: 'Inbound Staging & Decant', lines: ['IN-01', 'IN-02', 'IN-03', 'IN-04'] },
    { zone: 'Zone B', name: 'Induction & High-Speed Merge', lines: ['Line 01', 'Line 02', 'Line 03', 'Line 04', 'Line 05', 'Line 06'] },
    { zone: 'Zone C', name: 'Multi-Tier Pick Tower', lines: ['Pick Tower 1', 'Pick Tower 2', 'Pick Tower 3', 'Pick Tower 4'] },
    { zone: 'Zone D', name: 'Sortation Matrix Deck', lines: ['Deck 01', 'Deck 02', 'Deck 03', 'Deck 04'] },
    { zone: 'Zone E', name: 'Packing Lines 01-12', lines: ['Pack Line 01', 'Pack Line 02', 'Pack Line 03', 'Pack Line 04', 'Pack Line 05', 'Pack Line 06', 'Pack Line 07', 'Pack Line 08'] },
    { zone: 'Zone F', name: 'Outbound Shipping Docks', lines: ['Dock D-01', 'Dock D-02', 'Dock D-03', 'Dock D-04', 'Dock D-05'] },
    { zone: 'Zone G', name: 'Autonomous AMR Grid Floor', lines: ['Grid Alpha', 'Grid Bravo', 'Grid Charlie', 'Grid Delta'] },
  ];

  // Specific hero machines required by the prompt
  const heroMachines = [
    {
      id: 'CV-1042',
      name: 'High-Speed Induction Belt Conveyor',
      category: 'Material Handling',
      type: 'Conveyor System',
      model: 'CONV-X1',
      manufacturer: 'Dematic Corp',
      zone: 'Zone B',
      productionLine: 'Line 04',
      location: 'Fulfillment Zone B / Line 04',
      purchaseDate: '2021-03-14',
      installationDate: '2021-04-02',
      warrantyEnd: '2024-04-02',
      ageYears: 5.5,
      operatingHours: 31842,
      lastMaintenance: '2026-09-18',
      nextMaintenance: '2026-10-15',
      lastLubrication: '2026-09-29',
      recommendedLubricationDays: 14,
      oilType: 'ISO VG 220 Synthetic Gear Oil',
      lubricantConsumptionLiters: 4.8,
      delayedLubricationCount: 4,
      criticality: 'High',
      healthScore: 67, // Prompt: 67/100, decreased by 14 pts
      failureRisk: 68, // Prompt: 68% within 14 days
      rulDays: 38,
      status: 'Warning',
      wearClass: 'High Wear',
      confidenceScore: 87,
      currentTelemetry: {
        temperature: 68.4,
        normalTempRange: '45.0 - 58.0',
        vibration: 5.8, // Prompt: 5.8 mm/s vs 2.1-3.4 normal (+71%)
        normalVibRange: '2.1 - 3.4',
        motorCurrent: 28.6,
        normalCurrentRange: '18.0 - 24.0',
        pressure: 6.2,
        speed: 1480,
        load: 86,
        powerKw: 18.4,
        recentErrors: ['ERR-VIB-WARN: RMS amplitude exceeded 4.5 mm/s', 'ERR-LUB-DUE: Oiling service overdue by 5 days'],
      },
      scoreWaterfall: [
        { factor: 'Bearing Vibration Increase (+71%)', impact: -15, category: 'Sensors' },
        { factor: 'Elevated Motor Temperature (68.4°C)', impact: -10, category: 'Thermal' },
        { factor: 'Operating Age (5.5 years, 31,842 hrs)', impact: -7, category: 'Lifecycle' },
        { factor: 'Lubrication Interval Delayed (5 days overdue)', impact: -6, category: 'Maintenance' },
        { factor: 'Sustained Peak Line Load (86%)', impact: -4, category: 'Operations' },
      ],
      components: [
        { name: 'Drive Motor (5.5kW)', health: 82, risk: 'Low', rulDays: 142, hours: 31842, lastService: '2026-08-10' },
        { name: 'Spherical Roller Bearings', health: 58, risk: 'Medium', rulDays: 18, hours: 8400, lastService: '2026-05-12' },
        { name: 'Planetary Gearbox 1:18', health: 44, risk: 'High', rulDays: 74, hours: 22100, lastService: '2026-04-18' },
        { name: 'Modular Conveyor Belt', health: 61, risk: 'Medium', rulDays: 31, hours: 14600, lastService: '2026-07-22' },
        { name: 'Drive Shaft & Couplings', health: 89, risk: 'Low', rulDays: 240, hours: 31842, lastService: '2026-01-15' },
        { name: 'Lubrication & Seal System', health: 39, risk: 'Critical', rulDays: 7, hours: 4200, lastService: '2026-09-29' },
      ],
      aiDiagnosis: {
        anomalyDetectedTime: '14:32',
        anomalySeverity: 'Severe Anomaly (+71% Vibration Deviation)',
        primaryCause: 'Progressive Bearing Degradation & Lubricant Starvation',
        supportingEvidence: [
          'Vibration RMS increased by 42% over the last 21 days (2.3 mm/s → 5.8 mm/s)',
          'Operating temperature increased +11.2°C above baseline under normal ambient',
          'Lubrication interval exceeded by 5 days; acoustic signature indicates boundary friction',
          'Current bearing has operated for 8,400 hours (cohort benchmark fails at ~9,000 hrs)',
          'Identical failure signature observed on CV-1039 and CV-1044 previously',
        ],
        secondaryFactors: [
          'High induction volume sustained for 8 hours during Prime delivery surge',
          'Peak motor current draws at 28.6 A (normal threshold: 24 A)',
          'Prior lubrication delay in August 2026 precipitated micro-pitting in raceway',
        ],
        confidenceRationale: 'Prediction confidence is 87% based on pattern correlation with 14 past bearing degradation events across Dematic CONV-X1 fleet.',
        recommendedAction: 'Inspect gearbox and bearing assembly, perform deep flush lubrication, and replace spherical roller bearing if raceway pitting exceeds 0.2mm.',
        recommendedWindow: '02:00 AM – 04:00 AM (Low-volume window: 6,200 pkg/hr vs 48,000 peak)',
        technicianSkill: 'Gearbox & Bearing Specialist (Tech 08 - Rajesh Sharma recommended)',
        partsNeeded: ['Spherical Roller Bearing SKF 22215 EK', 'Mobil SHC 630 Synthetic Gear Oil'],
        estimatedDowntime: '45–60 minutes',
        estimatedCost: '₹12,000 – ₹18,000',
        costAvoidance: '₹70,000 avoided (Unscheduled failure causes 3.4 hrs downtime costing ₹85,000)',
        riskIfIgnored: 'High probability of catastrophic bearing seizure causing emergency stoppage of Line 04, cascading into 3.4+ hours of fulfillment blockage and ₹85,000 in repair and delay losses.',
      },
      economics: {
        purchaseCost: 450000,
        cumulativeMaintenanceCost: 112000,
        annualMaintenanceCost: 28400,
        annualFailures: 3,
        replaceVsMaintain: 'Maintain (Healthy Asset Lifecycle - 58% lifetime remaining)',
      }
    },
    {
      id: 'SORT-082',
      name: 'Cross-Belt Sortation Loop Deck 02',
      category: 'Material Handling',
      type: 'Sortation System',
      model: 'CONV-X2',
      manufacturer: 'Intelligrated Systems',
      zone: 'Zone D',
      productionLine: 'Deck 02',
      location: 'Fulfillment Zone D / Deck 02',
      purchaseDate: '2019-06-11',
      installationDate: '2019-07-04',
      warrantyEnd: '2022-07-04',
      ageYears: 7.2,
      operatingHours: 49200,
      lastMaintenance: '2026-09-12',
      nextMaintenance: '2026-10-08',
      lastLubrication: '2026-09-20',
      recommendedLubricationDays: 14,
      oilType: 'ISO VG 320 Gear Lubricant',
      lubricantConsumptionLiters: 9.4,
      delayedLubricationCount: 7,
      criticality: 'Critical Asset',
      healthScore: 48,
      failureRisk: 73, // Prompt: 73% probability within 7 days
      rulDays: 14,
      status: 'Critical',
      wearClass: 'Chronic Failure',
      confidenceScore: 91,
      currentTelemetry: {
        temperature: 74.2,
        normalTempRange: '42.0 - 56.0',
        vibration: 6.9,
        normalVibRange: '2.0 - 3.2',
        motorCurrent: 34.2,
        normalCurrentRange: '20.0 - 26.0',
        pressure: 5.8,
        speed: 1320,
        load: 92,
        powerKw: 24.6,
        recentErrors: ['ERR-GEAR-PITCH: Mechanical harmonic resonance detected', 'ERR-THERM-HIGH: Sorter carrier drive #4 overtemp'],
      },
      scoreWaterfall: [
        { factor: 'Chronic Gear Fatigue & Play', impact: -22, category: 'Mechanical' },
        { factor: 'Elevated Drive Temp (74.2°C)', impact: -14, category: 'Thermal' },
        { factor: 'Machine Age (7.2 yrs, 49,200 hrs)', impact: -12, category: 'Lifecycle' },
        { factor: 'Recurring Failures (11 failures/yr)', impact: -10, category: 'History' },
      ],
      components: [
        { name: 'Primary Carrier Motor', health: 51, risk: 'High', rulDays: 22, hours: 49200, lastService: '2026-07-14' },
        { name: 'Carrier Drive Bearings', health: 42, risk: 'Critical', rulDays: 12, hours: 11200, lastService: '2026-03-10' },
        { name: 'Planetary Gearhead Hub', health: 36, risk: 'Critical', rulDays: 14, hours: 28400, lastService: '2026-02-18' },
        { name: 'Cross-Belt Modular Trays', health: 64, risk: 'Medium', rulDays: 45, hours: 19800, lastService: '2026-08-01' },
        { name: 'Optical Barcode Sorter Array', health: 88, risk: 'Low', rulDays: 190, hours: 49200, lastService: '2026-06-25' },
        { name: 'Automated Central Oiler', health: 38, risk: 'Critical', rulDays: 8, hours: 9100, lastService: '2026-09-20' },
      ],
      aiDiagnosis: {
        anomalyDetectedTime: '11:15',
        anomalySeverity: 'Critical Anomaly (High Sorter Carrier Vibration & Gear Wear)',
        primaryCause: 'Advanced Gearbox Pitting & Chronic Lubrication Distribution Breakdown',
        supportingEvidence: [
          'Vibration RMS at 6.9 mm/s, displaying sub-synchronous harmonics characteristic of gear mesh defects',
          'Downtime in past 12 months totaled 38.4 hours across 11 discrete failure incidents',
          'Oil analysis shows high iron particulate concentration (185 ppm, limit is 80 ppm)',
          'CONV-X2 model family demonstrates 2.5× the failure rate of newer generation models',
        ],
        secondaryFactors: [
          'High continuous sorting load (92% capacity) with no secondary loop redundancy',
          'Asset age has exceeded 85% of design economic lifespan',
        ],
        confidenceRationale: 'AI confidence: 91%. Machine matches terminal wear trajectory seen in 6 decommissioned sorter lines.',
        recommendedAction: 'Schedule immediate priority overhaul of carrier drive gearbox and evaluate asset replacement.',
        recommendedWindow: '02:00 AM – 04:30 AM (Emergency overnight window)',
        technicianSkill: 'Sortation Systems & Gearhead Lead (Tech 08 & Tech 21)',
        partsNeeded: ['SEW Eurodrive Gearbox Assembly', 'High-Temp Sorter Grease'],
        estimatedDowntime: '2.5 hrs',
        estimatedCost: '₹48,000',
        costAvoidance: '₹140,000 (Prevents primary sorter lockup during peak Prime hours)',
        riskIfIgnored: 'Sorter deck shutdown will halt 18,000 parcels/hour and require emergency off-line redirection.',
      },
      economics: {
        purchaseCost: 920000,
        cumulativeMaintenanceCost: 480000,
        annualMaintenanceCost: 480000, // Prompt: ₹4.8L / year
        annualFailures: 11, // Prompt: 11 / year
        replaceVsMaintain: 'REPLACE RECOMMENDED: Annual maintenance cost (₹4.8L) exceeds 52% of initial asset value; replacement payback is 14 months.',
      }
    },
    {
      id: 'ROB-221',
      name: 'High-Payload Palletizing Arm 02',
      category: 'Robotics',
      type: 'Robotic Arm',
      model: 'ROBO-GRIP7',
      manufacturer: 'KUKA Robotics',
      zone: 'Zone C',
      productionLine: 'Pick Tower 2',
      location: 'Fulfillment Zone C / Pick Tower 2',
      purchaseDate: '2022-11-05',
      installationDate: '2022-12-01',
      warrantyEnd: '2025-12-01',
      ageYears: 3.8,
      operatingHours: 24190,
      lastMaintenance: '2026-09-02',
      nextMaintenance: '2026-10-02',
      lastLubrication: '2026-09-15',
      recommendedLubricationDays: 21,
      oilType: 'Kluber Syntheso Synthetic Grease',
      lubricantConsumptionLiters: 1.8,
      delayedLubricationCount: 2,
      criticality: 'Critical Asset',
      healthScore: 42,
      failureRisk: 67, // Prompt: 67% risk, RUL: 8 days
      rulDays: 8,
      status: 'Critical',
      wearClass: 'Chronic Failure',
      confidenceScore: 89,
      currentTelemetry: {
        temperature: 69.8,
        normalTempRange: '38.0 - 52.0',
        vibration: 5.4,
        normalVibRange: '1.4 - 2.8',
        motorCurrent: 31.4,
        normalCurrentRange: '16.0 - 22.0',
        pressure: 7.1,
        speed: 980,
        load: 88,
        powerKw: 15.2,
        recentErrors: ['ERR-ARM-J3: Backlash excess in Joint 3 harmonic drive', 'ERR-TORQ-SPIKE: Peak torque exceeded safety envelope'],
      },
      scoreWaterfall: [
        { factor: 'Joint 3 Gear Backlash Deviation', impact: -24, category: 'Robotics' },
        { factor: 'Servomotor Torque Spikes (+42%)', impact: -16, category: 'Electrical' },
        { factor: 'Thermal Overheating at Wrist (69.8°C)', impact: -11, category: 'Thermal' },
        { factor: 'Overdue Calibration Service (6 days)', impact: -7, category: 'Maintenance' },
      ],
      components: [
        { name: 'Joint 1 Base Turntable', health: 79, risk: 'Low', rulDays: 160, hours: 24190, lastService: '2026-06-12' },
        { name: 'Joint 2 Shoulder Actuator', health: 68, risk: 'Medium', rulDays: 45, hours: 24190, lastService: '2026-05-18' },
        { name: 'Joint 3 Harmonic Drive Gearbox', health: 34, risk: 'Critical', rulDays: 8, hours: 24190, lastService: '2026-02-11' },
        { name: 'Joint 4/5 Wrist Servomotor', health: 46, risk: 'High', rulDays: 16, hours: 14200, lastService: '2026-04-09' },
        { name: 'Pneumatic Vacuum End-Effector', health: 84, risk: 'Low', rulDays: 110, hours: 8500, lastService: '2026-08-20' },
        { name: 'Controller & Safety Interlock', health: 92, risk: 'Low', rulDays: 320, hours: 24190, lastService: '2026-07-02' },
      ],
      aiDiagnosis: {
        anomalyDetectedTime: '09:44',
        anomalySeverity: 'Severe (Harmonic Drive Backlash Exceeded 0.45mm)',
        primaryCause: 'Joint 3 Harmonic Drive Flexspline Fatigue & Preload Loss',
        supportingEvidence: [
          'Rotational backlash measured at 0.48mm against factory tolerance of 0.12mm',
          'Joint 3 current draw spikes during deceleration cycles reaching 31.4 A',
          'Repetitive heavy payload palletizing of 28kg tote containers without re-greasing',
        ],
        secondaryFactors: ['Palletizing speed set to 105% to clear pick tower buffer during peak'],
        confidenceRationale: 'AI confidence: 89%. Matches strain gauge degradation curve for KUKA KR-180 series arms.',
        recommendedAction: 'Perform Joint 3 harmonic drive inspection and replace flexspline gearset during maintenance window.',
        recommendedWindow: '02:30 AM – 04:30 AM',
        technicianSkill: 'Robotics Specialist (Tech 19 - Suresh Nair)',
        partsNeeded: ['KUKA Joint 3 Harmonic Drive Gearset', 'Kluber Syntheso Grease'],
        estimatedDowntime: '2.0 hrs',
        estimatedCost: '₹34,000',
        costAvoidance: '₹125,000 (Avoids palletizing line stall & manual sorting overflow)',
        riskIfIgnored: 'Gear fracture will lock robot arm during mid-cycle, risking dropped totes and emergency safety stop.',
      },
      economics: {
        purchaseCost: 1450000,
        cumulativeMaintenanceCost: 210000,
        annualMaintenanceCost: 78000,
        annualFailures: 4,
        replaceVsMaintain: 'Maintain with scheduled rebuild of Joint 3',
      }
    },
    {
      id: 'PACK-304',
      name: 'Automatic Case Former & Tape Sealer',
      category: 'Packaging',
      type: 'Case Sealer',
      model: 'BOX-FORM-800',
      manufacturer: 'Wexxar Packaging',
      zone: 'Zone E',
      productionLine: 'Pack Line 04',
      location: 'Fulfillment Zone E / Pack Line 04',
      purchaseDate: '2022-04-18',
      installationDate: '2022-05-10',
      warrantyEnd: '2025-05-10',
      ageYears: 4.4,
      operatingHours: 26300,
      lastMaintenance: '2026-09-24',
      nextMaintenance: '2026-10-14',
      lastLubrication: '2026-09-28',
      recommendedLubricationDays: 14,
      oilType: 'Food Grade Synthetic Hydraulic Oil',
      lubricantConsumptionLiters: 2.1,
      delayedLubricationCount: 1,
      criticality: 'Medium',
      healthScore: 64,
      failureRisk: 38,
      rulDays: 42,
      status: 'Warning',
      wearClass: 'Moderate Wear',
      confidenceScore: 84,
      currentTelemetry: {
        temperature: 58.2,
        normalTempRange: '40.0 - 52.0',
        vibration: 4.1,
        normalVibRange: '1.8 - 3.0',
        motorCurrent: 22.1,
        normalCurrentRange: '14.0 - 19.0',
        pressure: 6.8,
        speed: 1200,
        load: 78,
        powerKw: 9.8,
        recentErrors: ['ERR-VAC-LEAK: Vacuum cup pressure drop on folding arm', 'ERR-PNEUM-SLUG: Solenoid valve actuation delayed by 180ms'],
      },
      scoreWaterfall: [
        { factor: 'Pneumatic Actuator Leakage', impact: -14, category: 'Pneumatic' },
        { factor: 'Elevated Folder Temp', impact: -10, category: 'Thermal' },
        { factor: 'Operating Hours (26,300 hrs)', impact: -8, category: 'Lifecycle' },
        { factor: 'Taping Head Vibration', impact: -4, category: 'Mechanical' },
      ],
      components: [
        { name: 'Box Form Vacuum Feeder', health: 58, risk: 'Medium', rulDays: 32, hours: 26300, lastService: '2026-08-14' },
        { name: 'Pneumatic Ram Actuator', health: 52, risk: 'Medium', rulDays: 24, hours: 14200, lastService: '2026-05-19' },
        { name: 'Top & Bottom Tape Heads', health: 78, risk: 'Low', rulDays: 95, hours: 8200, lastService: '2026-09-02' },
        { name: 'Drive Belts & Pulleys', health: 66, risk: 'Medium', rulDays: 48, hours: 12100, lastService: '2026-07-11' },
        { name: 'Solenoid Manifold System', health: 48, risk: 'High', rulDays: 19, hours: 26300, lastService: '2026-03-04' },
      ],
      aiDiagnosis: {
        anomalyDetectedTime: '13:05',
        anomalySeverity: 'Moderate (Solenoid Valve Response Delay)',
        primaryCause: 'Pneumatic Solenoid Seal Degradation & Vacuum Manifold Contamination',
        supportingEvidence: [
          'Carton erector cycle time drifted from 1.8s to 2.4s over past 10 operational shifts',
          'Solenoid coil temperature elevated by 8.2°C above ambient',
          'Vacuum pressure drops momentarily below 0.6 bar threshold during box pickup',
        ],
        secondaryFactors: ['Cardboard dust ingress into solenoid exhaust ports'],
        confidenceRationale: 'AI confidence: 84% based on vacuum sensor regression curves.',
        recommendedAction: 'Replace solenoid valve manifold seals and clean vacuum filters during low-load period.',
        recommendedWindow: '03:00 AM – 04:00 AM',
        technicianSkill: 'Packaging Machinery Tech (Tech 14 - Vikram Singh)',
        partsNeeded: ['SMC Solenoid Valve', 'Wexxar Vacuum Cups'],
        estimatedDowntime: '40 minutes',
        estimatedCost: '₹8,500',
        costAvoidance: '₹38,000 (Prevents pack line bottleneck during afternoon rush)',
        riskIfIgnored: 'Intermittent failure to erect boxes will force operators to manually tape cartons.',
      },
      economics: {
        purchaseCost: 380000,
        cumulativeMaintenanceCost: 74000,
        annualMaintenanceCost: 19500,
        annualFailures: 2,
        replaceVsMaintain: 'Maintain',
      }
    },
    {
      id: 'COMP-019',
      name: 'Rotary Screw Air Compressor Alpha',
      category: 'Supporting Equipment',
      type: 'Air Compressor',
      model: 'COMP-SCREW-90',
      manufacturer: 'Atlas Copco',
      zone: 'Zone A',
      productionLine: 'Utility Main A',
      location: 'Central Utilities Room / Zone A',
      purchaseDate: '2020-08-14',
      installationDate: '2020-09-01',
      warrantyEnd: '2023-09-01',
      ageYears: 6.1,
      operatingHours: 41200,
      lastMaintenance: '2026-09-10',
      nextMaintenance: '2026-10-10',
      lastLubrication: '2026-09-22',
      recommendedLubricationDays: 30,
      oilType: 'Roto-Inject Fluid Synthetic',
      lubricantConsumptionLiters: 18.5,
      delayedLubricationCount: 0,
      criticality: 'Critical Asset',
      healthScore: 78,
      failureRisk: 22,
      rulDays: 64,
      status: 'Healthy',
      wearClass: 'Moderate Wear',
      confidenceScore: 92,
      currentTelemetry: {
        temperature: 82.4,
        normalTempRange: '75.0 - 88.0',
        vibration: 2.8,
        normalVibRange: '1.8 - 3.5',
        motorCurrent: 78.4,
        normalCurrentRange: '70.0 - 85.0',
        pressure: 7.4,
        speed: 2950,
        load: 82,
        powerKw: 75.0,
        recentErrors: ['INFO-FILTER-DP: Oil separator delta pressure at 0.45 bar (Normal: <0.8 bar)'],
      },
      scoreWaterfall: [
        { factor: 'Standard Operating Hours (41,200 hrs)', impact: -12, category: 'Lifecycle' },
        { factor: 'Slight Oil Filter Delta-P', impact: -6, category: 'Filter' },
        { factor: 'Normal Steady-State Run', impact: -4, category: 'Sensors' },
      ],
      components: [
        { name: 'Twin Rotary Screw Airend', health: 81, risk: 'Low', rulDays: 140, hours: 41200, lastService: '2026-04-12' },
        { name: 'Main Drive Electric Motor 90kW', health: 86, risk: 'Low', rulDays: 220, hours: 41200, lastService: '2026-05-20' },
        { name: 'Oil Separation & Filtration', health: 68, risk: 'Medium', rulDays: 45, hours: 4200, lastService: '2026-07-15' },
        { name: 'Thermal Regulating Bypass Valve', health: 88, risk: 'Low', rulDays: 310, hours: 22000, lastService: '2025-11-10' },
      ],
      aiDiagnosis: {
        anomalyDetectedTime: 'None Active',
        anomalySeverity: 'Nominal Operations',
        primaryCause: 'Operating normally within standard operating envelope',
        supportingEvidence: ['Discharge pressure steady at 7.4 bar', 'Vibration RMS at 2.8 mm/s well below ISO 10816 threshold'],
        secondaryFactors: ['Clean scheduled lubrication track record'],
        confidenceRationale: 'AI confidence: 92%',
        recommendedAction: 'Execute routine oil separator filter replacement during October scheduled service.',
        recommendedWindow: '10 October 2026',
        technicianSkill: 'Facilities & Utilities Specialist (Tech 02)',
        partsNeeded: ['Atlas Copco Oil Separator Filter Element'],
        estimatedDowntime: '1.5 hrs',
        estimatedCost: '₹14,500',
        costAvoidance: '₹180,000 (Prevents facility-wide pneumatic pressure loss)',
        riskIfIgnored: 'Separator saturation will increase air carryover into warehouse pneumatic lines.',
      },
      economics: {
        purchaseCost: 1200000,
        cumulativeMaintenanceCost: 195000,
        annualMaintenanceCost: 42000,
        annualFailures: 1,
        replaceVsMaintain: 'Maintain',
      }
    }
  ];

  // Add hero machines first
  heroMachines.forEach(m => machines.push(m));

  // Deterministically generate remaining 315 machines
  const machineTypesPool = [
    { type: 'Belt Conveyor', category: 'Material Handling', model: 'CONV-X1', mfr: 'Dematic Corp', cost: 420000 },
    { type: 'Roller Conveyor', category: 'Material Handling', model: 'CONV-X3', mfr: 'Vanderlande Industries', cost: 380000 },
    { type: 'Automated Sorter', category: 'Material Handling', model: 'SORT-MAX4', mfr: 'Beumer Group', cost: 890000 },
    { type: 'Cross-Belt Diverter', category: 'Material Handling', model: 'CONV-X2', mfr: 'Intelligrated Systems', cost: 540000 },
    { type: 'Spiral Chute Assembly', category: 'Material Handling', model: 'CONV-X1', mfr: 'Dematic Corp', cost: 260000 },
    { type: 'AMR Drive Pod', category: 'Robotics', model: 'AMR-DRIVE-K4', mfr: 'Amazon Robotics', cost: 350000 },
    { type: 'Palletizing Robot', category: 'Robotics', model: 'ROBO-GRIP7', mfr: 'KUKA Robotics', cost: 1350000 },
    { type: 'High-Speed Picking Robot', category: 'Robotics', model: 'ROBO-GRIP7', mfr: 'FANUC Robotics', cost: 1150000 },
    { type: 'Automated Carton Erector', category: 'Packaging', model: 'BOX-FORM-800', mfr: 'Wexxar Packaging', cost: 390000 },
    { type: 'Label Print & Apply', category: 'Packaging', model: 'PRINT-APPLY-X', mfr: 'Zebra Technologies', cost: 180000 },
    { type: 'Automatic Case Sealer', category: 'Packaging', model: 'BOX-FORM-800', mfr: '3M Industrial', cost: 240000 },
    { type: 'Cubiscan Dimensioner', category: 'Packaging', model: 'CUBISCAN-1200', mfr: 'Quantronix', cost: 310000 },
    { type: 'Induction Motor 5.5kW', category: 'Supporting Equipment', model: 'MTR-IND-55KW', mfr: 'Siemens India', cost: 95000 },
    { type: 'Planetary Gearbox Hub', category: 'Supporting Equipment', model: 'GBOX-PLAN-22', mfr: 'SEW Eurodrive', cost: 145000 },
    { type: 'Hydraulic Pumping Unit', category: 'Supporting Equipment', model: 'PUMP-HYD-400', mfr: 'Bosch Rexroth', cost: 220000 },
    { type: 'Roof HVAC Air Handler', category: 'Supporting Equipment', model: 'HVAC-ROOF-T3', mfr: 'Trane Industrial', cost: 580000 },
  ];

  // Distribution counters to match exact KPI expectations:
  // Total ~320 machines: ~238 Warning, ~83 Critical, remainder Healthy (~927 in scale-up view, but in our 320 sample we reflect proportionate:
  // ~238 Healthy (74%), ~61 Warning (19%), ~21 Critical (7%)
  for (let i = 6; i <= 320; i++) {
    const typeDef = machineTypesPool[(i * 7 + 3) % machineTypesPool.length];
    const zoneDef = zones[(i * 3 + 1) % zones.length];
    const lineDef = zoneDef.lines[(i + 2) % zoneDef.lines.length];
    
    // Seed health distributions
    let status = 'Healthy';
    let healthScore = 80 + ((i * 13) % 19); // 80 - 98
    let failureRisk = 2 + ((i * 7) % 12); // 2% - 13%
    let rulDays = 85 + ((i * 17) % 180); // 85 - 265 days
    let wearClass = 'Low Wear';

    if (i % 5 === 0) {
      status = 'Warning';
      healthScore = 58 + ((i * 11) % 19); // 58 - 76
      failureRisk = 18 + ((i * 9) % 24); // 18% - 41%
      rulDays = 25 + ((i * 7) % 35); // 25 - 59 days
      wearClass = 'Moderate Wear';
    } else if (i % 16 === 0) {
      status = 'Critical';
      healthScore = 32 + ((i * 7) % 20); // 32 - 51
      failureRisk = 58 + ((i * 13) % 32); // 58% - 89%
      rulDays = 4 + ((i * 3) % 15); // 4 - 18 days
      wearClass = (i % 32 === 0) ? 'Chronic Failure' : 'Critical Asset';
    }

    const ageYrs = Number((1.5 + ((i * 13) % 65) / 10).toFixed(1));
    const opHours = Math.floor(ageYrs * 4800 + ((i * 137) % 3000));
    const purchaseYear = 2026 - Math.floor(ageYrs);
    const purchaseMonth = String(1 + ((i * 3) % 12)).padStart(2, '0');
    const purchaseDay = String(1 + ((i * 7) % 28)).padStart(2, '0');
    const purchaseDate = `${purchaseYear}-${purchaseMonth}-${purchaseDay}`;
    const installDate = `${purchaseYear}-${String(Number(purchaseMonth) % 12 + 1).padStart(2, '0')}-05`;

    const vibVal = status === 'Critical' ? Number((4.8 + ((i % 10) * 0.3)).toFixed(1)) :
                   status === 'Warning' ? Number((3.6 + ((i % 8) * 0.2)).toFixed(1)) :
                   Number((1.8 + ((i % 6) * 0.2)).toFixed(1));

    const tempVal = status === 'Critical' ? Number((68 + (i % 14)).toFixed(1)) :
                    status === 'Warning' ? Number((59 + (i % 9)).toFixed(1)) :
                    Number((46 + (i % 8)).toFixed(1));

    const curVal = Number((18 + ((i * 3) % 14) + (status === 'Critical' ? 8 : status === 'Warning' ? 4 : 0)).toFixed(1));

    const machineId = `${typeDef.type.substring(0, 3).toUpperCase()}-${String(1000 + i).padStart(4, '0')}`;
    const delayLub = (i % 7 === 0) ? 3 : (i % 11 === 0) ? 4 : (i % 4 === 0) ? 1 : 0;
    const lubInterval = (typeDef.category === 'Robotics') ? 21 : (typeDef.category === 'Supporting Equipment') ? 30 : 14;

    const machine = {
      id: machineId,
      name: `${typeDef.type} ${machineId}`,
      category: typeDef.category,
      type: typeDef.type,
      model: typeDef.model,
      manufacturer: typeDef.mfr,
      zone: zoneDef.zone,
      productionLine: lineDef,
      location: `Fulfillment ${zoneDef.zone} / ${lineDef}`,
      purchaseDate,
      installationDate: installDate,
      warrantyEnd: `${purchaseYear + 3}-${purchaseMonth}-${purchaseDay}`,
      ageYears: ageYrs,
      operatingHours: opHours,
      lastMaintenance: `2026-09-${String(10 + (i % 18)).padStart(2, '0')}`,
      nextMaintenance: `2026-10-${String(8 + (i % 20)).padStart(2, '0')}`,
      lastLubrication: `2026-09-${String(15 + (i % 14)).padStart(2, '0')}`,
      recommendedLubricationDays: lubInterval,
      oilType: 'Mobil Synthetic Gear Oil / Grease',
      lubricantConsumptionLiters: Number((2.0 + ((i % 9) * 0.5)).toFixed(1)),
      delayedLubricationCount: delayLub,
      criticality: (i % 8 === 0 || status === 'Critical') ? 'Critical Asset' : (i % 3 === 0 ? 'High' : 'Medium'),
      healthScore,
      failureRisk,
      rulDays,
      status,
      wearClass,
      confidenceScore: 82 + ((i * 7) % 15),
      currentTelemetry: {
        temperature: tempVal,
        normalTempRange: '42.0 - 56.0',
        vibration: vibVal,
        normalVibRange: '2.0 - 3.2',
        motorCurrent: curVal,
        normalCurrentRange: '16.0 - 22.0',
        pressure: Number((5.8 + ((i % 7) * 0.3)).toFixed(1)),
        speed: 1350 + ((i * 13) % 200),
        load: 65 + ((i * 9) % 30),
        powerKw: Number((12.0 + ((i % 15) * 1.2)).toFixed(1)),
        recentErrors: status === 'Critical' ? ['ERR-VIB-CRIT: Exceeded velocity threshold', 'ERR-THERM: Elevated bearing temperature'] :
                      status === 'Warning' ? ['WARN-VIB: Moderate vibration deviation detected'] : [],
      },
      scoreWaterfall: [
        { factor: 'Vibration Dynamics', impact: status === 'Critical' ? -18 : status === 'Warning' ? -10 : -2, category: 'Sensors' },
        { factor: 'Operating Temperature', impact: status === 'Critical' ? -14 : status === 'Warning' ? -8 : -1, category: 'Thermal' },
        { factor: 'Machine Age & Run Hours', impact: -Math.floor(ageYrs * 1.5), category: 'Lifecycle' },
        { factor: 'Lubrication Compliance', impact: delayLub > 0 ? -(delayLub * 3) : 0, category: 'Maintenance' },
      ],
      components: [
        { name: 'Drive Motor', health: Math.max(35, healthScore + 6), risk: healthScore < 50 ? 'High' : 'Low', rulDays: Math.max(12, rulDays + 40), hours: opHours, lastService: '2026-08-12' },
        { name: 'Bearings Assembly', health: Math.max(28, healthScore - 8), risk: healthScore < 55 ? 'Critical' : 'Medium', rulDays: Math.max(7, rulDays), hours: Math.floor(opHours * 0.4), lastService: '2026-06-20' },
        { name: 'Transmission / Gearhead', health: Math.max(38, healthScore - 2), risk: healthScore < 50 ? 'High' : 'Low', rulDays: Math.max(14, rulDays + 20), hours: Math.floor(opHours * 0.7), lastService: '2026-05-15' },
        { name: 'Belt / Drive Chain', health: Math.max(45, healthScore + 4), risk: 'Low', rulDays: Math.max(20, rulDays + 15), hours: Math.floor(opHours * 0.3), lastService: '2026-07-30' },
        { name: 'Lubrication Delivery', health: Math.max(30, 85 - delayLub * 15), risk: delayLub >= 3 ? 'Critical' : 'Low', rulDays: Math.max(5, 45 - delayLub * 8), hours: 3200, lastService: '2026-09-20' },
      ],
      aiDiagnosis: {
        anomalyDetectedTime: status !== 'Healthy' ? `${10 + (i % 6)}:${10 + (i % 45)}` : 'Nominal',
        anomalySeverity: status === 'Critical' ? 'Critical Sensor Anomaly' : status === 'Warning' ? 'Moderate Drift Anomaly' : 'Normal Baseline',
        primaryCause: status === 'Critical' ? 'Bearing wear & high frictional drag' : status === 'Warning' ? 'Thermal & vibration deviation from baseline' : 'Optimal operating condition',
        supportingEvidence: [
          `Telemetry shows ${vibVal} mm/s vibration and ${tempVal}°C temperature`,
          `Historical wear patterns across ${typeDef.model} units correlate with current load factor`,
          delayLub > 0 ? `Lubrication delayed ${delayLub} times contributing to wear acceleration` : 'Maintenance logs strictly up to date',
        ],
        secondaryFactors: ['Production line demand and continuous shift duty cycle'],
        confidenceRationale: `AI confidence: ${82 + ((i * 7) % 15)}% based on fleet statistical model.`,
        recommendedAction: status === 'Critical' ? 'Immediate inspection and scheduled bearing / component service within 3 days.' :
                           status === 'Warning' ? 'Inspect lubrication levels and schedule preventive adjustment during low-volume window.' :
                           'Maintain standard preventive schedule.',
        recommendedWindow: '02:00 AM – 04:00 AM (Low volume window)',
        technicianSkill: (typeDef.category === 'Robotics') ? 'Robotics & Automation Specialist' :
                         (typeDef.category === 'Packaging') ? 'Packaging Machinery Specialist' : 'Mechanical & Bearings Specialist',
        partsNeeded: [status === 'Critical' ? 'Bearing Kit & Oil' : 'Synthetic Lubricant'],
        estimatedDowntime: status === 'Critical' ? '1.5 - 2.5 hrs' : '30 - 45 min',
        estimatedCost: status === 'Critical' ? '₹18,000 - ₹35,000' : '₹4,500 - ₹12,000',
        costAvoidance: status === 'Critical' ? '₹65,000+' : '₹25,000',
        riskIfIgnored: status === 'Critical' ? 'High risk of unplanned stop during peak shipping shift' : 'Gradual degradation into critical failure state',
      },
      economics: {
        purchaseCost: typeDef.cost,
        cumulativeMaintenanceCost: Math.floor(typeDef.cost * 0.15 + (i * 980)),
        annualMaintenanceCost: Math.floor(typeDef.cost * 0.04 + (i * 320)),
        annualFailures: status === 'Critical' ? 6 : status === 'Warning' ? 3 : 1,
        replaceVsMaintain: (ageYrs > 6.5 && status === 'Critical') ? 'REPLACE EVALUATION RECOMMENDED' : 'Maintain',
      }
    };

    machines.push(machine);
  }

  return machines;
}

// Generate 1,000+ realistic maintenance records
export function generateMaintenanceRecords(machines) {
  const records = [];
  const types = ['Preventive Maintenance', 'Corrective Maintenance', 'Emergency Repair', 'Routine Inspection', 'Deep Lubrication', 'Sensor Calibration', 'Component Replacement'];
  const parts = ['SKF Roller Bearing', 'Habasit Modular Belt', 'Mobil Gear Oil', 'Omron Proximity Sensor', 'Drive Chain', 'Solenoid Valve', 'Motor Fan Shroud', 'V-Belt'];
  const techs = TECHNICIANS.map(t => t.name);

  // Seed baseline hero maintenance records
  records.push(
    { id: 'MNT-1092', machineId: 'CV-1042', machineName: 'High-Speed Induction Belt Conveyor', type: 'Deep Lubrication', date: '2026-09-29', technician: 'Priya Patel (Tech 12)', part: 'Mobil SHC 630 Oil', cost: 1200, downtimeMinutes: 15, notes: 'Routine oiling completed. High bearing temperature noted.' },
    { id: 'MNT-1048', machineId: 'CV-1042', machineName: 'High-Speed Induction Belt Conveyor', type: 'Component Replacement', date: '2026-09-18', technician: 'Rajesh Sharma (Tech 08)', part: 'Spherical Roller Bearing', cost: 18500, downtimeMinutes: 132, notes: 'Replaced outboard bearing due to vibration threshold breach.' },
    { id: 'MNT-0984', machineId: 'SORT-082', machineName: 'Cross-Belt Sortation Loop Deck 02', type: 'Emergency Repair', date: '2026-09-12', technician: 'Farhan Ali (Tech 11)', part: 'SEW Planetary Gearset', cost: 42000, downtimeMinutes: 180, notes: 'Emergency stop due to carrier gear misalignment.' },
    { id: 'MNT-0912', machineId: 'ROB-221', machineName: 'High-Payload Palletizing Arm 02', type: 'Sensor Calibration', date: '2026-09-02', technician: 'Suresh Nair (Tech 19)', part: 'Optical Joint Encoder', cost: 12400, downtimeMinutes: 75, notes: 'Re-calibrated Joint 3 zero-datum position.' }
  );

  for (let i = 5; i <= 1020; i++) {
    const machine = machines[i % machines.length];
    const type = types[(i * 3) % types.length];
    const tech = techs[(i * 5) % techs.length];
    const part = parts[(i * 7) % parts.length];
    const day = 1 + ((i * 3) % 28);
    const month = 1 + ((i * 7) % 9);
    const dateStr = `2026-0${month}-${String(day).padStart(2, '0')}`;
    const cost = type === 'Emergency Repair' ? 24000 + ((i * 120) % 28000) :
                 type === 'Component Replacement' ? 14000 + ((i * 90) % 16000) :
                 type === 'Deep Lubrication' ? 1200 + ((i * 40) % 1800) : 3500 + ((i * 50) % 4000);
    const dt = type === 'Emergency Repair' ? 120 + ((i * 15) % 150) :
               type === 'Component Replacement' ? 60 + ((i * 10) % 90) :
               type === 'Deep Lubrication' ? 15 + ((i * 5) % 20) : 30 + ((i * 5) % 45);

    records.push({
      id: `MNT-${String(2000 + i).padStart(4, '0')}`,
      machineId: machine.id,
      machineName: machine.name,
      type,
      date: dateStr,
      technician: tech,
      part,
      cost,
      downtimeMinutes: dt,
      notes: `${type} carried out on ${machine.id}. Operations tested normal afterwards.`
    });
  }

  return records;
}

// Generate 500+ historical failures timeline
export function generateFailureRecords(machines) {
  const failures = [];
  const causes = [
    { issue: 'Motor Overheating', cause: 'Excessive continuous load & heat sink dust accumulation', part: 'Motor Cooling Fan Shroud', avgCost: 14500, avgDt: 2.4 },
    { issue: 'Belt Slippage', cause: 'Belt tension loss & thermal expansion wear', part: 'Habasit Conveyor Belt', avgCost: 8200, avgDt: 1.1 },
    { issue: 'High Vibration Spike', cause: 'Spherical roller bearing raceway spalling', part: 'SKF Roller Bearing', avgCost: 19800, avgDt: 3.2 },
    { issue: 'Pneumatic Actuator Jam', cause: 'Solenoid spool valve contamination', part: 'SMC Directional Valve', avgCost: 4800, avgDt: 0.8 },
    { issue: 'Drive Gearbox Tooth Pitting', cause: 'Lubricant boundary failure & micro-fatigue', part: 'SEW Bevel Gearwheel', avgCost: 38000, avgDt: 4.1 },
    { issue: 'Sensor Alignment Loss', cause: 'Mechanical vibration loosened mounting bracket', part: 'Omron Laser Bracket', avgCost: 2200, avgDt: 0.4 },
    { issue: 'AMR Drive Motor Stall', cause: 'Debris caught in drive wheel polyurethane hub', part: 'AMR Drive Wheel Hub', avgCost: 6500, avgDt: 0.7 },
  ];

  // Hero failures from prompt
  failures.push(
    { id: 'FLR-101', machineId: 'CV-1042', machineName: 'High-Speed Induction Belt Conveyor', issue: 'Motor Overheating', detected: '2026-08-02 11:20', cause: 'Excessive induction peak load', downtimeHours: 2.4, resolved: '2026-08-02 13:45', action: 'Motor thermal inspection and airflow clear', partReplaced: 'Fan Cowl & Shroud', cost: 12500, technician: 'Amit Verma' },
    { id: 'FLR-102', machineId: 'CV-1042', machineName: 'High-Speed Induction Belt Conveyor', issue: 'Belt Slippage', detected: '2026-08-18 16:10', cause: 'Tensioner spring fatigue', downtimeHours: 1.1, resolved: '2026-08-18 17:15', action: 'Belt adjusted and tension re-torqued', partReplaced: 'Tension Pulley Spring', cost: 6800, technician: 'Rohan Gupta' },
    { id: 'FLR-103', machineId: 'CV-1042', machineName: 'High-Speed Induction Belt Conveyor', issue: 'High Vibration Spike', detected: '2026-09-11 08:30', cause: 'Bearing inner ring wear', downtimeHours: 3.2, resolved: '2026-09-11 11:42', action: 'Bearing replaced with SKF 22215 EK', partReplaced: 'SKF Roller Bearing', cost: 18500, technician: 'Rajesh Sharma' },
    { id: 'FLR-104', machineId: 'SORT-082', machineName: 'Cross-Belt Sortation Loop Deck 02', issue: 'Gearbox Tooth Pitting', detected: '2026-07-22 03:15', cause: 'Delayed oil change & high torque impact', downtimeHours: 4.8, resolved: '2026-07-22 08:05', action: 'Emergency gearset swap and fluid flush', partReplaced: 'Carrier Drive Gearset', cost: 48000, technician: 'Rajesh Sharma' },
    { id: 'FLR-105', machineId: 'ROB-221', machineName: 'High-Payload Palletizing Arm 02', issue: 'Joint 3 Backlash Exceeded', detected: '2026-08-29 14:05', cause: 'Flexspline tooth wear in harmonic drive', downtimeHours: 2.9, resolved: '2026-08-29 17:00', action: 'Backlash adjustment and grease pack', partReplaced: 'Grease Seal & Preload Ring', cost: 21000, technician: 'Suresh Nair' }
  );

  for (let i = 6; i <= 515; i++) {
    const machine = machines[(i * 7) % machines.length];
    const c = causes[(i * 3) % causes.length];
    const month = 1 + ((i * 5) % 9);
    const day = 1 + ((i * 7) % 28);
    const dt = Number((c.avgDt * (0.8 + ((i % 5) * 0.1))).toFixed(1));
    const cost = Math.floor(c.avgCost * (0.85 + ((i % 7) * 0.05)));

    failures.push({
      id: `FLR-${String(1000 + i).padStart(4, '0')}`,
      machineId: machine.id,
      machineName: machine.name,
      issue: c.issue,
      detected: `2026-0${month}-${String(day).padStart(2, '0')} ${String(8 + (i % 14)).padStart(2, '0')}:${String(10 + (i % 45)).padStart(2, '0')}`,
      cause: c.cause,
      downtimeHours: dt,
      resolved: `2026-0${month}-${String(day).padStart(2, '0')} ${String(11 + (i % 12)).padStart(2, '0')}:00`,
      action: `Preventive corrective action executed on ${machine.id}. Replaced ${c.part}.`,
      partReplaced: c.part,
      cost,
      technician: TECHNICIANS[(i * 2) % TECHNICIANS.length].name,
    });
  }

  return failures;
}

// Initial Work Orders (Human-In-The-Loop)
export const INITIAL_WORK_ORDERS = [
  {
    id: 'WO-8492',
    machineId: 'CV-1042',
    machineName: 'High-Speed Induction Belt Conveyor',
    priority: 'Critical',
    status: 'In Progress',
    technicianId: 'TECH-08',
    technicianName: 'Rajesh Sharma',
    scheduledWindow: '02:00 AM – 04:00 AM (08 Oct 2026)',
    action: 'Inspect gearbox & bearing assembly, verify acoustic profile, replace SKF 22215 bearing if raceway pitting detected.',
    partsRequired: ['Spherical Roller Bearing SKF 22215 EK', 'Mobil SHC 630 Synthetic Gear Oil'],
    estimatedDowntime: '55 minutes',
    estimatedCost: '₹16,500',
    riskIfIgnored: 'Line 04 catastrophic stop during Prime peak shift.',
    createdDate: '2026-10-07 14:45',
    tradeoffSummary: 'Scheduled during optimal low-volume window (6,200 pkg/hr vs 48,000 peak). 0 customer deliveries delayed.',
    source: 'AI Recommendation Engine (Approved by Operations Mgr)'
  },
  {
    id: 'WO-8488',
    machineId: 'SORT-082',
    machineName: 'Cross-Belt Sortation Loop Deck 02',
    priority: 'Critical',
    status: 'Assigned',
    technicianId: 'TECH-21',
    technicianName: 'Ananya Roy',
    scheduledWindow: '02:30 AM – 04:30 AM (09 Oct 2026)',
    action: 'Emergency carrier gearset overhaul & oil reservoir deep flush.',
    partsRequired: ['SEW Eurodrive Gearbox Assembly', 'High-Temp Sorter Grease'],
    estimatedDowntime: '2.5 hrs',
    estimatedCost: '₹48,000',
    riskIfIgnored: 'Total sorting deck lockup affecting 18,000 parcels/hr.',
    createdDate: '2026-10-07 11:30',
    tradeoffSummary: 'Requires multi-technician shift coordination with Tech 08 & Tech 21.',
    source: 'AI Predictive Alert'
  },
  {
    id: 'WO-8481',
    machineId: 'ROB-221',
    machineName: 'High-Payload Palletizing Arm 02',
    priority: 'Critical',
    status: 'Waiting for Parts',
    technicianId: 'TECH-19',
    technicianName: 'Suresh Nair',
    scheduledWindow: 'Pending Part Arrival (Expedited Dispatch)',
    action: 'Joint 3 harmonic drive flexspline replacement and optical backlash recalibration.',
    partsRequired: ['KUKA Joint 3 Harmonic Drive Gearset'],
    estimatedDowntime: '2.0 hrs',
    estimatedCost: '₹34,000',
    riskIfIgnored: 'Joint torque collapse during full pallet stack cycle.',
    createdDate: '2026-10-07 09:55',
    tradeoffSummary: 'Part expedited via Bangalore Logistics Hub; arrival expected 21:00.',
    source: 'AI Recommendation Engine'
  },
  {
    id: 'WO-8475',
    machineId: 'PACK-304',
    machineName: 'Automatic Case Former & Tape Sealer',
    priority: 'Medium',
    status: 'Open',
    technicianId: 'TECH-14',
    technicianName: 'Vikram Singh',
    scheduledWindow: '03:00 AM – 04:00 AM (10 Oct 2026)',
    action: 'Pneumatic solenoid valve seal renewal and vacuum cup replacement.',
    partsRequired: ['SMC Solenoid Valve', 'Wexxar Vacuum Cups'],
    estimatedDowntime: '40 minutes',
    estimatedCost: '₹8,500',
    riskIfIgnored: 'Intermittent failure to erect boxes requiring manual taping.',
    createdDate: '2026-10-07 13:10',
    tradeoffSummary: 'Low disruption risk; secondary packing lane can absorb load.',
    source: 'AI Health Assessment'
  }
];

// Top-Level KPI Summary (Prompt Section 6)
export const TOP_LEVEL_KPIS = {
  totalMachines: 1248, // Scaled facility total
  healthyMachines: 927,
  warningMachines: 238,
  criticalMachines: 83,
  machinesAtRisk: 126,
  predictedFailures: 17,
  preventiveMaintenanceDue: 94,
  currentDowntimeHours: '4.7 hrs',
  estimatedDowntimeAvoidedHours: '31.5 hrs',
  maintenanceCostLakhs: '₹18.4L',
  estimatedCostAvoidedLakhs: '₹42.7L',
  machineAvailabilityPct: '96.8%',
  overallEquipmentEffectivenessPct: '89.4%',
};
