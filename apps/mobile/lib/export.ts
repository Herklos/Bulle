/**
 * Export everything (GDPR portability, and §3.1's "export everything" option).
 *
 * Plain JSON, no server round-trip. A user asking for their data during Pause mode must get
 * it immediately and locally — routing an export through a backend would contradict the
 * entire premise, and would be a cruel thing to make someone wait for.
 */
import { Platform, Share } from 'react-native';
import type { Bulle, Project, Task } from '@bulle/sdk';

export const EXPORT_VERSION = 1;

export interface BulleExport {
  version: number;
  exportedAt: string;
  bulle: Bulle | null;
  projects: Project[];
  tasks: Task[];
}

export function buildExport(data: {
  bulle: Bulle | null;
  projects: Project[];
  tasks: Task[];
}): BulleExport {
  return {
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    ...data,
  };
}

export function exportFilename(now = new Date()): string {
  return `bulle-${now.toISOString().slice(0, 10)}.json`;
}

export async function exportBulle(data: {
  bulle: Bulle | null;
  projects: Project[];
  tasks: Task[];
}): Promise<void> {
  const json = JSON.stringify(buildExport(data), null, 2);

  if (Platform.OS === 'web') {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFilename();
    link.click();
    URL.revokeObjectURL(url);
    return;
  }

  await Share.share({ message: json, title: exportFilename() });
}
