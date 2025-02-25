import { ChapterDetailsRelationships } from "@/interfaces/chapter.interface";
import { MangaAttributes, ScanlationGroupAttributes } from "@/interfaces/manga.interface";

export function truncateDescription (description: string |undefined, maxLength: number){
  if (!description) {
    return ""; 
  }
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

export function getMonthName(monthNumber: number) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthNumber - 1]; 
  }

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatDate(dateString:string){
  const date = new Date(dateString);
  const addSuffix = (day: number): string => {
    if (day >= 10 && day <= 20) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };
  const day = addSuffix(date.getDate());
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export function processLanguageCode(input: string): string {  
  const hyphenIndex = input.indexOf('-');
  if (hyphenIndex !== -1) {
    return input.slice(hyphenIndex + 1);
  }
  if(input==="hi"){
    return "in"
  }
  if(input==="en"){
    return "gb"
  }
  return input;
}

export function isMangaAttributes(relationship: ChapterDetailsRelationships): relationship is { id:string; type: 'manga'; attributes: MangaAttributes } {
  return relationship.type === 'manga';
}

export function isScanlationGroupAttributes(relationship: ChapterDetailsRelationships): relationship is { id:string; type: 'scanlation_group'; attributes: ScanlationGroupAttributes } {
  return relationship.type === 'scanlation_group';
}

export function removeSpace(query:string){
  return query.replaceAll(' ','-')
}

export function removeHyphen(query:string){
  return query.replaceAll('-',' ')
}