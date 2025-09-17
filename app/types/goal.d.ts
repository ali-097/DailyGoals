export interface Goal {
    title: string;
    description: string;
    deadline: Date;
    priority: "low" | "medium" | "high";
} 