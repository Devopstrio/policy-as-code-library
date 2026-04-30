export enum PolicyDomain {
  CLOUD = "CLOUD",
  KUBERNETES = "KUBERNETES",
  CICD = "CICD",
  SECURITY = "SECURITY"
}

export enum EnforcementMode {
  PREVENTIVE = "PREVENTIVE", // Block
  DETECTIVE = "DETECTIVE"    // Notify
}

export enum PolicyStatus {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  DEPRECATED = "DEPRECATED"
}

export interface PolicyMetadata {
  id: string;
  name: string;
  domain: PolicyDomain;
  mode: EnforcementMode;
  frameworks: string[]; // CIS, NIST, etc.
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  version: string;
}

export interface PolicyEvaluationResult {
  evaluationId: string;
  policyId: string;
  resourceId: string;
  isCompliant: boolean;
  violationMessage?: string;
  riskScore: number; // 0-100
  timestamp: string;
}

export interface ComplianceScorecard {
  overallScore: number;
  byDomain: Record<PolicyDomain, number>;
  totalViolations: number;
  criticalIssues: number;
}
