import React from 'react';
import SectionHeader from '../../components/Common/SectionHeader';
import '../../styles/RepairProtectionPage.css';

const RepairProtectionPage = () => {
  return (
    <div className="repair-protection-page">
      <SectionHeader title="Repair & Protection" subtitle="Keep your devices in top condition with our protection and repair services." />

      <div className="diagnostic-tools-section">
        {/* Placeholder content for Diagnostic Tools */}
        <h3>Diagnostic Tools</h3>
        <p>Identify issues with your device and get guidance for resolving them.</p>
      </div>

      <div className="protection-plans-section">
        {/* Placeholder content for Protection Plans */}
        <h3>Protection Plans</h3>
        <p>Explore our extended warranties and theft protection plans.</p>
      </div>

      <div className="repair-services-section">
        {/* Placeholder content for Repair Services */}
        <h3>Repair Services</h3>
        <p>Book a repair or find a service center near you.</p>
      </div>
    </div>
  );
};

export default RepairProtectionPage;
