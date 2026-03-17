export class DashboardKpiDto {
  totalSalesMonth: number;
  totalRentalsMonth: number;
  activeLeads: number;
  conversionRate: number;
  avgClosureDays: number;
}

export class StatusBreakdownDto {
  label: string;
  value: number | string;
}

export class ChartDataDto {
  labels: string[];
  data1: number[];
  data2: number[];
}

export class DashboardStatsDto {
  kpis: DashboardKpiDto;
  leadStatus: StatusBreakdownDto[];
  propertyStatus: StatusBreakdownDto[];
  charts: {
    salesVsRentals: ChartDataDto;
    conversionVsLeads: ChartDataDto;
  };
}
