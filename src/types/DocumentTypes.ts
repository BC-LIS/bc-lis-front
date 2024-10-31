export type Document = {
    id: number; // bigint
    type_id: number; // bigint
    user_id: number; // bigint
    name: string; // varchar(255)
    description: string; // varchar(255)
    objectName: string; // varchar(255)
    state: "ARCHIVED" | "DRAFT" | "PUBLISHED"; // Enum
    createdAt: Date; // datetime(6)
    updatedAt: Date; // datetime(6)
}  