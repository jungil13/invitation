import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { supabase } from "../../lib/supabase";

export function RsvpModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [response, setResponse] = useState<"accept" | "decline" | "">("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !response) {
      setError("Please provide your name and response.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const { error: dbError } = await supabase
        .from("rsvp_responses")
        .insert([{ guest_name: name, response, message }]);
        
      if (dbError) throw dbError;
      
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        // Reset form
        setTimeout(() => {
          setSuccess(false);
          setName("");
          setResponse("");
          setMessage("");
        }, 300);
      }, 2500);
    } catch (err: any) {
      setError(err.message || "Failed to submit RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#2A1015] border-[#FFD700]/30 text-white" style={{ fontFamily: "'Raleway', sans-serif" }}>
        <DialogHeader>
          <DialogTitle className="text-3xl font-['Great_Vibes'] text-[#FFD700] text-center" style={{ fontFamily: "'Great Vibes', cursive" }}>RSVP</DialogTitle>
          <DialogDescription className="text-center text-[#FFE066]">
            Please let us know if you can make it!
          </DialogDescription>
        </DialogHeader>
        
        {success ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
            <p className="text-[#FFE066] text-sm">Your RSVP has been received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-[#FFD700]">Full Name</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#241846] border border-[#FFD700]/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                placeholder="Enter Your Full Name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-[#FFD700]">Will you attend?</label>
              <div className="flex gap-4">
                <label className={`flex-1 flex flex-col items-center justify-center gap-1 border rounded-md px-2 py-3 cursor-pointer transition-all ${response === 'accept' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-[#FFD700]/20 hover:border-[#FFD700]/50'}`}>
                  <input type="radio" name="response" value="accept" checked={response === 'accept'} onChange={() => setResponse('accept')} className="hidden" />
                  <span className="text-sm font-semibold text-[#FFD700]">Accept</span>
                  <span className="text-[10px] text-[#FFE066]">with pleasure</span>
                </label>
                <label className={`flex-1 flex flex-col items-center justify-center gap-1 border rounded-md px-2 py-3 cursor-pointer transition-all ${response === 'decline' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-[#FFD700]/20 hover:border-[#FFD700]/50'}`}>
                  <input type="radio" name="response" value="decline" checked={response === 'decline'} onChange={() => setResponse('decline')} className="hidden" />
                  <span className="text-sm font-semibold text-[#FFD700]">Decline</span>
                  <span className="text-[10px] text-[#FFE066]">with regret</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-[#FFD700]">Message (Optional)</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#241846] border border-[#FFD700]/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#FFD700] transition-colors min-h-[80px]"
                placeholder="Leave a message for the debutante..."
              />
            </div>
            
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8960C] text-[#241846] font-bold uppercase tracking-wider py-3 rounded-md transition-all hover:opacity-90 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? "Submitting..." : "Send RSVP"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
