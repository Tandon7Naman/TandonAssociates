import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LegalDisclaimerModal from "@/components/LegalDisclaimerModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tandon Associates - AI-Powered Legal Operations",
  description: "Streamline your legal operations with AI-powered contract management, case tracking, and compliance automation. For informational purposes only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LegalDisclaimerModal />
        {children}
        <Toaster />
        
        {/* BCI Rule 36 Compliance Footer */}
        <footer className="border-t bg-gray-50 py-6 mt-auto">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Disclaimer:</strong> This website is maintained by Tandon Associates for <strong>informational purposes only</strong> in compliance with <strong>Bar Council of India Rule 36</strong>. 
                  It does not constitute advertising, solicitation, or legal advice. Accessing this website does not create an attorney-client relationship. 
                  For specific legal advice, please consult with a qualified attorney.
                </p>
              </div>
              <div className="text-center text-xs text-gray-600">
                <p>© {new Date().getFullYear()} Tandon Associates. All rights reserved.</p>
                <p className="mt-1">Governed by the laws of India</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
