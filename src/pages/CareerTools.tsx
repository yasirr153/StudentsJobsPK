import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  UserRound, 
  Zap, 
  SearchCode, 
  Mail, 
  Copy, 
  Download, 
  RefreshCw, 
  Loader2, 
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { 
  generateCoverLetter, 
  improveResume, 
  simplifyJobDescription, 
  extractSkills, 
  generateEmail,
  generateCoverLetterFromResume
} from '../services/aiToolsService';
import { cn } from '../lib/utils';

type ToolType = 'cover-letter' | 'resume-to-cl' | 'resume' | 'simplify' | 'skills' | 'email';

const TOOLS = [
  { id: 'cover-letter', name: 'Cover Letter', icon: FileText, description: 'Generate professional cover letters' },
  { id: 'resume-to-cl', name: 'Resume to CL', icon: FileText, description: 'Build a cover letter from your CV' },
  { id: 'resume', name: 'Resume Improver', icon: UserRound, description: 'Fix grammar and enhance your CV' },
  { id: 'simplify', name: 'JD Simplifier', icon: Zap, description: 'Understand complex job descriptions' },
  { id: 'skills', name: 'Skill Extractor', icon: SearchCode, description: 'Identify must-have tools & skills' },
  { id: 'email', name: 'Email Generator', icon: Mail, description: 'Write application & follow-up emails' },
];

