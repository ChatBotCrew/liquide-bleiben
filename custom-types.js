/**
 * Parameters which can be used for filtering the list of funding program
 * @typedef {Object} FilterParams
 * @property {string} state german state
 * @property {string} trade trade
 * @property {number} age company age
 * @property {string} legal legal type
 * @property {number} sales last years sales
 * @property {number} employees current employees
 */

/**
 * Funding Programs grouped by type
 * @typedef {Object} FundingProgramCluster
 * @property {string} name human-readable name of the cluster
 * @property {FundingProgramFormatted[]} offers list of funding programs for this cluster
 */

/**
 * Structured Funding Program
 * @typedef {Object} FundingProgram
 * @property {number} id identifier of the funding program
 * @property {string} name human-readable name of the funding program
 * @property {string} version version of th funding program
 * @property {Object[]} fields list of funding programs for this cluster
 */

/**
 * Structured Funding Program
 * @typedef {Object} FundingProgramFormatted
 * @property {number} id identifier of the funding program
 * @property {string} name human-readable name of the funding program
 * @property {{ main: FundingProgramField[], details: FundingProgramField[] }} fields list of funding programs for this cluster
 */

/**
 * Single property field of a Funding Program
 * @typedef {Object} FundingProgramField
 * @property {number} id identifier of the field
 * @property {string} name human-readable name of the field
 * @property {string} value value for the property field
 */