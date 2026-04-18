import { rewriteJobContent, JobRewriteResult } from "./geminiService";

export interface RawJob {
  title: string;
  company: string;
  location: string;
  type: string;
  rawDescription: string;
  source: string;
  applyLink: string;
  logoUrl?: string;
}

export async function aggregateJobs(): Promise<any[]> {
  // Mock external sources (RSS feeds etc)
  const externalJobs: RawJob[] = [
    {
      title: "DevOps Engineer Intern",
      company: "CloudScale PK",
      location: "Karachi",
      type: "Internship",
      rawDescription: "We need someone who knows Docker and Kubernetes. Should be a 3rd or 4th year student. Islamabad preferred but Karachi okay.",
      source: "Manual Scraper",
      applyLink: "https://cloudscale.pk/careers",
      logoUrl: "https://picsum.photos/seed/dvos/100/100"
    }
  ];

  const processedJobs = [];

  for (const rawJob of externalJobs) {
    try {
      console.log(`Processing AI rewrite for: ${rawJob.title}`);
      const aiResult: JobRewriteResult = await rewriteJobContent(rawJob.title, rawJob.rawDescription);
      
      processedJobs.push({
        ...rawJob,
        ...aiResult,
        createdAt: new Date(),
        status: "approved"
      });
    } catch (error) {
      console.error(`Failed to process job: ${rawJob.title}`, error);
    }
  }

  return processedJobs;
}
