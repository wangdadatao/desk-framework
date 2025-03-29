import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// 将现有的函数从index.js合并到这里
export function sayHello(name) {
  return `你好，${name}！欢迎使用 Desk Framework`;
}

export const APP_VERSION = '0.1.0';
