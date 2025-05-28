import * as XLSX from "xlsx";

export const exportToExcel = (
  data: { [key: string]: string | number }[],
  filename: string = "prompt-results"
) => {
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  // Generate Excel file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};
