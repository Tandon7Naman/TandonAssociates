'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get personalized suggestions
  const { data: suggestions } = useQuery({
    queryKey: ['ai-suggestions'],
    queryFn: async () => {
      const response = await fetch('/api/ai/suggestions');
      if (!response.ok) return [];
      return response.json();
    },
    enabled: isOpen
  });

  // Chat mutation
  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context: {
            path: window.location.pathname,
            timestamp: new Date().toISOString()
          }
        })
      });
      if (!response.ok) throw new Error('Failed to get response');
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    chatMutation.mutate(userMessage);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Floating Toggle */}
      <Button
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50",
          isOpen ? "rotate-90" : "rotate-0"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      {/* Assistant Panel */}
      <div className={cn(
        "fixed bottom-24 right-6 w-[400px] h-[600px] bg-background border rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform z-50",
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
      )}>
        <Card className="flex flex-col h-full border-none shadow-none">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-2xl p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <CardTitle className="text-lg">AI Legal Assistant</CardTitle>
                <p className="text-xs opacity-80">Online | Learning from your patterns</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
            {/* Suggestions */}
            {messages.length === 0 && suggestions && suggestions.length > 0 && (
              <div className="p-4 border-b bg-muted/30">
                <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Suggestions for you
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s: any, i: number) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      className="text-[10px] h-7"
                      onClick={() => {
                        setInput(s.suggestion);
                        // handleSend() can't be called here easily without setInput first, 
                        // better just set input and let user click send or handle it
                      }}
                    >
                      {s.suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat History */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-2">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">How can I help you today?</h3>
                  <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
                    Ask me about case precedents, legal research, or managing your documents.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-2",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.role === 'user' ? "bg-muted" : "bg-primary/10"
                  )}>
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm max-w-[80%]",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {chatMutation.isPending && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-background mt-auto">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a legal question..."
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSend} disabled={chatMutation.isPending}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-2">
                AI can make mistakes. Verify legal information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
