/**
 * Smartour - Backend API Server Simulation
 * Handles AI Forecasting endpoints and Deal Capacity controls.
 * Jira Ties: SMRTR-3 (Capacity Control DB trackers)
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory fake database for simulation
let activeDeals = {};

// AI Forecasting Endpoint (US1)
app.get('/api/v1/forecast/density', (req, res) => {
    // Simulate complex AI calculation cross-referencing weather & season
    const aiForecast = {
        location: "Downtown Eco-Park",
        currentDensity: "Moderate",
        predictedSlowHour: "14:00",
        confidenceScore: 0.89
    };
    res.json(aiForecast);
});

// Create Flash Deal Endpoint (US2)
app.post('/api/v1/deals', (req, res) => {
    const { businessId, discount, maxCapacity } = req.body;
    
    const dealId = `deal_${Date.now()}`;
    activeDeals[dealId] = {
        businessId,
        discount,
        maxCapacity,
        currentClaims: 0,
        status: 'ACTIVE'
    };

    console.log(`Geofenced push notifications sent to users for Deal ${dealId}`);
    res.status(201).json({ message: "Deal activated", dealId });
});

// Claim Deal Endpoint - Includes Capacity Logic (US3)
app.post('/api/v1/deals/:dealId/claim', (req, res) => {
    const deal = activeDeals[req.params.dealId];

    if (!deal || deal.status !== 'ACTIVE') {
        return res.status(400).json({ error: "Deal unavailable or sold out." });
    }

    deal.currentClaims += 1;

    // Capacity Control Check
    if (deal.currentClaims >= deal.maxCapacity) {
        deal.status = 'SOLD_OUT';
        console.log(`[ALERT] Deal ${req.params.dealId} reached max capacity. Auto-deactivated.`);
    }

    res.json({ message: "Deal claimed successfully", remaining: deal.maxCapacity - deal.currentClaims });
});

app.listen(PORT, () => {
    console.log(`Smartour Backend API running on port ${PORT}`);
});
