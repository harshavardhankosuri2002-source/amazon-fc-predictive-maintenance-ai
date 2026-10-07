# Amazon Fulfillment Center Predictive Maintenance & Machine Health Intelligence Platform

> **"Predict the failure. Prevent the downtime."**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel%20Production-0284c7?style=for-the-badge&logo=vercel)](https://predictive-maintenance-ai-six.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-1e293b?style=for-the-badge&logo=github)](https://github.com/harshavardhankosuri2002-source/amazon-fc-predictive-maintenance-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](https://opensource.org/licenses/MIT)

### 🌐 Live Application: [https://predictive-maintenance-ai-six.vercel.app](https://predictive-maintenance-ai-six.vercel.app)
### 📦 GitHub Repository: [https://github.com/harshavardhankosuri2002-source/amazon-fc-predictive-maintenance-ai](https://github.com/harshavardhankosuri2002-source/amazon-fc-predictive-maintenance-ai)

A production-grade, real-time AI-powered machine health intelligence and predictive maintenance platform engineered for high-throughput automated logistics environments (Amazon Fulfillment Center BLR-04 Hyper-Hub).

---

## 🌟 Executive Summary

Unexpected equipment breakdowns in robotic fulfillment centers trigger severe cascading disruptions: order processing backlogs, emergency repair surcharges, missed Prime shipping SLAs, and unbalanced technician workloads.

**PredictiveOps AI** transforms industrial asset management from **reactive fire-fighting** into **predictive, production-aware operations**. By fusing high-frequency telemetry (vibration, temperature, current, load) with historical cohort failures and 24-hour fulfillment volume curves, the system predicts mechanical breakdowns days in advance and prescribes targeted interventions during zero-impact maintenance windows.

---

## 🏗️ Architectural Capabilities

### 1. Facility Command Center & Executive Overview
- **Top-Level KPI Fleet Tracking**:
  - **1,248** Total Monitored Machines (320-asset live simulation cohort)
  - **96.8%** Machine Availability & **89.4%** Overall Equipment Effectiveness (OEE)
  - **₹42.7L** Estimated Cost Avoided (ROI 2.32× vs. preventive maintenance spend)
  - **31.5 hrs** Unplanned Downtime Avoided
- **Facility Health Distribution**: Proportional status allocation across healthy, warning, and critical assets.
- **Critical Action Queue**: Ranked AI recommendations requiring human manager sign-off.

### 2. Closed-Loop 16-Step Guided Demonstration Flow
A built-in interactive walkthrough that guides operations teams through the end-to-end decision chain:
$$\text{Sense} \rightarrow \text{Detect} \rightarrow \text{Predict} \rightarrow \text{Explain} \rightarrow \text{Tradeoff} \rightarrow \text{Prescribe} \rightarrow \text{Act} \rightarrow \text{Report}$$
- Injects anomalous vibration harmonic (+71% above baseline) into Induction Conveyor `CV-1042`.
- Tracks health degradation (`82 → 67/100`) and failure probability escalation (`9% → 68%`).
- Identifies bearing spalling initiated by a 5-day overdue lubrication interval.
- Calculates production tradeoff against the 48,000 packages/hr Prime rush and selects the **02:00 AM – 04:00 AM low-volume window** (6,200 packages/hr).
- Generates Work Order `#WO-8492` assigned to Technician 08 (Rajesh Sharma).
- Compiles and exports an audit-ready **Machine Health Report Card (PDF)**.

### 3. Machine Digital Twin & Explanatory AI
- **360° Profile View**: Hardware specs, installation date, operating hours (31,842 hrs), lubrication intervals, and maintenance records.
- **"Why?" Factor Waterfall**: Mathematical decomposition of penalty drivers:
  - Bearing vibration (+71%): `-15 pts`
  - Elevated motor temperature (68.4°C): `-10 pts`
  - Operating age (5.5 yrs): `-7 pts`
  - Overdue lubrication: `-6 pts`
  - Line induction load: `-4 pts`
- **"What Should I Do?" Action Sheet**: Prescriptive 8-point action plan detailing required technician skill, spare parts, window, downtime, cost, and consequence of deferral.
- **Real-Time Sensor Telemetry**: Interactive time-series selectors (`1h`, `6h`, `24h`, `7d`, `30d`, `90d`) for Vibration RMS, Temperature, Motor Current, Pressure, Speed, and Load.
- **Replace vs. Maintain Economics**: Evaluates aging equipment (e.g., Sorter `SORT-082`, 11 failures/yr, ₹4.8L maintenance) against capital replacement ROI.

### 4. Interactive 2D Facility Floor Heatmap
- Spatial warehouse map covering:
  - **Zone A**: Inbound Staging & Decant
  - **Zone B**: Induction & High-Speed Merge (CV-1042)
  - **Zone C**: Multi-Tier Pick Tower (ROB-221)
  - **Zone D**: Sortation Matrix Deck (SORT-082)
  - **Zone E**: Packaging Lines 01–12 (PACK-304)
  - **Zone F**: Outbound Shipping Docks & Diverters
  - **Zone G**: Autonomous AMR Floor Grid
- Interactive colored nodes with hover telemetry tooltips and one-click Digital Twin modal launch.

### 5. Production-Aware Scheduling & Tradeoff Optimization
- **24-Hour Fulfillment Load Curve**: Visualizes peak periods (14:00–22:00 at 48,000 packages/hr) vs. the optimal low-impact window (02:00 AM – 04:00 AM at 6,200 packages/hr).
- **Maintenance Priority Formula**:
  $$\text{Priority} = \text{Failure Risk} \times \text{Production Impact} \times \text{Machine Criticality} \times \text{Repair Lead Time}$$

### 6. Failure Analytics & Wear Classification
- **Wear Quadrant**: Low Wear, Moderate Wear, High Wear, Chronic Failure, and Critical Assets.
- **Cross-Model Benchmark**: Demonstrates that model `CONV-X2` has 2.5× the failure rate of `CONV-X1`.
- **Part Failure Analytics**: Ranks failure frequency, average lifespan, and costs for roller bearings, belts, motors, and gearboxes.
- **Component RUL**: Visualizes RUL confidence intervals (e.g., Bearings: 18–26 days, Gearboxes: 68–85 days).

### 7. What-If Maintenance Delay Simulator
- Interactive slider from **0 to 30 days** allowing operations managers to test: *"What happens if I delay maintenance by X days?"*
- Recalculates failure risk (+3.8%/day), unplanned downtime exposure, and financial loss in real time.

### 8. AI Maintenance Copilot
- Natural language agent with pre-configured quick prompts:
  - *"Which machines are most likely to fail this week?"*
  - *"Why is CV-1042 unhealthy?"*
  - *"Which machines need lubrication?"*
  - *"Generate a maintenance plan for tomorrow"*
- Answers with machine telemetry and links to inspect twins or approve work orders.

### 9. Audit-Ready Report Downloads (PDF & CSV)
- **Machine Health Report Card (PDF)**: Generated client-side via `jsPDF` with machine metadata, telemetry charts, component RUL, root causes, and cost avoidance metrics.
- **Facility Maintenance Report (PDF)**: Executive briefing on fleet reliability and top critical assets.
- **CSV Exports**: Full export capabilities for 320 fleet assets, 1,000+ maintenance logs, and 500+ historical failures.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, Vite 5, JavaScript (ES Modules)
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens (Enterprise Industrial Theme)
- **Icons**: Lucide React
- **Document Generation**: jsPDF, jsPDF-AutoTable
- **State & Simulation**: React Context API, Gaussian Telemetry Walk Engine, Event-Driven Scenario Triggers

---

## 🚀 Quickstart Local Setup

```bash
# Clone the repository
git clone https://github.com/harshavardhankosuri2002-source/amazon-fc-predictive-maintenance-ai.git

# Navigate into project directory
cd amazon-fc-predictive-maintenance-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📄 License

MIT License. Engineered for Amazon-style fulfillment center operational intelligence.
