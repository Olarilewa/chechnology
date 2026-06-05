'use client';

import AdminTable from '@/components/ui/AdminTable';
import type { FoundersCamApplication } from '@/types/database';

const columns = [
  { key: 'full_name',         label: 'Name' },
  { key: 'email',             label: 'Email' },
  { key: 'role_applying_for', label: 'Role' },
  { key: 'country',           label: 'Country' },
  { key: 'experience_level',  label: 'Experience' },
  {
    key: 'created_at',
    label: 'Applied',
    render: (v: unknown) => new Date(v as string).toLocaleDateString(),
  },
];

export default function AdminTableClient({ initialData }: { initialData: FoundersCamApplication[] }) {
  return (
    <AdminTable
      data={initialData as unknown as Record<string, unknown>[]}
      columns={columns}
      tableName="founders_cam_applications"
      title="Founders Cam Applications"
      searchFields={['full_name', 'email', 'role_applying_for', 'country']}
    />
  );
}
