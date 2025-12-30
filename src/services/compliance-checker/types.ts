/**
 * CMA Compliance Checker Types
 * TypeScript interfaces for Saudi Capital Market Authority compliance data
 * 
 * This module mirrors the structure of cma_compliance_dataset.json
 * and provides type-safe access to compliance rules, activities, and workflows.
 */

// ============================================
// Core Types
// ============================================

/**
 * Bilingual text support for Arabic and English
 */
export interface BilingualText {
  ar: string;
  en: string;
}

/**
 * Risk levels as defined in CMA regulations
 */
export type RiskLevel = 'High' | 'Medium' | 'Low';

/**
 * Compliance modules for categorizing rules
 */
export type ComplianceModule = 
  | 'Licensing'
  | 'Governance'
  | 'Operations'
  | 'Reporting & Notifications'
  | 'Outsourcing & Third Parties'
  | 'Data & Cybersecurity'
  | 'Capital & Financials';

/**
 * Enforcement types indicating rule severity
 */
export type EnforcementType = 
  | 'Mandatory'
  | 'Mandatory - Ongoing'
  | 'Mandatory - Immediate'
  | 'Mandatory - Weekly'
  | 'Mandatory - Annual'
  | 'Regulatory timeline';

/**
 * Business scenarios for rule filtering
 */
export type ComplianceScenario =
  | 'CLIENT_ONBOARDING'
  | 'LICENSING'
  | 'CLIENT_MONEY'
  | 'GOVERNANCE'
  | 'AML_CFT'
  | 'REPORTING'
  | 'OUTSOURCING'
  | 'DATA_SECURITY'
  | 'MARGIN_TRADING'
  | 'ADVISORY';

// ============================================
// Data Model Types (from JSON)
// ============================================

/**
 * Regulated securities activity
 */
export interface RegulatedActivity {
  activity_id: string;
  activity_name: BilingualText;
  description: BilingualText;
  minimum_capital: BilingualText;
  legal_form_requirements: {
    ar: string[];
    en: string[];
  };
}

/**
 * Individual compliance rule
 */
export interface ComplianceRule {
  rule_id: string;
  module: BilingualText;
  article_reference: BilingualText;
  description: BilingualText;
  condition: BilingualText;
  required_action: BilingualText;
  evidence: {
    ar: string[];
    en: string[];
  };
  risk_level: BilingualText;
  enforcement_type: BilingualText;
  penalty_reference: BilingualText;
}

/**
 * Decision flow step
 */
export interface DecisionFlowStep {
  step: number;
  action: BilingualText;
  decision: BilingualText;
  reference: BilingualText;
}

/**
 * Decision flow for business processes
 */
export interface DecisionFlow {
  flow_id: string;
  name: BilingualText;
  trigger: BilingualText;
  steps: DecisionFlowStep[];
  outcome_if_passed: BilingualText;
  outcome_if_failed: BilingualText;
}

/**
 * Checklist item
 */
export interface ChecklistItem {
  item: BilingualText;
  required: boolean;
}

/**
 * Compliance checklist
 */
export interface Checklist {
  checklist_id: string;
  name: BilingualText;
  reference: BilingualText;
  items: ChecklistItem[];
}

/**
 * Ambiguity/judgment area
 */
export interface AmbiguityArea {
  area_id: string;
  topic: BilingualText;
  description: BilingualText;
  affected_articles: {
    ar: string[];
    en: string[];
  };
  recommendation: BilingualText;
  risk_level: BilingualText;
}

/**
 * Implementation notes
 */
export interface ImplementationNotes {
  priority_order: {
    ar: string[];
    en: string[];
  };
  key_dependencies: {
    ar: string[];
    en: string[];
  };
  system_requirements: {
    ar: string[];
    en: string[];
  };
}

/**
 * Dataset metadata
 */
export interface DatasetMetadata {
  regulation_name: BilingualText;
  issuing_authority: BilingualText;
  jurisdiction: BilingualText;
  legal_basis: BilingualText;
  extraction_date: string;
  total_articles: number;
  version: string;
}

/**
 * Complete compliance dataset
 */
export interface ComplianceDataset {
  metadata: DatasetMetadata;
  regulated_activities: RegulatedActivity[];
  compliance_rules: ComplianceRule[];
  decision_flows: DecisionFlow[];
  checklists: Checklist[];
  ambiguities_or_judgment_areas: AmbiguityArea[];
  implementation_notes: ImplementationNotes;
}

// ============================================
// UI/Display Types
// ============================================

/**
 * Risk score summary
 */
export interface RiskScoreSummary {
  high: number;
  medium: number;
  low: number;
  total: number;
}

/**
 * Module summary for dashboard display
 */
export interface ModuleSummary {
  module: ComplianceModule;
  moduleLabel: BilingualText;
  ruleCount: number;
  highRiskCount: number;
  mandatoryCount: number;
}

/**
 * Scenario mapping to rules
 */
export interface ScenarioMapping {
  scenario: ComplianceScenario;
  label: BilingualText;
  description: BilingualText;
  ruleIds: string[];
  checklistId?: string;
  decisionFlowId?: string;
}

/**
 * Parsed risk level from bilingual text
 */
export function parseRiskLevel(riskLevel: BilingualText): RiskLevel {
  const level = riskLevel.en.toLowerCase();
  if (level === 'high' || level.includes('عالي')) return 'High';
  if (level === 'medium' || level.includes('متوسط')) return 'Medium';
  return 'Low';
}

/**
 * Check if enforcement is mandatory
 */
export function isMandatory(enforcementType: BilingualText): boolean {
  return enforcementType.en.toLowerCase().includes('mandatory');
}
