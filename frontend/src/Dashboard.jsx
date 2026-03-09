import React, { useState, useEffect } from 'react';

/**
 * Smartour - Business Dashboard Component
 * Epic 1 & Epic 2 Implementation Simulation
 * Jira Ties: SMRTR-1 (AI Dashboard), SMRTR-2 (Flash Deals), SMRTR-5 (Kill-Switch)
 */
export default function SmartourDashboard() {
  const [dealActive, setDealActive] = useState(false);
  const [predictedTraffic, setPredictedTraffic] = useState("Low");
  const [claims, setClaims] = useState(0);
  const MAX_CAPACITY = 50; // US3: Capacity Control

  // Simulate pulling AI forecasting data
  useEffect(() => {
    console.log("Fetching AI density forecast...");
    // Fake AI logic setting the traffic state based on time/weather
  }, []);

  const handlePushDeal = () => {
    setDealActive(true);
    setClaims(0);
    alert("Flash deal pushed to local tourists! (Notification sent)");
  };

  const handleEmergencyStop = () => {
    setDealActive(false);
    alert("EMERGENCY OVERRIDE: Deal cancelled. Removed from tourist map.");
  };

  return (
    <div className="p-6 bg-slate-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Smartour Business Portal</h1>
      
      <div className="grid grid-cols-2 gap-6">
        {/* US1: AI Prediction Dashboard */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">AI Traffic Forecast</h2>
          <p>Next 2 Hours Expected Density: <span className="font-bold text-yellow-400">{predictedTraffic}</span></p>
          <p className="text-sm text-slate-400 mt-2">Optimal time to push flash deals: 2:00 PM - 4:00 PM</p>
        </div>

        {/* US2, US3 & US5: Deal Management */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">Predictive Flash Deals</h2>
          
          {!dealActive ? (
            <button 
              onClick={handlePushDeal}
              className="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded w-full transition"
            >
              Push 20% Off Deal Now
            </button>
          ) : (
            <div>
              <div className="flex justify-between mb-4">
                <span>Claims: {claims} / {MAX_CAPACITY}</span>
                <span className="text-emerald-400 font-bold">LIVE</span>
              </div>
              
              {/* US5: Emergency Override */}
              <button 
                onClick={handleEmergencyStop}
                className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded w-full transition"
              >
                🚨 PAUSE/END DEAL (Kill Switch)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
