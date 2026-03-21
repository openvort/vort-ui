import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名
 * 使用 clsx 处理条件类名，使用 tailwind-merge 智能合并冲突的类名
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
