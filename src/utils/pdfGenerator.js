import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Generate Individual Machine Health Report Card (Prompt Section 37)
export function downloadMachineReportCard(machine) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header Banner
  doc.setFillColor(15, 23, 42); // Navy #0f172a
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Amazon / Facility branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('AMAZON FULFILLMENT CENTER | BLR-04 HYPER-HUB', 14, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(`AI PREDICTIVE MAINTENANCE & MACHINE HEALTH INTELLIGENCE REPORT • GENERATED ${new Date().toLocaleString()}`, 14, 20);

  // Status Badge in Header
  const statusColor = machine.status === 'Critical' ? [220, 38, 38] :
                      machine.status === 'Warning' ? [217, 119, 6] : [22, 163, 74];
  doc.setFillColor(...statusColor);
  doc.roundedRect(pageWidth - 48, 8, 34, 12, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(machine.status.toUpperCase(), pageWidth - 31, 15.5, { align: 'center' });

  // Section 1: Machine Identity Card
  let y = 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(`Machine Health Report Card: ${machine.id} - ${machine.name}`, 14, y);

  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Location: ${machine.location} | Category: ${machine.category} | Model: ${machine.model} (${machine.manufacturer})`, 14, y);

  // Metric Highlights Boxes
  y += 8;
  const cardW = (pageWidth - 28 - 9) / 4;
  const cards = [
    { label: 'HEALTH SCORE', val: `${machine.healthScore} / 100`, sub: machine.healthScore < 70 ? 'Degraded (-14 pts)' : 'Nominal', color: statusColor },
    { label: 'FAILURE RISK', val: `${machine.failureRisk}%`, sub: 'Next 14 Days', color: statusColor },
    { label: 'REMAINING USEFUL LIFE', val: `${machine.rulDays} Days`, sub: 'Estimated RUL', color: [2, 132, 199] },
    { label: 'OPERATING HOURS', val: `${machine.operatingHours.toLocaleString()} hrs`, sub: `Age: ${machine.ageYears} yrs`, color: [71, 85, 105] },
  ];

  cards.forEach((c, idx) => {
    const x = 14 + idx * (cardW + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, y, cardW, 20, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(c.label, x + 4, y + 6);

    doc.setFontSize(13);
    doc.setTextColor(...c.color);
    doc.text(c.val, x + 4, y + 13);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(c.sub, x + 4, y + 17.5);
  });

  // Section 2: Sensor Health & Telemetry Table
  y += 26;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Real-Time Telemetry & Vibration Analysis', 14, y);

  const telemetryData = [
    ['Vibration (RMS)', `${machine.currentTelemetry.vibration} mm/s`, `${machine.currentTelemetry.normalVibRange} mm/s`, machine.currentTelemetry.vibration > 3.4 ? '+71% DEVIATION (ABNORMAL)' : 'NORMAL'],
    ['Operating Temperature', `${machine.currentTelemetry.temperature}°C`, `${machine.currentTelemetry.normalTempRange}°C`, machine.currentTelemetry.temperature > 58 ? '+11°C ELEVATED' : 'NORMAL'],
    ['Motor Current', `${machine.currentTelemetry.motorCurrent} A`, `${machine.currentTelemetry.normalCurrentRange} A`, machine.currentTelemetry.motorCurrent > 24 ? '+19% PEAK DRAW' : 'NORMAL'],
    ['Line Operating Load', `${machine.currentTelemetry.load}%`, '60% - 75%', 'Sustained Prime Surge'],
    ['Lubrication Status', `Last: ${machine.lastLubrication}`, `Every ${machine.recommendedLubricationDays} days`, machine.delayedLubricationCount > 0 ? `OVERDUE BY ${machine.delayedLubricationCount * 2} DAYS` : 'UP TO DATE'],
  ];

  autoTable(doc, {
    startY: y + 3,
    head: [['Sensor / Parameter', 'Current Value', 'Normal Envelope', 'AI Diagnostic Status']],
    body: telemetryData,
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 8, textColor: [51, 65, 85] },
    columnStyles: {
      3: { fontStyle: 'bold', textColor: [185, 28, 28] }
    },
    margin: { left: 14, right: 14 },
  });

  // Section 3: Component Health Breakdown
  y = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Component Breakdown & Remaining Useful Life (RUL)', 14, y);

  const componentRows = machine.components.map(c => [
    c.name,
    `${c.health}%`,
    c.risk.toUpperCase(),
    `${c.rulDays} Days`,
    `${c.hours.toLocaleString()} hrs`,
    c.lastService
  ]);

  autoTable(doc, {
    startY: y + 3,
    head: [['Component', 'Health Score', 'Risk Level', 'Est. RUL', 'Operating Hours', 'Last Service']],
    body: componentRows,
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 8, textColor: [51, 65, 85] },
    margin: { left: 14, right: 14 },
  });

  // Section 4: AI Root Cause Analysis & Preventive Recommendation
  y = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('3. AI Root Cause Analysis & Preventive Maintenance Action', 14, y);

  y += 5;
  doc.setFillColor(254, 242, 242); // Light red/pink tint
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(14, y, pageWidth - 28, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(153, 27, 27);
  doc.text(`PRIMARY CAUSE: ${machine.aiDiagnosis.primaryCause}`, 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`• Supporting Evidence: ${machine.aiDiagnosis.supportingEvidence[0]}`, 18, y + 12);
  doc.text(`• Thermal & Lubrication: ${machine.aiDiagnosis.supportingEvidence[1]} | ${machine.aiDiagnosis.supportingEvidence[2]}`, 18, y + 17);
  doc.text(`• AI Confidence: ${machine.confidenceScore}% (${machine.aiDiagnosis.confidenceRationale})`, 18, y + 22);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`RECOMMENDED ACTION: ${machine.aiDiagnosis.recommendedAction}`, 18, y + 28);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Optimal Window: ${machine.aiDiagnosis.recommendedWindow} | Tech Required: ${machine.aiDiagnosis.technicianSkill}`, 18, y + 33);

  // Section 5: Financial Impact & Risk
  y += 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('4. Financial ROI, Downtime Exposure & Tradeoff', 14, y);

  const econData = [
    ['Estimated Preventive Repair Cost', machine.aiDiagnosis.estimatedCost, 'Parts & technician allocation'],
    ['Estimated Unplanned Failure Cost', '₹85,000+', 'Emergency parts express shipping + Line 04 idle labor'],
    ['Projected Cost Avoidance', machine.aiDiagnosis.costAvoidance, 'Net positive operational savings'],
    ['Estimated Preventive Downtime', machine.aiDiagnosis.estimatedDowntime, 'Executed during low-volume window (02:00-04:00 AM)'],
    ['Risk if Action Ignored', machine.aiDiagnosis.riskIfIgnored, 'High operational risk'],
  ];

  autoTable(doc, {
    startY: y + 3,
    head: [['Economic Factor', 'Value / Metric', 'Operational Context']],
    body: econData,
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 8, textColor: [51, 65, 85] },
    columnStyles: {
      1: { fontStyle: 'bold', textColor: [2, 132, 199] }
    },
    margin: { left: 14, right: 14 },
  });

  // Footer Tagline
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Predict the failure. Prevent the downtime. • Amazon Fulfillment Center AI Machine Health Intelligence', pageWidth / 2, footerY, { align: 'center' });

  // Save PDF
  doc.save(`Machine_Health_Report_${machine.id}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

// Generate Facility-Wide Maintenance Report (Prompt Section 38)
export function downloadFacilityMaintenanceReport(machines, kpis, topAlerts) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text('AMAZON BLR-04 HYPER-HUB | FACILITY MAINTENANCE REPORT', 14, 12);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(`EXECUTIVE OPERATIONAL BRIEFING • ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 20);

  let y = 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Executive KPI Summary & Fleet Reliability', 14, y);

  y += 5;
  const kpiData = [
    ['Total Monitored Machines', `${kpis.totalMachines}`, 'Overall Equipment Effectiveness (OEE)', `${kpis.overallEquipmentEffectivenessPct}`],
    ['Healthy Assets', `${kpis.healthyMachines} (${((kpis.healthyMachines/kpis.totalMachines)*100).toFixed(1)}%)`, 'Machine Availability', `${kpis.machineAvailabilityPct}`],
    ['Assets in Warning State', `${kpis.warningMachines} (${((kpis.warningMachines/kpis.totalMachines)*100).toFixed(1)}%)`, 'Estimated Downtime Avoided', `${kpis.estimatedDowntimeAvoidedHours}`],
    ['Critical Risk Assets', `${kpis.criticalMachines} (${((kpis.criticalMachines/kpis.totalMachines)*100).toFixed(1)}%)`, 'Projected Cost Avoided', `${kpis.estimatedCostAvoidedLakhs}`],
    ['Predicted Failures (14 Days)', `${kpis.predictedFailures} Assets`, 'Preventive Maintenance Due', `${kpis.preventiveMaintenanceDue} Work Orders`],
  ];

  autoTable(doc, {
    startY: y,
    head: [['Operational Metric', 'Current Value', 'Reliability Index', 'Benchmark Target']],
    body: kpiData,
    theme: 'grid',
    headStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 8, textColor: [51, 65, 85] },
    margin: { left: 14, right: 14 },
  });

  y = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Top Critical Priority Assets Requiring Intervention', 14, y);

  const criticalMachines = machines.filter(m => m.status === 'Critical').slice(0, 10).map(m => [
    m.id,
    m.name,
    m.location,
    `${m.healthScore}/100`,
    `${m.failureRisk}%`,
    `${m.rulDays}d`,
    m.aiDiagnosis.recommendedAction.substring(0, 48) + '...'
  ]);

  autoTable(doc, {
    startY: y + 3,
    head: [['Machine ID', 'Asset Name', 'Location', 'Health', 'Risk', 'RUL', 'AI Action']],
    body: criticalMachines,
    theme: 'grid',
    headStyles: { fillColor: [220, 38, 38], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 7.5, textColor: [51, 65, 85] },
    margin: { left: 14, right: 14 },
  });

  y = doc.lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. AI Strategic Directives for Operations Management', 14, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('• Priority 1: Schedule CV-1042 bearing replacement during 02:00 AM - 04:00 AM window to avoid ₹85,000 peak disruption.', 14, y);
  doc.text('• Priority 2: Decommission or complete structural rebuild of Sorter SORT-082 (maintenance cost has breached 52% of replacement cost).', 14, y + 5);
  doc.text('• Priority 3: Reorder SKF 22215 EK bearings and Mobil SHC 630 gear oil to replenish 30-day forecasted deficit.', 14, y + 10);
  doc.text('• Priority 4: Assign Technician 08 (Rajesh Sharma) and Technician 12 (Priya Patel) to Zone B induction trunk line overhaul.', 14, y + 15);

  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Predict the failure. Prevent the downtime. • Generated by Amazon AI PredictiveOps Platform', pageWidth / 2, footerY, { align: 'center' });

  doc.save(`Amazon_FC_Facility_Maintenance_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
