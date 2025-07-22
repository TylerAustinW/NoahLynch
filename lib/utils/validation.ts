import type { ReleaseData, ValidationResult, PlatformLinkData } from '../types/music';
import { isValidPlatformName } from '../config/platforms';

/**
 * Validate a single platform link
 */
export function validatePlatformLink(platformLink: PlatformLinkData): ValidationResult {
  const errors: string[] = [];

  if (!isValidPlatformName(platformLink.platform)) {
    errors.push(`Invalid platform name: ${platformLink.platform}`);
  }

  if (!platformLink.url || typeof platformLink.url !== 'string') {
    errors.push('Platform URL is required and must be a string');
  } else if (!isValidUrl(platformLink.url)) {
    errors.push(`Invalid URL format: ${platformLink.url}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate release data
 */
export function validateReleaseData(release: ReleaseData): ValidationResult {
  const errors: string[] = [];

  // Validate required fields
  if (!release.id || typeof release.id !== 'string') {
    errors.push('Release ID is required and must be a string');
  }

  if (!release.title || typeof release.title !== 'string') {
    errors.push('Release title is required and must be a string');
  }

  if (!release.year || typeof release.year !== 'string') {
    errors.push('Release year is required and must be a string');
  }

  if (!release.description || typeof release.description !== 'string') {
    errors.push('Release description is required and must be a string');
  }

  if (!release.imageURL || typeof release.imageURL !== 'string') {
    errors.push('Release image URL is required and must be a string');
  }

  if (!release.releasedBy || typeof release.releasedBy !== 'string') {
    errors.push('Release publisher is required and must be a string');
  }

  if (!release.releaseDate || typeof release.releaseDate !== 'string') {
    errors.push('Release date is required and must be a string');
  }

  // Validate type
  const validTypes = ['out-now', 'upcoming', 'previous'];
  if (!validTypes.includes(release.type)) {
    errors.push(`Invalid release type: ${release.type}. Must be one of: ${validTypes.join(', ')}`);
  }

  // Validate platform links
  if (!Array.isArray(release.platformLinks)) {
    errors.push('Platform links must be an array');
  } else if (release.platformLinks.length === 0) {
    errors.push('At least one platform link is required');
  } else {
    release.platformLinks.forEach((platformLink, index) => {
      const result = validatePlatformLink(platformLink);
      if (!result.isValid) {
        errors.push(`Platform link ${index + 1}: ${result.errors.join(', ')}`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate an array of release data
 */
export function validateReleasesData(releases: ReleaseData[]): ValidationResult {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  if (!Array.isArray(releases)) {
    errors.push('Releases data must be an array');
    return { isValid: false, errors };
  }

  releases.forEach((release, index) => {
    // Check for duplicate IDs
    if (seenIds.has(release.id)) {
      errors.push(`Duplicate release ID: ${release.id} at index ${index}`);
    } else {
      seenIds.add(release.id);
    }

    // Validate individual release
    const result = validateReleaseData(release);
    if (!result.isValid) {
      errors.push(`Release ${index + 1} (${release.id}): ${result.errors.join(', ')}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Simple URL validation
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate and throw errors if validation fails
 */
export function assertValidReleaseData(release: ReleaseData): void {
  const result = validateReleaseData(release);
  if (!result.isValid) {
    throw new Error(`Invalid release data: ${result.errors.join(', ')}`);
  }
}
