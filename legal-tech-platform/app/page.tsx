'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Scale, FileText, Shield, Briefcase, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-blue-500/50">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
              Tandon Associates
            </span>
          </Link>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-base hover:bg-blue-50 transition-all duration-300 hover:scale-105">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 group">
                <span className="flex items-center gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative container mx-auto px-4 py-20 md:py-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[50%] top-0 h-[500px] w-[500px] -translate-x-[30%] rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
            <div className="absolute right-[20%] top-[20%] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl" />
          </div>
          
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Information about legal management software
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Professional Legal Management Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              A platform for contract management, case tracking, and compliance automation.
              Features AI-assisted analysis, document management, and workflow automation capabilities.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30">
                  View Platform
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-2 hover:bg-blue-50">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Informational access
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Demo available
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View features
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/30 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                FEATURES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Everything You Need for Legal Operations
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools to manage your entire legal workflow from a single platform
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                className="group relative bg-white p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredFeature(0)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`h-14 w-14 mb-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform duration-300 ${hoveredFeature === 0 ? 'scale-110 rotate-3' : ''}`}>
                    <FileText className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                    Contract Management
                    {hoveredFeature === 0 && <ArrowRight className="h-5 w-5 text-blue-600 animate-pulse" />}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    AI-powered contract lifecycle management with 8-stage workflow automation
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 0 ? 'text-blue-500' : 'text-blue-400'} transition-colors`} />
                      Create & track contracts
                    </li>
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 0 ? 'text-blue-500' : 'text-blue-400'} transition-colors`} />
                      AI contract analysis
                    </li>
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 0 ? 'text-blue-500' : 'text-blue-400'} transition-colors`} />
                      Automated workflows
                    </li>
                  </ul>
                </div>
              </div>
              
              <div 
                className="group relative bg-white p-8 rounded-2xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredFeature(1)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`h-14 w-14 mb-6 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 transition-transform duration-300 ${hoveredFeature === 1 ? 'scale-110 rotate-3' : ''}`}>
                    <Briefcase className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                    Case Management
                    {hoveredFeature === 1 && <ArrowRight className="h-5 w-5 text-orange-600 animate-pulse" />}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Track cases, court dates, and litigation with digital case files
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 1 ? 'text-orange-500' : 'text-orange-400'} transition-colors`} />
                      Case tracking & updates
                    </li>
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 1 ? 'text-orange-500' : 'text-orange-400'} transition-colors`} />
                      Court date reminders
                    </li>
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 1 ? 'text-orange-500' : 'text-orange-400'} transition-colors`} />
                      Document management
                    </li>
                  </ul>
                </div>
              </div>
              
              <div 
                className="group relative bg-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredFeature(2)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`h-14 w-14 mb-6 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform duration-300 ${hoveredFeature === 2 ? 'scale-110 rotate-3' : ''}`}>
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                    Compliance Tracking
                    {hoveredFeature === 2 && <ArrowRight className="h-5 w-5 text-purple-600 animate-pulse" />}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Stay compliant with automated regulatory tracking and audits
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 2 ? 'text-purple-500' : 'text-purple-400'} transition-colors`} />
                      Regulatory compliance
                    </li>
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 2 ? 'text-purple-500' : 'text-purple-400'} transition-colors`} />
                      Automated audits
                    </li>
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 2 ? 'text-purple-500' : 'text-purple-400'} transition-colors`} />
                      Risk scoring
                    </li>
                  </ul>
                </div>
              </div>
              
              <div 
                className="group relative bg-white p-8 rounded-2xl border-2 border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredFeature(3)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`h-14 w-14 mb-6 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform duration-300 ${hoveredFeature === 3 ? 'scale-110 rotate-3' : ''}`}>
                    <Scale className="h-7 w-7 text-white" />
                    {hoveredFeature === 3 && <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                    AI Legal Assistant
                    {hoveredFeature === 3 && <ArrowRight className="h-5 w-5 text-green-600 animate-pulse" />}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Get AI-powered insights, contract analysis, and risk assessment
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 3 ? 'text-green-500' : 'text-green-400'} transition-colors`} />
                      Contract analysis
                    </li>
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 3 ? 'text-green-500' : 'text-green-400'} transition-colors`} />
                      Risk assessment
                    </li>
                    <li className="flex items-center gap-2 transition-all duration-200 hover:translate-x-1">
                      <CheckCircle className={`h-4 w-4 ${hoveredFeature === 3 ? 'text-green-500' : 'text-green-400'} transition-colors`} />
                      Smart recommendations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Capabilities - Factual Description */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Comprehensive Legal Operations Platform
                </h2>
                <p className="text-lg text-muted-foreground">
                  A centralized system for managing contracts, cases, and compliance requirements.
                  Features AI-assisted analysis and workflow automation capabilities.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Contract Lifecycle Management</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>8-stage workflow from initiation to closure</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>AI-assisted clause analysis and risk identification</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Version control and document management</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Automated deadline tracking and reminders</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                  <h3 className="text-xl font-semibold mb-4 text-purple-900">Case Management System</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>Integration with eCourts services (CNR tracking)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>Proceedings timeline and court calendar</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>Legal research access (Indian Kanoon database)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>Document filing and hearing management</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                  <h3 className="text-xl font-semibold mb-4 text-green-900">Compliance Tracking</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Indian regulatory framework support (GST, Companies Act, etc.)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Due date monitoring and alert system</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Evidence and documentation management</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Audit trail and compliance reporting</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100">
                  <h3 className="text-xl font-semibold mb-4 text-orange-900">Collaboration Features</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>Team access with role-based permissions</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>Comments and internal communication</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>Activity logging for full transparency</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>Dashboard analytics and reporting tools</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                  Learn More About the Platform
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                  Explore the features and capabilities of our legal management system
                </p>
                <Link href="/register">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="text-lg px-8 group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Access Information
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Button>
                </Link>
                <p className="text-sm mt-4 opacity-75">
                  For informational purposes only • View demo • Explore features
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
