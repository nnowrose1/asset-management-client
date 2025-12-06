import React from "react";
import {
  FaUsersCog,
  FaCubes,
  FaExchangeAlt,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { MdDevices, MdWorkspacePremium } from "react-icons/md";

export default function AboutUs() {
  return (
    <div className="w-full text-secondary">
      {/* HERO SECTION */}
      <section className="w-full bg-primary text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">About AssetNexus</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          The complete HR & Asset Management ecosystem for modern companies.
          Manage employees, track assets, automate workflows — all in one place.
        </p>
      </section>

      {/* OUR MISSION */}
      <section className="py-16 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-primary">Our Mission </h2>
        <p className="text-lg text-accent max-w-3xl mx-auto leading-relaxed">
          We aim to eliminate manual tracking, confusion, and asset losses
          through a smart, automated system that connects HR, employees, and
          every physical asset inside an organization.
        </p>
      </section>

      {/* BANNER STRIPS — KEY BENEFITS */}
      <section className="w-full space-y-10 py-10">
        {/* Strip 1 */}
        <div className="w-full bg-gray-100 py-12 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <FaUsersCog className="text-primary text-6xl" />
            <div>
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                HR-Centric Workflow Automation
              </h3>
              <p className="text-accent max-w-3xl">
                From onboarding to approvals — AssetNexus gives HR a simplified,
                powerful system that requires no manual spreadsheets or
                tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Strip 2 */}
        <div className="w-full bg-gray-50 py-12 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8">
            <MdDevices className="text-primary text-6xl" />
            <div>
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                Track Every Asset Instantly
              </h3>
              <p className="text-accent max-w-3xl">
                Know exactly which employee has which laptop, monitor, chair, or
                device — always accurate and always up to date.
              </p>
            </div>
          </div>
        </div>

        {/* Strip 3 */}
        <div className="w-full bg-gray-100 py-12 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <FaExchangeAlt className="text-primary text-6xl" />
            <div>
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                Smart Request & Assignment Flow
              </h3>
              <p className="text-accent max-w-3xl">
                Employees request → HR approves → Asset assigned → Affiliation
                created automatically. Zero complexity. Zero confusion.
              </p>
            </div>
          </div>
        </div>

        {/* Strip 4 */}
        <div className="w-full bg-gray-50 py-12 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8">
            <FaShieldAlt className="text-primary text-6xl" />
            <div>
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                Enterprise Security & Reliability
              </h3>
              <p className="text-accent max-w-3xl">
                Role-based control, secure data handling, and reliable workflows
                ensure your company’s operations stay safe and smooth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — TIMELINE STYLE INSIDE BANNER */}
      <section className="bg-blue-50 py-20 px-6">
        <h2 className="text-3xl text-center font-semibold text-primary mb-10">
          How AssetNexus Works
        </h2>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <MdWorkspacePremium className="text-primary text-6xl" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-secondary">
                1. Register & Setup
              </h3>
              <p className="text-accent max-w-3xl">
                HR registers their company and receives the default starter
                package. Employees self-register and join the system.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-6">
            <div className="shrink-0">
              <FaUsersCog className="text-primary text-6xl" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-secondary">
                2. Smart Auto-Affiliation
              </h3>
              <p className="text-accent max-w-3xl">
                When an employee requests an asset, HR approval instantly links
                them to the company — no manual HR action required.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <FaCubes className="text-primary text-6xl" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-secondary">
                3. Full Asset Lifecycle
              </h3>
              <p className="text-accent max-w-3xl">
                HR adds inventory, assigns assets, approves requests, and
                handles optional return processes — everything tracked
                automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — BANNER STRIPS */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-12 text-center">
        <h2 className="text-3xl font-semibold text-primary">
          Why Companies Trust AssetNexus
        </h2>

        {/* Strip A */}
        <div className="bg-gray-100 py-10 px-6 rounded-xl">
          <FaChartLine className="text-primary text-6xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">
            Boost Organizational Productivity
          </h3>
          <p className="text-accent max-w-3xl mx-auto">
            Minimize time wasted on manual tracking and outdated spreadsheet
            systems.
          </p>
        </div>

        {/* Strip B */}
        <div className="bg-gray-50 py-10 px-6 rounded-xl">
          <FaShieldAlt className="text-primary text-6xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">
            Enterprise-Grade Control
          </h3>
          <p className="text-accent max-w-3xl mx-auto">
            Role-based actions ensure clarity, accountability, and secure
            operations.
          </p>
        </div>

        {/* Strip C */}
        <div className="bg-gray-100 py-10 px-6 rounded-xl">
          <MdDevices className="text-primary text-6xl mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Unified Dashboard</h3>
          <p className="text-accent max-w-3xl mx-auto">
            Every employee and every asset — finally in one organized place.
          </p>
        </div>
      </section>
    </div>
  );
}
