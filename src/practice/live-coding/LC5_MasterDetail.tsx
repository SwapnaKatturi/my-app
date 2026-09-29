/**
 * LC5 — Master-detail. See README.md in this folder for the full spec.
 *
 * Write the whole component yourself. Run the tests to check your work:
 *   npm test -- LC5_MasterDetail
 */
export interface DetailItem {
  id: number;
  name: string;
  description: string;
}

interface MasterDetailProps {
  items: DetailItem[];
}

function MasterDetail({ items }: MasterDetailProps) {
  return null;
}

export default MasterDetail;
