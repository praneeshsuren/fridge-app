export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  let date: Date;
  
  if (dateString.includes('-')) {
    date = new Date(dateString);
  } 

  else if (dateString.includes('/')) {
    date = new Date(dateString);
  }

  else {
    date = new Date(dateString);
  }
  
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

export function formatDateForInput(dateString: string): string {
  if (!dateString) return '';
  
  let date: Date;
  
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateString;
  }
  
  if (dateString.includes('/')) {
    const [day, month, year] = dateString.split('/');
    date = new Date(`${year}-${month}-${day}`);
  } else {
    date = new Date(dateString);
  }
  
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
