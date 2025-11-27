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
                  Get Started
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
              Transform your legal operations with AI
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Professional Legal Management Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline contract management, case tracking, and compliance automation.
              Save time, reduce risk, and make better decisions with <span className="text-blue-600 font-semibold">AI-powered insights</span>.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30">
                  Start Free Trial
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
                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancel anytime
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

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Save Time and Reduce Risk
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our AI-powered platform helps legal teams work smarter, not harder.
                  Automate routine tasks and focus on what matters most.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 group hover:translate-x-2 transition-all duration-300">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-green-500 group-hover:scale-110">
                      <span className="text-green-600 font-bold group-hover:text-white transition-colors">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 group-hover:text-green-600 transition-colors">75% Faster Contract Review</h4>
                      <p className="text-sm text-muted-foreground">
                        AI-powered analysis reduces review time from days to hours
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 group hover:translate-x-2 transition-all duration-300">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-green-500 group-hover:scale-110">
                      <span className="text-green-600 font-bold group-hover:text-white transition-colors">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 group-hover:text-green-600 transition-colors">90% Risk Reduction</h4>
                      <p className="text-sm text-muted-foreground">
                        Catch potential issues before they become problems
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 group hover:translate-x-2 transition-all duration-300">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-green-500 group-hover:scale-110">
                      <span className="text-green-600 font-bold group-hover:text-white transition-colors">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 group-hover:text-green-600 transition-colors">100% Compliance Confidence</h4>
                      <p className="text-sm text-muted-foreground">
                        Automated compliance tracking ensures nothing falls through the cracks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Contract Review Time</span>
                      <span className="font-bold">-75%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-3/4 rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Risk Detection Rate</span>
                      <span className="font-bold">+90%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[90%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Compliance Score</span>
                      <span className="font-bold">98%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[98%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Trusted by Legal Teams Worldwide
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-yellow-500 transition-transform duration-200 hover:scale-125">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "This platform has transformed how we manage contracts. The AI analysis
                  saves us hours of manual review time."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="font-semibold text-blue-600">JS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">General Counsel, Tech Corp</p>
                  </div>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg border hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-yellow-500 transition-transform duration-200 hover:scale-125">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a comprehensive solution for legal operations. The compliance
                  tracking alone is worth the investment."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="font-semibold text-green-600">MD</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Davis</p>
                    <p className="text-sm text-muted-foreground">Legal Director, Finance Co</p>
                  </div>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg border hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-yellow-500 transition-transform duration-200 hover:scale-125">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The case management features are excellent. We can track everything
                  in one place and never miss a deadline."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="font-semibold text-purple-600">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Partner, Law Firm LLP</p>
                  </div>
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
                  Ready to Transform Your Legal Operations?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                  Join thousands of legal professionals who trust our platform
                </p>
                <Link href="/register">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="text-lg px-8 group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Free Trial Today
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Button>
                </Link>
                <p className="text-sm mt-4 opacity-75">
                  No credit card required • Full access • 14-day free trial
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Tandon Associates. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
