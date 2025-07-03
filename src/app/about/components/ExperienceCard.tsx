import { ReactNode } from 'react';

interface ExperienceCardProps {
  role: string;
  companyName: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM
  children: ReactNode;
}

export default function ExperienceCard({
  role,
  companyName,
  startDate,
  endDate,
  children,
}: ExperienceCardProps) {
  return (
    <div className="space-y-6 mb-4">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{role}</h3>
            <p className="text-gray-600">{companyName}</p>
          </div>
          <span className="text-sm text-gray-500">
            {startDate} - {endDate}
          </span>
        </div>
        <>{children}</>
      </div>
    </div>
  );
}
