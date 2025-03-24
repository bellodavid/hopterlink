export default function formatTimeAgo(timestamp: Date) {
  // Parse the timestamp string into a Date object
  const parsedTime = new Date(timestamp);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime.getTime() - parsedTime.getTime();

  // Convert milliseconds to minutes
  const totalMinutes = Math.floor(timeDifference / (1000 * 60));

  // Define time units
  const timeUnits = [
    { unit: "day", value: 1440 },
    { unit: "hour", value: 60 },
    { unit: "minute", value: 1 },
  ];

  // Find the appropriate time unit
  for (const unit of timeUnits) {
    const unitValue = Math.floor(totalMinutes / unit.value);
    if (unitValue >= 1) {
      return unitValue + " " + unit.unit + (unitValue > 1 ? "s" : "") + " ago";
    }
  }

  // If the timestamp is less than a minute ago
  return "Just now";
}

export interface Subcategory {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  display_name: string;
  category: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  icon: string;
  subcategories: Subcategory[];
}

export const COMETCHAT_CONSTANTS = {
  APP_ID: "262533ed0bcf1706",
  REGION: "eu",
  AUTH_KEY: "dd1f895acc33ab5ee09b5cf962f121b761019590",
};