export default function CareerTools() {
  const [activeTool, setActiveTool] = useState<ToolType>('cover-letter');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    skills: '',
    experienceLevel: 'Entry Level',
    tone: 'formal' as 'formal' | 'casual',
    length: 'short' as 'short' | 'detailed',
    resumeText: '',
    jdText: '',
    emailType: 'Application' as 'Application' | 'Follow-up' | 'Inquiry'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setOutput(null);
    try {
      let result = '';
      switch (activeTool) {
        case 'cover-letter':
          result = await generateCoverLetter(formData);
          break;
        case 'resume-to-cl':
          result = await generateCoverLetterFromResume({
            resumeText: formData.resumeText,
            jobTitle: formData.jobTitle,
            companyName: formData.companyName
          });
          break;
        case 'resume':
          result = await improveResume(formData.resumeText);
          break;
        case 'simplify':
          result = await simplifyJobDescription(formData.jdText);
          break;
        case 'skills':
          result = await extractSkills(formData.jdText);
          break;
        case 'email':
          result = await generateEmail({ 
            type: formData.emailType, 
            jobTitle: formData.jobTitle, 
            companyName: formData.companyName 
          });
          break;
      }
      setOutput(result);
    } catch (error) {
      console.error("Tool execution failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = () => {
    if (!output) return;
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const splitText = doc.splitTextToSize(output, pageWidth - (margin * 2));
    doc.text(splitText, margin, 20);
    doc.save(`${activeTool}-result.pdf`);
  };

  return (
    <div className="pt-24 pb-20 bg-app-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
             <Zap className="w-3.5 h-3.5 text-primary" />
             <span className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Powered Career Suite</span>
          </div>
          <h1 className="text-4xl font-black text-text-main tracking-tight mb-3 italic">AI Career Tools</h1>
          <p className="text-text-muted font-medium max-w-2xl mx-auto">
            Supercharge your job applications with Pakistani student-focused AI tools. 
            From cover letters to CV optimization.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id as ToolType);
                setOutput(null);
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border",
                activeTool === tool.id 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-white text-text-muted border-border-main hover:border-primary/30"
              )}
            >
              <tool.icon className="w-4 h-4" />
              {tool.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Panel */}
          <motion.div 
            layout
            className="bg-white border border-border-main rounded-2xl p-6 shadow-xl shadow-black/5"
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                 {TOOLS.find(t => t.id === activeTool)?.icon && React.createElement(TOOLS.find(t => t.id === activeTool)!.icon, { className: 'w-5 h-5' })}
               </div>
               <div>
                 <h2 className="text-lg font-bold text-text-main leading-none">Configure Tool</h2>
                 <p className="text-xs text-text-muted mt-1">{TOOLS.find(t => t.id === activeTool)?.description}</p>
               </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider self-center mr-2">Quick Presets:</span>
                {[
                  { label: 'Internship', data: { jobTitle: 'Summer Intern', companyName: 'Google', skills: 'Learning, Adaptability, Basic Coding', experienceLevel: 'Intern' } },
                  { label: 'Fresh Grad', data: { jobTitle: 'Associate Developer', companyName: 'Systems Ltd', skills: 'React, Node.js, Problems Solving', experienceLevel: 'Entry Level' } },
                  { label: 'Remote', data: { jobTitle: 'Remote Support', companyName: 'Remote-First Corp', skills: 'Communication, Zoom, Independent Work', experienceLevel: 'Associate' } }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setFormData(prev => ({ ...prev, ...preset.data }))}
                    className="text-[10px] px-2 py-1 rounded-md bg-app-bg border border-border-main hover:border-primary/50 text-text-muted hover:text-primary transition-all font-bold"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {(activeTool === 'cover-letter' || activeTool === 'email' || activeTool === 'resume-to-cl') && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Job Title</label>
                      <input 
                        type="text" 
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="e.g. Frontend Developer" 
                        className="w-full px-4 py-3 rounded-xl border border-border-main text-sm focus:border-primary outline-none transition-all bg-app-bg/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Company</label>
                      <input 
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Systems Ltd" 
                        className="w-full px-4 py-3 rounded-xl border border-border-main text-sm focus:border-primary outline-none transition-all bg-app-bg/30"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTool === 'cover-letter' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Your Key Skills</label>
                    <textarea 
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="React, TypeScript, Tailwind..." 
                      className="w-full px-4 py-3 rounded-xl border border-border-main text-sm focus:border-primary outline-none transition-all bg-app-bg/30 min-h-[80px]"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                     <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Exp Level</label>
                        <select 
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 rounded-xl border border-border-main text-sm bg-app-bg/30 outline-none"
                        >
                          <option>Intern</option>
                          <option>Entry Level</option>
                          <option>Associate</option>
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Tone</label>
                        <select 
                          name="tone"
                          value={formData.tone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 rounded-xl border border-border-main text-sm bg-app-bg/30 outline-none"
                        >
                          <option value="formal">Formal</option>
                          <option value="casual">Casual</option>
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Length</label>
                        <select 
                          name="length"
                          value={formData.length}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 rounded-xl border border-border-main text-sm bg-app-bg/30 outline-none"
                        >
                          <option value="short">Short</option>
                          <option value="detailed">Detailed</option>
                        </select>
                     </div>
                  </div>
                </>
              )}

              {(activeTool === 'resume' || activeTool === 'resume-to-cl') && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    {activeTool === 'resume' ? 'Paste Resume Content' : 'Your Resume Content'}
                  </label>
                  <textarea 
                    name="resumeText"
                    value={formData.resumeText}
                    onChange={handleInputChange}
                    placeholder="Paste your CV text here..." 
                    className="w-full px-4 py-3 rounded-xl border border-border-main text-sm focus:border-primary outline-none transition-all bg-app-bg/30 min-h-[250px]"
                  />
                </div>
              )}

              {(activeTool === 'simplify' || activeTool === 'skills') && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Job Description</label>
                  <textarea 
                    name="jdText"
                    value={formData.jdText}
                    onChange={handleInputChange}
                    placeholder="Paste the full JD text here..." 
                    className="w-full px-4 py-3 rounded-xl border border-border-main text-sm focus:border-primary outline-none transition-all bg-app-bg/30 min-h-[250px]"
                  />
                </div>
              )}

              {activeTool === 'email' && (
                 <div className="space-y-1.5">
                   <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Email Type</label>
                   <select 
                     name="emailType"
                     value={formData.emailType}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 rounded-xl border border-border-main text-sm bg-app-bg/30 outline-none"
                   >
                     <option value="Application">Job Application</option>
                     <option value="Follow-up">Follow-up Email</option>
                     <option value="Inquiry">General Inquiry</option>
                   </select>
                 </div>
              )}

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : output ? <RefreshCw className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                {loading ? 'Thinking...' : output ? 'Regenerate Draft' : 'Generate AI Result'}
              </button>
            </div>
          </motion.div>

          {/* Output Panel */}
          <div className="space-y-6 lg:sticky lg:top-24">
             <div className="bg-white border border-border-main rounded-2xl min-h-[500px] flex flex-col shadow-xl shadow-black/5">
                <div className="p-4 border-bottom border-border-main flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">AI Result</span>
                   </div>
                   {output && (
                     <div className="flex items-center gap-2">
                       <button 
                         onClick={copyToClipboard}
                         className="p-2 hover:bg-app-bg rounded-lg text-text-muted transition-colors relative"
                         title="Copy text"
                       >
                         {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                       </button>
                       <button 
                         onClick={downloadPDF}
                         className="p-2 hover:bg-app-bg rounded-lg text-text-muted transition-colors"
                         title="Download PDF"
                       >
                         <FileDown className="w-4 h-4" />
                       </button>
                     </div>
                   )}
                </div>

                <div className="flex-1 p-6 overflow-y-auto bg-app-bg/10">
                   <AnimatePresence mode="wait">
                     {loading ? (
                       <motion.div 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }} 
                         exit={{ opacity: 0 }} 
                         className="h-full flex flex-col items-center justify-center text-center p-10"
                       >
                         <div className="relative mb-6">
                           <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
                           <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                             className="absolute inset-0 border-t-2 border-primary rounded-full"
                           />
                         </div>
                         <h3 className="text-lg font-bold text-text-main mb-2">Generating Excellence...</h3>
                         <p className="text-sm text-text-muted italic">"Your career is our mission. Gemini is crafting the perfect draft..."</p>
                       </motion.div>
                     ) : output ? (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }} 
                         animate={{ opacity: 1, y: 0 }} 
                         className="prose prose-sm max-w-none text-text-main font-medium whitespace-pre-wrap leading-relaxed"
                       >
                         {output}
                       </motion.div>
                     ) : (
                       <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                         <div className="bg-app-bg p-5 rounded-full mb-4">
                           <Zap className="w-8 h-8 text-text-muted" />
                         </div>
                         <p className="text-sm font-bold text-text-muted uppercase tracking-widest">Awaiting Input</p>
                         <p className="text-xs text-text-muted max-w-[200px] mt-2 leading-relaxed">Fill in the forms and hit generate to see the AI magic.</p>
                       </div>
                     )}
                   </AnimatePresence>
                </div>
                
                {output && (
                  <div className="p-4 bg-app-bg/50 border-t border-border-main text-[10px] text-text-muted text-center font-medium italic">
                    AI can make mistakes. Please review carefully before using.
                  </div>
                )}
             </div>

             {/* Tips Card */}
             <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3">
               <Zap className="w-5 h-5 text-primary shrink-0" />
               <p className="text-xs text-primary font-medium leading-relaxed">
                 <strong>Pro Tip:</strong> For better results, provide specific details about the job and your achievements. The more context you give Gemini, the better your output!
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
